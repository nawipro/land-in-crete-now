import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import DayAtVillaSection from '@/components/DayAtVillaSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingSection from '@/components/BookingSection';
import ExploreSection from '@/components/ExploreSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AdminAccess from '@/components/AdminAccess';
import CookieConsent from '@/components/CookieConsent';
import { translations } from '@/utils/translations';
import { useCms } from '@/hooks/use-cms';

const Index = () => {
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }, []);

  const t = translations.en;

  const { data: homeContent } = useCms('home', 'en');
  const { data: aboutContent } = useCms('about', 'en');
  const { data: galleryContent } = useCms('gallery', 'en');
  const { data: bookingContent } = useCms('booking', 'en');
  const { data: contactContent } = useCms('contact', 'en');

  return (
    <div className="min-h-screen">
      <Header translations={t} />

      <main>
        <HeroSection translations={t} content={homeContent || undefined} />
        <AboutSection translations={t} content={aboutContent || undefined} />
        <DayAtVillaSection />
        <GallerySection translations={t} content={galleryContent || undefined} />
        <TestimonialsSection />
        <BookingSection translations={t} content={bookingContent || undefined} />
        <ExploreSection />
        <ContactSection translations={t} content={contactContent || undefined} />
      </main>

      <Footer translations={t} />
      <AdminAccess />
      <CookieConsent />
    </div>
  );
};

export default Index;
