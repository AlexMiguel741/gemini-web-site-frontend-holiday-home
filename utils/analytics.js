export const loadGoogleAnalytics = () => {
  if (window.gtagLoaded) return;
  window.gtagLoaded = true;

  const script = document.createElement('script');
  // Replace 'YOUR_GA_ID' with your Google Analytics 4 ID (e.g., G-XXXXXXXXXX)
  script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID';
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID', { anonymize_ip: true }); // Replace YOUR_GA_ID with your GA4 ID
};

export const hasConsent = () => localStorage.getItem('cookie_consent') === 'accepted';
