"use client";

import { useState } from "react";
import { getScore, INDICATORS, interpolateColor, PROV_CURRENT, PROVINCE_PATHS, PROVINCES, rankProv } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";

interface MozambiqueMapProps {
    indicatorId: string;
    onProvinceClick: (id: string) => void;
    selectedProvince: string | null;
}

export function MozambiqueMap({
    indicatorId,
    onProvinceClick,
    selectedProvince
}: MozambiqueMapProps) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; pid: string } | null>(null);
    const ind = INDICATORS.find(i => i.id === indicatorId)!;

    return (
        <div className="relative flex flex-col lg:flex-row gap-6 items-start">
            {/* Map SVG */}
            <div className="flex-shrink-0 relative">
                <svg
                    viewBox="0 0 280 360"
                    className="w-full max-w-[320px] h-auto"
                    style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.3))" }}
                    onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                >
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
                        </linearGradient>
                    </defs>

                    {/* Ocean background */}
                    <rect x="0" y="0" width="280" height="360" fill="url(#ocean)" rx="16" />

                    {/* Grid lines */}
                    {[50, 100, 150, 200, 250, 300].map(y => (
                        <line
                            key={`h-${y}`}
                            x1="0"
                            y1={y}
                            x2="280"
                            y2={y}
                            stroke="currentColor"
                            strokeOpacity="0.05"
                            strokeWidth="1"
                        />
                    ))}
                    {[70, 140, 210].map(x => (
                        <line
                            key={`v-${x}`}
                            x1={x}
                            y1="0"
                            x2={x}
                            y2="360"
                            stroke="currentColor"
                            strokeOpacity="0.05"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Provinces */}
                    {PROVINCES.map(p => {
                        const pdata = PROVINCE_PATHS[p.id];
                        const score = getScore(p.id, indicatorId);
                        const val = PROV_CURRENT[p.id][indicatorId];
                        const fill = interpolateColor(score, ind.color);
                        const isHov = hovered === p.id;
                        const isSel = selectedProvince === p.id;

                        return (
                            <g
                                key={p.id}
                                onMouseEnter={() => {
                                    setHovered(p.id);
                                    setTooltip({ x: pdata.cx, y: pdata.cy, pid: p.id });
                                }}
                                onMouseLeave={() => { setHovered(null); setTooltip(null); }}
                                onClick={() => onProvinceClick(p.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <path
                                    d={pdata.path}
                                    fill={fill}
                                    stroke={isSel ? ind.color : isHov ? `${ind.color}cc` : "rgba(255,255,255,0.2)"}
                                    strokeWidth={isSel ? "3" : isHov ? "2" : "1"}
                                    style={{
                                        transition: "all 0.2s ease",
                                        filter: isHov || isSel ? "brightness(1.2)" : "none"
                                    }}
                                />
                                <text
                                    x={pdata.cx}
                                    y={pdata.cy - 4}
                                    textAnchor="middle"
                                    fill={isHov || isSel ? ind.color : "white"}
                                    fontSize={p.id === "maputo_city" ? "6" : "8"}
                                    fontWeight="700"
                                    className="pointer-events-none font-sans"
                                    style={{ transition: "all 0.15s", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                                >
                                    {p.short}
                                </text>
                                <text
                                    x={pdata.cx}
                                    y={pdata.cy + 8}
                                    textAnchor="middle"
                                    fill={isHov || isSel ? ind.color : "rgba(255,255,255,0.8)"}
                                    fontSize={p.id === "maputo_city" ? "6" : "7"}
                                    fontWeight="600"
                                    className="pointer-events-none font-mono"
                                    style={{ transition: "all 0.15s", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                                >
                                    {val}{ind.unit}
                                </text>
                            </g>
                        );
                    })}

                    {/* Tooltip */}
                    {tooltip && hovered && (() => {
                        const p = PROVINCES.find(x => x.id === hovered)!;
                        const val = PROV_CURRENT[hovered][indicatorId];
                        const score = getScore(hovered, indicatorId);
                        const rank = rankProv(hovered, indicatorId);
                        const tx = Math.min(Math.max(tooltip.x, 70), 210);
                        const ty = tooltip.y < 180 ? tooltip.y + 35 : tooltip.y - 75;

                        return (
                            <g className="pointer-events-none">
                                <rect
                                    x={tx - 60}
                                    y={ty - 10}
                                    width="120"
                                    height="65"
                                    rx="10"
                                    fill="var(--card)"
                                    stroke={ind.color}
                                    strokeOpacity="0.3"
                                    strokeWidth="1.5"
                                    style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }}
                                />
                                <text
                                    x={tx}
                                    y={ty + 6}
                                    textAnchor="middle"
                                    fill="currentColor"
                                    fontSize="10"
                                    fontWeight="700"
                                    className="font-sans"
                                >
                                    {p.name}
                                </text>
                                <text
                                    x={tx}
                                    y={ty + 22}
                                    textAnchor="middle"
                                    fill={ind.color}
                                    fontSize="14"
                                    fontWeight="800"
                                    className="font-mono"
                                >
                                    {val}{ind.unit}
                                </text>
                                <text
                                    x={tx}
                                    y={ty + 36}
                                    textAnchor="middle"
                                    fill="currentColor"
                                    fillOpacity="0.5"
                                    fontSize="8"
                                    className="font-sans"
                                >
                                    Score: {score} · Rank #{rank}
                                </text>
                                <text
                                    x={tx}
                                    y={ty + 48}
                                    textAnchor="middle"
                                    fill="currentColor"
                                    fillOpacity="0.4"
                                    fontSize="7"
                                    className="font-sans"
                                >
                                    {p.pop}M habitantes
                                </text>
                            </g>
                        );
                    })()}

                    {/* Compass */}
                    <g transform="translate(250, 330)">
                        <circle cx="0" cy="0" r="14" fill="var(--card)" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
                        <text x="0" y="-4" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="700" className="font-sans">N</text>
                        <polygon points="0,-10 -3,-4 3,-4" fill={ind.color} />
                        <polygon points="0,10 -3,4 3,4" fill="currentColor" fillOpacity="0.3" />
                    </g>
                </svg>
            </div>

            {/* Legend + Province detail */}
            <div className="flex-1 min-w-[240px] flex flex-col gap-4">
                {/* Color scale */}
                <div className="bg-card rounded-xl p-4 border border-border">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">
                        {ind.full}
                    </p>
                    <div
                        className="h-3 rounded-full mb-2"
                        style={{ background: `linear-gradient(90deg, ${ind.color}20, ${ind.color}80, ${ind.color})` }}
                    />
                    <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Baixo</span>
                        <span className="text-xs text-muted-foreground">Alto</span>
                    </div>
                </div>

                {/* Province ranking */}
                <div className="bg-card rounded-xl p-4 border border-border max-h-80 overflow-y-auto">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">
                        Ranking
                    </p>
                    <div className="flex flex-col gap-1.5">
                        {[...PROVINCES]
                            .sort((a, b) => getScore(b.id, indicatorId) - getScore(a.id, indicatorId))
                            .map((p, i) => {
                                const score = getScore(p.id, indicatorId);
                                const val = PROV_CURRENT[p.id][indicatorId];
                                const isSel = selectedProvince === p.id;

                                return (
                                    <div
                                        key={p.id}
                                        onClick={() => onProvinceClick(p.id)}
                                        className={cn(
                                            "flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-all",
                                            isSel ? "bg-secondary" : "hover:bg-secondary/50"
                                        )}
                                        style={{ borderLeft: isSel ? `3px solid ${ind.color}` : "3px solid transparent" }}
                                    >
                                        <span className="text-[10px] text-muted-foreground font-bold w-4 font-mono">
                                            {i + 1}
                                        </span>
                                        <span className={cn(
                                            "text-xs flex-1 truncate",
                                            isSel ? "text-foreground font-semibold" : "text-muted-foreground"
                                        )}>
                                            {p.name}
                                        </span>
                                        <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: `${score}%`, backgroundColor: ind.color }}
                                            />
                                        </div>
                                        <span
                                            className="text-xs font-bold min-w-8 text-right font-mono"
                                            style={{ color: ind.color }}
                                        >
                                            {val}{ind.unit}
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* Selected province detail */}
                {selectedProvince && (() => {
                    const p = PROVINCES.find(x => x.id === selectedProvince)!;
                    return (
                        <div
                            className="bg-card rounded-xl p-4 border-2 transition-all"
                            style={{
                                borderColor: `${ind.color}40`,
                                boxShadow: `0 4px 24px ${ind.color}15`
                            }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: ind.color, boxShadow: `0 0 8px ${ind.color}` }}
                                />
                                <span className="font-serif text-lg font-bold">{p.name}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {INDICATORS.map(i => {
                                    const v = PROV_CURRENT[selectedProvince][i.id];
                                    return (
                                        <div
                                            key={i.id}
                                            className="p-2 rounded-lg"
                                            style={{ backgroundColor: `${i.color}15` }}
                                        >
                                            <div
                                                className="text-[10px] font-semibold mb-1"
                                                style={{ color: i.color }}
                                            >
                                                {i.label}
                                            </div>
                                            <div
                                                className="text-sm font-bold font-mono"
                                                style={{ color: i.color }}
                                            >
                                                {v}
                                                <span className="text-[10px] opacity-60">{i.unit}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
