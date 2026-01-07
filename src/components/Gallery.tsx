"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { galleryData } from '@/lib/gallery';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section
        id="gallery"
        className="bg-white py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h3 className="font-['Inter'] text-sm sm:text-base font-medium text-[#B8860B] mb-4 tracking-[2px] uppercase">
              {galleryData.subheading}
            </h3>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              {galleryData.heading}
            </h2>
            <p className="font-['Inter'] text-base sm:text-lg font-normal text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto">
              {galleryData.description}
            </p>
          </div>

          {galleryData.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={sectionIndex < galleryData.sections.length - 1 ? "mb-16 md:mb-24" : ""}
            >
              <div className="text-center mb-10 md:mb-12">
                <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-4">
                  {section.title}
                </h3>
                <p className="font-['Inter'] text-sm sm:text-base font-normal text-gray-500 max-w-2xl mx-auto italic">
                  {section.description}
                </p>
              </div>

              {/* Mobile/Tablet Carousel */}
              <div className="lg:hidden -mx-6 sm:-mx-12 overflow-hidden">
                <motion.div
                  drag="x"
                  dragConstraints={{ right: 0, left: -((section.images.length - 1) * 280) }} // Estimated width for fallback
                  whileTap={{ cursor: 'grabbing' }}
                  className="flex gap-4 px-6 sm:px-12"
                >
                  {section.images.map((imagePath, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      className="relative min-w-[80vw] sm:min-w-[45vw] aspect-[4/3] rounded-2xl overflow-hidden shadow-md"
                      onClick={() => setSelectedImage(imagePath)}
                    >
                      <Image
                        src={imagePath}
                        alt={`${section.title} - Image ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                          <Maximize2 size={20} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="flex justify-center gap-2 mt-6">
                  <div className="text-xs text-gray-400 italic font-['Inter']">Swipe to view more</div>
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                {section.images.map((imagePath, imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300"
                    onClick={() => setSelectedImage(imagePath)}
                  >
                    <Image
                      src={imagePath}
                      alt={`${section.title} - Image ${imageIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                          <Maximize2 size={24} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-video max-h-[85vh] overflow-hidden rounded-xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery Preview"
                fill
                className="object-contain"
                priority
              />

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-[101]"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
