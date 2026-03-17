// "use client";

// import { useState, useEffect, useRef } from "react";

// // ── DATA ──────────────────────────────────────────────────────────────────────

// const PROVINCES = [
//   { id: "maputo_city", name: "Maputo Cidade", short: "MC", pop: 1.1 },
//   { id: "maputo", name: "Maputo Prov.", short: "MP", pop: 1.8 },
//   { id: "gaza", name: "Gaza", short: "GZ", pop: 1.4 },
//   { id: "inhambane", name: "Inhambane", short: "IN", pop: 1.5 },
//   { id: "sofala", name: "Sofala", short: "SO", pop: 2.1 },
//   { id: "manica", name: "Manica", short: "MN", pop: 1.8 },
//   { id: "tete", name: "Tete", short: "TE", pop: 2.6 },
//   { id: "zambezia", name: "Zambézia", short: "ZB", pop: 4.9 },
//   { id: "nampula", name: "Nampula", short: "NA", pop: 6.1 },
//   { id: "cabo_delgado", name: "Cabo Delgado", short: "CD", pop: 2.3 },
//   { id: "niassa", name: "Niassa", short: "NI", pop: 1.5 },
// ];

// const INDICATORS = [
//   { id: "literacy", label: "Literacia", full: "Taxa de Literacia", unit: "%", color: "#00913F", bg: "#e8f7ee", inverted: false, scoreMin: 0, scoreMax: 100 },
//   { id: "electricity", label: "Electricidade", full: "Acesso à Electricidade", unit: "%", color: "#D97706", bg: "#fef3c7", inverted: false, scoreMin: 0, scoreMax: 100 },
//   { id: "water", label: "Água Potável", full: "Água Potável", unit: "%", color: "#1D6FBF", bg: "#dbeafe", inverted: false, scoreMin: 0, scoreMax: 100 },
//   { id: "health", label: "Saúde", full: "Cobertura de Saúde", unit: "%", color: "#B5225A", bg: "#fce7f3", inverted: false, scoreMin: 0, scoreMax: 100 },
//   { id: "poverty", label: "Pobreza", full: "Taxa de Pobreza", unit: "%", color: "#C23B22", bg: "#fee2e2", inverted: true, scoreMin: 0, scoreMax: 100 },
//   { id: "school", label: "Escolaridade", full: "Escolaridade Primária", unit: "%", color: "#5B21B6", bg: "#ede9fe", inverted: false, scoreMin: 0, scoreMax: 100 },
//   { id: "infant_mortality", label: "Mort. Infantil", full: "Mortalidade Infantil", unit: "/1000", color: "#0E7490", bg: "#cffafe", inverted: true, scoreMin: 0, scoreMax: 150 },
//   { id: "life_expectancy", label: "Expect. de Vida", full: "Expectativa de Vida", unit: " anos", color: "#065F46", bg: "#d1fae5", inverted: false, scoreMin: 40, scoreMax: 80 },
// ];

// const NATIONAL: Record<string, { year: number; value: number }[]> = {
//   literacy: [{ year: 2000, value: 44.4 }, { year: 2005, value: 47.8 }, { year: 2010, value: 50.6 }, { year: 2015, value: 58.8 }, { year: 2018, value: 60.7 }, { year: 2020, value: 63.4 }, { year: 2022, value: 65.1 }],
//   electricity: [{ year: 2000, value: 6.2 }, { year: 2005, value: 8.5 }, { year: 2010, value: 13.7 }, { year: 2015, value: 24.1 }, { year: 2018, value: 30.2 }, { year: 2020, value: 33.0 }, { year: 2022, value: 38.4 }],
//   water: [{ year: 2000, value: 37.1 }, { year: 2005, value: 42.2 }, { year: 2010, value: 49.7 }, { year: 2015, value: 56.0 }, { year: 2018, value: 60.8 }, { year: 2020, value: 63.2 }, { year: 2022, value: 65.7 }],
//   health: [{ year: 2000, value: 42.0 }, { year: 2005, value: 48.0 }, { year: 2010, value: 55.0 }, { year: 2015, value: 62.0 }, { year: 2018, value: 66.0 }, { year: 2020, value: 68.0 }, { year: 2022, value: 71.0 }],
//   poverty: [{ year: 2000, value: 70.0 }, { year: 2005, value: 65.0 }, { year: 2010, value: 60.0 }, { year: 2015, value: 55.0 }, { year: 2018, value: 52.0 }, { year: 2020, value: 50.0 }, { year: 2022, value: 46.0 }],
//   school: [{ year: 2000, value: 55.0 }, { year: 2005, value: 62.0 }, { year: 2010, value: 70.0 }, { year: 2015, value: 76.0 }, { year: 2018, value: 79.0 }, { year: 2020, value: 82.0 }, { year: 2022, value: 86.0 }],
//   infant_mortality: [{ year: 2000, value: 128.4 }, { year: 2005, value: 108.2 }, { year: 2010, value: 86.1 }, { year: 2015, value: 66.8 }, { year: 2018, value: 59.4 }, { year: 2020, value: 55.1 }, { year: 2022, value: 51.7 }],
//   life_expectancy: [{ year: 2000, value: 47.2 }, { year: 2005, value: 50.4 }, { year: 2010, value: 54.9 }, { year: 2015, value: 58.1 }, { year: 2018, value: 60.2 }, { year: 2020, value: 61.4 }, { year: 2022, value: 62.9 }],
// };

// const PROVINCIAL: Record<string, Record<string, number[]>> = {
//   maputo_city: { literacy: [81, 82, 84, 85, 86, 86, 87, 87], electricity: [70, 72, 74, 76, 78, 79, 81, 82], water: [80, 81, 82, 83, 84, 85, 85, 86], health: [85, 86, 87, 88, 89, 90, 91, 91], poverty: [22, 21, 20, 19, 18, 17, 16, 16], school: [89, 90, 91, 92, 92, 93, 93, 94], infant_mortality: [38, 36, 34, 32, 30, 28, 26, 24], life_expectancy: [65, 66, 67, 68, 69, 70, 71, 72] },
//   maputo: { literacy: [63, 65, 67, 68, 69, 70, 71, 72], electricity: [44, 47, 50, 52, 54, 55, 57, 58], water: [62, 64, 65, 67, 68, 69, 70, 71], health: [66, 68, 69, 71, 72, 73, 74, 74], poverty: [42, 41, 40, 39, 38, 37, 35, 34], school: [75, 76, 78, 79, 80, 81, 82, 83], infant_mortality: [50, 47, 45, 43, 41, 39, 37, 35], life_expectancy: [62, 63, 64, 65, 66, 67, 68, 69] },
//   gaza: { literacy: [55, 57, 58, 60, 61, 62, 63, 64], electricity: [18, 20, 22, 23, 24, 26, 27, 28], water: [52, 54, 55, 57, 58, 59, 60, 61], health: [56, 58, 59, 61, 62, 63, 64, 65], poverty: [60, 58, 57, 55, 54, 53, 52, 51], school: [65, 67, 68, 70, 71, 72, 73, 74], infant_mortality: [62, 59, 57, 55, 53, 51, 49, 47], life_expectancy: [58, 59, 60, 61, 62, 63, 63, 64] },
//   inhambane: { literacy: [50, 52, 53, 55, 56, 57, 57, 58], electricity: [14, 16, 17, 18, 19, 20, 21, 22], water: [47, 49, 50, 52, 53, 54, 55, 56], health: [51, 53, 54, 56, 57, 58, 59, 60], poverty: [65, 63, 62, 60, 59, 58, 57, 57], school: [59, 61, 62, 64, 65, 66, 67, 68], infant_mortality: [68, 65, 63, 61, 59, 57, 55, 53], life_expectancy: [56, 57, 58, 59, 60, 61, 61, 62] },
//   sofala: { literacy: [53, 54, 56, 57, 58, 59, 60, 61], electricity: [25, 27, 28, 30, 31, 32, 33, 35], water: [49, 51, 52, 54, 55, 56, 57, 58], health: [58, 60, 61, 63, 64, 65, 66, 67], poverty: [57, 56, 55, 53, 52, 51, 50, 49], school: [62, 64, 65, 67, 68, 69, 70, 71], infant_mortality: [65, 62, 60, 58, 56, 54, 52, 50], life_expectancy: [57, 58, 59, 60, 61, 62, 62, 63] },
//   manica: { literacy: [47, 49, 50, 52, 53, 54, 55, 56], electricity: [15, 17, 18, 19, 20, 21, 23, 24], water: [44, 46, 47, 49, 50, 51, 52, 53], health: [49, 51, 52, 54, 55, 56, 57, 58], poverty: [63, 62, 60, 59, 58, 57, 56, 55], school: [57, 59, 60, 62, 63, 64, 65, 66], infant_mortality: [70, 67, 65, 63, 61, 59, 57, 55], life_expectancy: [55, 56, 57, 58, 59, 60, 61, 62] },
//   tete: { literacy: [43, 45, 46, 48, 49, 50, 51, 52], electricity: [12, 13, 14, 16, 17, 18, 19, 21], water: [40, 42, 43, 45, 46, 47, 48, 49], health: [45, 47, 48, 50, 51, 52, 53, 54], poverty: [68, 67, 66, 64, 63, 62, 61, 60], school: [53, 55, 56, 58, 59, 60, 61, 62], infant_mortality: [74, 71, 69, 67, 65, 63, 61, 59], life_expectancy: [54, 55, 56, 57, 58, 59, 59, 60] },
//   zambezia: { literacy: [38, 40, 41, 43, 44, 45, 46, 47], electricity: [7, 8, 9, 10, 11, 12, 13, 14], water: [35, 37, 38, 40, 41, 42, 43, 44], health: [40, 42, 43, 45, 46, 47, 48, 49], poverty: [76, 75, 74, 72, 71, 70, 69, 68], school: [46, 48, 49, 51, 52, 53, 54, 55], infant_mortality: [82, 79, 77, 74, 72, 70, 68, 66], life_expectancy: [52, 53, 54, 55, 56, 57, 58, 59] },
//   nampula: { literacy: [36, 38, 39, 41, 42, 43, 44, 45], electricity: [6, 7, 8, 9, 10, 11, 12, 13], water: [33, 35, 36, 38, 39, 40, 41, 42], health: [38, 40, 41, 43, 44, 45, 46, 47], poverty: [79, 78, 77, 75, 74, 73, 71, 70], school: [43, 45, 46, 48, 49, 50, 51, 52], infant_mortality: [86, 83, 80, 78, 75, 73, 71, 69], life_expectancy: [51, 52, 53, 54, 55, 56, 57, 58] },
//   cabo_delgado: { literacy: [34, 36, 37, 39, 40, 41, 42, 43], electricity: [4, 5, 6, 7, 8, 9, 9, 10], water: [30, 32, 33, 35, 36, 37, 37, 38], health: [35, 37, 38, 40, 41, 42, 43, 44], poverty: [82, 81, 80, 78, 77, 76, 75, 74], school: [40, 42, 43, 45, 46, 47, 48, 49], infant_mortality: [90, 87, 84, 82, 79, 77, 75, 73], life_expectancy: [50, 51, 52, 53, 54, 55, 56, 57] },
//   niassa: { literacy: [39, 41, 42, 44, 45, 46, 47, 48], electricity: [6, 7, 8, 9, 10, 10, 11, 12], water: [36, 38, 39, 41, 42, 43, 44, 45], health: [41, 43, 44, 46, 47, 48, 49, 50], poverty: [74, 73, 72, 70, 69, 68, 67, 66], school: [47, 49, 50, 52, 53, 54, 55, 56], infant_mortality: [80, 77, 75, 72, 70, 68, 66, 64], life_expectancy: [53, 54, 55, 56, 57, 58, 58, 59] },
// };

