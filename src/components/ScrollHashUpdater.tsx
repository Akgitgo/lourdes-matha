"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollHashUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on the home page
    if (pathname !== '/') return;

    const sections = [
      'hero',
      'services',
      'why-choose-us',
      'about',
      'mission',
      'gallery',
      'testimonials',
      'contact',
    ];

    // Create intersection observers for each section
    const observers: IntersectionObserver[] = [];
    const sectionElements: { id: string; element: HTMLElement | null }[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        sectionElements.push({ id, element });
      }
    });

    // Track which section is currently most visible
    let currentHash = '';
    let ticking = false;

    const updateHash = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        // Find the section that's most visible in the viewport
        let maxVisibility = 0;
        let mostVisibleSection = '';

        sectionElements.forEach(({ id, element }) => {
          if (!element) return;

          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const windowWidth = window.innerWidth;

          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / Math.min(rect.height, windowHeight);

          // Prefer sections that are near the top of the viewport
          const topDistance = Math.abs(rect.top);
          const adjustedVisibility = visibility * (1 - Math.min(topDistance / windowHeight, 0.5));

          if (adjustedVisibility > maxVisibility && rect.top < windowHeight * 0.5) {
            maxVisibility = adjustedVisibility;
            mostVisibleSection = id;
          }
        });

        // Update hash if a different section is most visible
        if (mostVisibleSection && mostVisibleSection !== currentHash) {
          currentHash = mostVisibleSection;
          // Use history.replaceState to update URL without scrolling
          window.history.replaceState(
            null,
            '',
            `#${mostVisibleSection}`
          );
        }

        ticking = false;
      });
    };

    // Create observers for each section
    sectionElements.forEach(({ id, element }) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        () => {
          updateHash();
        },
        {
          root: null,
          rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper portion of viewport
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Also listen to scroll events for more frequent updates
    const handleScroll = () => {
      updateHash();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle initial hash on page load
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    
    // Initial hash update
    updateHash();

    // Cleanup
    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return null;
}

