/**
 * ICAL SERVICE - PRODUCTION STABLE VERSION
 * Semplice, affidabile, NO CACHE
 */

export interface BookedRange {
  start: Date;
  end: Date;
}

// Fetch con timeout
const fetchWithTimeout = (url: string, timeout = 15000): Promise<Response> => {
  return Promise.race([
    fetch(url, { 
      headers: { 'Accept': 'text/calendar' },
      mode: 'cors'
    }),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
};

// Simple proxy fallback
const fetchWithProxy = async (url: string): Promise<string | null> => {
  try {
    console.log('📡 Trying CORS proxy...');
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetchWithTimeout(proxyUrl, 15000);
    
    if (!response.ok) {
      console.warn(`Proxy returned ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // allorigins returns base64 encoded in data URI
    if (data?.contents?.startsWith('data:text/calendar;base64,')) {
      const base64Data = data.contents.split(',')[1];
      try {
        return atob(base64Data);
      } catch (e) {
        console.warn('Failed to decode base64');
        return null;
      }
    }
    
    // Or raw content
    if (data?.contents && typeof data.contents === 'string') {
      return data.contents;
    }
    
    return null;
  } catch (error) {
    console.warn('Proxy failed:', (error as Error).message);
    return null;
  }
};

// Extract date from iCal line
const extractDate = (line: string): Date | null => {
  try {
    const parts = line.split(':');
    if (parts.length < 2) return null;
    
    let dateStr = parts[parts.length - 1].trim();
    
    // Remove any parameters
    if (dateStr.includes(';')) {
      dateStr = dateStr.split(';').pop() || dateStr;
    }
    
    dateStr = dateStr.trim();

    // YYYYMMDD format (all-day events)
    if (/^\d{8}$/.test(dateStr)) {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      const date = new Date(Date.UTC(year, month, day, 0, 0, 0));
      return isNaN(date.getTime()) ? null : date;
    }
    
    // ISO format with time (YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS)
    if (/^\d{8}T\d{6}Z?$/.test(dateStr)) {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      const hour = parseInt(dateStr.substring(9, 11));
      const minute = parseInt(dateStr.substring(11, 13));
      const second = parseInt(dateStr.substring(13, 15));
      
      const date = new Date(Date.UTC(year, month, day, hour, minute, second));
      return isNaN(date.getTime()) ? null : date;
    }

    return null;
  } catch (error) {
    return null;
  }
};

// Parse iCal string
const parseIcsString = (icsText: string): BookedRange[] => {
  const ranges: BookedRange[] = [];
  const lines = icsText.split(/\r?\n/);

  let currentStart: Date | null = null;
  let currentEnd: Date | null = null;

  for (const line of lines) {
    const cleanLine = line.trim();
    
    if (cleanLine.startsWith('BEGIN:VEVENT')) {
      currentStart = null;
      currentEnd = null;
    } else if (cleanLine.startsWith('DTSTART')) {
      currentStart = extractDate(cleanLine);
    } else if (cleanLine.startsWith('DTEND')) {
      currentEnd = extractDate(cleanLine);
    } else if (cleanLine.startsWith('END:VEVENT')) {
      if (currentStart && currentEnd) {
        ranges.push({ start: currentStart, end: currentEnd });
      }
      currentStart = null;
      currentEnd = null;
    }
  }

  return ranges;
};

// Main fetch and parse function
export const fetchAndParseIcal = async (url: string): Promise<BookedRange[]> => {
  if (!url || url.trim() === '') {
    return [];
  }

  try {
    console.log('🔄 Fetching from:', url.substring(0, 60) + '...');
    
    let icsText: string | null = null;
    
    // Try direct fetch first
    try {
      const response = await fetchWithTimeout(url, 15000);
      
      if (response.ok) {
        icsText = await response.text();
        console.log('✅ Direct fetch OK, ' + icsText.length + ' bytes');
      } else {
        console.log(`Direct fetch: ${response.status}`);
      }
    } catch (error) {
      console.log('Direct fetch failed:', (error as Error).message);
    }
    
    // Fallback to proxy if direct failed
    if (!icsText) {
      icsText = await fetchWithProxy(url);
      if (icsText) {
        console.log('✅ Proxy OK, ' + icsText.length + ' bytes');
      }
    }

    if (!icsText || icsText.length < 100) {
      console.error('No valid response');
      return [];
    }

    const result = parseIcsString(icsText);
    console.log(`✅ Parsed ${result.length} bookings`);
    
    return result;
  } catch (error) {
    console.error('Error:', (error as Error).message);
    return [];
  }
};
