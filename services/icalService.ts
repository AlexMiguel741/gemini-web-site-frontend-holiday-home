
/**
 * ICAL SERVICE
 * Handles fetching and parsing of .ics files from external platforms.
 */

export interface BookedRange {
  start: Date;
  end: Date;
}

export const fetchAndParseIcal = async (url: string): Promise<BookedRange[]> => {
  try {
    // We use a CORS proxy because Airbnb/Booking block direct browser requests
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) throw new Error('Failed to fetch calendar');
    
    const data = await response.json();
    const icsText = data.contents;
    
    return parseIcsString(icsText);
  } catch (error) {
    console.error('iCal Sync Error:', error);
    // Return empty array on error so UI doesn't crash
    return [];
  }
};

const parseIcsString = (icsText: string): BookedRange[] => {
  const ranges: BookedRange[] = [];
  const lines = icsText.split(/\r?\n/);
  
  let currentStart: Date | null = null;
  let currentEnd: Date | null = null;

  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      currentStart = null;
      currentEnd = null;
    } else if (line.startsWith('DTSTART')) {
      currentStart = extractDate(line);
    } else if (line.startsWith('DTEND')) {
      currentEnd = extractDate(line);
    } else if (line.startsWith('END:VEVENT')) {
      if (currentStart && currentEnd) {
        ranges.push({ start: currentStart, end: currentEnd });
      }
    }
  }
  
  return ranges;
};

const extractDate = (line: string): Date | null => {
  const dateStr = line.split(':')[1];
  if (!dateStr) return null;

  // Formats handled: YYYYMMDD or YYYYMMDDTHHMMSSZ
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));

  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
};
