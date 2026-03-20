import { APARTMENTS } from './constants';
import { fetchAndParseIcal } from './services/icalService';

async function testCalendars() {
  console.log('🧪 Testing all calendars...\n');
  
  for (const apt of APARTMENTS) {
    if (!apt.icalUrl) {
      console.log(`❌ ${apt.name.en}: No iCal URL`);
      continue;
    }
    
    console.log(`📅 Testing: ${apt.name.en}`);
    console.log(`   URL: ${apt.icalUrl}`);
    
    try {
      const bookings = await fetchAndParseIcal(apt.icalUrl);
      
      if (bookings.length === 0) {
        console.log(`   ⚠️ No bookings found`);
      } else {
        console.log(`   ✅ Found ${bookings.length} bookings:`);
        bookings.forEach((b, i) => {
          const start = b.start.toISOString().split('T')[0];
          const end = b.end.toISOString().split('T')[0];
          console.log(`      ${i + 1}. ${start} → ${end}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Error: ${(error as Error).message}`);
    }
    
    console.log('');
  }
}

// Run test
testCalendars().catch(console.error);
