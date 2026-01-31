import { Apartment, SiteConfig, StoryContent, HeroContent, Translations } from './types';

export const CIN_CODES = ["CIN:IT012051B44A79OVIZ", "CIN:IT012087B4L6USBGHE", "CIN:IT012087B4ZRHJNMYA"];

export const SITE_CONFIG: SiteConfig = {
  name: 'Case Vacanze Lago Maggiore',
  hostName: 'Elsa & Aldo',
  whatsapp: '+393480325148',
  whatsapp2: '+393469718002',
  email: 'martinezelsa34@yahoo.it',
  email2: 'caravelli.aldo@gmail.com',
  locationLabel: {
    it: 'Laveno-Mombello, Lago Maggiore',
    en: 'Laveno-Mombello, Lake Maggiore',
    de: 'Laveno-Mombello, Lago Maggiore'
  },
  homeMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.786523178229!2d8.618451812543328!3d45.90883652697193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47867373f1d8212d%3A0xc06720138406f52!2sVia%20Labiena%2C%2021014%20Laveno-Mombello%20VA!5e0!3m2!1sit!2sit!4v1711111111111"
};

export const HERO_SECTION: HeroContent = {
  subtitle: { it: 'Vivere il Lago Maggiore', en: 'Experience Lake Maggiore', de: 'Erlebe den Lago Maggiore' },
  title1: { it: 'Case Vacanze', en: 'Holiday Homes', de: 'Ferienwohnungen' },
  title2: { it: 'Lago Maggiore', en: 'in Laveno.', de: 'in Laveno.' },
  description: {
    it: 'Scopri <strong class="font-bold text-blue-700">appartamenti indipendenti</strong>,<br>completamente moderni, arredati e confortevoli,<br>in posizioni <strong class="font-bold text-blue-700">strategiche</strong> a pochi minuti dal Lago Maggiore.<br>Vivi una vacanza senza pensieri tra lago e montagna.<br>La nostra gestione <strong class="font-bold text-blue-700">familiare</strong> garantisce un\'accoglienza calorosa e assistenza personale: siamo qui per te, davvero, quando ne hai bisogno.',
    en: 'Discover <strong class="font-bold text-blue-700">independent apartments</strong>,<br>completely modern, furnished and comfortable,<br>in <strong class="font-bold text-blue-700">strategic</strong> positions just minutes from Lake Maggiore.<br>Enjoy a carefree vacation between lake and mountain.<br>Our <strong class="font-bold text-blue-700">family</strong> management guarantees warm hospitality and personal assistance: we are here for you, really, when you need us.',
    de: 'Entdecken Sie <strong class="font-bold text-blue-700">unabhängige Apartments</strong>,<br>vollständig modern, möbliert und komfortabel,<br>in <strong class="font-bold text-blue-700">strategischen</strong> Lagen nur wenige Minuten vom Lago Maggiore entfernt.<br>Genießen Sie einen sorgenfreien Urlaub zwischen See und Bergen.<br>Unsere <strong class="font-bold text-blue-700">familiäre</strong> Leitung garantiert herzliche Gastfreundschaft und persönliche Betreuung: wir sind wirklich für Sie da, wenn Sie uns brauchen.'
  },
  buttonLabel: { it: 'Vedi Disponibilità', en: 'Check Availability', de: 'Verfügbarkeit prüfen' }
};

