import React, { useState } from 'react';

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
  priority?: boolean;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className, onClick, width, height, priority = false }) => {
  const fallback = 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200';
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`overflow-hidden bg-slate-100 ${className || ''}`}>
      <img
        src={hasError || !src ? fallback : src}
        alt={alt}
        className={`w-full h-full object-cover ${onClick ? 'cursor-pointer hover:scale-105 transition-transform duration-700' : ''}`}
        onError={() => setHasError(true)}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        width={width}
        height={height}
        onClick={onClick}
      />
    </div>
  );
};

export default SmartImage;
