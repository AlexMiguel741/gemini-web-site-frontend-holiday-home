
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
  // Added to resolve type error when defining SITE_CONFIG and accessing it in App.tsx
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
  price: string; 
  bedrooms: number;
  bathrooms: number;
  sqft: number;
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
