
import { Apartment, SiteConfig, StoryContent, HeroContent, Translations } from './types';

export const SITE_CONFIG: SiteConfig = {
  name: 'Laveno Holiday Rentals',
  hostName: 'Elsa',
  whatsapp: '393480325148',
  email: 'martinezelsa34@yahoo.it',
  locationLabel: {
    it: 'Laveno-Mombello, Lago Maggiore',
    en: 'Laveno-Mombello, Lake Maggiore',
    de: 'Laveno-Mombello, Lago Maggiore'
  },
  homeMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.786523178229!2d8.618451812543328!3d45.90883652697193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sVia%20Labiena%2C%2021014%20Laveno-Mombello%20VA!5e0!3m2!1sit!2sit!4v1711111111111"
};

export const HERO_SECTION: HeroContent = {
  subtitle: { it: 'Vivere il Blu del Lago', en: 'Living the Lake Blue', de: 'Leben im Blau des Sees' },
  title1: { it: 'Soggiorni d\'Elite', en: 'Elite Stays', de: 'Elite-Aufenthalte' },
  title2: { it: 'a Laveno.', en: 'in Laveno.', de: 'in Laveno.' },
  description: { 
    it: 'Quattro residenze esclusive nel cuore pulsante di Laveno-Mombello. A pochi passi dal Lago Maggiore e dai traghetti per le Isole Borromee.', 
    en: 'Four exclusive residences in the heart of Laveno-Mombello. Just steps from Lake Maggiore and the Borromean Islands ferries.', 
    de: 'Vier exklusive Residenzen im Herzen von Laveno-Mombello. Nur wenige Schritte vom Lago Maggiore und den Fähren zu den Borromäischen Inseln entfernt.' 
  },
  buttonLabel: { it: 'Vedi Disponibilità', en: 'Check Availability', de: 'Verfügbarkeit prüfen' }
};

