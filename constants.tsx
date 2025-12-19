
import { Apartment, SiteConfig, StoryContent, HeroContent, Translations } from './types';

/**
 * 🛠️ CONFIGURAZIONE SITO (PANNELLO DI CONTROLLO)
 */
export const SITE_CONFIG: SiteConfig = {
  name: 'Laveno Shores',
  hostName: 'Elena',
  whatsapp: '393331234567', // Inserire numero con prefisso senza +
  email: 'info@lavenoshores.com',
  locationLabel: {
    it: 'Laveno-Mombello, Italia',
    en: 'Laveno-Mombello, Italy',
    de: 'Laveno-Mombello, Italien'
  },
  // Mappa generale mostrata nella Home
  homeMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11099.349923846614!2d8.611087093282057!3d45.9085817290008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2s21014%20Laveno-Mombello%2C%20Province%20of%20Varese%2C%20Italy!5e0!3m2!1sen!2sus!4v1711111111111"
};

/**
 * 🏠 CONTENUTO HOME PAGE
 */
export const HERO_SECTION: HeroContent = {
  subtitle: { it: 'Esperienza Lago Maggiore', en: 'Experience Lake Maggiore', de: 'Erleben Sie den Lago Maggiore' },
  title1: { it: 'Soggiorni a Laveno', en: 'Laveno Stays', de: 'Aufenthalte in Laveno' },
  title2: { it: 'Ridefiniti.', en: 'Redefined.', de: 'Neu Definiert.' },
  description: { 
    it: 'Quattro residenze boutique selezionate con cura. Prenotazione diretta, zero commissioni, ospitalità autentica.', 
    en: 'Four hand-picked boutique residences. Direct booking, zero fees, authentic hospitality.', 
    de: 'Vier handverlesene Boutique-Residenzen. Direktbuchung, keine Gebühren, authentische Gastfreundschaft.' 
  },
  buttonLabel: { it: 'Scopri le Case', en: 'Explore Houses', de: 'Häuser entdecken' }
};

/**
 * 📚 TUTTI I TESTI DELLA UI
 */
