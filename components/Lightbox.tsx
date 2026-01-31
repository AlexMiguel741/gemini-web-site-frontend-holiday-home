import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { UI_LABELS } from '../constants';

const SWIPE_THRESHOLD = 50;

interface LightboxProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
  lang: Language;
}

const Lightbox: React.FC<LightboxProps> = ({ images, isOpen, onClose, startIndex = 0, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setCurrentIndex(startIndex);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen, startIndex]);

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

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
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

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-white animate-in fade-in duration-300 flex flex-col">
      <div className="h-16 sm:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <button onClick={onClose} className="flex items-center gap-2 text-slate-900 font-bold uppercase text-[10px] tracking-widest hover:text-blue-900 transition-colors">
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

      <div
        className="flex-1 relative flex items-center justify-center bg-slate-50 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ userSelect: 'none', touchAction: 'none' }}
      >
        <button
          onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
          className="absolute left-2 sm:left-4 z-10 p-3 sm:p-4 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
          style={{ pointerEvents: 'auto' }}
        >
          <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2.5}/></svg>
        </button>

        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={images[currentIndex]}
            className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl shadow-2xl"
            alt={`Foto ${currentIndex + 1}`}
          />
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
          className="absolute right-2 sm:right-4 z-10 p-3 sm:p-4 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all active:scale-90"
          style={{ pointerEvents: 'auto' }}
        >
          <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2.5}/></svg>
        </button>
      </div>

      <div className="h-24 bg-white border-t border-slate-100 flex items-center justify-start sm:justify-center px-4 gap-3 overflow-x-auto no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${currentIndex === idx ? 'border-blue-900 scale-105 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'}`}
          >
            <img src={img} className="w-full h-full object-cover" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
