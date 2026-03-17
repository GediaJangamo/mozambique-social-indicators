"use client";

import { COMPARE_COLORS, getScore, INDICATORS } from "@/app/lib/data";



interface RadarChartProps {
    provinces: string[];
    size?: number;
}

export function RadarChart({ provinces, size = 220 }: RadarChartProps) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.35;
    const n = INDICATORS.length;
    const angles = INDICATORS.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);

    return (
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="overflow-visible">
            {/* Background rings */}
            {[0.25, 0.5, 0.75, 1].map(lv => (
                <polygon
                    key={lv}
                    points={angles.map(a => `${cx + Math.cos(a) * r * lv},${cy + Math.sin(a) * r * lv}`).join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeWidth="1"
                />
            ))}

            {/* Axis lines */}
            {angles.map((a, i) => (
                <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + Math.cos(a) * r}
                    y2={cy + Math.sin(a) * r}
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeWidth="1"
                />
            ))}

            {/* Labels */}
            {angles.map((a, i) => {
                const lx = cx + Math.cos(a) * (r + 24);
                const ly = cy + Math.sin(a) * (r + 24);
                return (
                    <text
                        key={i}
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="currentColor"
                        fillOpacity="0.5"
                        fontSize="9"
                        className="font-sans font-medium"
                    >
                        {INDICATORS[i].label}
                    </text>
                );
            })}

            {/* Data polygons */}
            {provinces.map((pid, pi) => {
                const col = COMPARE_COLORS[pi % COMPARE_COLORS.length];
                const pts = INDICATORS.map((ind, i) => {
                    const s = getScore(pid, ind.id) / 100;
                    return `${cx + Math.cos(angles[i]) * r * s},${cy + Math.sin(angles[i]) * r * s}`;
                }).join(" ");

                return (
                    <g key={pid}>
                        <polygon
                            points={pts}
                            fill={col}
                            fillOpacity="0.15"
                            stroke={col}
                            strokeWidth="2"
                            style={{ filter: `drop-shadow(0 0 8px ${col}40)` }}
                        />
                        {INDICATORS.map((ind, i) => {
                            const s = getScore(pid, ind.id) / 100;
                            return (
                                <circle
                                    key={i}
                                    cx={cx + Math.cos(angles[i]) * r * s}
                                    cy={cy + Math.sin(angles[i]) * r * s}
                                    r="4"
                                    fill={col}
                                />
                            );
                        })}
                    </g>
                );
            })}
        </svg>
    );
}
