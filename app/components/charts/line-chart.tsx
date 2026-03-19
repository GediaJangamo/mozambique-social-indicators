"use client";

import { useState, useEffect, useRef } from "react";

interface DataPoint {
    year: number;
    value: number;
}

interface Dataset {
    label: string;
    color: string;
    data: DataPoint[];
}

interface LineChartProps {
    datasets: Dataset[];
    height?: number;
    showArea?: boolean;
    showDots?: boolean;
}

export function LineChart({
    datasets,
    height = 240,
    showArea = true,
    showDots = true
}: LineChartProps) {
    const W = 520, pL = 48, pR = 48, pT = 20, pB = 40;
    const cW = W - pL - pR, cH = height - pT - pB;

    const allV = datasets.flatMap(d => d.data.map(p => p.value));
    const allY = datasets.flatMap(d => d.data.map(p => p.year));
    const minV = Math.min(...allV) * 0.9, maxV = Math.max(...allV) * 1.08;
    const minY = Math.min(...allY), maxY = Math.max(...allY);

    const xs = (y: number) => pL + ((y - minY) / (maxY - minY)) * cW;
    const ys = (v: number) => pT + cH - ((v - minV) / (maxV - minV)) * cH;

    const [prog, setProg] = useState(0);
    const raf = useRef<number | null>(null);

    useEffect(() => {
        setProg(0);
        let start: number | null = null;

        const run = (t: number) => {
            if (!start) start = t;
            const p = Math.min((t - start) / 800, 1);
            setProg(p);
            if (p < 1) raf.current = requestAnimationFrame(run);
        };

        raf.current = requestAnimationFrame(run);
        return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }, [datasets.map(d => d.label).join()]);

    const years = [...new Set(allY)].sort((a, b) => a - b);
    const gridVs = [0, 0.25, 0.5, 0.75, 1].map(t => minV + t * (maxV - minV));

    return (
        <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto overflow-visible">
            <defs>
                {datasets.map(d => (
                    <linearGradient key={d.color} id={`lg-${d.color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={d.color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={d.color} stopOpacity="0" />
                    </linearGradient>
                ))}
                <clipPath id="chart-clip">
                    <rect x={pL} y={0} width={cW * prog} height={height} />
                </clipPath>
            </defs>

            {/* Grid lines */}
            {gridVs.map((v, i) => {
                const y = ys(v);
                return (
                    <g key={i}>
                        <line
                            x1={pL}
                            y1={y}
                            x2={pL + cW}
                            y2={y}
                            stroke="currentColor"
                            strokeOpacity="0.1"
                            strokeWidth="1"
                        />
                        <text
                            x={pL - 12}
                            y={y + 4}
                            fill="currentColor"
                            fillOpacity="0.4"
                            fontSize="10"
                            textAnchor="end"
                            className="font-sans"
                        >
                            {v.toFixed(v < 10 ? 1 : 0)}
                        </text>
                    </g>
                );
            })}

            {/* Year labels */}
            {years.map(y => (
                <text
                    key={y}
                    x={xs(y)}
                    y={pT + cH + 24}
                    fill="currentColor"
                    fillOpacity="0.4"
                    fontSize="11"
                    textAnchor="middle"
                    className="font-sans font-medium"
                >
                    {y}
                </text>
            ))}

            {/* Data lines and areas */}
            {datasets.map(d => {
                const pts = d.data.map(p => `${xs(p.year)},${ys(p.value)}`);
                const area = `M${pts.join(" L")} L${xs(d.data.at(-1)!.year)},${pT + cH} L${xs(d.data[0].year)},${pT + cH} Z`;
                const line = d.data.map((p, i) => `${i === 0 ? "M" : "L"}${xs(p.year)},${ys(p.value)}`).join(" ");
                const last = d.data.at(-1)!;

                return (
                    <g key={d.color}>
                        {showArea && (
                            <path
                                d={area}
                                fill={`url(#lg-${d.color.replace("#", "")})`}
                                clipPath="url(#chart-clip)"
                            />
                        )}
                        <path
                            d={line}
                            fill="none"
                            stroke={d.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            clipPath="url(#chart-clip)"
                            style={{ filter: `drop-shadow(0 2px 4px ${d.color}30)` }}
                        />
                        {showDots && prog > 0.9 && d.data.map(p => (
                            <circle
                                key={p.year}
                                cx={xs(p.year)}
                                cy={ys(p.value)}
                                r="5"
                                fill="var(--card)"
                                stroke={d.color}
                                strokeWidth="2.5"
                                className="transition-transform hover:scale-125"
                            />
                        ))}
                        {prog > 0.95 && (
                            <text
                                x={xs(last.year) + 12}
                                y={ys(last.value) + 5}
                                fill={d.color}
                                fontSize="13"
                                fontWeight="700"
                                className="font-sans"
                            >
                                {last.value}
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}
