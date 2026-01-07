"use client";

import { missionData } from '@/lib/mission';

export default function Mission() {
  return (
    <section
      id="vision-motto"
      className="relative min-h-[500px] sm:min-h-[600px] w-full flex items-center justify-center py-20 px-6 sm:px-12 md:py-32 md:px-20 overflow-hidden"
      style={{
        backgroundImage: `url('${missionData.image}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#2d5a4f]/80 z-[1]" />

      {/* Decorative Blur (Optional for modern look) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full z-[1]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B8860B]/20 blur-[100px] rounded-full z-[1]" />

      <div className="relative z-[2] max-w-4xl text-center w-full flex flex-col gap-12 sm:gap-16">
        {/* Vision Block */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[2px]">
            {missionData.vision.heading}
          </h2>
          <p className="font-['Inter'] text-lg sm:text-xl md:text-2xl font-normal text-white/90 leading-relaxed italic max-w-3xl mx-auto">
            "{missionData.vision.description}"
          </p>
        </div>

        {/* Divider Line */}
        <div className="w-20 sm:w-24 h-0.5 bg-[#B8860B] mx-auto rounded-full" />

        {/* Motto Block */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-[2px]">
            {missionData.motto.heading}
          </h2>
          <p className="font-['Inter'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#B8860B] leading-tight uppercase tracking-wider max-w-3xl mx-auto">
            {missionData.motto.description}
          </p>
        </div>
      </div>
    </section>
  );
}
