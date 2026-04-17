import React from 'react';
import { Calendar } from 'lucide-react';

const InlineBookCTA: React.FC = () => {
  const handleClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-center py-16 lg:py-20">
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#0f172a] text-white text-[14px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#c5a059] transition-colors duration-300"
      >
        <Calendar className="w-4 h-4" strokeWidth={1.5} />
        Check Availability
      </button>
    </div>
  );
};

export default InlineBookCTA;