// const PROV_CURRENT: Record<string, Record<string, number>> = {
//   maputo_city: { literacy: 87, electricity: 82, water: 86, health: 91, poverty: 16, school: 94, infant_mortality: 24, life_expectancy: 72 },
//   maputo: { literacy: 72, electricity: 58, water: 71, health: 74, poverty: 34, school: 83, infant_mortality: 35, life_expectancy: 69 },
//   gaza: { literacy: 64, electricity: 28, water: 61, health: 65, poverty: 51, school: 74, infant_mortality: 47, life_expectancy: 64 },
//   inhambane: { literacy: 58, electricity: 22, water: 56, health: 60, poverty: 57, school: 68, infant_mortality: 53, life_expectancy: 62 },
//   sofala: { literacy: 61, electricity: 35, water: 58, health: 67, poverty: 49, school: 71, infant_mortality: 50, life_expectancy: 63 },
//   manica: { literacy: 56, electricity: 24, water: 53, health: 58, poverty: 55, school: 66, infant_mortality: 55, life_expectancy: 62 },
//   tete: { literacy: 52, electricity: 21, water: 49, health: 54, poverty: 60, school: 62, infant_mortality: 59, life_expectancy: 60 },
//   zambezia: { literacy: 47, electricity: 14, water: 44, health: 49, poverty: 68, school: 55, infant_mortality: 66, life_expectancy: 59 },
//   nampula: { literacy: 45, electricity: 13, water: 42, health: 47, poverty: 70, school: 52, infant_mortality: 69, life_expectancy: 58 },
//   cabo_delgado: { literacy: 43, electricity: 10, water: 38, health: 44, poverty: 74, school: 49, infant_mortality: 73, life_expectancy: 57 },
//   niassa: { literacy: 48, electricity: 12, water: 45, health: 50, poverty: 66, school: 56, infant_mortality: 64, life_expectancy: 59 },
// };

// const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
// const CCOLORS = ["#00913F", "#D97706", "#1D6FBF", "#B5225A"];

// // ── SVG MAP PATHS (simplified Mozambique provinces) ────────────────────────────
// // Approximate province shapes in a 300x600 viewBox from North (top) to South (bottom)
// const PROVINCE_PATHS: Record<string, { path: string; cx: number; cy: number }> = {
//   cabo_delgado: {
//     path: "M 155 20 L 220 18 L 240 30 L 235 70 L 215 85 L 190 90 L 165 80 L 148 60 Z",
//     cx: 194, cy: 55,
//   },
//   niassa: {
//     path: "M 90 25 L 155 20 L 148 60 L 165 80 L 150 110 L 120 120 L 85 100 L 70 70 L 75 40 Z",
//     cx: 115, cy: 72,
//   },
//   nampula: {
//     path: "M 148 60 L 190 90 L 215 85 L 230 100 L 220 130 L 195 145 L 165 140 L 148 120 L 150 110 L 165 80 Z",
//     cx: 186, cy: 110,
//   },
//   zambezia: {
//     path: "M 85 100 L 120 120 L 150 110 L 148 120 L 165 140 L 195 145 L 190 175 L 155 185 L 130 180 L 95 165 L 80 140 L 82 115 Z",
//     cx: 135, cy: 145,
//   },
//   tete: {
//     path: "M 70 70 L 85 100 L 82 115 L 80 140 L 60 155 L 35 145 L 25 120 L 30 90 L 50 75 Z",
//     cx: 57, cy: 113,
//   },
//   manica: {
//     path: "M 60 155 L 80 140 L 95 165 L 90 195 L 70 210 L 50 205 L 38 185 L 38 165 Z",
//     cx: 65, cy: 183,
//   },
//   sofala: {
//     path: "M 80 140 L 130 180 L 155 185 L 160 215 L 145 235 L 115 240 L 90 225 L 80 200 L 70 210 L 90 195 L 95 165 Z",
//     cx: 115, cy: 200,
//   },
//   inhambane: {
//     path: "M 90 225 L 115 240 L 130 265 L 125 295 L 105 310 L 80 305 L 65 285 L 68 255 L 75 235 Z",
//     cx: 97, cy: 268,
//   },
//   gaza: {
//     path: "M 38 165 L 50 205 L 70 210 L 80 200 L 90 225 L 75 235 L 68 255 L 55 255 L 30 240 L 20 210 L 22 180 Z",
//     cx: 52, cy: 213,
//   },
//   maputo: {
//     path: "M 30 240 L 55 255 L 68 255 L 65 285 L 55 305 L 35 305 L 20 285 L 18 260 Z",
//     cx: 43, cy: 276,
//   },
//   maputo_city: {
//     path: "M 35 305 L 55 305 L 60 320 L 50 330 L 35 325 L 28 315 Z",
//     cx: 44, cy: 315,
//   },
// };

// // ── HELPERS ───────────────────────────────────────────────────────────────────

// function getScore(pid: string, iid: string) {
//   const ind = INDICATORS.find(i => i.id === iid)!;
//   const v = PROV_CURRENT[pid][iid];
//   const range = ind.scoreMax - ind.scoreMin;
//   const norm = range === 100 ? v : Math.round(((v - ind.scoreMin) / range) * 100);
//   return ind.inverted ? 100 - norm : norm;
// }
// function overallScore(pid: string) {
//   return Math.round(INDICATORS.reduce((s, i) => s + getScore(pid, i.id), 0) / INDICATORS.length);
// }
// function rankProv(pid: string, iid: string) {
//   return [...PROVINCES].sort((a, b) => getScore(b.id, iid) - getScore(a.id, iid)).findIndex(p => p.id === pid) + 1;
// }

// function hexToRgb(hex: string) {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return `${r},${g},${b}`;
// }

// function interpolateColor(score: number, color: string) {
//   const opacity = 0.12 + (score / 100) * 0.78;
//   return `rgba(${hexToRgb(color)},${opacity})`;
// }

// // ── EXPORT HELPERS ────────────────────────────────────────────────────────────

// function exportCSV(indicatorId: string) {
//   const ind = INDICATORS.find(i => i.id === indicatorId)!;
//   const header = ["Província", "Pop. (M)", ind.full + " (" + ind.unit.trim() + ")", "Score (0-100)", "Rank"];
//   const rows = [...PROVINCES]
//     .sort((a, b) => getScore(b.id, indicatorId) - getScore(a.id, indicatorId))
//     .map((p, i) => [
//       p.name, p.pop,
//       PROV_CURRENT[p.id][indicatorId],
//       getScore(p.id, indicatorId),
//       i + 1,
//     ]);
//   const csv = [header, ...rows].map(r => r.join(",")).join("\n");
//   const blob = new Blob([csv], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a"); a.href = url; a.download = `mozambique_${indicatorId}_2022.csv`; a.click();
// }

// function exportAllCSV() {
//   const header = ["Província", "Pop. (M)", "Score Global", ...INDICATORS.map(i => i.full)];
//   const rows = [...PROVINCES]
//     .sort((a, b) => overallScore(b.id) - overallScore(a.id))
//     .map(p => [
//       p.name, p.pop, overallScore(p.id),
//       ...INDICATORS.map(i => PROV_CURRENT[p.id][i.id]),
//     ]);
//   const csv = [header, ...rows].map(r => r.join(",")).join("\n");
//   const blob = new Blob([csv], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a"); a.href = url; a.download = `mozambique_all_indicators_2022.csv`; a.click();
// }

// function exportJSON() {
//   const data = PROVINCES.map(p => ({
//     id: p.id, name: p.name, population_millions: p.pop,
//     overall_score: overallScore(p.id),
//     indicators: Object.fromEntries(INDICATORS.map(i => [i.id, {
//       value: PROV_CURRENT[p.id][i.id], unit: i.unit.trim(),
//       score: getScore(p.id, i.id), rank: rankProv(p.id, i.id),
//     }])),
//   }));
//   const blob = new Blob([JSON.stringify({ source: "World Bank / INE / UNDP", year: 2022, provinces: data }, null, 2)], { type: "application/json" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a"); a.href = url; a.download = `mozambique_development_2022.json`; a.click();
// }

// // ── LINE CHART ────────────────────────────────────────────────────────────────

// function LineChart({ datasets, height = 240 }: {
//   datasets: { label: string; color: string; data: { year: number; value: number }[] }[];
//   height?: number;
// }) {
//   const W = 520, pL = 44, pR = 40, pT = 16, pB = 36;
//   const cW = W - pL - pR, cH = height - pT - pB;
//   const allV = datasets.flatMap(d => d.data.map(p => p.value));
//   const allY = datasets.flatMap(d => d.data.map(p => p.year));
//   const minV = Math.min(...allV) * 0.88, maxV = Math.max(...allV) * 1.07;
//   const minY = Math.min(...allY), maxY = Math.max(...allY);
//   const xs = (y: number) => pL + ((y - minY) / (maxY - minY)) * cW;
//   const ys = (v: number) => pT + cH - ((v - minV) / (maxV - minV)) * cH;
//   const [prog, setProg] = useState(0);
//   const raf = useRef<number | null>(null);
//   useEffect(() => {
//     setProg(0); let s: number | null = null;
//     const run = (t: number) => { if (!s) s = t; const p = Math.min((t - s) / 950, 1); setProg(p); if (p < 1) raf.current = requestAnimationFrame(run); };
//     raf.current = requestAnimationFrame(run);
//     return () => { if (raf.current) cancelAnimationFrame(raf.current); };
//   }, [datasets.map(d => d.label).join()]);
//   const years = [...new Set(allY)].sort((a, b) => a - b);
//   const gridVs = [0, 0.25, 0.5, 0.75, 1].map(t => minV + t * (maxV - minV));
//   return (
//     <svg viewBox={`0 0 ${W} ${height}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
//       <defs>
//         {datasets.map(d => (
//           <linearGradient key={d.color} id={`lg${d.color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor={d.color} stopOpacity="0.18" />
//             <stop offset="100%" stopColor={d.color} stopOpacity="0.01" />
//           </linearGradient>
//         ))}
//         <clipPath id="cclip"><rect x={pL} y={0} width={cW * prog} height={height} /></clipPath>
//       </defs>
//       {gridVs.map((v, i) => {
//         const y = ys(v);
//         return <g key={i}>
//           <line x1={pL} y1={y} x2={pL + cW} y2={y} stroke="#e5e7eb" strokeWidth="1" />
//           <text x={pL - 8} y={y + 4} fill="#9ca3af" fontSize="10" textAnchor="end" fontFamily="'DM Sans',system-ui">{v.toFixed(v < 10 ? 1 : 0)}</text>
//         </g>;
//       })}
//       {years.map(y => (
//         <text key={y} x={xs(y)} y={pT + cH + 22} fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="'DM Sans',system-ui">{y}</text>
//       ))}
//       {datasets.map(d => {
//         const pts = d.data.map(p => `${xs(p.year)},${ys(p.value)}`);
//         const area = `M${pts.join(" L")} L${xs(d.data.at(-1)!.year)},${pT + cH} L${xs(d.data[0].year)},${pT + cH} Z`;
//         const line = d.data.map((p, i) => `${i === 0 ? "M" : "L"}${xs(p.year)},${ys(p.value)}`).join(" ");
//         const last = d.data.at(-1)!;
//         return <g key={d.color}>
//           <path d={area} fill={`url(#lg${d.color.replace("#", "")})`} clipPath="url(#cclip)" />
//           <path d={line} fill="none" stroke={d.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#cclip)" />
//           {prog > 0.9 && d.data.map(p => (
//             <circle key={p.year} cx={xs(p.year)} cy={ys(p.value)} r="4.5" fill="white" stroke={d.color} strokeWidth="2.5" />
//           ))}
//           {prog > 0.96 && (
//             <text x={xs(last.year) + 10} y={ys(last.value) + 5} fill={d.color} fontSize="12" fontWeight="700" fontFamily="'DM Sans',system-ui">{last.value}{d.label !== "Nacional" ? "" : "%"}</text>
//           )}
//         </g>;
//       })}
//     </svg>
//   );
// }

// // ── RADAR ─────────────────────────────────────────────────────────────────────

// function RadarChart({ provinces, size = 200 }: { provinces: string[]; size?: number }) {
//   const cx = size / 2, cy = size / 2, r = size * 0.35;
//   const n = INDICATORS.length;
//   const angles = INDICATORS.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);
//   return (
//     <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
//       {[0.25, 0.5, 0.75, 1].map(lv => (
//         <polygon key={lv} points={angles.map(a => `${cx + Math.cos(a) * r * lv},${cy + Math.sin(a) * r * lv}`).join(" ")}
//           fill="none" stroke="#e5e7eb" strokeWidth="1" />
//       ))}
//       {angles.map((a, i) => <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="#e5e7eb" strokeWidth="1" />)}
//       {angles.map((a, i) => {
//         const lx = cx + Math.cos(a) * (r + 20), ly = cy + Math.sin(a) * (r + 20);
//         return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#6b7280" fontSize="8.5" fontFamily="'DM Sans',system-ui">{INDICATORS[i].label}</text>;
//       })}
//       {provinces.map((pid, pi) => {
//         const col = CCOLORS[pi % CCOLORS.length];
//         const pts = INDICATORS.map((ind, i) => {
//           const s = getScore(pid, ind.id) / 100;
//           return `${cx + Math.cos(angles[i]) * r * s},${cy + Math.sin(angles[i]) * r * s}`;
//         }).join(" ");
//         return <g key={pid}>
//           <polygon points={pts} fill={col + "30"} stroke={col} strokeWidth="2" />
//           {INDICATORS.map((ind, i) => {
//             const s = getScore(pid, ind.id) / 100;
//             return <circle key={i} cx={cx + Math.cos(angles[i]) * r * s} cy={cy + Math.sin(angles[i]) * r * s} r="3.5" fill={col} />;
//           })}
//         </g>;
//       })}
//     </svg>
//   );
// }

