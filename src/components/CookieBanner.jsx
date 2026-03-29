import React, { useState, useEffect } from 'react';

const CookieBanner = ({ lang = 'it', onAccept }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  if (!isOpen) return null;

  // Translations
  const content = {
    it: {
      message: 'Usiamo cookie analitici (Google Analytics) per migliorare il sito. Nessun dato personale venduto.',
      privacy: 'Privacy Policy',
      accept: 'Accetta',
      reject: 'Rifiuta'
    },
    en: {
      message: 'We use analytics cookies (Google Analytics) to improve the site. No personal data is sold.',
      privacy: 'Privacy Policy',
      accept: 'Accept',
      reject: 'Reject'
    },
    de: {
      message: 'Wir verwenden Analyse-Cookies (Google Analytics). Keine persönlichen Daten werden verkauft.',
      privacy: 'Datenschutz',
      accept: 'Akzeptieren',
      reject: 'Ablehnen'
    }
  };

  const t = content[lang] || content.en;

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsOpen(false);
    onAccept?.();
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setIsOpen(false);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm pointer-events-auto"
      style={{
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        opacity: isOpen ? 1 : 0,
        transition: 'transform 300ms ease-out, opacity 300ms ease-out'
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-2">
          <p className="text-white font-[Outfit] text-sm">
            {t.message}
            <a
              href="#privacy"
              className="text-slate-400 underline hover:text-white text-xs ml-1 inline-block"
            >
              {t.privacy}
            </a>
          </p>
        </div>

        <div className="flex gap-3 whitespace-nowrap">
          <button
            onClick={handleReject}
            className="border border-slate-500 hover:border-white text-slate-300 hover:text-white rounded-xl px-5 py-2 text-sm font-semibold transition-all"
          >
            {t.reject}
          </button>
          <button
            onClick={handleAccept}
            className="bg-blue-700 hover:bg-blue-600 text-white rounded-xl px-5 py-2 text-sm font-semibold transition-all"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
