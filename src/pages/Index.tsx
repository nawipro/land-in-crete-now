import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import DayAtVillaSection from '@/components/DayAtVillaSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AdminAccess from '@/components/AdminAccess';
import { translations } from '@/utils/translations';
import { useCms } from '@/hooks/use-cms';

const Index = () => {
  // Clear any stored language preference and force English
  const [currentLang, setCurrentLang] = useState<'en' | 'he'>(() => {
    // Force English as default and clear any stored preferences
    localStorage.removeItem('preferredLanguage');
    return 'en';
  });

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const currentTranslations = translations[currentLang];

  const { data: homeContent } = useCms('home', currentLang);
  const { data: aboutContent } = useCms('about', currentLang);
  const { data: galleryContent } = useCms('gallery', currentLang);
  const { data: bookingContent } = useCms('booking', currentLang);
  const { data: contactContent } = useCms('contact', currentLang);

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
        <DayAtVillaSection />
        <GallerySection translations={currentTranslations} content={galleryContent || undefined} />
        <TestimonialsSection />
        <BookingSection translations={currentTranslations} content={bookingContent || undefined} />
        <ContactSection translations={currentTranslations} content={contactContent || undefined} />
      </main>
      
      <Footer translations={currentTranslations} />
      <AdminAccess />
    </div>
  );
};

export default Index;
