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
  const title = content?.hero_title || 'Now We Land - Private Villa in Crete';
  const subtitle = content?.hero_subtitle || 'A private villa in Crete near Chania,\n90 meters from a hidden bay.';
  const tagline = content?.tagline || 'Sunset views. Total privacy. Just 14 minutes from the airport.';
  const location = content?.location || 'Akrotiri \u00b7 Chania \u00b7 Crete';
  const ctaText = content?.primary_cta?.text || 'Reserve Your Dates';

  // Split subtitle into lines
  const subtitleLines = subtitle.split('\n');

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

        {/* Bottom gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 28%, transparent 55%)' }} />

        {/* Left vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 38%, transparent 60%)' }} />

        {/* Bottom-left: text stack */}
        <div className="absolute bottom-0 left-0 z-10 px-8 lg:px-16 pb-14 lg:pb-32 max-w-[90%] lg:max-w-[680px]">
          <p className="text-[11px] font-inter font-semibold uppercase tracking-[0.3em] text-[#c5a059] mb-4 lg:mb-6" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
            {eyebrow}
          </p>
          <h1 className="text-[56px] lg:text-[82px] xl:text-[96px] font-cormorant font-light text-white leading-[0.88] mb-5 lg:mb-7 lg:whitespace-nowrap" style={{ textShadow: '0 2px 28px rgba(0,0,0,0.45)' }}>
            {title}
          </h1>
          <p className="text-[18px] lg:text-[20px] font-cormorant italic text-white/85 font-light leading-[1.6] mb-2" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.6)' }}>
            {subtitleLines.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
          <p className="text-[14px] lg:text-[15px] font-inter text-white/50 font-light mt-4" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            {tagline}
          </p>
        </div>

        {/* Bottom-right: CTA */}
        <div className="absolute bottom-0 right-0 z-10 px-8 lg:px-16 pb-14 lg:pb-32">
          <button
            onClick={handleBookNow}
            className="px-8 py-[16px] bg-white/10 backdrop-blur-sm border border-white/30 text-white text-[11px] font-inter font-medium uppercase tracking-[.22em] hover:bg-white/20 transition-all duration-300"
          >
            {ctaText}&nbsp;&nbsp;&rarr;
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
          <h1 className="text-[52px] md:text-[68px] font-cormorant font-light text-[#2a251f] leading-[0.9] mb-5">
            {title}
          </h1>
          <p className="text-[16px] md:text-[17px] font-inter text-[#2a251f]/70 font-light leading-[1.7] mb-2 max-w-md">
            {subtitleLines.join(' ')}
          </p>
          <p className="text-[14px] font-inter text-[#7a6f62] font-light mb-8">
            {tagline}
          </p>

          <button
            onClick={handleBookNow}
            className="w-full md:max-w-[320px] py-4 bg-[#2a251f] text-[#f4f1ea] text-[11px] font-inter font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300"
          >
            {ctaText}&nbsp;&nbsp;&rarr;
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
