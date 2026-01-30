import React, { useState } from 'react';
import { APARTMENTS } from '../constants';
import { Language } from '../types';

interface SearchFiltersProps {
  lang: Language;
  onFiltersChange: (filters: any) => void;
}

interface Filters {
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  amenities: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ lang, onFiltersChange }) => {
  const [filters, setFilters] = useState<Filters>({
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: 0,
    maxPrice: 200,
    bedrooms: 1,
    bathrooms: 1,
    location: '',
    amenities: []
  });

  const locations = [...new Set(APARTMENTS.map(apt => apt.location))];
  const allAmenities = [...new Set(APARTMENTS.flatMap(apt => apt.amenities[lang]))];

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    handleFilterChange('amenities', newAmenities);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
      <h3 className="text-xl font-bold mb-4">Search & Filter</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Check-in</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={filters.checkIn}
            onChange={(e) => handleFilterChange('checkIn', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Check-out</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={filters.checkOut}
            onChange={(e) => handleFilterChange('checkOut', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Guests</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filters.guests}
            onChange={(e) => handleFilterChange('guests', parseInt(e.target.value))}
          >
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', parseInt(e.target.value))}
          >
            <option value={0}>Any</option>
            {[1,2,3].map(n => <option key={n} value={n}>{`${n}+`}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={filters.bathrooms}
            onChange={(e) => handleFilterChange('bathrooms', parseInt(e.target.value))}
          >
            <option value={0}>Any</option>
            {[1,2].map(n => <option key={n} value={n}>{`${n}+`}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Price (€)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Price (€)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 200)}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {allAmenities.map(amenity => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="mr-2"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;