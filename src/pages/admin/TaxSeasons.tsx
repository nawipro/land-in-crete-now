import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TaxSeason {
  id?: string;
  season_name: string;
  start_date: string; // yyyy-MM-dd
  end_date: string;   // yyyy-MM-dd
  tax_per_guest_per_night: number;
  status: 'draft' | 'published';
}

const toISO = (d: Date) => d.toISOString().slice(0, 10);

const TaxSeasons: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const qc = useQueryClient();

  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    document.title = 'Tax Seasons | Admin';
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate('/admin/login');
      else setAuthed(true);
    });
  }, [navigate]);

  const { data: seasons } = useQuery<TaxSeason[]>({
    queryKey: ['tax_seasons_admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tax_seasons')
        .select('*')
        .order('start_date', { ascending: true });
      if (error) throw error;
      return (data || []) as any;
    }
  });

  const [form, setForm] = useState<TaxSeason>({
    season_name: '',
    start_date: toISO(new Date()),
    end_date: toISO(new Date()),
    tax_per_guest_per_night: 0,
    status: 'published'
  });

  const upsert = useMutation({
    mutationFn: async (payload: TaxSeason) => {
      const { error } = await supabase
        .from('tax_seasons')
        .upsert(payload, { onConflict: 'id' })
        .select();
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tax_seasons_admin'] });
      setForm({ season_name: '', start_date: toISO(new Date()), end_date: toISO(new Date()), tax_per_guest_per_night: 0, status: 'published' });
      toast({ title: 'Saved tax season' });
    },
    onError: (e: any) => toast({ title: 'Save failed', description: e.message, variant: 'destructive' as any })
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('tax_seasons').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tax_seasons_admin'] });
      toast({ title: 'Deleted' });
    },
    onError: (e: any) => toast({ title: 'Delete failed', description: e.message, variant: 'destructive' as any })
  });

  if (!authed) return null;

  return (
    <main className="min-h-screen container py-6">
      <Card>
        <CardHeader>
          <CardTitle>Tax Seasons (Tourist tax only)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-5 gap-3 items-end">
            <div>
              <Label>Season name</Label>
              <Input value={form.season_name} onChange={(e)=> setForm({ ...form, season_name: e.target.value })} placeholder="e.g. High Season" />
            </div>
            <div>
              <Label>Start date</Label>
              <Input type="date" value={form.start_date} onChange={(e)=> setForm({ ...form, start_date: e.target.value })} />
            </div>
            <div>
              <Label>End date</Label>
              <Input type="date" value={form.end_date} onChange={(e)=> setForm({ ...form, end_date: e.target.value })} />
            </div>
            <div>
              <Label>Tax per guest per night</Label>
              <Input type="number" step="0.01" value={form.tax_per_guest_per_night}
                onChange={(e)=> setForm({ ...form, tax_per_guest_per_night: parseFloat(e.target.value||'0') })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={()=> upsert.mutate(form)}>Save</Button>
              <Button variant="outline" onClick={()=> setForm({ season_name: '', start_date: toISO(new Date()), end_date: toISO(new Date()), tax_per_guest_per_night: 0, status: 'published' })}>Clear</Button>
            </div>
          </div>

          <div className="border rounded-xl divide-y">
            {(seasons||[]).map((s) => (
              <div key={s.id} className="grid md:grid-cols-6 gap-2 items-center p-3">
                <div className="font-medium">{s.season_name}</div>
                <div>{s.start_date} → {s.end_date}</div>
                <div className="text-sm">Tax: {s.tax_per_guest_per_night}</div>
                <div className="text-xs uppercase">{s.status}</div>
                <div className="col-span-2 flex gap-2 justify-end">
                  <Button size="sm" variant="secondary" onClick={()=> setForm({ ...s })}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={()=> s.id && remove.mutate(s.id)}>Delete</Button>
                </div>
              </div>
            ))}
            {(!seasons || seasons.length === 0) && (
              <div className="p-4 text-sm text-muted-foreground">No tax seasons yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default TaxSeasons;