export const APARTMENTS: Apartment[] = [
  {
    id: 'azure-terrace-suite',
    name: { it: 'Il Blu di Laveno', en: 'Azure Terrace Suite', de: 'Azure Terrace Suite' },
    tagline: { it: 'Posizione Strategica', en: 'Light, Color and Panoramic View', de: 'Licht, Farbe und Panoramablick' },
    location: 'Laveno Centro',
    price: 130, 
    bedrooms: 1,
    bathrooms: 1,
    sqft: 65,
    icalUrl: 'https://ical.booking.com/v1/export/t/436c1829-4803-4b34-a1ef-ad00f8b3a7a9.ics ',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2775.758215875175!2d8.615724075419156!3d45.9161437031722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4785d8fbbea25a69%3A0x38d99c7f4765ccf0!2sVia%20Professor%20Monteggia%2C%208%2C%2021014%20Laveno-Mombello%20VA!5e0!3m2!1sit!2sit!4v1766249767238!5m2!1sit!2sit',
    images: [
      '/images/azure/foto_sala_1.png',
      '/images/azure/foto_sala_2.png',
      '/images/azure/foto_entrata.jpg',
      '/images/azure/foto_entrata_2.png',
      '/images/azure/foto_cucina.png',
      '/images/azure/foto_letto.png'
    ],
    description: { 
      it: "A 26 km da Villa Panza a Laveno, Il Blu di Laveno prevede un alloggio con vista sulla montagna, WiFi gratuito e parcheggio privato gratuito.\n\nLa struttura presenta la vista sul giardino e si trova a 38 km da Stazione Ferroviaria di Lugano e 40 km da Centro Esposizioni di Lugano.\n\nQuesto appartamento comprende 1 camera da letto, un soggiorno, una cucina con utensili, frigorifero e macchina da caffè, e 1 bagno con bidet e doccia.\n\nPresso questo appartamento troverete asciugamani e lenzuola in dotazione.\n\nAeroporto di Milano Malpensa si trova a 39 km dalla struttura.", 
      en: 'Located in the vibrant heart of Laveno, this apartment enchants with its Mediterranean colors. The main bedroom welcomes guests with a suggestive classic artistic touch, while the modern kitchen offers every comfort.', 
      de: 'Im pulsierenden Herzen von Laveno gelegen, besticht dieses Apartment durch seine mediterranen Farben. Das Hauptschlafzimmer empfängt die Gäste con un suggestivo richiamo artistico classico.' 
    },
    amenities: {
      it: ['Wi-Fi', 'Cucina Completa', 'Parcheggio gratuito', 'Accessori Bambini' ,'Smart TV', 'Asciugamani e Lenzuola'],
      en: ['Fiber Wi-Fi', 'Full Kitchen', 'AC', 'Harbor Proximity', 'Smart TV'],
      de: ['Glasfaser-WLAN', 'Vollküche', 'Klimaanlage', 'Hafennähe', 'Smart TV']
    }
  },
  {
    id: 'sapphire-studio-loft',
    name: { it: 'Verso il Lago', en: 'Verso il Lago', de: 'Verso il Lago' },
    tagline: { it: 'A due passi da Laveno Centro', en: 'Compact Elegance Waterfront', de: 'Kompakte Eleganz am Wasser' },
    location: 'Centro Laveno',
    price: 125,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 45,
    icalUrl: 'YOUR_SAPPHIRE_ICAL_URL_HERE',
    googleMapsEmbedUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.1951895238008!2d8.621751575418575!3d45.90740720375946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4785d85f4c91828b%3A0x2da0159c0edad093!2sVia%20Ronco%20S.%20Maria%2C%202%2C%2021014%20Laveno-Mombello%20VA!5e0!3m2!1sit!2sit!4v1766251081015!5m2!1sit!2sit',
    images: ['/images/sapphire/foto-sala.JPG',
             '/images/sapphire/foto-sala_2.JPG',
             '/images/sapphire/foto-cucina.JPG',
             '/images/sapphire/foto_letto.JPG',
              '/images/sapphire/foto_sala_3.JPG'
    ],
    description: { it: 'Verso il Lago si trova a Laveno a 25 km da Villa Panza, 38 km da Stazione Ferroviaria di Lugano e 39 km da Monastero di Torba. La struttura presenta la vista sul giardino e il WiFi gratuito in tutta la struttura\n\nQuesto appartamento con balcone e vista sulla città offre 1 camera da letto, un soggiorno, una TV a schermo piatto, una cucina con frigorifero e piano cottura e 1 bagno con doccia.\n\nPresso questo appartamento troverete asciugamani e lenzuola tra i servizi disponibili.\n\n Centro Esposizioni di Lugano è a 40 km da questo appartamento, mentre Stazione Ferroviaria di Mendrisio si trova a 43 km dalla struttura.', 
      en: 'Central position', 
      de: 'Raffiniertes Design per coppie.' },
    amenities: { it: ['Wi-Fi', 'Cucina Completa', 'Parcheggio pubblico', 'Accessori Bambini' ,'Smart TV', 'Asciugamani e Lenzuola']
      , en: ['Self Check-in'], de: ['Self Check-in'] }
  },
  {
    id: 'cobalt-family-home',
    name: { it: 'Cittiglio Le Cascate', en: 'Cobalt Family Home', de: 'Cobalt Family Home' },
    tagline: { it: 'Nel pieno centro storico di Cittiglio', en: 'Space for the whole family', de: 'Platz für die ganze Familie' },
    location: 'Zona borgo storico Cittiglio',
    price: 90,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 45,
    icalUrl: 'YOUR_COBALT_ICAL_URL_HERE',
    googleMapsEmbedUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11106.469538628786!2d8.642607051634423!3d45.898964948040216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4785d818b6619a69%3A0xbe185904dcfa784!2sVia%20Alpi%2C%209%2C%2021033%20Cittiglio%20VA!5e0!3m2!1sit!2sit!4v1766334152319!5m2!1sit!2sit',
    images: [ '/images/cobalt/cucina 1.png',
              '/images/cobalt/cucina2.png',
              '/images/cobalt/sala.png',
              '/images/cobalt/porta.png',
              '/images/cobalt/Camera da letto.png',
              '/images/cobalt/bagno1.png',
              '/images/cobalt/bagno2.png'
            ],
    description: { it: 'Ubicato a Cittiglio, a 20 km da Villa Panza, 33 km da Stazione Ferroviaria di Lugano e 35 km da Monastero di Torba, Appartamento Le Cascate 1° Piano è un alloggio che propone balcone e WiFi gratuito.\n\n Questo appartamento è a 35 km da Centro Esposizioni di Lugano e 38 km da Stazione Ferroviaria di Mendrisio.\n\n Questo appartamento con 1 camera da letto presenta un soggiorno con TV a schermo piatto, una cucina con utensili e 1 bagno.\n\n Parco Swissminiatur è a 39 km da questo appartamento, mentre Monte San Giorgio si trova a 45 km dalla struttura.\n Aeroporto di Milano Malpensa si trova a 35 km di distanza.'
      , en: 'Ideal for families.'
      , de: 'Ideal für Familien.' },
    amenities: { it: ['Wi-Fi','Balcone','Cucina Completa', 'Parcheggio pubblico', 'Accessori Bambini' ,'Smart TV', 'Asciugamani e Lenzuola'], 
      en: ['2 Bathrooms'], 
      de: ['2 Badezimmer'] }
  },
  {
    id: 'navy-garden-retreat',
    name: { it: 'Navy Garden Retreat', en: 'Navy Garden Retreat', de: 'Navy Garden Retreat' },
    tagline: { it: 'Relax nel verde a Cerro', en: 'Relax in the green in Cerro', de: 'Entspannung im Grünen' },
    location: 'Cerro di Laveno',
    price: 130,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 55,
    images: ['./img/navy/01.jpg'],
    description: { it: 'Giardino privato vicino alla spiaggia.', en: 'Private garden near the beach.', de: 'Privater Garten am Strand.' },
    amenities: { it: ['Giardino'], en: ['Garden'], de: ['Garten'] }
  }
];

