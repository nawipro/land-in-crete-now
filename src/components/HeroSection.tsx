
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
      {/* Hero Background with New Sunset Pool Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/9242131d-5b6c-48ae-a974-6a6844d4332a.png')`,
          backgroundSize: '1920px 1080px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
      </div>

      {/* Content positioned at 60% from top */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center" style={{ marginTop: '10vh' }}>
        
        {/* Text Content positioned in sky area */}
        <div className="text-center animate-gentle-fade" style={{ maxWidth: '760px' }}>
          <h1 
            className="text-5xl lg:text-7xl font-playfair font-light mb-4 leading-tight"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0 0 8px rgba(0,0,0,0.45)'
            }}
          >
            Now We Land
          </h1>
          
          <p 
            className="text-xl lg:text-2xl font-source-sans font-light mb-8 leading-relaxed"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0 0 8px rgba(0,0,0,0.45)'
            }}
          >
            A Private Boutique Villa in Akrotiri, Chania, Crete
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <Button 
              size="lg" 
              onClick={handleBookNow}
              className="bg-mediterranean-blue hover:bg-mediterranean-aegean-blue text-white px-8 py-4 text-base font-source-sans font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Your Stay
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleExploreVilla}
              className="border-2 border-white text-white hover:bg-white hover:text-mediterranean-blue px-8 py-4 text-base font-source-sans font-medium rounded-full transition-all duration-300 shadow-lg hover:scale-105 backdrop-blur-sm"
            >
              Explore More
            </Button>
          </div>

          <div 
            className="text-sm font-source-sans font-light"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0 0 8px rgba(0,0,0,0.45)'
            }}
          >
            90 meters from the sea • Private pool • Hidden bay access
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
