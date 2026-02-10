"use client";

import { useState, useEffect } from 'react';
import { testimonialsData } from '@/lib/testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(testimonialsData.items.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleItems = testimonialsData.items.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section
      id="testimonials"
      className="bg-[#f9fafb] py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Inter'] text-sm sm:text-base font-medium text-[#2d5a4f] mb-4 tracking-[2px] uppercase"
          >
            {testimonialsData.subheading}
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight"
          >
            {testimonialsData.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-['Inter'] text-base sm:text-lg font-normal text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            {testimonialsData.description}
          </motion.p>
        </div>

        <div className="relative px-2 sm:px-12">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold) {
                nextSlide();
              } else if (info.offset.x > threshold) {
                prevSlide();
              }
            }}
            className="grid gap-6 md:gap-8 items-stretch cursor-grab active:cursor-grabbing"
            style={{
              gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`,
            }}
          >
            <AnimatePresence mode="wait">
              {visibleItems.map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 sm:p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-500 min-h-[420px] sm:min-h-[480px] pointer-events-none sm:pointer-events-auto"
                >
                  <div className="text-[#2d5a4f]/20 mb-4 sm:mb-6">
                    <Quote className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" />
                  </div>

                  <blockquote className="font-['Inter'] text-xs sm:text-base text-gray-700 leading-relaxed mb-6 flex-grow italic overflow-hidden">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100">
                    <div className="font-['Inter'] text-base sm:text-lg font-bold text-[#B8860B] mb-1">
                      {testimonial.author}
                    </div>
                    {testimonial.profession && (
                      <div className="font-['Inter'] text-[10px] sm:text-sm font-semibold text-[#B8860B]/80 mb-1 uppercase tracking-wider">
                        {testimonial.profession}
                      </div>
                    )}
                    {testimonial.location && (
                      <div className="font-['Inter'] text-[10px] sm:text-xs text-gray-500">
                        {testimonial.location}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-[#B8860B]' : 'w-2.5 bg-gray-300'}`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
