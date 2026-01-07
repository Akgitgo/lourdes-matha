"use client";

import Image from 'next/image';
import { heroData } from '@/lib/hero';

export default function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-white"
    >
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Left Content Column */}
        <div className="w-full md:w-[60%] bg-white flex flex-col justify-center px-6 py-20 sm:px-12 md:px-16 lg:px-20 relative order-2 md:order-1">
          <div className="max-w-[650px] mx-auto md:mx-0">
            <h2 className="font-['Inter'] text-sm sm:text-base md:text-lg font-medium text-[#B8860B] mb-4 tracking-[0.5px] uppercase">
              {heroData.subtitle}
            </h2>
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-[1.2] mb-6 tracking-[-0.5px]">
              {heroData.title}
            </h1>
            <div className="font-['Inter'] text-base sm:text-lg font-normal text-[#1a1a1a]/80 leading-relaxed mb-8 max-w-[520px]">
              {Array.isArray(heroData.description) ? (
                heroData.description.map((para: string, index: number) => (
                  <p key={index} className={index < heroData.description.length - 1 ? "mb-4" : ""}>
                    {para}
                  </p>
                ))
              ) : (
                <p>{heroData.description}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a
                href="#packages"
                onClick={(e) => scrollToSection(e, 'packages')}
                className="inline-flex items-center justify-center px-8 py-3 bg-[#2d5a4f] text-white font-['Inter'] text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-[#245048] hover:-translate-y-0.5 active:translate-y-0 h-12 shadow-md hover:shadow-lg"
              >
                {heroData.cta}
              </a>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="/booklet.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-[#2d5a4f] border-2 border-[#2d5a4f] font-['Inter'] text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-[#2d5a4f] hover:text-white hover:-translate-y-0.5 active:translate-y-0 h-12"
                >
                  BROCHURE BOOKLET
                </a>

                <a
                  href="/New Brochure LMAH.docx"
                  download
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-[#2d5a4f] border-2 border-[#2d5a4f] font-['Inter'] text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-[#2d5a4f] hover:text-white hover:-translate-y-0.5 active:translate-y-0 h-12"
                >
                  NEW BROCHURE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image/Logo Column */}
        <div className="w-full md:w-[40%] bg-[#2d5a4f] relative overflow-hidden flex items-center justify-center order-1 md:order-2 py-12 md:py-0">
          <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12 lg:p-16">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-4 shadow-2xl">
                <Image
                  src="/images/logo.jpeg"
                  alt="Lourdes Matha Ayurvedic Hospital Logo"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Subtle Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
