
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  currentLang: 'en' | 'he';
  onLanguageChange: (lang: 'en' | 'he') => void;
  translations: any;
}

const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: translations.nav.home, href: '#home' },
    { name: translations.nav.about, href: '#about' },
    { name: translations.nav.gallery, href: '#gallery' },
    { name: translations.nav.booking, href: '#booking' },
    { name: translations.nav.contact, href: '#contact' },
    { name: currentLang === 'en' ? 'Explore Area' : 'גלו את האזור', href: '/explore-area' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/85 backdrop-blur-lg shadow-sm border-b border-black/5' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('#home')}
              className={`text-xl lg:text-[22px] font-playfair-display font-bold tracking-[0.03em] hover:opacity-75 transition-all duration-300 active:scale-[0.98] ${isScrolled ? 'text-[#3D2F28]' : 'text-white'}`}
            >
              Now We Land
            </button>
          </div>

          {/* Desktop Navigation - Enhanced hover effects */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`relative transition-all duration-300 font-normal text-[11px] uppercase tracking-[0.1em] group ${
                  currentLang === 'he' ? 'px-1' : ''
                } ${isScrolled ? 'text-[#3D2F28] hover:text-[#1A1714]' : 'text-white/72 hover:text-white/95'} after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#C4A882] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Social Media & Language Switcher & Contact - Enhanced hover effects */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://facebook.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 active:scale-[0.98] p-1 rounded-full ${isScrolled ? 'text-[#6B6560] hover:text-[#1A1714]' : 'text-white/55 hover:text-white/90'}`}
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 active:scale-[0.98] p-1 rounded-full ${isScrolled ? 'text-[#6B6560] hover:text-[#1A1714]' : 'text-white/55 hover:text-white/90'}`}
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} isScrolled={isScrolled} />
            <div className={`flex items-center space-x-1.5 text-[11px] font-inter tracking-wide transition-colors duration-300 ${isScrolled ? 'text-[#6B6560]' : 'text-white/50'}`}>
              <Phone className="h-3.5 w-3.5" />
              <span>+30 697 369 3867</span>
            </div>
          </div>

          {/* Mobile menu button - Enhanced effects */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} isScrolled={isScrolled} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:shadow-lg active:scale-[0.98] transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced sliding effect */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`px-2 pt-2 pb-3 space-y-1 bg-background/80 backdrop-blur-sm rounded-lg mt-2 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-mediterranean-blue transition-all duration-300 rounded-md hover:bg-accent/50 active:scale-[0.98]"
              >
                {item.name}
              </button>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-center space-x-4 px-3 py-2">
                <a
                  href="https://facebook.com/nowweland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:shadow-lg active:scale-[0.98] p-2 rounded-full"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/nowweland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:shadow-lg active:scale-[0.98] p-2 rounded-full"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
              <div className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-mediterranean-blue transition-colors duration-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+30 697 369 3867</span>
              </div>
              <div className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-mediterranean-blue transition-colors duration-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>aegeanvillas.adm@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