// // ── PROVINCE BAR ─────────────────────────────────────────────────────────────

// function ProvinceBar({ indicatorId, highlighted }: { indicatorId: string; highlighted: string[] }) {
//   const ind = INDICATORS.find(i => i.id === indicatorId)!;
//   const sorted = [...PROVINCES]
//     .map(p => ({ ...p, value: PROV_CURRENT[p.id][indicatorId], score: getScore(p.id, indicatorId) }))
//     .sort((a, b) => b.score - a.score);
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//       {sorted.map((p, i) => {
//         const isHl = highlighted.length === 0 || highlighted.includes(p.id);
//         const ci = highlighted.indexOf(p.id);
//         const col = ci >= 0 ? CCOLORS[ci] : ind.color;
//         return (
//           <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "12px", opacity: isHl ? 1 : 0.28, transition: "opacity 0.25s" }}>
//             <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", width: "18px", textAlign: "right", fontWeight: 600 }}>{i + 1}</span>
//             <span style={{ fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", width: "116px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: ci >= 0 ? "#111827" : "#374151", fontWeight: ci >= 0 ? 700 : 400 }}>{p.name}</span>
//             <div style={{ flex: 1, height: "18px", background: "#f3f4f6", borderRadius: "9px", overflow: "hidden" }}>
//               <div style={{ width: `${(p.score / 100) * 100}%`, height: "100%", background: `linear-gradient(90deg,${col},${col}bb)`, borderRadius: "9px", transition: "width 0.7s cubic-bezier(.4,0,.2,1)" }} />
//             </div>
//             <span style={{ fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", color: col, fontWeight: 700, minWidth: "40px", textAlign: "right" }}>{p.value}{ind.unit}</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ── MAP COMPONENT ─────────────────────────────────────────────────────────────

// function MozambiqueMap({ indicatorId, onProvinceClick, selectedProvince }: {
//   indicatorId: string;
//   onProvinceClick: (id: string) => void;
//   selectedProvince: string | null;
// }) {
//   const [hovered, setHovered] = useState<string | null>(null);
//   const [tooltip, setTooltip] = useState<{ x: number; y: number; pid: string } | null>(null);
//   const ind = INDICATORS.find(i => i.id === indicatorId)!;

//   return (
//     <div style={{ position: "relative", display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
//       {/* Map SVG */}
//       <div style={{ flex: "0 0 auto", position: "relative" }}>
//         <svg
//           viewBox="0 0 280 360"
//           style={{ width: "280px", height: "360px", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))" }}
//           onMouseLeave={() => { setHovered(null); setTooltip(null); }}
//         >
//           <defs>
//             <filter id="provShadow" x="-20%" y="-20%" width="140%" height="140%">
//               <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.2)" />
//             </filter>
//           </defs>
//           {/* Ocean background */}
//           <rect x="0" y="0" width="280" height="360" fill="#e8f4fd" rx="12" />
//           {/* Grid lines */}
//           {[50, 100, 150, 200, 250, 300].map(y => (
//             <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(29,111,191,0.08)" strokeWidth="1" />
//           ))}
//           {[70, 140, 210].map(x => (
//             <line key={x} x1={x} y1="0" x2={x} y2="360" stroke="rgba(29,111,191,0.08)" strokeWidth="1" />
//           ))}

//           {PROVINCES.map(p => {
//             const pdata = PROVINCE_PATHS[p.id];
//             const score = getScore(p.id, indicatorId);
//             const val = PROV_CURRENT[p.id][indicatorId];
//             const fill = interpolateColor(score, ind.color);
//             const isHov = hovered === p.id;
//             const isSel = selectedProvince === p.id;
//             return (
//               <g key={p.id}
//                 onMouseEnter={(e) => {
//                   setHovered(p.id);
//                   const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
//                   setTooltip({ x: pdata.cx, y: pdata.cy, pid: p.id });
//                 }}
//                 onMouseLeave={() => { setHovered(null); setTooltip(null); }}
//                 onClick={() => onProvinceClick(p.id)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <path
//                   d={pdata.path}
//                   fill={fill}
//                   stroke={isSel ? ind.color : isHov ? ind.color + "cc" : "white"}
//                   strokeWidth={isSel ? "2.5" : isHov ? "2" : "1.5"}
//                   style={{ transition: "all 0.18s", filter: isHov || isSel ? `drop-shadow(0 2px 6px ${ind.color}50)` : "none" }}
//                 />
//                 {/* Label */}
//                 <text
//                   x={pdata.cx}
//                   y={pdata.cy - 4}
//                   textAnchor="middle"
//                   fill={isHov || isSel ? ind.color : "#374151"}
//                   fontSize={p.id === "maputo_city" ? "6" : "7.5"}
//                   fontWeight={isSel ? "800" : "600"}
//                   fontFamily="'DM Sans',system-ui"
//                   style={{ pointerEvents: "none", transition: "all 0.15s" }}
//                 >{p.short}</text>
//                 <text
//                   x={pdata.cx}
//                   y={pdata.cy + 7}
//                   textAnchor="middle"
//                   fill={isHov || isSel ? ind.color : "#6b7280"}
//                   fontSize={p.id === "maputo_city" ? "6" : "7"}
//                   fontWeight="700"
//                   fontFamily="'DM Sans',system-ui"
//                   style={{ pointerEvents: "none", transition: "all 0.15s" }}
//                 >{val}{ind.unit}</text>
//               </g>
//             );
//           })}

//           {/* Tooltip on map */}
//           {tooltip && hovered && (() => {
//             const p = PROVINCES.find(x => x.id === hovered)!;
//             const val = PROV_CURRENT[hovered][indicatorId];
//             const score = getScore(hovered, indicatorId);
//             const rank = rankProv(hovered, indicatorId);
//             const tx = Math.min(Math.max(tooltip.x, 60), 220);
//             const ty = tooltip.y < 180 ? tooltip.y + 30 : tooltip.y - 70;
//             return (
//               <g style={{ pointerEvents: "none" }}>
//                 <rect x={tx - 55} y={ty - 8} width="110" height="58" rx="8" fill="white" stroke={ind.color + "40"} strokeWidth="1.5"
//                   style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }} />
//                 <text x={tx} y={ty + 8} textAnchor="middle" fill="#111827" fontSize="8.5" fontWeight="700" fontFamily="'DM Sans',system-ui">{p.name}</text>
//                 <text x={tx} y={ty + 20} textAnchor="middle" fill={ind.color} fontSize="11" fontWeight="800" fontFamily="'Playfair Display',serif">{val}{ind.unit}</text>
//                 <text x={tx} y={ty + 32} textAnchor="middle" fill="#9ca3af" fontSize="7.5" fontFamily="'DM Sans',system-ui">Score: {score} · Rank #{rank}</text>
//                 <text x={tx} y={ty + 44} textAnchor="middle" fill="#9ca3af" fontSize="7" fontFamily="'DM Sans',system-ui">{p.pop}M habitantes</text>
//               </g>
//             );
//           })()}

//           {/* Compass rose */}
//           <g transform="translate(255,335)">
//             <circle cx="0" cy="0" r="11" fill="white" stroke="#e5e7eb" strokeWidth="1" />
//             <text x="0" y="-5" textAnchor="middle" fill="#374151" fontSize="6" fontWeight="700" fontFamily="'DM Sans',system-ui">N</text>
//             <polygon points="0,-9 -2.5,-3 2.5,-3" fill="#111827" />
//             <polygon points="0,9 -2.5,3 2.5,3" fill="#9ca3af" />
//           </g>
//         </svg>
//       </div>

//       {/* Legend + Province detail */}
//       <div style={{ flex: 1, minWidth: "220px", display: "flex", flexDirection: "column", gap: "1rem" }}>
//         {/* Color scale */}
//         <div style={{ background: "#fafafa", borderRadius: "14px", padding: "1rem", border: "1px solid #f3f4f6" }}>
//           <p style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{ind.full}</p>
//           <div style={{ height: "12px", borderRadius: "6px", background: `linear-gradient(90deg,${ind.color}20,${ind.color}90,${ind.color})`, marginBottom: "6px" }} />
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Baixo</span>
//             <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Alto</span>
//           </div>
//         </div>

//         {/* Province list (sorted by score) */}
//         <div style={{ background: "#fafafa", borderRadius: "14px", padding: "1rem", border: "1px solid #f3f4f6" }}>
//           <p style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Ranking</p>
//           <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
//             {[...PROVINCES]
//               .sort((a, b) => getScore(b.id, indicatorId) - getScore(a.id, indicatorId))
//               .map((p, i) => {
//                 const score = getScore(p.id, indicatorId);
//                 const val = PROV_CURRENT[p.id][indicatorId];
//                 const isSel = selectedProvince === p.id;
//                 return (
//                   <div key={p.id}
//                     onClick={() => onProvinceClick(p.id)}
//                     style={{
//                       display: "flex", alignItems: "center", gap: "7px", cursor: "pointer",
//                       padding: "4px 7px", borderRadius: "8px",
//                       background: isSel ? ind.bg : "transparent",
//                       border: `1px solid ${isSel ? ind.color + "30" : "transparent"}`,
//                       transition: "all 0.15s",
//                     }}>
//                     <span style={{ fontSize: "0.62rem", color: "#d1d5db", fontWeight: 700, width: "14px" }}>{i + 1}</span>
//                     <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", color: isSel ? ind.color : "#374151", fontWeight: isSel ? 700 : 400, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
//                     <div style={{ width: "44px", height: "5px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
//                       <div style={{ width: `${score}%`, height: "100%", background: ind.color, borderRadius: "3px" }} />
//                     </div>
//                     <span style={{ fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", color: ind.color, fontWeight: 700, minWidth: "32px", textAlign: "right" }}>{val}{ind.unit}</span>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>

//         {/* Selected province detail */}
//         {selectedProvince && (() => {
//           const p = PROVINCES.find(x => x.id === selectedProvince)!;
//           return (
//             <div style={{ background: "white", borderRadius: "14px", padding: "1.25rem", border: `2px solid ${ind.color}30`, boxShadow: `0 4px 20px ${ind.color}15` }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
//                 <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: ind.color }} />
//                 <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>{p.name}</span>
//               </div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
//                 {INDICATORS.map(i => {
//                   const v = PROV_CURRENT[selectedProvince][i.id];
//                   const s = getScore(selectedProvince, i.id);
//                   return (
//                     <div key={i.id} style={{ padding: "6px 8px", borderRadius: "8px", background: i.bg }}>
//                       <div style={{ fontSize: "0.6rem", color: i.color, fontFamily: "'DM Sans',system-ui", fontWeight: 600, marginBottom: "2px" }}>{i.label}</div>
//                       <div style={{ fontSize: "0.88rem", fontWeight: 700, color: i.color, fontFamily: "'Playfair Display',serif" }}>{v}<span style={{ fontSize: "0.6rem", opacity: 0.7 }}>{i.unit}</span></div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })()}
//       </div>
//     </div>
//   );
// }

// // ── DATA TABLE COMPONENT ──────────────────────────────────────────────────────

// function DataTable({ indicatorId }: { indicatorId: string }) {
//   const [sortBy, setSortBy] = useState<string>("score");
//   const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
//   const [search, setSearch] = useState("");
//   const [showAll, setShowAll] = useState(false);
//   const ind = INDICATORS.find(i => i.id === indicatorId)!;

//   const handleSort = (col: string) => {
//     if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
//     else { setSortBy(col); setSortDir("desc"); }
//   };

//   const data = PROVINCES
//     .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
//     .map(p => ({
//       ...p,
//       value: PROV_CURRENT[p.id][indicatorId],
//       score: getScore(p.id, indicatorId),
//       rank: rankProv(p.id, indicatorId),
//       overall: overallScore(p.id),
//       ...Object.fromEntries(INDICATORS.map(i => [i.id, PROV_CURRENT[p.id][i.id]])),
//     }))
//     .sort((a, b) => {
//       const va = (a as any)[sortBy] ?? 0;
//       const vb = (b as any)[sortBy] ?? 0;
//       return sortDir === "desc" ? vb - va : va - vb;
//     });

