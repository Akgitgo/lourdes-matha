export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "HealthAndBeautyBusiness",
        "@id": "https://gracegarden.co.in/#organization",
        "name": "Grace Garden",
        "alternateName": "Grace Garden Elder Care",
        "url": "https://gracegarden.co.in",
        "logo": {
            "@type": "ImageObject",
            "url": "https://gracegarden.co.in/images/Logo.jpg",
            "width": 1200,
            "height": 400,
            "caption": "Grace Garden Logo"
        },
        "image": [
            "https://gracegarden.co.in/images/Logo.jpg",
            "https://gracegarden.co.in/images/Logo.jpg"
        ],
        "description": "Grace Garden offers compassionate assisted living and home care services for seniors in Wayanad, Kerala. 24/7 medical care, nutritious meals, cultural activities, and comfortable accommodation options in a serene environment.",
        "telephone": "+91-8089000467",
        "email": "gracegarden.care@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vellamunda",
            "addressLocality": "Meenangadi",
            "addressRegion": "Kerala",
            "postalCode": "673591",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "11.7540",
            "longitude": "76.0392"
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "11.7540",
                "longitude": "76.0392"
            },
            "geoRadius": "50000"
        },
        "priceRange": "Contact for pricing",
        "sameAs": [
            "https://www.facebook.com/gracegarden",
            "https://www.instagram.com/gracegarden"
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://gracegarden.co.in/#website",
        "url": "https://gracegarden.co.in",
        "name": "Grace Garden",
        "description": "Professional Elder Care & Assisted Living in Wayanad, Kerala",
        "publisher": {
            "@id": "https://gracegarden.co.in/#organization"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://gracegarden.co.in/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "AssistedLivingFacility",
        "@id": "https://gracegarden.co.in/#business",
        "name": "Grace Garden",
        "image": [
            "https://gracegarden.co.in/images/Logo.jpg",
            "https://gracegarden.co.in/images/facility-1.jpg",
            "https://gracegarden.co.in/images/residents-1.jpeg"
        ],
        "logo": "https://gracegarden.co.in/images/Logo.jpg",
        "url": "https://gracegarden.co.in",
        "telephone": "+91-8089000467",
        "email": "gracegarden.care@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vellamunda",
            "addressLocality": "Meenangadi",
            "addressRegion": "Kerala",
            "postalCode": "673591",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "11.7540",
            "longitude": "76.0392"
        },
        "priceRange": "Contact for pricing",
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": "24/7 Medical Care"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Nutritious Meals"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Cultural Activities"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Emergency Response"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema)
                }}
            />
        </>
    );
}