export const UI_LABELS: Translations = {
  nav_residences: { it: 'Appartamenti', en: 'Apartments', de: 'Ferienwohnungen' },
  nav_history: { it: 'Il Concept', en: 'The Concept', de: 'Das Konzept' },
  nav_contact: { it: 'Prenota Ora', en: 'Book Now', de: 'Jetzt Buchen' },
  houses_title: { it: 'Le Nostre Dimore', en: 'Our Residences', de: 'Unsere Residenzen' },
  houses_subtitle: { it: 'Eleganza e comfort a due passi dal Lago Maggiore', en: 'Elegance and comfort steps away from the harbor.', de: 'Eleganz und Komfort nur wenige Schritte vom Hafen entfernt.' },
  price_from: { it: 'da', en: 'from', de: 'ab' },
  price_night: { it: '/ notte', en: '/ night', de: '/ Nacht' },
  exclusive_label: { it: 'Design Moderno', en: 'Modern Design', de: 'Modernes Design' },
  bedrooms: { it: 'Camere', en: 'Bedrooms', de: 'Schlafzimmer' },
  bathrooms: { it: 'Bagni', en: 'Bathrooms', de: 'Badezimmer' },
  living_space: { it: 'mq', en: 'sqm', de: 'qm' },
  experience_title: { it: 'Dettagli e Comfort', en: 'Details & Comfort', de: 'Details & Komfort' },
  amenities_title: { it: 'Dotazioni inclusi', en: 'Included Amenities', de: 'Inklusive Ausstattung' },
  availability_title: { it: 'Calendario Disponibilità', en: 'Availability Calendar', de: 'Belegungsplan' },
  neighborhood_title: { it: 'Dove Siamo', en: 'Where we are', de: 'Standort' },
  direct_only: { it: 'Tariffa Diretta', en: 'Direct Rate', de: 'Direktpreis' },
  best_rate: { it: 'Miglior Prezzo', en: 'Best Price', de: 'Bestpreis' },
  save_msg: { it: 'Prenotando qui risparmi il costo del portale.', en: 'By booking here you save the service fees.', de: 'Hier buchen und Servicegebühren sparen.' },
  whatsapp_resp: { it: 'Risposta Rapida', en: 'Quick Reply', de: 'Schnelle Antwort' },
  concierge_service: { it: 'Assistenza Personalizzata', en: 'Personal Assistance', de: 'Persönliche Assistenz' },
  cta_btn: { it: 'Verifica con Elsa', en: 'Check with Elsa', de: 'Anfrage bei Elsa' },
  host_status: { it: 'Host Professionista', en: 'Pro Host', de: 'Profi-Gastgeber' },
  host_online: { it: 'disponibile', en: 'online', de: 'erreichbar' },
  back: { it: 'Indietro', en: 'Back', de: 'Zurück' },
  sync_live: { it: 'Sincronizzazione...', en: 'Syncing...', de: 'Synchronisierung...' },
  sync_connected: { it: 'Live Calendar', en: 'Live Calendar', de: 'Live-Kalender' },
  available: { it: 'Libero', en: 'Available', de: 'Frei' },
  booked: { it: 'Occupato', en: 'Booked', de: 'Belegt' },
  last_sync: { it: 'Aggiornato', en: 'Updated', de: 'Aktualisiert' },
  chat_welcome: { it: "Benvenuti al Blu di Laveno! Sono Elsa, il vostro concierge. Come posso aiutarvi?", en: "Welcome to Il Blu di Laveno! I'm Elsa, your concierge. How can I help you today?", de: "Willkommen im Il Blu di Laveno! Ich bin Elsa. Wie kann ich Ihnen helfen?" },
  contact_human: { it: "Parla con Elsa", en: "Talk to Elsa", de: "Kontakt con Elsa" },
  contact_desc: { it: "Per prenotazioni dirette, gruppi o soggiorni lunghi, contattami direttamente su WhatsApp.", en: "For direct bookings, groups, or long stays, contact me directly via WhatsApp.", de: "Für Direktbuchungen, Gruppen oder Langzeitaufenthalte kontaktieren Sie mich direttamente per WhatsApp." }
};

