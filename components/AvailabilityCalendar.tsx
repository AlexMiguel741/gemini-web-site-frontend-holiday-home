import React, { useState, useEffect } from 'react';
import { Apartment, Language } from '../types';
import { UI_LABELS } from '../constants';
import { fetchAndParseIcal, BookedRange } from '../services/icalService';

interface AvailabilityCalendarProps {
  apartment: Apartment;
  lang: Language;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ apartment, lang }) => {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [realBookings, setRealBookings] = useState<BookedRange[]>([]);

  useEffect(() => {
    const sync = async () => {
      console.log('Calendar: useEffect triggered for apartment:', apartment.id, 'URL:', apartment.icalUrl);
      if (!apartment.icalUrl) {
        console.log('Calendar: No iCal URL for apartment:', apartment.id);
        return;
      }
      console.log('Calendar: Starting sync for apartment:', apartment.id, 'URL:', apartment.icalUrl);
      setIsSyncing(true);
      const bookings = await fetchAndParseIcal(apartment.icalUrl);
      console.log('Calendar: Received bookings:', bookings.length, 'ranges');
      console.log('Calendar: Setting realBookings state:', bookings); // Corrected this line
      setRealBookings(bookings);
      setIsSyncing(false);
      console.log('Calendar: Sync completed, isSyncing set to false');
    };
    sync();
  }, [apartment.id, apartment.icalUrl]);

  // Debug: Log when realBookings changes
  useEffect(() => {
    console.log('Calendar: realBookings state changed:', realBookings);
  }, [realBookings]);

  const monthName = viewDate.toLocaleString(lang, { month: 'long' });
  const year = viewDate.getFullYear();
  const daysInMonth = new Date(year, viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, viewDate.getMonth(), 1).getDay();

  const isDayBooked = (day: number) => {
    console.log(`Calendar: isDayBooked called for day ${day}, realBookings length:`, realBookings.length);
    const checkDate = new Date(year, viewDate.getMonth(), day);
    // Normalize to start of day for comparison
    checkDate.setHours(0, 0, 0, 0);

    const isBooked = realBookings.some(range => {
      // Normalize range dates to start of day
      const startDate = new Date(range.start);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(range.end);
      endDate.setHours(0, 0, 0, 0);

      // Check if checkDate is within the range (inclusive start, exclusive end as per iCal standard)
      return checkDate >= startDate && checkDate < endDate;
    });

    // Debug logging for first few days of any month
    if ([1, 2, 3, 4, 5].includes(day)) {
      console.log(`Calendar: Day ${day} (${checkDate.toDateString()}) booked:`, isBooked);
      if (realBookings.length > 0 && day === 1) {
        console.log('Calendar: Available ranges:', realBookings.map(r => ({
          start: r.start.toDateString(),
          end: r.end.toDateString()
        })));
      }
    }

    return isBooked;
  };

  const isDayInPast = (day: number) => {
    const checkDate = new Date(year, viewDate.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return checkDate < today;
  };

  const isToday = (day: number) => {
    const checkDate = new Date(year, viewDate.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return checkDate.getTime() === today.getTime();
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-xl capitalize">{monthName} {year}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-orange-400 animate-pulse' : 'bg-emerald-500'}`}></div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
              {isSyncing ? UI_LABELS.sync_live[lang] : UI_LABELS.sync_connected[lang]}
            </span>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => setViewDate(new Date(year, viewDate.getMonth() - 1, 1))} className="flex-1 sm:flex-none p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={2}/></svg>
          </button>
          <button onClick={() => setViewDate(new Date(year, viewDate.getMonth() + 1, 1))} className="flex-1 sm:flex-none p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={2}/></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-300 py-1">{d}</div>)}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const booked = isDayBooked(day);
          const inPast = isDayInPast(day);
          const today = isToday(day);

          let className = 'aspect-square flex items-center justify-center rounded-lg text-xs font-medium border transition-all ';

          if (inPast) {
            // Past dates - disabled/unavailable
            className += 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed';
          } else if (booked) {
            // Booked dates
            className += 'bg-slate-50 text-slate-200 border-transparent';
          } else if (today) {
            // Today - highlight it
            className += 'bg-blue-900 text-white border-black shadow-md font-bold';
          } else {
            // Available future dates
            className += 'bg-white text-slate-700 border-slate-50 shadow-sm hover:bg-slate-50';
          }

          return (
            <div key={day} className={className}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
