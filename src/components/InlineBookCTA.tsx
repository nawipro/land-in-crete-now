import React from 'react';

const InlineBookCTA: React.FC = () => {
  const handleClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-center py-14 lg:py-18">
      <button
        onClick={handleClick}
        className="px-8 py-[16px] bg-[#2a251f] text-[#f4f1ea] text-[11px] font-sans font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors duration-300"
      >
        Check Availability&nbsp;&nbsp;→
      </button>
    </div>
  );
};

export default InlineBookCTA;
