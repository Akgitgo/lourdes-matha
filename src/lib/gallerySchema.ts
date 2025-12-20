import { MediaItem } from './galleryData';

export function generateImageSchema(item: MediaItem) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: item.src,
        name: item.title,
        description: item.alt,
        caption: item.caption || item.title,
        datePublished: item.date,
        width: item.width,
        height: item.height
    };
}

export function generateVideoSchema(item: MediaItem) {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        contentUrl: item.src,
        name: item.title,
        description: item.alt,
        thumbnailUrl: item.poster,
        uploadDate: item.date,
        duration: item.duration
    };
}
