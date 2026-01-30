import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GoogleAnalytics = () => {
  useEffect(() => {
    // Set Consent Mode V2 defaults (denied by default)
    const setDefaultConsent = () => {
      window.gtag = window.gtag || function() {};
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted', // Necessary cookies
        wait_for_update: 500,
      });
    };

    // Inject GA4 script
    const injectGAScript = () => {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (!gaId) {
        console.warn('NEXT_PUBLIC_GA_ID not set');
        return;
      }

      // Inject Google Tag script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      // Inject GA configuration script
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `;
      document.head.appendChild(script2);
    };

    // Listen for consent changes
    const handleConsentChange = ({ cookie }: any) => {
      if (cookie.categories.includes('analytics')) {
        // Analytics accepted, update consent and inject GA
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });

        if (!document.querySelector('script[src*="googletagmanager.com"]')) {
          injectGAScript();
        }
      } else {
        // Analytics denied
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    };

    // Initialize default consent
    setDefaultConsent();

    // Listen for consent events
    (CookieConsent as any).on('consent', handleConsentChange);
    (CookieConsent as any).on('change', handleConsentChange);

    return () => {
      // Cleanup listeners
      (CookieConsent as any).off('consent', handleConsentChange);
      (CookieConsent as any).off('change', handleConsentChange);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default GoogleAnalytics;