export const APARTMENTS: Apartment[] = [
  {
    id: 'azure-terrace-suite',
    name: { it: 'Il Blu di Laveno', en: 'Azure Terrace Suite', de: 'Azure Terrace Suite' },
    tagline: { it: 'Posizione Strategica', en: 'Light, Color and Panoramic View', de: 'Licht, Farbe und Panoramablick' },
    location: 'Laveno Centro',
    price: 110, 
    bedrooms: 1,
    bathrooms: 1,
    sqft: 65,
    maxGuests: 3,
    icalUrl: 'https://ical.booking.com/v1/export/t/e95dd962-d17c-4d29-8b5b-1e8235c1fe19.ics',
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
      de: 'Im pulsierenden Herzen von Laveno gelegen, besticht dieses Apartment durch seine mediterranen Farben. Das Hauptschlafzimmer empfängt die Gäste mit einem suggestiven klassischen künstlerischen Touch, während die moderne Küche jeden Komfort bietet.\n\nNur 26 km von der Villa Panza in Laveno entfernt, bietet Il Blu di Laveno Unterkunft mit Bergblick, kostenlosem WLAN und kostenlosem Privatparkplatz.\n\nDie Unterkunft bietet Gartenblick und liegt 38 km vom Bahnhof Lugano und 40 km vom Lugano Exhibition Center entfernt.\n\nDiese Wohnung umfasst 1 Schlafzimmer, ein Wohnzimmer, eine Küche mit Utensilien, Kühlschrank und Kaffeemaschine sowie 1 Badezimmer mit Bidet und Dusche.\n\nHandtücher und Bettwäsche werden in dieser Wohnung zur Verfügung gestellt.\n\nDer Flughafen Mailand Malpensa ist 39 km von der Unterkunft entfernt.' 
    },
    amenities: {
      it: ['Wi-Fi', 'Cucina Completa', 'Parcheggio gratuito', 'Accessori Bambini' ,'Smart TV', 'Asciugamani e Lenzuola'],
      en: ['Fiber Wi-Fi', 'Full Kitchen', 'AC', 'Harbor Proximity', 'Smart TV', 'Towels and Bed Linen', 'Baby Accessories', 'Free Parking'],
      de: ['Glasfaser-WLAN', 'Vollküche', 'Klimaanlage', 'Hafennähe', 'Smart TV', 'Handtücher und Bettwäsche', 'Babyzubehör', 'Kostenloser Parkplatz']
    }
  },
  {
    id: 'sapphire-studio-loft',
    name: { it: 'Verso il Lago', en: 'Sapphire Studio Loft', de: 'Sapphire Studio Loft' },
    tagline: { it: 'A due passi da Laveno Centro', en: 'Compact Elegance Waterfront', de: 'Kompakte Eleganz am Wasser' },
    location: 'Centro Laveno',
    price: 110,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 45,
    maxGuests: 3,
    icalUrl: 'https://ical.booking.com/v1/export?t=1cb3a14d-a13a-4833-8240-912478849846',
    googleMapsEmbedUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.1951895238008!2d8.621751575418575!3d45.90740720375946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4785d85f4c91828b%3A0x2da0159c0edad093!2sVia%20Ronco%20S.%20Maria%2C%202%2C%2021014%20Laveno-Mombello%20VA!5e0!3m2!1sit!2sit!4v1766251081015!5m2!1sit!2sit',
    images: ['/images/sapphire/foto-sala.JPG',
             '/images/sapphire/foto-sala_2.JPG',
             '/images/sapphire/foto-cucina.JPG',
             '/images/sapphire/foto_letto.JPG',
              '/images/sapphire/foto_sala_3.JPG'
    ],
    description: { it: 'Verso il Lago si trova a Laveno a 25 km da Villa Panza, 38 km da Stazione Ferroviaria di Lugano e 39 km da Monastero di Torba. La struttura presenta la vista sul giardino e il WiFi gratuito in tutta la struttura\n\nQuesto appartamento con balcone e vista sulla città offre 1 camera da letto, un soggiorno, una TV a schermo piatto, una cucina con frigorifero e piano cottura e 1 bagno con doccia.\n\nPresso questo appartamento troverete asciugamani e lenzuola tra i servizi disponibili.\n\n Centro Esposizioni di Lugano è a 40 km da questo appartamento, mentre Stazione Ferroviaria di Mendrisio si trova a 43 km dalla struttura.',
      en: 'Located in Laveno, just 25 km from Villa Panza, 38 km from Lugano Railway Station and 39 km from Monastero di Torba. The property features garden views and free WiFi throughout.\n\nThis apartment with balcony and city views offers 1 bedroom, a living room, a flat-screen TV, a kitchen with refrigerator and stovetop, and 1 bathroom with shower.\n\nTowels and bed sheets are available at this apartment.\n\nLugano Exhibition Center is 40 km from this apartment, while Mendrisio Railway Station is 43 km away.\n\nMilan Malpensa Airport is 39 km from the property.',
      de: 'Verso il Lago liegt in Laveno, nur 25 km von Villa Panza, 38 km vom Bahnhof Lugano und 39 km vom Monastero di Torba entfernt. Die Unterkunft bietet Gartenblick und kostenloses WLAN im gesamten Gebäude.\n\nDiese Wohnung mit Balkon und Stadtblick bietet 1 Schlafzimmer, ein Wohnzimmer, einen Flachbildfernseher, eine Küche mit Kühlschrank und Kochplatte sowie 1 Badezimmer mit Dusche.\n\nHandtücher und Bettwäsche sind in dieser Wohnung verfügbar.\n\nDas Lugano Exhibition Center ist 40 km von dieser Wohnung entfernt, während der Bahnhof Mendrisio 43 km entfernt ist.' },
    amenities: { it: ['Wi-Fi', 'Cucina Completa', 'Parcheggio pubblico', 'Accessori Bambini' ,'Smart TV', 'Asciugamani e Lenzuola']
      , en: ['Wi-Fi', 'Full Kitchen', 'Public Parking', 'Baby Accessories', 'Smart TV', 'Towels and Bed Sheets'], de: ['WLAN', 'Voll ausgestattete Küche', 'Öffentlicher Parkplatz', 'Babyzubehör', 'Smart TV', 'Handtücher und Bettwäsche'] }
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
    maxGuests: 3,
    icalUrl: 'https://ical.booking.com/v1/export?t=d4e0ddde-2c63-4b93-abd2-e3fec042a905',
    googleMapsEmbedUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11106.469538628786!2d8.642607051634423!3d45.898964948040216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4785d818b6619a69%3A0xbe185904dcfa784!2sVia%20Alpi%2C%209%2C%2021033%20Cittiglio%20VA!5e0!3m2!1sit!2sit!4v1766334152319!5m2!1sit!2sit',
    images: [ '/images/cobalt/cucina 1.png',
              '/images/cobalt/cucina2.png',
              '/images/cobalt/sala.png',
              '/images/cobalt/porta.png',
              '/images/cobalt/Camera da letto.png',
              '/images/cobalt/bagno1.png',
              '/images/cobalt/bagno2.png'
            ],
    description: { it: 'Ubicato a Cittiglio, a 20 km da Villa Panza, 33 km da Stazione Ferroviaria di Lugano e 35 km da Monastero di Torba, Appartamento Le Cascate 1° Piano è un alloggio che propone balcone e WiFi gratuito.\n\n Questo appartamento è a 35 km da Centro Esposizioni di Lugano e 38 km da Stazione Ferroviaria di Mendrisio.\n\n Questo appartamento con 1 camera da letto presenta un soggiorno con TV a schermo piatto, uma cucina con utensili e 1 bagno.\n\n Parco Swissminiatur è a 39 km da questo appartamento, mentre Monte San Giorgio si trova a 45 km dalla struttura.\n Aeroporto di Milano Malpensa si trova a 35 km di distanza.'
      , en: 'Located in Cittiglio, 20 km from Villa Panza, 33 km from Lugano Railway Station and 35 km from Monastero di Torba, the 1st Floor Le Cascate Apartment offers accommodation with balcony and free WiFi.\n\nThis apartment is 35 km from Lugano Exhibition Center and 38 km from Mendrisio Railway Station.\n\nThis 1-bedroom apartment features a living room with flat-screen TV, kitchen with utensils and 1 bathroom.\n\nSwissminiatur Park is 39 km from this apartment, while Monte San Giorgio is 45 km away.\nMilan Malpensa Airport is 35 km away.\n\nPerfect for families looking for a comfortable base to explore the Lake Maggiore region.'
      , de: 'Das Apartment Le Cascate 1. Stock liegt in Cittiglio, 20 km von Villa Panza, 33 km vom Bahnhof Lugano und 35 km vom Monastero di Torba entfernt und bietet Unterkunft mit Balkon und kostenlosem WLAN.\n\nDieses Apartment ist 35 km vom Lugano Exhibition Center und 38 km vom Bahnhof Mendrisio entfernt.\n\nDieses 1-Schlafzimmer-Apartment verfügt über ein Wohnzimmer mit Flachbildfernseher, Küche mit Utensilien und 1 Badezimmer.\n\nDer Swissminiatur Park ist 39 km von diesem Apartment entfernt, während der Monte San Giorgio 45 km entfernt ist.\nDer Flughafen Mailand Malpensa ist 35 km entfernt.' },
    amenities: { it: ['Wi-Fi','Balcone','Cucina Completa', 'Parcheggio pubblico', 'Accessori Bambini' ,'Smart TV', 'Asciugamani e Lenzuola'], 
      en: ['Wi-Fi', 'Balcony', 'Full Kitchen', 'Public Parking', 'Baby Accessories', 'Smart TV', 'Towels and Bed Linen'], 
      de: ['WLAN', 'Balkon', 'Voll ausgestattete Küche', 'Öffentlicher Parkplatz', 'Babyzubehör', 'Smart TV', 'Handtücher und Bettwäsche'] }
  },
  {
    id: 'navy-garden-retreat',
    name: { it: 'Cittiglio Le Cascate 2', en: 'Navy Garden Retreat', de: 'Navy Garden Retreat' },
    tagline: { it: 'Nel pieno centro storico di Cittiglio', en: 'Relax in the green in Cerro', de: 'Entspannung im Grünen' },
    location: 'Cittiglio Centro',
    price: 80,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 45,
    maxGuests: 3,
    icalUrl: 'https://ical.booking.com/v1/export?t=281c00e1-0da9-49f8-a98d-b7532b6e48bb',
    googleMapsEmbedUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11106.469538628786!2d8.642607051634423!3d45.898964948040216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4785d818b6619a69%3A0xbe185904dcfa784!2sVia%20Alpi%2C%209%2C%2021033%20Cittiglio%20VA!5e0!3m2!1sit!2sit!4v1766334152319!5m2!1sit!2sit',
    images: ['/images/navy/foto_sala.png',
             '/images/navy/foto_cucina.png',
             '/images/navy/foto_letto.png',
             '/images/navy/foto_bagno.png',
             '/images/navy/foto_bagno_2.jpg'],
    description: { it: 'Appartamento Le Cascate si trova a Cittiglio a 33 km da Stazione Ferroviaria di Lugano, 35 km da Monastero di Torba e 35 km da Centro Esposizioni di Lugano. \nLalloggio si trova a 20 km da Villa Panza e presenta il WiFi gratuito in tutta la struttura.\n\nQuesto appartamento prevede 1 camera da letto, 1 bagno, lenzuola, asciugamani, una TV a schermo piatto, una zona pranzo, una cucina con utensili e un patio con vista sulla montagna.\nStazione Ferroviaria di Mendrisio è a 38 km da questo appartamento, mentre Parco Swissminiatur si trova a 39 km di distanza. Aeroporto di Milano Malpensa si trova a 35 km dalla struttura.',
       en: 'Le Cascate Apartment is located in Cittiglio, 33 km from Lugano Railway Station, 35 km from Monastero di Torba and 35 km from Lugano Exhibition Center. The accommodation is 20 km from Villa Panza and features free WiFi throughout the property.\n\nThis apartment offers 1 bedroom, 1 bathroom, bed sheets, towels, a flat-screen TV, a dining area, a kitchen with utensils and a patio with mountain views.\n\nMendrisio Railway Station is 38 km from this apartment, while Swissminiatur Park is 39 km away. Milan Malpensa Airport is 35 km from the property.',
       de: 'Das Apartment Le Cascate liegt in Cittiglio, 33 km vom Bahnhof Lugano, 35 km vom Monastero di Torba und 35 km vom Lugano Exhibition Center entfernt. Die Unterkunft ist 20 km von Villa Panza entfernt und bietet kostenloses WLAN im gesamten Gebäude.\n\nDieses Apartment bietet 1 Schlafzimmer, 1 Badezimmer, Bettwäsche, Handtücher, einen Flachbildfernseher, einen Essbereich, eine Küche mit Utensilien und eine Terrasse mit Bergblick.\n\nDer Bahnhof Mendrisio ist 38 km von diesem Apartment entfernt, während der Swissminiatur Park 39 km entfernt ist. Der Flughafen Mailand Malpensa ist 35 km von der Unterkunft entfernt.' },
    amenities: { it: ['Wi-Fi','Giardino','Cucina Completa', 'Parcheggio pubblico', 'Accessori Bambini' ,'Smart TV', 'Asciugamani e Lenzuola'],
       en: ['Wi-Fi', 'Garden', 'Full Kitchen', 'Public Parking', 'Baby Accessories', 'Smart TV', 'Towels and Bed Linen'], 
       de: ['WLAN', 'Garten', 'Voll ausgestattete Küche', 'Öffentlicher Parkplatz', 'Babyzubehör', 'Smart TV', 'Handtücher und Bettwäsche'] }
  }
];

