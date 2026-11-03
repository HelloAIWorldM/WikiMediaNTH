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
 * Enhanced with crystal-clear vector glyphs and perfectly balanced cluster layout
 */
export function ElementTrackBoard({ elementCounts }: ElementTrackBoardProps) {
  return (
    <div className="w-full space-y-2.5 select-none">
      {ELEMENT_ROWS.map((element) => {
        const count = (elementCounts && elementCounts[element]) || 0;
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
            className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#141d2d]/90 border border-[#22334a] hover:border-[#38537a] transition-all shadow-md gap-2"
          >
            {/* Left circular element glyph badge - Crisp glowing vector SVG badge */}
            <div
              className={`w-9 h-9 rounded-full ${theme.badgeBg} border-2 ${theme.borderColor} flex items-center justify-center shadow-md flex-shrink-0 relative overflow-hidden group`}
              title={`${theme.vnName} (${count} điểm)`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <ElementGlyph element={element} className="w-5 h-5 drop-shadow-[0_0_8px_currentColor]" glow={true} />
            </div>

            {/* Clusters Container */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-1">
              {/* Cụm 1: Mốc 1 - 4 nguyên tố */}
              <div
                className={`px-2 py-1 rounded-full flex items-center gap-1 transition-all ${
                  isCluster1Full
                    ? `${theme.bgColor} border-2 ${theme.pillBorder} ${theme.pillGlow}`
                    : 'bg-[#0b121e]/90 border border-[#1e2a3c]'
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
                        <div className="w-2.5 h-2.5 rounded-full bg-[#111927] border border-[#223147] shadow-inner" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cụm 2: Mốc 5 - 8 nguyên tố */}
              <div
                className={`px-2 py-1 rounded-full flex items-center gap-1 transition-all ${
                  isCluster2Full
                    ? `${theme.bgColor} border-2 ${theme.pillBorder} ${theme.pillGlow}`
                    : 'bg-[#0b121e]/90 border border-[#1e2a3c]'
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
                        <div className="w-2.5 h-2.5 rounded-full bg-[#111927] border border-[#223147] shadow-inner" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Cụm 3: Mốc 9 - 12 nguyên tố */}
              <div
                className={`px-2 py-1 rounded-full flex items-center gap-1 transition-all ${
                  isCluster3Full
                    ? `${theme.bgColor} border-2 ${theme.pillBorder} ${theme.pillGlow}`
                    : 'bg-[#0b121e]/90 border border-[#1e2a3c]'
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
                        <div className="w-2.5 h-2.5 rounded-full bg-[#111927] border border-[#223147] shadow-inner" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Level Indicator */}
            <div className="flex-shrink-0 min-w-[42px] text-right font-serif">
              {isLevelActive ? (
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider ${theme.bgColor} ${theme.textColor} border ${theme.borderColor} shadow-sm`}>
                  {levelText}
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold text-slate-500 bg-[#0d1420]/80 border border-[#1e2a3c]">
                  Lv0
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

