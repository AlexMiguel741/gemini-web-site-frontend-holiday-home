// api/ical-proxy.js - Vercel Serverless Function
// Fetches iCal data server-side, eliminating CORS issues

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.query;

    // Validate url parameter exists
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    // Decode the URL
    let decodedUrl;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid url encoding' });
    }

    // Security: only allow Booking.com URLs
    if (!decodedUrl.startsWith('https://ical.booking.com')) {
      return res.status(403).json({ error: 'Unauthorized proxy target' });
    }

    // Fetch from Booking.com server-side
    const response = await fetch(decodedUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LavenoCal/1.0)',
        'Accept': 'text/calendar'
      },
      timeout: 10000
    });

    if (!response.ok) {
      return res.status(502).json({ 
        error: 'Upstream failed', 
        status: response.status 
      });
    }

    const icalText = await response.text();

    // Return iCal data with proper headers and caching
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    res.status(200).send(icalText);

  } catch (error) {
    console.error('iCal proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
