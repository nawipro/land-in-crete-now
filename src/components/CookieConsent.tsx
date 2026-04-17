import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0f172a] border-t border-white/10 px-6 py-5 lg:py-6">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[14px] font-inter text-white/70 font-light leading-relaxed max-w-2xl">
          We use cookies to ensure proper site functionality and enhance your experience.
          By continuing, you agree to our{' '}
          <a href="/privacy" className="text-[#c5a059] underline underline-offset-2 hover:text-[#d4af6a]">
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-6 py-2.5 text-[13px] font-inter font-medium text-white/50 hover:text-white/80 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-8 py-2.5 bg-[#c5a059] text-white text-[13px] font-inter font-bold uppercase tracking-[0.12em] hover:bg-[#d4af6a] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