export const UI_LABELS: Translations = {
  nav_residences: { it: 'Appartamenti', en: 'Apartments', de: 'Ferienwohnungen' },
  nav_history: { it: 'Il Concept', en: 'The Concept', de: 'Das Konzept' },
  nav_contact: { it: 'Prenota Ora', en: 'Book Now', de: 'Jetzt Buchen' },
  houses_title: { it: 'Le Nostre Dimore', en: 'Our Residences', de: 'Unsere Residenzen' },
  houses_subtitle: { it: 'Appartamenti completamente attrezzati, per garantire la massima indipendenza', en: 'Elegance and comfort steps away from the harbor.', de: 'Eleganz und Komfort nur wenige Schritte vom Hafen entfernt.' },
  price_from: { it: 'da', en: 'from', de: 'ab' },
  price_night: { it: '/ notte', en: '/ night', de: '/ Nacht' },
  exclusive_label: { it: 'Design Moderno', en: 'Modern Design', de: 'Modernes Design' },
  bedrooms: { it: 'Camere', en: 'Bedrooms', de: 'Schlafzimmer' },
  bathrooms: { it: 'Bagni', en: 'Bathrooms', de: 'Badezimmer' },
  living_space: { it: 'mq', en: 'sqm', de: 'qm' },
  max_guests: { it: 'Ospiti Max', en: 'Max Guests', de: 'Max Gäste' },
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
  contact_human: { it: "Parla con Noi", en: "Talk to Us", de: "Kontakt mit uns" },
  contact_desc: { 
    it: "Per prenotazioni dirette, gruppi o soggiorni lunghi, contattaci direttamente:", 
    en: "For direct bookings, groups or long stays, contact us directly:", 
    de: "Für Direktbuchungen, Gruppen oder Langzeitaufenthalte kontaktieren Sie uns direkt:" 
  },
  distances_title: { it: 'Distanze da Laveno', en: 'Laveno Distances', de: 'Wo Wir Sind' },
  distances_subtitle: { it: 'Perfetta posizione per esplorare la regione', en: 'Perfect location to explore the region', de: 'Perfekte Lage um die Region zu erkunden' }
};

export const DISTANCES = {
  it: [
    { place: 'Varese', distance: '15 km', time: '20 min', icon: '🏙️' },
    { place: 'Malpensa', distance: '35 km', time: '40 min', icon: '✈️' },
    { place: 'Verbania', distance: '25 km', time: '30 min', icon: '🏞️' },
    { place: 'Svizzera', distance: '30 km', time: '35 min', icon: '🇨🇭' }
  ],
  en: [
    { place: 'Varese', distance: '15 km', time: '20 min', icon: '🏙️' },
    { place: 'Malpensa', distance: '35 km', time: '40 min', icon: '✈️' },
    { place: 'Verbania', distance: '25 km', time: '30 min', icon: '🏞️' },
    { place: 'Switzerland', distance: '30 km', time: '35 min', icon: '🇨🇭' }
  ],
  de: [
    { place: 'Varese', distance: '15 km', time: '20 min', icon: '🏙️' },
    { place: 'Malpensa', distance: '35 km', time: '40 min', icon: '✈️' },
    { place: 'Verbania', distance: '25 km', time: '30 min', icon: '🏞️' },
    { place: 'Schweiz', distance: '30 km', time: '35 min', icon: '🇨🇭' }
  ]
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