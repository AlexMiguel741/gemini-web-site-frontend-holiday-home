import React, { useEffect } from 'react';

const SEOHead = ({ title, description, image, url, lang = 'it' }) => {
  useEffect(() => {
    if (!title || !description || !url) return;

    // Helper function to set or update meta tags
    const setMeta = (selector, attr, value) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (attr === 'property') {
          tag.setAttribute('property', value.split('=')[0]);
        } else if (attr === 'name') {
          tag.setAttribute('name', value.split('=')[0]);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute(attr, value);
    };

    // Set document title
    document.title = title;

    // Meta description
    setMeta('meta[name="description"]', 'name', `description=${description}`);
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);

    // Meta keywords based on language
    const keywords = {
      it: 'appartamento vacanze laveno mombello, casa vacanze lago maggiore, ferienwohnung, vacation rental, booking diretto',
      en: 'vacation rental lake maggiore, apartment laveno mombello, holiday apartments italy, lake maggiore vacation',
      de: 'ferienwohnung lago maggiore, apartment laveno see, ferienwohnungen italien, lago maggiore urlaub'
    };
    
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', keywords[lang] || keywords.en);

    // Meta robots
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index,follow');

    // Open Graph tags
    const setOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="og:${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', `og:${property}`);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOGTag('title', title);
    setOGTag('description', description);
    
    // Handle image URL - prepend domain if it starts with /
    const imageUrl = image && image.startsWith('/') 
      ? `https://www.lavenolakehouse.com${image}` 
      : image;
    if (imageUrl) setOGTag('image', imageUrl);
    
    setOGTag('url', url);
    setOGTag('type', 'website');
    
    const localeMap = { it: 'it_IT', en: 'en_GB', de: 'de_DE' };
    setOGTag('locale', localeMap[lang] || 'it_IT');
    setOGTag('site_name', 'Laveno Lake House');

    // Twitter tags
    const setTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="twitter:${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', `twitter:${name}`);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('card', 'summary_large_image');
    setTwitterTag('title', title);
    setTwitterTag('description', description);
    if (imageUrl) setTwitterTag('image', imageUrl);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Hreflang tags
    const hreflangs = {
      it: url.replace(/\/(en|de)\//g, '/it/'),
      en: url.replace(/\/(it|de)\//g, '/en/'),
      de: url.replace(/\/(it|en)\//g, '/de/'),
      'x-default': url.replace(/\/(it|en|de)\//g, '/')
    };

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Add new hreflang tags
    Object.entries(hreflangs).forEach(([hrefLang, hrefUrl]) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hrefLang);
      link.setAttribute('href', hrefUrl);
      document.head.appendChild(link);
    });

  }, [title, description, image, url, lang]);

  return null;
};

export default SEOHead;
