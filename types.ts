
export type Language = 'it' | 'en' | 'de';

export interface LocalizedString {
  it: string;
  en: string;
  de: string;
}

export interface LocalizedArray {
  it: string[];
  en: string[];
  de: string[];
}

export interface SiteConfig {
  name: string;
  hostName: string;
  whatsapp: string;
  email: string;
  locationLabel: LocalizedString;
  homeMapEmbedUrl: string;
}

export interface HeroContent {
  subtitle: LocalizedString;
  title1: LocalizedString;
  title2: LocalizedString;
  description: LocalizedString;
  buttonLabel: LocalizedString;
}

export interface StoryContent {
  title: LocalizedString;
  quote: LocalizedString;
  paragraphs: LocalizedArray;
  image: string;
}

export interface Apartment {
  id: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  price: number; // Modificato in numero per facilità di aggiornamento
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  maxGuests: number;
  location: string;
  amenities: LocalizedArray;
  images: string[];
  icalUrl?: string;
  googleMapsEmbedUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Translations {
  [key: string]: LocalizedString;
}
