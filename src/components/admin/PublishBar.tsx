import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onSave: () => void;
  onPublish: () => void;
}

const PublishBar: React.FC<Props> = ({ onSave, onPublish }) => {
  return (
    <div className="sticky bottom-0 mt-6 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-3 flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onSave}>Save Draft</Button>
        <Button onClick={onPublish}>Publish</Button>
      </div>
    </div>
  );
};

export default PublishBar;
