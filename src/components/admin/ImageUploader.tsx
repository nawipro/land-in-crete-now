import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { uploadImage } from '@/lib/cms';
import type { PageSlug } from '@/lib/cms';

interface Props {
  slug: PageSlug;
  label: string;
  value: string;
  alt: string;
  fit?: 'cover' | 'contain';
  position?: { x: number; y: number };
  onChange: (url: string, alt: string, options?: { fit?: 'cover' | 'contain'; position?: { x: number; y: number } }) => void;
}

const ImageUploader: React.FC<Props> = ({ slug, label, value, alt, fit = 'cover', position, onChange }) => {
  const supabase = getSupabaseClient();
  const { toast } = useToast();
  const [uploading, setUploading] = React.useState(false);

  const currentFit = fit ?? 'cover';
  const currentPosX = position?.x ?? 50;
  const currentPosY = position?.y ?? 50;

  const onFile = async (file?: File) => {
    if (!file || !supabase) return;
    setUploading(true);
    try {
      const res = await uploadImage(supabase, slug, file);
      onChange(res.url, alt, { fit: currentFit, position: { x: currentPosX, y: currentPosY } });
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
              <img src={value} alt={alt || 'uploaded image'} className="rounded-md w-40 h-24" loading="lazy" style={{ objectFit: currentFit as any, objectPosition: `${currentPosX}% ${currentPosY}%` }} />
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Alt text</Label>
                  <Input value={alt} onChange={(e) => onChange(value, e.target.value, { fit: currentFit, position: { x: currentPosX, y: currentPosY } })} />
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Fit</Label>
                    <Select value={currentFit} onValueChange={(v) => onChange(value, alt, { fit: v as 'cover' | 'contain', position: { x: currentPosX, y: currentPosY } })}>
                      <SelectTrigger><SelectValue placeholder="Fit" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cover">Cover (may crop)</SelectItem>
                        <SelectItem value="contain">Contain (no crop)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Focus X (%)</Label>
                    <input type="range" min={0} max={100} value={currentPosX} onChange={(e) => onChange(value, alt, { fit: currentFit, position: { x: Number(e.target.value), y: currentPosY } })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Focus Y (%)</Label>
                    <input type="range" min={0} max={100} value={currentPosY} onChange={(e) => onChange(value, alt, { fit: currentFit, position: { x: currentPosX, y: Number(e.target.value) } })} />
                  </div>
                </div>
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
