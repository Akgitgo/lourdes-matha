"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronLeft, ChevronRight, Lock, Eye, AlertCircle, Maximize2, Minimize2, ZoomIn, ZoomOut, RefreshCcw, X } from 'lucide-react';

// Set up the worker
const PDF_WORKER_URL = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;

interface PageProps {
    pageNumber: number;
    pdf: pdfjs.PDFDocumentProxy | null;
    scale: number;
    onVisible: (pageNumber: number) => void;
}

const PDFPage: React.FC<PageProps> = ({ pageNumber, pdf, scale, onVisible }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isRendered, setIsRendered] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const renderPage = useCallback(async () => {
        if (!pdf || !canvasRef.current) return;

        try {
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (!context) return;

            const outputScale = window.devicePixelRatio || 1;
            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);
            canvas.style.width = Math.floor(viewport.width) + "px";
            canvas.style.height = Math.floor(viewport.height) + "px";

            const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

            const renderContext = {
                canvasContext: context,
                transform: transform,
                viewport: viewport,
            };

            await page.render(renderContext).promise;
            setIsRendered(true);
        } catch (err) {
            console.error(`Error rendering page ${pageNumber}:`, err);
            setError("Failed to render page");
        }
    }, [pdf, pageNumber, scale]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onVisible(pageNumber);
                    if (!isRendered) {
                        renderPage();
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [onVisible, pageNumber, isRendered, renderPage]);

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-center mb-8 last:mb-0 w-full"
            style={{ minHeight: '500px' }}
        >
            <div className="relative group shadow-2xl rounded overflow-hidden bg-white/5 border border-white/10 select-none pointer-events-none">
                <canvas ref={canvasRef} className="max-w-full h-auto" />

                {/* Dynamic Watermark */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] flex flex-wrap justify-around items-around content-around pointer-events-none select-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="text-white text-lg font-bold rotate-[-45deg] whitespace-nowrap uppercase tracking-widest p-10"
                            style={{ transform: `rotate(-30deg) scale(${scale})` }}
                        >
                            Lourdes Matha • View Only
                        </div>
                    ))}
                </div>

                {/* Diagonal Large Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <div className="text-white/5 text-[10vw] font-bold rotate-[-30deg] uppercase tracking-[2em] whitespace-nowrap">
                        SECURE
                    </div>
                </div>
            </div>

            {!isRendered && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1a2e29]/50 animate-pulse rounded">
                    <Loader2 className="w-8 h-8 text-[#B8860B] animate-spin" />
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 bg-red-900/20 rounded">
                    <AlertCircle className="w-8 h-8 mb-2" />
                    <p className="text-xs">{error}</p>
                </div>
            )}

            <div className="mt-4 px-4 py-1.5 bg-[#B8860B]/10 rounded-full border border-[#B8860B]/20 text-[#B8860B] text-[10px] font-bold tracking-widest uppercase select-none">
                Page {pageNumber}
            </div>
        </div>
    );
};

export default function SecureBrochure() {
    const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [scale, setScale] = useState(1.2);
    const [lastScale, setLastScale] = useState(1.2);
    const [isPinching, setIsPinching] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartDist = useRef<number | null>(null);
    const touchBaseScale = useRef<number>(1);

    // Security Measures
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Print (Ctrl+P)
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                return false;
            }
            // Save (Ctrl+S)
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                return false;
            }
            // Dev Tools
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                e.preventDefault();
                return false;
            }
            // Select All (Ctrl+A) - Prevent text selection via shortcut
            if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                e.preventDefault();
                return false;
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const loadingTask = pdfjs.getDocument('/api/brochure');
                const pdfDoc = await loadingTask.promise;
                setPdf(pdfDoc);
                setNumPages(pdfDoc.numPages);
                setIsLoading(false);
            } catch (err) {
                console.error('Error loading PDF:', err);
                setError('Failed to load brochure. Please refresh or try again later.');
                setIsLoading(false);
            }
        };

        loadPdf();
    }, []);

    useEffect(() => {
        // Handle responsive scaling
        const updateScale = () => {
            const width = window.innerWidth;
            if (width < 640) setScale(0.6);
            else if (width < 768) setScale(0.8);
            else if (width < 1024) setScale(1.0);
            else setScale(1.2);
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const handleVisible = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const scrollToPage = (pageNumber: number) => {
        const target = document.getElementById(`page-${pageNumber}`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4));
    const resetZoom = () => {
        const width = window.innerWidth;
        if (width < 640) setScale(0.6);
        else if (width < 768) setScale(0.8);
        else if (width < 1024) setScale(1.0);
        else setScale(1.2);
    };

    // Pinch to Zoom implementation for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            touchStartDist.current = dist;
            touchBaseScale.current = scale;
            setIsPinching(true);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && touchStartDist.current !== null) {
            const dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            const delta = dist / touchStartDist.current;
            const newScale = Math.min(Math.max(touchBaseScale.current * delta, 0.4), 3);
            setScale(newScale);
        }
    };

    const handleTouchEnd = () => {
        touchStartDist.current = null;
        setIsPinching(false);
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-[#0f1715] text-white selection:bg-transparent overflow-x-hidden"
            onDragStart={(e) => e.preventDefault()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <style jsx global>{`
        /* Critical Security CSS */
        body {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        @media print {
          body { display: none !important; }
        }

        /* Prevent pointer events on images/canvas */
        canvas, img {
          pointer-events: none !important;
        }

        /* Allow scrolling even when pinching */
        .zoom-controlled {
            touch-action: ${isPinching ? 'none' : 'pan-x pan-y'};
        }
      `}</style>

            {/* Control Bar */}
            <div className="fixed top-0 inset-x-0 h-16 bg-[#1a2e29]/95 backdrop-blur-md border-b border-white/10 z-[100] flex items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-4">
                    <div className="bg-[#B8860B]/20 p-2 rounded-lg">
                        <Lock className="w-5 h-5 text-[#B8860B]" />
                    </div>
                    <div className="hidden sm:block">
                        <h2 className="text-sm font-bold font-['Playfair_Display'] flex items-center gap-2">
                            Brochure Booklet <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                            <span className="text-white/40 uppercase tracking-widest text-[10px]">Secure</span>
                        </h2>
                    </div>
                </div>

                {/* Desktop Zoom Controls */}
                <div className="hidden md:flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/5">
                    <button onClick={handleZoomOut} className="p-1 hover:bg-white/10 rounded transition-colors" title="Zoom Out">
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-mono w-12 text-center text-white/60">
                        {Math.round(scale * 100)}%
                    </span>
                    <button onClick={handleZoomIn} className="p-1 hover:bg-white/10 rounded transition-colors" title="Zoom In">
                        <ZoomIn className="w-4 h-4" />
                    </button>
                    <div className="w-px h-3 bg-white/10 mx-1" />
                    <button onClick={resetZoom} className="p-1 hover:bg-white/10 rounded transition-colors" title="Reset Zoom">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>

                {/* Page Slider / Info */}
                {!isLoading && !error && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/5">
                            <span className="text-[#B8860B] font-bold text-sm">{currentPage}</span>
                            <span className="text-white/20">/</span>
                            <span className="text-white/60 text-sm">{numPages}</span>
                        </div>

                        <div className="flex gap-1">
                            <button
                                onClick={() => scrollToPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors disabled:opacity-20"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollToPage(Math.min(numPages, currentPage + 1))}
                                disabled={currentPage === numPages}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors disabled:opacity-20"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Protected</span>
                    </div>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors ml-2"
                    >
                        <div className="p-2 hover:bg-white/10 rounded-full">
                            <X className="w-5 h-5" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Zoom Floating Button */}
            <div className="fixed bottom-6 right-6 md:hidden z-[100] flex flex-col gap-3">
                <button
                    onClick={handleZoomIn}
                    className="w-12 h-12 bg-[#B8860B] text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
                >
                    <ZoomIn className="w-6 h-6" />
                </button>
                <button
                    onClick={handleZoomOut}
                    className="w-12 h-12 bg-[#1a2e29] text-white border border-white/10 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
                >
                    <ZoomOut className="w-6 h-6" />
                </button>
                <button
                    onClick={resetZoom}
                    className="w-12 h-12 bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
                >
                    <RefreshCcw className="w-5 h-5" />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 mt-16 p-4 sm:p-8 flex justify-center w-full zoom-controlled">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40">
                            <div className="relative w-20 h-20 mb-8">
                                <div className="absolute inset-0 border-4 border-[#B8860B]/20 rounded-full" />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-4 border-[#B8860B] border-t-transparent rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-['Playfair_Display'] mb-2">Decrypting Brochure</h3>
                            <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Checking access tokens...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-40 text-center max-w-md">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-red-400 mb-2">Technical Error</h3>
                            <p className="text-white/60 text-sm mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-[#B8860B] text-white rounded-lg font-bold hover:bg-[#9A6E09] transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="w-full space-y-8 pb-32">
                            {Array.from({ length: numPages }).map((_, i) => (
                                <div id={`page-${i + 1}`} key={i}>
                                    <PDFPage
                                        pageNumber={i + 1}
                                        pdf={pdf}
                                        scale={scale}
                                        onVisible={handleVisible}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Interactive Watermark Overlay (Fixed) */}
            <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.02]">
                <div className="grid grid-cols-4 grid-rows-6 w-full h-full">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-center rotate-[-45deg] whitespace-nowrap text-xs font-bold uppercase tracking-widest">
                            LOURDES MATHA VIEW ONLY - {new Date().toLocaleDateString()}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
