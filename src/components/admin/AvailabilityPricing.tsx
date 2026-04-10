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
import { RefreshCw, Check, AlertCircle } from 'lucide-react';

interface Season {
  id?: string;
  season_name: string;
  start_date: string;
  end_date: string;
  price_per_night: number;
  min_stay_nights: number;
  tourist_tax_per_guest?: number;
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
      const { data, error } = await (supabase as any)
        .from('settings')
        .select('key, value');
      if (error) throw error;
      const obj: any = {};
      (data || []).forEach((row: any) => { obj[row.key] = row.value; });
      return obj;
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

  
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [markAs, setMarkAs] = useState<'available'|'blocked'|'booked'>('blocked');
  const [localSettings, setLocalSettings] = useState<any | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [monthlyPrices, setMonthlyPrices] = useState<number[]>(Array(12).fill(0));
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<{ok:boolean;message:string}|null>(null);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const seasonsState = seasons ?? [];
  const settingsState = localSettings ?? settings ?? { cleaning_free_nights: '5', cleaning_fee: '80', currency: 'EUR' };

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
          season_name: `${months[i]} ${year}`,
          start_date: format(mStart, 'yyyy-MM-dd'),
          end_date: format(mEnd, 'yyyy-MM-dd'),
          price_per_night: price,
          min_stay_nights: 4,
          currency_symbol: '€',
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
      toast({ title: 'Failed to save monthly prices', description: e.message, variant: 'destructive' as any });
    }
  });

