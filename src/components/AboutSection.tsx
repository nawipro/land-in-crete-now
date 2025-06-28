
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Waves, Home, Users, Sunset } from 'lucide-react';

interface AboutSectionProps {
  translations: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ translations }) => {
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
    <section id="about" className="py-20 bg-mediterranean-cream-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-mediterranean-blue mb-6">
            {translations.about.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {translations.about.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Villa exterior"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="animate-slide-in-right">
            <h3 className="text-3xl font-playfair font-semibold mb-6 text-mediterranean-blue">
              {translations.about.detailed.title}
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {translations.about.detailed.description}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {translations.about.detailed.description2}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-mediterranean-blue/10 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-mediterranean-blue" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-mediterranean-blue">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
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
