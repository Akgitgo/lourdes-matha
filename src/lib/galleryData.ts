export interface MediaItem {
    id: string;
    type: 'image' | 'video';
    category: 'residents' | 'facilities' | 'testimonials';
    src: string;
    poster?: string;
    alt: string;
    title: string;
    caption?: string;
    width: number;
    height: number;
    featured?: boolean;
    consentSigned?: boolean;
    duration?: string;
    date?: string;
    objectPosition?: string;
}

export const galleryItems: MediaItem[] = [
    // Residents - Featured
    {
        id: 'res-1',
        type: 'image',
        category: 'residents',
        src: '/images/residents-1.jpeg',
        alt: 'Happy residents enjoying morning yoga session',
        title: 'Opening Ceremony',
        caption: 'Celebrating the grand opening of Grace Garden with community members and well-wishers',
        width: 1200,
        height: 800,
        featured: true,
        consentSigned: true,
        date: '2024-12-01'
    },
    {
        id: 'res-4',
        type: 'video',
        category: 'residents',
        src: '/videos/residents-activity.mp4',
        poster: '/images/residents-4-poster.jpg',
        alt: 'Group activity session',
        title: 'Activity Time',
        width: 1920,
        height: 1080,
        duration: '2:15',
        consentSigned: true
    },
    {
        id: 'res-2',
        type: 'image',
        category: 'residents',
        src: '/images/residents-2.jpeg',
        alt: 'Residents celebrating festival together',
        title: 'Festival Celebration',
        caption: 'Community gatherings create lasting memories',
        width: 1200,
        height: 900,
        featured: true,
        consentSigned: true,
        date: '2024-11-28'
    },
    {
        id: 'res-3',
        type: 'image',
        category: 'residents',
        src: '/images/residents-3.jpeg',
        alt: 'Residents enjoying Blessing Event',
        title: 'Blessing Event',
        width: 800,
        height: 600,
        consentSigned: true
    },
    {
        id: 'res-7',
        type: 'video',
        category: 'residents',
        src: '/videos/happyresidents.mp4',
        poster: '/images/residents-1.jpeg',
        alt: 'Happy residents daily life moments',
        title: 'Happy Residents',
        width: 1920,
        height: 1080,
        duration: '2:30',
        consentSigned: true
    },
    {
        id: 'res-5',
        type: 'image',
        category: 'residents',
        src: '/images/Exterior-View.jpg',
        alt: 'Exterior View of GG',
        title: 'Exterior View',
        width: 900,
        height: 600,
        consentSigned: true
    },
    // Facilities - Featured
    {
        id: 'fac-1',
        type: 'image',
        category: 'facilities',
        src: '/images/facility-1.jpg',
        alt: 'Spacious dining hall with natural lighting',
        title: 'Private Dining',
        caption: 'Nutritious meals in a welcoming space',
        width: 1200,
        height: 800,
        featured: true,
        consentSigned: true,
        date: '2024-12-02'
    },
    {
        id: 'fac-4',
        type: 'video',
        category: 'facilities',
        src: '/videos/facility-tour.mp4',
        poster: '/images/facility-4-poster.jpg',
        alt: 'Facility tour video',
        title: 'Room Tour',
        width: 1920,
        height: 1080,
        duration: '3:45',
        consentSigned: true
    },
    {
        id: 'fac-elegant',
        type: 'image',
        category: 'facilities',
        src: '/images/elegantroom.JPG',
        alt: 'Elegant room with modern furnishings',
        title: 'Elegant Room',
        width: 1200,
        height: 800,
        consentSigned: true
    },
    {
        id: 'fac-elite',
        type: 'image',
        category: 'facilities',
        src: '/images/eliteroom.jpeg',
        alt: 'Elite room with premium amenities',
        title: 'Elite Room',
        width: 1200,
        height: 800,
        consentSigned: true
    },
    {
        id: 'fac-7',
        type: 'video',
        category: 'facilities',
        src: '/videos/facilitiesandroom.mp4',
        poster: '/images/facility-1.jpg',
        alt: 'Facilities and room tour',
        title: 'Facilities Tour',
        width: 1920,
        height: 1080,
        duration: '3:00',
        consentSigned: true
    },
    {
        id: 'fac-luxury',
        type: 'image',
        category: 'facilities',
        src: '/images/luxuryroom.JPG',
        alt: 'Luxury room with high-end features',
        title: 'Luxury Room',
        width: 1200,
        height: 800,
        consentSigned: true
    },
    {
        id: 'fac-recreation',
        type: 'image',
        category: 'facilities',
        src: '/images/entertainmenthall (2).JPG',
        alt: 'Recreation area for activities and entertainment',
        title: 'Entertainment Hall',
        width: 1200,
        height: 800,
        consentSigned: true
    },
    {
        id: 'fac-3',
        type: 'image',
        category: 'facilities',
        src: '/images/washroom.JPG',
        alt: 'Clean and accessible attached washroom',
        title: 'Attached Washroom',
        width: 1200,
        height: 700,
        consentSigned: true
    },
    {
        id: 'fac-6',
        type: 'image',
        category: 'facilities',
        src: '/images/Emergency-Room.jpg',
        alt: 'Medical care room',
        title: 'Medical Care',
        width: 900,
        height: 700,
        consentSigned: true
    }
];
