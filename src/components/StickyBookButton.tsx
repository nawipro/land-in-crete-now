import React, { useState, useEffect } from 'react';

const StickyBookButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  // Mobile only — sticky bottom bar
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#f4f1ea]/95 backdrop-blur-sm border-t border-[#2a251f]/10">
      <button
        onClick={handleClick}
        className="w-full py-4 bg-[#2a251f] text-[#f4f1ea] text-[11px] font-sans font-medium uppercase tracking-[.24em] hover:bg-[#8a6d4f] transition-colors"
      >
        Check Availability&nbsp;&nbsp;→
      </button>
    </div>
  );
};

export default StickyBookButton;
