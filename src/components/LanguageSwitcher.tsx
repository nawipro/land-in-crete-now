
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'he';
  onLanguageChange: (lang: 'en' | 'he') => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={currentLang === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className="min-w-[60px]"
      >
        EN
      </Button>
      <Button
        variant={currentLang === 'he' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('he')}
        className="min-w-[60px]"
      >
        עב
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
