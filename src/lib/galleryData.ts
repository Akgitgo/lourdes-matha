export interface MediaItem {
    id: string;
    type: 'image' | 'video';
    category: 'facilities' | 'moments' | 'environment';
    src: string;
    poster?: string;
    alt: string;
    title: string;
    caption?: string;
    width: number;
    height: number;
    featured?: boolean;
    duration?: string;
    date?: string;
}

export const galleryItems: MediaItem[] = [
    // Videos (Environment/Farm)
    {
        id: 'vid-1',
        type: 'video',
        category: 'environment',
        src: '/videos/video1atfarm.mp4',
        poster: '/images/hospital.jpeg',
        alt: 'Beautiful farm environment at Lourdes Matha',
        title: 'Our Natural Surroundings',
        caption: 'A peaceful environment that complements the healing process.',
        width: 1920,
        height: 1080,
        duration: '0:45',
        featured: true,
        date: '2024-12-15'
    },
    {
        id: 'vid-2',
        type: 'video',
        category: 'environment',
        src: '/videos/video2atfarm.mp4',
        poster: '/images/entrance.jpeg',
        alt: 'Lush greenery at the hospital premises',
        title: 'Healing with Nature',
        caption: 'Experiencing serenity amidst nature.',
        width: 1920,
        height: 1080,
        duration: '1:02',
        date: '2024-12-15'
    },
    // Facilities (Images)
    {
        id: 'fac-1',
        type: 'image',
        category: 'facilities',
        src: '/images/hospital.jpeg',
        alt: 'Lourdes Matha Ayurvedic Hospital Building',
        title: 'Our Hospital',
        caption: 'The main building providing a sanctuary for healing.',
        width: 1200,
        height: 800,
        featured: true,
        date: '2024-12-15'
    },
    {
        id: 'fac-2',
        type: 'image',
        category: 'facilities',
        src: '/images/exterior.jpeg',
        alt: 'Hospital Exterior View',
        title: 'Exterior View',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'fac-3',
        type: 'image',
        category: 'facilities',
        src: '/images/entrance.jpeg',
        alt: 'Hospital Entrance',
        title: 'Entrance',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'fac-4',
        type: 'image',
        category: 'facilities',
        src: '/images/reception2.jpeg',
        alt: 'Hospital Reception Area',
        title: 'Warm Welcome',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'fac-5',
        type: 'image',
        category: 'facilities',
        src: '/images/internalroom1.jpeg',
        alt: 'Comfortable Patient Room',
        title: 'Patient Accommodations',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'fac-6',
        type: 'image',
        category: 'facilities',
        src: '/images/beds.jpeg',
        alt: 'Treatment Rooms and Beds',
        title: 'Treatment Facilities',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'fac-7',
        type: 'image',
        category: 'facilities',
        src: '/images/treehouse.jpeg',
        alt: 'Tree House at Hospital',
        title: 'Unique Spaces',
        width: 1200,
        height: 1600,
        date: '2024-12-15'
    },
    // Moments of Joy (Images)
    {
        id: 'mom-1',
        type: 'image',
        category: 'moments',
        src: '/images/festivalcelebration.jpeg',
        alt: 'Festival Celebrations at Hospital',
        title: 'Community & Culture',
        caption: 'Celebrating traditions together.',
        width: 1200,
        height: 800,
        featured: true,
        date: '2024-12-15'
    },
    {
        id: 'mom-2',
        type: 'image',
        category: 'moments',
        src: '/images/christmascelebration2.jpeg',
        alt: 'Christmas Celebrations',
        title: 'Joyful Moments',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'mom-3',
        type: 'image',
        category: 'moments',
        src: '/images/openingceremony.jpeg',
        alt: 'Opening Ceremony',
        title: 'Our Journey Beginning',
        width: 1200,
        height: 800,
        date: '2024-12-01'
    },
    {
        id: 'mom-4',
        type: 'image',
        category: 'moments',
        src: '/images/candid1.jpeg',
        alt: 'Candid Moments',
        title: 'Shared Smiles',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'mom-5',
        type: 'image',
        category: 'moments',
        src: '/images/candid2.jpeg',
        alt: 'Healing with Compassion',
        title: 'Care & Compassion',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'mom-6',
        type: 'image',
        category: 'moments',
        src: '/images/celebration.jpeg',
        alt: 'Hospital Celebrations',
        title: 'Festive Spirit',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'mom-7',
        type: 'image',
        category: 'moments',
        src: '/images/christmsacelebration1.jpeg',
        alt: 'Christmas Gathering',
        title: 'Holiday Cheer',
        width: 1200,
        height: 800,
        date: '2024-12-25'
    },
    {
        id: 'mom-8',
        type: 'image',
        category: 'moments',
        src: '/images/festival3.jpeg',
        alt: 'Cultural Festival',
        title: 'Cultural Heritage',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'mom-9',
        type: 'image',
        category: 'moments',
        src: '/images/opening2.jpeg',
        alt: 'Inauguration Moments',
        title: 'New Beginnings',
        width: 1200,
        height: 800,
        date: '2024-12-01'
    },
    {
        id: 'mom-10',
        type: 'image',
        category: 'moments',
        src: '/images/speech.jpeg',
        alt: 'Inspirational Talk',
        title: 'Sharing Knowledge',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    },
    {
        id: 'mom-11',
        type: 'image',
        category: 'moments',
        src: '/images/onamcelebration.jpeg',
        alt: 'Onam Celebrations',
        title: 'Onam Celebration',
        width: 1200,
        height: 800,
        date: '2024-12-15'
    }
];
