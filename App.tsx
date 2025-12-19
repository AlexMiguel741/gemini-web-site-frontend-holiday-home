
import React, { useState, useEffect } from 'react';
import { APARTMENTS, SITE_CONFIG, STORY_CONTENT, HERO_SECTION, UI_LABELS } from './constants';
import { Apartment, Language } from './types';
import ApartmentCard from './components/ApartmentCard';
import AIChatConcierge from './components/AIChatConcierge';
import { fetchAndParseIcal, BookedRange } from './services/icalService';

type View = 'home' | 'story' | 'property';

const SmartImage: React.FC<{ src?: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const fallback = 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200';
  const [currentSrc, setCurrentSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallback);
    setHasError(false);
  }, [src]);

  return (
    <img 
      src={hasError ? fallback : currentSrc} 
      alt={alt} 
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
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
  }, [apartment.id, apartment.icalUrl]);

  const monthName = viewDate.toLocaleString(lang, { month: 'long' });
  const year = viewDate.getFullYear();
  const daysInMonth = new Date(year, viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, viewDate.getMonth(), 1).getDay();

  const isDayBooked = (day: number) => {
    const checkDate = new Date(year, viewDate.getMonth(), day);
    return realBookings.some(range => checkDate >= range.start && checkDate < range.end);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-2xl capitalize">{monthName} {year}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-orange-400 animate-pulse' : 'bg-emerald-500'}`}></div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {isSyncing ? UI_LABELS.sync_live[lang] : UI_LABELS.sync_connected[lang]}
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => setViewDate(new Date(year, viewDate.getMonth() - 1, 1))} className="flex-1 sm:flex-none p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
          </button>
          <button onClick={() => setViewDate(new Date(year, viewDate.getMonth() + 1, 1))} className="flex-1 sm:flex-none p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2}/></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-300 py-2">{d}</div>)}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const booked = isDayBooked(day);
          return (
            <div key={day} className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium border transition-all ${booked ? 'bg-slate-50 text-slate-200 border-transparent' : 'bg-white text-slate-700 border-slate-50 shadow-sm hover:border-blue-200'}`}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500"></div>
          <span className="text-[10px] uppercase font-bold text-slate-400">{UI_LABELS.available[lang]}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-slate-100"></div>
          <span className="text-[10px] uppercase font-bold text-slate-400">{UI_LABELS.booked[lang]}</span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('it');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectedApartment = APARTMENTS.find(a => a.id === selectedAptId);

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

  const LanguageSwitcher = () => (
    <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200 shadow-sm">
      {(['it', 'en', 'de'] as Language[]).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all ${lang === l ? 'bg-white text-blue-600 shadow-md scale-105' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <img src={`https://flagcdn.com/w40/${l === 'en' ? 'gb' : l}.png`} alt={l} className="w-4 h-auto rounded-sm" />
          <span className="hidden xs:inline">{l}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden relative">
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-100 h-20 sm:h-28 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <div onClick={() => navigateTo('home')} className="cursor-pointer group flex items-center">
            <span className="text-xl sm:text-2xl font-bold tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">{SITE_CONFIG.name}</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <LanguageSwitcher />
            <button onClick={() => navigateTo('home', undefined, 'stays')} className="hover:text-slate-900">{UI_LABELS.nav_residences[lang]}</button>
            <button onClick={() => navigateTo('story')} className="hover:text-slate-900">{UI_LABELS.nav_history[lang]}</button>
            <button onClick={() => navigateTo('home', undefined, 'contact')} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-600 shadow-lg transition-all">{UI_LABELS.nav_contact[lang]}</button>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 bg-slate-50 rounded-lg text-slate-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6" : "M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white pt-32 px-6 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-300 md:hidden">
          <button onClick={() => navigateTo('home', undefined, 'stays')} className="text-2xl font-bold text-slate-900">{UI_LABELS.nav_residences[lang]}</button>
          <button onClick={() => navigateTo('story')} className="text-2xl font-bold text-slate-900">{UI_LABELS.nav_history[lang]}</button>
          <button onClick={() => navigateTo('home', undefined, 'contact')} className="text-2xl font-bold text-blue-600">{UI_LABELS.nav_contact[lang]}</button>
        </div>
      )}

      <main className="flex-1 w-full relative">
        {view === 'home' && (
          <div className="animate-in fade-in duration-700">
            <section className="relative py-20 sm:py-32 px-6 lake-gradient text-center">
              <div className="max-w-4xl mx-auto">
                <span className="text-blue-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">{HERO_SECTION.subtitle[lang]}</span>
                <h1 className="text-4xl sm:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tighter leading-tight">
                  {HERO_SECTION.title1[lang]} <br />
                  <span className="serif italic font-normal text-blue-600">{HERO_SECTION.title2[lang]}</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-500 mb-10 font-light max-w-2xl mx-auto">{HERO_SECTION.description[lang]}</p>
                <button onClick={() => navigateTo('home', undefined, 'stays')} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 shadow-xl transition-all">
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

            <section className="py-20 px-6 bg-slate-50 overflow-hidden">
               <div className="max-w-7xl mx-auto">
                  <div className="rounded-3xl overflow-hidden shadow-2xl bg-white p-2 sm:p-4 aspect-video min-h-[400px]">
                    <iframe 
                      title="Laveno Map"
                      src={SITE_CONFIG.homeMapEmbedUrl} 
                      className="w-full h-full grayscale-[0.3] contrast-[1.1]" 
                      style={{ border: 0, minHeight: '400px' }} 
                      allowFullScreen={true} 
                      loading="lazy"
                    ></iframe>
                  </div>
               </div>
            </section>

            <section id="contact" className="py-24 bg-slate-900 text-white text-center scroll-mt-24">
              <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl sm:text-6xl font-bold mb-6 tracking-tighter">{UI_LABELS.contact_human[lang]}</h2>
                <p className="text-slate-400 text-base sm:text-lg mb-10 font-light">{UI_LABELS.contact_desc[lang]}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="bg-blue-600 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all flex items-center justify-center">Email {SITE_CONFIG.hostName}</a>
                  <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-emerald-500 transition-all flex items-center justify-center">WhatsApp Direct</a>
                </div>
              </div>
            </section>
          </div>
        )}

        {view === 'property' && selectedApartment && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-white pb-20 w-full overflow-hidden">
            <section className="px-6 py-6 sm:py-10 bg-slate-50 w-full">
              <div className="max-w-7xl mx-auto">
                <button onClick={() => navigateTo('home', undefined, 'stays')} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold uppercase text-[10px] tracking-widest mb-6 transition-colors">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
                   {UI_LABELS.back[lang]}
                </button>
                
                {/* Responsive Image Grid without fixed heights to avoid collapse */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                  <div className="md:col-span-8 overflow-hidden rounded-3xl shadow-xl aspect-video md:aspect-auto">
                    <SmartImage src={selectedApartment.images[0]} alt={selectedApartment.name[lang]} className="w-full h-full object-cover min-h-[300px]" />
                  </div>
                  <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
                    <div className="aspect-square overflow-hidden rounded-3xl shadow-lg">
                      <SmartImage src={selectedApartment.images[1]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square overflow-hidden rounded-3xl shadow-lg">
                      <SmartImage src={selectedApartment.images[2]} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-2 space-y-12">
                <div>
                   <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tighter text-slate-900">{selectedApartment.name[lang]}</h1>
                   <p className="text-xl sm:text-2xl serif italic text-slate-400">{selectedApartment.tagline[lang]}</p>
                </div>

                <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-100">
                  <div className="flex flex-col"><span className="text-2xl sm:text-3xl font-bold">{selectedApartment.bedrooms}</span><span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{UI_LABELS.bedrooms[lang]}</span></div>
                  <div className="flex flex-col"><span className="text-2xl sm:text-3xl font-bold">{selectedApartment.bathrooms}</span><span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{UI_LABELS.bathrooms[lang]}</span></div>
                  <div className="flex flex-col"><span className="text-2xl sm:text-3xl font-bold">{selectedApartment.sqft}</span><span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">{UI_LABELS.living_space[lang]}</span></div>
                </div>

                <div className="prose prose-lg text-slate-600 max-w-none">
                   <h3 className="text-slate-900 font-bold text-2xl mb-4">{UI_LABELS.experience_title[lang]}</h3>
                   <p className="leading-relaxed whitespace-pre-line">{selectedApartment.description[lang]}</p>
                </div>

                <div className="space-y-6">
                   <h3 className="text-slate-900 font-bold text-2xl">{UI_LABELS.amenities_title[lang]}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedApartment.amenities[lang].map((a, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                           <span className="text-sm font-medium text-slate-700">{a}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-slate-900 font-bold text-2xl">{UI_LABELS.availability_title[lang]}</h3>
                   <AvailabilityCalendar apartment={selectedApartment} lang={lang} />
                </div>

                <div className="space-y-6">
                   <h3 className="text-slate-900 font-bold text-2xl">{UI_LABELS.neighborhood_title[lang]}</h3>
                   {/* Explicit height and block display for Google Maps container */}
                   <div className="rounded-3xl overflow-hidden border-8 border-slate-50 shadow-inner w-full bg-slate-100 block" style={{ minHeight: '400px', height: 'auto', position: 'relative' }}>
                      {selectedApartment.googleMapsEmbedUrl ? (
                        <iframe 
                          title={`Location of ${selectedApartment.name[lang]}`}
                          src={selectedApartment.googleMapsEmbedUrl} 
                          className="w-full h-full border-0" 
                          style={{ minHeight: '400px', width: '100%', display: 'block' }}
                          allowFullScreen={true} 
                          loading="lazy"
                        ></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-10 text-slate-400 font-bold uppercase text-xs tracking-widest text-center">
                          Map not configured for this residence
                        </div>
                      )}
                   </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-32 p-8 bg-slate-900 text-white rounded-[2rem] shadow-2xl space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">{UI_LABELS.direct_only[lang]}</span>
                    <p className="text-4xl sm:text-5xl font-bold tracking-tighter">{selectedApartment.price}</p>
                    <div className="inline-block bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-blue-500/20">{UI_LABELS.best_rate[lang]}</div>
                  </div>
                  <p className="text-xs opacity-60 leading-relaxed">{UI_LABELS.save_msg[lang]}</p>
                  
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs opacity-80 font-medium">
                       <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                       {UI_LABELS.whatsapp_resp[lang]}
                    </div>
                    <div className="flex items-center gap-3 text-xs opacity-80 font-medium">
                       <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                       {UI_LABELS.concierge_service[lang]}
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Interessato alla casa: ${selectedApartment.name[lang]}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 py-6 rounded-2xl text-center font-bold uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                  >
                    {UI_LABELS.cta_btn[lang]}
                  </a>

                  <div className="flex items-center gap-4 pt-4">
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl border border-white/5">{SITE_CONFIG.hostName.charAt(0)}</div>
                     <div>
                        <p className="text-xs font-bold leading-none mb-1">{SITE_CONFIG.hostName} {UI_LABELS.host_online[lang]}</p>
                        <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{UI_LABELS.host_status[lang]}</p>
                     </div>
                  </div>
                </div>
              </div>
            </section>
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
            <SmartImage src={STORY_CONTENT.image} alt={SITE_CONFIG.name} className="w-full rounded-[2.5rem] shadow-2xl" />
          </section>
        )}
      </main>

      <footer className="py-20 border-t border-slate-50 bg-[#fdfdfd] shrink-0">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-2xl font-bold tracking-tighter mb-4 text-slate-900">{SITE_CONFIG.name}</p>
          <div className="flex gap-8 mb-10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <button onClick={() => navigateTo('home')} className="hover:text-slate-900 transition-colors">Home</button>
            <button onClick={() => navigateTo('story')} className="hover:text-slate-900 transition-colors">{UI_LABELS.nav_history[lang]}</button>
            <button onClick={() => navigateTo('home', undefined, 'contact')} className="hover:text-slate-900 transition-colors">{UI_LABELS.nav_contact[lang]}</button>
          </div>
          <p className="text-slate-300 text-[10px] uppercase font-bold tracking-[0.3em]">
             © 2024 • {SITE_CONFIG.locationLabel[lang]}
          </p>
        </div>
      </footer>

      <AIChatConcierge lang={lang} />
    </div>
  );
};

export default App;
