/**
 * ICAL SERVICE
 * Gestisce il fetch e il parsing dei file .ics da piattaforme esterne.
 * Ottimizzato con caching, timeout e fallback parallelo.
 */

export interface BookedRange {
  start: Date;
  end: Date;
}

// Cache in-memory per evitare richieste duplicate
const calendarCache = new Map<string, { data: BookedRange[]; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minuti

// Normalizza URL per evitare duplicati
const normalizeUrl = (url: string): string => {
  try {
    const u = new URL(url);
    return u.toString();
  } catch {
    return url;
  }
};

// Fetch con timeout
const fetchWithTimeout = (url: string, timeout = 10000): Promise<Response> => {
  return Promise.race([
    fetch(url, { headers: { 'Accept': 'text/calendar, application/json' } }),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Fetch timeout')), timeout)
    )
  ]);
};

// Prova proxy in parallelo (non sequenziale)
const tryProxiesParallel = async (url: string): Promise<{ contents: string } | null> => {
  const proxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
  ];

  const results = await Promise.allSettled(
    proxies.map(proxyUrl =>
      fetchWithTimeout(proxyUrl, 3000)
        .then(r => r.ok ? r.json() : null)
        .then(data => (data?.contents ? data : null))
    )
  );

  // Ritorna il primo risultato riuscito
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value?.contents) {
      return result.value;
    }
  }
  return null;
};

const extractDate = (line: string, debug = false): Date | null => {
  try {
    const parts = line.split(':');
    let dateStr = parts[parts.length - 1];
    if (!dateStr) return null;

    dateStr = dateStr.trim().split(';').pop() || dateStr.trim();

    // YYYYMMDD format (all-day events)
    if (/^\d{8}$/.test(dateStr)) {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1;
      const day = parseInt(dateStr.substring(6, 8));
      const date = new Date(Date.UTC(year, month, day, 0, 0, 0));
      return isNaN(date.getTime()) ? null : date;
    }
    
    // ISO format like 20231201T000000Z or 20231201T000000 (timed events)
    if (/^\d{8}T\d{6}Z?$/.test(dateStr)) {
      try {
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1;
        const day = parseInt(dateStr.substring(6, 8));
        const hour = parseInt(dateStr.substring(9, 11));
        const minute = parseInt(dateStr.substring(11, 13));
        const second = parseInt(dateStr.substring(13, 15));
        
        // Use UTC to avoid timezone issues
        const date = new Date(Date.UTC(year, month, day, hour, minute, second));
        return isNaN(date.getTime()) ? null : date;
      } catch {
        return null;
      }
    }

    // Fallback: try standard date parsing
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    if (debug) console.warn('Failed to extract date from:', line);
    return null;
  }
};

const parseIcsString = (icsText: string, debug = false): BookedRange[] => {
  const ranges: BookedRange[] = [];
  const lines = icsText.split(/\r?\n/);

  let currentStart: Date | null = null;
  let currentEnd: Date | null = null;
  let eventCount = 0;
  let validEvents = 0;

  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine.startsWith('BEGIN:VEVENT')) {
      currentStart = null;
      currentEnd = null;
      eventCount++;
    } else if (cleanLine.startsWith('DTSTART')) {
      currentStart = extractDate(cleanLine, debug);
    } else if (cleanLine.startsWith('DTEND')) {
      currentEnd = extractDate(cleanLine, debug);
    } else if (cleanLine.startsWith('END:VEVENT')) {
      if (currentStart && currentEnd) {
        ranges.push({ start: currentStart, end: currentEnd });
        validEvents++;
        if (debug) {
          console.log(`  Event ${validEvents}: ${currentStart.toISOString().split('T')[0]} → ${currentEnd.toISOString().split('T')[0]}`);
        }
      }
    }
  }

  if (debug) {
    console.log(`📊 Event parsing: ${validEvents}/${eventCount} events valid`);
  }

  return ranges;
};

export const fetchAndParseIcal = async (url: string): Promise<BookedRange[]> => {
  if (!url || url.trim() === '' || url.includes('example.ics')) {
    return [];
  }

  // Normalize URL for consistent caching
  const normalizedUrl = normalizeUrl(url);
  
  // Check in DEV mode if in dev environment
  const isDev = typeof window !== 'undefined' && (window as any).import?.meta?.env?.DEV;

  // Verifica cache solo se ha dati (non cachare errori)
  const cached = calendarCache.get(normalizedUrl);
  if (cached && cached.data.length > 0 && Date.now() - cached.timestamp < CACHE_DURATION) {
    if (isDev) console.log('📦 Using cached bookings:', cached.data.length, 'events from', normalizedUrl.substring(0, 60) + '...');
    return cached.data;
  }

  try {
    if (isDev) console.log('🔄 Fetching calendar from:', normalizedUrl.substring(0, 70) + '...');
    
    // Prova direct fetch PRIMA dei proxy (più veloce e affidabile)
    let data: { contents: string } | null = null;
    
    try {
      const response = await fetchWithTimeout(normalizedUrl, 10000);
      if (response.ok) {
        data = { contents: await response.text() };
        if (isDev) console.log('✅ Direct fetch succeeded');
      }
    } catch (fetchError) {
      if (isDev) console.warn('⚠️ Direct fetch failed, trying proxy:', (fetchError as Error).message);
      
      // Fallback: prova proxy in parallelo
      data = await tryProxiesParallel(url);
      if (data?.contents && isDev) {
        console.log('✅ Proxy fetch succeeded');
      }
    }

    if (!data?.contents) {
      if (isDev) console.warn('❌ No data retrieved from any source for:', url.substring(0, 60) + '...');
      return [];
    }

    let icsText = data.contents;

    // Handle base64 encoded data
    if (icsText.startsWith('data:text/calendar;base64,')) {
      const base64Data = icsText.split(',')[1];
      icsText = atob(base64Data);
    }

    if (!icsText || icsText.length < 50) {
      if (isDev) console.warn('⚠️ ICS response too small:', icsText?.length || 0, 'bytes');
      return [];
    }

    const result = parseIcsString(icsText, isDev);
    
    if (isDev) console.log(`✅ Parsed ${result.length} bookings from iCal`);
    
    // Salva in cache usando URL normalizzata
    calendarCache.set(normalizedUrl, { data: result, timestamp: Date.now() });
    
    return result;
  } catch (error) {
    if (isDev) console.error('❌ Fatal error in fetchAndParseIcal:', (error as Error).message);
    return [];
  }
};
