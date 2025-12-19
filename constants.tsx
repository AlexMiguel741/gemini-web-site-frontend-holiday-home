
import { Apartment, SiteConfig, StoryContent, HeroContent, Translations } from './types';

/**
 * 🛠️ SITE CONFIGURATION
 * Manage your global business info here
 */
export const SITE_CONFIG: SiteConfig = {
  name: 'Laveno Shores',
  hostName: 'Elena',
  whatsapp: '393331234567',
  email: 'info@lavenoshores.com',
  locationLabel: {
    it: 'Laveno-Mombello, Italia',
    en: 'Laveno-Mombello, Italy',
    de: 'Laveno-Mombello, Italien'
  }
};

/**
 * 🏠 HOME PAGE CONTENT
 * Everything you see on the main landing page
 */
export const HERO_SECTION: HeroContent = {
  subtitle: { it: 'Esperienza Lago Maggiore', en: 'Experience Lake Maggiore', de: 'Erleben Sie den Lago Maggiore' },
  title1: { it: 'Soggiorni a Laveno', en: 'Laveno Stays', de: 'Aufenthalte in Laveno' },
  title2: { it: 'Ridefiniti.', en: 'Redefined.', de: 'Neu Definiert.' },
  description: { 
    it: 'Quattro residenze boutique selezionate con cura per il viaggiatore consapevole. Prenotazione diretta, zero commissioni.', 
    en: 'Four hand-picked boutique residences designed for the intentional traveler. Direct booking, zero fees.', 
    de: 'Vier handverlesene Boutique-Residenzen für den bewussten Reisenden. Direktbuchung, keine Gebühren.' 
  },
  buttonLabel: { it: 'Vedi le Residenze', en: 'View Residences', de: 'Residenzen ansehen' }
};

/**
 * 📚 TRANSLATIONS / UI LABELS
 * Common labels used across the site
 */
export const UI_LABELS: Translations = {
  nav_residences: { it: 'Residenze', en: 'Residences', de: 'Residenzen' },
  nav_history: { it: 'Storia', en: 'History', de: 'Geschichte' },
  nav_contact: { it: 'Contatti', en: 'Contact', de: 'Kontakt' },
  houses_title: { it: 'Le Nostre Case', en: 'Our Houses', de: 'Unsere Häuser' },
  houses_subtitle: { it: 'Disponibilità in tempo reale. Cura personale.', en: 'Live availability. Personal care.', de: 'Live-Verfügbarkeit. Persönliche Betreuung.' },
  exclusive_label: { it: 'Residenza Esclusiva', en: 'Exclusive Residence', de: 'Exklusive Residenz' },
  bedrooms: { it: 'Camere', en: 'Bedrooms', de: 'Schlafzimmer' },
  bathrooms: { it: 'Bagni', en: 'Bathrooms', de: 'Badezimmer' },
  living_space: { it: 'm² Abitabili', en: 'm² Living', de: 'm² Wohnfläche' },
  experience_title: { it: 'L\'Esperienza', en: 'The Experience', de: 'Das Erlebnis' },
  amenities_title: { it: 'Servizi Inclusi', en: 'Included Amenities', de: 'Inklusive Leistungen' },
  availability_title: { it: 'Disponibilità', en: 'Availability', de: 'Verfügbarkeit' },
  neighborhood_title: { it: 'Il Quartiere', en: 'The Neighborhood', de: 'Die Nachbarschaft' },
  direct_only: { it: 'Solo Diretto', en: 'Direct Only', de: 'Nur Direkt' },
  best_rate: { it: 'Miglior Tariffa Garantita', en: 'Verified Best Rate', de: 'Garantierter Bestpreis' },
  save_msg: { it: 'Risparmia fino al 15% rispetto ai portali. Nessun costo di servizio nascosto.', en: 'Save up to 15% compared to major platforms. No hidden service fees.', de: 'Sparen Sie bis zu 15% gegenüber Portalen. Keine versteckten Gebühren.' },
  whatsapp_resp: { it: 'Risposta rapida WhatsApp', en: 'Fast WhatsApp Response', de: 'Schnelle WhatsApp Antwort' },
  concierge_service: { it: 'Servizio Concierge Locale', en: 'Local Concierge Service', de: 'Lokaler Concierge-Service' },
  cta_btn: { it: 'Invia Messaggio ora', en: 'Message Now', de: 'Jetzt kontaktieren' },
  host_status: { it: 'Stato Host', en: 'Host Status', de: 'Host-Status' },
  host_online: { it: 'è online', en: 'is Responsive', de: 'ist erreichbar' },
  back: { it: 'Indietro', en: 'Back', de: 'Zurück' },
  sync_live: { it: 'Sincronizzazione Live...', en: 'Synchronizing Live...', de: 'Live-Synchronisierung...' },
  sync_connected: { it: 'Collegato al Calendario Esterno', en: 'Connected to External Calendar', de: 'Mit externem Kalender verbunden' },
  available: { it: 'Disponibile', en: 'Available', de: 'Verfügbar' },
  booked: { it: 'Prenotato Altrove', en: 'Booked Elsewhere', de: 'Anderswo gebucht' },
  last_sync: { it: 'Ultimo Aggiornamento', en: 'Last Sync', de: 'Letzte Synchronisierung' },
  chat_welcome: { it: "Ciao! Sono la tua host locale. Cerchi un posto dove stare?", en: "Hi! I'm your local host. Looking for a place to stay?", de: "Hallo! Ich bin Ihre Gastgeberin vor Ort. Suchen Sie eine Unterkunft?" },
  contact_human: { it: "L'Ospitalità è Umana.", en: "Hospitality is Human.", de: "Gastfreundschaft ist menschlich." },
  contact_desc: { it: "Evita i portali. Scrivici direttamente per una tariffa personalizzata.", en: "Avoid the platforms. Message us directly for a personalized rate.", de: "Vermeiden Sie die Portale. Kontaktieren Sie uns direkt für einen persönlichen Preis." }
};

