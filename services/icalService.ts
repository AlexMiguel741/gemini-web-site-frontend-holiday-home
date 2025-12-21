
/**
 * ICAL SERVICE
 * Gestisce il fetch e il parsing dei file .ics da piattaforme esterne.
 */

export interface BookedRange {
  start: Date;
  end: Date;
}

export const fetchAndParseIcal = async (url: string): Promise<BookedRange[]> => {
  if (!url || url.trim() === '' || url.includes('example.ics')) {
    console.log('iCal: No URL provided or example URL, skipping');
    return [];
  }

  console.log('iCal: Fetching calendar from:', url);

  try {
    // Multiple CORS proxy options for reliability
    const proxies = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      `https://cors-anywhere.herokuapp.com/${url}`,
      `https://thingproxy.freeboard.io/fetch/${url}`
    ];

    let response;
    let data;

    // Try each proxy until one works
    for (const proxyUrl of proxies) {
      try {
        console.log('iCal: Trying proxy:', proxyUrl.substring(0, 50) + '...');
        response = await fetch(proxyUrl, {
          headers: {
            'Accept': 'text/calendar, application/json',
          }
        });

        if (response.ok) {
          data = await response.json();
          if (data && data.contents) {
            break;
          }
        }
      } catch (proxyError) {
        console.warn('iCal: Proxy failed:', proxyError);
        continue;
      }
    }

    if (!data || !data.contents) {
      // Try direct fetch as fallback (might work on some hosting platforms)
      console.log('iCal: Trying direct fetch...');
      response = await fetch(url);
      if (response.ok) {
        data = { contents: await response.text() };
      } else {
        throw new Error('All proxy attempts failed');
      }
    }

    const icsText = data.contents;
    console.log('iCal: Received ICS data, length:', icsText.length);

    if (!icsText || icsText.length < 100) {
      console.warn('iCal: ICS data too short or empty');
      return [];
    }

    return parseIcsString(icsText);
  } catch (error) {
    console.error('iCal Sync Error:', error);
    return [];
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
    }
  }
  
  return ranges;
};

const extractDate = (line: string): Date | null => {
  const parts = line.split(':');
  let dateStr = parts[parts.length - 1];
  if (!dateStr) return null;

  // Remove any parameters (e.g., ;VALUE=DATE:20231201)
  dateStr = dateStr.split(';').pop() || dateStr;

  // Handle different formats
  if (dateStr.length === 8) {
    // YYYYMMDD format
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    const date = new Date(year, month, day);
    return isNaN(date.getTime()) ? null : date;
  } else if (dateStr.includes('T')) {
    // ISO format like 20231201T000000Z
    try {
      // Convert to ISO format
      const isoStr = dateStr.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?/, '$1-$2-$3T$4:$5:$6Z');
      const date = new Date(isoStr);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  }

  // Try parsing as ISO string directly
  try {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    console.warn('iCal: Could not parse date:', dateStr);
    return null;
  }
};