//   const SortIcon = ({ col }: { col: string }) => (
//     <span style={{ marginLeft: "4px", opacity: sortBy === col ? 1 : 0.3, fontSize: "0.65rem" }}>
//       {sortBy === col ? (sortDir === "desc" ? "▼" : "▲") : "⇅"}
//     </span>
//   );

//   const ColHeader = ({ col, label, color }: { col: string; label: string; color?: string }) => (
//     <th onClick={() => handleSort(col)} style={{
//       textAlign: "center", padding: "10px 8px", fontSize: "0.68rem",
//       fontFamily: "'DM Sans',system-ui", fontWeight: 600,
//       color: sortBy === col ? (color || ind.color) : "#6b7280",
//       cursor: "pointer", whiteSpace: "nowrap",
//       background: sortBy === col ? (color ? color + "08" : ind.bg) : "transparent",
//       borderBottom: `2px solid ${sortBy === col ? (color || ind.color) : "transparent"}`,
//       transition: "all 0.15s", userSelect: "none",
//     }}>
//       {label}<SortIcon col={col} />
//     </th>
//   );

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//       {/* Search + export bar */}
//       <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
//         <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
//           <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
//             <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
//           </svg>
//           <input
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             placeholder="Filtrar por província..."
//             style={{
//               width: "100%", padding: "9px 12px 9px 34px",
//               borderRadius: "10px", border: "1.5px solid #e5e7eb",
//               fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", color: "#374151",
//               outline: "none", background: "white",
//             }}
//           />
//         </div>

//         <div style={{ display: "flex", gap: "6px" }}>
//           <button onClick={() => exportCSV(indicatorId)} style={{
//             all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
//             padding: "8px 14px", borderRadius: "10px", border: "1.5px solid #e5e7eb",
//             fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#374151",
//             background: "white", transition: "all 0.15s",
//           }}>
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
//             CSV
//           </button>
//           <button onClick={exportAllCSV} style={{
//             all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
//             padding: "8px 14px", borderRadius: "10px", border: "1.5px solid #00913F40",
//             fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#00913F",
//             background: "#e8f7ee", transition: "all 0.15s",
//           }}>
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
//             CSV Completo
//           </button>
//           <button onClick={exportJSON} style={{
//             all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
//             padding: "8px 14px", borderRadius: "10px", border: "1.5px solid #1D6FBF40",
//             fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#1D6FBF",
//             background: "#dbeafe", transition: "all 0.15s",
//           }}>
//             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
//             JSON
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div style={{ overflowX: "auto", borderRadius: "16px", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
//         <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'DM Sans',system-ui", fontSize: "0.78rem" }}>
//           <thead>
//             <tr style={{ background: "#fafafa", borderBottom: "1px solid #f3f4f6" }}>
//               <th style={{ textAlign: "left", padding: "10px 16px", fontSize: "0.68rem", color: "#9ca3af", fontWeight: 600, whiteSpace: "nowrap" }}>Província</th>
//               <ColHeader col="rank" label="Rank" color={ind.color} />
//               <ColHeader col="value" label={ind.label} color={ind.color} />
//               <ColHeader col="score" label="Score" color={ind.color} />
//               <ColHeader col="pop" label="Pop (M)" />
//               <ColHeader col="overall" label="Score Global" />
//               {INDICATORS.filter(i => i.id !== indicatorId).map(i => (
//                 <ColHeader key={i.id} col={i.id} label={i.label} color={i.color} />
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, ri) => {
//               const score = getScore(row.id, indicatorId);
//               return (
//                 <tr key={row.id} style={{
//                   borderBottom: "1px solid #f9fafb",
//                   background: ri % 2 === 0 ? "white" : "#fafafa",
//                   transition: "background 0.12s",
//                 }}>
//                   <td style={{ padding: "10px 16px", whiteSpace: "nowrap" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                       <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: interpolateColor(score, ind.color), border: `1px solid ${ind.color}40` }} />
//                       <span style={{ fontWeight: 600, color: "#111827" }}>{row.name}</span>
//                     </div>
//                   </td>
//                   <td style={{ textAlign: "center", padding: "10px 8px" }}>
//                     <span style={{
//                       display: "inline-block", width: "26px", height: "26px", lineHeight: "26px",
//                       borderRadius: "50%", textAlign: "center",
//                       background: row.rank <= 3 ? ind.color : "#f3f4f6",
//                       color: row.rank <= 3 ? "white" : "#6b7280",
//                       fontSize: "0.72rem", fontWeight: 700,
//                     }}>#{row.rank}</span>
//                   </td>
//                   <td style={{ textAlign: "center", padding: "10px 8px" }}>
//                     <span style={{ color: ind.color, fontWeight: 700 }}>{row.value}{ind.unit}</span>
//                   </td>
//                   <td style={{ textAlign: "center", padding: "10px 8px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
//                       <div style={{ width: "40px", height: "6px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
//                         <div style={{ width: `${score}%`, height: "100%", background: ind.color, borderRadius: "3px" }} />
//                       </div>
//                       <span style={{ fontWeight: 600, color: "#374151", minWidth: "24px" }}>{score}</span>
//                     </div>
//                   </td>
//                   <td style={{ textAlign: "center", padding: "10px 8px", color: "#6b7280" }}>{row.pop}</td>
//                   <td style={{ textAlign: "center", padding: "10px 8px" }}>
//                     <span style={{
//                       display: "inline-block", padding: "2px 8px", borderRadius: "100px",
//                       background: row.overall >= 60 ? "#e8f7ee" : row.overall >= 45 ? "#fef3c7" : "#fee2e2",
//                       color: row.overall >= 60 ? "#00913F" : row.overall >= 45 ? "#D97706" : "#C23B22",
//                       fontWeight: 700, fontSize: "0.72rem",
//                     }}>{row.overall}</span>
//                   </td>
//                   {INDICATORS.filter(i => i.id !== indicatorId).map(i => (
//                     <td key={i.id} style={{ textAlign: "center", padding: "10px 8px", color: i.color, fontWeight: 500, fontSize: "0.72rem" }}>
//                       {(row as any)[i.id]}{i.unit}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <p style={{ fontSize: "0.68rem", color: "#d1d5db", fontFamily: "'DM Sans',system-ui" }}>
//           {data.length} de {PROVINCES.length} províncias · Dados de 2022 · Fonte: Banco Mundial, INE, UNDP
//         </p>
//         <div style={{ display: "flex", gap: "6px" }}>
//           <button onClick={() => exportCSV(indicatorId)} style={{
//             all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
//             padding: "6px 12px", borderRadius: "8px", background: "#f9fafb", border: "1px solid #e5e7eb",
//             fontSize: "0.7rem", fontFamily: "'DM Sans',system-ui", color: "#6b7280",
//           }}>
//             <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
//             Exportar tabela
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── MAIN ──────────────────────────────────────────────────────────────────────

// export default function Home() {
//   const [activeInd, setActiveInd] = useState("literacy");
//   const [activeTab, setActiveTab] = useState<"nacional" | "mapa" | "provincial" | "comparar" | "heatmap" | "tabela">("nacional");
//   const [selProvs, setSelProvs] = useState<string[]>([]);
//   const [mapSelectedProv, setMapSelectedProv] = useState<string | null>(null);
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => { setMounted(true); }, []);

//   const ind = INDICATORS.find(i => i.id === activeInd)!;
//   const natData = NATIONAL[activeInd];
//   const latest = natData.at(-1)!;
//   const prev = natData.at(-2)!;
//   const delta = latest.value - prev.value;

//   const toggleProv = (id: string) => setSelProvs(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 4 ? [...p, id] : p);

//   const compareDS = selProvs.map((pid, i) => ({
//     label: PROVINCES.find(p => p.id === pid)!.name,
//     color: CCOLORS[i],
//     data: YEARS.map((y, yi) => ({ year: y, value: PROVINCIAL[pid][activeInd][yi] })),
//   }));

//   const tabs = [
//     { k: "nacional" as const, label: "Nacional", icon: "📊" },
//     { k: "mapa" as const, label: "Mapa", icon: "🗺️" },
//     { k: "tabela" as const, label: "Tabela", icon: "📋" },
//     { k: "provincial" as const, label: "Por Província", icon: "📍" },
//     { k: "comparar" as const, label: "Comparar", icon: "⚖️" },
//     { k: "heatmap" as const, label: "Heatmap", icon: "🔥" },
//   ];

//   return (
//     <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Georgia','Times New Roman',serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap');
//         *{box-sizing:border-box;margin:0;padding:0;}
//         ::-webkit-scrollbar{width:6px;height:6px;}
//         ::-webkit-scrollbar-track{background:#f3f4f6;}
//         ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px;}
//         @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
//         .fade{animation:fadeUp 0.4s ease both;}
//         .fade1{animation:fadeUp 0.4s 0.05s ease both;}
//         .fade2{animation:fadeUp 0.4s 0.1s ease both;}
//         .fade3{animation:fadeUp 0.4s 0.15s ease both;}
//         .fade4{animation:fadeUp 0.4s 0.2s ease both;}
//         .ind-pill:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.12)!important;}
//         .tab-btn:hover{color:white!important;background:rgba(255,255,255,0.1)!important;}
//         .prov-pill:hover{transform:translateY(-1px);}
//         .card-hover:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.1)!important;}
//         .export-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.12);}
//         tr:hover td{background:rgba(0,145,63,0.03)!important;}
//         button{cursor:pointer;}
//         button:focus{outline:none;}
//         input:focus{border-color:#00913F!important;box-shadow:0 0 0 3px rgba(0,145,63,0.1);}
//       `}</style>

//       {/* ════ HERO HEADER ════ */}
//       <header style={{
//         background: "linear-gradient(135deg, #003d1f 0%, #006633 40%, #00913F 100%)",
//         position: "relative", overflow: "hidden",
//       }}>
//         <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
//           <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.07) 1.5px,transparent 1.5px)", backgroundSize: "28px 28px" }} />
//           <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%)" }} />
//         </div>

//         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
//           <div style={{ height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//               <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
//                 {["#D21034", "#1a1a1a", "#FCE100", "#009A44"].map(c => (
//                   <div key={c} style={{ width: "4px", height: "22px", borderRadius: "2px", background: c }} />
//                 ))}
//               </div>
//               <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.12em", textTransform: "uppercase" }}>Development Dashboard</span>
//             </div>
//             <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//               <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.06em" }}>Banco Mundial · INE · UNDP</span>
//               <div style={{ display: "flex", gap: "4px" }}>
//                 <button onClick={exportAllCSV} className="export-btn" style={{
//                   all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
//                   padding: "5px 10px", borderRadius: "8px", background: "rgba(255,255,255,0.12)",
//                   border: "1px solid rgba(255,255,255,0.18)",
//                   fontSize: "0.65rem", fontFamily: "'DM Sans',system-ui", color: "rgba(255,255,255,0.8)",
//                   transition: "all 0.15s",
//                 }}>↓ CSV</button>
//                 <button onClick={exportJSON} className="export-btn" style={{
//                   all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
//                   padding: "5px 10px", borderRadius: "8px", background: "rgba(255,255,255,0.12)",
//                   border: "1px solid rgba(255,255,255,0.18)",
//                   fontSize: "0.65rem", fontFamily: "'DM Sans',system-ui", color: "rgba(255,255,255,0.8)",
//                   transition: "all 0.15s",
//                 }}>↓ JSON</button>
//               </div>
//             </div>
//           </div>

//           <div style={{ padding: "2.5rem 0 2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
//             <div>
//               <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Indicadores Sociais 2000–2022</p>
//               <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: "-0.01em" }}>
//                 Atlas do<br />Desenvolvimento
//               </h1>
//               <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',system-ui", marginTop: "0.75rem", maxWidth: "460px", lineHeight: 1.6, fontWeight: 300 }}>
//                 Explore a evolução de Moçambique em educação, saúde, energia e bem-estar social — visualize no mapa, analise em tabela ou exporte os dados.
//               </p>
//             </div>
//             <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
//               {[
//                 { label: "Províncias", val: "11" },
//                 { label: "Indicadores", val: "8" },
//                 { label: "Anos de dados", val: "22" },
//                 { label: "Pop. total", val: "33.9M" },
//               ].map(k => (
//                 <div key={k.label} style={{
//                   background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
//                   border: "1px solid rgba(255,255,255,0.18)",
//                   borderRadius: "14px", padding: "0.875rem 1.25rem", textAlign: "center", minWidth: "90px",
//                 }}>
//                   <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "white", lineHeight: 1, fontFamily: "'Playfair Display',serif" }}>{k.val}</div>
//                   <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans',system-ui", marginTop: "4px", letterSpacing: "0.05em" }}>{k.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: "0", borderTop: "1px solid rgba(255,255,255,0.1)", overflowX: "auto" }}>
//             {tabs.map(({ k, label, icon }) => (
//               <button key={k} onClick={() => setActiveTab(k)} className="tab-btn" style={{
//                 all: "unset", padding: "0.875rem 1.5rem",
//                 fontSize: "0.82rem", fontFamily: "'DM Sans',system-ui", fontWeight: 500,
//                 color: activeTab === k ? "white" : "rgba(255,255,255,0.5)",
//                 borderBottom: activeTab === k ? "3px solid #FFD100" : "3px solid transparent",
//                 transition: "all 0.2s", whiteSpace: "nowrap",
//                 display: "flex", alignItems: "center", gap: "6px",
//                 borderRadius: activeTab === k ? "0" : "0",
//                 background: activeTab === k ? "rgba(255,255,255,0.05)" : "transparent",
//               }}>
//                 <span style={{ fontSize: "0.85rem" }}>{icon}</span>
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {/* ════ INDICATOR PILLS ════ */}
//       <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 40 }}>
//         <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0.875rem 2.5rem", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
//           <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "4px", flexShrink: 0 }}>Indicador</span>
//           {INDICATORS.map(i => (
//             <button key={i.id} onClick={() => setActiveInd(i.id)} className="ind-pill" style={{
//               all: "unset", cursor: "pointer",
//               padding: "6px 18px", borderRadius: "100px",
//               fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600,
//               background: activeInd === i.id ? i.color : i.bg,
//               color: activeInd === i.id ? "white" : i.color,
//               border: `1.5px solid ${activeInd === i.id ? i.color : i.color + "40"}`,
//               transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
//               boxShadow: activeInd === i.id ? `0 4px 14px ${i.color}45` : "none",
//             }}>{i.label}</button>
//           ))}
//         </div>
//       </div>

//       {/* ════ MAIN CONTENT ════ */}
//       <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 2.5rem 4rem" }}>

//         {/* ═══ NACIONAL ═══ */}
//         {activeTab === "nacional" && (
//           <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
//               {[
//                 { label: "Valor Actual", val: `${latest.value}${ind.unit}`, sub: "2022 · mais recente", col: ind.color, bg: ind.bg, cls: "fade" },
//                 { label: "Variação recente", val: `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}${ind.unit}`, sub: "desde 2020", col: delta >= 0 ? "#00913F" : "#C23B22", bg: delta >= 0 ? "#e8f7ee" : "#fee2e2", cls: "fade1" },
//                 { label: ind.inverted ? "Redução total" : "Crescimento total", val: `${ind.inverted ? "-" : "+"}${Math.abs(latest.value - natData[0].value).toFixed(1)}${ind.unit}`, sub: "desde 2000", col: "#5B21B6", bg: "#ede9fe", cls: "fade2" },
//                 { label: "Média Provincial", val: `${(PROVINCES.reduce((s, p) => s + PROV_CURRENT[p.id][activeInd], 0) / PROVINCES.length).toFixed(1)}${ind.unit}`, sub: "todas as 11 províncias", col: "#D97706", bg: "#fef3c7", cls: "fade3" },
//               ].map(k => (
//                 <div key={k.label} className={k.cls + " card-hover"} style={{ background: "white", borderRadius: "18px", padding: "1.5rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s ease" }}>
//                   <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: "100px", background: k.bg, marginBottom: "0.75rem" }}>
//                     <span style={{ fontSize: "0.65rem", color: k.col, fontFamily: "'DM Sans',system-ui", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{k.label}</span>
//                   </div>
//                   <div style={{ fontSize: "2.4rem", fontWeight: 700, color: k.col, lineHeight: 1, letterSpacing: "-0.02em", fontFamily: "'Playfair Display',serif" }}>{k.val}</div>
//                   <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", marginTop: "6px" }}>{k.sub}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="fade2 card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
//                 <div>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
//                     <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
//                     <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>{ind.full}</h2>
//                   </div>
//                   <p style={{ fontSize: "0.78rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Evolução nacional · 2000–2022 · Fonte: Banco Mundial</p>
//                 </div>
//                 <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//                   <div style={{ textAlign: "right" }}>
//                     <div style={{ fontSize: "3.5rem", fontWeight: 900, color: ind.color, lineHeight: 1, letterSpacing: "-0.03em", fontFamily: "'Playfair Display',serif" }}>{latest.value}<span style={{ fontSize: "1.5rem", opacity: 0.5 }}>%</span></div>
//                   </div>
//                   <button onClick={() => exportCSV(activeInd)} style={{
//                     all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: "10px",
//                     border: `1.5px solid ${ind.color}40`, background: ind.bg,
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: ind.color,
//                     display: "flex", alignItems: "center", gap: "5px",
//                   }}>
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
//                     Exportar
//                   </button>
//                 </div>
//               </div>
//               {mounted && <LineChart datasets={[{ label: "Nacional", color: ind.color, data: natData }]} height={260} />}
//               <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #f3f4f6" }}>
//                 {natData.map(d => (
//                   <div key={d.year} style={{ padding: "8px 14px", borderRadius: "10px", border: `2px solid ${d.year === latest.year ? ind.color : "#f3f4f6"}`, background: d.year === latest.year ? ind.bg : "#fafafa", transition: "all 0.15s" }}>
//                     <div style={{ fontSize: "0.85rem", fontWeight: 700, color: d.year === latest.year ? ind.color : "#374151", fontFamily: "'DM Sans',system-ui" }}>{d.value}%</div>
//                     <div style={{ fontSize: "0.65rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>{d.year}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="fade3 card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
//                   <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#111827" }}>Ranking Provincial — {ind.full}</h3>
//                 </div>
//                 <div style={{ display: "flex", gap: "6px" }}>
//                   <button onClick={() => setActiveTab("mapa")} style={{ all: "unset", cursor: "pointer", padding: "7px 12px", borderRadius: "8px", background: "#e8f7ee", color: "#00913F", fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
//                     🗺️ Ver no Mapa
//                   </button>
//                   <button onClick={() => setActiveTab("tabela")} style={{ all: "unset", cursor: "pointer", padding: "7px 12px", borderRadius: "8px", background: "#dbeafe", color: "#1D6FBF", fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
//                     📋 Ver Tabela
//                   </button>
//                 </div>
//               </div>
//               <ProvinceBar indicatorId={activeInd} highlighted={[]} />
//             </div>
//           </div>
//         )}

//         {/* ═══ MAPA ═══ */}
//         {activeTab === "mapa" && (
//           <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
//             <div style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
//                 <div>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
//                     <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
//                     <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>Mapa Coroplético — {ind.full}</h2>
//                   </div>
//                   <p style={{ fontSize: "0.78rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>
//                     Clique numa província para ver detalhes · Passe o rato para comparar · Dados de 2022
//                   </p>
//                 </div>
//                 <div style={{ display: "flex", gap: "6px" }}>
//                   <button onClick={() => exportCSV(activeInd)} style={{
//                     all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: "10px",
//                     border: `1.5px solid ${ind.color}40`, background: ind.bg,
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: ind.color,
//                     display: "flex", alignItems: "center", gap: "5px",
//                   }}>
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
//                     Exportar CSV
//                   </button>
//                   <button onClick={exportJSON} style={{
//                     all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: "10px",
//                     border: "1.5px solid #1D6FBF40", background: "#dbeafe",
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#1D6FBF",
//                     display: "flex", alignItems: "center", gap: "5px",
//                   }}>
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
//                     JSON
//                   </button>
//                 </div>
//               </div>

//               <MozambiqueMap
//                 indicatorId={activeInd}
//                 onProvinceClick={(id) => setMapSelectedProv(prev => prev === id ? null : id)}
//                 selectedProvince={mapSelectedProv}
//               />
//             </div>

//             {/* Quick stats below map */}
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "0.875rem" }}>
//               {[...PROVINCES].sort((a, b) => getScore(b.id, activeInd) - getScore(a.id, activeInd)).slice(0, 4).map((p, i) => {
//                 const val = PROV_CURRENT[p.id][activeInd];
//                 const score = getScore(p.id, activeInd);
//                 const medals = ["🥇", "🥈", "🥉", "4️⃣"];
//                 return (
//                   <div key={p.id}
//                     onClick={() => { setMapSelectedProv(p.id); }}
//                     className="card-hover"
//                     style={{ background: "white", borderRadius: "14px", padding: "1.25rem", border: `1px solid ${ind.color}20`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", cursor: "pointer", transition: "all 0.2s" }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
//                       <span style={{ fontSize: "1.2rem" }}>{medals[i]}</span>
//                       <span style={{ fontSize: "0.68rem", fontFamily: "'DM Sans',system-ui", color: "#9ca3af" }}>{score}/100</span>
//                     </div>
//                     <div style={{ fontSize: "1.4rem", fontWeight: 700, color: ind.color, fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{val}{ind.unit}</div>
//                     <div style={{ fontSize: "0.78rem", fontFamily: "'DM Sans',system-ui", color: "#374151", marginTop: "4px", fontWeight: 500 }}>{p.name}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* ═══ TABELA ═══ */}
//         {activeTab === "tabela" && (
//           <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
//             <div style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
//                 <div>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
//                     <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
//                     <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>Tabela de Dados — {ind.full}</h2>
//                   </div>
//                   <p style={{ fontSize: "0.78rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>
//                     Filtre, ordene e exporte os dados de todas as províncias · Clique nas colunas para ordenar
//                   </p>
//                 </div>
//                 <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
//                   <span style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Exportar:</span>
//                   <button onClick={() => exportCSV(activeInd)} style={{
//                     all: "unset", cursor: "pointer", padding: "7px 12px", borderRadius: "8px",
//                     border: `1.5px solid ${ind.color}40`, background: ind.bg,
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: ind.color,
//                   }}>CSV</button>
//                   <button onClick={exportAllCSV} style={{
//                     all: "unset", cursor: "pointer", padding: "7px 12px", borderRadius: "8px",
//                     border: "1.5px solid #00913F40", background: "#e8f7ee",
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#00913F",
//                   }}>CSV Completo</button>
//                   <button onClick={exportJSON} style={{
//                     all: "unset", cursor: "pointer", padding: "7px 12px", borderRadius: "8px",
//                     border: "1.5px solid #1D6FBF40", background: "#dbeafe",
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#1D6FBF",
//                   }}>JSON</button>
//                 </div>
//               </div>
//               <DataTable indicatorId={activeInd} />
//             </div>

