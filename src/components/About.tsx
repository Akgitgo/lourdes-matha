"use client";

import Image from 'next/image';
import { aboutUsData } from '@/lib/aboutUs';

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#f5f5f0] py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Intro Section */}
        <div className="text-center mb-16 md:mb-24">
          <h3 className="font-['Inter'] text-sm sm:text-base font-medium text-[#B8860B] mb-4 tracking-[2px] uppercase">
            {aboutUsData.subheading}
          </h3>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
            {aboutUsData.heading}
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg font-normal text-[#4a4a4a] leading-relaxed max-w-3xl mx-auto">
            {aboutUsData.introDescription}
          </p>
        </div>

        {/* Doctors and Board Sections */}
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Doctor Profiles */}
          {aboutUsData.doctors.map((doctor, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-[minmax(300px,420px)_1fr] gap-10 lg:gap-16 items-center bg-white p-6 sm:p-10 rounded-[2rem] shadow-xl border border-[#B8860B]/5"
            >
              <div className="relative w-full aspect-square max-w-[420px] mx-auto lg:mx-0 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gray-100 z-10 flex-shrink-0">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                  style={{
                    objectPosition: (doctor as any).objectPosition || 'center'
                  }}
                  priority={index === 0}
                />
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2 leading-tight">
                  {doctor.name}
                </h3>
                <p className="font-['Inter'] text-base sm:text-lg font-semibold text-[#B8860B] mb-1 tracking-wide">
                  {doctor.degrees}
                </p>
                <p className="font-['Inter'] text-sm sm:text-base font-medium text-gray-500 mb-6 uppercase tracking-widest">
                  {doctor.role}
                </p>
                <div className="font-['Inter'] text-sm sm:text-base font-normal text-[#555555] leading-relaxed border-l-4 border-[#B8860B] pl-6 py-4 bg-[#fafafa] rounded-r-2xl">
                  {doctor.description.map((para, pIdx) => (
                    <p key={pIdx} className={pIdx < doctor.description.length - 1 ? "mb-4" : ""}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Management Card */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,420px)] gap-10 lg:gap-16 items-center bg-[#2d5a4f] p-6 sm:p-10 rounded-[2rem] shadow-2xl text-white">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <h3 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#B8860B] mb-6 leading-tight">
                {aboutUsData.management.heading}
              </h3>
              <div className="font-['Inter'] text-sm sm:text-base font-normal text-white/90 leading-loose space-y-4">
                {aboutUsData.management.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl order-1 lg:order-2">
              <Image
                src={aboutUsData.management.image}
                alt="Hospital Management"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
