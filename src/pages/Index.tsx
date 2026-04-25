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
import StickyBookButton from '@/components/StickyBookButton';
import InlineBookCTA from '@/components/InlineBookCTA';
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

        {/* SEO text block */}
        <section className="py-16 lg:py-20 bg-[#FAF8F5]">
          <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-[28px] lg:text-[36px] font-cormorant font-medium text-[#1A1714] mb-8 leading-[1.15]">
              Private Villa in Crete Near Chania
            </h2>
            <p className="text-[16px] lg:text-[17px] font-inter text-[#6B6560] font-light leading-[1.9] mb-5">
              Now We Land is a private villa in Akrotiri, on the Chania peninsula. Just 20 minutes from the old town and 90 metres from the sea, it offers a rare balance between access and privacy.
            </p>
            <p className="text-[16px] lg:text-[17px] font-inter text-[#6B6560] font-light leading-[1.9]">
              Three bedrooms, a private pool, and open outdoor space designed for real stays - not hotel visits. A place to slow down, disconnect, and experience Crete at your own pace.
            </p>
          </div>
        </section>

        <AboutSection translations={t} content={aboutContent || undefined} />
        <InlineBookCTA />
        <DayAtVillaSection />
        <GallerySection translations={t} content={galleryContent || undefined} />
        <InlineBookCTA />
        <TestimonialsSection />
        <BookingSection translations={t} content={bookingContent || undefined} />
        <ExploreSection />
        <ContactSection translations={t} content={contactContent || undefined} />
      </main>

      <Footer translations={t} />
      <AdminAccess />
      <CookieConsent />
      <StickyBookButton />
    </div>
  );
};

export default Index;
