'use client';

import React from 'react';
import { ElementType } from '@/data/simulatorData';
import { ElementGlyph, ELEMENT_THEME } from './ElementIcons';

interface ElementTrackBoardProps {
  elementCounts: Record<ElementType, number>;
}

const ELEMENT_ROWS: ElementType[] = ['Kim', 'Moc', 'Thuy', 'Hoa', 'Tho'];

/**
 * Authentic 5-Row Element Resonance Track Board
 * Exactly reproduced from in-game screen media_1793614096184_be32f6c6.png
 */
export function ElementTrackBoard({ elementCounts }: ElementTrackBoardProps) {
  return (
    <div className="w-full space-y-2 select-none">
      {ELEMENT_ROWS.map((element) => {
        const count = elementCounts[element] || 0;
        const theme = ELEMENT_THEME[element];

        // Chu thiên level: >= 10 is Lv3, >= 7 is Lv2, >= 4 is Lv1, else inactive
        let levelText = 'Lv0';
        let isLevelActive = false;
        if (count >= 10) {
          levelText = 'Lv3';
          isLevelActive = true;
        } else if (count >= 7) {
          levelText = 'Lv2';
          isLevelActive = true;
        } else if (count >= 4) {
          levelText = 'Lv1';
          isLevelActive = true;
        }

        // 3 Clusters of 4 nodes each: [1..4], [5..8], [9..12]
        const cluster1Filled = Math.min(Math.max(count, 0), 4);
        const cluster2Filled = Math.min(Math.max(count - 4, 0), 4);
        const cluster3Filled = Math.min(Math.max(count - 8, 0), 4);

        const isCluster1Full = cluster1Filled === 4;
        const isCluster2Full = cluster2Filled === 4;
        const isCluster3Full = cluster3Filled === 4;

        return (
          <div
            key={element}
            className="flex items-center justify-between px-3 py-1.5 rounded-full bg-[#182234]/85 border border-[#2a3b53] hover:border-[#3d5475] transition-all shadow-inner"
          >
            {/* Left circular element glyph badge (cropped directly from game screenshot 4) */}
            <div className={`w-8 h-8 rounded-full ${theme.badgeBg} border ${theme.borderColor} flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden`}>
              <img
                src={`/images/kungfu/element_${element.toLowerCase()}.png`}
                alt={element}
                className="w-full h-full object-cover scale-110"
              />
            </div>

            {/* Clusters Container */}
            <div className="flex items-center gap-1.5 sm:gap-2 mx-2">
              {/* Cụm 1: Mốc 1 - 4 nguyên tố */}
              <div
                className={`px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                  isCluster1Full
                    ? `${theme.bgColor} border-2 ${theme.pillBorder} ${theme.pillGlow}`
                    : 'bg-[#0b121e]/80 border border-[#1e2a3c]'
                }`}
              >
                {[0, 1, 2, 3].map((slotIdx) => {
                  const isNodeActive = slotIdx < cluster1Filled;
                  return (
                    <div
                      key={slotIdx}
                      className="w-4 h-4 flex items-center justify-center"
                    >
                      {isNodeActive ? (
                        <ElementGlyph element={element} className="w-3.5 h-3.5" glow={true} />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#070b13] border border-[#162030]" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cụm 2: Mốc 5 - 8 nguyên tố */}
              <div
                className={`px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                  isCluster2Full
                    ? `${theme.bgColor} border-2 ${theme.pillBorder} ${theme.pillGlow}`
                    : 'bg-[#0b121e]/80 border border-[#1e2a3c]'
                }`}
              >
                {[0, 1, 2, 3].map((slotIdx) => {
                  const isNodeActive = slotIdx < cluster2Filled;
                  return (
                    <div
                      key={slotIdx}
                      className="w-4 h-4 flex items-center justify-center"
                    >
                      {isNodeActive ? (
                        <ElementGlyph element={element} className="w-3.5 h-3.5" glow={true} />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#070b13] border border-[#162030]" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cụm 3: Mốc 9 - 12 nguyên tố */}
              <div
                className={`px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                  isCluster3Full
                    ? `${theme.bgColor} border-2 ${theme.pillBorder} ${theme.pillGlow}`
                    : 'bg-[#0b121e]/80 border border-[#1e2a3c]'
                }`}
              >
                {[0, 1, 2, 3].map((slotIdx) => {
                  const isNodeActive = slotIdx < cluster3Filled;
                  return (
                    <div
                      key={slotIdx}
                      className="w-4 h-4 flex items-center justify-center"
                    >
                      {isNodeActive ? (
                        <ElementGlyph element={element} className="w-3.5 h-3.5" glow={true} />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#070b13] border border-[#162030]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Level Indicator */}
            <div className="flex-shrink-0 min-w-[36px] text-right font-serif">
              <span
                className={`text-xs font-bold font-mono tracking-wider ${
                  isLevelActive ? 'text-white' : 'text-slate-500'
                }`}
              >
                {levelText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

