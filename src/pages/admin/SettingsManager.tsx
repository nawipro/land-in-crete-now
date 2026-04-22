import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SettingsManager: React.FC = () => {
  const qc = useQueryClient();
  const { toast } = useToast();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['adm_settings'],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from('settings').select('key, value');
      if (error) throw error;
      const obj: any = {};
      (data || []).forEach((row: any) => { obj[row.key] = row.value; });
      return obj;
    },
  });

  const [local, setLocal] = useState<any>(null);
  const s = local ?? settings ?? {};

  const update = (key: string, value: string) => {
    setLocal({ ...s, [key]: value });
  };

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

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c5a059]" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-[900px]">
      <div className="mb-10">
        <h1 className="text-[32px] font-cormorant font-medium text-[#1A1714] mb-2">Settings</h1>
        <p className="text-[15px] font-inter text-[#8a8580]">General booking and contact settings</p>
      </div>

      {/* Booking Settings */}
      <div className="bg-white border border-[#e9e4df] rounded-xl p-6 lg:p-8 mb-8">
        <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714] mb-6">Booking Settings</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Cleaning Fee (&euro;)</Label>
            <Input
              type="number"
              value={s.cleaning_fee || ''}
              onChange={(e) => update('cleaning_fee', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="80"
            />
          </div>
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Cleaning Free Nights</Label>
            <Input
              type="number"
              value={s.cleaning_free_nights || ''}
              onChange={(e) => update('cleaning_free_nights', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="5"
            />
            <p className="text-[11px] font-inter text-[#B8B2AC] mt-1">Cleaning fee applies once per X nights</p>
          </div>
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Currency</Label>
            <Input
              value={s.currency || ''}
              onChange={(e) => update('currency', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="EUR"
            />
          </div>
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Inquiry Email</Label>
            <Input
              type="email"
              value={s.inquiry_email || ''}
              onChange={(e) => update('inquiry_email', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="info@nowweland.com"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white border border-[#e9e4df] rounded-xl p-6 lg:p-8 mb-8">
        <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714] mb-6">Contact Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Phone</Label>
            <Input
              type="tel"
              value={s.phone || ''}
              onChange={(e) => update('phone', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="+30 123 456 789"
            />
          </div>
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">WhatsApp</Label>
            <Input
              type="tel"
              value={s.whatsapp || ''}
              onChange={(e) => update('whatsapp', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="+30 123 456 789"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Address</Label>
            <Input
              value={s.address || ''}
              onChange={(e) => update('address', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="Akrotiri, Chania, Crete, Greece"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white border border-[#e9e4df] rounded-xl p-6 lg:p-8 mb-8">
        <h2 className="text-[20px] font-cormorant font-medium text-[#1A1714] mb-6">Social Links</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Facebook URL</Label>
            <Input
              type="url"
              value={s.facebook_url || ''}
              onChange={(e) => update('facebook_url', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="https://facebook.com/nowweland"
            />
          </div>
          <div>
            <Label className="text-[12px] font-inter uppercase tracking-wider text-[#8a8580]">Instagram URL</Label>
            <Input
              type="url"
              value={s.instagram_url || ''}
              onChange={(e) => update('instagram_url', e.target.value)}
              className="mt-1.5 border-[#e9e4df]"
              placeholder="https://instagram.com/nowweland"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button
          onClick={() => upsertSettings.mutateAsync(s)}
          className="bg-[#0f172a] hover:bg-[#c5a059] text-white text-[13px] font-inter font-medium uppercase tracking-wider px-8 py-5"
        >
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsManager;
