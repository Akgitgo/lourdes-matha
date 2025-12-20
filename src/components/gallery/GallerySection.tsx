"use client";

import { useState, useMemo } from 'react';
import { galleryItems, MediaItem } from '@/lib/galleryData';
import { generateImageSchema, generateVideoSchema } from '@/lib/gallerySchema';
import FeaturedCarousel from './FeaturedCarousel';
import TabFilters from './TabFilters';
import MasonryGrid from './MasonryGrid';
import LightboxModal from './LightboxModal';
import { AnimatePresence } from 'framer-motion';

export default function GallerySection() {
    const [activeTab, setActiveTab] = useState<'residents' | 'facilities'>('residents');
    const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos'>('all');
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    // Featured items
    const featuredItems = useMemo(() =>
        galleryItems.filter(item => item.featured),
        []
    );

    // Filtered items
    const filteredItems = useMemo(() => {
        return galleryItems.filter(item => {
            if (item.category !== activeTab) return false;
            if (activeFilter === 'images' && item.type !== 'image') return false;
            if (activeFilter === 'videos' && item.type !== 'video') return false;
            return true;
        });
    }, [activeTab, activeFilter]);

    // JSON-LD for top 3 featured items
    const jsonLdSchemas = featuredItems.slice(0, 3).map(item =>
        item.type === 'image' ? generateImageSchema(item) : generateVideoSchema(item)
    );

    return (
        <section id="gallery" className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header - matches Services */}
                <div className="text-center mb-16">
                    <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                        OUR GALLERY
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-6">
                        Moments of joy and comfort
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Discover the warmth and vibrancy of life at Grace Garden through our photo and video gallery.
                    </p>
                </div>

                {/* Featured Carousel */}
                <FeaturedCarousel items={featuredItems} />

                {/* Tabs & Filters */}
                <TabFilters
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                {/* Masonry Grid */}
                <MasonryGrid items={filteredItems} onItemClick={setSelectedItem} />

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedItem && (
                        <LightboxModal
                            item={selectedItem}
                            onClose={() => setSelectedItem(null)}
                        />
                    )}
                </AnimatePresence>

                {/* JSON-LD Structured Data */}
                {jsonLdSchemas.map((schema, idx) => (
                    <script
                        key={idx}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
                ))}
            </div>
        </section>
    );
}
