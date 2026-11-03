'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ArticleClientEnhancer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Wire up language switch buttons if article has .tl-bar
  useEffect(() => {
    const viBtn = document.querySelector('.tl-set-vi');
    const enBtn = document.querySelector('.tl-set-en');
    const tlContainer = document.querySelector('.tl');

    if (viBtn && enBtn && tlContainer) {
      tlContainer.classList.add('js');
      viBtn.classList.add('is-on');

      const handleVi = (e: Event) => {
        e.preventDefault();
        tlContainer.classList.remove('is-en');
        viBtn.classList.add('is-on');
        enBtn.classList.remove('is-on');
      };

      const handleEn = (e: Event) => {
        e.preventDefault();
        tlContainer.classList.add('is-en');
        enBtn.classList.add('is-on');
        viBtn.classList.remove('is-on');
      };

      viBtn.addEventListener('click', handleVi);
      enBtn.addEventListener('click', handleEn);

      return () => {
        viBtn.removeEventListener('click', handleVi);
        enBtn.removeEventListener('click', handleEn);
      };
    }
  }, []);

  return (
    <>
      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#0a1f33] hover:bg-[#0284c7] text-white flex items-center justify-center shadow-2xl border-2 border-white/60 transition-all duration-300 hover:scale-110"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </>
  );
}
