
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';

interface HeroSectionProps {
  translations: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('/lovable-uploads/cb4246ae-3441-4bed-bb30-12d0525376a3.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Enhanced Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold mb-8 leading-tight drop-shadow-2xl">
            <span className="block bg-black/40 backdrop-blur-sm px-6 py-4 rounded-lg inline-block">
              {translations.hero.title}
            </span>
          </h1>
          
          <div className="flex items-center justify-center mb-6 text-xl md:text-2xl bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full inline-flex">
            <MapPin className="h-6 w-6 mr-3" />
            <span className="font-lato font-medium drop-shadow-md">{translations.hero.location}</span>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm px-8 py-6 rounded-xl inline-block mb-10">
            <p className="text-2xl md:text-3xl font-lato font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {translations.hero.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-mediterranean-blue hover:bg-aegean-blue text-white px-12 py-4 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20 backdrop-blur-sm"
            >
              <Calendar className="h-6 w-6 mr-3" />
              {translations.hero.cta}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-mediterranean-blue px-12 py-4 text-xl font-semibold rounded-full transition-all duration-300 shadow-2xl backdrop-blur-sm hover:scale-105"
            >
              {translations.hero.explore}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <ArrowDown className="h-8 w-8 text-white drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
