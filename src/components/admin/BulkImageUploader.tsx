import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { uploadImage } from '@/lib/cms';
import type { PageSlug } from '@/lib/cms';

interface Props {
  slug: PageSlug;
  onUploaded: (items: { url: string; path: string }[]) => void;
  label?: string;
  disabled?: boolean;
}

// Allows selecting multiple files and uploads them to Supabase storage
const BulkImageUploader: React.FC<Props> = ({ slug, onUploaded, label = 'Bulk upload', disabled }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const supabase = getSupabaseClient();
  const { toast } = useToast();
  const [uploading, setUploading] = React.useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const onFiles = async (filesList: FileList | null) => {
    if (!filesList || !supabase) return;
    const files = Array.from(filesList);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          try {
            const res = await uploadImage(supabase, slug, file);
            return { ok: true as const, url: res.url, path: res.path };
          } catch (e) {
            console.error('Upload failed for', file.name, e);
            return { ok: false as const };
          }
        })
      );

      const success = results.filter((r) => r.ok) as { ok: true; url: string; path: string }[];
      const failCount = results.length - success.length;

      if (success.length) {
        // @ts-ignore - parent expects array of {url,path}
        onUploaded(success.map(({ url, path }) => ({ url, path })));
      }
      toast({ title: 'Upload finished', description: `${success.length} uploaded${failCount ? `, ${failCount} failed` : ''}` });
    } finally {
      setUploading(false);
      // reset the input so same files can be re-selected if needed
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      <Button size="sm" variant="outline" onClick={handleClick} disabled={disabled || uploading}>
        {uploading ? 'Uploading…' : label}
      </Button>
    </>
  );
};

export default BulkImageUploader;