export const UI_LABELS: Translations = {
  nav_residences: { it: 'Residenze', en: 'Residences', de: 'Residenzen' },
  nav_history: { it: 'La Storia', en: 'Our Story', de: 'Unsere Geschichte' },
  nav_contact: { it: 'Contattaci', en: 'Contact Us', de: 'Kontakt' },
  houses_title: { it: 'Le Nostre Residenze', en: 'Our Residences', de: 'Unsere Residenzen' },
  houses_subtitle: { it: 'Sincronizzazione in tempo reale con i calendari esterni.', en: 'Real-time synchronization with external calendars.', de: 'Echtzeit-Synchronisierung con externen Kalendern.' },
  exclusive_label: { it: 'Residenza di Pregio', en: 'Premium Residence', de: 'Premium-Residenz' },
  bedrooms: { it: 'Camere', en: 'Bedrooms', de: 'Schlafzimmer' },
  bathrooms: { it: 'Bagni', en: 'Bathrooms', de: 'Badezimmer' },
  living_space: { it: 'mq Totali', en: 'Total sqm', de: 'Gesamt qm' },
  experience_title: { it: 'Vivi il Soggiorno', en: 'The Stay Experience', de: 'Das Aufenthaltserlebnis' },
  amenities_title: { it: 'Cosa troverai', en: 'What you will find', de: 'Ausstattung' },
  availability_title: { it: 'Verifica Disponibilità', en: 'Check Availability', de: 'Verfügbarkeit prüfen' },
  neighborhood_title: { it: 'Posizione', en: 'Location', de: 'Lage' },
  direct_only: { it: 'Prenota senza intermediari', en: 'Book Direct', de: 'Direkt buchen' },
  best_rate: { it: 'Prezzo più basso garantito', en: 'Best Price Guaranteed', de: 'Bestpreisgarantie' },
  save_msg: { it: 'Risparmia le commissioni dei portali (fino al 18%).', en: 'Save on platform fees (up to 18%).', de: 'Sparen Sie Vermittlungsgebühren (bis zu 18%).' },
  whatsapp_resp: { it: 'Chat immediata', en: 'Instant Chat', de: 'Sofort-Chat' },
  concierge_service: { it: 'Assistenza Elena 24/7', en: '24/7 Elena Assistance', de: 'Elena-Assistenz rund um die Uhr' },
  cta_btn: { it: 'Richiedi Preventivo', en: 'Request Quote', de: 'Angebot anfordern' },
  host_status: { it: 'Host Locale', en: 'Local Host', de: 'Gastgeber vor Ort' },
  host_online: { it: 'è disponibile', en: 'is available', de: 'ist erreichbar' },
  back: { it: 'Torna alla lista', en: 'Back to list', de: 'Zurück zur Liste' },
  sync_live: { it: 'Aggiornamento...', en: 'Updating...', de: 'Aktualisierung...' },
  sync_connected: { it: 'Calendario Sincronizzato', en: 'Calendar Synced', de: 'Kalender synchronisiert' },
  available: { it: 'Libero', en: 'Available', de: 'Verfügbar' },
  booked: { it: 'Occupato', en: 'Booked', de: 'Belegt' },
  last_sync: { it: 'Ultimo controllo', en: 'Last check', de: 'Letzter Check' },
  chat_welcome: { it: "Benvenuto! Sono Elena. Come posso aiutarti oggi?", en: "Welcome! I'm Elena. How can I help you today?", de: "Willkommen! Ich bin Elena. Wie kann ich Ihnen heute helfen?" },
  contact_human: { it: "Parla con noi.", en: "Talk to us.", de: "Sprechen Sie mit uns." },
  contact_desc: { it: "Siamo una gestione familiare, preferiamo il contatto umano. Scrivici su WhatsApp per ogni dubbio.", en: "We are family-run and prefer human contact. Message us on WhatsApp for any questions.", de: "Wir sind ein Familienbetrieb und bevorzugen den direkten Kontakt." }
};

/**
 * 📖 STORIA
 */
export const STORY_CONTENT: StoryContent = {
  title: { it: 'Dal Cuore di Laveno.', en: 'From the Heart of Laveno.', de: 'Aus dem Herzen von Laveno.' },
  quote: { it: '"Vogliamo che ogni ospite si senta un abitante del lago, non un turista."', en: '"We want every guest to feel like a local, not a tourist."', de: '"Wir möchten, dass sich jeder Gast wie ein Einheimischer fühlt."' },
  paragraphs: {
    it: [
      'La nostra avventura è iniziata con il restauro di una vecchia casa di pescatori.',
      'Oggi offriamo quattro diverse esperienze, unite dallo stesso amore per il dettaglio.'
    ],
    en: [
      'Our adventure started with the restoration of an old fisherman\'s house.',
      'Today we offer four different experiences, united by the same love for detail.'
    ],
    de: [
      'Unser Abenteuer begann mit der Restaurierung eines alten Fischerhauses.',
      'Heute bieten wir vier verschiedene Erlebnisse an, die durch die gleiche Liebe zum Detail vereint sind.'
    ]
  },
  image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200'
};

/**
 * 🏨 APPARTAMENTI
 */
