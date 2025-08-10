import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/admin/ImageUploader';
import BulkImageUploader from '@/components/admin/BulkImageUploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { deleteImage } from '@/lib/cms';

interface Category { id: string; title: string; order: number; }
interface GalleryImage { path?: string; url: string; alt: string; categoryId: string; order: number; }

interface GalleryData { categories: Category[]; images: GalleryImage[]; }

interface Props {
  value: GalleryData;
  onChange: (data: GalleryData) => void;
}

const GalleryEditor: React.FC<Props> = ({ value, onChange }) => {
  const categories = value?.categories || [];
  const images = value?.images || [];
  const supabase = getSupabaseClient();
  const { toast } = useToast();
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');

  const addCategory = () => {
    const next: Category = { id: `cat-${Date.now()}`, title: '', order: (categories.length || 0) + 1 };
    onChange({ ...value, categories: [...categories, next] });
  };

  const removeCategory = (idx: number) => {
    const removed = categories[idx];
    const nextCats = [...categories];
    nextCats.splice(idx, 1);
    // Reassign images from removed category to first available (if any) or empty
    const fallback = nextCats[0]?.id || '';
    const nextImages = images.map((img) => (img.categoryId === removed.id ? { ...img, categoryId: fallback } : img));
    onChange({ ...value, categories: nextCats, images: nextImages });
  };

  const addImage = () => {
    const defaultCat = selectedCatFilter !== 'all' ? selectedCatFilter : (categories[0]?.id || '');
    const next: GalleryImage = { url: '', alt: '', categoryId: defaultCat, order: (images.length || 0) + 1 };
    onChange({ ...value, images: [...images, next] });
  };

  const removeImage = (idx: number) => {
    const arr = [...images];
    arr.splice(idx, 1);
    onChange({ ...value, images: arr });
  };

  const defaultCategoryDefs: Category[] = [
    { id: 'outdoor', title: 'OUTDOOR VILLA', order: 1 },
    { id: 'garden-day-light', title: 'GARDEN DAY LIGHT', order: 2 },
    { id: 'garden-night', title: 'GARDEN NIGHT', order: 3 },
    { id: 'secret-bay', title: 'SECRET BAY', order: 4 },
    { id: 'sunset', title: 'SUNSET', order: 5 },
    { id: 'living-room', title: 'LIVING ROOM', order: 6 },
    { id: 'balconies', title: 'BALCONIES', order: 7 },
    { id: 'bed-room-1', title: 'BED ROOM 1', order: 8 },
    { id: 'bed-room-2', title: 'BED ROOM 2', order: 9 },
    { id: 'bed-room-3', title: 'BED ROOM 3', order: 10 },
  ];

  const loadDefaultCategories = () => {
    const existingIds = new Set(categories.map((c) => c.id));
    const baseOrder = categories.length;
    const toAdd = defaultCategoryDefs
      .filter((dc) => !existingIds.has(dc.id))
      .map((dc, idx) => ({ ...dc, order: baseOrder + idx + 1 }));
    if (toAdd.length === 0) {
      toast({ title: 'All default categories already added' });
      return;
    }
    onChange({ ...value, categories: [...categories, ...toAdd] });
    toast({ title: 'Default categories added' });
  };

  return (
    <div className="space-y-6">
      {/* Categories Manager */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Categories</h4>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={loadDefaultCategories}>Load Default Categories</Button>
            <Button size="sm" variant="outline" onClick={addCategory}>Add Category</Button>
          </div>
        </div>
        <div className="space-y-3">
          {categories.map((cat, idx) => (
            <Card key={cat.id}><CardContent className="p-4 grid md:grid-cols-3 gap-3">
              <div className="space-y-2 md:col-span-2">
                <Label>Title</Label>
                <Input
                  value={cat.title}
                  onChange={(e) => {
                    const next = [...categories];
                    next[idx] = { ...next[idx], title: e.target.value };
                    onChange({ ...value, categories: next });
                  }}
                  placeholder="e.g. Outdoor / Hidden Bay / Bedrooms"
                />
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  value={cat.order}
                  onChange={(e) => {
                    const next = [...categories];
                    next[idx] = { ...next[idx], order: Number(e.target.value) };
                    onChange({ ...value, categories: next });
                  }}
                />
              </div>
              <div className="md:col-span-3 flex justify-end">
                <Button size="sm" variant="ghost" onClick={() => removeCategory(idx)}>Remove</Button>
              </div>
            </CardContent></Card>
          ))}
          {categories.length === 0 && (
            <Card><CardContent className="p-4 text-sm text-muted-foreground">No categories yet. Create one to start uploading images.</CardContent></Card>
          )}
        </div>
      </div>

      {/* Images Manager */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h4 className="text-sm font-medium">Images</h4>
          <div className="flex items-center gap-2">
            <Select value={selectedCatFilter} onValueChange={setSelectedCatFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.title || 'Untitled'}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={addImage} disabled={categories.length === 0}>Add Image</Button>
            <BulkImageUploader
              slug="gallery"
              label="העלאת מספר תמונות"
              disabled={categories.length === 0}
              onUploaded={(items) => {
                const defaultCat = selectedCatFilter !== 'all' ? selectedCatFilter : (categories[0]?.id || '');
                const start = images.length;
                const newImages = (items as { url: string; path: string }[]).map((it, idx) => ({
                  url: it.url,
                  alt: '',
                  categoryId: defaultCat,
                  order: start + idx + 1,
                  path: it.path,
                }));
                onChange({ ...value, images: [...images, ...newImages] });
              }}
            />
          </div>
        </div>
        <div className="space-y-3">
          {(selectedCatFilter === 'all'
            ? images.map((img, i) => ({ img, i }))
            : images
                .map((img, i) => ({ img, i }))
                .filter((x) => x.img.categoryId === selectedCatFilter)
          ).map(({ img: item, i: originalIndex }) => (
            <Card key={originalIndex}><CardContent className="p-4 grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Image</Label>
                <ImageUploader
                  slug="gallery"
                  label="Upload image"
                  value={item.url}
                  alt={item.alt}
                  onChange={(url, alt, options) => {
                    const arr = [...images];
                    arr[originalIndex] = { ...arr[originalIndex], url, alt, ...(options?.path ? { path: options.path } : {}) };
                    onChange({ ...value, images: arr });
                  }}
                />
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Alt text (for accessibility)</Label>
                  <Input
                    value={item.alt}
                    onChange={(e) => {
                      const arr = [...images];
                      arr[originalIndex] = { ...arr[originalIndex], alt: e.target.value };
                      onChange({ ...value, images: arr });
                    }}
                    placeholder="Villa, pool and garden view during the day"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={item.categoryId}
                    onValueChange={(val) => {
                      const arr = [...images];
                      arr[originalIndex] = { ...arr[originalIndex], categoryId: val };
                      onChange({ ...value, images: arr });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.title || 'Untitled'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={item.order}
                    onChange={(e) => {
                      const arr = [...images];
                      arr[originalIndex] = { ...arr[originalIndex], order: Number(e.target.value) };
                      onChange({ ...value, images: arr });
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button size="sm" variant="outline" onClick={async () => {
                  if (!item.path) { toast({ title: 'No storage file found for this image' }); return; }
                  try {
                    await deleteImage(supabase, item.path);
                    const arr = [...images];
                    arr[originalIndex] = { ...arr[originalIndex], url: '', path: '' };
                    onChange({ ...value, images: arr });
                    toast({ title: 'Deleted from storage' });
                  } catch (e: any) {
                    toast({ title: 'Delete failed', description: e.message });
                  }
                }}>Delete file</Button>
                <Button size="sm" variant="ghost" onClick={() => removeImage(originalIndex)}>Remove from list</Button>
              </div>
            </CardContent></Card>
          ))}
          {images.length === 0 && (
            <Card><CardContent className="p-4 text-sm text-muted-foreground">No images yet. Add images after creating at least one category.</CardContent></Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryEditor;
