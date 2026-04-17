import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

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

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-2.5 px-7 py-4 bg-[#c5a059] text-white text-[13px] font-inter font-bold uppercase tracking-[0.15em] shadow-xl hover:bg-[#d4af6a] transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <Calendar className="w-4 h-4" strokeWidth={1.5} />
      Check Availability
    </button>
  );
};

export default StickyBookButton;
