import React, { useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

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

type DateRange = { from?: Date; to?: Date };

const AvailabilityPricing: React.FC = () => {
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
    }
  });

  const { data: settings } = useQuery({
    queryKey: ['adm_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booking_settings')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();
      if (error) return { cleaning_fee: 0, service_fee: 0, inquiry_email: '', status: 'draft' } as any;
      return data || { cleaning_fee: 0, service_fee: 0, inquiry_email: '', status: 'draft' };
    }
  });

  const { data: availability } = useQuery({
    queryKey: ['adm_availability'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('availability')
        .select('date, status');
      if (error) throw error;
      return data || [];
    }
  });

  const [localSeasons, setLocalSeasons] = useState<Season[] | null>(null);
  const [calRange, setCalRange] = useState<DateRange>({});
  const [markAs, setMarkAs] = useState<'blocked'|'booked'>('blocked');
  const [localSettings, setLocalSettings] = useState<any | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [monthlyPrices, setMonthlyPrices] = useState<number[]>(Array(12).fill(0));
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const seasonsState = localSeasons ?? seasons ?? [];
  const settingsState = localSettings ?? settings ?? { cleaning_fee: 0, service_fee: 0, inquiry_email: '' };

const upsertSeasons = useMutation({
    mutationFn: async (rows: Season[]) => {
      const payload = rows.map((r) => ({ ...r, status: 'published' as const }));
      const { error } = await supabase.from('price_seasons').upsert(payload).select();
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_seasons'] });
      toast({ title: 'Seasons saved' });
    },
    onError: (e: any) => {
      toast({ title: 'Failed to save seasons', description: e.message, variant: 'destructive' as any });
    }
  });

const upsertSettings = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await supabase
        .from('booking_settings')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();
      if (data) {
        const { error } = await supabase.from('booking_settings').update(payload).eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('booking_settings').insert({ ...payload, is_active: true, status: payload.status || 'draft' });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_settings'] });
      toast({ title: 'Settings saved' });
    },
    onError: (e: any) => {
      toast({ title: 'Failed to save settings', description: e.message, variant: 'destructive' as any });
    }
  });

