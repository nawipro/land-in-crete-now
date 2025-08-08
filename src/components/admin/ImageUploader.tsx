import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { uploadImage } from '@/lib/cms';
import type { PageSlug } from '@/lib/cms';

interface Props {
  slug: PageSlug;
  label: string;
  value: string;
  alt: string;
  onChange: (url: string, alt: string) => void;
}

const ImageUploader: React.FC<Props> = ({ slug, label, value, alt, onChange }) => {
  const supabase = getSupabaseClient();
  const { toast } = useToast();
  const [uploading, setUploading] = React.useState(false);

  const onFile = async (file?: File) => {
    if (!file || !supabase) return;
    setUploading(true);
    try {
      const res = await uploadImage(supabase, slug, file);
      onChange(res.url, alt);
      toast({ title: 'Image uploaded' });
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.message });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} />
            <Button variant="outline" disabled>{uploading ? 'Uploading…' : 'Upload'}</Button>
          </div>
          {value ? (
            <div className="grid md:grid-cols-[160px,1fr] gap-3 items-start">
              <img src={value} alt={alt || 'uploaded image'} className="rounded-md w-40 h-24 object-cover" loading="lazy" />
              <div className="space-y-2">
                <Label>Alt text</Label>
                <Input value={alt} onChange={(e) => onChange(value, e.target.value)} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No image selected</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUploader;
