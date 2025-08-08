
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, Home, Users, Sunset } from 'lucide-react';

interface AboutSectionProps {
  translations: any;
  content?: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ translations, content }) => {
  const features = [
    {
      icon: Waves,
      title: translations.about.features.seaview.title,
      description: translations.about.features.seaview.desc
    },
    {
      icon: Home,
      title: translations.about.features.accommodation.title,
      description: translations.about.features.accommodation.desc
    },
    {
      icon: Users,
      title: translations.about.features.capacity.title,
      description: translations.about.features.capacity.desc
    },
    {
      icon: Sunset,
      title: translations.about.features.amenities.title,
      description: translations.about.features.amenities.desc
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-coastal">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20 animate-soft-slide-up">
          <h2 className="text-5xl lg:text-6xl font-cormorant font-medium text-mediterranean-deep-navy mb-8">
            {content?.headline || translations.about.title}
          </h2>
          <p className="text-xl lg:text-2xl font-inter text-mediterranean-stone-gray max-w-4xl mx-auto leading-relaxed font-light">
            {content?.intro || translations.about.description}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-5 gap-16 items-center mb-20">
          
          {/* Image Column - Enhanced with overlay */}
          <div className="lg:col-span-3 animate-elegant-scale">
            <div className="relative group">
              <img
                src={content?.image?.url || '/lovable-uploads/e6df6bc3-06bd-4e68-b8f3-fe91adcd3a41.png'}
                alt={content?.image?.alt || 'Villa at night with pool and warm lighting'}
                className="rounded-3xl shadow-2xl w-full h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-inter text-sm font-light opacity-90">
                  {content?.image?.alt || 'Evening ambiance at Now We Land'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Text Column */}
          <div className="lg:col-span-2 animate-gentle-fade">
            <h3 className="text-3xl lg:text-4xl font-cormorant font-medium mb-8 text-mediterranean-deep-navy">
              {translations.about.detailed.title}
            </h3>
            <div className="space-y-6">
              <p className="text-lg font-inter text-mediterranean-stone-gray leading-relaxed">
                {translations.about.detailed.description}
              </p>
              <p className="text-lg font-inter text-mediterranean-stone-gray leading-relaxed">
                {translations.about.detailed.description2}
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid - Refined Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-mediterranean-blue/10 rounded-full mb-6 group-hover:bg-mediterranean-blue/20 transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-mediterranean-blue" />
                </div>
                <h4 className="text-xl lg:text-2xl font-cormorant font-medium mb-4 text-mediterranean-deep-navy">
                  {feature.title}
                </h4>
                <p className="text-mediterranean-stone-gray leading-relaxed font-inter">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
