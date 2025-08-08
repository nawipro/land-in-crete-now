import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
  textarea?: boolean;
}

const FieldText: React.FC<Props> = ({ label, value, onChange, required, maxLength, textarea }) => {
  return (
    <div className="space-y-2">
      <Label>{label}{required ? ' *' : ''}</Label>
      {textarea ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} />
      )}
    </div>
  );
};

export default FieldText;
