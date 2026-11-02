"use client";

import React from "react";
import { RadarStats } from "@/data/wikiData";

interface RadarChartProps {
  stats: RadarStats;
  color?: string;
}

const AXES = [
  {
    key: "satThuong" as keyof RadarStats,
    label: "Sát thương",
    anchor: "middle",
    dy: -8,
  },
  {
    key: "phongThu" as keyof RadarStats,
    label: "Phòng thủ",
    anchor: "start",
    dx: 8,
    dy: -4,
  },
  {
    key: "coDong" as keyof RadarStats,
    label: "Cơ động",
    anchor: "start",
    dx: 8,
    dy: 14,
  },
  {
    key: "tamDanh" as keyof RadarStats,
    label: "Tầm đánh",
    anchor: "middle",
    dy: 18,
  },
  {
    key: "hoTro" as keyof RadarStats,
    label: "Hỗ trợ",
    anchor: "end",
    dx: -8,
    dy: 14,
  },
  {
    key: "doKho" as keyof RadarStats,
    label: "Độ khó",
    anchor: "end",
    dx: -8,
    dy: -4,
  },
];

const RINGS = [0.25, 0.5, 0.75, 1];
const CENTER_X = 120;
const CENTER_Y = 120;
const MAX_RADIUS = 76;

function polarToCartesian(deg: number, radius: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [CENTER_X + radius * Math.cos(rad), CENTER_Y + radius * Math.sin(rad)];
}

const ANGLES = AXES.map((_, i) => -90 + 60 * i);

export default function SectRadarChart({
  stats,
  color = "#60a5fa",
}: RadarChartProps) {
  // Compute polygon points
  const points = AXES.map((axis, i) => {
    const rawVal = stats[axis.key] || 0;
    const ratio = Math.max(0.1, Math.min(100, rawVal)) / 100;
    return polarToCartesian(ANGLES[i], MAX_RADIUS * ratio);
  });

  const polygonPointsStr = points
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  return (
    <div className="relative w-[240px] h-[240px] flex items-center justify-center select-none">
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        className="overflow-visible"
      >
        {/* Background web rings (Hexagons) */}
        {RINGS.map((ring, ringIdx) => {
          const ringPoints = ANGLES.map((deg) =>
            polarToCartesian(deg, MAX_RADIUS * ring),
          );
          const ringPointsStr = ringPoints
            .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
            .join(" ");
          return (
            <polygon
              key={ringIdx}
              points={ringPointsStr}
              fill="none"
              stroke="#2e384d"
              strokeWidth="1"
              strokeDasharray={ringIdx === RINGS.length - 1 ? undefined : "2,2"}
              opacity={0.7}
            />
          );
        })}

        {/* Axis spokes from center */}
        {ANGLES.map((deg, i) => {
          const [endX, endY] = polarToCartesian(deg, MAX_RADIUS);
          return (
            <line
              key={i}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={endX}
              y2={endY}
              stroke="#2e384d"
              strokeWidth="1"
              opacity={0.6}
            />
          );
        })}

        {/* Stat Value Filled Polygon */}
        <polygon
          points={polygonPointsStr}
          fill="rgba(59, 130, 246, 0.28)"
          stroke="#60a5fa"
          strokeWidth="2"
          className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
        />

        {/* Vertex dots */}
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="#93c5fd"
            stroke="#1e3a8a"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
        ))}

        {/* Labels & Numerical Values around vertices */}
        {AXES.map((axis, i) => {
          const [labelX, labelY] = polarToCartesian(ANGLES[i], MAX_RADIUS + 12);
          const val = stats[axis.key];
          return (
            <g key={axis.key}>
              <text
                x={labelX + (axis.dx || 0)}
                y={labelY + (axis.dy || 0)}
                textAnchor={axis.anchor as any}
                className="fill-ink-300 text-[10px] font-sans"
              >
                {axis.label}
              </text>
              <text
                x={labelX + (axis.dx || 0)}
                y={labelY + (axis.dy || 0) + 11}
                textAnchor={axis.anchor as any}
                className="fill-gold-bright text-[11px] font-mono font-bold"
              >
                {val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