//             {/* Summary statistics */}
//             <div style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//               <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.25rem" }}>Estatísticas Resumidas — {ind.full}</h3>
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "1rem" }}>
//                 {(() => {
//                   const vals = PROVINCES.map(p => PROV_CURRENT[p.id][activeInd]);
//                   const sorted = [...vals].sort((a, b) => a - b);
//                   const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
//                   const max = Math.max(...vals);
//                   const min = Math.min(...vals);
//                   const maxProv = PROVINCES.find(p => PROV_CURRENT[p.id][activeInd] === max)!;
//                   const minProv = PROVINCES.find(p => PROV_CURRENT[p.id][activeInd] === min)!;
//                   const median = sorted.length % 2 === 0 ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)];
//                   const stddev = Math.sqrt(vals.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / vals.length);
//                   return [
//                     { label: "Média", val: mean.toFixed(1) + ind.unit, sub: "11 províncias" },
//                     { label: "Mediana", val: median.toFixed(1) + ind.unit, sub: "valor central" },
//                     { label: "Máximo", val: max + ind.unit, sub: maxProv.short },
//                     { label: "Mínimo", val: min + ind.unit, sub: minProv.short },
//                     { label: "Desvio Padrão", val: stddev.toFixed(1) + ind.unit, sub: "dispersão" },
//                     { label: "Amplitude", val: (max - min).toFixed(0) + ind.unit, sub: "max − min" },
//                   ].map(s => (
//                     <div key={s.label} style={{ padding: "1rem", borderRadius: "12px", background: ind.bg, border: `1px solid ${ind.color}20` }}>
//                       <div style={{ fontSize: "0.65rem", color: ind.color, fontFamily: "'DM Sans',system-ui", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>{s.label}</div>
//                       <div style={{ fontSize: "1.4rem", fontWeight: 700, color: ind.color, fontFamily: "'Playfair Display',serif", lineHeight: 1 }}>{s.val}</div>
//                       <div style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", marginTop: "4px" }}>{s.sub}</div>
//                     </div>
//                   ));
//                 })()}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ═══ PROVINCIAL ═══ */}
//         {activeTab === "provincial" && (
//           <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
//             <div style={{ background: "white", borderRadius: "20px", padding: "1.75rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
//                 <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#e8f7ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00913F" strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
//                 </div>
//                 <div>
//                   <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Seleccionar Províncias</p>
//                   <p style={{ fontSize: "0.72rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Escolha até 4 províncias para explorar</p>
//                 </div>
//               </div>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                 {PROVINCES.map(p => {
//                   const isOn = selProvs.includes(p.id);
//                   const ci = selProvs.indexOf(p.id);
//                   const col = isOn ? CCOLORS[ci] : undefined;
//                   return (
//                     <button key={p.id} onClick={() => toggleProv(p.id)} className="prov-pill" style={{
//                       all: "unset", cursor: "pointer", padding: "7px 16px", borderRadius: "100px",
//                       fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", fontWeight: 500,
//                       background: isOn ? col + "18" : "#f9fafb",
//                       color: isOn ? col : "#4b5563",
//                       border: `1.5px solid ${isOn ? col + "60" : "#e5e7eb"}`,
//                       transition: "all 0.18s", boxShadow: isOn ? `0 2px 8px ${col}30` : "none",
//                     }}>{p.name}</button>
//                   );
//                 })}
//               </div>
//             </div>

