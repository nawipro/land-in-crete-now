import React from 'react';
import { Sun, Coffee, Waves, Sunset } from 'lucide-react';

const DayAtVillaSection: React.FC = () => {
  const moments = [
    {
      icon: Coffee,
      time: 'Morning',
      text: 'Wake up to the sound of birds and the scent of jasmine. Sip your coffee on the terrace as the Cretan sun warms the garden.',
    },
    {
      icon: Waves,
      time: 'Midday',
      text: 'Cool off in the private pool or walk down to the hidden bay \u2014 a secret cove just steps from the villa.',
    },
    {
      icon: Sun,
      time: 'Afternoon',
      text: 'Read a book under the olive trees, prepare a fresh meal in the fully equipped kitchen, or simply do nothing at all.',
    },
    {
      icon: Sunset,
      time: 'Evening',
      text: 'Watch the sky turn gold and pink as the sun sets over the Aegean. This is the moment you will remember forever.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-sky-50/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-cormorant font-medium text-mediterranean-deep-navy mb-4">
            A Day at Now We Land
          </h2>
          <p className="text-lg font-inter text-mediterranean-stone-gray font-light max-w-2xl mx-auto">
            From the first light of morning to the last glow of sunset, every moment here feels like it was made just for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {moments.map((m, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-mediterranean-blue/10">
                <m.icon className="h-6 w-6 text-mediterranean-blue" />
              </div>
              <h3 className="text-sm font-inter font-semibold uppercase tracking-wider text-mediterranean-blue">
                {m.time}
              </h3>
              <p className="text-sm font-inter text-mediterranean-stone-gray leading-relaxed">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DayAtVillaSection;
