========================================
SEO INTEGRATION GUIDE FOR App.jsx
========================================

STEP 1: Add imports at the TOP of App.tsx (after existing imports)

```jsx
import SEOHead from './components/SEOHead';
import SchemaMarkup from './components/SchemaMarkup';
```

========================================
STEP 2: Add SEO data object INSIDE the App component

Place this right after the existing state declarations (after the useRef and useState declarations, around line 315):

```jsx
  // SEO Data - Trilingual titles and descriptions
  const seoData = {
    home: {
      it: {
        title: 'Laveno Lake House | Appartamenti Vacanze Lago Maggiore',
        description: 'Appartamenti vacanze a Laveno Mombello sul Lago Maggiore. Moderni, arredati, parcheggio incluso. Prenota diretto da €80/notte e risparmia le commissioni.',
        image: '/images/azure/foto_sala_1.png'
      },
      en: {
        title: 'Laveno Lake House | Holiday Apartments Lake Maggiore Italy',
        description: 'Vacation apartments in Laveno Mombello on Lake Maggiore. Modern, fully furnished, free parking. Book direct from €80/night and save on fees.',
        image: '/images/azure/foto_sala_1.png'
      },
      de: {
        title: 'Laveno Lake House | Ferienwohnungen Lago Maggiore Italien',
        description: 'Ferienwohnungen in Laveno Mombello am Lago Maggiore. Modern, mobliert, kostenloser Parkplatz. Direkt buchen ab €80/Nacht.',
        image: '/images/azure/foto_sala_1.png'
      }
    },
    apartments: {
      'azure-terrace-suite': {
        it: {
          title: 'Il Blu di Laveno | Appartamento Vacanze Laveno Mombello | Da €90/notte',
          description: 'Appartamento moderno 65mq nel cuore di Laveno Centro. WiFi, parcheggio gratuito, fino a 3 ospiti. A pochi minuti dal Lago Maggiore. Prenota diretto.'
        },
        en: {
          title: 'Il Blu di Laveno | Vacation Apartment Lake Maggiore | From €90/night',
          description: 'Modern 65sqm apartment in Laveno Centro. Free WiFi, free parking, up to 3 guests. Minutes from Lake Maggiore. Book direct and save.'
        },
        de: {
          title: 'Il Blu di Laveno | Ferienwohnung Lago Maggiore | Ab €90/Nacht',
          description: 'Moderne 65qm Ferienwohnung im Herzen von Laveno. WLAN, kostenloser Parkplatz, bis zu 3 Gaste. Wenige Minuten vom Lago Maggiore.'
        }
      },
      'sapphire-studio-loft': {
        it: {
          title: 'Verso il Lago | Casa Vacanze Laveno Mombello | Da €90/notte',
          description: 'Appartamento vacanze 45mq a due passi dal centro di Laveno. Cucina attrezzata, lenzuola incluse, posizione perfetta sul Lago Maggiore.'
        },
        en: {
          title: 'Verso il Lago | Holiday Home Laveno Lake Maggiore | From €90/night',
          description: '45sqm holiday apartment steps from Laveno center. Fully equipped kitchen, linens included. Perfect location on Lake Maggiore.'
        },
        de: {
          title: 'Verso il Lago | Ferienwohnung Laveno Lago Maggiore | Ab €90/Nacht',
          description: '45qm Ferienwohnung, wenige Schritte vom Zentrum Lavenos. Voll ausgestattete Kuche, Bettwäsche inklusive. Perfekte Lage am Lago Maggiore.'
        }
      },
      'cobalt-family-home': {
        it: {
          title: 'Le Cascate 1 | Appartamento Cittiglio Lago Maggiore | Da €85/notte',
          description: 'Appartamento 45mq nel borgo storico di Cittiglio, vicino alle cascate. Tranquillo, moderno, a 10 minuti dal Lago Maggiore. Ideale per famiglie.'
        },
        en: {
          title: 'Le Cascate 1 | Apartment Cittiglio Lake Maggiore | From €85/night',
          description: '45sqm apartment in Cittiglio historic village near the waterfalls. Quiet, modern, 10 minutes from Lake Maggiore. Ideal for families.'
        },
        de: {
          title: 'Le Cascate 1 | Apartment Cittiglio Lago Maggiore | Ab €85/Nacht',
          description: '45qm Apartment im historischen Dorf Cittiglio, nahe den Wasserfallen. Ruhig, modern, 10 Minuten vom Lago Maggiore. Ideal fur Familien.'
        }
      },
      'navy-garden-retreat': {
        it: {
          title: 'Le Cascate | Affitto Breve Cittiglio Lago Maggiore | Da €80/notte',
          description: 'Appartamento vacanze nel centro storico di Cittiglio. 45mq, moderno e arredato, a pochi minuti dal Lago Maggiore. Da €80/notte.'
        },
        en: {
          title: 'Le Cascate | Short Term Rental Cittiglio Lake Maggiore | From €80/night',
          description: 'Holiday apartment in Cittiglio historic center. 45sqm, modern and furnished, minutes from Lake Maggiore. From €80/night.'
        },
        de: {
          title: 'Le Cascate | Kurzzeitmiete Cittiglio Lago Maggiore | Ab €80/Nacht',
          description: 'Ferienwohnung im historischen Zentrum von Cittiglio. 45qm, modern und mobliert, wenige Minuten vom Lago Maggiore. Ab €80/Nacht.'
        }
      }
    }
  };
```

