"use client";

import { whatWeProvideData } from '@/lib/whatWeProvide';

export default function WhatWeProvide() {
  const icons = [
    <svg key="0" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6v6l4 2" />
    </svg>,
    <svg key="1" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>,
    <svg key="2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 2.69v18.62" />
    </svg>,
    <svg key="3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ];

  return (
    <section
      id="what-we-provide"
      className="bg-[#2d5a4f] py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h3 className="font-['Inter'] text-sm sm:text-base font-medium text-[#B8860B] mb-4 tracking-[2px] uppercase">
            {whatWeProvideData.subheading}
          </h3>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {whatWeProvideData.heading}
          </h2>
          <div className="font-['Inter'] text-base sm:text-lg font-normal text-white/80 leading-relaxed max-w-3xl mx-auto">
            {whatWeProvideData.description.split('\n\n').map((para, index) => (
              <p key={index} className={index < whatWeProvideData.description.split('\n\n').length - 1 ? "mb-6" : ""}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
          {whatWeProvideData.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl transition-all duration-300 border border-white/10 shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:border-[#B8860B]/30 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#2d5a4f] flex items-center justify-center mr-4 flex-shrink-0 text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {icons[index]}
                </div>
                <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#1a1a1a] leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="font-['Inter'] text-sm sm:text-base font-normal text-[#4a4a4a] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

