import React from 'react';
import { Button } from '@/components/ui/button';
import type { PageSlug } from '@/lib/cms';

const ORDER: PageSlug[] = ['home','about','gallery','explore','booking','contact'];

const LABELS: Record<'en' | 'he', Record<PageSlug, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    gallery: 'Gallery',
    explore: 'Explore',
    booking: 'Booking',
    contact: 'Contact',
  },
  he: {
    home: 'בית',
    about: 'אודות',
    gallery: 'גלריה',
    explore: 'גלו את האזור',
    booking: 'הזמנה',
    contact: 'יצירת קשר',
  }
};

const PagePicker: React.FC<{ value: PageSlug; onChange: (p: PageSlug) => void; lang?: 'en' | 'he' }>
= ({ value, onChange, lang = 'he' }) => {
  const labels = LABELS[lang];
  return (
    <nav className="flex flex-col gap-2">
      {ORDER.map((slug) => (
        <Button key={slug} variant={value === slug ? 'default' : 'ghost'} className="justify-start" onClick={() => onChange(slug)}>
          {labels[slug]}
        </Button>
      ))}
    </nav>
  );
};

export default PagePicker;
