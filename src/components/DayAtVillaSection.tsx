import React from 'react';

const DayAtVillaSection: React.FC = () => {
  const moments = [
    {
      time: 'Morning',
      text: 'Wake up to the sound of birds and the scent of jasmine. Sip your coffee on the terrace as the Cretan sun warms the garden.',
    },
    {
      time: 'Midday',
      text: 'Cool off in the private pool or walk down to the hidden bay — a secret cove just steps from the villa.',
    },
    {
      time: 'Afternoon',
      text: 'Read a book under the olive trees, prepare a fresh meal in the fully equipped kitchen, or simply do nothing at all.',
    },
    {
      time: 'Evening',
      text: 'Watch the sky turn gold and pink as the sun sets over the Aegean. This is the moment you will remember forever.',
    },
  ];

  return (
    <section className="py-28 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-cormorant font-medium text-[#1A1714] mb-5">
            A Day at Now We Land
          </h2>
          <p className="text-lg font-inter text-[#6B6560] font-light max-w-2xl mx-auto leading-relaxed">
            From the first light of morning to the last glow of sunset, every moment here feels like it was made just for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-5xl mx-auto">
          {moments.map((m, i) => (
            <div key={i} className="space-y-4">
              <p className="text-xs font-inter font-semibold uppercase tracking-[0.18em] text-[#C4A882]">
                {m.time}
              </p>
              <div className="w-8 h-px bg-[#C4A882]/50"></div>
              <p className="text-base font-inter text-[#6B6560] leading-relaxed">
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
