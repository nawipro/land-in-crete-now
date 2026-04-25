import React from 'react';

interface HeroSectionProps {
  translations: any;
  content?: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const handleBookNow = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  // CMS content with hardcoded fallbacks
  const heroImage = content?.hero_image?.url || '/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png';
  const heroAlt = content?.hero_image?.alt || 'Villa overlooking the Aegean at sunset';
  const posX = content?.hero_image?.position?.x ?? 50;
  const posY = content?.hero_image?.position?.y ?? 50;
  const eyebrow = content?.eyebrow || 'Boutique Villa \u00b7 Sleeps up to 8';
  const title = content?.hero_title || 'Private Villa Near Chania';
  const subtitle = content?.hero_subtitle || '90 metres from the sea. Private pool. Quiet location. 20 minutes to Chania.';
  const location = content?.location || 'Akrotiri \u00b7 Chania \u00b7 Crete';
  const ctaText = content?.primary_cta?.text || 'Check Availability';

  return (
    <section id="home" className="relative">

      {/* ── DESKTOP: full-screen hero with overlay ── */}
      <div className="hidden md:block relative h-screen overflow-hidden">
        <img
          src={heroImage}
          alt={heroAlt}
          className="w-full h-full object-cover"
          fetchPriority="high"
          style={{ objectPosition: `${posX}% ${posY}%` }}
        />

        {/* Top vignette for nav */}
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/18 to-transparent" />

        {/* Full overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)' }} />

        {/* Bottom-left: text stack */}
        <div className="absolute bottom-0 left-0 z-10 px-8 lg:px-16 pb-14 lg:pb-32 max-w-[90%] lg:max-w-[750px]">
          <p className="text-[11px] font-inter font-semibold uppercase tracking-[0.3em] text-[#c5a059] mb-4 lg:mb-6" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            {eyebrow}
          </p>
          <h1 className="text-[48px] lg:text-[72px] xl:text-[82px] font-cormorant font-light text-white leading-[1.05] mb-6 lg:mb-8" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
            {title}
          </h1>
          <p className="text-[16px] lg:text-[18px] font-inter text-white/70 font-light leading-[1.8] max-w-xl" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            90 metres from the sea. Private pool. Quiet location.
          </p>
          <p className="text-[14px] lg:text-[15px] font-inter text-white/40 font-light mt-2.5" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            14 minutes from the airport. 20 minutes to Chania.
          </p>
        </div>

        {/* Bottom-right: CTA */}
        <div className="absolute bottom-0 right-0 z-10 px-8 lg:px-16 pb-14 lg:pb-32">
          <button
            onClick={handleBookNow}
            className="px-10 py-[18px] bg-[#c5a059] text-white text-[12px] font-inter font-bold uppercase tracking-[.2em] hover:bg-[#d4af6a] transition-all duration-300"
          >
            {ctaText}
          </button>
        </div>

        {/* Top-left: location */}
        <div className="absolute top-0 left-0 z-10 px-8 lg:px-16 pt-28">
          <p className="text-[10px] font-inter font-medium uppercase tracking-[.3em] text-white/50" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            {location}
          </p>
        </div>
      </div>

      {/* ── MOBILE: stacked layout ── */}
      <div className="md:hidden">
        <div className="relative">
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full aspect-[3/2] object-cover object-center"
            fetchPriority="high"
          />
          <p className="absolute top-5 left-5 text-[9px] font-inter font-medium uppercase tracking-[.3em] text-white/80" style={{ textShadow: '0 1px 4px rgba(0,0,0,.5)' }}>
            {location}
          </p>
        </div>

        <div className="bg-[#f4f1ea] px-5 md:px-10 py-12 md:py-16">
          <p className="text-[10px] font-inter font-semibold uppercase tracking-[.28em] text-[#c5a059] mb-5">
            {eyebrow}
          </p>
          <h1 className="text-[36px] md:text-[44px] font-cormorant font-light text-[#2a251f] leading-[1.1] mb-5">
            {title}
          </h1>
          <p className="text-[15px] md:text-[16px] font-inter text-[#2a251f]/65 font-light leading-[1.8] max-w-md">
            90 metres from the sea. Private pool. Quiet location.
          </p>
          <p className="text-[13px] font-inter text-[#2a251f]/40 font-light mt-2 mb-8">
            14 minutes from the airport. 20 minutes to Chania.
          </p>

          <button
            onClick={handleBookNow}
            className="w-full md:max-w-[320px] py-4 bg-[#c5a059] text-white text-[12px] font-inter font-bold uppercase tracking-[.2em] hover:bg-[#d4af6a] transition-colors duration-300"
          >
            {ctaText}
          </button>
          <p className="text-[9px] font-inter tracking-[.22em] uppercase text-[#2a251f]/40 mt-3 text-center md:text-left md:max-w-[320px]">
            We answer every inquiry personally
          </p>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
