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

        {/* Bottom gradient only */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(26,20,16,0) 55%, rgba(26,20,16,0.55) 100%)' }}
        />

        {/* Bottom-left: headline stack */}
        <div className="absolute bottom-0 left-0 z-10 px-16 pb-20 max-w-[700px]">
          <p
            className="text-[12px] font-inter font-semibold uppercase tracking-[0.35em] text-[#c5a059] mb-8"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
          >
            Akrotiri &nbsp;·&nbsp; Chania &nbsp;·&nbsp; Crete
          </p>
          <h1
            className="text-[88px] font-cormorant font-light text-white leading-[0.88] mb-8 tracking-[-.01em]"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.45)' }}
          >
            Now We Land
          </h1>
          <p
            className="text-[22px] font-inter text-white/90 font-light mb-5"
            style={{ textShadow: '0 1px 16px rgba(0,0,0,0.55)' }}
          >
            A private villa in Crete, 90 meters from a <span className="text-[#c5a059]">hidden bay</span>
          </p>
          <p
            className="text-[17px] font-inter text-white/55 font-light italic mb-12"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
          >
            Sunset views. Total privacy. Just 14 minutes from the airport
          </p>

          {/* CTA */}
          <button
            onClick={handleBookNow}
            className="px-10 py-[18px] bg-white/95 text-[#1A1714] text-[12px] font-inter font-medium uppercase tracking-[.18em] hover:bg-[#c5a059] hover:text-white transition-all duration-300"
          >
            Check Availability&nbsp;&nbsp;→
          </button>
          <p className="text-[9px] font-inter tracking-[.22em] uppercase text-white/40 mt-4">
            We answer every inquiry personally
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
          <p
            className="absolute top-5 left-5 text-[9px] font-inter font-medium uppercase tracking-[.3em] text-[#f4f1ea]"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,.5)' }}
          >
            Akrotiri · Chania · Crete
          </p>
        </div>

        {/* Text panel below image */}
        <div className="bg-[#f4f1ea] px-5 md:px-10 py-12 md:py-16">
          <h1 className="text-[52px] md:text-[68px] font-cormorant font-light text-[#2a251f] leading-[0.9] mb-5 tracking-[-.01em]">
            Now We Land
          </h1>
          <p className="text-[16px] md:text-[17px] font-inter text-[#2a251f]/80 font-normal leading-[1.55] mb-3 max-w-md">
            A private villa in Crete, 90 meters from a hidden bay
          </p>
          <p className="font-cormorant italic font-light text-[15px] text-[#7a6f62] mb-8">
            Sunset views. Total privacy. Just 14 minutes from the airport
          </p>

          <button
            onClick={handleBookNow}
            className="w-full md:max-w-[320px] py-4 bg-[#2a251f] text-[#f4f1ea] text-[11px] font-inter font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300"
          >
            Check Availability&nbsp;&nbsp;→
          </button>
          <p className="text-[9px] font-inter tracking-[.22em] uppercase text-[#2a251f]/50 mt-3 text-center md:text-left md:max-w-[320px]">
            We answer every inquiry personally
          </p>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
