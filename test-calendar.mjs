#!/usr/bin/env node

/**
 * CALENDAR TEST CLI
 * Testa il calendario di Booking.com da linea di comando
 * 
 * Usage:
 *   node test-calendar.mjs
 *   node test-calendar.mjs --url <booking-url>
 */

const APARTMENTS = [
  {
    name: 'Il Blu di Laveno',
    url: 'https://ical.booking.com/v1/export/t/e95dd962-d17c-4d29-8b5b-1e8235c1fe19.ics'
  },
  {
    name: 'Verso il Lago',
    url: 'https://ical.booking.com/v1/export?t=1cb3a14d-a13a-4833-8240-912478849846'
  },
  {
    name: 'Le Cascate',
    url: 'https://ical.booking.com/v1/export?t=d4e0ddde-2c63-4b93-abd2-e3fec042a905'
  },
  {
    name: 'Casa Azzurra',
    url: 'https://ical.booking.com/v1/export?t=281c00e1-0da9-49f8-a98d-b7532b6e48bb'
  }
];

const PROXIES = [
  url => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  url => `https://cors-anywhere.herokuapp.com/${url}`,
];

async function fetchWithTimeout(url, timeout = 3000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

async function testUrl(bookingUrl) {
  console.log(`\n🔍 Testing: ${bookingUrl.substring(0, 70)}...`);
  
  // Prova proxy
  for (let i = 0; i < PROXIES.length; i++) {
    const proxyUrl = PROXIES[i](bookingUrl);
    console.log(`  Trying proxy ${i + 1}...`);
    
    try {
      const res = await fetchWithTimeout(proxyUrl, 3000);
      if (!res.ok) continue;
      
      const data = await res.json();
      if (!data?.contents) continue;
      
      console.log(`  ✅ Got response! Size: ${data.contents.length} bytes`);
      
      // Parse iCal
      const events = (data.contents.match(/BEGIN:VEVENT/g) || []).length;
      console.log(`  📅 Events found: ${events}`);
      
      if (events > 0) {
        const dates = data.contents.match(/DT(START|END).*?:([\d]+)/g) || [];
        console.log(`  📊 Total date fields: ${dates.length}`);
      }
      
      return true;
    } catch (err) {
      console.log(`  ❌ Failed: ${err.message}`);
    }
  }
  
  // Direct fetch
  console.log(`  Trying direct fetch...`);
  try {
    const res = await fetchWithTimeout(bookingUrl, 3000);
    if (res.ok) {
      const text = await res.text();
      console.log(`  ✅ Direct fetch worked! Got ${text.length} bytes`);
      return true;
    }
  } catch (err) {
    console.log(`  ❌ Direct fetch failed: ${err.message}`);
  }
  
  return false;
}

async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║     📅 CALENDAR TEST CLI              ║');
  console.log('╚════════════════════════════════════════╝');
  
  const args = process.argv.slice(2);
  
  if (args.includes('--url')) {
    const idx = args.indexOf('--url');
    const url = args[idx + 1];
    if (url) {
      console.log(`Testing custom URL: ${url}`);
      await testUrl(url);
    }
  } else {
    console.log(`\nTesting ${APARTMENTS.length} apartments...`);
    console.log('─'.repeat(40));
    
    let successCount = 0;
    for (const apt of APARTMENTS) {
      const success = await testUrl(apt.url);
      if (success) successCount++;
      console.log('');
    }
    
    console.log('─'.repeat(40));
    console.log(`\n📊 Results: ${successCount}/${APARTMENTS.length} apartments working`);
  }
}

main().catch(console.error);
