"use client";

import Image from 'next/image';
import { servicesData } from '@/lib/services';
import TherapyCarousel from './TherapyCarousel';

export default function Services() {
  const icons = [
    <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6v6l4 2" />
    </svg>,
    <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>,
    <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 2.69v18.62" />
    </svg>,
    <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ];

  const getIcon = (index: number) => {
    return icons[index % icons.length];
  };

  return (
    <section
      id="services"
      className="bg-white py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h3 className="font-['Inter'] text-sm sm:text-base font-medium text-[#B8860B] mb-4 tracking-[2px] uppercase">
            {servicesData.subheading}
          </h3>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            {servicesData.heading}
          </h2>
          <div className="font-['Inter'] text-base sm:text-lg font-normal text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto">
            {servicesData.description.split('\n\n').map((para, index) => (
              <p key={index} className={index < servicesData.description.split('\n\n').length - 1 ? "mb-6" : ""}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {servicesData.groups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            id={group.subheading.toLowerCase().includes('package') ? 'packages' : undefined}
            className={groupIndex < servicesData.groups.length - 1 ? "mb-20 md:mb-32" : ""}
          >
            <h3 className="font-['Inter'] text-lg sm:text-xl md:text-2xl font-semibold text-[#B8860B] mb-8 md:mb-12 text-center tracking-wide">
              {group.subheading}
            </h3>

            <TherapyCarousel items={group.items} getIcon={getIcon} />
          </div>
        ))}
      </div>
    </section>
  );
}