/**
 * 📖 HISTORY PAGE
 */
export const STORY_CONTENT: StoryContent = {
  title: {
    it: 'Vita di Lago, Soggiorni di Classe.',
    en: 'Lake Life, Legacy Stays.',
    de: 'See-Leben, Erstklassige Aufenthalte.'
  },
  quote: {
    it: '"Non affittiamo solo letti. Offriamo una chiave per il nostro angolo preferito d\'Italia."',
    en: '"We don\'t rent beds. We offer a key to our favorite corner of Italy."',
    de: '"Wir vermieten nicht nur Betten. Wir bieten Ihnen einen Schlüssel zu unserem Lieblingseck in Italien."'
  },
  paragraphs: {
    it: [
      'Laveno Shores è nata dalla passione per il restauro e la bellezza tranquilla della sponda lombarda del Lago Maggiore. Quella che era iniziata come una singola casa in pietra a Mombello è diventata una collezione curata di quattro residenze.',
      'Come attività a conduzione familiare, siamo orgogliosi di essere presenti per i nostri ospiti. Dalla sincronizzazione automatica dei calendari al pacchetto di benvenuto personale nella vostra cucina: gestiamo tutto noi personalmente.'
    ],
    en: [
      'Laveno Shores was born from a passion for restoration and the quiet beauty of the Lombardy side of Lake Maggiore. What started as a single stone house in Mombello has grown into a curated collection of four residences.',
      'As a family-run business, we pride ourselves on being there for our guests. From the ical synchronization that ensures a smooth booking to the personal welcome pack in your kitchen—we handle everything personally.'
    ],
    de: [
      'Laveno Shores entstand aus der Leidenschaft für die Restaurierung und die stille Schönheit der lombardischen Seite del Lago Maggiore. Was als einzelnes Steinhaus in Mombello begann, hat sich zu einer kuratierten Kollektion von vier Residenzen entwickelt.',
      'Als Familienunternehmen sind wir stolz darauf, für unsere Gäste da zu sein. Von der iCal-Synchronisation bis hin zum persönlichen Willkommenspaket in Ihrer Küche – wir kümmern uns persönlich um alles.'
    ]
  },
  image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200'
};

/**
 * 🏨 APARTMENTS DATA
 */