const upsertAvailability = useMutation({
    mutationFn: async (rows: { date: string; status: 'blocked'|'booked' }[]) => {
      const { error } = await supabase.from('availability').upsert(rows, { onConflict: 'date' }).select();
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_availability'] });
      toast({ title: 'Availability updated' });
    },
    onError: (e: any) => {
      toast({ title: 'Failed to update availability', description: e.message, variant: 'destructive' as any });
    }
  });

  useEffect(() => {
    // Prefill monthly prices from existing seasons for the selected year (only if empty)
    const arr = Array(12).fill(0);
    for (let m = 0; m < 12; m++) {
      const start = startOfMonth(new Date(selectedYear, m, 1));
      const iso = format(start, 'yyyy-MM-dd');
      const season: any = seasonsState.find((s: any) => iso >= s.start_date && iso <= s.end_date);
      if (season) arr[m] = Number(season.price_per_night) || 0;
    }
    setMonthlyPrices((prev) => (prev.every((v) => v === 0) ? arr : prev));
  }, [selectedYear, seasonsState]);

  const blockedSet = useMemo(() => new Set((availability||[]).map((a: any) => a.status ? a.date : '').filter(Boolean)), [availability]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Availability & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
{/* Seasons table */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Seasons</h4>
            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
                  <div className="col-span-2">Name</div>
                  <div className="col-span-2">Start</div>
                  <div className="col-span-2">End</div>
                  <div className="col-span-2">Price / night</div>
                  <div className="col-span-2">Min nights</div>
                  <div className="col-span-2">Curr</div>
                </div>
                <div className="space-y-2">
                  {seasonsState.map((s: Season, idx: number) => (
                    <div key={s.id || idx} className="grid grid-cols-12 gap-2">
                      <Input className="col-span-2" value={s.season_name} onChange={(e)=>{
                        const arr = [...seasonsState]; arr[idx] = { ...arr[idx], season_name: e.target.value } as Season; setLocalSeasons(arr);
                      }} />
                      <Input type="date" className="col-span-2" value={s.start_date} onChange={(e)=>{
                        const arr = [...seasonsState]; arr[idx] = { ...arr[idx], start_date: e.target.value } as Season; setLocalSeasons(arr);
                      }} />
                      <Input type="date" className="col-span-2" value={s.end_date} onChange={(e)=>{
                        const arr = [...seasonsState]; arr[idx] = { ...arr[idx], end_date: e.target.value } as Season; setLocalSeasons(arr);
                      }} />
                      <Input type="number" className="col-span-2" value={s.price_per_night} onChange={(e)=>{
                        const arr = [...seasonsState]; arr[idx] = { ...arr[idx], price_per_night: parseFloat(e.target.value||'0') } as Season; setLocalSeasons(arr);
                      }} />
                      <Input type="number" className="col-span-2" value={s.min_stay_nights} onChange={(e)=>{
                        const arr = [...seasonsState]; arr[idx] = { ...arr[idx], min_stay_nights: parseInt(e.target.value||'0') } as Season; setLocalSeasons(arr);
                      }} />
                      <Input className="col-span-2" value={s.currency_symbol} onChange={(e)=>{
                        const arr = [...seasonsState]; arr[idx] = { ...arr[idx], currency_symbol: e.target.value } as Season; setLocalSeasons(arr);
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setLocalSeasons([...(seasonsState||[]), {
                season_name: 'New Season', start_date: format(new Date(), 'yyyy-MM-dd'), end_date: format(new Date(), 'yyyy-MM-dd'), price_per_night: 0, min_stay_nights: 4, currency_symbol: '€', status: 'published'
              }])}>Add season</Button>
              <Button size="sm" onClick={() => upsertSeasons.mutateAsync(seasonsState as Season[])}>Save seasons</Button>
            </div>

            {/* Monthly quick edit */}
            <div className="rounded-lg border p-3 mt-4">
              <div className="flex items-center gap-3 mb-3">
                <Label className="text-sm">Monthly prices (quick edit)</Label>
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Year</Label>
                  <Input type="number" className="w-28" value={selectedYear} onChange={(e)=> setSelectedYear(parseInt(e.target.value||`${new Date().getFullYear()}`) || new Date().getFullYear())} />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {months.map((m, i) => (
                  <div key={m} className="space-y-1">
                    <Label className="text-xs">{m}</Label>
                    <Input type="number" value={monthlyPrices[i] ?? 0} onChange={(e)=>{
                      const arr = [...monthlyPrices]; arr[i] = parseFloat(e.target.value||'0'); setMonthlyPrices(arr);
                    }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-3">
                <Button size="sm" variant="secondary" onClick={() => {
                  try {
                    let next = (seasonsState as any[]).filter((s: any) => {
                      const sd = new Date(s.start_date);
                      const ed = new Date(s.end_date);
                      const isYear = sd.getFullYear() === selectedYear && ed.getFullYear() === selectedYear;
                      const monthEnd = endOfMonth(sd);
                      const matchesMonthBounds = sd.getDate() === 1 && ed.getDate() === monthEnd.getDate();
                      return !(isYear && matchesMonthBounds);
                    }) as Season[];

                    for (let i = 0; i < 12; i++) {
                      const price = monthlyPrices[i] || 0;
                      if (price <= 0) continue;
                      const mStart = startOfMonth(new Date(selectedYear, i, 1));
                      const mEnd = endOfMonth(mStart);
                      const startISO = format(mStart, 'yyyy-MM-dd');
                      const endISO = format(mEnd, 'yyyy-MM-dd');
                      const existing = (seasonsState as any[]).find((s: any) => s.start_date === startISO && s.end_date === endISO) as Season | undefined;
                      const base: Partial<Season> = existing ?? { min_stay_nights: 4, currency_symbol: '€', status: 'published' };
                      next.push({ ...(base as any), id: existing?.id, season_name: `${months[i]} ${selectedYear}`, start_date: startISO, end_date: endISO, price_per_night: price, min_stay_nights: (base.min_stay_nights as number) || 4, currency_symbol: (base.currency_symbol as string) || '€', status: (base.status as any) || 'published' } as Season);
                    }

                    setLocalSeasons(next);
                    toast({ title: 'Monthly prices applied', description: 'Review and click "Save seasons" to persist.' });
                  } catch (e: any) {
                    toast({ title: 'Apply failed', description: e.message, variant: 'destructive' as any });
                  }
                }}>Apply to seasons</Button>
              </div>
            </div>
          </div>

{/* Settings */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Settings</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <Label>Cleaning fee (per 5 nights)</Label>
                <Input type="number" value={settingsState.cleaning_fee || 0} onChange={(e)=> setLocalSettings({ ...(settingsState||{}), cleaning_fee: parseFloat(e.target.value||'0') })} />
              </div>
              <div>
                <Label>Tourist tax – in season (per person per night)</Label>
                <Input type="number" value={settingsState.tourist_tax_high || 0} onChange={(e)=> setLocalSettings({ ...(settingsState||{}), tourist_tax_high: parseFloat(e.target.value||'0') })} />
              </div>
              <div>
                <Label>Tourist tax – off season (per person per night)</Label>
                <Input type="number" value={settingsState.tourist_tax_low || 0} onChange={(e)=> setLocalSettings({ ...(settingsState||{}), tourist_tax_low: parseFloat(e.target.value||'0') })} />
              </div>
              <div className="md:col-span-3">
                <Label>Inquiry email</Label>
                <Input value={settingsState.inquiry_email || ''} onChange={(e)=> setLocalSettings({ ...(settingsState||{}), inquiry_email: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={()=> upsertSettings.mutateAsync({ ...(settingsState||{}), status: 'draft' })}>Save draft</Button>
              <Button size="sm" onClick={()=> upsertSettings.mutateAsync({ ...(settingsState||{}), status: 'published' })}>Publish</Button>
            </div>
          </div>

          {/* Availability calendar */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Availability</h4>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] grid md:grid-cols-[1fr,240px] gap-4">
                <div className="border rounded-xl p-3">
                  <Calendar
                    mode="range"
                    numberOfMonths={2}
                    selected={calRange as any}
                    onSelect={setCalRange as any}
                    className="p-3 pointer-events-auto"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mark as</Label>
                  <div className="flex gap-2">
                    <Button variant={markAs==='blocked'?'default':'outline'} size="sm" onClick={()=>setMarkAs('blocked')}>Blocked</Button>
                    <Button variant={markAs==='booked'?'default':'outline'} size="sm" onClick={()=>setMarkAs('booked')}>Booked</Button>
                  </div>
                  <Button className="w-full" disabled={!calRange.from || !calRange.to} onClick={() => {
                    if (!calRange.from || !calRange.to) return;
                    const days = eachDayOfInterval({ start: calRange.from, end: calRange.to });
                    const rows = days.map((d) => ({ date: format(d, 'yyyy-MM-dd'), status: markAs }));
                    upsertAvailability.mutate(rows);
                  }}>Apply to selected</Button>
                  <div className="text-xs text-muted-foreground">
                    Currently blocked/booked: {availability?.length || 0} days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityPricing;
