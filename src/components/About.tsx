"use client";

import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Vinu Baby",
      role: "Founder",
      initials: "VB",
      image: "/images/vinubaby.jpg",
      objectPosition: "center 30%",
      description: "Vinu brings 15+ years of corporate experience to Grace Garden. His mission is simple: to serve the elderly with genuine compassion, kindness, and unwavering dignity.",
      quote: "After you, we are the best people to care for your loved ones, treating them with the same love and dignity as our own family."
    },
    {
      name: "Shilby Benny",
      role: "Managing Director",
      initials: "SB",
      image: "/images/shilbybenny.jpg",
      objectPosition: "center 15%",
      description: "As Operations Incharge, Shilby manages daily care with warmth and precision. She ensures every resident feels safe, valued, and truly at home.",
      quote: "Creating a home where every resident feels the warmth of family and the comfort of care."
    },
    {
      name: "Preethy Abinand",
      role: "Co-Founder",
      initials: "PA",
      image: "/images/preethyabinand.jpg",
      objectPosition: "center 25%",
      description: "Preethy oversees Finance and Facilities, creating a secure and welcoming environment. Her teaching background infuses patience and clarity into everything she does.",
      quote: "Building a foundation of trust and safety, ensuring peace of mind for every family we serve."
    }
  ];

  return (
    <section id="about" className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            ABOUT US
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-6">
            Meet our dedicated team
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Our team is driven by compassion, professionalism, and a shared commitment to enriching the lives of our residents.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-7 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="w-36 h-36 rounded-full overflow-hidden mb-5 shadow-md border-4 border-white relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: member.objectPosition }}
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-xl font-sans font-bold text-slate-900 mb-1">
                {member.name}
              </h3>
              <p className="text-sm uppercase tracking-wider text-slate-500 font-medium mb-5">
                {member.role}
              </p>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-5 text-sm flex-grow">
                {member.description}
              </p>

              {/* Quote (if available) */}
              {member.quote && (
                <p className="text-primary italic font-serif text-base mb-5 px-3">
                  "{member.quote}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