export const APARTMENTS: Apartment[] = [
  {
    id: 'vista-lago-suite',
    name: { it: 'Vista Lago Suite', en: 'Vista Lago Suite', de: 'See-Panorama Suite' },
    tagline: { it: 'Caffè mattutino con vista sul Golfo Borromeo', en: 'Morning coffee with a view of the Borromean Gulf', de: 'Morgendlicher Kaffee mit Blick auf den Borromäischen Golf' },
    location: 'Piazza Fontana, Laveno',
    price: 'From €125/night',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 55,
    icalUrl: 'https://www.airbnb.com/calendar/ical/12345678.ics', 
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.832!2d8.618!3d45.908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sPiazza%20Fontana%2C%20Laveno-Mombello!5e0!3m2!1sen!2sit!4v1711111111111',
    images: [
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200'
    ],
    description: {
      it: 'Una suite luminosa e ariosa situata direttamente sul lungolago di Laveno. Il punto forte è il balcone privato che si affaccia sulle acque del Lago Maggiore.',
      en: 'A bright and airy second-floor suite situated directly on the Laveno promenade. The highlight is the private balcony overlooking the shimmering waters of Lake Maggiore.',
      de: 'Eine helle und luftige Suite im zweiten Stock direkt an der Promenade von Laveno. Das Highlight ist der private Balkon mit Blick auf das glitzernde Wasser des Lago Maggiore.'
    },
    amenities: {
      it: ['Balcone Vista Lago', 'Nespresso Bar', 'WiFi Alta Velocità', 'Aria Condizionata', 'Letto King Size', 'Tende Oscuranti'],
      en: ['Lake-View Balcony', 'Nespresso Coffee Bar', 'High-Speed WiFi', 'Air Conditioning', 'King Size Bed', 'Blackout Curtains'],
      de: ['Balkon mit Seeblick', 'Nespresso-Kaffeebar', 'Highspeed-WLAN', 'Klimaanlage', 'Kingsize-Bett', 'Verdunkelungsvorhänge']
    }
  },
  {
    id: 'borghetto-mombello',
    name: { it: 'Il Borghetto', en: 'Il Borghetto', de: 'Das kleine Dorf' },
    tagline: { it: 'Lusso silenzioso in un borgo storico di pietra', en: 'Quiet luxury in a historic stone hamlet', de: 'Ruhiger Luxus in einem historischen Steindorf' },
    location: 'Mombello Antico',
    price: 'From €98/night',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 75,
    icalUrl: 'https://admin.booking.com/hotel/hoteladmin/ical.html?t=87654321',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2775.123!2d8.625!3d45.905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sMombello%2C%2021014%20Laveno-Mombello!5e0!3m2!1sen!2sit!4v1711111111112',
    images: [
      'https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-c52af046397c?auto=format&fit=crop&q=80&w=1200'
    ],
    description: {
      it: 'Nascosto tra le strette vie della vecchia Mombello, questo appartamento ristrutturato conserva le pareti in pietra originali del XVIII secolo.',
      en: 'Tucked away in the charming narrow streets of old Mombello, this renovated apartment preserves the original 18th-century stone walls.',
      de: 'Eingebettet in die charmanten engen Gassen des alten Mombello, bewahrt diese renovierte Wohnung die originalen Steinmauern aus dem 18. Jahrhundert.'
    },
    amenities: {
      it: ['Pareti in Pietra', 'Cortile Privato', 'Cucina Completa', 'Self Check-in', 'Mobili d\'Antiquariato', 'Biancheria Bio'],
      en: ['Exposed Stone Walls', 'Secluded Courtyard', 'Full Kitchen', 'Self Check-in', 'Antique Furniture', 'Organic Linens'],
      de: ['Sichtbare Steinwände', 'Abgeschiedener Innenhof', 'Voll ausgestattete Küche', 'Self-Check-in', 'Antiquitäten', 'Bio-Bettwäsche']
    }
  },
  {
    id: 'cableway-loft',
    name: { it: 'Sasso del Ferro Loft', en: 'Sasso del Ferro Loft', de: 'Berg-Loft Sasso' },
    tagline: { it: 'Design moderno ai piedi della montagna', en: 'Modern design at the foot of the mountain', de: 'Modernes Design am Fuße des Berges' },
    location: 'Via per Casere, Laveno',
    price: 'From €145/night',
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
    description: {
      it: 'Un loft contemporaneo situato a soli 200 metri dalla famosa funivia di Laveno.',
      en: 'A contemporary loft located just 200 meters from the famous Laveno bucket-cable car. High ceilings and large windows.',
      de: 'Ein zeitgemäßes Loft, nur 200 Meter von der berühmten Laveno-Seilbahn entfernt.'
    },
    amenities: {
      it: ['Terrazza Vista Monte', 'Area Lavoro', 'Parcheggio Sotterraneo', 'Lavanderia', 'Smart TV', 'Doccia a Pioggia'],
      en: ['Mountain View Terrace', 'Dedicated Workspace', 'Underground Parking', 'Laundry Facilities', 'Smart TV', 'Rain Shower'],
      de: ['Terrasse mit Bergblick', 'Arbeitsbereich', 'Tiefgarage', 'Waschküche', 'Smart-TV', 'Regendusche']
    }
  },
  {
    id: 'garden-hideaway',
    name: { it: 'The MIDeC Garden', en: 'The MIDeC Garden', de: 'MIDeC Garten-Suite' },
    tagline: { it: 'Un’oasi lussureggiante vicino al Museo della Ceramica', en: 'A lush oasis near the Ceramics Museum', de: 'Eine üppige Oase in der Nähe des Keramikmuseums' },
    location: 'Cerro di Laveno',
    price: 'From €115/night',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 60,
    icalUrl: 'https://www.vrbo.com/ical/example.ics',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2775.333!2d8.605!3d45.900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sCerro%2C%20Laveno-Mombello!5e0!3m2!1sen!2sit!4v1711111111114',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&get=80&w=1200'
    ],
    description: {
      it: 'Questo rifugio al piano terra dispone di un giardino privato di 40mq.',
      en: 'A ground-floor sanctuary featuring a 40m² private garden. A quiet corner for alfresco dining.',
      de: 'Dieser Rückzugsort im Erdgeschoss bietet einen 40 m² großen privaten Garten.'
    },
    amenities: {
      it: ['Giardino Privato', 'Area Pranzo Esterna', 'Bici Gratuite', 'Quartiere Silenzioso', 'Lettini Prendisole', 'Amaca'],
      en: ['Private Garden', 'Outdoor Dining Set', 'Complimentary Bikes', 'Quiet Neighborhood', 'Sun Loungers', 'Hammock'],
      de: ['Privater Garten', 'Außen-Essbereich', 'Kostenlose Fahrräder', 'Ruhige Lage', 'Sonnenliegen', 'Hängematte']
    }
  }
];
