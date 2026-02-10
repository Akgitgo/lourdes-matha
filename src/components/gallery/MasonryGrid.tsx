"use client";

import { useState } from 'react';
import { MediaItem } from '@/lib/galleryData';
import MediaTile from './MediaTile';

interface MasonryGridProps {
    items: MediaItem[];
    onItemClick: (item: MediaItem) => void;
}

export default function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
    const [visibleCount, setVisibleCount] = useState(9);

    // Sort items to place videos in center positions (1, 4, 7, etc.)
    const sortedItems = [...items].sort((a, b) => {
        if (a.type === 'video' && b.type !== 'video') return -1;
        if (a.type !== 'video' && b.type === 'video') return 1;
        return 0;
    });

    // Reorder to place videos in center column
    const reorderedItems: typeof items = [];
    const videos = sortedItems.filter(item => item.type === 'video');
    const images = sortedItems.filter(item => item.type === 'image');

    let videoIndex = 0;
    let imageIndex = 0;

    for (let i = 0; i < sortedItems.length; i++) {
        // Place video in center column positions (1, 4, 7, 10, ...)
        if ((i % 3 === 1) && videoIndex < videos.length) {
            reorderedItems.push(videos[videoIndex++]);
        } else if (imageIndex < images.length) {
            reorderedItems.push(images[imageIndex++]);
        } else if (videoIndex < videos.length) {
            reorderedItems.push(videos[videoIndex++]);
        }
    }

    const visibleItems = reorderedItems.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 8, items.length));
    };

    return (
        <div>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {visibleItems.map(item => (
                    <div key={item.id} className="w-full">
                        <MediaTile item={item} onClick={() => onItemClick(item)} />
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="text-center mt-12">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