//             {selProvs.length === 0 ? (
//               <div style={{ background: "white", borderRadius: "20px", padding: "4rem", textAlign: "center", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//                 <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📍</div>
//                 <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#374151", marginBottom: "6px" }}>Nenhuma província seleccionada</p>
//                 <p style={{ fontSize: "0.8rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Seleccione uma ou mais províncias acima para explorar os dados</p>
//               </div>
//             ) : (
//               <>
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
//                   {selProvs.map((pid, ci) => {
//                     const p = PROVINCES.find(x => x.id === pid)!;
//                     const col = CCOLORS[ci];
//                     const val = PROV_CURRENT[pid][activeInd];
//                     const sc = getScore(pid, activeInd);
//                     const rk = rankProv(pid, activeInd);
//                     const trend = PROVINCIAL[pid][activeInd];
//                     const tDelta = (trend.at(-1)! - trend[0]).toFixed(1);
//                     return (
//                       <div key={pid} className="card-hover" style={{ background: "white", borderRadius: "20px", border: `2px solid ${col}30`, padding: "1.75rem", boxShadow: `0 4px 20px ${col}15`, transition: "all 0.2s" }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
//                           <div>
//                             <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
//                               <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: col, boxShadow: `0 0 0 3px ${col}30` }} />
//                               <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>{p.name}</h3>
//                             </div>
//                             <p style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", paddingLeft: "18px" }}>
//                               {p.pop}M hab. · Rank <strong style={{ color: col }}>#{rk}</strong> de 11
//                             </p>
//                           </div>
//                           <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
//                             <div style={{ padding: "4px 12px", borderRadius: "100px", background: col + "15", fontSize: "0.7rem", fontFamily: "'DM Sans',system-ui", color: col, fontWeight: 700 }}>
//                               {ind.inverted ? "-" : "+"}{Math.abs(Number(tDelta))}{ind.unit} {ind.inverted ? "↓" : "↑"}
//                             </div>
//                             <button onClick={() => { setMapSelectedProv(pid); setActiveTab("mapa"); }} style={{
//                               all: "unset", cursor: "pointer", fontSize: "0.65rem", fontFamily: "'DM Sans',system-ui",
//                               color: col, textDecoration: "underline",
//                             }}>Ver no mapa →</button>
//                           </div>
//                         </div>
//                         <div style={{ background: `linear-gradient(135deg,${col}12,${col}06)`, borderRadius: "14px", padding: "1.25rem", marginBottom: "1rem", border: `1px solid ${col}20` }}>
//                           <div style={{ fontSize: "3.2rem", fontWeight: 900, color: col, lineHeight: 1, fontFamily: "'Playfair Display',serif", letterSpacing: "-0.02em" }}>
//                             {val}<span style={{ fontSize: "1.2rem", opacity: 0.6 }}>{ind.unit}</span>
//                           </div>
//                           <div style={{ fontSize: "0.78rem", color: col + "aa", fontFamily: "'DM Sans',system-ui", marginTop: "4px" }}>{ind.full}</div>
//                           <div style={{ height: "6px", background: col + "20", borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
//                             <div style={{ width: `${sc}%`, height: "100%", background: col, borderRadius: "3px" }} />
//                           </div>
//                         </div>
//                         {mounted && (
//                           <div style={{ marginBottom: "1rem" }}>
//                             <LineChart datasets={[{ label: p.name, color: col, data: YEARS.map((y, i) => ({ year: y, value: trend[i] })) }]} height={90} />
//                           </div>
//                         )}
//                         <div style={{ display: "flex", flexDirection: "column", gap: "4px", borderTop: `1px solid ${col}18`, paddingTop: "0.875rem" }}>
//                           {INDICATORS.map(i => {
//                             const v = PROV_CURRENT[pid][i.id];
//                             const s = getScore(pid, i.id);
//                             return (
//                               <div key={i.id} onClick={() => setActiveInd(i.id)} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "4px 6px", borderRadius: "7px", background: activeInd === i.id ? i.bg : "transparent", transition: "background 0.15s" }}>
//                                 <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: i.color, flexShrink: 0 }} />
//                                 <span style={{ fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", color: "#6b7280", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{i.full}</span>
//                                 <div style={{ width: "48px", height: "5px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
//                                   <div style={{ width: `${s}%`, height: "100%", background: i.color, borderRadius: "3px" }} />
//                                 </div>
//                                 <span style={{ fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", color: i.color, fontWeight: 700, minWidth: "30px", textAlign: "right" }}>{v}{i.unit}</span>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
//                     <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
//                     <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>Posição no Ranking — {ind.full}</h3>
//                   </div>
//                   <ProvinceBar indicatorId={activeInd} highlighted={selProvs} />
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* ═══ COMPARAR ═══ */}
//         {activeTab === "comparar" && (
//           <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
//             <div style={{ background: "white", borderRadius: "20px", padding: "1.75rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
//                 <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D6FBF" strokeWidth="2.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
//                 </div>
//                 <div>
//                   <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Comparar Províncias</p>
//                   <p style={{ fontSize: "0.72rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Seleccione até 4 para comparação directa</p>
//                 </div>
//               </div>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                 {PROVINCES.map(p => {
//                   const isOn = selProvs.includes(p.id);
//                   const ci = selProvs.indexOf(p.id);
//                   const col = isOn ? CCOLORS[ci] : undefined;
//                   return (
//                     <button key={p.id} onClick={() => toggleProv(p.id)} className="prov-pill" style={{
//                       all: "unset", cursor: "pointer", padding: "7px 16px", borderRadius: "100px",
//                       fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", fontWeight: 500,
//                       background: isOn ? col + "18" : "#f9fafb",
//                       color: isOn ? col : "#4b5563",
//                       border: `1.5px solid ${isOn ? col + "60" : "#e5e7eb"}`,
//                       transition: "all 0.18s", boxShadow: isOn ? `0 2px 8px ${col}30` : "none",
//                     }}>
//                       {isOn && <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: col, marginRight: "7px", verticalAlign: "middle" }} />}
//                       {p.name}
//                     </button>
//                   );
//                 })}
//               </div>
//               {selProvs.length > 0 && (
//                 <div style={{ display: "flex", gap: "16px", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6", flexWrap: "wrap" }}>
//                   {selProvs.map((pid, ci) => (
//                     <div key={pid} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
//                       <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: CCOLORS[ci] }} />
//                       <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", color: "#374151", fontWeight: 500 }}>{PROVINCES.find(p => p.id === pid)!.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {selProvs.length < 2 ? (
//               <div style={{ background: "white", borderRadius: "20px", padding: "4rem", textAlign: "center", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//                 <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚖️</div>
//                 <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#374151", marginBottom: "6px" }}>Seleccione pelo menos 2 províncias</p>
//                 <p style={{ fontSize: "0.8rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Poderá então comparar a evolução e os indicadores lado a lado</p>
//               </div>
//             ) : (
//               <>
//                 <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
//                     <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
//                     <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#111827" }}>{ind.full} · 2015–2022</h3>
//                   </div>
//                   <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", marginBottom: "1.75rem", paddingLeft: "22px" }}>Evolução temporal comparada</p>
//                   {mounted && <LineChart datasets={compareDS} height={280} />}
//                 </div>

//                 <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
//                   <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>Todos os Indicadores</h3>
//                   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "0.875rem" }}>
//                     {INDICATORS.map(i => {
//                       const vals = selProvs.map(pid => ({ pid, val: PROV_CURRENT[pid][i.id], score: getScore(pid, i.id) }));
//                       const maxS = Math.max(...vals.map(v => v.score));
//                       return (
//                         <div key={i.id} onClick={() => setActiveInd(i.id)} style={{ padding: "1.25rem", borderRadius: "14px", cursor: "pointer", background: activeInd === i.id ? i.bg : "#fafafa", border: `1.5px solid ${activeInd === i.id ? i.color + "40" : "#f3f4f6"}`, transition: "all 0.15s" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
//                             <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: i.color }} />
//                             <span style={{ fontSize: "0.82rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#374151" }}>{i.full}</span>
//                             {activeInd === i.id && <span style={{ fontSize: "0.6rem", color: i.color, fontFamily: "'DM Sans',system-ui", marginLeft: "auto", background: i.color + "20", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>ACTIVO</span>}
//                           </div>
//                           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//                             {vals.map((v, ci) => {
//                               const col = CCOLORS[ci];
//                               const isW = v.score === maxS;
//                               return (
//                                 <div key={v.pid} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                                   <span style={{ fontSize: "0.7rem", fontFamily: "'DM Sans',system-ui", color: col, fontWeight: 700, width: "28px" }}>{PROVINCES.find(p => p.id === v.pid)!.short}</span>
//                                   <div style={{ flex: 1, height: "12px", background: "#f3f4f6", borderRadius: "6px", overflow: "hidden" }}>
//                                     <div style={{ width: `${v.score}%`, height: "100%", background: `linear-gradient(90deg,${col},${col}cc)`, borderRadius: "6px", transition: "width 0.5s" }} />
//                                   </div>
//                                   <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", color: isW ? col : "#9ca3af", fontWeight: isW ? 700 : 400, minWidth: "44px", textAlign: "right" }}>
//                                     {v.val}{i.unit} {isW ? "▲" : ""}
//                                   </span>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem" }}>
//                   <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", transition: "all 0.2s" }}>
//                     <p style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.1em", textTransform: "uppercase" }}>Perfil Global</p>
//                     <RadarChart provinces={selProvs} size={200} />
//                     <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
//                       {selProvs.map((pid, ci) => (
//                         <div key={pid} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                           <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: CCOLORS[ci] }} />
//                           <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", color: "#374151" }}>{PROVINCES.find(p => p.id === pid)!.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
//                     <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>Score de Desenvolvimento Global</p>
//                     <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//                       {selProvs.map((pid, ci) => {
//                         const sc = overallScore(pid);
//                         const col = CCOLORS[ci];
//                         const p = PROVINCES.find(x => x.id === pid)!;
//                         return (
//                           <div key={pid}>
//                             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
//                               <span style={{ fontSize: "0.85rem", fontFamily: "'DM Sans',system-ui", color: "#374151", fontWeight: 500 }}>{p.name}</span>
//                               <span style={{ fontSize: "1.5rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: col }}>{sc}<span style={{ fontSize: "0.75rem", opacity: 0.6 }}>/100</span></span>
//                             </div>
//                             <div style={{ height: "14px", background: "#f3f4f6", borderRadius: "7px", overflow: "hidden" }}>
//                               <div style={{ width: `${sc}%`, height: "100%", background: `linear-gradient(90deg,${col},${col}aa)`, borderRadius: "7px", transition: "width 0.7s" }} />
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* ═══ HEATMAP ═══ */}
//         {activeTab === "heatmap" && (
//           <div className="fade">
//             <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
//                 <div>
//                   <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Heatmap de Desenvolvimento</h2>
//                   <p style={{ fontSize: "0.78rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Todos os indicadores por província · ordenado por score global · clique numa linha para explorar</p>
//                 </div>
//                 <div style={{ display: "flex", gap: "6px" }}>
//                   <button onClick={exportAllCSV} style={{
//                     all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: "10px",
//                     border: "1.5px solid #00913F40", background: "#e8f7ee",
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#00913F",
//                     display: "flex", alignItems: "center", gap: "5px",
//                   }}>
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
//                     Exportar CSV
//                   </button>
//                   <button onClick={exportJSON} style={{
//                     all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: "10px",
//                     border: "1.5px solid #1D6FBF40", background: "#dbeafe",
//                     fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#1D6FBF",
//                     display: "flex", alignItems: "center", gap: "5px",
//                   }}>
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
//                     JSON
//                   </button>
//                 </div>
//               </div>

