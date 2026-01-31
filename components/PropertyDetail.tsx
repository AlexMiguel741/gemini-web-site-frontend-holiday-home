import React, { useState } from 'react';
import { APARTMENTS, SITE_CONFIG, UI_LABELS } from '../constants';
import { Language } from '../types';
import { useParams, Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import Lightbox from './Lightbox';
import AvailabilityCalendar from './AvailabilityCalendar';
import ReviewsRatings from './ReviewsRatings';
import WishlistButton from './WishlistButton';

interface PropertyDetailProps {
  lang: Language;
  formatPriceFull: (price: number) => string;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ lang, formatPriceFull }) => {
  const { id } = useParams<{ id: string }>();
  const selectedApartment = APARTMENTS.find(a => a.id === id);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const onCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => e.preventDefault();

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const distance = touchStart - e.changedTouches[0].clientX;
    const isLeftSwipe = distance > SWIPE_THRESHOLD;
    const isRightSwipe = distance < -SWIPE_THRESHOLD;

    if (isLeftSwipe && mobileGalleryIndex < selectedApartment.images.length - 1) {
      setMobileGalleryIndex((prev) => prev + 1);
    } else if (isRightSwipe && mobileGalleryIndex > 0) {
      setMobileGalleryIndex((prev) => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !touchStart) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - e.clientX;
    const isLeftSwipe = distance > SWIPE_THRESHOLD;
    const isRightSwipe = distance < -SWIPE_THRESHOLD;

    if (isLeftSwipe && mobileGalleryIndex < selectedApartment.images.length - 1) {
      setMobileGalleryIndex((prev) => prev + 1);
    } else if (isRightSwipe && mobileGalleryIndex > 0) {
      setMobileGalleryIndex((prev) => prev - 1);
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!selectedApartment) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-[var(--color-text-main)]">Appartamento non trovato</h1>
        <p className="text-[var(--color-text-secondary)] mt-4">Torna alla <Link to="/" className="text-[var(--color-primary-dark)] hover:underline">homepage</Link>.</p>
      </div>
    );
  }

  // Add structured data for Accommodation
  React.useEffect(() => {
    const accommodationSchema = {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      "name": selectedApartment.name[lang],
      "description": selectedApartment.description[lang],
      "image": selectedApartment.images.map(img => `https://www.lavenolakehouse.com${img}`),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Labiena",
        "addressLocality": "Laveno-Mombello",
        "addressRegion": "VA",
        "postalCode": "21014",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.9088365,
        "longitude": 8.6184518
      },
      "numberOfRooms": selectedApartment.bedrooms,
      "occupancy": {
        "@type": "QuantitativeValue",
        "value": selectedApartment.maxGuests
      },
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": selectedApartment.sqft,
        "unitCode": "MTK"
      },
      "amenityFeature": selectedApartment.amenities[lang].map(a => ({
        "@type": "LocationFeatureSpecification",
        "name": a
      })),
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": selectedApartment.price,
          "priceCurrency": "EUR",
          "unitText": "DAY"
        }
      },
      "provider": {
        "@type": "LocalBusiness",
        "name": SITE_CONFIG.name,
        "telephone": "+393480325148",
        "email": SITE_CONFIG.email
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(accommodationSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [selectedApartment, lang]);

  return (
    <div className="animate-in fade-in duration-500 bg-white pb-20 w-full overflow-hidden">
      <section className="bg-[var(--color-background-light)] border-b border-[var(--color-border-light)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-bold uppercase text-[10px] tracking-widest mb-8">
            <Link to="/" className="hover:text-[var(--color-primary-dark)] transition-colors">Home</Link>
            <span className="text-[var(--color-border-light)]">/</span>
            <Link to="/#stays" className="hover:text-[var(--color-primary-dark)] transition-colors">{UI_LABELS.nav_residences[lang]}</Link>
            <span className="text-[var(--color-border-light)]">/</span>
            <span className="text-[var(--color-text-main)]">{selectedApartment.name[lang]}</span>
          </div>

          {/* GALLERIA DINAMICA STABILIZZATA */}
          <div className="relative group min-h-[300px] sm:min-h-0">
            {/* Vista Mobile: Slider */}
            <div className="md:hidden relative overflow-hidden -mx-4 px-4 h-[350px]">
              <div
                className="flex gap-4 h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${mobileGalleryIndex * (85 + 16)}vw)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {selectedApartment.images.map((img, idx) => (
                  <div key={idx} className="shrink-0 w-[85vw] h-full" style={{ userSelect: 'none' }}>
                    <SmartImage
                      src={img}
                      alt={`${selectedApartment.name[lang]} - ${lang === 'it' ? 'Immagine' : lang === 'en' ? 'Image' : 'Bild'} ${idx + 1}`}
                      className="w-full h-full rounded-2xl shadow-lg border border-[var(--color-border-light)] cursor-pointer"
                      onClick={() => openLightbox(idx)}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {selectedApartment.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileGalleryIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === mobileGalleryIndex ? 'bg-white shadow-lg' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Vista Desktop: Mosaico con aspect-ratio bloccato */}
            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 rounded-[2.5rem] overflow-hidden shadow-2xl bg-[var(--color-border-light)] aspect-[21/9] w-full">
              <div className="col-span-2 row-span-2 h-full relative">
                <SmartImage
                  src={selectedApartment.images[0]}
                  alt={`${selectedApartment.name[lang]} - ${lang === 'it' ? 'Immagine principale' : lang === 'en' ? 'Main image' : 'Hauptbild'}`}
                  className="h-full w-full"
                  onClick={() => openLightbox(0)}
                />
                <div className="absolute top-6 right-6">
                  <WishlistButton apartmentId={selectedApartment.id} />
                </div>
              </div>
              {selectedApartment.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="h-full">
                  <SmartImage
                    src={img}
                    alt={`${selectedApartment.name[lang]} - ${lang === 'it' ? 'Immagine' : lang === 'en' ? 'Image' : 'Bild'} ${idx + 2}`}
                    className="h-full w-full"
                    onClick={() => openLightbox(idx + 1)}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => openLightbox(0)}
              className="absolute bottom-6 right-6 bg-white/95 backdrop-blur px-6 py-3 rounded-2xl shadow-xl border border-[var(--color-border-light)] flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--color-text-main)] hover:bg-white transition-all z-10"
            >
              <svg className="w-5 h-5 text-[var(--color-primary-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7" strokeWidth={2}/></svg>
              {lang === "it" ? "Esplora Galleria" : lang === "de" ? "Galerie ansehen" : "Explore Gallery"}
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-2 space-y-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-[var(--color-text-main)] leading-tight">{selectedApartment.name[lang]}</h1>
            <p className="text-xl sm:text-2xl serif italic text-[var(--color-text-secondary)]">{selectedApartment.tagline[lang]}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-[var(--color-border-light)]">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[var(--color-text-main)]">{selectedApartment.bedrooms}</span>
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-secondary)] tracking-wider">{UI_LABELS.bedrooms[lang]}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[var(--color-text-main)]">{selectedApartment.bathrooms}</span>
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-secondary)] tracking-wider">{UI_LABELS.bathrooms[lang]}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[var(--color-text-main)]">{selectedApartment.sqft}</span>
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-secondary)] tracking-wider">{UI_LABELS.living_space[lang]}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[var(--color-text-main)]">{selectedApartment.maxGuests}</span>
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-secondary)] tracking-wider">{UI_LABELS.max_guests[lang]}</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[var(--color-text-main)] font-bold text-2xl tracking-tight">{UI_LABELS.experience_title[lang]}</h3>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line font-light">{selectedApartment.description[lang]}</p>
          </div>

          <div className="space-y-8">
            <h3 className="text-[var(--color-text-main)] font-bold text-2xl tracking-tight">{UI_LABELS.amenities_title[lang]}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedApartment.amenities[lang].map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-[var(--color-background-light)] rounded-2xl border border-[var(--color-border-light)] shadow-sm hover:border-[var(--color-secondary-light)] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-secondary-light)] shadow-[0_0_8px_rgba(99,179,237,0.5)]"></div>
                  <span className="text-sm font-semibold text-[var(--color-text-main)]">{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[var(--color-text-main)] font-bold text-2xl tracking-tight">{UI_LABELS.availability_title[lang]}</h3>
            <div className="w-full">
              {selectedApartment && <AvailabilityCalendar apartment={selectedApartment} lang={lang} />}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[var(--color-text-main)] font-bold text-2xl tracking-tight">{UI_LABELS.neighborhood_title[lang]}</h3>
            <div className="w-full max-w-[100vw] overflow-hidden">
              <div className="rounded-[2.5rem] overflow-hidden border border-[var(--color-border-light)] shadow-xl w-full aspect-video min-h-[400px]">
                {selectedApartment.googleMapsEmbedUrl ? (
                  <iframe
                    title={`Location of ${selectedApartment.name[lang]}`}
                    src={selectedApartment.googleMapsEmbedUrl}
                    className="w-full h-full border-0 grayscale-[0.2]"
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-10 bg-[var(--color-background-light)] text-[var(--color-text-secondary)] font-bold uppercase text-[10px] tracking-widest">
                    Map not configured
                  </div>
                )}
              </div>
            </div>
          </div>

          <ReviewsRatings apartmentId={selectedApartment.id} />
        </div>

        <div className="lg:col-span-1 relative">
          <div className="lg:sticky lg:top-36 p-8 bg-[var(--color-primary-dark)] text-white rounded-[2.5rem] shadow-2xl space-y-10">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-[var(--color-secondary-light)] tracking-widest">{UI_LABELS.direct_only[lang]}</span>
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
              className="block w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary-dark)] py-6 rounded-2xl text-center font-bold uppercase tracking-widest text-xs hover:from-[var(--color-primary-dark)] hover:to-black shadow-xl shadow-[var(--color-primary-dark)]/20 active:scale-[0.98]"
            >
              {UI_LABELS.cta_btn[lang]}
            </a>

            {/* Nuova Sezione Link Booking Esterni */}
            {selectedApartment.bookingLinks && selectedApartment.bookingLinks.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <span className="text-[10px] uppercase font-bold text-[var(--color-secondary-light)] tracking-widest">
                  {lang === 'it' ? 'Prenota anche su:' : lang === 'en' ? 'Also book on:' : 'Auch buchen auf:'}
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {selectedApartment.bookingLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-lg bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

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

      <Lightbox
        images={selectedApartment.images}
        isOpen={isLightboxOpen}
        onClose={onCloseLightbox}
        startIndex={lightboxIndex}
        lang={lang}
      />
    </div>
  );
};

export default PropertyDetail;
