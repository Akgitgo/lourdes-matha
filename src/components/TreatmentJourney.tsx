"use client";

import { useState, useEffect, useRef } from 'react';
import { treatmentJourneyData } from '@/lib/treatmentJourney';

export default function TreatmentJourney() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSteps, setAnimatedSteps] = useState([false, false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          treatmentJourneyData.steps.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSteps((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 300);
          });
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const stepIcons = [
    <svg key="0" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>,
    <svg key="1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>,
    <svg key="2" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>,
    <svg key="3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ];

  return (
    <section
      ref={sectionRef}
      id="treatment-journey"
      className="bg-[#2d5a4f] py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h3 className="font-['Inter'] text-sm sm:text-base font-medium text-[#B8860B] mb-4 tracking-[2px] uppercase">
            {treatmentJourneyData.subheading}
          </h3>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {treatmentJourneyData.heading}
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg font-normal text-white/80 leading-relaxed max-w-3xl mx-auto">
            {treatmentJourneyData.description}
          </p>
        </div>

        <div className="relative pt-10 pb-10">
          {/* Main Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[80px] left-[10%] right-[10%] h-0.5 bg-[#B8860B]/20 z-0">
            <div
              className="absolute top-0 left-0 h-full bg-[#B8860B] transition-all duration-1000 ease-in-out"
              style={{ width: isVisible ? '100%' : '0%' }}
            ></div>
          </div>

          {/* Mobile Connector Line (Vertical) */}
          <div className="md:hidden absolute top-[40px] bottom-[40px] left-1/2 -translate-x-1/2 w-0.5 bg-[#B8860B]/20 z-0">
            <div
              className="absolute top-0 left-0 w-full bg-[#B8860B] transition-all duration-1000 ease-in-out"
              style={{ height: isVisible ? '100%' : '0%' }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative">
            {treatmentJourneyData.steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out z-10 ${animatedSteps[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Step Number Circle */}
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-8 shadow-2xl relative z-10 transition-transform duration-500 hover:scale-110 shrink-0">
                  <div className="text-[#2d5a4f]">
                    {stepIcons[index]}
                  </div>
                </div>

                {/* Step Card */}
                <div className="bg-white p-8 rounded-2xl w-full flex-1 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col">
                  <h4 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-4 leading-tight">
                    {step.title}
                  </h4>
                  <p className="font-['Inter'] text-sm sm:text-base font-normal text-[#4a4a4a] leading-relaxed flex-grow">
                    {step.description}
                  </p>
                  <div className="mt-4 text-[#2d5a4f] font-bold text-sm tracking-widest font-['Inter']">
                    STEP 0{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
