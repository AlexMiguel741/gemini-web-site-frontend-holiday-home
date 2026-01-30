import React, { useState, useEffect } from 'react';
import { APARTMENTS, UI_LABELS } from '../constants';
import { Language } from '../types';
import ApartmentCard from './ApartmentCard';
import { Link } from 'react-router-dom';

interface WishlistPageProps {
  lang: Language;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ lang }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const wishlistApartments = APARTMENTS.filter(apt => wishlist.includes(apt.id));

  return (
    <div className="animate-in fade-in duration-700 py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-bold uppercase text-[10px] tracking-widest mb-8">
        <Link to="/" className="hover:text-[var(--color-primary-dark)] transition-colors">Home</Link>
        <span className="text-[var(--color-border-light)]">/</span>
        <span className="text-[var(--color-text-main)]">Wishlist</span>
      </div>

      <h1 className="text-4xl font-bold mb-4">{lang === 'it' ? 'La Mia Lista dei Desideri' : lang === 'en' ? 'My Wishlist' : 'Meine Wunschliste'}</h1>
      <p className="text-[var(--color-text-secondary)] serif italic text-lg mb-12">
        {lang === 'it' ? 'I tuoi appartamenti preferiti salvati per dopo.' : lang === 'en' ? 'Your saved favorite apartments for later.' : 'Ihre gespeicherten Lieblingsapartments für später.'}
      </p>

      {wishlistApartments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {wishlistApartments.map(apt => <ApartmentCard key={apt.id} apartment={apt} lang={lang} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-[var(--color-text-secondary)] mb-4">
            {lang === 'it' ? 'Nessun appartamento nella tua lista dei desideri.' : lang === 'en' ? 'No apartments in your wishlist.' : 'Keine Apartments in Ihrer Wunschliste.'}
          </p>
          <Link to="/" className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary-dark)] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:from-[var(--color-primary-dark)] hover:to-black transition-all">
            {lang === 'it' ? 'Esplora Appartamenti' : lang === 'en' ? 'Explore Apartments' : 'Apartments erkunden'}
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;