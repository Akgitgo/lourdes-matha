"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Star, Quote, Play } from 'lucide-react';
import Image from 'next/image';
import LightboxModal from './gallery/LightboxModal';
import { MediaItem } from '@/lib/galleryData';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

    // Auto-swipe logic
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
        }, 8000); // 8 seconds per slide
        return () => clearInterval(interval);
    }, [isPaused]);

    const visuals: MediaItem[] = [
        {
            id: 't1',
            type: 'image',
            src: '/images/test1.jpg',
            alt: 'Testimonial image 1',
            title: 'Diabetic Camp',
            category: 'testimonials',
            width: 1920,
            height: 1080
        },
        {
            id: 't2',
            type: 'image',
            src: '/images/testimonials3.jpeg',
            alt: 'Community gathering',
            title: 'Community Bond',
            category: 'testimonials',
            width: 1200,
            height: 800
        },
        {
            id: 't3',
            type: 'image',
            src: '/images/test2.jpg',
            alt: 'Testimonial image 2',
            title: 'Peaceful Living',
            category: 'testimonials',
            width: 1920,
            height: 1080,
            objectPosition: 'right center'
        },
    ];

    const reviews = [
        {
            text: "It was such a pleasant and beautiful surprise. But really happy for you if this is what you had always wanted to do... wishing you all success. May this venture help you reach your goals, bring you happiness, peace and blessings.",
            author: "Juliet",
            role: "Daughter • Dubai"
        },
        {
            text: "I am so happy to hear this wonderful news from you. Take this opportunity to wish you all the very best in your maiden and bold step. May God give you all the courage and strength to take this new venture to its pinnacle of success.",
            author: "Shaji Vamadevan",
            role: "CEO VST • Bangalore"
        },
        {
            text: "Ellam bhangiyayi aakatte. Daivathinte anugrahamode ella karyangalum sundaramaayi nadannukondirikatte. Ente hridayathil ninnulla prarthanakalum aashamsakalum ningalodoppam endinum undayirikkatte.",
            author: "Malliyoor Divakaran Thirumeni",
            role: "Kottayam"
        }
    ];

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -50) {
            // Swipe Left -> Next
            setCurrentIndex(1);
        } else if (info.offset.x > 50) {
            // Swipe Right -> Prev
            setCurrentIndex(0);
        }
    };

    return (
        <section id="testimonials" className="py-20 px-4 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                        TESTIMONIALS
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-4">
                        Stories of Trust & Love
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Hear from families who have entrusted us with their most precious relationships.
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative min-h-[500px]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        {currentIndex === 0 ? (
                            /* Slide 1: Visuals */
                            <motion.div
                                key="visuals"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={handleDragEnd}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-grab active:cursor-grabbing"
                            >
                                {visuals.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
                                        onClick={() => setSelectedMedia(item)}
                                    >
                                        {item.type === 'video' ? (
                                            <>
                                                <video
                                                    src={item.src}
                                                    className="w-full h-full object-cover"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                                {/* Play Icon Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/50">
                                                        <Play size={32} fill="currentColor" />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                style={{ objectPosition: (item as any).objectPosition || 'center' }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-6 left-6 pointer-events-none">
                                            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/30">
                                                {item.title}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            /* Slide 2: Reviews */
                            <motion.div
                                key="reviews"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={handleDragEnd}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-grab active:cursor-grabbing"
                            >
                                {reviews.map((review, idx) => (
                                    <div key={idx} className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <div className="flex-grow">
                                            <Quote className="text-primary/20 mb-4 rotate-180" size={32} />
                                            <p className="text-slate-700 leading-relaxed italic mb-6">
                                                &quot;{review.text}&quot;
                                            </p>
                                        </div>
                                        <div className="mt-auto pt-6 border-t border-slate-200">
                                            <h4 className="font-bold text-slate-900">{review.author}</h4>
                                            <p className="text-sm text-slate-500">{review.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {[0, 1].map((idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-primary w-8' : 'bg-slate-300 hover:bg-slate-400'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedMedia && (
                    <LightboxModal
                        item={selectedMedia}
                        onClose={() => setSelectedMedia(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
