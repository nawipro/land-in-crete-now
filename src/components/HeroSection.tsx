import React from 'react';

interface HeroSectionProps {
  translations: any;
  content?: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const handleBookNow = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative">

      {/* ── DESKTOP: image-native aspect, text overlaid ── */}
      <div className="hidden lg:block relative">
        <img
          src={content?.hero_image?.url || '/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png'}
          alt={content?.hero_image?.alt || 'Villa overlooking the Aegean at sunset'}
          className="w-full aspect-[3/2] object-cover object-center"
          fetchPriority="high"
        />

        {/* Bottom-only gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(26,20,16,0) 55%, rgba(26,20,16,0.55) 100%)' }}
        />

        {/* Bottom-left: headline stack */}
        <div className="absolute bottom-0 left-0 z-10 px-[72px] pb-16 max-w-[700px]">
          <p
            className="text-[10px] font-sans font-medium uppercase tracking-[.32em] text-[#f4f1ea] opacity-70 mb-7"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,.4)' }}
          >
            Akrotiri &nbsp;·&nbsp; Chania &nbsp;·&nbsp; Crete
          </p>
          <h1
            className="font-serif font-light text-[88px] text-[#f4f1ea] leading-[0.9] mb-6 tracking-[-.015em]"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,.35)' }}
          >
            Now We Land
          </h1>
          <p
            className="font-sans text-[18px] text-[#f4f1ea]/85 font-normal leading-[1.55] mb-4"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,.45)' }}
          >
            A private villa in Crete, 90 meters from a hidden bay
          </p>
          <p
            className="font-serif italic font-light text-[17px] text-[#f4f1ea]/55 mb-10"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,.4)' }}
          >
            Sunset views. Total privacy. Just 14 minutes from the airport
          </p>

          {/* CTA — ink filled */}
          <button
            onClick={handleBookNow}
            className="px-8 py-[18px] bg-[#2a251f] text-[#f4f1ea] text-[11px] font-sans font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300"
          >
            Check Availability&nbsp;&nbsp;→
          </button>
          <p className="text-[9px] font-sans tracking-[.22em] uppercase text-[#f4f1ea]/50 mt-4">
            We answer every inquiry personally
          </p>
        </div>

        {/* Bottom-right: coordinates */}
        <div className="absolute bottom-0 right-0 z-10 px-[72px] pb-16 text-right">
          <p
            className="text-[9px] font-sans font-medium uppercase tracking-[.3em] text-[#f4f1ea]/60"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,.4)' }}
          >
            N 35°32′ E 24°08′
          </p>
        </div>
      </div>

      {/* ── MOBILE + TABLET: stacked layout ── */}
      <div className="lg:hidden">
        {/* Image — full, uncropped */}
        <div className="relative">
          <img
            src={content?.hero_image?.url || '/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png'}
            alt={content?.hero_image?.alt || 'Villa overlooking the Aegean at sunset'}
            className="w-full aspect-[3/2] object-cover object-center"
            fetchPriority="high"
          />
          {/* Labels over image */}
          <p
            className="absolute top-5 left-5 text-[9px] font-sans font-medium uppercase tracking-[.3em] text-[#f4f1ea]"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,.5)' }}
          >
            Akrotiri · Chania · Crete
          </p>
          <p
            className="absolute top-5 right-5 text-[9px] font-sans font-medium uppercase tracking-[.3em] text-[#f4f1ea]"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,.5)' }}
          >
            N 35°32′ E 24°08′
          </p>
        </div>

        {/* Text panel below image */}
        <div className="bg-[#f4f1ea] px-5 md:px-10 py-12 md:py-16">
          <h1 className="font-serif font-light text-[52px] md:text-[68px] text-[#2a251f] leading-[0.9] mb-5 tracking-[-.015em]">
            Now We Land
          </h1>
          <p className="font-sans text-[16px] md:text-[17px] text-[#2a251f]/80 font-normal leading-[1.55] mb-3 max-w-md">
            A private villa in Crete, 90 meters from a hidden bay
          </p>
          <p className="font-serif italic font-light text-[15px] text-[#7a6f62] mb-8">
            Sunset views. Total privacy. Just 14 minutes from the airport
          </p>

          {/* CTA — full width on mobile */}
          <button
            onClick={handleBookNow}
            className="w-full md:max-w-[320px] py-[16px] bg-[#2a251f] text-[#f4f1ea] text-[11px] font-sans font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300"
          >
            Check Availability&nbsp;&nbsp;→
          </button>
          <p className="text-[9px] font-sans tracking-[.22em] uppercase text-[#2a251f]/50 mt-3 text-center md:text-left md:max-w-[320px]">
            We answer every inquiry personally
          </p>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
