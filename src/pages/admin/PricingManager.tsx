import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { DollarSign, Pencil, Trash2, Plus } from 'lucide-react';

interface Season {
  id?: string;
  season_name: string;
  start_date: string;
  end_date: string;
  price_per_night: number;
  min_stay_nights: number;
  currency_symbol: string;
  status: 'draft' | 'published';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const PricingManager: React.FC = () => {
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: seasons } = useQuery({
    queryKey: ['adm_seasons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('price_seasons')
        .select('*')
        .order('start_date', { ascending: true });
      if (error) throw error;
      return data as Season[];
    },
  });

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyPrices, setMonthlyPrices] = useState<number[]>(Array(12).fill(0));
  const [editingSeason, setEditingSeason] = useState<Season | null>(null);

  const seasonsState = seasons ?? [];

  // Prefill monthly prices from existing seasons
  useEffect(() => {
    const arr = Array(12).fill(0);
    for (let m = 0; m < 12; m++) {
      const start = startOfMonth(new Date(selectedYear, m, 1));
      const iso = format(start, 'yyyy-MM-dd');
      const season: any = seasonsState.find((s: any) => iso >= s.start_date && iso <= s.end_date);
      if (season) arr[m] = Number(season.price_per_night) || 0;
    }
    setMonthlyPrices(arr);
  }, [selectedYear, seasonsState]);

  const saveMonthlyPrices = useMutation({
    mutationFn: async ({ year, prices }: { year: number; prices: number[] }) => {
      const startYear = `${year}-01-01`;
      const endYear = `${year}-12-31`;
      const { error: delErr } = await supabase
        .from('price_seasons')
        .delete()
        .gte('start_date', startYear)
        .lte('end_date', endYear);
      if (delErr) throw delErr;

      const rows: Season[] = [];
      for (let i = 0; i < 12; i++) {
        const price = prices[i] || 0;
        if (price <= 0) continue;
        const mStart = startOfMonth(new Date(year, i, 1));
        const mEnd = endOfMonth(mStart);
        rows.push({
          season_name: `${MONTHS[i]} ${year}`,
          start_date: format(mStart, 'yyyy-MM-dd'),
          end_date: format(mEnd, 'yyyy-MM-dd'),
          price_per_night: price,
          min_stay_nights: 4,
          currency_symbol: '\u20ac',
          status: 'published',
        } as Season);
      }
      if (rows.length === 0) return;
      const { error: insErr } = await supabase.from('price_seasons').insert(rows).select();
      if (insErr) throw insErr;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_seasons'] });
      toast({ title: 'Monthly prices saved' });
    },
    onError: (e: any) => {
      toast({ title: 'Failed to save', description: e.message });
    },
  });

  const upsertSeason = useMutation({
    mutationFn: async (payload: Season) => {
      const { error } = await supabase
        .from('price_seasons')
        .upsert(payload, { onConflict: 'id' })
        .select();
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_seasons'] });
      setEditingSeason(null);
      toast({ title: 'Season saved' });
    },
    onError: (e: any) => toast({ title: 'Save failed', description: e.message }),
  });

  const removeSeason = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('price_seasons').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_seasons'] });
      toast({ title: 'Season deleted' });
    },
    onError: (e: any) => toast({ title: 'Delete failed', description: e.message }),
  });

  // Group seasons by year for display
  const seasonsByYear = useMemo(() => {
    const map: Record<number, Season[]> = {};
    for (const s of seasonsState) {
      const y = new Date(s.start_date).getFullYear();
      if (!map[y]) map[y] = [];
      map[y].push(s);
    }
    return map;
  }, [seasonsState]);

  const getPriceColor = (price: number) => {
    if (price >= 600) return 'bg-red-50 border-red-200 text-red-700';
    if (price >= 400) return 'bg-orange-50 border-orange-200 text-orange-700';
    if (price >= 300) return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    return 'bg-green-50 border-green-200 text-green-700';
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1200px]">
      <div className="mb-10">
        <h1 className="text-[32px] font-cormorant font-medium text-[#1A1714] mb-2">Pricing Manager</h1>
        <p className="text-[15px] font-inter text-[#8a8580]">Set nightly rates by month and manage pricing seasons</p>
      </div>

      {/* Monthly Quick Edit */}
      <div className="bg-white border border-[#e9e4df] rounded-xl p-6 lg:p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-[#c5a059]" />
            <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714]">Monthly Prices</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedYear(selectedYear - 1)}
              className="px-3 py-1.5 text-[13px] font-inter border border-[#e9e4df] rounded-lg hover:bg-[#f0ebe5] transition-colors"
            >
              &larr;
            </button>
            <span className="text-[16px] font-inter font-medium text-[#1A1714] min-w-[60px] text-center">{selectedYear}</span>
            <button
              onClick={() => setSelectedYear(selectedYear + 1)}
              className="px-3 py-1.5 text-[13px] font-inter border border-[#e9e4df] rounded-lg hover:bg-[#f0ebe5] transition-colors"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {MONTHS.map((m, i) => (
            <div key={m} className="space-y-1.5">
              <Label className="text-[12px] font-inter text-[#8a8580] uppercase tracking-wider">{m}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#B8B2AC]">&euro;</span>
                <Input
                  type="number"
                  value={monthlyPrices[i] || ''}
                  onChange={(e) => {
                    const arr = [...monthlyPrices];
                    arr[i] = parseFloat(e.target.value || '0');
                    setMonthlyPrices(arr);
                  }}
                  className="pl-7 h-11 text-[15px] font-inter border-[#e9e4df] focus-visible:ring-[#c5a059] focus-visible:ring-1"
                  placeholder="0"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={() => saveMonthlyPrices.mutateAsync({ year: selectedYear, prices: monthlyPrices })}
            className="bg-[#0f172a] hover:bg-[#c5a059] text-white text-[13px] font-inter font-medium uppercase tracking-wider px-6"
          >
            Save {selectedYear} Prices
          </Button>
        </div>
      </div>

      {/* Season Overview */}
      <div className="bg-white border border-[#e9e4df] rounded-xl p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714]">All Seasons</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setEditingSeason({
                season_name: '',
                start_date: format(new Date(), 'yyyy-MM-dd'),
                end_date: format(new Date(), 'yyyy-MM-dd'),
                price_per_night: 0,
                min_stay_nights: 4,
                currency_symbol: '\u20ac',
                status: 'published',
              })
            }
            className="text-[13px] font-inter"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Season
          </Button>
        </div>

        {/* Edit form */}
        {editingSeason && (
          <div className="border border-[#c5a059]/30 bg-[#c5a059]/5 rounded-xl p-5 mb-6">
            <h3 className="text-[16px] font-inter font-medium text-[#1A1714] mb-4">
              {editingSeason.id ? 'Edit Season' : 'New Season'}
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
              <div>
                <Label className="text-[11px]">Name</Label>
                <Input value={editingSeason.season_name} onChange={(e) => setEditingSeason({ ...editingSeason, season_name: e.target.value })} />
              </div>
              <div>
                <Label className="text-[11px]">Start</Label>
                <Input type="date" value={editingSeason.start_date} onChange={(e) => setEditingSeason({ ...editingSeason, start_date: e.target.value })} />
              </div>
              <div>
                <Label className="text-[11px]">End</Label>
                <Input type="date" value={editingSeason.end_date} onChange={(e) => setEditingSeason({ ...editingSeason, end_date: e.target.value })} />
              </div>
              <div>
                <Label className="text-[11px]">Price/night</Label>
                <Input type="number" value={editingSeason.price_per_night} onChange={(e) => setEditingSeason({ ...editingSeason, price_per_night: parseFloat(e.target.value || '0') })} />
              </div>
              <div>
                <Label className="text-[11px]">Min nights</Label>
                <Input type="number" value={editingSeason.min_stay_nights} onChange={(e) => setEditingSeason({ ...editingSeason, min_stay_nights: parseInt(e.target.value || '1') })} />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => upsertSeason.mutate(editingSeason)}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingSeason(null)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Season list by year */}
        {Object.entries(seasonsByYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, items]) => (
            <div key={year} className="mb-6 last:mb-0">
              <h3 className="text-[14px] font-inter font-semibold uppercase tracking-wider text-[#8a8580] mb-3">{year}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {items.map((s) => (
                  <div key={s.id} className={`border rounded-lg p-3 ${getPriceColor(s.price_per_night)} relative group`}>
                    <p className="text-[12px] font-inter font-medium">{s.season_name}</p>
                    <p className="text-[20px] font-inter font-semibold mt-1">{s.currency_symbol}{s.price_per_night}</p>
                    <p className="text-[11px] opacity-60 mt-0.5">min {s.min_stay_nights} nights</p>
                    <div className="absolute top-1.5 right-1.5 hidden group-hover:flex gap-1">
                      <button onClick={() => setEditingSeason({ ...s })} className="p-1 rounded hover:bg-white/50">
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button onClick={() => s.id && removeSeason.mutate(s.id)} className="p-1 rounded hover:bg-white/50 text-red-500">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {seasonsState.length === 0 && (
          <p className="text-[14px] font-inter text-[#B8B2AC] text-center py-8">No pricing seasons yet. Add monthly prices above or create individual seasons.</p>
        )}
      </div>
    </div>
  );
};

export default PricingManager;
