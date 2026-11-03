'use client';

import React from 'react';
import { ElementType } from '@/data/simulatorData';

interface ElementIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Authentic Nghịch Thủy Hàn Element Glyph SVGs
 * Precisely matched from game screenshot media_1793614096184_be32f6c6.png
 */

// 1. Kim (Golden Delta / Split Apex)
export function KimGlyph({ className = "w-4 h-4", size, glow = false }: ElementIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={`${className} ${glow ? 'drop-shadow-[0_0_6px_#fde047]' : ''}`}
    >
      {/* Left split wing */}
      <path d="M 11.2 3.8 L 4.8 19.5 C 4.5 20.2 5 21 5.8 21 L 11.2 21 Z" />
      {/* Right split wing */}
      <path d="M 12.8 3.8 L 12.8 21 L 18.2 21 C 19 21 19.5 20.2 19.2 19.5 Z" />
    </svg>
  );
}

// 2. Mộc (Emerald Twin Leaves / Sprout)
export function MocGlyph({ className = "w-4 h-4", size, glow = false }: ElementIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={`${className} ${glow ? 'drop-shadow-[0_0_6px_#4ade80]' : ''}`}
    >
      {/* Left upright leaf */}
      <path d="M 11.5 21 C 11.5 17 8 13.5 7.5 8.5 C 7.2 5.5 9 3 11.5 2.5 C 11.8 7 13.5 11 12.8 21 Z" />
      {/* Right companion leaf */}
      <path d="M 13.5 10 C 15.5 8.5 18 9 18.5 11.5 C 19 14.5 16.5 17 13.2 18 C 14.5 15.5 14.2 12.5 13.5 10 Z" />
    </svg>
  );
}

// 3. Thủy (Sky Azure Teardrop Droplet)
export function ThuyGlyph({ className = "w-4 h-4", size, glow = false }: ElementIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={`${className} ${glow ? 'drop-shadow-[0_0_6px_#38bdf8]' : ''}`}
    >
      <path d="M 12 2.5 C 12 2.5 5.5 11 5.5 15.5 C 5.5 19.2 8.4 22 12 22 C 15.6 22 18.5 19.2 18.5 15.5 C 18.5 11 12 2.5 12 2.5 Z" />
    </svg>
  );
}

// 4. Hỏa (Fiery Coral Curling Flame)
export function HoaGlyph({ className = "w-4 h-4", size, glow = false }: ElementIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={`${className} ${glow ? 'drop-shadow-[0_0_6px_#fb7185]' : ''}`}
    >
      <path d="M 12 2 C 12 5.5 9.5 7.8 9.5 11 C 9.5 13.5 11.2 15 13.2 15 C 14.8 15 15.8 14 15.8 12.5 C 15.8 10.8 14.2 9.2 14.2 9.2 C 17.5 10.2 19 13.2 19 16 C 19 19.5 16 22 12 22 C 7.5 22 5 18.2 5 14 C 5 9.2 9.2 5.5 12 2 Z" />
    </svg>
  );
}

// 5. Thổ (Earthy Ochre Mesa Mountain)
export function ThoGlyph({ className = "w-4 h-4", size, glow = false }: ElementIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={`${className} ${glow ? 'drop-shadow-[0_0_6px_#fb923c]' : ''}`}
    >
      <path d="M 7.5 8.5 C 7.5 7.7 8.2 7 9 7 L 15 7 C 15.8 7 16.5 7.7 16.5 8.5 L 20.8 19.5 C 21.2 20.3 20.6 21.2 19.8 21.2 L 4.2 21.2 C 3.4 21.2 2.8 20.3 3.2 19.5 Z" />
    </svg>
  );
}

// 6. Random Element Glyph ? (Luminous Metallic Silver Badge as seen in screenshots)
export function RandomGlyph({ className = "w-4 h-4", size, glow = false }: ElementIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`${className} ${glow ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' : ''}`}
    >
      <circle cx="12" cy="12" r="10" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="8.5" fill="url(#silverGradient)" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fontFamily="sans-serif"
        fill="#1e293b"
      >
        ?
      </text>
      <defs>
        <radialGradient id="silverGradient" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// Unified Element Glyph Renderer
