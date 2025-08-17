import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingSection from '@/components/BookingSection';
import { translations as dict } from '@/utils/translations';
import { useCms } from '@/hooks/use-cms';

const Booking: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'he'>('en');

  useEffect(() => {
    document.title = 'Book Your Stay | Now We Land';
    const descText = 'Check availability and secure your perfect vacation dates';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descText);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = descText;
      document.head.appendChild(m);
    }
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    const href = window.location.href;
    if (existingCanonical) existingCanonical.setAttribute('href', href);
    else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', href);
      document.head.appendChild(link);
    }
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const t = dict[currentLang];
  const { data: bookingContent } = useCms('booking', currentLang);

  return (
    <div className={`min-h-screen ${currentLang === 'he' ? 'rtl' : 'ltr'}`}>
      <Header currentLang={currentLang} onLanguageChange={setCurrentLang} translations={t} />
      <main>
        <BookingSection translations={t} content={bookingContent || undefined} />
      </main>
      <Footer translations={t} />
    </div>
  );
};

export default Booking;
