/**
 * ICAL SERVICE - ULTRA SIMPLE & RELIABLE
 * NO cache, NO complexity. Retry logic only.
 */

export interface BookedRange {
  start: Date;
  end: Date;
}

const extractDate = (line: string): Date | null => {
  try {
    const parts = line.split(':');
    if (parts.length < 2) return null;
    
    let dateStr = parts[parts.length - 1].trim();
    if (dateStr.includes(';')) {
      dateStr = dateStr.split(';').pop() || dateStr;
    }
    
    dateStr = dateStr.trim();

    // YYYYMMDD format
    if (/^\d{8}$/.test(dateStr)) {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      const date = new Date(Date.UTC(year, month, day, 0, 0, 0));
      return isNaN(date.getTime()) ? null : date;
    }
    
    // YYYYMMDDTHHMMSSZ format
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
  } catch {
    return null;
  }
};

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

// Fetch with multiple retries
const fetchWithRetry = async (url: string, retries = 3): Promise<string | null> => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(url, {
        headers: { 'Accept': 'text/calendar' },
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }
  return null;
};

// Proxy fetch with retry
const fetchWithProxyRetry = async (url: string, retries = 3): Promise<string | null> => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl, {
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        if (i < retries - 1) {
          await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
        continue;
      }
      
      const data = await response.json();
      
      if (data?.contents?.startsWith('data:text/calendar;base64,')) {
        const base64Data = data.contents.split(',')[1];
        try {
          return atob(base64Data);
        } catch {
          if (i < retries - 1) {
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
          }
          continue;
        }
      }
      
      if (typeof data?.contents === 'string') {
        return data.contents;
      }
      
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    } catch (error) {
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }
  return null;
};

export const fetchAndParseIcal = async (url: string): Promise<BookedRange[]> => {
  if (!url || url.trim() === '') {
    return [];
  }

  try {
    console.log('📅 Loading calendar...');
    
    // Try direct fetch first (3 retries)
    let icsText = await fetchWithRetry(url, 3);
    
    // If direct failed, try proxy (3 retries)
    if (!icsText) {
      console.log('📡 Trying proxy...');
      icsText = await fetchWithProxyRetry(url, 3);
    }

    if (!icsText || icsText.length < 100) {
      console.warn('No calendar data');
      return [];
    }

    const result = parseIcsString(icsText);
    console.log(`✅ Calendar loaded: ${result.length} bookings`);
    
    return result;
  } catch (error) {
    console.error('Calendar error:', (error as Error).message);
    return [];
  }
};
