"use client";

import { COMPARE_COLORS, getScore, INDICATORS, PROV_CURRENT, PROVINCES } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";



interface ProvinceBarProps {
    indicatorId: string;
    highlighted?: string[];
}

export function ProvinceBar({ indicatorId, highlighted = [] }: ProvinceBarProps) {
    const ind = INDICATORS.find((i: { id: string; }) => i.id === indicatorId)!;
    const sorted = [...PROVINCES]
        .map(p => ({ ...p, value: PROV_CURRENT[p.id][indicatorId], score: getScore(p.id, indicatorId) }))
        .sort((a, b) => b.score - a.score);

    return (
        <div className="flex flex-col gap-2">
            {sorted.map((p, i) => {
                const isHighlighted = highlighted.length === 0 || highlighted.includes(p.id);
                const colorIndex = highlighted.indexOf(p.id);
                const color = colorIndex >= 0 ? COMPARE_COLORS[colorIndex] : ind.color;

                return (
                    <div
                        key={p.id}
                        className={cn(
                            "flex items-center gap-3 transition-opacity duration-300",
                            isHighlighted ? "opacity-100" : "opacity-25"
                        )}
                    >
                        <span className="text-xs text-muted-foreground font-semibold w-5 text-right font-mono">
                            {i + 1}
                        </span>
                        <span
                            className={cn(
                                "text-sm w-28 truncate font-sans",
                                colorIndex >= 0 ? "text-foreground font-bold" : "text-muted-foreground"
                            )}
                        >
                            {p.name}
                        </span>
                        <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700 ease-out"
                                style={{
                                    width: `${(p.score / 100) * 100}%`,
                                    background: `linear-gradient(90deg, ${color}, ${color}bb)`,
                                    boxShadow: `0 0 12px ${color}40`
                                }}
                            />
                        </div>
                        <span
                            className="text-sm font-bold min-w-12 text-right font-mono"
                            style={{ color }}
                        >
                            {p.value}{ind.unit}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

