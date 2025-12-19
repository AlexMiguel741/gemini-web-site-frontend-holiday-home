
import React, { useState, useEffect, useMemo } from 'react';
import { APARTMENTS, SITE_CONFIG, STORY_CONTENT, HERO_SECTION, UI_LABELS } from './constants';
import { Apartment, Language } from './types';
import ApartmentCard from './components/ApartmentCard';
import AIChatConcierge from './components/AIChatConcierge';
import { fetchAndParseIcal, BookedRange } from './services/icalService';

type View = 'home' | 'story' | 'property';

const SmartImage: React.FC<{ src?: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200';

  useEffect(() => {
    setCurrentSrc(src || fallback);
    setHasError(false);
  }, [src]);

  return (
    <img 
      src={hasError || !currentSrc ? fallback : currentSrc} 
      alt={alt} 
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

const AvailabilityCalendar: React.FC<{ apartment: Apartment; lang: Language }> = ({ apartment, lang }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());
  const [realBookings, setRealBookings] = useState<BookedRange[]>([]);

  useEffect(() => {
    const sync = async () => {
      if (!apartment.icalUrl) return;
      setIsSyncing(true);
      const bookings = await fetchAndParseIcal(apartment.icalUrl);
      setRealBookings(bookings);
      setLastSync(new Date());
      setIsSyncing(false);
    };
    sync();
  }, [apartment.icalUrl]);

  const monthName = viewDate.toLocaleString(lang, { month: 'long' });
  const year = viewDate.getFullYear();
  const daysInMonth = new Date(year, viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, viewDate.getMonth(), 1).getDay();

  const isDayBooked = (day: number) => {
    const checkDate = new Date(year, viewDate.getMonth(), day);
    return realBookings.some(range => checkDate >= range.start && checkDate < range.end);
  };

  const nextMonth = () => setViewDate(new Date(year, viewDate.getMonth() + 1, 1));
  const prevMonth = () => setViewDate(new Date(year, viewDate.getMonth() - 1, 1));

  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-12 shadow-sm relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
        <div>
          <h4 className="font-bold text-slate-900 text-3xl tracking-tight leading-none capitalize">{monthName} {year}</h4>
          <div className="flex items-center gap-2 mt-3">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-orange-400 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
              {isSyncing ? UI_LABELS.sync_live[lang] : UI_LABELS.sync_connected[lang]}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={prevMonth} className="p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
          </button>
          <button onClick={nextMonth} className="p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900 border border-slate-100 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-[11px] font-bold text-slate-300 py-3 uppercase tracking-widest">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} className="aspect-square"></div>)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const booked = isDayBooked(day);
          const isToday = day === new Date().getDate() && viewDate.getMonth() === new Date().getMonth() && year === new Date().getFullYear();
          return (
            <div key={day} className={`relative aspect-square flex items-center justify-center rounded-2xl text-base font-bold transition-all border ${booked ? 'bg-slate-50/70 text-slate-200 border-transparent' : isToday ? 'bg-blue-600 text-white border-blue-600 shadow-2xl scale-110 z-10' : 'bg-white text-slate-700 border-slate-50 hover:border-blue-200 hover:bg-blue-50/40 cursor-pointer shadow-sm'}`}>
              {day}
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 flex flex-wrap gap-10 pt-10 border-t border-slate-50">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-lg bg-blue-600 shadow-lg shadow-blue-200"></div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{UI_LABELS.available[lang]}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 rounded-lg bg-slate-100 border border-slate-200"></div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{UI_LABELS.booked[lang]}</span>
        </div>
        <div className="sm:ml-auto">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
            {UI_LABELS.last_sync[lang]}: {lastSync.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<Language>('it');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedAptId]);

  const navigateTo = (newView: View, id?: string, anchor?: string) => {
    setView(newView);
    setSelectedAptId(id || null);
    setIsMenuOpen(false);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const selectedApartment = APARTMENTS.find(a => a.id === selectedAptId);

  const LanguageSwitcher = () => {
    const flagImages: Record<Language, string> = {
      it: 'https://flagcdn.com/w40/it.png',
      en: 'https://flagcdn.com/w40/gb.png',
      de: 'https://flagcdn.com/w40/de.png'
    };

    return (
      <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 shadow-sm">
        {(['it', 'en', 'de'] as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
              lang === l 
                ? 'bg-white text-blue-600 shadow-md scale-105 z-10' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
            }`}
            aria-label={`Switch to ${l}`}
          >
            <img 
              src={flagImages[l]} 
              alt={l} 
              className="w-5 h-auto rounded-sm object-cover shadow-sm border border-slate-100" 
            />
            <span className="hidden xs:inline">{l}</span>
          </button>
        ))}
      </div>
    );
  };

  const PropertyView = ({ apt }: { apt: Apartment }) => (
    <div className="animate-in fade-in duration-1000 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between sm:hidden">
        <button onClick={() => navigateTo('home', undefined, 'stays')} className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={3}/></svg>
          {UI_LABELS.back[lang]}
        </button>
      </div>

      <section className="px-4 sm:px-6 pt-2 sm:pt-6 bg-slate-50 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-4 gap-4 sm:gap-6 md:h-[80vh]">
          <div className="md:col-span-2 h-[45vh] sm:h-[60vh] md:h-full overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl relative group">
            <SmartImage src={apt.images[0]} className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" alt={apt.name[lang]} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 sm:gap-6 md:col-span-1 h-[25vh] sm:h-[40vh] md:h-full">
            <div className="overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] shadow-xl group">
              <SmartImage src={apt.images[1]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
            </div>
            <div className="overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] shadow-xl group">
              <SmartImage src={apt.images[2]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
            </div>
          </div>
          <div className="hidden md:block overflow-hidden rounded-[3.5rem] shadow-xl group">
            <SmartImage src={apt.images[3]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
          </div>
          <div className="md:hidden h-[25vh] sm:h-[40vh] overflow-hidden rounded-[2.5rem] shadow-xl group">
            <SmartImage src={apt.images[3]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 sm:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-24">
        <div className="lg:col-span-8">
          <div className="mb-12 sm:mb-20">
            <span className="text-blue-600 font-bold tracking-[0.7em] uppercase text-[10px] sm:text-[12px] mb-4 sm:mb-8 block">{UI_LABELS.exclusive_label[lang]}</span>
            <h1 className="text-5xl sm:text-9xl font-bold text-slate-900 mb-6 sm:mb-10 tracking-tighter leading-[0.9] sm:leading-[0.85]">{apt.name[lang]}</h1>
            <p className="text-2xl sm:text-5xl text-slate-400 serif italic leading-tight max-w-2xl">{apt.tagline[lang]}</p>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-16 py-10 sm:py-16 border-y border-slate-100 my-12 sm:my-20">
            <div className="flex flex-col gap-2 sm:gap-4">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">{apt.bedrooms}</span>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 tracking-[0.4em]">{UI_LABELS.bedrooms[lang]}</span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">{apt.bathrooms}</span>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 tracking-[0.4em]">{UI_LABELS.bathrooms[lang]}</span>
            </div>
            <div className="flex flex-col gap-2 sm:gap-4">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">{apt.sqft}</span>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 tracking-[0.4em]">{UI_LABELS.living_space[lang]}</span>
            </div>
          </div>

          <div className="prose prose-slate prose-xl sm:prose-2xl max-w-none text-slate-600 mb-16 sm:mb-24 leading-relaxed font-light">
            <h3 className="text-slate-900 font-bold text-4xl sm:text-5xl mb-8 sm:mb-12 tracking-tight">{UI_LABELS.experience_title[lang]}</h3>
            <p className="first-letter:text-7xl sm:first-letter:text-8xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-4 sm:first-letter:mr-6 first-letter:float-left first-letter:mt-1">
              {apt.description[lang]}
            </p>
          </div>

          <div className="mb-20 sm:mb-32">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-14 tracking-tight">{UI_LABELS.amenities_title[lang]}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              {apt.amenities[lang].map(amenity => (
                <div key={amenity} className="flex items-center gap-6 sm:gap-8 text-slate-800 bg-slate-50/30 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-50 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all group">
                  <div className="w-4 h-4 sm:w-5 h-5 rounded-full bg-blue-600 shadow-xl shadow-blue-200 group-hover:scale-125 transition-transform"></div>
                  <span className="font-bold text-lg sm:text-2xl tracking-tight">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div id="calendar-section" className="scroll-mt-32 mb-20 sm:mb-32">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-14 tracking-tight">{UI_LABELS.availability_title[lang]}</h3>
            <AvailabilityCalendar apartment={apt} lang={lang} />
          </div>

          <div id="location-section" className="scroll-mt-32">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-14 tracking-tight">{UI_LABELS.neighborhood_title[lang]}</h3>
            <div className="rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-[8px] sm:border-[16px] border-slate-50 shadow-xl aspect-video relative">
              <iframe src={apt.googleMapsEmbedUrl} className="absolute inset-0 w-full h-full grayscale-[0.2]" style={{ border: 0 }} allowFullScreen={true} loading="lazy"></iframe>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8 sm:space-y-12">
            <div className="bg-slate-900 text-white rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8 sm:mb-12">
                  <span className="text-[10px] sm:text-[12px] uppercase font-bold tracking-[0.6em] text-blue-400">{UI_LABELS.direct_only[lang]}</span>
                  <div className="bg-emerald-500/10 text-emerald-400 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-widest border border-emerald-500/20 shadow-sm">{UI_LABELS.best_rate[lang]}</div>
                </div>
                <p className="text-5xl sm:text-7xl font-bold tracking-tighter mb-4 sm:mb-6">{apt.price}</p>
                <p className="text-sm sm:text-base opacity-50 mb-8 sm:mb-12 font-medium">{UI_LABELS.save_msg[lang]}</p>
                <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-14 border-t border-white/10 pt-8 sm:pt-14">
                  <div className="flex items-center gap-4 sm:gap-6 text-base sm:text-lg opacity-90 font-medium">{UI_LABELS.whatsapp_resp[lang]}</div>
                  <div className="flex items-center gap-4 sm:gap-6 text-base sm:text-lg opacity-90 font-medium">{UI_LABELS.concierge_service[lang]}</div>
                </div>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi ${SITE_CONFIG.hostName}! I'm interested in the ${apt.name[lang]}.`} target="_blank" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 sm:py-9 rounded-[1.5rem] sm:rounded-[2rem] font-bold text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all shadow-3xl block text-center transform active:scale-[0.97] shadow-blue-500/20">
                  {UI_LABELS.cta_btn[lang]}
                </a>
              </div>
            </div>
            <div className="p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-slate-50 border border-slate-100 flex items-center gap-6 sm:gap-10 group cursor-default">
              <div className="w-16 h-16 sm:w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center font-bold text-2xl sm:text-4xl text-blue-600 border-[4px] sm:border-[6px] border-slate-50 transition-transform group-hover:rotate-12 duration-500">
                {SITE_CONFIG.hostName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg sm:text-2xl leading-none mb-1 sm:mb-2">{UI_LABELS.host_status[lang]}</p>
                <p className="text-sm sm:text-lg text-slate-500 font-medium">
                  {SITE_CONFIG.hostName} {UI_LABELS.host_online[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 bg-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 sm:h-28 flex items-center justify-between">
          <div onClick={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer group">
            <span className="text-2xl sm:text-4xl font-bold tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">{SITE_CONFIG.name}</span>
          </div>

          <nav className="hidden md:flex gap-8 lg:gap-14 text-[12px] font-bold uppercase tracking-[0.4em] text-slate-500 items-center">
            <LanguageSwitcher />
            <button onClick={() => navigateTo('home', undefined, 'stays')} className="hover:text-slate-900 transition-colors">{UI_LABELS.nav_residences[lang]}</button>
            <button onClick={() => navigateTo('story')} className="hover:text-slate-900 transition-colors">{UI_LABELS.nav_history[lang]}</button>
            <button onClick={() => navigateTo('home', undefined, 'contact')} className="bg-slate-900 text-white px-8 lg:px-10 py-4 rounded-[1.5rem] hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200">{UI_LABELS.nav_contact[lang]}</button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-900 bg-slate-50 rounded-xl shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6" : "M4 8h16M4 16h16"} /></svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {view === 'home' && (
          <>
            <section className="relative py-24 sm:py-32 lg:py-64 px-6 lake-gradient overflow-hidden min-h-[90vh] flex items-center">
              <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
                <span className="text-blue-600 font-bold tracking-[0.9em] uppercase text-[10px] sm:text-[12px] mb-8 sm:mb-14 block">{HERO_SECTION.subtitle[lang]}</span>
                <h1 className="text-6xl sm:text-[10rem] font-bold text-slate-900 mb-8 sm:mb-14 leading-[0.9] sm:leading-[0.8] tracking-tighter">
                  {HERO_SECTION.title1[lang]} <br />
                  <span className="serif italic font-normal text-blue-600 tracking-tighter">{HERO_SECTION.title2[lang]}</span>
                </h1>
                <p className="text-xl sm:text-4xl text-slate-500 max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-20 font-light">{HERO_SECTION.description[lang]}</p>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center">
                  <button onClick={() => navigateTo('home', undefined, 'stays')} className="bg-slate-900 text-white px-12 sm:px-20 py-6 sm:py-10 rounded-[2rem] sm:rounded-[2.5rem] font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-3xl">
                    {HERO_SECTION.buttonLabel[lang]}
                  </button>
                </div>
              </div>
            </section>

            <section id="stays" className="py-24 sm:py-48 px-6 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-28">
              <div className="mb-20 sm:mb-40 text-center">
                <h2 className="text-5xl sm:text-9xl font-bold text-slate-900 mb-6 sm:mb-10 tracking-tighter">{UI_LABELS.houses_title[lang]}</h2>
                <p className="text-slate-400 serif italic text-2xl sm:text-4xl">{UI_LABELS.houses_subtitle[lang]}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 lg:gap-32">
                {APARTMENTS.map(apt => (
                  <ApartmentCard key={apt.id} apartment={apt} lang={lang} onSelect={(a) => navigateTo('property', a.id)} />
                ))}
              </div>
            </section>

            <section id="contact" className="py-32 sm:py-64 bg-slate-900 text-white scroll-mt-20 sm:scroll-mt-28 relative overflow-hidden">
              <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
                <h2 className="text-5xl sm:text-[11rem] font-bold mb-8 sm:mb-16 leading-[1] sm:leading-[0.8] tracking-tighter">{UI_LABELS.contact_human[lang]}</h2>
                <p className="text-slate-400 text-xl sm:text-3xl mb-12 sm:mb-24 max-w-4xl mx-auto font-light leading-relaxed">
                  {UI_LABELS.contact_desc[lang]}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="bg-blue-600 px-12 sm:px-20 py-8 sm:py-12 rounded-[2rem] sm:rounded-[3rem] font-bold uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-blue-500 transition-all shadow-3xl shadow-blue-500/20">
                    Email {SITE_CONFIG.hostName}
                  </a>
                  <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} className="bg-emerald-600 px-12 sm:px-20 py-8 sm:py-12 rounded-[2rem] sm:rounded-[3rem] font-bold uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-emerald-500 transition-all shadow-3xl shadow-emerald-500/20">
                    WhatsApp {SITE_CONFIG.hostName}
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
        {view === 'property' && selectedApartment && <PropertyView apt={selectedApartment} />}
        {view === 'story' && (
          <section className="py-24 sm:py-48 px-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <h1 className="text-6xl sm:text-[12rem] font-bold text-slate-900 mb-12 sm:mb-24 tracking-tighter leading-none">
              {STORY_CONTENT.title[lang]}
            </h1>
            <div className="prose prose-slate prose-lg sm:prose-2xl text-slate-500 space-y-12 sm:space-y-24 font-light">
              <p className="text-3xl sm:text-6xl serif italic text-slate-900 leading-[1.1] tracking-tight">
                {STORY_CONTENT.quote[lang]}
              </p>
              {STORY_CONTENT.paragraphs[lang].map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <SmartImage src={STORY_CONTENT.image} className="rounded-[2.5rem] sm:rounded-[4.5rem] shadow-2xl" alt={SITE_CONFIG.name} />
            </div>
          </section>
        )}
      </main>

      <footer className="py-24 sm:py-40 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 sm:gap-24">
            <div className="text-center md:text-left">
              <p className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4 sm:mb-8">{SITE_CONFIG.name}</p>
              <p className="text-slate-400 text-[10px] sm:text-sm font-bold tracking-[0.5em] uppercase">
                © 2024 Boutique Direct Stays • {SITE_CONFIG.locationLabel[lang]}
              </p>
            </div>
            <div className="flex gap-10 sm:gap-20 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">
              <button onClick={() => navigateTo('home')} className="hover:text-slate-900 transition-colors">Home</button>
              <button onClick={() => navigateTo('story')} className="hover:text-slate-900 transition-colors">{UI_LABELS.nav_history[lang]}</button>
              <button onClick={() => navigateTo('home', undefined, 'contact')} className="hover:text-slate-900 transition-colors">{UI_LABELS.nav_contact[lang]}</button>
            </div>
          </div>
        </div>
      </footer>

      <AIChatConcierge lang={lang} />
    </div>
  );
};

export default App;
