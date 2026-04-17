import React from 'react';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'he';
  onLanguageChange: (lang: 'en' | 'he') => void;
  isScrolled?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
  isScrolled = false,
}) => {
  const active = isScrolled ? 'text-[#1A1714] font-semibold' : 'text-white font-semibold';
  const inactive = isScrolled
    ? 'text-[#6B6560] hover:text-[#1A1714]'
    : 'text-white/45 hover:text-white/80';
  const sep = isScrolled ? 'text-[#C4A882]/60' : 'text-white/25';

  return (
    <div className="flex items-center gap-2 text-[15px] font-inter uppercase tracking-[0.08em]">
      <button
        onClick={() => onLanguageChange('en')}
        className={`transition-colors duration-200 ${currentLang === 'en' ? active : inactive}`}
      >
        EN
      </button>
      <span className={sep}>·</span>
      <button
        onClick={() => onLanguageChange('he')}
        className={`text-[17px] transition-colors duration-200 ${currentLang === 'he' ? active : inactive}`}
      >
        עב
      </button>
    </div>
  );
};

export default LanguageSwitcher;
