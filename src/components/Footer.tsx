"use client";

import Image from 'next/image';
import { footerData } from '@/lib/footer';
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin } from 'react-feather';

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-white py-16 px-6 sm:px-12 md:py-24 md:px-20 w-full color-[#1a1a1a] border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#f5f5f0] p-1 border border-black/5 shadow-sm">
                <Image
                  src="/images/logo.jpeg"
                  alt="Lourdes Matha Ayurvedic Hospital Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-[#B8860B] leading-tight transition-colors">
                {footerData.brand.name}
              </h3>
            </div>
            <p className="font-['Inter'] text-sm text-gray-600 leading-relaxed max-w-xs">
              {footerData.brand.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Youtube, href: "https://youtube.com" },
                { icon: Facebook, href: "https://facebook.com" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#B8860B] hover:text-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#B8860B] mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {footerData.quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href.substring(1))}
                  className="font-['Inter'] text-sm text-gray-700 hover:text-[#B8860B] transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services List */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#B8860B] mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {footerData.services.slice(0, 6).map((service, index) => (
                <li key={index} className="font-['Inter'] text-sm text-gray-600">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-bold text-[#B8860B] mb-6">
              Contact Us
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <MapPin size={18} className="text-[#B8860B] mt-1 shrink-0" />
                <p className="font-['Inter'] text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {footerData.contact.address}
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <Phone size={18} className="text-[#B8860B] shrink-0" />
                <a
                  href={`tel:${footerData.contact.phone.replace(/\s/g, '')}`}
                  className="font-['Inter'] text-sm text-gray-700 hover:text-[#B8860B] transition-colors"
                >
                  {footerData.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <Mail size={18} className="text-[#B8860B] shrink-0" />
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="font-['Inter'] text-sm text-gray-700 hover:text-[#B8860B] transition-colors"
                >
                  {footerData.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-black/5 mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2500.382414143044!2d76.24989979607791!3d11.65966184619653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba60900251a6391%3A0x164f88faeca147f4!2sLourdes%20matha%20ayurvedic%20hospital!5e1!3m2!1sen!2sin!4v1767104611602!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-black/5 text-center">
          <p className="font-['Inter'] text-xs sm:text-sm text-gray-500">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
