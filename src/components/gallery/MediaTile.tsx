"use client";

import Image from 'next/image';
import { MediaItem } from '@/lib/galleryData';

interface MediaTileProps {
    item: MediaItem;
    onClick: () => void;
}

export default function MediaTile({ item, onClick }: MediaTileProps) {
    const isDisabled = item.consentSigned === false;

    return (
        <div
            onClick={isDisabled ? undefined : onClick}
            className={`
        relative overflow-hidden rounded-2xl shadow-lg 
        transition-all duration-300 cursor-pointer
        aspect-[4/3] w-full
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.03] hover:shadow-2xl'}
      `}
        >
            {item.type === 'video' ? (
                <video
                    src={item.src}
                    className={`w-full h-full object-cover ${isDisabled ? 'blur-sm' : ''}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            ) : (
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className={`object-cover ${isDisabled ? 'blur-sm' : ''}`}
                    loading="lazy"
                />
            )}

            {/* Consent Pending Badge */}
            {isDisabled && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Consent Pending
                </div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4">
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
            </div>
        </div>
    );
}
