import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';
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

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/30123456789', '_blank');
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('#home')}
              className="text-xl lg:text-2xl font-playfair font-bold text-mediterranean-blue hover:opacity-80 transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
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
                className={`relative text-foreground hover:text-mediterranean-blue transition-all duration-300 font-medium group ${
                  currentLang === 'he' ? 'px-1' : ''
                } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-mediterranean-blue after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Social Media & Language Switcher & WhatsApp Contact - Enhanced hover effects */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://facebook.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:shadow-lg active:scale-[0.98] p-1 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/nowweland"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:shadow-lg active:scale-[0.98] p-1 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:shadow-lg active:scale-[0.98] px-2 py-1 rounded-md hover:bg-accent/50"
            >
              <MessageCircle className="h-4 w-4" />
              <span>+30 123 456 789</span>
            </button>
          </div>

          {/* Mobile menu button - Enhanced effects */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher currentLang={currentLang} onLanguageChange={onLanguageChange} />
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
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:text-mediterranean-blue transition-all duration-300 hover:bg-accent/50 rounded-md active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>+30 123 456 789</span>
              </button>
              <div className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-mediterranean-blue transition-colors duration-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@nowweland.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
