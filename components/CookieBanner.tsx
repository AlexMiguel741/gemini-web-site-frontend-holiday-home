import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

const CookieBanner = () => {
  useEffect(() => {
    // Handle privacy policy link clicks
    const handlePrivacyLinkClick = (e: Event) => {
      e.preventDefault();
      // Navigate to privacy policy view
      window.location.hash = '#privacy-policy';
      // You might need to dispatch a custom event here that the App component can listen to
      window.dispatchEvent(new CustomEvent('navigateToPrivacy'));
    };

    // Add global click listener for privacy policy links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cc-link') || target.classList.contains('cc-link')) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('navigateToPrivacy'));
      }
    });

    const initCookieConsent = () => {
      CookieConsent.run({
        root: null,
        autoShow: true,
        disablePageInteraction: false,
        hideFromBots: true,
        mode: 'opt-in',
        cookie: {
          name: 'cc_cookie',
          domain: process.env.NODE_ENV === 'production' ? window.location.hostname : 'localhost',
          path: '/',
          sameSite: 'Lax',
          expiresAfterDays: 365,
        },
        guiOptions: {
          consentModal: {
            layout: 'cloud',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false,
          },
          preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false,
          },
        },
        categories: {
          necessary: {
            readOnly: true,
            enabled: true,
          },
          analytics: {
            enabled: false,
          },
        },
        language: {
          default: 'it',
          translations: {
            it: {
              consentModal: {
                title: 'Usiamo i cookie',
                description: 'Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Alcuni cookie sono necessari per il funzionamento del sito, mentre altri ci aiutano a capire come lo utilizzi.',
                acceptAllBtn: 'Accetta tutto',
                acceptNecessaryBtn: 'Solo necessari',
                showPreferencesBtn: 'Gestisci preferenze',
                footer: '<a href="#privacy-policy" class="cc-link">Informativa sulla privacy</a>',
              },
              preferencesModal: {
                title: 'Preferenze cookie',
                acceptAllBtn: 'Accetta tutto',
                acceptNecessaryBtn: 'Rifiuta tutto',
                savePreferencesBtn: 'Salva preferenze',
                closeIconLabel: 'Chiudi',
                serviceCounterLabel: 'Servizi',
                sections: [
                  {
                    title: 'Utilizzo dei cookie',
                    description: 'Utilizziamo i cookie per garantire il corretto funzionamento del sito web e per raccogliere informazioni statistiche anonime sull\'utilizzo del sito.',
                  },
                  {
                    title: 'Cookie necessari',
                    description: 'Questi cookie sono essenziali per il funzionamento del sito web. Non possono essere disattivati.',
                    linkedCategory: 'necessary',
                  },
                  {
                    title: 'Cookie di analisi',
                    description: 'Questi cookie ci aiutano a capire come gli utenti interagiscono con il sito web raccogliendo e segnalando informazioni in modo anonimo.',
                    linkedCategory: 'analytics',
                  },
                  {
                    title: 'Ulteriori informazioni',
                    description: 'Per qualsiasi domanda sui nostri cookie e sulle tue scelte, consulta la nostra <a href="/privacy-policy" class="cc-link">informativa sulla privacy</a>.',
                  },
                ],
              },
            },
          },
        },
        onConsent: ({ cookie }) => {
          console.log('Consent updated:', cookie.categories);
        },
        onChange: ({ cookie, changedCategories, changedServices }) => {
          console.log('Consent changed:', changedCategories);
        },
      });
    };

    // Initialize after component mounts
    console.log('CookieBanner: Initializing cookie consent...');
    initCookieConsent();
    console.log('CookieBanner: Cookie consent initialized');

    // Cleanup
    return () => {
      console.log('CookieBanner: Cleaning up cookie consent');
      CookieConsent.reset();
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default CookieBanner;