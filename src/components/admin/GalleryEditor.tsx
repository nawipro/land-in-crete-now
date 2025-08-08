import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface GalleryItem { url: string; alt: string; caption: string; order: number; }

interface Props {
  value: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
}

const GalleryEditor: React.FC<Props> = ({ value, onChange }) => {
  const add = () => onChange([...(value||[]), { url: '', alt: '', caption: '', order: (value?.length||0)+1 }]);
  const remove = (idx: number) => { const arr = [...value]; arr.splice(idx,1); onChange(arr); };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Images</h4>
        <Button size="sm" variant="outline" onClick={add}>Add</Button>
      </div>
      <div className="space-y-3">
        {(value||[]).map((item, idx) => (
          <Card key={idx}><CardContent className="p-4 grid md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>URL</Label>
              <Input value={item.url} onChange={(e) => { const arr = [...value]; arr[idx] = { ...arr[idx], url: e.target.value }; onChange(arr); }} />
              <Label>Alt</Label>
              <Input value={item.alt} onChange={(e) => { const arr = [...value]; arr[idx] = { ...arr[idx], alt: e.target.value }; onChange(arr); }} />
            </div>
            <div className="space-y-2">
              <Label>Caption</Label>
              <Textarea value={item.caption} onChange={(e) => { const arr = [...value]; arr[idx] = { ...arr[idx], caption: e.target.value }; onChange(arr); }} />
              <Label>Order</Label>
              <Input type="number" value={item.order} onChange={(e) => { const arr = [...value]; arr[idx] = { ...arr[idx], order: Number(e.target.value) }; onChange(arr); }} />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button size="sm" variant="ghost" onClick={() => remove(idx)}>Remove</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryEditor;
