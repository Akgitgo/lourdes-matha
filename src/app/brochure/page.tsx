"use client";

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Import the high-security viewer with SSR disabled
const SecureBrochure = dynamic(
    () => import('@/components/SecureBrochure'),
    {
        ssr: false,
        loading: () => (
            <div className="fixed inset-0 bg-[#0f1715] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#B8860B] animate-spin mb-4" />
                <p className="text-white/40 text-[10px] tracking-widest uppercase">Initializing Secure Environment...</p>
            </div>
        )
    }
);

export default function BrochurePage() {
    return (
        <div className="min-h-screen bg-[#0f1715]">
            {/* 
        This page uses a high-security PDF viewer that:
        1. Renders pages to Canvas (prevents text selection)
        2. Serves the PDF via a secure API route (blocks direct access)
        3. Disables common keyboard shortcuts and right-click
        4. Adds dynamic and static watermarks
      */}
            <SecureBrochure />
        </div>
    );
}
