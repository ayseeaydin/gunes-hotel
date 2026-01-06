import React from 'react'
import { Helmet } from 'react-helmet-async'

const StructuredData = ({ type = 'hotel', page = 'home' }) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Güneş Hotel",
    "description": "UNESCO Dünya Mirası Nemrut Dağı'na sadece 2 km mesafede konforlu konaklama. 1980'lerden beri aile işletmesi.",
    "image": [
      "https://guneshotel.com/img/motel.webp",
      "https://guneshotel.com/img/slide-1.webp",
      "https://guneshotel.com/img/slide-2.webp"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nemrut Dağı Yolu",
      "addressLocality": "Kahta",
      "addressRegion": "Adıyaman",
      "postalCode": "02400",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.9853",
      "longitude": "38.7429"
    },
    "url": "https://guneshotel.com",
    "telephone": "+90-555-123-4567",
    "priceRange": "₺₺",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "24 Saat Sıcak Su"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Ücretsiz WiFi"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Dağ Manzarası"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Ücretsiz Otopark"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Kahvaltı"
      }
    ],
    "checkinTime": "14:00",
    "checkoutTime": "12:00"
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://guneshotel.com"
      }
    ]
  }

  if (page === 'rooms') {
    breadcrumbData.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Odalarımız",
      "item": "https://guneshotel.com/rooms"
    })
  } else if (page === 'gallery') {
    breadcrumbData.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Galeri",
      "item": "https://guneshotel.com/gallery"
    })
  } else if (page === 'about') {
    breadcrumbData.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Hakkımızda",
      "item": "https://guneshotel.com/about"
    })
  } else if (page === 'contact') {
    breadcrumbData.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "İletişim",
      "item": "https://guneshotel.com/contact"
    })
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Güneş Hotel",
    "url": "https://guneshotel.com",
    "logo": "https://guneshotel.com/img/logo.webp",
    "sameAs": [
      "https://www.facebook.com/guneshotel",
      "https://www.instagram.com/guneshotel"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-555-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Turkish", "English", "Italian"]
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(baseData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  )
}

export default StructuredData
