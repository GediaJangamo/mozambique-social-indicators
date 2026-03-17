"use client";

import { useState, useMemo } from "react";

import { Search, Download, FileJson, ChevronUp, ChevronDown } from "lucide-react";
import { getScore, INDICATORS, interpolateColor, overallScore, PROV_CURRENT, PROVINCES, rankProv } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";

interface DataTableProps {
    indicatorId: string;
}

function exportCSV(indicatorId: string) {
    const ind = INDICATORS.find(i => i.id === indicatorId)!;
    const header = ["Província", "Pop. (M)", ind.full + " (" + ind.unit.trim() + ")", "Score (0-100)", "Rank"];
    const rows = [...PROVINCES]
        .sort((a, b) => getScore(b.id, indicatorId) - getScore(a.id, indicatorId))
        .map((p, i) => [p.name, p.pop, PROV_CURRENT[p.id][indicatorId], getScore(p.id, indicatorId), i + 1]);
    const csv = [header, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mozambique_${indicatorId}_2022.csv`;
    a.click();
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
            rank: rankProv(p.id, i.id),
        }])),
    }));
    const blob = new Blob([JSON.stringify({ source: "World Bank / INE / UNDP", year: 2022, provinces: data }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mozambique_development_2022.json`;
    a.click();
}

export function DataTable({ indicatorId }: DataTableProps) {
    const [sortBy, setSortBy] = useState<string>("score");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
    const [search, setSearch] = useState("");
    const ind = INDICATORS.find(i => i.id === indicatorId)!;

    const handleSort = (col: string) => {
        if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortBy(col); setSortDir("desc"); }
    };

    const data = useMemo(() => {
        return PROVINCES
            .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
            .map(p => ({
                ...p,
                value: PROV_CURRENT[p.id][indicatorId],
                score: getScore(p.id, indicatorId),
                rank: rankProv(p.id, indicatorId),
                overall: overallScore(p.id),
                ...Object.fromEntries(INDICATORS.map(i => [i.id, PROV_CURRENT[p.id][i.id]])),
            }))
            .sort((a, b) => {
                const va = (a as Record<string, unknown>)[sortBy] as number ?? 0;
                const vb = (b as Record<string, unknown>)[sortBy] as number ?? 0;
                return sortDir === "desc" ? vb - va : va - vb;
            });
    }, [indicatorId, search, sortBy, sortDir]);

    const SortIcon = ({ col }: { col: string }) => {
        if (sortBy !== col) return <ChevronUp className="w-3 h-3 opacity-30" />;
        return sortDir === "desc"
            ? <ChevronDown className="w-3 h-3" />
            : <ChevronUp className="w-3 h-3" />;
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Search + export bar */}
            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Filtrar por província..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => exportCSV(indicatorId)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-secondary transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        CSV
                    </button>
                    <button
                        onClick={exportAllCSV}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/30 text-sm font-medium transition-colors"
                        style={{ backgroundColor: `${ind.color}15`, color: ind.color }}
                    >
                        <Download className="w-4 h-4" />
                        CSV Completo
                    </button>
                    <button
                        onClick={exportJSON}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#3574a5]/30 bg-[#3574a5]/10 text-[#3574a5] text-sm font-medium hover:bg-[#3574a5]/20 transition-colors"
                    >
                        <FileJson className="w-4 h-4" />
                        JSON
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-secondary/50">
                            <th className="text-left px-4 py-3 text-xs text-muted-foreground font-semibold whitespace-nowrap">
                                Província
                            </th>
                            {[
                                { col: "rank", label: "Rank" },
                                { col: "value", label: ind.label },
                                { col: "score", label: "Score" },
                                { col: "pop", label: "Pop (M)" },
                                { col: "overall", label: "Score Global" },
                            ].map(({ col, label }) => (
                                <th
                                    key={col}
                                    onClick={() => handleSort(col)}
                                    className={cn(
                                        "text-center px-3 py-3 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors",
                                        sortBy === col ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <span className="flex items-center justify-center gap-1">
                                        {label}
                                        <SortIcon col={col} />
                                    </span>
                                </th>
                            ))}
                            {INDICATORS.filter(i => i.id !== indicatorId).map(i => (
                                <th
                                    key={i.id}
                                    onClick={() => handleSort(i.id)}
                                    className={cn(
                                        "text-center px-3 py-3 text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors",
                                        sortBy === i.id ? "bg-secondary" : "hover:text-foreground"
                                    )}
                                    style={{ color: sortBy === i.id ? i.color : undefined }}
                                >
                                    <span className="flex items-center justify-center gap-1">
                                        {i.label}
                                        <SortIcon col={i.id} />
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, ri) => {
                            const score = getScore(row.id, indicatorId);
                            return (
                                <tr
                                    key={row.id}
                                    className={cn(
                                        "border-b border-border/50 transition-colors hover:bg-secondary/30",
                                        ri % 2 === 0 ? "bg-transparent" : "bg-secondary/20"
                                    )}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-sm"
                                                style={{ backgroundColor: interpolateColor(score, ind.color) }}
                                            />
                                            <span className="font-semibold">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-center px-3 py-3">
                                        <span
                                            className={cn(
                                                "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                                                row.rank <= 3 ? "text-primary-foreground" : "text-muted-foreground bg-secondary"
                                            )}
                                            style={{ backgroundColor: row.rank <= 3 ? ind.color : undefined }}
                                        >
                                            #{row.rank}
                                        </span>
                                    </td>
                                    <td className="text-center px-3 py-3">
                                        <span className="font-bold font-mono" style={{ color: ind.color }}>
                                            {row.value}{ind.unit}
                                        </span>
                                    </td>
                                    <td className="text-center px-3 py-3">
                                        <div className="flex items-center gap-2 justify-center">
                                            <div className="w-10 h-1.5 bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{ width: `${score}%`, backgroundColor: ind.color }}
                                                />
                                            </div>
                                            <span className="font-semibold text-muted-foreground font-mono text-xs">{score}</span>
                                        </div>
                                    </td>
                                    <td className="text-center px-3 py-3 text-muted-foreground font-mono text-xs">{row.pop}</td>
                                    <td className="text-center px-3 py-3">
                                        <span
                                            className={cn(
                                                "inline-block px-2 py-0.5 rounded-full font-bold text-xs font-mono",
                                                row.overall >= 60 ? "bg-[#2d8a57]/15 text-[#2d8a57]" :
                                                    row.overall >= 45 ? "bg-[#c77b3f]/15 text-[#c77b3f]" :
                                                        "bg-[#c25550]/15 text-[#c25550]"
                                            )}
                                        >
                                            {row.overall}
                                        </span>
                                    </td>
                                    {INDICATORS.filter(i => i.id !== indicatorId).map(i => (
                                        <td
                                            key={i.id}
                                            className="text-center px-3 py-3 font-mono text-xs font-medium"
                                            style={{ color: i.color }}
                                        >
                                            {(row as Record<string, unknown>)[i.id] as number}{i.unit}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <p>
                    {data.length} de {PROVINCES.length} províncias · Dados de 2022 · Fonte: Banco Mundial, INE, UNDP
                </p>
            </div>
        </div>
    );
}
