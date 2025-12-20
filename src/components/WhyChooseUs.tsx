"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Home, Users, MessageCircle } from 'lucide-react';

export default function WhyChooseUs() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const carouselImages = [
        { src: "/images/Night view.jpg", alt: "Elderly care exercise" },
        { src: "/images/wcu2.jpeg   ", alt: "Happy residents group" },
        { src: "/images/Founders2.JPG", alt: "Social interaction" },
        { src: "/images/wcu1.jpeg", alt: "Comfortable living space" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);
    const features = [
        {
            icon: <Flower2 className="w-8 h-8 text-white" />,
            text: "Relaxed atmosphere for the entire family"
        },
        {
            icon: <Home className="w-8 h-8 text-white" />,
            text: "Quality care in the comfort of your home"
        },
        {
            icon: <Users className="w-8 h-8 text-white" />,
            text: "A professional team of caregivers"
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-white" />,
            text: "Friendly communication"
        }
    ];

    return (
        <section id="why-choose-us" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                        WHY CHOOSE US
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-4">
                        Why Choose Us?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Our key aim is to preserve the independence of elders while providing all the necessary home assistance. We always try to lift the spirits of the people we care for and do our best to make sure they are comfortable and happy.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Image Carousel */}
                    <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={carouselImages[currentImageIndex].src}
                                    alt={carouselImages[currentImageIndex].alt}
                                    fill
                                    className="object-cover"
                                />
                                {/* Overlay gradient for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Content */}
                    <div className="space-y-8">
                        {/* Feature List */}

                        {/* Feature List */}
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-6 group">
                                    {/* Icon Circle */}
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#8EB6C6] flex items-center justify-center shadow-md group-hover:bg-primary transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    {/* Text */}
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300">
                                        {feature.text}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
