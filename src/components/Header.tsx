"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, Phone } from 'react-feather';

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
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false); // Close mobile menu after navigation
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
                className="bg-white/8 backdrop-blur-md border border-white/10 rounded-full shadow-lg px-6 md:px-8 py-3 max-w-6xl w-full"
                aria-label="Main navigation"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Logo - Left */}
                  <div className="flex items-center">
                    <a
                      href="#hero"
                      onClick={(e) => scrollToSection(e, 'hero')}
                      className="flex items-center gap-2 transition-transform hover:scale-105"
                      aria-label="Grace Garden - Scroll to top"
                    >
                      <Image
                        src="/images/Logo.jpg"
                        alt="Grace Garden Logo"
                        width={100}
                        height={32}
                        className="max-h-8 md:max-h-10 w-auto object-contain"
                        priority
                      />
                      <span className="text-[#D4AF37] font-serif font-semibold text-xl md:text-2xl whitespace-nowrap">
                        Grace Garden
                      </span>
                    </a>
                  </div>

                  {/* Navigation Links - Center (Desktop only) */}
                  <div className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex items-center gap-6 xl:gap-8">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href.substring(1))}
                            className="text-emerald-700 hover:text-emerald-600 text-lg font-medium transition-colors duration-200 relative group whitespace-nowrap"
                          >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Side: Call Button (All screens) & Hamburger Menu (Mobile/Tablet only) */}
                  <div className="flex items-center gap-3">
                    {/* Call Button - Visible on all screens */}
                    <a
                      href={`tel:+${phoneNumber}`}
                      className="w-10 h-10 bg-primary rounded-full shadow-md flex items-center justify-center text-white hover:bg-primary/90 transition-all hover:scale-110 relative group"
                      aria-label="Call Now"
                    >
                      <Phone size={18} />
                      <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Call Now
                      </span>
                    </a>
                    {/* Hamburger Menu Button - Mobile & Tablet only */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 text-slate-900 hover:bg-slate-100/20 rounded-full transition-colors flex items-center justify-center lg:hidden"
                      aria-label="Toggle mobile menu"
                      aria-expanded={isMobileMenuOpen}
                    >
                      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="px-4 py-2 md:py-3"
            >
              <nav
                className="max-w-7xl mx-auto"
                aria-label="Main navigation"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Logo - Left */}
                  <div className="flex items-center">
                    <a
                      href="#hero"
                      onClick={(e) => scrollToSection(e, 'hero')}
                      className="flex items-center gap-2 transition-transform hover:scale-105"
                      aria-label="Grace Garden - Scroll to top"
                    >
                      <Image
                        src="/images/Logo.jpg"
                        alt="Grace Garden Logo"
                        width={160}
                        height={50}
                        className="max-h-10 sm:max-h-12 md:max-h-14 w-auto object-contain"
                        priority
                      />
                      <span className="text-[#D4AF37] font-serif font-semibold text-xl sm:text-2xl md:text-3xl whitespace-nowrap drop-shadow-lg">
                        Grace Garden
                      </span>
                    </a>
                  </div>

                  {/* Navigation Links - Center (Desktop only) */}
                  <div className="hidden lg:flex flex-1 justify-center">
                    <ul className="flex items-center gap-6 xl:gap-8">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href.substring(1))}
                            className="text-white hover:text-white/80 text-lg font-medium transition-colors duration-200 relative group drop-shadow-md whitespace-nowrap"
                          >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Side: Call Button (All screens) & Hamburger Menu (Mobile/Tablet only) */}
                  <div className="flex items-center gap-3">
                    {/* Call Button - Visible on all screens */}
                    <a
                      href={`tel:+${phoneNumber}`}
                      className="w-10 h-10 bg-primary rounded-full shadow-md flex items-center justify-center text-white hover:bg-primary/90 transition-all hover:scale-110 relative group backdrop-blur-sm"
                      aria-label="Call Now"
                    >
                      <Phone size={18} />
                      <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Call Now
                      </span>
                    </a>
                    {/* Hamburger Menu Button - Mobile & Tablet only */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 text-slate-900 hover:bg-slate-100/20 rounded-full transition-colors backdrop-blur-sm flex items-center justify-center lg:hidden"
                      aria-label="Toggle mobile menu"
                      aria-expanded={isMobileMenuOpen}
                    >
                      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Menu Content */}
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-20 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <nav aria-label="Mobile navigation">
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href.substring(1))}
                        className="block text-white hover:text-emerald-400 text-lg font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  <li className="pt-4 border-t border-white/10">
                    <a
                      href="#enquire"
                      onClick={(e) => scrollToSection(e, 'enquire')}
                      className="block text-center px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                      aria-label="Enquire Now"
                    >
                      Enquire Now
                    </a>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
