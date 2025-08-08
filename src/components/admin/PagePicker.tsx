import React from 'react';
import { Button } from '@/components/ui/button';
import type { PageSlug } from '@/lib/cms';

const PAGES: { label: string; value: PageSlug }[] = [
  { label: 'Home', value: 'home' },
  { label: 'About', value: 'about' },
  { label: 'Gallery', value: 'gallery' },
  { label: 'Explore', value: 'explore' },
  { label: 'Booking', value: 'booking' },
  { label: 'Contact', value: 'contact' },
];

const PagePicker: React.FC<{ value: PageSlug; onChange: (p: PageSlug) => void }> = ({ value, onChange }) => {
  return (
    <nav className="flex flex-col gap-2">
      {PAGES.map((p) => (
        <Button key={p.value} variant={value === p.value ? 'default' : 'ghost'} className="justify-start" onClick={() => onChange(p.value)}>
          {p.label}
        </Button>
      ))}
    </nav>
  );
};

export default PagePicker;
