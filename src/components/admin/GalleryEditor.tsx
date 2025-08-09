import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/admin/ImageUploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category { id: string; title: string; order: number; }
interface GalleryImage { url: string; alt: string; categoryId: string; order: number; }

interface GalleryData { categories: Category[]; images: GalleryImage[]; }

interface Props {
  value: GalleryData;
  onChange: (data: GalleryData) => void;
}

const GalleryEditor: React.FC<Props> = ({ value, onChange }) => {
  const categories = value?.categories || [];
  const images = value?.images || [];

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
    const defaultCat = categories[0]?.id || '';
    const next: GalleryImage = { url: '', alt: '', categoryId: defaultCat, order: (images.length || 0) + 1 };
    onChange({ ...value, images: [...images, next] });
  };

  const removeImage = (idx: number) => {
    const arr = [...images];
    arr.splice(idx, 1);
    onChange({ ...value, images: arr });
  };

  return (
    <div className="space-y-6">
      {/* Categories Manager */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Categories</h4>
          <Button size="sm" variant="outline" onClick={addCategory}>Add Category</Button>
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
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Images</h4>
          <Button size="sm" variant="outline" onClick={addImage} disabled={categories.length === 0}>Add Image</Button>
        </div>
        <div className="space-y-3">
          {images.map((item, idx) => (
            <Card key={idx}><CardContent className="p-4 grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Image</Label>
                <ImageUploader
                  slug="gallery"
                  label="Upload image"
                  value={item.url}
                  alt={item.alt}
                  onChange={(url, alt) => {
                    const arr = [...images];
                    arr[idx] = { ...arr[idx], url, alt };
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
                      arr[idx] = { ...arr[idx], alt: e.target.value };
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
                      arr[idx] = { ...arr[idx], categoryId: val };
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
                      arr[idx] = { ...arr[idx], order: Number(e.target.value) };
                      onChange({ ...value, images: arr });
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button size="sm" variant="ghost" onClick={() => removeImage(idx)}>Remove</Button>
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