const upsertSettings = useMutation({
    mutationFn: async (payload: any) => {
      const rows = Object.entries(payload).map(([key, val]) => ({ key, value: String(val ?? '') }));
      const { error } = await (supabase as any).from('settings').upsert(rows).select();
      if (error) throw error;
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
    mutationFn: async (rows: { date: string; status: 'available'|'blocked'|'booked' }[]) => {
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

  const clearAvailability = useMutation({
    mutationFn: async (dates: string[]) => {
      const { error } = await supabase.from('availability').delete().in('date', dates);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_availability'] });
      toast({ title: 'Availability cleared' });
    },
    onError: (e: any) => {
      toast({ title: 'Failed to clear availability', description: e.message, variant: 'destructive' as any });
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

  const handleSync = async () => {
    setSyncLoading(true);
    setSyncResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('sync-lodgify', {
        body: { from: format(new Date(),'yyyy-MM-dd'), to: format(new Date(Date.now()+365*86400000),'yyyy-MM-dd') }
      });
      if (error) throw error;
      const updated = data?.updated ?? 0;
      setSyncResult({ ok: true, message: `✓ Synced ${updated} booked dates` });
      qc.invalidateQueries({ queryKey: ['adm_availability'] });
      toast({ title: `Calendar synced — ${updated} dates updated` });
    } catch(e:any) {
      const msg = e?.message ?? String(e);
      setSyncResult({ ok: false, message: msg });
      toast({ title: 'Sync failed', description: msg, variant: 'destructive' as any });
    } finally { setSyncLoading(false); }
  };

  const blockedDates = useMemo(() => (availability||[]).filter((a: any) => a.status === 'blocked').map((a: any) => new Date(a.date)), [availability]);
  const bookedDates = useMemo(() => (availability||[]).filter((a: any) => a.status === 'booked').map((a: any) => new Date(a.date)), [availability]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Availability & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

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
                  <Button size="sm" variant="secondary" onClick={() => saveMonthlyPrices.mutateAsync({ year: selectedYear, prices: monthlyPrices })}>Save monthly prices</Button>
                </div>
            </div>

{/* Settings */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Settings</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <Label>Cleaning free nights</Label>
                <Input type="number" value={settingsState.cleaning_free_nights || ''} onChange={(e)=> setLocalSettings({ ...(settingsState||{}), cleaning_free_nights: e.target.value })} />
              </div>
              <div>
                <Label>Cleaning fee</Label>
                <Input type="number" value={settingsState.cleaning_fee || ''} onChange={(e)=> setLocalSettings({ ...(settingsState||{}), cleaning_fee: e.target.value })} />
              </div>
              <div>
                <Label>Currency</Label>
                <Input value={settingsState.currency || ''} onChange={(e)=> setLocalSettings({ ...(settingsState||{}), currency: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={()=> upsertSettings.mutateAsync(settingsState)}>Save</Button>
            </div>
          </div>

          {/* iCal Sync */}
          <div className="rounded-lg border p-4 space-y-3 bg-muted/30">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <RefreshCw className="h-4 w-4" /> Calendar Sync (Airbnb &amp; Lodgify)
            </h4>
            <p className="text-xs text-muted-foreground">Enter iCal URLs from Airbnb and Lodgify, then click <strong>Sync Calendars</strong> to pull in all bookings automatically.</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Airbnb iCal URL</Label>
                <Input type="url" value={settingsState.airbnb_ical_url || ''} onChange={(e)=>setLocalSettings({...(settingsState||{}),airbnb_ical_url:e.target.value})} placeholder="https://www.airbnb.com/calendar/ical/..." />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Lodgify iCal URL</Label>
                <Input type="url" value={settingsState.lodgify_ical_url || ''} onChange={(e)=>setLocalSettings({...(settingsState||{}),lodgify_ical_url:e.target.value})} placeholder="https://www.lodgify.com/..." />
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Button size="sm" variant="secondary" onClick={()=>upsertSettings.mutateAsync(settingsState)}>Save URLs</Button>
              <Button size="sm" onClick={handleSync} disabled={syncLoading} className="flex items-center gap-2">
                <RefreshCw className={`h-4 w-4 ${syncLoading?'animate-spin':''}`}/>
                {syncLoading ? 'Syncing...' : 'Sync Calendars Now'}
              </Button>
              {syncResult && (
                <span className={`text-xs flex items-center gap-1 ${syncResult.ok?'text-green-600':'text-destructive'}`}>
                  {syncResult.ok ? <Check className="h-3 w-3"/> : <AlertCircle className="h-3 w-3"/>}
                  {syncResult.message}
                </span>
              )}
            </div>
          </div>

                    {/* Availability calendar */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Availability</h4>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] grid md:grid-cols-[1fr,240px] gap-4">
                <div className="border rounded-xl p-3">
                  <Calendar
                    mode="multiple"
                    numberOfMonths={2}
                    selected={selectedDays as any}
                    onSelect={setSelectedDays as any}
                    modifiers={{ blocked: blockedDates, booked: bookedDates }}
                    modifiersClassNames={{
                      blocked: "bg-destructive/30 text-destructive-foreground",
                      booked: "bg-secondary/30 text-secondary-foreground",
                    }}
                    className="p-3 pointer-events-auto"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mark as</Label>
                  <div className="flex gap-2 items-center">
                    <Button variant={markAs==='blocked'?'default':'outline'} size="sm" onClick={()=>setMarkAs('blocked')}>Blocked</Button>
                    <div className="h-3 w-3 rounded-full bg-destructive/70" title="Blocked" />
                    <Button variant={markAs==='booked'?'default':'outline'} size="sm" onClick={()=>setMarkAs('booked')}>Booked</Button>
                    <div className="h-3 w-3 rounded-full bg-secondary/70" title="Booked" />
                    <Button variant={markAs==='available'?'default':'outline'} size="sm" onClick={()=>setMarkAs('available')}>Available</Button>
                    <Button variant="ghost" size="sm" className="ml-auto" onClick={()=> setSelectedDays([])}>Clear selection</Button>
                  </div>
                  <Button className="w-full" disabled={(selectedDays?.length || 0) === 0} onClick={() => {
                    if (!selectedDays || selectedDays.length === 0) return;
                    const dates = selectedDays.map((d) => format(d, 'yyyy-MM-dd'));
                    if (markAs === 'available') {
                      clearAvailability.mutate(dates);
                    } else {
                      const rows = dates.map((date) => ({ date, status: markAs }));
                      upsertAvailability.mutate(rows as any);
                    }
                    setSelectedDays([]);
                  }}>Apply to selected</Button>
                  <div className="text-xs text-muted-foreground">
                    Blocked: {(availability||[]).filter((a: any)=>a.status==='blocked').length || 0} · Booked: {(availability||[]).filter((a: any)=>a.status==='booked').length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Selected: {selectedDays.length} day(s)</div>
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