//               <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
//                 {INDICATORS.map(i => (
//                   <div key={i.id} onClick={() => setActiveInd(i.id)} style={{
//                     display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
//                     padding: "4px 10px", borderRadius: "100px",
//                     background: activeInd === i.id ? i.bg : "transparent",
//                     border: `1px solid ${activeInd === i.id ? i.color + "40" : "transparent"}`,
//                     transition: "all 0.15s",
//                   }}>
//                     <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: i.color }} />
//                     <span style={{ fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", color: activeInd === i.id ? "#111827" : "#6b7280", fontWeight: activeInd === i.id ? 600 : 400 }}>{i.full}</span>
//                   </div>
//                 ))}
//               </div>

//               <div style={{ overflowX: "auto" }}>
//                 <table style={{ borderCollapse: "separate", borderSpacing: "4px", fontFamily: "'DM Sans',system-ui", fontSize: "0.75rem", width: "100%" }}>
//                   <thead>
//                     <tr>
//                       <th style={{ textAlign: "left", color: "#9ca3af", fontWeight: 500, paddingBottom: "10px", paddingRight: "16px", whiteSpace: "nowrap", fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Província</th>
//                       {INDICATORS.map(i => (
//                         <th key={i.id} onClick={() => setActiveInd(i.id)} style={{ textAlign: "center", fontWeight: 600, paddingBottom: "10px", minWidth: "80px", cursor: "pointer", color: activeInd === i.id ? i.color : "#6b7280", fontSize: "0.72rem" }}>
//                           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
//                             <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: i.color, opacity: activeInd === i.id ? 1 : 0.5 }} />
//                             {i.label}
//                           </div>
//                         </th>
//                       ))}
//                       <th style={{ textAlign: "center", color: "#111827", fontWeight: 700, paddingBottom: "10px", minWidth: "60px", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Score</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[...PROVINCES].sort((a, b) => overallScore(b.id) - overallScore(a.id)).map((p, ri) => (
//                       <tr key={p.id} onClick={() => { setSelProvs([p.id]); setActiveTab("provincial"); }} style={{ cursor: "pointer" }}>
//                         <td style={{ paddingRight: "16px", paddingTop: "3px", paddingBottom: "3px", whiteSpace: "nowrap" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                             <span style={{ fontSize: "0.65rem", color: "#d1d5db", fontWeight: 600, width: "18px", textAlign: "right" }}>{ri + 1}</span>
//                             <span style={{ color: "#111827", fontWeight: 600, fontSize: "0.8rem" }}>{p.name}</span>
//                           </div>
//                         </td>
//                         {INDICATORS.map(i => {
//                           const v = PROV_CURRENT[p.id][i.id];
//                           const s = getScore(p.id, i.id);
//                           const opacity = 0.12 + 0.72 * (s / 100);
//                           return (
//                             <td key={i.id} style={{ textAlign: "center", paddingTop: "3px", paddingBottom: "3px" }}>
//                               <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "68px", height: "28px", borderRadius: "8px", background: i.color, opacity, fontSize: "0.72rem", fontWeight: 700 }}>
//                                 <span style={{ opacity: Math.min(1, (1 / opacity) * 0.85), color: "#1a1a1a" }}>{v}{i.unit}</span>
//                               </div>
//                             </td>
//                           );
//                         })}
//                         <td style={{ textAlign: "center", paddingTop: "3px", paddingBottom: "3px" }}>
//                           <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "28px", borderRadius: "8px", background: "#111827", color: "white", fontSize: "0.78rem", fontWeight: 700 }}>{overallScore(p.id)}</div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <p style={{ fontSize: "0.7rem", color: "#d1d5db", marginTop: "1.25rem", fontFamily: "'DM Sans',system-ui" }}>
//                 Intensidade da cor reflecte o nível de desempenho. Clique numa linha para explorar o perfil completo da província.
//               </p>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* FOOTER */}
//       <footer style={{ background: "#111827", padding: "2rem 2.5rem", marginTop: "0" }}>
//         <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
//           <div>
//             <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "4px" }}>Mozambique Development Dashboard</p>
//             <p style={{ fontSize: "0.7rem", color: "#6b7280", fontFamily: "'DM Sans',system-ui", marginBottom: "6px" }}>Dados estimados para fins ilustrativos · Fontes: Banco Mundial, INE, UNDP</p>
//             <p style={{ fontSize: "0.7rem", color: "#4b5563", fontFamily: "'DM Sans',system-ui" }}>
//               <span>© {new Date().getFullYear()} Gédia Jangamo. Reservados Todos os direitos</span>
//             </p>
//           </div>
//           <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//             <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
//               {["#D21034", "#1a1a1a", "#FCE100", "#009A44"].map(c => (
//                 <div key={c} style={{ width: "5px", height: "32px", borderRadius: "3px", background: c }} />
//               ))}
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginLeft: "12px" }}>
//               <button onClick={exportAllCSV} style={{ all: "unset", cursor: "pointer", fontSize: "0.68rem", color: "#6b7280", fontFamily: "'DM Sans',system-ui", display: "flex", alignItems: "center", gap: "5px" }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
//                 Descarregar CSV
//               </button>
//               <button onClick={exportJSON} style={{ all: "unset", cursor: "pointer", fontSize: "0.68rem", color: "#6b7280", fontFamily: "'DM Sans',system-ui", display: "flex", alignItems: "center", gap: "5px" }}>
//                 <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
//                 Descarregar JSON
//               </button>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";

import {
  BarChart3,
  Map,
  Table2,
  MapPin,
  Scale,
  Grid3X3,
  Download,
  FileJson,
  TrendingUp,
  TrendingDown,
  Users,
  Activity
} from "lucide-react";
import { COMPARE_COLORS, getScore, INDICATORS, NATIONAL, overallScore, PROV_CURRENT, PROVINCES, PROVINCIAL, rankProv, YEARS } from "./lib/data";
import { cn } from "./lib/utils";
import { StatCard } from "./components/dashboard/stat-card";
import { LineChart } from "./components/charts/line-chart";
import { ProvinceBar } from "./components/charts/province-bar";
import { MozambiqueMap } from "./components/map/mozambique-map";
import { DataTable } from "./components/dashboard/data-table";
import { RadarChart } from "./components/charts/radar-chart";
import { Heatmap } from "./components/dashboard/heatmap";

type TabKey = "nacional" | "mapa" | "provincial" | "comparar" | "heatmap" | "tabela";

const TABS: { k: TabKey; label: string; icon: React.ReactNode }[] = [
  { k: "nacional", label: "Nacional", icon: <BarChart3 className="w-4 h-4" /> },
  { k: "mapa", label: "Mapa", icon: <Map className="w-4 h-4" /> },
  { k: "tabela", label: "Tabela", icon: <Table2 className="w-4 h-4" /> },
  { k: "provincial", label: "Por Província", icon: <MapPin className="w-4 h-4" /> },
  { k: "comparar", label: "Comparar", icon: <Scale className="w-4 h-4" /> },
  { k: "heatmap", label: "Heatmap", icon: <Grid3X3 className="w-4 h-4" /> },
];

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

