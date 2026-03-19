"use client";

import { useState } from "react";
import { INDICATORS, getScore, overallScore, PROV_CURRENT, PROVINCES, rankProv, interpolateColor } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";
import { Download, FileJson } from "lucide-react";

interface HeatmapProps {
    activeIndicator: string;
    onIndicatorChange: (id: string) => void;
    onProvinceSelect: (id: string) => void;
}

function exportAllCSV() {
    const header = ["Província", "Pop. (M)", "Score Global", ...INDICATORS.map(i => i.full)];
    const rows = [...PROVINCES]
        .sort((a, b) => overallScore(b.id) - overallScore(a.id))
        .map(p => [p.name, p.pop, overallScore(p.id), ...INDICATORS.map(i => PROV_CURRENT[p.id][i.id])]);
    const csv = [header, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mozambique_all_indicators_2022.csv`;
    a.click();
}

function exportJSON() {
    const data = PROVINCES.map(p => ({
        id: p.id,
        name: p.name,
        population_millions: p.pop,
        overall_score: overallScore(p.id),
        indicators: Object.fromEntries(INDICATORS.map(i => [i.id, {
            value: PROV_CURRENT[p.id][i.id],
            unit: i.unit.trim(),
            score: getScore(p.id, i.id),
        }])),
    }));
    const blob = new Blob([JSON.stringify({ source: "World Bank / INE / UNDP", year: 2022, provinces: data }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mozambique_development_2022.json`;
    a.click();
}

export function Heatmap({ activeIndicator, onIndicatorChange, onProvinceSelect }: HeatmapProps) {
    const [hoveredCell, setHoveredCell] = useState<{ pid: string; iid: string } | null>(null);

    const sortedProvinces = [...PROVINCES].sort((a, b) => overallScore(b.id) - overallScore(a.id));

    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-fade-up">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                    <h2 className="font-serif text-xl font-bold mb-1">Heatmap de Desenvolvimento</h2>
                    <p className="text-sm text-muted-foreground">
                        Todos os indicadores por província · ordenado por score global · clique para explorar
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={exportAllCSV}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        CSV
                    </button>
                    <button
                        onClick={exportJSON}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#3574a5]/30 bg-[#3574a5]/10 text-[#3574a5] text-sm font-medium hover:bg-[#3574a5]/15 transition-colors"
                    >
                        <FileJson className="w-4 h-4" />
                        JSON
                    </button>
                </div>
            </div>

            {/* Indicator legend */}
            <div className="flex flex-wrap gap-2 mb-6">
                {INDICATORS.map(i => (
                    <button
                        key={i.id}
                        onClick={() => onIndicatorChange(i.id)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                            activeIndicator === i.id
                                ? "ring-2 ring-offset-2 ring-offset-card"
                                : "opacity-60 hover:opacity-100"
                        )}
                        style={{
                            backgroundColor: `${i.color}20`,
                            color: i.color,
                            // ringColor: activeIndicator === i.id ? i.color : undefined
                        }}
                    >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i.color }} />
                        {i.label}
                    </button>
                ))}
            </div>

            {/* Heatmap grid */}
            <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                    {/* Header row */}
                    <div className="flex items-center mb-2">
                        <div className="w-32 shrink-0" />
                        <div className="w-16 shrink-0 text-center text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                            Global
                        </div>
                        {INDICATORS.map(i => (
                            <div
                                key={i.id}
                                className={cn(
                                    "flex-1 min-w-16 text-center text-[10px] font-semibold uppercase tracking-wider cursor-pointer transition-opacity",
                                    activeIndicator === i.id ? "opacity-100" : "opacity-50 hover:opacity-80"
                                )}
                                style={{ color: i.color }}
                                onClick={() => onIndicatorChange(i.id)}
                            >
                                {i.label.slice(0, 8)}
                            </div>
                        ))}
                    </div>

                    {/* Data rows */}
                    {sortedProvinces.map((p, ri) => {
                        const overall = overallScore(p.id);
                        return (
                            <div
                                key={p.id}
                                className={cn(
                                    "flex items-center py-2 cursor-pointer transition-colors rounded-lg",
                                    "hover:bg-secondary/50"
                                )}
                                onClick={() => onProvinceSelect(p.id)}
                            >
                                <div className="w-32 shrink-0 flex items-center gap-2 px-2">
                                    <span className="text-[10px] text-muted-foreground font-bold font-mono w-4">
                                        {ri + 1}
                                    </span>
                                    <span className="text-sm font-medium truncate">{p.name}</span>
                                </div>

                                {/* Overall score */}
                                <div className="w-16 shrink-0 flex justify-center">
                                    <span
                                        className={cn(
                                            "px-2 py-1 rounded-md text-xs font-bold font-mono",
                                            overall >= 60 ? "bg-[#2d8a57]/15 text-[#2d8a57]" :
                                                overall >= 45 ? "bg-[#c77b3f]/15 text-[#c77b3f]" :
                                                    "bg-[#c25550]/15 text-[#c25550]"
                                        )}
                                    >
                                        {overall}
                                    </span>
                                </div>

                                {/* Indicator cells */}
                                {INDICATORS.map(i => {
                                    const score = getScore(p.id, i.id);
                                    const value = PROV_CURRENT[p.id][i.id];
                                    const isHovered = hoveredCell?.pid === p.id && hoveredCell?.iid === i.id;
                                    const isActive = activeIndicator === i.id;

                                    return (
                                        <div
                                            key={i.id}
                                            className="flex-1 min-w-16 flex justify-center"
                                            onMouseEnter={() => setHoveredCell({ pid: p.id, iid: i.id })}
                                            onMouseLeave={() => setHoveredCell(null)}
                                        >
                                            <div
                                                className={cn(
                                                    "w-12 h-8 rounded-md flex items-center justify-center text-[11px] font-bold font-mono transition-all",
                                                    isActive ? "ring-2 ring-offset-1 ring-offset-card" : "",
                                                    isHovered ? "scale-110" : ""
                                                )}
                                                style={{
                                                    backgroundColor: interpolateColor(score, i.color),
                                                    color: score > 50 ? "white" : i.color,
                                                    textShadow: score > 50 ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
                                                    // ringColor: isActive ? i.color : undefined,
                                                    boxShadow: isHovered ? `0 4px 12px ${i.color}40` : undefined
                                                }}
                                            >
                                                {value}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Color scale legend */}
            <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Score:</span>
                    <div className="flex items-center gap-1">
                        {[0, 25, 50, 75, 100].map(v => {
                            const ind = INDICATORS.find(i => i.id === activeIndicator)!;
                            return (
                                <div
                                    key={v}
                                    className="w-8 h-4 rounded text-[8px] flex items-center justify-center font-mono"
                                    style={{
                                        backgroundColor: interpolateColor(v, ind.color),
                                        color: v > 50 ? "white" : ind.color
                                    }}
                                >
                                    {v}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    Fonte: Banco Mundial, INE, UNDP · 2022
                </p>
            </div>
        </div>
    );
}
