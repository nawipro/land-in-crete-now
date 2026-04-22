import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { RefreshCw, Check, AlertCircle } from 'lucide-react';

const CalendarSync: React.FC = () => {
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: settings } = useQuery({
    queryKey: ['adm_settings'],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from('settings').select('key, value');
      if (error) throw error;
      const obj: any = {};
      (data || []).forEach((row: any) => { obj[row.key] = row.value; });
      return obj;
    },
  });

  const { data: availability } = useQuery({
    queryKey: ['adm_availability'],
    queryFn: async () => {
      const { data, error } = await supabase.from('availability').select('date, status');
      if (error) throw error;
      return data || [];
    },
  });

  const [localSettings, setLocalSettings] = useState<any>(null);
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [markAs, setMarkAs] = useState<'available' | 'blocked' | 'booked'>('blocked');
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<{ ok: boolean; message: string } | null>(null);

  const s = localSettings ?? settings ?? {};

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
    onError: (e: any) => toast({ title: 'Save failed', description: e.message }),
  });

  const upsertAvailability = useMutation({
    mutationFn: async (rows: { date: string; status: 'available' | 'blocked' | 'booked' }[]) => {
      const { error } = await supabase.from('availability').upsert(rows, { onConflict: 'date' }).select();
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_availability'] });
      setSelectedDays([]);
      toast({ title: 'Availability updated' });
    },
    onError: (e: any) => toast({ title: 'Failed', description: e.message }),
  });

  const clearAvailability = useMutation({
    mutationFn: async (dates: string[]) => {
      const { error } = await supabase.from('availability').delete().in('date', dates);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['adm_availability'] });
      setSelectedDays([]);
      toast({ title: 'Dates cleared' });
    },
    onError: (e: any) => toast({ title: 'Failed', description: e.message }),
  });

  const handleSync = async () => {
    setSyncLoading(true);
    setSyncResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('sync-lodgify', {
        body: { from: format(new Date(), 'yyyy-MM-dd'), to: format(new Date(Date.now() + 365 * 86400000), 'yyyy-MM-dd') },
      });
      if (error) throw error;
      const updated = data?.updated ?? 0;
      setSyncResult({ ok: true, message: `Synced ${updated} booked dates` });
      qc.invalidateQueries({ queryKey: ['adm_availability'] });
      toast({ title: `Calendar synced - ${updated} dates updated` });
    } catch (e: any) {
      const msg = e?.message ?? String(e);
      setSyncResult({ ok: false, message: msg });
      toast({ title: 'Sync failed', description: msg });
    } finally {
      setSyncLoading(false);
    }
  };

  const blockedDates = useMemo(() => (availability || []).filter((a: any) => a.status === 'blocked').map((a: any) => new Date(a.date)), [availability]);
  const bookedDates = useMemo(() => (availability || []).filter((a: any) => a.status === 'booked').map((a: any) => new Date(a.date)), [availability]);

  const applySelection = () => {
    if (!selectedDays || selectedDays.length === 0) return;
    const dates = selectedDays.map((d) => format(d, 'yyyy-MM-dd'));
    if (markAs === 'available') {
      clearAvailability.mutate(dates);
    } else {
      upsertAvailability.mutate(dates.map((date) => ({ date, status: markAs })));
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1200px]">
      <div className="mb-10">
        <h1 className="text-[32px] font-cormorant font-medium text-[#1A1714] mb-2">Calendar Sync</h1>
        <p className="text-[15px] font-inter text-[#8a8580]">Sync external calendars and manage date availability</p>
      </div>

      {/* iCal Sync */}
      <div className="bg-white border border-[#e9e4df] rounded-xl p-6 lg:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <RefreshCw className="h-5 w-5 text-[#c5a059]" />
          <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714]">External Calendar Sync</h2>
        </div>
        <p className="text-[14px] font-inter text-[#8a8580] mb-6">
          Paste iCal URLs from Airbnb, Booking.com or Lodgify to automatically pull in bookings.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Airbnb iCal URL</Label>
            <Input
              type="url"
              value={s.airbnb_ical_url || ''}
              onChange={(e) => setLocalSettings({ ...s, airbnb_ical_url: e.target.value })}
              placeholder="https://www.airbnb.com/calendar/ical/..."
              className="mt-1.5 border-[#e9e4df]"
            />
          </div>
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Lodgify iCal URL</Label>
            <Input
              type="url"
              value={s.lodgify_ical_url || ''}
              onChange={(e) => setLocalSettings({ ...s, lodgify_ical_url: e.target.value })}
              placeholder="https://www.lodgify.com/..."
              className="mt-1.5 border-[#e9e4df]"
            />
          </div>
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Booking.com iCal URL</Label>
            <Input
              type="url"
              value={s.booking_ical_url || ''}
              onChange={(e) => setLocalSettings({ ...s, booking_ical_url: e.target.value })}
              placeholder="https://admin.booking.com/..."
              className="mt-1.5 border-[#e9e4df]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 flex-wrap">
          <Button
            onClick={() => upsertSettings.mutateAsync(s)}
            variant="outline"
            className="text-[13px] font-inter"
          >
            Save URLs
          </Button>
          <Button
            onClick={handleSync}
            disabled={syncLoading}
            className="bg-[#0f172a] hover:bg-[#c5a059] text-white text-[13px] font-inter font-medium"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${syncLoading ? 'animate-spin' : ''}`} />
            {syncLoading ? 'Syncing...' : 'Sync Calendars Now'}
          </Button>
          {syncResult && (
            <span className={`text-[13px] font-inter flex items-center gap-1.5 ${syncResult.ok ? 'text-green-600' : 'text-red-500'}`}>
              {syncResult.ok ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {syncResult.message}
            </span>
          )}
        </div>
      </div>

      {/* Availability Calendar */}
      <div className="bg-white border border-[#e9e4df] rounded-xl p-6 lg:p-8">
        <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714] mb-6">Availability Calendar</h2>

        <div className="grid lg:grid-cols-[1fr,280px] gap-6">
          {/* Calendar */}
          <div className="border border-[#e9e4df] rounded-xl p-4">
            <Calendar
              mode="multiple"
              numberOfMonths={2}
              selected={selectedDays as any}
              onSelect={setSelectedDays as any}
              modifiers={{ blocked: blockedDates, booked: bookedDates }}
              modifiersClassNames={{
                blocked: 'bg-red-100 text-red-700',
                booked: 'bg-slate-200 text-slate-600',
              }}
              className="p-3 pointer-events-auto"
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div>
              <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580] mb-2 block">Mark selected as</Label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setMarkAs('blocked')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] font-inter transition-colors ${
                    markAs === 'blocked' ? 'bg-red-50 text-red-700 border border-red-200' : 'border border-[#e9e4df] text-[#6B6560] hover:bg-[#f0ebe5]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-red-300" />
                  Blocked
                </button>
                <button
                  onClick={() => setMarkAs('booked')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] font-inter transition-colors ${
                    markAs === 'booked' ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'border border-[#e9e4df] text-[#6B6560] hover:bg-[#f0ebe5]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-slate-400" />
                  Booked
                </button>
                <button
                  onClick={() => setMarkAs('available')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] font-inter transition-colors ${
                    markAs === 'available' ? 'bg-green-50 text-green-700 border border-green-200' : 'border border-[#e9e4df] text-[#6B6560] hover:bg-[#f0ebe5]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  Available
                </button>
              </div>
            </div>

            <Button onClick={applySelection} disabled={(selectedDays?.length || 0) === 0} className="w-full bg-[#0f172a] hover:bg-[#c5a059] text-white">
              Apply to {selectedDays.length || 0} day(s)
            </Button>

            <button onClick={() => setSelectedDays([])} className="w-full text-[13px] font-inter text-[#8a8580] hover:text-[#1A1714] py-2 transition-colors">
              Clear selection
            </button>

            <div className="border-t border-[#e9e4df] pt-4 space-y-2">
              <p className="text-[13px] font-inter text-[#8a8580]">
                Blocked: <span className="font-medium text-[#1A1714]">{blockedDates.length}</span>
              </p>
              <p className="text-[13px] font-inter text-[#8a8580]">
                Booked: <span className="font-medium text-[#1A1714]">{bookedDates.length}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSync;
