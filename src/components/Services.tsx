"use client";

import Image from 'next/image';
import { HeartPulse, UtensilsCrossed, Music, MountainSnow, UserCheck, Armchair, Package, ClipboardList, Clock, Shield, Settings, Briefcase } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: HeartPulse,
      title: "24/7 Medical Care",
      description: "Round-the-clock nursing care with regular doctor visits, health monitoring, and immediate medical attention to ensure your loved one's complete health and wellbeing.",
    },
    {
      icon: UtensilsCrossed,
      title: "Homely Food",
      description: "Nutritious, freshly prepared vegetarian and non-vegetarian meals that taste like home, carefully crafted to cater to individual dietary preferences and health requirements.",
    },
    {
      icon: Music,
      title: "Cultural Activities",
      description: "Engaging cultural programs, music sessions, group activities, and entertainment that keep spirits high, minds active, and foster a vibrant community atmosphere.",
    },
    {
      icon: MountainSnow,
      title: "Scenic Environment",
      description: "Nestled in the beautiful hills of Wayanad, surrounded by lush greenery, nature's tranquility, and fresh mountain air for a peaceful living experience.",
    },
    {
      icon: UserCheck,
      title: "Personal Assistance",
      description: "Dedicated and trained caregivers provide personalized attention, compassionate support, and assistance with daily activities to ensure comfort and independence.",
    },
    {
      icon: Armchair,
      title: "Accommodation Options",
      description: "Multiple living arrangements including Shared Room, Single Occupancy, Deluxe, Elite, and Luxury options, all fully furnished and designed for safety and comfort with 24/7 CCTV monitoring.",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            OUR SERVICES
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-slate-900 mb-4">
            A wide range of services
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Grace Garden provides comprehensive care services designed to ensure comfort, dignity, and genuine companionship for your loved ones.
          </p>
        </div>

        {/* Assisted Living Service Subheader */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-primary text-left">
            Assisted Living Service
          </h3>
        </div>

        {/* Assisted Living Banner Image */}
        <div className="relative w-full h-[500px] md:h-[600px] mb-8 rounded-2xl overflow-hidden shadow-lg">
          {/* Mobile Image */}
          <Image
            src="/images/assisstedlivingphone.jpg"
            alt="Assisted Living Service - Comprehensive residential care"
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, 0vw"
            className="object-cover md:hidden"
            loading="lazy"
          />
          {/* Desktop Image */}
          <Image
            src="/images/assisstedlivingservice.jpg"
            alt="Assisted Living Service - Professional elderly care"
            fill
            quality={85}
            sizes="(min-width: 768px) 100vw, 0vw"
            className="object-cover hidden md:block"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
          <div className="relative z-20 h-full flex items-end px-8 md:px-12 pb-8 md:pb-12">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl">
              Comprehensive residential care in our serene Wayanad facility, offering 24/7 support, medical assistance, and a vibrant community lifestyle for your loved ones.
            </p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0 mr-4">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold font-sans text-[#32412B] group-hover:text-primary transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6 pl-1 flex-grow">
                  {service.description}
                </p>


              </div>
            );
          })}
        </div>

        {/* Home Care Service Subheader */}
        <div className="mt-16 mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-primary text-left">
            Home Care Service
          </h3>
        </div>

        {/* Home Care Banner Image */}
        <div className="relative w-full h-[500px] md:h-[600px] mb-8 rounded-2xl overflow-hidden shadow-lg">
          {/* Mobile Image */}
          <Image
            src="/images/homeservicephone.jpg"
            alt="Home Care Service - Professional care at home"
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, 0vw"
            className="object-cover md:hidden"
            loading="lazy"
          />
          {/* Desktop Image */}
          <Image
            src="/images/Homeservice.jpg"
            alt="Home Care Service - Certified caregivers"
            fill
            quality={85}
            sizes="(min-width: 768px) 100vw, 0vw"
            className="object-cover hidden md:block"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
          <div className="relative z-20 h-full flex items-end px-8 md:px-12 pb-8 md:pb-12">
            <p className="text-white text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl">
              Professional care delivered in the comfort of your own home, with certified caregivers providing personalized support, nursing care, and flexible service packages tailored to your needs.
            </p>
          </div>
        </div>

        {/* Home Care Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: UserCheck,
              title: "Certified Caregivers",
              description: "Background verified and certified caregivers who are trained to provide professional care with compassion and dedication to your loved ones."
            },
            {
              icon: HeartPulse,
              title: "Skilled Nursing & Daily Care",
              description: "Expert nursing support and comprehensive daily care assistance to ensure health monitoring, medication management, and overall wellbeing."
            },
            {
              icon: Briefcase,
              title: "Flexible Service Packages",
              description: "Customizable service packages including nursing care, housekeeping, and cooking services tailored to meet your specific requirements and preferences."
            },
            {
              icon: ClipboardList,
              title: "Customized Care Plans",
              description: "Personalized care plans designed specifically for each individual's unique needs, health conditions, and lifestyle preferences for optimal care delivery."
            },
            {
              icon: Clock,
              title: "Flexible Duration Options",
              description: "Choose from 12-hour or 24-hour care options based on your requirements, providing the flexibility to select the level of support needed."
            },
            {
              icon: Shield,
              title: "Regular Monitoring",
              description: "Continuous monitoring by the Grace Garden team with emergency response support to ensure safety, security, and immediate assistance when needed."
            }
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0 mr-4">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold font-sans text-[#32412B] group-hover:text-primary transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6 pl-1 flex-grow">
                  {service.description}
                </p>

              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#enquire"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Get Started with Grace Garden
          </a>
        </div>
      </div>

      {/* Brochure Section - Separate Section */}
      <div className="max-w-7xl mx-auto px-4 mt-16 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Download Our Brochure
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Learn more about Grace Garden's comprehensive care services, facilities, and accommodation options in our detailed brochure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/Grace Garden Senior Living (Care Home) Brochure (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="View Brochure"
            >
              View Brochure
            </a>
            <a
              href="/Grace Garden Senior Living (Care Home) Brochure (1).pdf"
              download
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white border-2 border-primary text-primary hover:bg-primary/5 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Download Brochure"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
