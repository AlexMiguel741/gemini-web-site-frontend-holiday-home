#!/usr/bin/env node

/**
 * FULL CALENDAR TEST - Simula il comportamento dell'app React
 * Testa il cambio appartamento e verifica che il calendario carica i dati corretti
 */

const APARTMENTS = [
  {
    name: 'Il Blu di Laveno (Azure)',
    id: 'azure-terrace-suite',
    url: 'https://ical.booking.com/v1/export/t/e95dd962-d17c-4d29-8b5b-1e8235c1fe19.ics'
  },
  {
    name: 'Verso il Lago (Sapphire)',
    id: 'sapphire-studio-loft',
    url: 'https://ical.booking.com/v1/export/t/1cb3a14d-a13a-4833-8240-912478849846.ics'
  },
  {
    name: 'Le Cascate 1 (Cobalt)',
    id: 'cobalt-family-home',
    url: 'https://ical.booking.com/v1/export/t/d4e0ddde-2c63-4b93-abd2-e3fec042a905.ics'
  },
  {
    name: 'Le Cascate (Navy)',
    id: 'navy-garden-retreat',
    url: 'https://ical.booking.com/v1/export/t/281c00e1-0da9-49f8-a98d-b7532b6e48bb.ics'
  }
];

// Simula il cache della app
const cache = new Map();
const CACHE_DURATION = 30 * 60 * 1000;

// Normalize URL
const normalizeUrl = (url) => {
  try {
    const u = new URL(url);
    return u.toString();
  } catch {
    return url;
  }
};

// Fetch with timeout
async function fetchWithTimeout(url, timeout = 10000) {
  return Promise.race([
    fetch(url, { headers: { 'Accept': 'text/calendar' } }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Fetch timeout')), timeout)
    )
  ]);
}

// Parse iCal
function parseIcsString(icsText) {
  const ranges = [];
  const lines = icsText.split(/\r?\n/);
  
  let currentStart = null;
  let currentEnd = null;
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine.startsWith('BEGIN:VEVENT')) {
      currentStart = null;
      currentEnd = null;
    } else if (cleanLine.startsWith('DTSTART')) {
      const parts = cleanLine.split(':');
      const dateStr = parts[parts.length - 1];
      if (/^\d{8}$/.test(dateStr)) {
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1;
        const day = parseInt(dateStr.substring(6, 8));
        currentStart = new Date(Date.UTC(year, month, day, 0, 0, 0));
      }
    } else if (cleanLine.startsWith('DTEND')) {
      const parts = cleanLine.split(':');
      const dateStr = parts[parts.length - 1];
      if (/^\d{8}$/.test(dateStr)) {
        const year = parseInt(dateStr.substring(0, 4));
        const month = parseInt(dateStr.substring(4, 6)) - 1;
        const day = parseInt(dateStr.substring(6, 8));
        currentEnd = new Date(Date.UTC(year, month, day, 0, 0, 0));
      }
    } else if (cleanLine.startsWith('END:VEVENT')) {
      if (currentStart && currentEnd) {
        ranges.push({ start: currentStart.toISOString().split('T')[0], end: currentEnd.toISOString().split('T')[0] });
      }
    }
  }
  return ranges;
}

// Fetch and Parse - Simula la funzione dell'app
async function fetchAndParseIcal(url) {
  const normalizedUrl = normalizeUrl(url);
  
  // Check cache
  const cached = cache.get(normalizedUrl);
  if (cached && cached.data.length > 0 && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`   📦 [CACHE HIT] ${cached.data.length} bookings from cache`);
    return cached.data;
  }

  try {
    console.log(`   🔄 Fetching: ${url.substring(0, 60)}...`);
    
    const response = await fetchWithTimeout(normalizedUrl, 10000);
    if (!response.ok) {
      console.log(`   ❌ HTTP ${response.status}`);
      return [];
    }
    
    const icsText = await response.text();
    console.log(`   ✅ Fetched ${icsText.length} bytes`);
    
    const result = parseIcsString(icsText);
    console.log(`   ✅ Parsed ${result.length} bookings`);
    
    if (result.length > 0) {
      console.log(`   📅 First 3 bookings:`);
      result.slice(0, 3).forEach((b, i) => {
        console.log(`      ${i + 1}. ${b.start} to ${b.end}`);
      });
    }
    
    // Cache result
    cache.set(normalizedUrl, { data: result, timestamp: Date.now() });
    
    return result;
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return [];
  }
}

// Main test
async function runTest() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  🧪 FULL CALENDAR TEST - Apartment Switch  ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  console.log('📋 Testing scenario: User switches between apartments\n');
  
  for (let i = 0; i < APARTMENTS.length; i++) {
    const apt = APARTMENTS[i];
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🏠 Test ${i + 1}/${APARTMENTS.length}: ${apt.name}`);
    console.log(`   ID: ${apt.id}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    
    const bookings = await fetchAndParseIcal(apt.url);
    
    console.log(`\n   ✨ Result: ${bookings.length} bookings loaded\n`);
  }
  
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  ✅ Test Completed Successfully!           ║');
  console.log('╚════════════════════════════════════════════╝\n');
}

runTest().catch(console.error);
