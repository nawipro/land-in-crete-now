
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Calendar } from 'lucide-react';

interface HeroSectionProps {
  translations: any;
  content?: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations, content }) => {
  const handleBookNow = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreVilla = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background (CMS if available) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${content?.hero_image?.url || "/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png"}')`,
          backgroundSize: '1920px 1080px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
      </div>

      {/* Split layout: title at top, buttons at bottom */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between items-center">
        {/* Top: Title & Subtitle */}
        <div className="pt-12 sm:pt-20 text-center animate-gentle-fade" style={{ maxWidth: '860px' }}>
          <h1 
            className="text-5xl lg:text-7xl font-playfair font-light mb-4 leading-tight whitespace-pre-line"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0 0 8px rgba(0,0,0,0.45)'
            }}
          >
            {content?.hero_title || translations.hero.title}
          </h1>
          <p 
            className="text-xl lg:text-2xl font-source-sans font-light leading-relaxed whitespace-pre-line"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0 0 8px rgba(0,0,0,0.45)'
            }}
          >
            {content?.hero_subtitle || translations.hero.subtitle}
          </p>
        </div>

        {/* Bottom: Primary Actions */}
        <div className="pb-24 sm:pb-28 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={handleBookNow}
            className="bg-mediterranean-blue hover:bg-mediterranean-aegean-blue text-white px-8 py-4 text-base font-source-sans font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Calendar className="h-5 w-5 mr-2" />
            {translations.hero.cta}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleExploreVilla}
            className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-mediterranean-blue px-8 py-4 text-base font-source-sans font-medium rounded-full transition-all duration-300 shadow-lg hover:scale-105 backdrop-blur-sm"
          >
            {translations.hero.explore}
          </Button>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
          <ArrowDown className="h-5 w-5 text-white drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
