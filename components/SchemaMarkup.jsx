import React, { useEffect } from 'react';

const SchemaMarkup = ({ page = 'home', apartment = null, lang = 'it' }) => {
  useEffect(() => {
    // Remove existing schema scripts injected by this component
    document.querySelectorAll('script[data-schema-markup]').forEach(el => el.remove());

    if (page === 'home') {
      // LodgingBusiness schema for homepage
      const lodgingBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        'name': 'Laveno Lake House',
        'url': 'https://www.lavenolakehouse.com',
        'telephone': '+393480325148',
        'email': 'caravelli.aldo@gmail.com',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Laveno Mombello',
          'addressRegion': 'VA',
          'postalCode': '21014',
          'addressCountry': 'IT'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 45.9088,
          'longitude': 8.6185
        },
        'priceRange': '€€',
        'numberOfRooms': 4,
        'checkInTime': '15:00',
        'checkOutTime': '10:00',
        'amenityFeature': [
          { '@type': 'Text', 'name': 'WiFi' },
          { '@type': 'Text', 'name': 'Parcheggio gratuito' },
          { '@type': 'Text', 'name': 'Cucina attrezzata' },
          { '@type': 'Text', 'name': 'Smart TV' }
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'Customer Service',
          'telephone': '+393480325148',
          'email': 'caravelli.aldo@gmail.com',
          'availableLanguage': ['it', 'en', 'de']
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'ratingCount': '127'
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema-markup', 'true');
      script.textContent = JSON.stringify(lodgingBusinessSchema);
      document.head.appendChild(script);

    } else if (apartment && page !== 'home') {
      // Apartment schema
      const apartmentSchema = {
        '@context': 'https://schema.org',
        '@type': 'Apartment',
        'name': apartment.name ? apartment.name[lang] : '',
        'url': `https://www.lavenolakehouse.com${lang !== 'it' ? '/' + lang : ''}/appartamenti/${page}`,
        'description': `Modern apartment in ${apartment.location}, ${apartment.sqft}sqm, from €${apartment.price}/night`,
        'image': apartment.firstImage ? `https://www.lavenolakehouse.com${apartment.firstImage}` : '',
        'priceSpecification': {
          '@type': 'PriceSpecification',
          'priceCurrency': 'EUR',
          'price': apartment.price.toString(),
          'eligibleDuration': 'PT1N'
        },
        'floorSize': {
          '@type': 'QuantitativeValue',
          'value': apartment.sqft,
          'unitCode': 'MTK'
        },
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': apartment.location,
          'addressCountry': 'IT'
        },
        'amenityFeature': [
          { '@type': 'Text', 'name': 'WiFi' },
          { '@type': 'Text', 'name': 'Parcheggio' },
          { '@type': 'Text', 'name': 'Cucina' },
          { '@type': 'Text', 'name': 'Smart TV' }
        ]
      };

      const aptScript = document.createElement('script');
      aptScript.type = 'application/ld+json';
      aptScript.setAttribute('data-schema-markup', 'true');
      aptScript.textContent = JSON.stringify(apartmentSchema);
      document.head.appendChild(aptScript);

      // BreadcrumbList schema
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': lang === 'it' ? 'Home' : lang === 'de' ? 'Startseite' : 'Home',
            'item': `https://www.lavenolakehouse.com${lang !== 'it' ? '/' + lang : ''}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': lang === 'it' ? 'Appartamenti' : lang === 'de' ? 'Wohnungen' : 'Apartments',
            'item': `https://www.lavenolakehouse.com${lang !== 'it' ? '/' + lang : ''}/`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': apartment.name ? apartment.name[lang] : '',
            'item': `https://www.lavenolakehouse.com${lang !== 'it' ? '/' + lang : ''}/appartamenti/${page}`
          }
        ]
      };

      const breadScript = document.createElement('script');
      breadScript.type = 'application/ld+json';
      breadScript.setAttribute('data-schema-markup', 'true');
      breadScript.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadScript);
    }

    // Cleanup: remove scripts when component unmounts
    return () => {
      document.querySelectorAll('script[data-schema-markup]').forEach(el => el.remove());
    };

  }, [page, apartment, lang]);

  return null;
};

export default SchemaMarkup;
