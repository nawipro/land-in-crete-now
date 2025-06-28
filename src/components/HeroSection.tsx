
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';

interface HeroSectionProps {
  translations: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations }) => {
  const handleBookNow = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreVilla = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('/lovable-uploads/cb4246ae-3441-4bed-bb30-12d0525376a3.png')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content - Repositioned to preserve sunset view */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Refined typography with better spacing */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-medium mb-6 leading-tight drop-shadow-2xl">
            <span className="block bg-black/40 backdrop-blur-sm px-8 py-4 rounded-xl inline-block">
              {translations.hero.title}
            </span>
          </h1>
          
          {/* Clean subtitle with elegant font */}
          <div className="bg-black/40 backdrop-blur-sm px-8 py-4 rounded-xl inline-block mb-8">
            <p className="text-lg md:text-xl font-source-sans font-light leading-relaxed drop-shadow-md">
              A Private Boutique Villa in Akrotiri, Chania, Crete
            </p>
          </div>
        </div>
      </div>

      {/* Buttons repositioned lower to align with balcony railing area */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={handleBookNow}
            className="bg-mediterranean-blue hover:bg-aegean-blue text-white px-10 py-4 text-lg font-source-sans font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20 backdrop-blur-sm"
          >
            <Calendar className="h-5 w-5 mr-2" />
            {translations.hero.cta}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleExploreVilla}
            className="border-2 border-white text-white hover:bg-white hover:text-mediterranean-blue px-10 py-4 text-lg font-source-sans font-medium rounded-full transition-all duration-300 shadow-2xl backdrop-blur-sm hover:scale-105"
          >
            {translations.hero.explore}
          </Button>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <ArrowDown className="h-6 w-6 text-white drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
