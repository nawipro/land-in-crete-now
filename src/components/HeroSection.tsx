
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Calendar } from 'lucide-react';

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
      {/* Hero Background with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed scale-105"
        style={{
          backgroundImage: `url('/lovable-uploads/cb4246ae-3441-4bed-bb30-12d0525376a3.png')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
      </div>

      {/* Elegant Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* Left Column - Text Content */}
          <div className="lg:order-1 animate-gentle-fade">
            <div className="backdrop-blur-sm bg-white/95 rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-cormorant font-medium mb-6 text-mediterranean-deep-navy leading-tight">
                {translations.hero.title}
              </h1>
              
              <p className="text-lg lg:text-xl font-inter text-mediterranean-stone-gray mb-8 leading-relaxed font-light">
                A Private Boutique Villa in Akrotiri, Chania, Crete
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  onClick={handleBookNow}
                  className="bg-mediterranean-blue hover:bg-mediterranean-aegean-blue text-white px-8 py-4 text-base font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {translations.hero.cta}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleExploreVilla}
                  className="border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue hover:text-white px-8 py-4 text-base font-inter font-medium rounded-full transition-all duration-300 shadow-lg hover:scale-105"
                >
                  {translations.hero.explore}
                </Button>
              </div>

              <div className="text-sm font-inter text-mediterranean-stone-gray font-light">
                90 meters from the sea • Private pool • Hidden bay access
              </div>
            </div>
          </div>

          {/* Right Column - Preserved for sunset view */}
          <div className="lg:order-2 hidden lg:block">
            {/* This space intentionally left empty to showcase the sunset */}
          </div>
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
