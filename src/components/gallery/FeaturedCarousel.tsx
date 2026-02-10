"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem } from '@/lib/galleryData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedCarouselProps {
    items: MediaItem[];
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
    };

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];

    return (
        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentItem.type === 'video' && currentItem.poster ? currentItem.poster : currentItem.src}
                        alt={currentItem.alt}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
                            {currentItem.title}
                        </h3>
                        {currentItem.caption && (
                            <p className="text-lg text-white/90 mb-6 max-w-2xl hidden md:block">
                                {currentItem.caption}
                            </p>
                        )}
                        <a
                            href="#contact"
                            className="inline-flex px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg transition-all duration-300"
                        >
                            Schedule a Visit
                        </a>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {items.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
