import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  translations: any;
  content?: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations, content }) => {
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

        {/* Location eyebrow */}
        <p
          className="text-[10px] font-inter font-semibold uppercase tracking-[0.32em] text-white/60 mb-7"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
        >
          Akrotiri · Chania · Crete
        </p>

        {/* Headline */}
        <h1
          className="text-[62px] sm:text-[80px] lg:text-[96px] font-cormorant font-light text-white leading-[0.88] mb-6 max-w-2xl"
          style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}
        >
          {content?.hero_title || translations.hero.title}
        </h1>

        {/* Supporting text — two clean lines */}
        <p
          className="text-[16px] font-inter text-white/90 font-light max-w-[340px] mb-2"
          style={{ lineHeight: '1.9', textShadow: '0 1px 14px rgba(0,0,0,0.70)' }}
        >
          A private villa in Akrotiri.<br />
          90 metres from a hidden bay.
        </p>

        {/* Tagline — gold italic, short */}
        <p
          className="text-[17px] font-cormorant italic text-[#C4A882] mb-2 leading-snug"
          style={{ textShadow: '0 1px 14px rgba(0,0,0,0.65)' }}
        >
          Private pool. Sea views. Sunsets.
        </p>

        {/* Location benefit */}
        <p
          className="text-[12px] font-inter text-[#C4A882]/70 font-light mb-10 tracking-wide"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.55)' }}
        >
          From plane to pool in 14 minutes.
        </p>

        {/* CTA */}
        <button
          onClick={handleBookNow}
          className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-[#1A1714] text-[13px] font-inter font-medium tracking-[0.04em] hover:bg-[#FAF8F5] transition-colors duration-300 rounded-none"
        >
          <Calendar className="h-4 w-4" />
          Check Availability
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
