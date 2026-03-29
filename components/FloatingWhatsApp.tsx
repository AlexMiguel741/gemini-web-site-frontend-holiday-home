import React, { useState, useRef, useEffect } from 'react';
import { Language, Apartment } from '../types';
import { FLOATING_WHATSAPP, APARTMENTS } from '../constants';

interface FloatingWhatsAppProps {
  phone: string;
  hostName: string;
  apartmentName?: string;
  lang: Language;
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phone,
  hostName,
  apartmentName = '',
  lang
}) => {
  // Find the apartment by name and get its ID for pre-selection
  const getInitialApartmentId = () => {
    if (apartmentName && typeof apartmentName === 'string') {
      // Search for apartment by name in current language
      const found = APARTMENTS.find(apt => apt.name[lang] === apartmentName);
      return found ? found.id : '';
    }
    return '';
  };

  const [isOpen, setIsOpen] = useState(false);
  const [apartmentId, setApartmentId] = useState(getInitialApartmentId());
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Get apartment object from ID
  const getApartmentName = (): string => {
    if (!apartmentId) return '';
    const apt = APARTMENTS.find(a => a.id === apartmentId);
    return apt ? apt.name[lang] : '';
  };

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update apartment selection when apartmentName prop changes
  useEffect(() => {
    if (apartmentName && typeof apartmentName === 'string') {
      const found = APARTMENTS.find(apt => apt.name[lang] === apartmentName);
      if (found) {
        setApartmentId(found.id);
      }
    } else {
      setApartmentId('');
    }
  }, [apartmentName, lang]);

  // Handle click outside popup to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      setIsOpen(false);
    }
  };

  // Generate WhatsApp message
  const generateMessage = (): string => {
    const apartmentText = getApartmentName();
    const checkInText = checkIn ? checkIn.replace(/-/g, '/') : '';
    const checkOutText = checkOut ? checkOut.replace(/-/g, '/') : '';

    if (apartmentText && checkInText && checkOutText) {
      return `Ciao ${hostName}, vorrei prenotare ${apartmentText} dal ${checkInText} al ${checkOutText}. Siete disponibili?`;
    } else if (apartmentText) {
      return `Ciao ${hostName}, vorrei prenotare ${apartmentText}. Siete disponibili?`;
    } else {
      return `Ciao ${hostName}, vorrei ricevere informazioni su una prenotazione. Siete disponibili?`;
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    const message = generateMessage();
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Open WhatsApp link in new tab
    window.open(waLink, '_blank');
    
    // Close popup after sending
    setIsOpen(false);
  };

  // Handle close popup
  const handleClose = () => {
    setIsOpen(false);
  };

  // Inline WhatsApp SVG Icon (white)
  const WhatsAppIcon = () => (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.562 0-3.051.611-4.164 1.718-.065.065-.127.133-.188.2-1.078 1.115-1.752 2.646-1.752 4.332 0 3.362 2.736 6.098 6.098 6.098 1.687 0 3.217-.674 4.332-1.752.067-.061.134-.123.199-.188 1.107-1.113 1.718-2.602 1.718-4.164 0-3.362-2.736-6.098-6.098-6.098zm0-2.082c2.108 0 4.083.822 5.573 2.312 1.49 1.49 2.312 3.465 2.312 5.573 0 2.108-.822 4.083-2.312 5.573-1.49 1.49-3.465 2.312-5.573 2.312-2.108 0-4.083-.822-5.573-2.312C3.822 17.165 3 15.19 3 13.082c0-2.108.822-4.083 2.312-5.573C6.802 5.996 8.777 5.174 10.885 5.174h.166z" />
    </svg>
  );

  // Desktop Card Popup
  const DesktopPopup = () => (
    <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">
          {FLOATING_WHATSAPP.title[lang]}
        </h3>
        <button
          onClick={handleClose}
          className="inline-flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
          aria-label={FLOATING_WHATSAPP.close_button[lang]}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Form content */}
      <div className="p-4 space-y-4">
        {/* Apartment dropdown */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {FLOATING_WHATSAPP.apartment_label[lang]}
          </label>
          <select
            value={apartmentId}
            onChange={(e) => setApartmentId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 bg-white"
          >
            <option value="">
              {FLOATING_WHATSAPP.apartment_placeholder[lang]}
            </option>
            {APARTMENTS.map((apt) => (
              <option key={apt.id} value={apt.id}>
                {apt.name[lang]}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {FLOATING_WHATSAPP.check_in_label[lang]}
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900"
          />
        </div>

        {/* Check-out date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {FLOATING_WHATSAPP.check_out_label[lang]}
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900"
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSendMessage}
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-medium rounded-lg transition-all duration-150 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.562 0-3.051.611-4.164 1.718-.065.065-.127.133-.188.2-1.078 1.115-1.752 2.646-1.752 4.332 0 3.362 2.736 6.098 6.098 6.098 1.687 0 3.217-.674 4.332-1.752.067-.061.134-.123.199-.188 1.107-1.113 1.718-2.602 1.718-4.164 0-3.362-2.736-6.098-6.098-6.098zm0-2.082c2.108 0 4.083.822 5.573 2.312 1.49 1.49 2.312 3.465 2.312 5.573 0 2.108-.822 4.083-2.312 5.573-1.49 1.49-3.465 2.312-5.573 2.312-2.108 0-4.083-.822-5.573-2.312C3.822 17.165 3 15.19 3 13.082c0-2.108.822-4.083 2.312-5.573C6.802 5.996 8.777 5.174 10.885 5.174h.166z" />
          </svg>
          {FLOATING_WHATSAPP.send_button[lang]}
        </button>
      </div>
    </div>
  );

  // Mobile Fullscreen Popup
  const MobilePopup = () => (
    <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden animate-in fade-in duration-300">
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl animate-in slide-in-from-bottom duration-300 pt-6 px-6 pb-6 max-h-96">
        {/* Handle bar */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 bg-slate-300 rounded-full"></div>
        </div>

        {/* Header with close button */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            {FLOATING_WHATSAPP.title[lang]}
          </h3>
          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center w-8 h-8 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            aria-label={FLOATING_WHATSAPP.close_button[lang]}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form content - scrollable on mobile */}
        <div className="space-y-4 overflow-y-auto max-h-64 pr-2">
          {/* Apartment dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {FLOATING_WHATSAPP.apartment_label[lang]}
            </label>
            <select
              value={apartmentId}
              onChange={(e) => setApartmentId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 text-base bg-white"
            >
              <option value="">
                {FLOATING_WHATSAPP.apartment_placeholder[lang]}
              </option>
              {APARTMENTS.map((apt) => (
                <option key={apt.id} value={apt.id}>
                  {apt.name[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {FLOATING_WHATSAPP.check_in_label[lang]}
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 text-base"
            />
          </div>

          {/* Check-out date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {FLOATING_WHATSAPP.check_out_label[lang]}
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900 text-base"
            />
          </div>
        </div>

        {/* Send button - sticky at bottom */}
        <button
          onClick={handleSendMessage}
          className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-2 mt-6"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.562 0-3.051.611-4.164 1.718-.065.065-.127.133-.188.2-1.078 1.115-1.752 2.646-1.752 4.332 0 3.362 2.736 6.098 6.098 6.098 1.687 0 3.217-.674 4.332-1.752.067-.061.134-.123.199-.188 1.107-1.113 1.718-2.602 1.718-4.164 0-3.362-2.736-6.098-6.098-6.098zm0-2.082c2.108 0 4.083.822 5.573 2.312 1.49 1.49 2.312 3.465 2.312 5.573 0 2.108-.822 4.083-2.312 5.573-1.49 1.49-3.465 2.312-5.573 2.312-2.108 0-4.083-.822-5.573-2.312C3.822 17.165 3 15.19 3 13.082c0-2.108.822-4.083 2.312-5.573C6.802 5.996 8.777 5.174 10.885 5.174h.166z" />
          </svg>
          {FLOATING_WHATSAPP.send_button[lang]}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse background ring */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-75" style={{ 
          inset: '-12px' 
        }}></div>

        {/* Main button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg active:scale-95 transition-all duration-150 flex items-center justify-center hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </button>

        {/* Popup - only show when open */}
        {isOpen && (
          <>
            {isMobile ? <MobilePopup /> : <DesktopPopup />}
          </>
        )}
      </div>

      {/* Backdrop overlay for desktop (to close popup when clicking outside) */}
      {isOpen && !isMobile && (
        <div
          ref={overlayRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-30"
        />
      )}

      {/* Mobile backdrop is handled inside MobilePopup */}
    </>
  );
};

export default FloatingWhatsApp;
