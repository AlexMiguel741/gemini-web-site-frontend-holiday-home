
import React from 'react';
import { Apartment, Language } from '../types';
import { UI_LABELS } from '../constants';

interface ApartmentCardProps {
  apartment: Apartment;
  lang: Language;
  onSelect: (apt: Apartment) => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, lang, onSelect }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800';
  };

  // Funzione per formattare il prezzo numerico in Euro localizzati
  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat(lang === 'it' ? 'it-IT' : lang === 'de' ? 'de-DE' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    });
    return `${UI_LABELS.price_from[lang]} ${formatter.format(price)} ${UI_LABELS.price_night[lang]}`;
  };

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl border border-slate-50 flex flex-col active:scale-[0.98] md:active:scale-100"
      onClick={() => onSelect(apartment)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={apartment.images[0]} 
          alt={apartment.name[lang]}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-900 shadow-xl border border-slate-100">
          {formatPrice(apartment.price)}
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex-1 mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3 transition-colors group-hover:text-blue-600">
            {apartment.name[lang]}
          </h3>
          <p className="text-slate-500 text-base sm:text-lg serif italic leading-relaxed">
            {apartment.tagline[lang]}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] border-t border-slate-50 pt-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span>{apartment.bedrooms} {UI_LABELS.bedrooms[lang]}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{apartment.bathrooms} {UI_LABELS.bathrooms[lang]}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            <span>{apartment.sqft} m²</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
            <span>{apartment.maxGuests} {UI_LABELS.max_guests[lang]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
