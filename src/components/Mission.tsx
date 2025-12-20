"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Mission() {
    const containerRef = useRef(null);

    // Track scroll progress of the entire section container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 1. Clip Path Animation:
    // Starts with top 70% hidden (inset 70% 0 0 0) -> only bottom 30% visible
    // Ends with 0% hidden (inset 0% 0 0 0) -> full image visible
    // We map scroll progress [0.2, 0.8] to allow some buffer before/after
    const clipPathInset = useTransform(scrollYProgress, [0.2, 0.8], ["70%", "0%"]);

    // 2. Text Movement:
    // Text moves from bottom (aligned with the 30% strip) to center
    const textY = useTransform(scrollYProgress, [0.2, 0.8], ["40vh", "0vh"]);

    // 3. Opacity: Fade in text slightly as it moves up
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);

    return (
        <section id="mission" className="relative h-[200vh]">
            <div ref={containerRef} className="relative h-[200vh]">
            {/* Sticky Container - Stays fixed while we scroll through the 200vh height */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Animated Reveal Container */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        clipPath: useTransform(clipPathInset, (val) => `inset(${val} 0 0 0)`)
                    }}
                >
                    {/* Fixed Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                        style={{ backgroundImage: "url('/images/MISSIONBG.jpg')" }}
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-slate-900/60" />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center max-w-4xl mx-auto"
                        style={{ y: textY, opacity: textOpacity }}
                    >
                        {/* Decorative Line */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="h-px w-32 bg-white/40"></div>
                        </div>

                        {/* Mission Statement */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-8 leading-relaxed italic drop-shadow-lg">
                            "Our mission is to provide dignity, comfort, and compassionate care to elders in a home-like environment."
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-md">
                            Grace Garden is a haven where professional caregivers dedicate themselves to elderly support of the highest quality. Our top priority is bringing joy, peace, and genuine warmth to the lives of our residents and their families.
                        </p>

                        {/* Quote Icon */}
                        <div className="flex items-center justify-center">
                            <svg
                                className="w-16 h-16 text-white/40"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                        </div>

                        {/* Decorative Line */}
                        <div className="flex items-center justify-center mt-8">
                            <div className="h-px w-32 bg-white/40"></div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
        </section>
    );
}