export const STORY_CONTENT: StoryContent = {
  title: { it: 'Il Concept "Blu".', en: 'The "Blu" Concept.', de: 'Das "Blu" Konzept.' },
  quote: { it: '"L\'accoglienza è un\'arte che si tinge dei colori del lago."', en: '"Hospitality is an art colored by the lake shades."', de: '"Gastfreundschaft ist eine Form der Kunst in den Farben des Sees."' },
  paragraphs: {
    it: [
      'Il Blu di Laveno nasce dal desiderio di offrire un soggiorno che unisca la modernità del design alla tranquillità del Lago Maggiore.',
      'Ogni dettaglio è stato pensato per farvi sentire a casa, con il lusso di una posizione imbattibile nel cuore di Laveno.'
    ],
    en: [
      'Il Blu di Laveno was born from the desire to offer a stay combining modern design with the tranquility of Lake Maggiore.',
      'Every detail is designed to make you feel at home, with the luxury of an unbeatable location in the heart of Laveno.'
    ],
    de: [
      'Il Blu di Laveno entstand aus dem Wunsch, einen Aufenthalt zu bieten, der modernes Design mit der Ruhe des Lago Maggiore verbindet.',
      'Jedes Detail ist darauf ausgelegt, dass Sie sich wie zu Hause fühlen, gepaart mit dem Luxus einer unschlagbaren Lage.'
    ]
  },
  image: './img/story_cover.jpg'
};
