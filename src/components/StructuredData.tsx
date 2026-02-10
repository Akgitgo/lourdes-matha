export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Hospital",
        "@id": "https://lourdesmatha.com/#organization",
        "name": "Lourdes Matha Ayurvedic Hospital",
        "alternateName": "LMAH",
        "url": "https://lourdesmatha.com",
        "logo": {
            "@type": "ImageObject",
            "url": "https://lourdesmatha.com/images/logo.jpeg",
            "width": 1200,
            "height": 400,
            "caption": "Lourdes Matha Ayurvedic Hospital Logo"
        },
        "image": [
            "https://lourdesmatha.com/images/logo.jpeg"
        ],
        "description": "Lourdes Matha Ayurvedic Hospital offers authentic Panchakarma therapies, traditional Ayurvedic treatments, and holistic wellness programs in Wayanad, Kerala. Expert doctors, personalized care, and natural healing in a serene environment.",
        "telephone": "+91-91007-73861",
        "email": "lourdesmathaayurvedichospital@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sulthan Bathery",
            "addressLocality": "Wayanad",
            "addressRegion": "Kerala",
            "postalCode": "673592",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "11.65966184619653",
            "longitude": "76.24989979607791"
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "11.65966184619653",
                "longitude": "76.24989979607791"
            },
            "geoRadius": "50000"
        },
        "priceRange": "Contact for pricing",
        "sameAs": [
            "https://www.facebook.com/lourdesmatha",
            "https://www.instagram.com/lourdesmatha"
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
        "@id": "https://lourdesmatha.com/#website",
        "url": "https://lourdesmatha.com",
        "name": "Lourdes Matha Ayurvedic Hospital",
        "description": "Authentic Ayurvedic Treatment & Panchakarma Therapies in Wayanad, Kerala",
        "publisher": {
            "@id": "https://lourdesmatha.com/#organization"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://lourdesmatha.com/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "Hospital",
        "@id": "https://lourdesmatha.com/#business",
        "name": "Lourdes Matha Ayurvedic Hospital",
        "image": [
            "https://lourdesmatha.com/images/logo.jpeg"
        ],
        "logo": "https://lourdesmatha.com/images/logo.jpeg",
        "url": "https://lourdesmatha.com",
        "telephone": "+91-91007-73861",
        "email": "lourdesmathaayurvedichospital@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sulthan Bathery",
            "addressLocality": "Wayanad",
            "addressRegion": "Kerala",
            "postalCode": "673592",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "11.65966184619653",
            "longitude": "76.24989979607791"
        },
        "priceRange": "Contact for pricing",
        "amenityFeature": [
            {
                "@type": "LocationFeatureSpecification",
                "name": "Panchakarma Therapy"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Traditional Ayurvedic Treatment"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Expert Ayurvedic Doctors"
            },
            {
                "@type": "LocationFeatureSpecification",
                "name": "Holistic Wellness Programs"
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