export function ElementGlyph({
  element,
  className = "w-4 h-4",
  size,
  glow = false
}: {
  element: ElementType;
  className?: string;
  size?: number;
  glow?: boolean;
}) {
  switch (element) {
    case 'Kim':
      return <KimGlyph className={`${className} text-[#fef08a]`} size={size} glow={glow} />;
    case 'Moc':
      return <MocGlyph className={`${className} text-[#86efac]`} size={size} glow={glow} />;
    case 'Thuy':
      return <ThuyGlyph className={`${className} text-[#7dd3fc]`} size={size} glow={glow} />;
    case 'Hoa':
      return <HoaGlyph className={`${className} text-[#fda4af]`} size={size} glow={glow} />;
    case 'Tho':
      return <ThoGlyph className={`${className} text-[#fed7aa]`} size={size} glow={glow} />;
    case '?':
      return <RandomGlyph className={className} size={size} glow={glow} />;
  }
}

// Color and Theme Metadata for Elements
export const ELEMENT_THEME: Record<ElementType, {
  name: string;
  vnName: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  pillBorder: string;
  pillGlow: string;
  badgeBg: string;
}> = {
  Kim: {
    name: 'Kim',
    vnName: 'Hệ Kim',
    textColor: 'text-[#fef08a]',
    borderColor: 'border-[#fde047]/60',
    bgColor: 'bg-[#fde047]/15',
    pillBorder: 'border-[#fde047]',
    pillGlow: 'shadow-[0_0_12px_rgba(253,224,71,0.4)]',
    badgeBg: 'bg-[#1e1b0e]',
  },
  Moc: {
    name: 'Mộc',
    vnName: 'Hệ Mộc',
    textColor: 'text-[#86efac]',
    borderColor: 'border-[#4ade80]/60',
    bgColor: 'bg-[#4ade80]/15',
    pillBorder: 'border-[#4ade80]',
    pillGlow: 'shadow-[0_0_12px_rgba(74,222,128,0.4)]',
    badgeBg: 'bg-[#0d1a14]',
  },
  Thuy: {
    name: 'Thủy',
    vnName: 'Hệ Thủy',
    textColor: 'text-[#7dd3fc]',
    borderColor: 'border-[#38bdf8]/60',
    bgColor: 'bg-[#38bdf8]/15',
    pillBorder: 'border-[#38bdf8]',
    pillGlow: 'shadow-[0_0_12px_rgba(56,189,248,0.4)]',
    badgeBg: 'bg-[#0d1824]',
  },
  Hoa: {
    name: 'Hỏa',
    vnName: 'Hệ Hỏa',
    textColor: 'text-[#fda4af]',
    borderColor: 'border-[#fb7185]/60',
    bgColor: 'bg-[#fb7185]/15',
    pillBorder: 'border-[#fb7185]',
    pillGlow: 'shadow-[0_0_12px_rgba(251,113,133,0.4)]',
    badgeBg: 'bg-[#220e14]',
  },
  Tho: {
    name: 'Thổ',
    vnName: 'Hệ Thổ',
    textColor: 'text-[#fed7aa]',
    borderColor: 'border-[#fb923c]/60',
    bgColor: 'bg-[#fb923c]/15',
    pillBorder: 'border-[#fb923c]',
    pillGlow: 'shadow-[0_0_12px_rgba(251,146,60,0.4)]',
    badgeBg: 'bg-[#22160e]',
  },
  '?': {
    name: '?',
    vnName: 'Ngẫu Nhiên',
    textColor: 'text-slate-200',
    borderColor: 'border-slate-400/60',
    bgColor: 'bg-slate-500/20',
    pillBorder: 'border-slate-400',
    pillGlow: 'shadow-[0_0_8px_rgba(203,213,225,0.4)]',
    badgeBg: 'bg-[#18202f]',
  },
};

