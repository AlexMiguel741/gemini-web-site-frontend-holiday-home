#!/usr/bin/env node

/**
 * TEST PROXIES - Verifica che i proxy funzionino correttamente
 */

async function testProxy(proxyName, proxyUrl) {
  console.log(`\n🧪 Testing ${proxyName}...`);
  console.log(`   URL: ${proxyUrl.substring(0, 80)}...`);
  
  try {
    const response = await fetch(proxyUrl, { timeout: 5000 });
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const text = await response.text();
      console.log(`   Received: ${text.length} bytes`);
      console.log(`   First 100 chars: ${text.substring(0, 100)}`);
      
      // Try parsing as JSON
      try {
        const json = JSON.parse(text);
        if (json.contents) {
          console.log(`   ✅ JSON format with 'contents' field: ${json.contents.substring(0, 60)}...`);
        } else {
          console.log(`   ⚠️ JSON but no 'contents' field`);
        }
      } catch {
        // Not JSON, check if it's iCal
        if (text.includes('BEGIN:VCALENDAR')) {
          console.log(`   ✅ Raw iCal content detected`);
        } else {
          console.log(`   ❌ Unknown format`);
        }
      }
    } else {
      console.log(`   ❌ HTTP Error`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
}

async function main() {
  const testUrl = 'https://ical.booking.com/v1/export/t/e95dd962-d17c-4d29-8b5b-1e8235c1fe19.ics';
  
  console.log('╔════════════════════════════════════════╗');
  console.log('║  🧪 PROXY PRODUCTION TEST              ║');
  console.log('╚════════════════════════════════════════╝');
  
  console.log(`\n📍 Testing with URL: ${testUrl}\n`);
  
  // Test allorigins
  await testProxy(
    'allorigins.win',
    `https://api.allorigins.win/get?url=${encodeURIComponent(testUrl)}`
  );
  
  // Test corsproxy
  await testProxy(
    'corsproxy.io',
    `https://corsproxy.io/?${encodeURIComponent(testUrl)}`
  );
  
  console.log('\n');
}

main().catch(console.error);
