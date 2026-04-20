import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  translations: any;
  content?: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations, content }) => {
  const lang = document.documentElement.lang === 'he' ? 'he' : 'en';
  const handleBookNow = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={content?.hero_image?.url || '/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png'}
          alt={content?.hero_image?.alt || 'Villa overlooking the Aegean at sunset'}
          className="w-full h-full object-cover"
          fetchPriority="high"
          style={{
            objectPosition: `${content?.hero_image?.position?.x ?? 50}% ${content?.hero_image?.position?.y ?? 50}%`,
          }}
        />

        {/* Top vignette — barely-there, just enough for nav */}
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/18 to-transparent" />

        {/* Bottom gradient — very light, text carries itself with shadow */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 28%, transparent 55%)' }}
        />

        {/* Left vignette — minimal */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 38%, transparent 60%)' }}
        />
      </div>

      {/* Content — bottom-left anchored */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 lg:px-16 pb-20 lg:pb-24">

        {/* Location eyebrow — gold */}
        <p
          className="text-[12px] font-inter font-semibold uppercase tracking-[0.35em] text-[#c5a059] mb-8"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
        >
          Akrotiri &nbsp;•&nbsp; Chania &nbsp;•&nbsp; Crete
        </p>

        {/* Headline */}
        <h1
          className="text-[64px] sm:text-[82px] lg:text-[98px] font-cormorant font-light text-white leading-[0.88] mb-8 max-w-2xl"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.45)' }}
        >
          Now We Land
        </h1>

        {/* Primary subtitle */}
        <p
          className="text-[22px] lg:text-[26px] font-inter text-white/90 font-light mb-5"
          style={{ textShadow: '0 1px 16px rgba(0,0,0,0.55)' }}
        >
          A private villa in Crete, 90 meters from a <span className="text-[#c5a059]">hidden bay</span>
        </p>

        {/* Secondary line — punchy */}
        <p
          className="text-[17px] lg:text-[19px] font-inter text-white/55 font-light italic mb-12"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
        >
          Sunset views. Total privacy. Just 14 minutes from the airport
        </p>

        {/* CTA */}
        <button
          onClick={handleBookNow}
          className="inline-flex items-center gap-2.5 px-10 py-4 bg-white/95 text-[#1A1714] text-[14px] font-inter font-medium tracking-[0.08em] uppercase hover:bg-[#c5a059] hover:text-white transition-all duration-300"
        >
          <Calendar className="h-4 w-4" />
          {lang === 'he' ? 'בדקו זמינות' : 'Check Availability'}
        </button>

      </div>

      {/* Scroll indicator — bottom center, clickable */}
      <button
        onClick={handleScrollDown}
        aria-label="Scroll to next section"
        className="absolute left-1/2 -translate-x-1/2 z-10 p-2 hover:opacity-60 transition-opacity duration-300"
        style={{ bottom: '40px' }}
      >
        <ChevronDown
          className="h-[20px] w-[20px] text-white/40 animate-bounce"
          strokeWidth={1.2}
        />
      </button>

    </section>
  );
};

export default HeroSection;