========================================
STEP 3: Add helper functions INSIDE the App component

Place this after the seoData object:

```jsx
  // Get current SEO data based on view and language
  const getCurrentSEO = () => {
    if (view === 'home') {
      return {
        title: seoData.home[lang].title,
        description: seoData.home[lang].description,
        image: seoData.home[lang].image,
        url: `https://www.lavenolakehouse.com${lang !== 'it' ? '/' + lang : ''}/`
      };
    } else if (view === 'property' && selectedAptId) {
      const aptSeo = seoData.apartments[selectedAptId];
      if (aptSeo) {
        return {
          title: aptSeo[lang].title,
          description: aptSeo[lang].description,
          image: APARTMENTS.find(a => a.id === selectedAptId)?.images?.[0] || '/images/azure/foto_sala_1.png',
          url: `https://www.lavenolakehouse.com${lang !== 'it' ? '/' + lang : ''}/appartamenti/${selectedAptId}`
        };
      }
    }
    return {
      title: 'Laveno Lake House',
      description: 'Appartamenti vacanze al Lago Maggiore',
      image: '/images/azure/foto_sala_1.png',
      url: 'https://www.lavenolakehouse.com'
    };
  };

  const currentSEO = getCurrentSEO();
```

========================================
STEP 4: Add components to JSX

Inside the return statement of the App component, add these TWO components as the FIRST elements inside the main div (right after the opening div, before the header):

```jsx
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden relative">
      {/* SEO Components - Must be first */}
      <SEOHead 
        title={currentSEO.title}
        description={currentSEO.description}
        image={currentSEO.image}
        url={currentSEO.url}
        lang={lang}
      />
      <SchemaMarkup 
        page={view === 'home' ? 'home' : selectedAptId}
        apartment={selectedApartment}
        lang={lang}
      />
      
      {/* Rest of your JSX continues below */}
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-100 h-32 sm:h-40 flex items-center">
        {/* ... rest of header ... */}
```

========================================
INTEGRATION CHECKLIST:

✅ 1. Import SEOHead and SchemaMarkup at the top
✅ 2. Add seoData object inside App component
✅ 3. Add getCurrentSEO() helper function
✅ 4. Add currentSEO variable
✅ 5. Add <SEOHead /> and <SchemaMarkup /> components as first elements in return JSX
✅ 6. Use existing `lang` and `selectedAptId` state variables
✅ 7. Use existing `selectedApartment` variable

========================================
WHAT THESE COMPONENTS DO:

SEOHead:
- Sets document.title dynamically
- Updates meta description, keywords, robots tag
- Sets Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- Sets Twitter Card tags
- Sets canonical link
- Sets hreflang alternates for multilingual SEO

SchemaMarkup:
- Injects JSON-LD LodgingBusiness schema on homepage
- Injects JSON-LD Apartment schema on property pages
- Injects JSON-LD BreadcrumbList schema on property pages
- Cleans up schemas on unmount

robots.txt & sitemap.xml:
- robots.txt: Allows all, disallows /api/, includes sitemap URL
- sitemap.xml: Lists all 5 URLs with hreflang alternates for IT/EN/DE

========================================
NO CHANGES TO EXISTING CODE REQUIRED - ONLY ADDITIONS!
