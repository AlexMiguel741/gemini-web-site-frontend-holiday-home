import React, { useState, useEffect } from 'react';

interface WishlistButtonProps {
  apartmentId: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ apartmentId }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.includes(apartmentId));
  }, [apartmentId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    if (isInWishlist) {
      newWishlist = wishlist.filter((id: string) => id !== apartmentId);
    } else {
      newWishlist = [...wishlist, apartmentId];
    }
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsInWishlist(!isInWishlist);
  };

  return (
    <button
      onClick={toggleWishlist}
      className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg className={`w-6 h-6 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`} viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
  );
};

export default WishlistButton;