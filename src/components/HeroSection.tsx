
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';

interface HeroSectionProps {
  translations: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/cb4246ae-3441-4bed-bb30-12d0525376a3.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight drop-shadow-lg">
            {translations.hero.title}
          </h1>
          <div className="flex items-center justify-center mb-4 text-lg md:text-xl">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="drop-shadow-md">{translations.hero.location}</span>
          </div>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {translations.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-mediterranean-blue hover:bg-aegean-blue text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {translations.hero.cta}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-mediterranean-blue px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg"
            >
              {translations.hero.explore}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white drop-shadow-lg" />
      </div>
    </section>
  );
};

export default HeroSection;
