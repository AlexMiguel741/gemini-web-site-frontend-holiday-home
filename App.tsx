
import React, { useState, useEffect, useRef } from 'react';
import { APARTMENTS, SITE_CONFIG, STORY_CONTENT, HERO_SECTION, UI_LABELS, DISTANCES } from './constants';
import ContactInfo from './components/ContactInfo';
import { Apartment, Language } from './types';
import ApartmentCard from './components/ApartmentCard';
import { fetchBookings, getCachedBookings } from './src/services/icalService.js';
import Footer from './components/Footer';
import SmartImage from './components/SmartImage';
import CalendarDebugPanel from './components/CalendarDebugPanel';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ContactForm from './components/ContactForm';
import CookieBanner from './components/CookieBanner.jsx';
import { loadGoogleAnalytics } from './utils/analytics.js';
import SEOHead from './components/SEOHead.jsx';
import SchemaMarkup from './components/SchemaMarkup.jsx';

type View = 'home' | 'story' | 'property';
type BookedRange = { start: Date; end: Date };



const Lightbox: React.FC<{ images: string[]; isOpen: boolean; onClose: () => void; startIndex?: number; lang: Language }> = ({ images, isOpen, onClose, startIndex = 0, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const touchStartX = useRef(0);

  // Handle image navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Manage background scroll
  useEffect(() => {
    setCurrentIndex(startIndex);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen, startIndex]);

  // Keyboard navigation: Arrow keys + Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX;

    // Minimum swipe distance of 50px
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        // Swiped left → next image
        goToNext();
      } else {
        // Swiped right → previous image
        goToPrevious();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-white animate-in fade-in duration-300 flex flex-col">
      <div className="h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <button onClick={onClose} className="flex items-center gap-2 text-slate-900 font-bold uppercase text-[10px] tracking-widest hover:text-blue-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
          {UI_LABELS.back[lang]}
        </button>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>
        <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
        </button>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center bg-slate-50 overflow-hidden">
        <button 
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 z-10 p-3 sm:p-4 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
        >
          <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>
        
        <div 
          className="w-full h-full flex items-center justify-center p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={images[currentIndex]} 
            className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl shadow-2xl" 
            alt={`Foto ${currentIndex + 1}`} 
          />
        </div>

        <button 
          onClick={goToNext}
          className="absolute right-2 sm:right-4 z-10 p-3 sm:p-4 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
        >
          <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
        </button>
      </div>

      <div className="h-24 bg-white border-t border-slate-100 flex items-center justify-start sm:justify-center px-4 gap-3 overflow-x-auto no-scrollbar">
        {images.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${currentIndex === idx ? 'border-blue-700 scale-105 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'}`}
          >
            <img src={img} className="w-full h-full object-cover" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};

const AvailabilityCalendar: React.FC<{ apartment: Apartment; lang: Language }> = ({ apartment, lang }) => {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [realBookings, setRealBookings] = useState<BookedRange[]>([]);
  const [syncError, setSyncError] = useState(false);

  useEffect(() => {
    if (!apartment.icalUrl) return;
    const controller = new AbortController();
    let cancelled = false;
    const cached = getCachedBookings(apartment.icalUrl);
    if (cached && !cancelled) {
      setRealBookings(cached);
      setSyncError(false);
    }
    setIsSyncing(!cached);
    fetchBookings(apartment.icalUrl, controller.signal)
      .then(bookings => {
        if (!cancelled) {
          setRealBookings(bookings);
          setSyncError(false);
          setIsSyncing(false);
        }
      })
      .catch(err => {
        if (cancelled || err.name === 'AbortError') return;
        setIsSyncing(false);
        if (!cached) setSyncError(true);
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [apartment.id, apartment.icalUrl]);

  const monthName = viewDate.toLocaleString(lang, { month: 'long' });
  const year = viewDate.getFullYear();
  const daysInMonth = new Date(year, viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, viewDate.getMonth(), 1).getDay();

  const isDayBooked = (day: number) => {
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    
    // Create date in UTC to match iCal dates
    const checkDate = new Date(Date.UTC(currentYear, currentMonth, day, 0, 0, 0));

    const isBooked = realBookings.some(range => {
      // Convert range dates to UTC timestamps for comparison
      const startTime = new Date(range.start).getTime();
      const endTime = new Date(range.end).getTime();
      const checkTime = checkDate.getTime();

      // A day is booked if it falls within the range [start, end)
      return checkTime >= startTime && checkTime < endTime;
    });

    return isBooked;
  };

  const isDayInPast = (day: number) => {
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    
    // Create date in UTC to match iCal dates
    const checkDate = new Date(Date.UTC(currentYear, currentMonth, day, 0, 0, 0));

    // Today's date at midnight UTC
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));

    return checkDate < todayUTC;
  };

  const isToday = (day: number) => {
    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();
    // Create date in UTC to match iCal dates
    const checkDate = new Date(Date.UTC(currentYear, currentMonth, day, 0, 0, 0));

    // Today's date at midnight UTC
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));

    return checkDate.getTime() === todayUTC.getTime();
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-xl capitalize">{monthName} {year}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-orange-400 animate-pulse' : syncError ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
              {isSyncing ? 'Sincronizzazione...' : syncError ? 'Errore Sincronizzazione' : `${realBookings.length} prenotazioni`}
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => setViewDate(new Date(year, viewDate.getMonth() - 1, 1))} className="flex-1 sm:flex-none p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
          </button>
          <button onClick={() => setViewDate(new Date(year, viewDate.getMonth() + 1, 1))} className="flex-1 sm:flex-none p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2}/></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-300 py-1">{d}</div>)}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const booked = isDayBooked(day);
          const inPast = isDayInPast(day);
          const today = isToday(day);

          let className = 'aspect-square flex items-center justify-center rounded-lg text-xs font-medium ';

          if (inPast) {
            // Past dates - disabled/unavailable
            className += 'bg-slate-100 text-slate-300';
          } else if (booked) {
            // Booked dates
            className += 'bg-red-500 text-white';
          } else {
            // Available future dates (including today)
            className += 'bg-green-500 text-white';
          }

          return (
            <div key={day} className={className}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [view, setView] = useState<View>('home');
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('it');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.75;
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('cookie_consent') === 'accepted') {
      loadGoogleAnalytics();
    }
  }, []);

  const selectedApartment = APARTMENTS.find(a => a.id === selectedAptId);

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
      if (aptSeo && aptSeo[lang]) {
        return {
          title: aptSeo[lang].title,
          description: aptSeo[lang].description,
          image: selectedApartment?.images?.[0] || '/images/azure/foto_sala_1.png',
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

  const formatPriceFull = (price: number) => {
    const formatter = new Intl.NumberFormat(lang === 'it' ? 'it-IT' : lang === 'de' ? 'de-DE' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    });
    return formatter.format(price);
  };

  const navigateTo = (newView: View, id?: string, anchor?: string) => {
    setView(newView);
    setSelectedAptId(id || null);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const LanguageSwitcher = () => (
    <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 shadow-sm">
      {(['it', 'en', 'de'] as Language[]).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-white text-blue-700 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <img src={`https://flagcdn.com/w40/${l === 'en' ? 'gb' : l}.png`} alt={l} className="w-4 h-auto rounded-sm" />
          <span className="hidden xs:inline">{l}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden relative">
      {/* SEO Components */}
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

      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-100 h-32 sm:h-40 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div onClick={() => navigateTo('home')} className="cursor-pointer group flex items-center">
            <img
              src="/images/logo.png"
              alt={SITE_CONFIG.name}
              className="h-20 sm:h-24 w-auto transition-all group-hover:scale-105"
            />
          </div>
          <nav className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <LanguageSwitcher />
            <button onClick={() => navigateTo('home', undefined, 'stays')} className="hover:text-slate-900">{UI_LABELS.nav_residences[lang]}</button>
            <button onClick={() => navigateTo('story')} className="hover:text-slate-900">{UI_LABELS.nav_history[lang]}</button>
            <button onClick={() => navigateTo('home', undefined, 'contact')} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-lg transition-all">{UI_LABELS.nav_contact[lang]}</button>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 bg-slate-50 rounded-lg text-slate-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6" : "M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white pt-32 px-6 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-300 md:hidden">
          <button onClick={() => navigateTo('home', undefined, 'stays')} className="text-2xl font-bold text-slate-900">{UI_LABELS.nav_residences[lang]}</button>
          <button onClick={() => navigateTo('story')} className="text-2xl font-bold text-slate-900">{UI_LABELS.nav_history[lang]}</button>
          <button onClick={() => navigateTo('home', undefined, 'contact')} className="text-2xl font-bold text-blue-700">{UI_LABELS.nav_contact[lang]}</button>
        </div>
      )}

      <main className="flex-1 w-full relative">
        {view === 'home' && (
          <div className="animate-in fade-in duration-700">
            <section className="relative py-20 sm:py-32 px-6 lake-gradient text-center overflow-hidden">
              {/* Background Video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/lake-maggiore.mp4" type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200" alt="Lake Maggiore" className="w-full h-full object-cover" />
              </video>

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>

              <div className="relative z-10 max-w-4xl mx-auto">
                <span className="text-white font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block drop-shadow-2xl">{HERO_SECTION.subtitle[lang]}</span>
                <h1 className="text-5xl sm:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-tight drop-shadow-2xl">
                  {HERO_SECTION.title1[lang]} <br />
                  <span className="serif italic font-normal text-blue-700 drop-shadow-2xl">{HERO_SECTION.title2[lang]}</span>
                </h1>
                <p className="text-lg sm:text-2xl text-white mb-10 font-semibold max-w-2xl mx-auto drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: HERO_SECTION.description[lang] }} />
                <button onClick={() => navigateTo('home', undefined, 'stays')} className="bg-white text-slate-900 px-10 py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 shadow-2xl transition-all drop-shadow-2xl">
                  {HERO_SECTION.buttonLabel[lang]}
                </button>
              </div>
            </section>

            <section id="stays" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">{UI_LABELS.houses_title[lang]}</h2>
                <p className="text-slate-400 serif italic text-lg sm:text-xl">{UI_LABELS.houses_subtitle[lang]}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                {APARTMENTS.map(apt => <ApartmentCard key={apt.id} apartment={apt} lang={lang} onSelect={a => navigateTo('property', a.id)} />)}
              </div>
            </section>

            {/* DISTANCES SECTION */}
            <section className="py-20 px-6 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">{UI_LABELS.distances_title[lang]}</h2>
                  <p className="text-slate-400 serif italic text-lg sm:text-xl">{UI_LABELS.distances_subtitle[lang]}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {DISTANCES[lang].map((dist, i) => (
                    <div key={i} className="bg-slate-50 rounded-3xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
                      <div className="text-6xl mb-6">{dist.icon}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{dist.place}</h3>
                      <div className="space-y-1">
                <p className="text-lg font-semibold text-blue-700">{dist.distance}</p>
                        <p className="text-sm text-slate-500">{dist.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* MAPPA GENERALE HOME */}
            <section className="py-20 px-6 bg-slate-50">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-2 tracking-tight">{UI_LABELS.neighborhood_title[lang]}</h2>
                    <p className="text-slate-400 serif italic">{SITE_CONFIG.locationLabel[lang]}</p>
                  </div>
                  <div className="w-full max-w-[100vw] overflow-hidden">
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-slate-100 aspect-video min-h-[400px]">
                      <iframe
                        title="Laveno Map"
                        src={SITE_CONFIG.homeMapEmbedUrl}
                        className="w-full h-full grayscale-[0.2]"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
               </div>
            </section>

            <section id="contact" className="py-24 bg-slate-900 text-white text-center scroll-mt-24">
              <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl sm:text-6xl font-bold mb-6 tracking-tighter">{UI_LABELS.contact_human[lang]}</h2>
                <p className="text-slate-400 text-base sm:text-lg mb-10 font-light">{UI_LABELS.contact_desc[lang]}</p>
                <div className="w-full max-w-md mx-auto px-4">
                  <ContactInfo
                    primaryEmail={SITE_CONFIG.email}
                    secondaryEmail={SITE_CONFIG.email2}
                    primaryPhone={SITE_CONFIG.whatsapp}
                    secondaryPhone={SITE_CONFIG.whatsapp2}
                  />
                </div>
              </div>
            </section>

            <ContactForm lang={lang} />
          </div>
        )}

        {view === 'property' && selectedApartment && (
          <div className="animate-in fade-in duration-500 bg-white pb-20 w-full overflow-hidden">
            <section className="bg-slate-50 border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <button onClick={() => navigateTo('home', undefined, 'stays')} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold uppercase text-[10px] tracking-widest mb-8 transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
                   {UI_LABELS.back[lang]}
                </button>
                
                {/* GALLERIA DINAMICA STABILIZZATA */}
                <div className="relative group min-h-[300px] sm:min-h-0">
                  {/* Vista Mobile: Slider */}
                  <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 h-[350px]">
                    {selectedApartment.images.map((img, idx) => (
                      <div key={idx} className="snap-center shrink-0 w-[85vw] h-full">
                        <SmartImage 
                          src={img} 
                          alt="" 
                          className="w-full h-full rounded-2xl shadow-lg border border-slate-200" 
                          onClick={() => openLightbox(idx)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Vista Desktop: Mosaico con aspect-ratio bloccato */}
                  <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-200 aspect-[21/9] w-full">
                    <div className="col-span-2 row-span-2 h-full">
                      <SmartImage 
                        src={selectedApartment.images[0]} 
                        alt="" 
                        className="h-full w-full" 
                        onClick={() => openLightbox(0)}
                      />
                    </div>
                    {selectedApartment.images.slice(1, 5).map((img, idx) => (
                      <div key={idx} className="h-full">
                        <SmartImage 
                          src={img} 
                          alt="" 
                          className="h-full w-full" 
                          onClick={() => openLightbox(idx + 1)} 
                        />
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => openLightbox(0)}
                    className="absolute bottom-6 right-6 bg-white/95 backdrop-blur px-6 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-900 hover:bg-white transition-all z-10"
                  >
                    <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7" strokeWidth={2}/></svg>
                    {lang === 'it' ? 'Esplora Galleria' : lang === 'de' ? 'Galerie ansehen' : 'Explore Gallery'}
                  </button>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-2 space-y-16">
                <div className="space-y-4">
                   <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-slate-900 leading-tight">{selectedApartment.name[lang]}</h1>
                   <p className="text-xl sm:text-2xl serif italic text-slate-400">{selectedApartment.tagline[lang]}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-slate-900">{selectedApartment.bedrooms}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{UI_LABELS.bedrooms[lang]}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-slate-900">{selectedApartment.bathrooms}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{UI_LABELS.bathrooms[lang]}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-slate-900">{selectedApartment.sqft}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{UI_LABELS.living_space[lang]}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-slate-900">{selectedApartment.maxGuests}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{UI_LABELS.max_guests[lang]}</span>
                  </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-slate-900 font-bold text-2xl tracking-tight">{UI_LABELS.experience_title[lang]}</h3>
                   <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line font-light">{selectedApartment.description[lang]}</p>
                </div>

                <div className="space-y-8">
                   <h3 className="text-slate-900 font-bold text-2xl tracking-tight">{UI_LABELS.amenities_title[lang]}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedApartment.amenities[lang].map((a, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
                           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                           <span className="text-sm font-semibold text-slate-700">{a}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-8">
                   <h3 className="text-slate-900 font-bold text-2xl tracking-tight">{UI_LABELS.availability_title[lang]}</h3>
                   <div className="w-full">
                     <AvailabilityCalendar key={selectedApartment.id} apartment={selectedApartment} lang={lang} />
                   </div>
                </div>



                <div className="space-y-8">
                   <h3 className="text-slate-900 font-bold text-2xl tracking-tight">{UI_LABELS.neighborhood_title[lang]}</h3>
                   <div className="w-full max-w-[100vw] overflow-hidden">
                     <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl w-full aspect-video min-h-[400px]">
                        {selectedApartment.googleMapsEmbedUrl ? (
                          <iframe
                            title={`Location of ${selectedApartment.name[lang]}`}
                            src={selectedApartment.googleMapsEmbedUrl}
                            className="w-full h-full border-0 grayscale-[0.2]"
                            allowFullScreen={true}
                            loading="lazy"
                          ></iframe>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center p-10 bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                            Map not configured
                          </div>
                        )}
                     </div>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-1 relative">
                <div className="lg:sticky lg:top-36 p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl space-y-10">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">{UI_LABELS.direct_only[lang]}</span>
                    <p className="text-4xl sm:text-5xl font-bold tracking-tighter">
                      {UI_LABELS.price_from[lang]} {formatPriceFull(selectedApartment.price)}
                    </p>
                    <div className="inline-block bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {UI_LABELS.best_rate[lang]}
                    </div>
                  </div>
                  
                    <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Ciao ${SITE_CONFIG.hostName}, vorrei prenotare: ${selectedApartment.name[lang]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-700 py-6 rounded-2xl text-center font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                  >
                    {UI_LABELS.cta_btn[lang]}
                  </a>

                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl border border-white/10">
                       {SITE_CONFIG.hostName.charAt(0)}
                     </div>
                     <div>
                        <p className="text-xs font-bold leading-none mb-1">{SITE_CONFIG.hostName} {UI_LABELS.host_online[lang]}</p>
                        <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{UI_LABELS.host_status[lang]}</p>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            {selectedApartment && (
              <Lightbox 
                images={selectedApartment.images} 
                isOpen={isLightboxOpen} 
                onClose={() => setIsLightboxOpen(false)} 
                startIndex={lightboxIndex}
                lang={lang}
              />
            )}
          </div>
        )}

        {view === 'story' && (
          <section className="py-20 px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl sm:text-7xl font-bold mb-12 tracking-tighter leading-tight text-center">{STORY_CONTENT.title[lang]}</h1>
            <p className="text-2xl sm:text-4xl serif italic text-slate-900 mb-16 text-center leading-relaxed">
              {STORY_CONTENT.quote[lang]}
            </p>
            <div className="prose prose-xl text-slate-500 space-y-10 text-left mb-16 font-light">
              {STORY_CONTENT.paragraphs[lang].map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <SmartImage src={STORY_CONTENT.image} alt={SITE_CONFIG.name} className="w-full rounded-[2.5rem] shadow-2xl h-[400px] sm:h-[600px]" />
          </section>
        )}
      </main>

      <Footer />
      
      <FloatingWhatsApp
        phone={SITE_CONFIG.whatsapp}
        hostName={SITE_CONFIG.hostName}
        apartmentName={selectedApartment?.name[lang] || ''}
        lang={lang}
      />

      <CookieBanner 
        lang={lang} 
        onAccept={loadGoogleAnalytics} 
      />

      {import.meta.env.DEV && <CalendarDebugPanel />}
    </div>
  );
};

export default App;
