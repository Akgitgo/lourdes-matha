"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MediaItem } from '@/lib/galleryData';
import { X } from 'lucide-react';

interface LightboxModalProps {
    item: MediaItem | null;
    onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!item) return;
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [item, onClose]);

    if (!item) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/90 hover:bg-white text-slate-900 transition-all duration-300 shadow-xl"
                aria-label="Close"
            >
                <X size={24} />
            </button>

            {/* Media Container */}
            <div
                className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                onClick={(e) => e.stopPropagation()}
            >
                {item.type === 'image' ? (
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="w-full h-auto max-h-[90vh] object-contain"
                    />
                ) : (
                    <video
                        controls
                        autoPlay
                        className="w-full h-auto max-h-[90vh] object-contain"
                    >
                        <source src={item.src} type="video/mp4" />
                        <track kind="captions" />
                    </video>
                )}
            </div>
        </motion.div>
    );
}
