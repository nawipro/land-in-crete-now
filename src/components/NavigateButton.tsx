import React, { useState, useRef, useEffect } from 'react';
import { Navigation, MapPin } from 'lucide-react';

const PLUS_CODE = 'H3HG+CVM, Akrotiri 731 07, Greece';
const ADDRESS = 'Now We Land Villa, Akrotiri 731 07, Chania, Crete, Greece';

const links = [
  {
    name: 'Google Maps',
    url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PLUS_CODE)}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: 'Apple Maps',
    url: `https://maps.apple.com/?q=${encodeURIComponent(ADDRESS)}&z=16`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#333"/>
      </svg>
    ),
  },
  {
    name: 'Waze',
    url: `https://waze.com/ul?q=${encodeURIComponent(PLUS_CODE)}&navigate=yes`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#33CCFF"/>
      </svg>
    ),
  },
];

interface NavigateButtonProps {
  variant?: 'default' | 'footer' | 'contact';
  label?: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ variant = 'default', label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const buttonClass = {
    default: 'inline-flex items-center gap-2.5 px-8 py-4 bg-[#0f172a] text-white text-[13px] font-inter font-bold uppercase tracking-[0.18em] hover:bg-[#c5a059] transition-colors duration-300',
    footer: 'inline-flex items-center gap-2 text-[15px] font-inter text-white/50 hover:text-[#c5a059] transition-colors cursor-pointer',
    contact: 'inline-flex items-center gap-2 text-[#c5a059] hover:text-[#d4af6a] transition-colors cursor-pointer',
  }[variant];

  const Icon = variant === 'contact' ? MapPin : Navigation;

  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={() => setOpen(!open)} className={buttonClass}>
        <Icon className="w-[16px] h-[16px]" strokeWidth={1.5} />
        {label || 'Get Directions'}
      </button>

      {open && (
        <div className="absolute bottom-full mb-3 left-0 bg-white rounded-xl shadow-2xl border border-[#e9e4df] p-2 min-w-[200px] z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-inter text-[#1A1714] hover:bg-[#f8f5f2] transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.icon}
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigateButton;
