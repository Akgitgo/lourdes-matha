"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TherapyCarouselProps {
    items: {
        title: string;
        description: string;
        image: string;
        objectPosition?: string;
    }[];
    getIcon: (index: number) => React.ReactNode;
}

export default function TherapyCarousel({ items, getIcon }: TherapyCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Simple navigation
    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-12 py-12 group">
            {/* Desktop / Tablet Grid View (Static/Hidden on Mobile) */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {items.map((item, idx) => (
                    <Card key={idx} item={item} icon={getIcon(idx)} />
                ))}
            </div>

            {/* Mobile Swipe View (1 Card at a time, Only visible on small screens) */}
            <div className="sm:hidden relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -50) next();
                            else if (info.offset.x > 50) prev();
                        }}
                        className="w-full cursor-grab active:cursor-grabbing"
                    >
                        <Card item={items[currentIndex]} icon={getIcon(currentIndex)} />
                    </motion.div>
                </AnimatePresence>

                {/* Mobile indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#B8860B]' : 'w-2 bg-[#B8860B]/20'
                                }`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

function Card({ item, icon }: { item: any; icon: React.ReactNode }) {
    return (
        <div className="bg-[#FAF3E0] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-[#B8860B]/10 shadow-lg hover:shadow-2xl transition-all duration-700 flex flex-col h-[580px] sm:h-[620px] lg:h-[720px] w-full group/card relative">
            {/* Image Section - 70% height */}
            <div className="relative w-full h-[70%] overflow-hidden">
                <Image
                    src={item.image || '/images/therapy.jpeg'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    style={{ objectPosition: item.objectPosition || 'center center' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                />
            </div>

            {/* Floating Icon - Absolutely positioned at the boundary (70%) */}
            <div className="absolute top-[70%] left-0 w-full flex justify-center -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-4 border-[#FAF3E0] flex items-center justify-center shadow-xl text-[#FF8C94] group-hover/card:scale-105 transition-all duration-500">
                    <div className="scale-110 sm:scale-110">
                        {icon}
                    </div>
                </div>
            </div>

            {/* Text Section - 30% height */}
            <div className="px-5 sm:px-6 pb-4 sm:pb-8 pt-10 sm:pt-14 text-center h-[30%] flex flex-col justify-start items-center bg-[#FAF3E0]">
                <h4 className="font-['Playfair_Display'] text-xl sm:text-lg lg:text-[22px] font-bold text-[#1a1a1a] mb-3 lg:mb-4 tracking-tight leading-tight group-hover/card:text-[#2d5a4f] transition-colors duration-300">
                    {item.title}
                </h4>
                <div className="flex-1 overflow-hidden w-full">
                    <p className="font-['Inter'] text-sm sm:text-base text-[#4a4a4a] leading-relaxed line-clamp-4 lg:line-clamp-5 overflow-hidden font-medium opacity-90 px-2 lg:px-4">
                        {item.description}
                    </p>
                </div>
                {/* Visual anchor */}
                <div className="hidden sm:block w-6 h-0.5 bg-[#B8860B]/30 mx-auto mt-4 rounded-full transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500" />
            </div>
        </div>
    );
}
