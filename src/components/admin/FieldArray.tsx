import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  label: string;
  values: string[];
  onChange: (arr: string[]) => void;
}

const FieldArray: React.FC<Props> = ({ label, values, onChange }) => {
  const add = () => onChange([...(values||[]), '']);
  const remove = (idx: number) => { const arr = [...values]; arr.splice(idx,1); onChange(arr); };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button size="sm" variant="outline" onClick={add}>Add</Button>
      </div>
      <div className="space-y-2">
        {(values||[]).map((v, idx) => (
          <div key={idx} className="flex gap-2">
            <Input value={v} onChange={(e) => { const arr = [...values]; arr[idx] = e.target.value; onChange(arr); }} />
            <Button size="sm" variant="ghost" onClick={() => remove(idx)}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldArray;
