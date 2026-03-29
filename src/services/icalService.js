// src/services/icalService.js
// iCal fetching and parsing with localStorage caching

const CACHE_PREFIX = 'llh_ical_';
const CACHE_TTL = 7200000; // 2 hours in milliseconds

/**
 * Parse RFC 5545 formatted iCal text into bookings array
 * Handles line folding and multiple DTSTART/DTEND formats from Booking.com
 */
function parseIcal(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return [];
  }

  // Handle RFC 5545 line folding: join lines that start with space or tab
  const unfoldedLines = rawText
    .split('\r\n')
    .reduce((acc, line) => {
      if ((line.startsWith(' ') || line.startsWith('\t')) && acc.length > 0) {
        // This is a folded line, append to the previous line
        acc[acc.length - 1] += line.substring(1);
      } else {
        acc.push(line);
      }
      return acc;
    }, []);

  const bookings = [];
  let inEvent = false;
  let currentEvent = { dtstart: null, dtend: null };

  for (const line of unfoldedLines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      currentEvent = { dtstart: null, dtend: null };
    } else if (line === 'END:VEVENT') {
      inEvent = false;
      if (currentEvent.dtstart && currentEvent.dtend) {
        bookings.push({
          start: currentEvent.dtstart,
          end: currentEvent.dtend
        });
      }
    } else if (inEvent) {
      // Parse DTSTART
      if (line.startsWith('DTSTART')) {
        const date = parseDateValue(line);
        if (date) currentEvent.dtstart = date;
      }
      // Parse DTEND
      else if (line.startsWith('DTEND')) {
        const date = parseDateValue(line);
        if (date) currentEvent.dtend = date;
      }
    }
  }

  return bookings;
}

/**
 * Parse various iCal date formats used by Booking.com
 * Formats:
 *   DTSTART:20240815
 *   DTSTART:20240815T150000Z
 *   DTSTART;VALUE=DATE:20240815
 *   DTSTART;TZID=Europe/Rome:20240815T150000
 *   DTSTART;TZID=Europe/Berlin:20240815T120000
 */
function parseDateValue(dateString) {
  try {
    // Extract the value part after the colon
    const colonIndex = dateString.indexOf(':');
    if (colonIndex === -1) return null;

    const value = dateString.substring(colonIndex + 1).trim();
    if (!value) return null;

    // Extract 8-digit date (YYYYMMDD)
    const dateMatch = value.match(/(\d{8})/);
    if (!dateMatch) return null;

    const dateStr = dateMatch[1];
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // JS months are 0-indexed
    const day = parseInt(dateStr.substring(6, 8), 10);

    // Parse time if present (HHMMSS)
    const timeMatch = value.match(/T(\d{6})/);
    let hours = 0, minutes = 0, seconds = 0;

    if (timeMatch) {
      const timeStr = timeMatch[1];
      hours = parseInt(timeStr.substring(0, 2), 10);
      minutes = parseInt(timeStr.substring(2, 4), 10);
      seconds = parseInt(timeStr.substring(4, 6), 10);
    }

    // Create UTC date to avoid timezone offset bugs
    const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
    return date;
  } catch (error) {
    console.error('Failed to parse date value:', dateString, error);
    return null;
  }
}

/**
 * Generate cache key from iCal URL
 */
function generateCacheKey(icalUrl) {
  try {
    const encoded = btoa(icalUrl).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24);
    return CACHE_PREFIX + encoded;
  } catch (error) {
    console.error('Failed to generate cache key:', error);
    return null;
  }
}

/**
 * Get bookings from cache if still valid
 */
function getCache(icalUrl) {
  try {
    const key = generateCacheKey(icalUrl);
    if (!key) return null;

    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { bookings, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp < CACHE_TTL) {
      return bookings;
    }

    // Cache expired, remove it
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    // Private browsing or quota exceeded
    console.warn('Cache read failed:', error);
    return null;
  }
}

/**
 * Store bookings in cache
 */
function setCache(icalUrl, bookings) {
  try {
    const key = generateCacheKey(icalUrl);
    if (!key) return;

    localStorage.setItem(key, JSON.stringify({
      bookings,
      timestamp: Date.now()
    }));
  } catch (error) {
    // Private browsing or quota exceeded
    console.warn('Cache write failed:', error);
  }
}

/**
 * Remove entry from cache
 */
function clearCacheEntry(icalUrl) {
  try {
    const key = generateCacheKey(icalUrl);
    if (key) {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn('Cache clear failed:', error);
  }
}

/**
 * Fetch bookings from Vercel proxy endpoint
 */
export async function fetchBookings(icalUrl, signal) {
  if (!icalUrl) {
    throw new Error('iCal URL is required');
  }

  try {
    const proxyUrl = `/api/ical-proxy?url=${encodeURIComponent(icalUrl)}`;
    const response = await fetch(proxyUrl, { signal });

    if (!response.ok) {
      throw new Error(`Proxy returned ${response.status}`);
    }

    const icalText = await response.text();
    const bookings = parseIcal(icalText);

    // Cache the bookings
    setCache(icalUrl, bookings);

    return bookings;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    throw error;
  }
}

/**
 * Get cached bookings without fetching
 */
export function getCachedBookings(icalUrl) {
  return getCache(icalUrl);
}

/**
 * Clear cache for specific iCal URL
 */
export function clearCache(icalUrl) {
  clearCacheEntry(icalUrl);
}
