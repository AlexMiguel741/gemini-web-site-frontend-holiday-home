/**
 * CALENDAR DEBUG UTILITY
 * Permette di testare il calendario in localhost
 */

import { fetchAndParseIcal } from './icalService';

// Sample iCal data per test in locale
const SAMPLE_ICAL = `BEGIN:VCALENDAR
VERSION:2.0
PRODX:-//Booking.com//EN
BEGIN:VEVENT
DTSTART:20260320
DTEND:20260325
SUMMARY:Booking
UID:booking1@booking.com
END:VEVENT
BEGIN:VEVENT
DTSTART:20260330
DTEND:20260405
SUMMARY:Booking
UID:booking2@booking.com
END:VEVENT
END:VCALENDAR`;

/**
 * Test il parsing di iCal
 */
export const testCalendarParsing = async () => {
  console.log('🔍 Testing Calendar Parsing...');
  console.log('Sample iCal:', SAMPLE_ICAL);
  
  // Simula una risposta di Booking
  const mockBookingResponse = new Response(SAMPLE_ICAL, {
    headers: { 'Content-Type': 'text/calendar' }
  });
  
  const text = await mockBookingResponse.text();
  console.log('✅ Can parse response');
  console.log('📊 Sample data lines:', text.split('\n').filter(l => l.includes('DT')));
};

/**
 * Verifica gli URL di Booking
 */
export const verifyBookingUrls = (urls: string[]) => {
  console.log('🔍 Verifying Booking URLs:');
  
  urls.forEach((url, idx) => {
    const isValid = url.startsWith('https://ical.booking.com');
    const hasToken = /\/t\/[a-f0-9\-]+\.ics/.test(url);
    
    console.log(`Apartment ${idx + 1}:`, {
      url: url.substring(0, 60) + '...',
      isValid,
      hasToken,
      status: isValid && hasToken ? '✅ OK' : '❌ Invalid'
    });
  });
};

/**
 * Test del fetch con proxy
 */
export const testProxyFetch = async (bookingUrl: string) => {
  console.log('🔍 Testing Proxy Fetch...');
  console.log('Booking URL:', bookingUrl);
  
  const proxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(bookingUrl)}`,
    `https://cors-anywhere.herokuapp.com/${bookingUrl}`,
  ];
  
  for (const proxy of proxies) {
    try {
      console.log(`  Testing proxy: ${proxy.substring(0, 40)}...`);
      const response = await fetch(proxy, {
        headers: { 'Accept': 'text/calendar, application/json' },
        signal: AbortSignal.timeout(3000)
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data?.contents) {
          console.log(`    ✅ Success! Got ${data.contents.length} bytes`);
          return data;
        }
      }
    } catch (error) {
      console.log(`    ❌ Failed:`, (error as Error).message);
    }
  }
  
  console.log('⚠️ All proxies failed, trying direct fetch...');
  try {
    const response = await fetch(bookingUrl, {
      signal: AbortSignal.timeout(3000)
    });
    if (response.ok) {
      console.log(`✅ Direct fetch success!`);
      return { contents: await response.text() };
    }
  } catch (error) {
    console.log('❌ Direct fetch also failed:', (error as Error).message);
  }
  
  return null;
};

/**
 * Test completo del calendario
 */
export const debugCalendar = async (bookingUrl: string) => {
  console.log('═══════════════════════════════════════');
  console.log('📅 CALENDAR DEBUG TEST');
  console.log('═══════════════════════════════════════');
  
  try {
    console.log('\n1️⃣ Fetching from Booking URL...');
    const result = await fetchAndParseIcal(bookingUrl);
    
    console.log('\n2️⃣ Parse Result:');
    console.log(`   ✅ Found ${result.length} bookings`);
    
    if (result.length > 0) {
      console.log('\n3️⃣ Booking Details:');
      result.forEach((booking, idx) => {
        console.log(`   Booking ${idx + 1}:`);
        console.log(`     Start: ${booking.start.toDateString()}`);
        console.log(`     End: ${booking.end.toDateString()}`);
        console.log(`     Duration: ${Math.ceil((booking.end.getTime() - booking.start.getTime()) / (1000 * 60 * 60 * 24))} days`);
      });
    } else {
      console.log('   ⚠️ No bookings found');
    }
    
    console.log('\n✅ Calendar test completed successfully!');
    return result;
  } catch (error) {
    console.error('\n❌ Calendar test failed:', error);
    return null;
  }
};

/**
 * Genera un report di verifica
 */
export const generateCalendarReport = async (apartments: any[]) => {
  console.log('\n📋 CALENDAR VERIFICATION REPORT');
  console.log('════════════════════════════════════════\n');
  
  const urls = apartments.map(apt => apt.icalUrl).filter(Boolean);
  
  console.log(`📊 Total Apartments: ${apartments.length}`);
  console.log(`📊 With iCal URLs: ${urls.length}\n`);
  
  verifyBookingUrls(urls);
  
  console.log('\n════════════════════════════════════════');
};