export const APARTMENTS: Apartment[] = [
  {
    id: 'vista-lago-suite',
    name: { it: 'Vista Lago Suite', en: 'Vista Lago Suite', de: 'See-Panorama Suite' },
    tagline: { it: 'Eleganza con vista sul porto', en: 'Elegance overlooking the harbor', de: 'Eleganz mit Hafenblick' },
    location: 'Piazza Fontana, Laveno',
    price: '€125/notte',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 55,
    icalUrl: 'https://www.airbnb.com/calendar/ical/12345678.ics', 
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.832!2d8.618!3d45.908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sPiazza%20Fontana%2C%20Laveno-Mombello!5e0!3m2!1sen!2sit!4v1711111111111',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200'
    ],
    description: { it: 'Un rifugio romantico nel cuore di Laveno.', en: 'A romantic hideaway in the heart of Laveno.', de: 'Ein romantischer Rückzugsort im Herzen von Laveno.' },
    amenities: {
      it: ['Vista Lago', 'Macchina Nespresso', 'Smart TV'],
      en: ['Lake View', 'Nespresso Machine', 'Smart TV'],
      de: ['Seeblick', 'Nespresso-Maschine', 'Smart TV']
    }
  },
  {
    id: 'borghetto-mombello',
    name: { it: 'Il Borghetto', en: 'Il Borghetto', de: 'Das kleine Dorf' },
    tagline: { it: 'Pace e silenzio nel borgo antico', en: 'Peace and silence in the ancient village', de: 'Ruhe im alten Dorf' },
    location: 'Mombello Antico',
    price: '€98/notte',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 75,
    icalUrl: 'https://admin.booking.com/hotel/hoteladmin/ical.html?t=87654321',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2775.123!2d8.625!3d45.905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sMombello%2C%2021014%20Laveno-Mombello!5e0!3m2!1sen!2sit!4v1711111111112',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af046397c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&q=80&w=1200'
    ],
    description: { it: 'Pareti in pietra e arredi d\'epoca.', en: 'Stone walls and antique furniture.', de: 'Steinwände und antike Möbel.' },
    amenities: {
      it: ['Ingresso Indipendente', 'Parcheggio Gratuito', 'Caminetto'],
      en: ['Private Entrance', 'Free Parking', 'Fireplace'],
      de: ['Eigener Eingang', 'Gratis Parkplatz', 'Kamin']
    }
  },
  {
    id: 'cableway-loft',
    name: { it: 'Sasso del Ferro Loft', en: 'Sasso del Ferro Loft', de: 'Berg-Loft Sasso' },
    tagline: { it: 'Design moderno sotto la funivia', en: 'Modern design under the cableway', de: 'Modernes Design' },
    location: 'Via per Casere, Laveno',
    price: '€145/notte',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 90,
    icalUrl: 'https://www.airbnb.com/calendar/ical/99998888.ics',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.555!2d8.615!3d45.910!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sVia%20per%20Casere%2C%20Laveno!5e0!3m2!1sen!2sit!4v1711111111113',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1536376074432-ad71745afc9b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1200'
    ],
    description: { it: 'Ampio spazio aperto con vista montagna.', en: 'Spacious open space with mountain views.', de: 'Großzügiges Open Space mit Bergblick.' },
    amenities: {
      it: ['Due Bagni', 'Cucina Hi-Tech', 'Netflix Incluso'],
      en: ['Two Bathrooms', 'Hi-Tech Kitchen', 'Netflix Included'],
      de: ['Zwei Badezimmer', 'Hi-Tech-Küche', 'Netflix inklusive']
    }
  },
  {
    id: 'garden-hideaway',
    name: { it: 'The MIDeC Garden', en: 'The MIDeC Garden', de: 'MIDeC Garten-Suite' },
    tagline: { it: 'Fiori e arte a pochi passi', en: 'Flowers and art just steps away', de: 'Blumen und Kunst' },
    location: 'Cerro di Laveno',
    price: '€115/notte',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 60,
    icalUrl: 'https://www.vrbo.com/ical/example.ics',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2775.333!2d8.605!3d45.900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sCerro%2C%20Laveno-Mombello!5e0!3m2!1sen!2sit!4v1711111111114',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1200'
    ],
    description: { it: 'Immerso nel verde vicino alla spiaggia.', en: 'Surrounded by greenery near the beach.', de: 'Im Grünen in Strandnähe.' },
    amenities: {
      it: ['Giardino Privato', 'Biciclette', 'Self Check-in'],
      en: ['Private Garden', 'Bicycles', 'Self Check-in'],
      de: ['Privatgarten', 'Fahrräder', 'Self Check-in']
    }
  }
];
