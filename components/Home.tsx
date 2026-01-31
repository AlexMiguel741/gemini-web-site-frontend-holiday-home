import React, { useRef, useState, useMemo } from 'react';
import { APARTMENTS, SITE_CONFIG, HERO_SECTION, UI_LABELS, DISTANCES } from '../constants';
import { Language } from '../types';
import ApartmentCard from './ApartmentCard';
import { useNavigate } from 'react-router-dom';
import SmartImage from './SmartImage';
import SearchFilters from './SearchFilters';

interface HomeProps {
  lang: Language;
  scrollToAnchor: (anchor: string) => void;
}

const Home: React.FC<HomeProps> = ({ lang, scrollToAnchor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.75;
    }
  }, []);

  const navigateToApartment = (apartmentId: string) => {
    navigate(`/appartamenti/${apartmentId}`);
  };

  const [filters, setFilters] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: 0,
    maxPrice: 200,
    bedrooms: 0,
    bathrooms: 0,
    location: '',
    amenities: []
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredApartments = useMemo(() => {
    return APARTMENTS.filter(apt => {
      if (filters.location && apt.location !== filters.location) return false;
      if (filters.guests > apt.maxGuests) return false;
      if (filters.bedrooms > 0 && apt.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms > 0 && apt.bathrooms < filters.bathrooms) return false;
      if (apt.price < filters.minPrice || apt.price > filters.maxPrice) return false;
      if (filters.amenities.length > 0) {
        const aptAmenities = apt.amenities[lang];
        if (!filters.amenities.every((am: string) => aptAmenities.includes(am))) return false;
      }
      // Dates will be checked later with iCal
      return true;
    });
  }, [filters, lang]);

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative py-20 sm:py-32 px-6 lake-gradient text-center overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-95"
          style={{ filter: 'saturate(2.0) contrast(1.3) brightness(1.2)' }}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-white font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block drop-shadow-2xl">{HERO_SECTION.subtitle[lang]}</span>
          <h1 className="text-5xl sm:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-tight drop-shadow-2xl">
            {HERO_SECTION.title1[lang]} <br />
            <span className="serif italic font-normal text-[var(--color-secondary-light)] drop-shadow-2xl">{HERO_SECTION.title2[lang]}</span>
          </h1>
          <p className="text-lg sm:text-2xl text-white mb-10 font-semibold max-w-2xl mx-auto drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: HERO_SECTION.description[lang] }} />
          <button onClick={() => scrollToAnchor("stays")} className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary-dark)] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:from-[var(--color-primary-dark)] hover:to-black shadow-2xl transition-all drop-shadow-2xl">
            {HERO_SECTION.buttonLabel[lang]}
          </button>
        </div>
      </section>

      <section id="stays" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">{UI_LABELS.houses_title[lang]}</h2>
          <p className="text-[var(--color-text-secondary)] serif italic text-lg sm:text-xl">{UI_LABELS.houses_subtitle[lang]}</p>
        </div>
        <SearchFilters lang={lang} onFiltersChange={handleFiltersChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {filteredApartments.map(apt => <ApartmentCard key={apt.id} apartment={apt} lang={lang} />)}
        </div>
      </section>

      {/* DISTANCES SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">{UI_LABELS.distances_title[lang]}</h2>
            <p className="text-[var(--color-text-main)] serif italic text-lg sm:text-xl">{UI_LABELS.distances_subtitle[lang]}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DISTANCES[lang].map((dist, i) => (
              <div key={i} className="bg-[var(--color-background-light)] rounded-3xl p-8 text-center shadow-sm border border-[var(--color-border-light)] hover:shadow-lg transition-all duration-300">
                <div className="text-6xl mb-6">{dist.icon}</div>
                <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-3">{dist.place}</h3>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-[var(--color-primary-dark)]">{dist.distance}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{dist.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAPPA GENERALE HOME */}
      <section className="py-20 px-6 bg-[var(--color-background-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 tracking-tight">{UI_LABELS.neighborhood_title[lang]}</h2>
            <p className="text-[var(--color-text-secondary)] serif italic">{SITE_CONFIG.locationLabel[lang]}</p>
          </div>
          <div className="w-full max-w-[100vw] overflow-hidden">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-[var(--color-border-light)] aspect-video min-h-[400px]">
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
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg mb-10 font-light">{UI_LABELS.contact_desc[lang]}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <a href={`mailto:${SITE_CONFIG.email}`} className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary-dark)] px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:from-[var(--color-primary-dark)] hover:to-black transition-all flex items-center justify-center text-white">Email {SITE_CONFIG.hostName}</a>
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-[var(--color-accent-emerald)] px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-emerald-500 transition-all flex items-center justify-center">WhatsApp Direct</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
