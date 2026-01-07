"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'react-feather';
import Image from 'next/image';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // IntersectionObserver to detect when hero section is out of view
  useEffect(() => {
    const heroElement = document.getElementById('hero');

    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero is NOT visible, activate sticky header
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-80px 0px 0px 0px'
      }
    );

    observer.observe(heroElement);

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (targetId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(href.substring(1));
    }
  };

  // Navigation links
  const navLinks = [
    { label: 'About us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const phoneNumber = "919100773861";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <AnimatePresence mode="wait">
          {isSticky ? (
            // Sticky floating glass pill header
            <motion.div
              key="sticky"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex justify-center pt-2 px-4"
            >
              <nav
                className="bg-white/90 backdrop-blur-md border border-black/5 rounded-full shadow-lg px-4 md:px-8 py-2 md:py-3 max-w-6xl w-full"
                aria-label="Main navigation"
              >
                <div className="flex items-center justify-between">
                  {/* Logo - Left */}
                  <div className="flex items-center">
                    <a
                      href="#hero"
                      onClick={(e) => handleNavClick(e, '#hero')}
                      className="flex items-center gap-2 transition-transform hover:scale-105"
                      aria-label="Lourdes Matha Ayurvedic Hospital - Scroll to top"
                    >
                      <div className="flex-shrink-0 w-8 h-8 relative sm:w-10 sm:h-10">
                        <Image
                          src="/images/logo.jpeg"
                          alt="Lourdes Matha Ayurvedic Hospital Logo"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-black font-serif font-bold text-sm sm:text-base md:text-lg leading-tight">
                          Lourdes Matha
                        </span>
                        <span className="text-black/80 font-sans text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">
                          Ayurvedic Hospital
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Right Side: Nav Links & Button */}
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    {/* Navigation Links - Desktop */}
                    <ul className="hidden lg:flex items-center gap-4">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-black/70 hover:text-[#2d5a4f] text-sm font-semibold transition-colors duration-200 relative group whitespace-nowrap uppercase tracking-wider"
                          >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2d5a4f] group-hover:w-full transition-all duration-300" />
                          </a>
                        </li>
                      ))}
                    </ul>

                    {/* Call Button - Icon Only */}
                    <a
                      href={`tel:+${phoneNumber}`}
                      className="hidden sm:flex items-center justify-center w-10 h-10 bg-[#2d5a4f] text-white rounded-full shadow-md hover:bg-[#B8860B] transition-all hover:scale-110 active:scale-95"
                      aria-label="Call us"
                    >
                      <Phone size={18} />
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="lg:hidden p-2 text-black/70 hover:text-black transition-colors"
                      aria-label="Toggle mobile menu"
                    >
                      <Menu size={24} />
                    </button>
                  </div>
                </div>
              </nav>
            </motion.div>
          ) : (
            // Transparent header (when hero is visible)
            <motion.div
              key="transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-4 md:py-6"
            >
              <nav
                className="w-full"
                aria-label="Main navigation"
              >
                <div className="flex items-center w-full">
                  {/* Left Section - Logo */}
                  <div className="flex items-center flex-1 px-4 md:px-8 lg:px-12 lg:w-[60%] lg:flex-none">
                    <a
                      href="#hero"
                      onClick={(e) => handleNavClick(e, '#hero')}
                      className="flex items-center gap-3 transition-transform hover:scale-105"
                      aria-label="Lourdes Matha Ayurvedic Hospital - Scroll to top"
                    >
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 relative shadow-xl rounded-full">
                        <Image
                          src="/images/logo.jpeg"
                          alt="Lourdes Matha Ayurvedic Hospital Logo"
                          fill
                          className="object-contain rounded-full border-2 border-white/20"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-black font-serif font-bold text-lg sm:text-xl md:text-2xl leading-tight drop-shadow-sm">
                          Lourdes Matha
                        </span>
                        <span className="text-black/80 font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                          Ayurvedic Hospital
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Right Section - 40% width on desktop, auto on mobile */}
                  <div className="flex items-center justify-between gap-3 px-4 md:px-6 lg:w-[40%]">
                    {/* Navigation Links - Desktop Only */}
                    <ul className="hidden lg:flex items-center gap-6">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-white hover:text-[#B8860B] text-sm font-bold transition-colors duration-200 relative group uppercase tracking-wider"
                          >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B8860B] group-hover:w-full transition-all duration-300" />
                          </a>
                        </li>
                      ))}
                    </ul>

                    {/* Call Button - Icon Only - Desktop & Tablet */}
                    <a
                      href={`tel:+${phoneNumber}`}
                      className="hidden sm:flex items-center justify-center w-12 h-12 bg-[#2d5a4f] text-white rounded-full shadow-lg hover:bg-[#B8860B] transition-all hover:scale-110 active:scale-95 lg:ml-auto"
                      aria-label="Call us"
                    >
                      <Phone size={20} />
                    </a>

                    {/* Mobile Menu Toggle - Extreme Right on Mobile */}
                    <button
                      onClick={() => setIsMobileMenuOpen(true)}
                      className="lg:hidden p-2 text-black/80 hover:text-black bg-white/50 backdrop-blur-sm rounded-lg transition-colors border border-black/10 shadow-sm ml-auto"
                      aria-label="Toggle mobile menu"
                    >
                      <Menu size={24} />
                    </button>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 relative">
                    <Image
                      src="/images/logo.jpeg"
                      alt="Logo"
                      fill
                      className="object-contain rounded-full"
                    />
                  </div>
                  <span className="font-serif font-bold text-lg">LMAH</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-black transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-2xl font-serif font-bold text-gray-800 hover:text-[#2d5a4f] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-12 pt-12 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">Contact Us</p>
                  <a
                    href={`tel:+${phoneNumber}`}
                    className="flex items-center gap-4 text-[#2d5a4f] text-lg font-bold mb-4"
                  >
                    <div className="w-10 h-10 bg-[#2d5a4f]/10 rounded-full flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    +91 91007 73861
                  </a>
                </div>
              </div>

              <div className="p-6 bg-gray-50 mt-auto">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    // Add appoinment logic or scroll to contact
                    scrollToSection('contact');
                  }}
                  className="w-full bg-[#2d5a4f] text-white py-4 rounded-xl font-bold shadow-lg active:scale-[0.98] transition-transform"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
