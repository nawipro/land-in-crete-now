
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { translations } from '@/utils/translations';
import { useCms } from '@/hooks/use-cms';

const Index = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'he'>('he');

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const currentTranslations = translations[currentLang];

  const { data: homeContent } = useCms('home', currentLang);
  const { data: aboutContent } = useCms('about', currentLang);

  return (
    <div className={`min-h-screen ${currentLang === 'he' ? 'rtl' : 'ltr'}`}>
      <Header 
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        translations={currentTranslations}
      />
      
      <main>
        <HeroSection translations={currentTranslations} content={homeContent || undefined} />
        <AboutSection translations={currentTranslations} content={aboutContent || undefined} />
        <GallerySection translations={currentTranslations} />
        <BookingSection translations={currentTranslations} />
        <ContactSection translations={currentTranslations} />
      </main>
      
      <Footer translations={currentTranslations} />
    </div>
  );
};

export default Index;