export default function Home() {
  const [activeInd, setActiveInd] = useState("literacy");
  const [activeTab, setActiveTab] = useState<TabKey>("nacional");
  const [selProvs, setSelProvs] = useState<string[]>([]);
  const [mapSelectedProv, setMapSelectedProv] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const ind = INDICATORS.find(i => i.id === activeInd)!;
  const natData = NATIONAL[activeInd];
  const latest = natData.at(-1)!;
  const prev = natData.at(-2)!;
  const delta = latest.value - prev.value;

  const toggleProv = (id: string) => {
    setSelProvs(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 4 ? [...p, id] : p);
  };

  const compareDS = selProvs.map((pid, i) => ({
    label: PROVINCES.find(p => p.id === pid)!.name,
    color: COMPARE_COLORS[i],
    data: YEARS.map((y, yi) => ({ year: y, value: PROVINCIAL[pid][activeInd][yi] })),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* ════ HERO HEADER ════ */}
      <header className="relative overflow-hidden bg-gradient-hero">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none pattern-dots" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top bar */}
          <div className="h-14 flex items-center justify-between border-b border-border/50">
            <div className="flex items-center gap-4">
              {/* Mozambique flag colors */}
              <div className="flex gap-0.5">
                {["#D21034", "#1a1a1a", "#FCE100", "#009A44"].map(c => (
                  <div key={c} className="w-1 h-6 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase hidden sm:block">
                Development Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground tracking-wide hidden md:block">
                Banco Mundial · INE · UNDP
              </span>
              <div className="flex gap-2">
                <button
                  onClick={exportAllCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span className="hidden sm:inline">CSV</span>
                </button>
                <button
                  onClick={exportJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <FileJson className="w-3 h-3" />
                  <span className="hidden sm:inline">JSON</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero content */}
          <div className="py-8 lg:py-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="animate-fade-up">
              <p className="text-[10px] text-primary tracking-widest uppercase mb-2 font-semibold">
                Indicadores Sociais 2000–2022
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                <span className="text-gradient-warm">Atlas do</span>
                <br />
                <span className="text-foreground">Desenvolvimento</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed text-sm sm:text-base">
                Explore a evolução de Moçambique em educação, saúde, energia e bem-estar social —
                visualize no mapa, analise em tabela ou exporte os dados.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up stagger-1">
              {[
                { label: "Províncias", val: "11", icon: <MapPin className="w-4 h-4" /> },
                { label: "Indicadores", val: "8", icon: <Activity className="w-4 h-4" /> },
                { label: "Anos", val: "22", icon: <TrendingUp className="w-4 h-4" /> },
                { label: "População", val: "33.9M", icon: <Users className="w-4 h-4" /> },
              ].map(k => (
                <div
                  key={k.label}
                  className="bg-card/80 border border-border rounded-xl px-4 py-3 text-center shadow-soft hover-lift"
                >
                  <div className="flex justify-center mb-2 text-primary">{k.icon}</div>
                  <div className="text-2xl font-bold font-serif">{k.val}</div>
                  <div className="text-[10px] text-muted-foreground tracking-wide">{k.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-px -mb-px">
            {TABS.map(({ k, label, icon }) => (
              <button
                key={k}
                onClick={() => setActiveTab(k)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2",
                  activeTab === k
                    ? "text-primary border-primary bg-primary/5"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ════ INDICATOR PILLS ════ */}
      <div className="sticky top-0 z-40 glass-light shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto items-center">
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase shrink-0 mr-2">
            Indicador
          </span>
          {INDICATORS.map(i => (
            <button
              key={i.id}
              onClick={() => setActiveInd(i.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeInd === i.id
                  ? "text-white shadow-soft"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
              style={{
                backgroundColor: activeInd === i.id ? i.color : undefined,
                boxShadow: activeInd === i.id ? `0 4px 16px ${i.color}35` : undefined
              }}
            >
              {i.label}
            </button>
          ))}
        </div>
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ═══ NACIONAL ═══ */}
        {activeTab === "nacional" && (
          <div className="flex flex-col gap-6">
            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Valor Actual"
                value={`${latest.value}${ind.unit}`}
                subtext="2022 · mais recente"
                color={ind.color}
                className="animate-fade-up"
              />
              <StatCard
                label="Variação recente"
                value={`${delta >= 0 ? "+" : ""}${delta.toFixed(1)}${ind.unit}`}
                subtext="desde 2020"
                color={delta >= 0 ? "#22c55e" : "#ef4444"}
                className="animate-fade-up-delay-1"
              />
              <StatCard
                label={ind.inverted ? "Redução total" : "Crescimento total"}
                value={`${ind.inverted ? "-" : "+"}${Math.abs(latest.value - natData[0].value).toFixed(1)}${ind.unit}`}
                subtext="desde 2000"
                color="#8b5cf6"
                className="animate-fade-up-delay-2"
              />
              <StatCard
                label="Média Provincial"
                value={`${(PROVINCES.reduce((s, p) => s + PROV_CURRENT[p.id][activeInd], 0) / PROVINCES.length).toFixed(1)}${ind.unit}`}
                subtext="todas as 11 províncias"
                color="#f59e0b"
                className="animate-fade-up-delay-3"
              />
            </div>

            {/* Main chart */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-fade-up stagger-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: ind.color }} />
                    <h2 className="font-serif text-xl font-bold">{ind.full}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Evolução nacional · 2000–2022 · Fonte: Banco Mundial
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-4xl sm:text-5xl font-bold font-serif" style={{ color: ind.color }}>
                      {latest.value}
                      <span className="text-xl opacity-50">{ind.unit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {mounted && <LineChart datasets={[{ label: "Nacional", color: ind.color, data: natData }]} height={280} />}

              {/* Year chips */}
              <div className="flex gap-2 flex-wrap mt-6 pt-4 border-t border-border">
                {natData.map(d => (
                  <div
                    key={d.year}
                    className={cn(
                      "px-3 py-2 rounded-lg border-2 transition-all",
                      d.year === latest.year
                        ? "border-current"
                        : "border-border bg-secondary/30"
                    )}
                    style={{
                      borderColor: d.year === latest.year ? ind.color : undefined,
                      backgroundColor: d.year === latest.year ? `${ind.color}15` : undefined
                    }}
                  >
                    <div
                      className="text-sm font-bold font-mono"
                      style={{ color: d.year === latest.year ? ind.color : undefined }}
                    >
                      {d.value}{ind.unit}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{d.year}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Province ranking */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-fade-up stagger-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: ind.color }} />
                <h3 className="font-serif text-lg font-bold">Ranking por Província</h3>
              </div>
              <ProvinceBar indicatorId={activeInd} />
            </div>
          </div>
        )}

        {/* ═══ MAPA ═══ */}
        {activeTab === "mapa" && (
          <div className="animate-fade-up">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: ind.color }} />
                <h2 className="font-serif text-xl font-bold">{ind.full} por Província</h2>
              </div>
              <MozambiqueMap
                indicatorId={activeInd}
                onProvinceClick={setMapSelectedProv}
                selectedProvince={mapSelectedProv}
              />
            </div>
          </div>
        )}

        {/* ═══ TABELA ═══ */}
        {activeTab === "tabela" && (
          <div className="animate-fade-up">
            <DataTable indicatorId={activeInd} />
          </div>
        )}

        {/* ═══ PROVINCIAL ═══ */}
        {activeTab === "provincial" && (
          <div className="flex flex-col gap-6">
            {/* Province selector */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-serif font-bold">Seleccionar Províncias</p>
                  <p className="text-xs text-muted-foreground">Escolha até 4 para análise detalhada</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROVINCES.map(p => {
                  const isOn = selProvs.includes(p.id);
                  const ci = selProvs.indexOf(p.id);
                  const col = isOn ? COMPARE_COLORS[ci] : undefined;
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProv(p.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        isOn ? "text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                      style={{
                        backgroundColor: isOn ? col : undefined,
                        boxShadow: isOn ? `0 2px 12px ${col}40` : undefined
                      }}
                    >
                      {isOn && (
                        <span className="inline-block w-2 h-2 rounded-full bg-background/30 mr-2" />
                      )}
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {selProvs.length === 0 ? (
              <div className="bg-card rounded-2xl p-12 text-center border border-border animate-fade-up-delay-1">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="font-serif text-lg text-muted-foreground mb-2">
                  Nenhuma província seleccionada
                </p>
                <p className="text-sm text-muted-foreground">
                  Seleccione províncias acima para ver análise detalhada
                </p>
              </div>
            ) : (
              <>
                {/* Province cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selProvs.map((pid, ci) => {
                    const p = PROVINCES.find(x => x.id === pid)!;
                    const col = COMPARE_COLORS[ci];
                    const val = PROV_CURRENT[pid][activeInd];
                    const sc = getScore(pid, activeInd);
                    const rk = rankProv(pid, activeInd);
                    const trend = PROVINCIAL[pid][activeInd];
                    const tDelta = (trend.at(-1)! - trend[0]).toFixed(1);

                    return (
                      <div
                        key={pid}
                        className="bg-card rounded-2xl p-5 border-2 transition-all animate-fade-up"
                        style={{
                          borderColor: `${col}40`,
                          boxShadow: `0 4px 24px ${col}15`
                        }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: col, boxShadow: `0 0 8px ${col}` }}
                              />
                              <h3 className="font-serif text-lg font-bold">{p.name}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground pl-5">
                              {p.pop}M hab. · Rank <strong style={{ color: col }}>#{rk}</strong> de 11
                            </p>
                          </div>
                          <div
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{ backgroundColor: `${col}20`, color: col }}
                          >
                            {ind.inverted ? "-" : "+"}{Math.abs(Number(tDelta))}{ind.unit}
                          </div>
                        </div>

                        <div
                          className="rounded-xl p-4 mb-4"
                          style={{ background: `linear-gradient(135deg, ${col}15, ${col}05)` }}
                        >
                          <div className="text-4xl font-bold font-serif" style={{ color: col }}>
                            {val}
                            <span className="text-lg opacity-60">{ind.unit}</span>
                          </div>
                          <div className="text-xs mt-1" style={{ color: `${col}aa` }}>{ind.full}</div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden mt-3">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${sc}%`, backgroundColor: col }}
                            />
                          </div>
                        </div>

                        {mounted && (
                          <div className="mb-4">
                            <LineChart
                              datasets={[{ label: p.name, color: col, data: YEARS.map((y, i) => ({ year: y, value: trend[i] })) }]}
                              height={100}
                              showDots={false}
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
                          {INDICATORS.slice(0, 4).map(i => {
                            const v = PROV_CURRENT[pid][i.id];
                            return (
                              <div
                                key={i.id}
                                onClick={() => setActiveInd(i.id)}
                                className={cn(
                                  "p-2 rounded-lg cursor-pointer transition-all",
                                  activeInd === i.id ? "ring-1 ring-current" : "hover:bg-secondary/50"
                                )}
                                style={{
                                  backgroundColor: activeInd === i.id ? `${i.color}15` : undefined,
                                  color: activeInd === i.id ? i.color : undefined
                                }}
                              >
                                <div className="text-[10px] font-medium mb-0.5" style={{ color: i.color }}>
                                  {i.label}
                                </div>
                                <div className="text-sm font-bold font-mono" style={{ color: i.color }}>
                                  {v}<span className="text-[10px] opacity-60">{i.unit}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Province ranking bar */}
                <div className="bg-card rounded-2xl p-6 border border-border animate-fade-up-delay-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: ind.color }} />
                    <h3 className="font-serif text-lg font-bold">Ranking — {ind.full}</h3>
                  </div>
                  <ProvinceBar indicatorId={activeInd} highlighted={selProvs} />
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══ COMPARAR ═══ */}
        {activeTab === "comparar" && (
          <div className="flex flex-col gap-6">
            {/* Province selector */}
            <div className="bg-card rounded-2xl p-6 border border-border animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-serif font-bold">Comparar Províncias</p>
                  <p className="text-xs text-muted-foreground">Seleccione até 4 para comparação directa</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROVINCES.map(p => {
                  const isOn = selProvs.includes(p.id);
                  const ci = selProvs.indexOf(p.id);
                  const col = isOn ? COMPARE_COLORS[ci] : undefined;
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProv(p.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        isOn ? "text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                      style={{
                        backgroundColor: isOn ? col : undefined,
                        boxShadow: isOn ? `0 2px 12px ${col}40` : undefined
                      }}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>

              {selProvs.length > 0 && (
                <div className="flex gap-4 mt-4 pt-4 border-t border-border flex-wrap">
                  {selProvs.map((pid, ci) => (
                    <div key={pid} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: COMPARE_COLORS[ci] }}
                      />
                      <span className="text-sm font-medium">
                        {PROVINCES.find(p => p.id === pid)!.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selProvs.length < 2 ? (
              <div className="bg-card rounded-2xl p-12 text-center border border-border animate-fade-up-delay-1">
                <Scale className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="font-serif text-lg text-muted-foreground mb-2">
                  Seleccione pelo menos 2 províncias
                </p>
                <p className="text-sm text-muted-foreground">
                  Poderá então comparar a evolução e os indicadores lado a lado
                </p>
              </div>
            ) : (
              <>
                {/* Comparison chart */}
                <div className="bg-card rounded-2xl p-6 border border-border animate-fade-up-delay-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: ind.color }} />
                    <h3 className="font-serif text-xl font-bold">{ind.full} · 2015–2022</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 pl-6">Evolução temporal comparada</p>
                  {mounted && <LineChart datasets={compareDS} height={300} />}
                </div>

                {/* All indicators comparison */}
                <div className="bg-card rounded-2xl p-6 border border-border animate-fade-up-delay-2">
                  <h3 className="font-serif text-xl font-bold mb-6">Todos os Indicadores</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {INDICATORS.map(i => {
                      const vals = selProvs.map(pid => ({
                        pid,
                        val: PROV_CURRENT[pid][i.id],
                        score: getScore(pid, i.id)
                      }));
                      const maxS = Math.max(...vals.map(v => v.score));

                      return (
                        <div
                          key={i.id}
                          onClick={() => setActiveInd(i.id)}
                          className={cn(
                            "p-4 rounded-xl cursor-pointer transition-all border",
                            activeInd === i.id
                              ? "border-current"
                              : "border-border hover:border-muted-foreground/30"
                          )}
                          style={{
                            backgroundColor: activeInd === i.id ? `${i.color}10` : undefined,
                            borderColor: activeInd === i.id ? i.color : undefined
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i.color }} />
                            <span className="text-sm font-semibold">{i.full}</span>
                            {activeInd === i.id && (
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full ml-auto font-bold"
                                style={{ backgroundColor: `${i.color}20`, color: i.color }}
                              >
                                ACTIVO
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            {vals.map((v, ci) => {
                              const col = COMPARE_COLORS[ci];
                              const isWinner = v.score === maxS;
                              return (
                                <div key={v.pid} className="flex items-center gap-2">
                                  <span
                                    className="text-xs font-bold font-mono w-7"
                                    style={{ color: col }}
                                  >
                                    {PROVINCES.find(p => p.id === v.pid)!.short}
                                  </span>
                                  <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full transition-all duration-500"
                                      style={{ width: `${v.score}%`, backgroundColor: col }}
                                    />
                                  </div>
                                  <span
                                    className={cn(
                                      "text-xs font-mono min-w-12 text-right",
                                      isWinner ? "font-bold" : "text-muted-foreground"
                                    )}
                                    style={{ color: isWinner ? col : undefined }}
                                  >
                                    {v.val}{i.unit} {isWinner ? "▲" : ""}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Radar + Overall score */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-card rounded-2xl p-6 border border-border flex flex-col items-center gap-4 animate-fade-up-delay-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Perfil Global
                    </p>
                    <RadarChart provinces={selProvs} size={220} />
                    <div className="flex flex-col gap-2 w-full">
                      {selProvs.map((pid, ci) => (
                        <div key={pid} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: COMPARE_COLORS[ci] }}
                          />
                          <span className="text-sm">{PROVINCES.find(p => p.id === pid)!.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border animate-fade-up-delay-3">
                    <p className="font-serif text-lg font-bold mb-6">Score de Desenvolvimento Global</p>
                    <div className="flex flex-col gap-4">
                      {selProvs.map((pid, ci) => {
                        const sc = overallScore(pid);
                        const col = COMPARE_COLORS[ci];
                        const p = PROVINCES.find(x => x.id === pid)!;
                        return (
                          <div key={pid}>
                            <div className="flex justify-between items-baseline mb-2">
                              <span className="text-sm font-medium">{p.name}</span>
                              <span className="text-2xl font-serif font-bold" style={{ color: col }}>
                                {sc}<span className="text-sm opacity-60">/100</span>
                              </span>
                            </div>
                            <div className="h-3 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${sc}%`,
                                  background: `linear-gradient(90deg, ${col}, ${col}aa)`,
                                  boxShadow: `0 0 12px ${col}40`
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══ HEATMAP ═══ */}
        {activeTab === "heatmap" && (
          <Heatmap
            activeIndicator={activeInd}
            onIndicatorChange={setActiveInd}
            onProvinceSelect={(id) => {
              setSelProvs([id]);
              setActiveTab("provincial");
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {["#D21034", "#1a1a1a", "#FCE100", "#009A44"].map(c => (
                  <div key={c} className="w-1 h-4 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Atlas do Desenvolvimento · Moçambique
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Dados: Banco Mundial, INE, UNDP · 2000–2022
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
