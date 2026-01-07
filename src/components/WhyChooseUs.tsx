"use client";

import { useState } from 'react';
import Image from 'next/image';
import { whyChooseUsData } from '@/lib/whyChooseUs';

export default function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const icons = [
    <svg key="0" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>,
    <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v6h6V2" />
      <path d="M3 8h18" />
      <path d="M5 8v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
      <path d="M9 12h6" />
    </svg>,
    <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 2.69v18.62" />
    </svg>,
    <svg key="3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="18" rx="8" ry="2" />
      <path d="M4 18c0-2 2-4 8-4s8 2 8 4" />
      <path d="M8 18v-6" />
      <path d="M16 18v-6" />
      <path d="M8 12c0-2 1.5-4 4-4s4 2 4 4" />
      <line x1="12" y1="8" x2="12" y2="4" />
      <line x1="10" y1="4" x2="14" y2="4" />
    </svg>
  ];

  return (
    <section
      id="why-choose-us"
      className="bg-[#f0f4f8] py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h3 className="font-['Inter'] text-sm sm:text-base font-medium text-[#B8860B] mb-4 tracking-[2px] uppercase">
            {whyChooseUsData.subheading}
          </h3>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            {whyChooseUsData.heading}
          </h2>
          <div className="font-['Inter'] text-base sm:text-lg font-normal text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto">
            {whyChooseUsData.description.split('\n\n').map((para, index) => (
              <p key={index} className={index < whyChooseUsData.description.split('\n\n').length - 1 ? "mb-6" : ""}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Pillars Grid */}
          <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyChooseUsData.pillars.slice(0, 4).map((pillar, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 cursor-pointer h-[400px] flex flex-col group ${hoveredCard === index ? 'bg-[#e8f4f0]' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setHoveredCard(hoveredCard === index ? null : index)}
              >
                {/* Media Section - 70% Height */}
                <div className="relative w-full h-[70%] overflow-hidden bg-black">
                  {(pillar as any).video ? (
                    <video
                      src={(pillar as any).video}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={pillar.image || '/images/hospital.jpeg'}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  {/* Overlay for description */}
                  {pillar.description && (
                    <div className={`absolute inset-0 bg-[#2d5a4f]/95 flex items-center justify-center p-6 transition-all duration-300 ${hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <p className="text-white text-sm font-['Inter'] leading-relaxed text-center">
                        {pillar.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Title/Icon Section - 30% Height */}
                <div className="h-[30%] px-6 flex flex-row items-center justify-center gap-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2d5a4f]/10 text-[#2d5a4f] transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                    <div className="scale-75">
                      {icons[index]}
                    </div>
                  </div>
                  <h4 className={`font-['Playfair_Display'] text-lg sm:text-xl font-bold leading-tight transition-colors duration-300 ${hoveredCard === index ? 'text-[#2d5a4f]' : 'text-[#1a1a1a]'}`}>
                    {pillar.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Sidebar Card */}
          <div className="w-full lg:w-[40%] bg-[#d4e8e2] rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between shadow-lg">
            {/* Decorative circle */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#2d5a4f]/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex justify-center items-center gap-8 mb-10">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl flex-shrink-0">
                  <Image
                    src="/images/logo.jpeg"
                    alt="Lourdes Matha Logo"
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white bg-white shadow-xl flex-shrink-0">
                  <Image
                    src="/images/lourde_matha_hospital_v2.jpg"
                    alt="Lourdes Matha Hospital"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="font-['Inter'] text-sm sm:text-base text-[#1a1a1a] leading-relaxed space-y-6 mb-8">
                <div className="text-center">
                  <p className="font-bold text-[#2d5a4f] text-lg sm:text-xl mb-4">
                    Welcome to Lourdes Matha Ayurvedic Hospital
                  </p>
                  <p className="italic text-gray-700">
                    "Located in Manikkuni, Adoration Convent, near Jain Temple Sulthan Bathery."
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#2d5a4f]/10">
                  <h5 className="font-bold text-[#2d5a4f] uppercase tracking-wider text-xs">The 4 Pillars of Ayurveda</h5>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex gap-2">
                      <span className="font-bold text-[#B8860B]">1. Ahara (Diet):</span> Considered a form of medicine.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-[#B8860B]">2. Vihara (Lifestyle):</span> Balanced daily routine.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-[#B8860B]">3. Achara:</span> Mental & emotional wellness through meditation.
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-[#B8860B]">4. Chikitsa:</span> Traditional internal medicines & Panchakarma.
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#2d5a4f]/10">
                  <p className="text-xs sm:text-sm leading-relaxed">
                    We are committed to delivering world-class medical services through our experienced panel of doctors and therapists, focusing on holistic healing that aligns the body, mind, and spirit.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className="block w-full text-center py-4 bg-[#B8860B] text-white font-['Inter'] font-bold rounded-xl shadow-lg hover:bg-[#9A6E09] hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]"
              >
                {whyChooseUsData.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
