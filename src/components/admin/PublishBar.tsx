
import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  onSave: () => void;
  onPublish: () => void;
}

const PublishBar: React.FC<Props> = ({ onSave, onPublish }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg">
      <div className="container max-w-7xl mx-auto py-4 flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onSave} size="lg">
          שמור טיוטה
        </Button>
        <Button onClick={onPublish} size="lg">
          פרסם
        </Button>
      </div>
    </div>
  );
};

export default PublishBar;
