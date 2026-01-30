import React, { useState } from 'react';

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className, onClick }) => {
  const fallback = 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200';
  const [hasError, setHasError] = useState(false);

  const webpSrc = src ? src.replace(/\.(png|jpg|jpeg)$/i, '.webp') : null;
  const avifSrc = src ? src.replace(/\.(png|jpg|jpeg)$/i, '.avif') : null;

  return (
    <div className={`overflow-hidden bg-slate-100 ${className}`}>
      <picture>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={hasError || !src ? fallback : src}
          alt={alt}
          className={`w-full h-full object-cover ${onClick ? 'cursor-pointer hover:scale-105 transition-transform duration-700' : ''}`}
          onError={() => setHasError(true)}
          loading="lazy"
          onClick={onClick}
        />
      </picture>
    </div>
  );
};

export default SmartImage;
