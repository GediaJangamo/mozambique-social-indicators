"use client";

import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const PROVINCES = [
  { id: "maputo_city", name: "Maputo Cidade", short: "MC", pop: 1.1 },
  { id: "maputo", name: "Maputo Prov.", short: "MP", pop: 1.8 },
  { id: "gaza", name: "Gaza", short: "GZ", pop: 1.4 },
  { id: "inhambane", name: "Inhambane", short: "IN", pop: 1.5 },
  { id: "sofala", name: "Sofala", short: "SO", pop: 2.1 },
  { id: "manica", name: "Manica", short: "MN", pop: 1.8 },
  { id: "tete", name: "Tete", short: "TE", pop: 2.6 },
  { id: "zambezia", name: "Zambézia", short: "ZB", pop: 4.9 },
  { id: "nampula", name: "Nampula", short: "NA", pop: 6.1 },
  { id: "cabo_delgado", name: "Cabo Delgado", short: "CD", pop: 2.3 },
  { id: "niassa", name: "Niassa", short: "NI", pop: 1.5 },
];

const INDICATORS = [
  { id: "literacy", label: "Literacia", full: "Taxa de Literacia", unit: "%", color: "#00913F", bg: "#e8f7ee", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "electricity", label: "Electricidade", full: "Acesso à Electricidade", unit: "%", color: "#D97706", bg: "#fef3c7", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "water", label: "Água Potável", full: "Água Potável", unit: "%", color: "#1D6FBF", bg: "#dbeafe", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "health", label: "Saúde", full: "Cobertura de Saúde", unit: "%", color: "#B5225A", bg: "#fce7f3", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "poverty", label: "Pobreza", full: "Taxa de Pobreza", unit: "%", color: "#C23B22", bg: "#fee2e2", inverted: true, scoreMin: 0, scoreMax: 100 },
  { id: "school", label: "Escolaridade", full: "Escolaridade Primária", unit: "%", color: "#5B21B6", bg: "#ede9fe", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "infant_mortality", label: "Mort. Infantil", full: "Mortalidade Infantil", unit: "/1000", color: "#0E7490", bg: "#cffafe", inverted: true, scoreMin: 0, scoreMax: 150 },
  { id: "life_expectancy", label: "Expect. de Vida", full: "Expectativa de Vida", unit: " anos", color: "#065F46", bg: "#d1fae5", inverted: false, scoreMin: 40, scoreMax: 80 },
];

const NATIONAL: Record<string, { year: number; value: number }[]> = {
  literacy: [{ year: 2000, value: 44.4 }, { year: 2005, value: 47.8 }, { year: 2010, value: 50.6 }, { year: 2015, value: 58.8 }, { year: 2018, value: 60.7 }, { year: 2020, value: 63.4 }, { year: 2022, value: 65.1 }],
  electricity: [{ year: 2000, value: 6.2 }, { year: 2005, value: 8.5 }, { year: 2010, value: 13.7 }, { year: 2015, value: 24.1 }, { year: 2018, value: 30.2 }, { year: 2020, value: 33.0 }, { year: 2022, value: 38.4 }],
  water: [{ year: 2000, value: 37.1 }, { year: 2005, value: 42.2 }, { year: 2010, value: 49.7 }, { year: 2015, value: 56.0 }, { year: 2018, value: 60.8 }, { year: 2020, value: 63.2 }, { year: 2022, value: 65.7 }],
  health: [{ year: 2000, value: 42.0 }, { year: 2005, value: 48.0 }, { year: 2010, value: 55.0 }, { year: 2015, value: 62.0 }, { year: 2018, value: 66.0 }, { year: 2020, value: 68.0 }, { year: 2022, value: 71.0 }],
  poverty: [{ year: 2000, value: 70.0 }, { year: 2005, value: 65.0 }, { year: 2010, value: 60.0 }, { year: 2015, value: 55.0 }, { year: 2018, value: 52.0 }, { year: 2020, value: 50.0 }, { year: 2022, value: 46.0 }],
  school: [{ year: 2000, value: 55.0 }, { year: 2005, value: 62.0 }, { year: 2010, value: 70.0 }, { year: 2015, value: 76.0 }, { year: 2018, value: 79.0 }, { year: 2020, value: 82.0 }, { year: 2022, value: 86.0 }],
  infant_mortality: [{ year: 2000, value: 128.4 }, { year: 2005, value: 108.2 }, { year: 2010, value: 86.1 }, { year: 2015, value: 66.8 }, { year: 2018, value: 59.4 }, { year: 2020, value: 55.1 }, { year: 2022, value: 51.7 }],
  life_expectancy: [{ year: 2000, value: 47.2 }, { year: 2005, value: 50.4 }, { year: 2010, value: 54.9 }, { year: 2015, value: 58.1 }, { year: 2018, value: 60.2 }, { year: 2020, value: 61.4 }, { year: 2022, value: 62.9 }],
};

const PROVINCIAL: Record<string, Record<string, number[]>> = {
  maputo_city: { literacy: [81, 82, 84, 85, 86, 86, 87, 87], electricity: [70, 72, 74, 76, 78, 79, 81, 82], water: [80, 81, 82, 83, 84, 85, 85, 86], health: [85, 86, 87, 88, 89, 90, 91, 91], poverty: [22, 21, 20, 19, 18, 17, 16, 16], school: [89, 90, 91, 92, 92, 93, 93, 94], infant_mortality: [38, 36, 34, 32, 30, 28, 26, 24], life_expectancy: [65, 66, 67, 68, 69, 70, 71, 72] },
  maputo: { literacy: [63, 65, 67, 68, 69, 70, 71, 72], electricity: [44, 47, 50, 52, 54, 55, 57, 58], water: [62, 64, 65, 67, 68, 69, 70, 71], health: [66, 68, 69, 71, 72, 73, 74, 74], poverty: [42, 41, 40, 39, 38, 37, 35, 34], school: [75, 76, 78, 79, 80, 81, 82, 83], infant_mortality: [50, 47, 45, 43, 41, 39, 37, 35], life_expectancy: [62, 63, 64, 65, 66, 67, 68, 69] },
  gaza: { literacy: [55, 57, 58, 60, 61, 62, 63, 64], electricity: [18, 20, 22, 23, 24, 26, 27, 28], water: [52, 54, 55, 57, 58, 59, 60, 61], health: [56, 58, 59, 61, 62, 63, 64, 65], poverty: [60, 58, 57, 55, 54, 53, 52, 51], school: [65, 67, 68, 70, 71, 72, 73, 74], infant_mortality: [62, 59, 57, 55, 53, 51, 49, 47], life_expectancy: [58, 59, 60, 61, 62, 63, 63, 64] },
  inhambane: { literacy: [50, 52, 53, 55, 56, 57, 57, 58], electricity: [14, 16, 17, 18, 19, 20, 21, 22], water: [47, 49, 50, 52, 53, 54, 55, 56], health: [51, 53, 54, 56, 57, 58, 59, 60], poverty: [65, 63, 62, 60, 59, 58, 57, 57], school: [59, 61, 62, 64, 65, 66, 67, 68], infant_mortality: [68, 65, 63, 61, 59, 57, 55, 53], life_expectancy: [56, 57, 58, 59, 60, 61, 61, 62] },
  sofala: { literacy: [53, 54, 56, 57, 58, 59, 60, 61], electricity: [25, 27, 28, 30, 31, 32, 33, 35], water: [49, 51, 52, 54, 55, 56, 57, 58], health: [58, 60, 61, 63, 64, 65, 66, 67], poverty: [57, 56, 55, 53, 52, 51, 50, 49], school: [62, 64, 65, 67, 68, 69, 70, 71], infant_mortality: [65, 62, 60, 58, 56, 54, 52, 50], life_expectancy: [57, 58, 59, 60, 61, 62, 62, 63] },
  manica: { literacy: [47, 49, 50, 52, 53, 54, 55, 56], electricity: [15, 17, 18, 19, 20, 21, 23, 24], water: [44, 46, 47, 49, 50, 51, 52, 53], health: [49, 51, 52, 54, 55, 56, 57, 58], poverty: [63, 62, 60, 59, 58, 57, 56, 55], school: [57, 59, 60, 62, 63, 64, 65, 66], infant_mortality: [70, 67, 65, 63, 61, 59, 57, 55], life_expectancy: [55, 56, 57, 58, 59, 60, 61, 62] },
  tete: { literacy: [43, 45, 46, 48, 49, 50, 51, 52], electricity: [12, 13, 14, 16, 17, 18, 19, 21], water: [40, 42, 43, 45, 46, 47, 48, 49], health: [45, 47, 48, 50, 51, 52, 53, 54], poverty: [68, 67, 66, 64, 63, 62, 61, 60], school: [53, 55, 56, 58, 59, 60, 61, 62], infant_mortality: [74, 71, 69, 67, 65, 63, 61, 59], life_expectancy: [54, 55, 56, 57, 58, 59, 59, 60] },
  zambezia: { literacy: [38, 40, 41, 43, 44, 45, 46, 47], electricity: [7, 8, 9, 10, 11, 12, 13, 14], water: [35, 37, 38, 40, 41, 42, 43, 44], health: [40, 42, 43, 45, 46, 47, 48, 49], poverty: [76, 75, 74, 72, 71, 70, 69, 68], school: [46, 48, 49, 51, 52, 53, 54, 55], infant_mortality: [82, 79, 77, 74, 72, 70, 68, 66], life_expectancy: [52, 53, 54, 55, 56, 57, 58, 59] },
  nampula: { literacy: [36, 38, 39, 41, 42, 43, 44, 45], electricity: [6, 7, 8, 9, 10, 11, 12, 13], water: [33, 35, 36, 38, 39, 40, 41, 42], health: [38, 40, 41, 43, 44, 45, 46, 47], poverty: [79, 78, 77, 75, 74, 73, 71, 70], school: [43, 45, 46, 48, 49, 50, 51, 52], infant_mortality: [86, 83, 80, 78, 75, 73, 71, 69], life_expectancy: [51, 52, 53, 54, 55, 56, 57, 58] },
  cabo_delgado: { literacy: [34, 36, 37, 39, 40, 41, 42, 43], electricity: [4, 5, 6, 7, 8, 9, 9, 10], water: [30, 32, 33, 35, 36, 37, 37, 38], health: [35, 37, 38, 40, 41, 42, 43, 44], poverty: [82, 81, 80, 78, 77, 76, 75, 74], school: [40, 42, 43, 45, 46, 47, 48, 49], infant_mortality: [90, 87, 84, 82, 79, 77, 75, 73], life_expectancy: [50, 51, 52, 53, 54, 55, 56, 57] },
  niassa: { literacy: [39, 41, 42, 44, 45, 46, 47, 48], electricity: [6, 7, 8, 9, 10, 10, 11, 12], water: [36, 38, 39, 41, 42, 43, 44, 45], health: [41, 43, 44, 46, 47, 48, 49, 50], poverty: [74, 73, 72, 70, 69, 68, 67, 66], school: [47, 49, 50, 52, 53, 54, 55, 56], infant_mortality: [80, 77, 75, 72, 70, 68, 66, 64], life_expectancy: [53, 54, 55, 56, 57, 58, 58, 59] },
};

const PROV_CURRENT: Record<string, Record<string, number>> = {
  maputo_city: { literacy: 87, electricity: 82, water: 86, health: 91, poverty: 16, school: 94, infant_mortality: 24, life_expectancy: 72 },
  maputo: { literacy: 72, electricity: 58, water: 71, health: 74, poverty: 34, school: 83, infant_mortality: 35, life_expectancy: 69 },
  gaza: { literacy: 64, electricity: 28, water: 61, health: 65, poverty: 51, school: 74, infant_mortality: 47, life_expectancy: 64 },
  inhambane: { literacy: 58, electricity: 22, water: 56, health: 60, poverty: 57, school: 68, infant_mortality: 53, life_expectancy: 62 },
  sofala: { literacy: 61, electricity: 35, water: 58, health: 67, poverty: 49, school: 71, infant_mortality: 50, life_expectancy: 63 },
  manica: { literacy: 56, electricity: 24, water: 53, health: 58, poverty: 55, school: 66, infant_mortality: 55, life_expectancy: 62 },
  tete: { literacy: 52, electricity: 21, water: 49, health: 54, poverty: 60, school: 62, infant_mortality: 59, life_expectancy: 60 },
  zambezia: { literacy: 47, electricity: 14, water: 44, health: 49, poverty: 68, school: 55, infant_mortality: 66, life_expectancy: 59 },
  nampula: { literacy: 45, electricity: 13, water: 42, health: 47, poverty: 70, school: 52, infant_mortality: 69, life_expectancy: 58 },
  cabo_delgado: { literacy: 43, electricity: 10, water: 38, health: 44, poverty: 74, school: 49, infant_mortality: 73, life_expectancy: 57 },
  niassa: { literacy: 48, electricity: 12, water: 45, health: 50, poverty: 66, school: 56, infant_mortality: 64, life_expectancy: 59 },
};

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
const CCOLORS = ["#00913F", "#D97706", "#1D6FBF", "#B5225A"];

// ── HELPERS ───────────────────────────────────────────────────────────────────

function getScore(pid: string, iid: string) {
  const ind = INDICATORS.find(i => i.id === iid)!;
  const v = PROV_CURRENT[pid][iid];
  // Normalise to 0-100 for non-percentage indicators
  const range = ind.scoreMax - ind.scoreMin;
  const norm = range === 100 ? v : Math.round(((v - ind.scoreMin) / range) * 100);
  return ind.inverted ? 100 - norm : norm;
}
function overallScore(pid: string) {
  return Math.round(INDICATORS.reduce((s, i) => s + getScore(pid, i.id), 0) / INDICATORS.length);
}
function rankProv(pid: string, iid: string) {
  return [...PROVINCES].sort((a, b) => getScore(b.id, iid) - getScore(a.id, iid)).findIndex(p => p.id === pid) + 1;
}

// ── LINE CHART ────────────────────────────────────────────────────────────────

function LineChart({ datasets, height = 240 }: {
  datasets: { label: string; color: string; data: { year: number; value: number }[] }[];
  height?: number;
}) {
  const W = 520, pL = 44, pR = 40, pT = 16, pB = 36;
  const cW = W - pL - pR, cH = height - pT - pB;
  const allV = datasets.flatMap(d => d.data.map(p => p.value));
  const allY = datasets.flatMap(d => d.data.map(p => p.year));
  const minV = Math.min(...allV) * 0.88, maxV = Math.max(...allV) * 1.07;
  const minY = Math.min(...allY), maxY = Math.max(...allY);
  const xs = (y: number) => pL + ((y - minY) / (maxY - minY)) * cW;
  const ys = (v: number) => pT + cH - ((v - minV) / (maxV - minV)) * cH;
  const [prog, setProg] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    setProg(0); let s: number | null = null;
    const run = (t: number) => { if (!s) s = t; const p = Math.min((t - s) / 950, 1); setProg(p); if (p < 1) raf.current = requestAnimationFrame(run); };
    raf.current = requestAnimationFrame(run);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [datasets.map(d => d.label).join()]);
  const years = [...new Set(allY)].sort((a, b) => a - b);
  const gridVs = [0, 0.25, 0.5, 0.75, 1].map(t => minV + t * (maxV - minV));
  return (
    <svg viewBox={`0 0 ${W} ${height}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        {datasets.map(d => (
          <linearGradient key={d.color} id={`lg${d.color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={d.color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={d.color} stopOpacity="0.01" />
          </linearGradient>
        ))}
        <clipPath id="cclip"><rect x={pL} y={0} width={cW * prog} height={height} /></clipPath>
      </defs>
      {gridVs.map((v, i) => {
        const y = ys(v);
        return <g key={i}>
          <line x1={pL} y1={y} x2={pL + cW} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          <text x={pL - 8} y={y + 4} fill="#9ca3af" fontSize="10" textAnchor="end" fontFamily="'DM Sans',system-ui">{v.toFixed(v < 10 ? 1 : 0)}</text>
        </g>;
      })}
      {years.map(y => (
        <text key={y} x={xs(y)} y={pT + cH + 22} fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="'DM Sans',system-ui">{y}</text>
      ))}
      {datasets.map(d => {
        const pts = d.data.map(p => `${xs(p.year)},${ys(p.value)}`);
        const area = `M${pts.join(" L")} L${xs(d.data.at(-1)!.year)},${pT + cH} L${xs(d.data[0].year)},${pT + cH} Z`;
        const line = d.data.map((p, i) => `${i === 0 ? "M" : "L"}${xs(p.year)},${ys(p.value)}`).join(" ");
        const last = d.data.at(-1)!;
        return <g key={d.color}>
          <path d={area} fill={`url(#lg${d.color.replace("#", "")})`} clipPath="url(#cclip)" />
          <path d={line} fill="none" stroke={d.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#cclip)" />
          {prog > 0.9 && d.data.map(p => (
            <circle key={p.year} cx={xs(p.year)} cy={ys(p.value)} r="4.5" fill="white" stroke={d.color} strokeWidth="2.5" />
          ))}
          {prog > 0.96 && (
            <text x={xs(last.year) + 10} y={ys(last.value) + 5} fill={d.color} fontSize="12" fontWeight="700" fontFamily="'DM Sans',system-ui">{last.value}%</text>
          )}
        </g>;
      })}
    </svg>
  );
}

// ── RADAR ─────────────────────────────────────────────────────────────────────

function RadarChart({ provinces, size = 200 }: { provinces: string[]; size?: number }) {
  const cx = size / 2, cy = size / 2, r = size * 0.35;
  const n = INDICATORS.length;
  const angles = INDICATORS.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {[0.25, 0.5, 0.75, 1].map(lv => (
        <polygon key={lv} points={angles.map(a => `${cx + Math.cos(a) * r * lv},${cy + Math.sin(a) * r * lv}`).join(" ")}
          fill="none" stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {angles.map((a, i) => <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="#e5e7eb" strokeWidth="1" />)}
      {angles.map((a, i) => {
        const lx = cx + Math.cos(a) * (r + 20), ly = cy + Math.sin(a) * (r + 20);
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#6b7280" fontSize="8.5" fontFamily="'DM Sans',system-ui">{INDICATORS[i].label}</text>;
      })}
      {provinces.map((pid, pi) => {
        const col = CCOLORS[pi % CCOLORS.length];
        const pts = INDICATORS.map((ind, i) => {
          const s = getScore(pid, ind.id) / 100;
          return `${cx + Math.cos(angles[i]) * r * s},${cy + Math.sin(angles[i]) * r * s}`;
        }).join(" ");
        return <g key={pid}>
          <polygon points={pts} fill={col + "30"} stroke={col} strokeWidth="2" />
          {INDICATORS.map((ind, i) => {
            const s = getScore(pid, ind.id) / 100;
            return <circle key={i} cx={cx + Math.cos(angles[i]) * r * s} cy={cy + Math.sin(angles[i]) * r * s} r="3.5" fill={col} />;
          })}
        </g>;
      })}
    </svg>
  );
}

// ── PROVINCE BAR ─────────────────────────────────────────────────────────────

function ProvinceBar({ indicatorId, highlighted }: { indicatorId: string; highlighted: string[] }) {
  const ind = INDICATORS.find(i => i.id === indicatorId)!;
  const sorted = [...PROVINCES]
    .map(p => ({ ...p, value: PROV_CURRENT[p.id][indicatorId], score: getScore(p.id, indicatorId) }))
    .sort((a, b) => b.score - a.score);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {sorted.map((p, i) => {
        const isHl = highlighted.length === 0 || highlighted.includes(p.id);
        const ci = highlighted.indexOf(p.id);
        const col = ci >= 0 ? CCOLORS[ci] : ind.color;
        return (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "12px", opacity: isHl ? 1 : 0.28, transition: "opacity 0.25s" }}>
            <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", width: "18px", textAlign: "right", fontWeight: 600 }}>{i + 1}</span>
            <span style={{
              fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", width: "116px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              color: ci >= 0 ? "#111827" : "#374151", fontWeight: ci >= 0 ? 700 : 400
            }}>{p.name}</span>
            <div style={{ flex: 1, height: "18px", background: "#f3f4f6", borderRadius: "9px", overflow: "hidden" }}>
              <div style={{
                width: `${(p.score / 100) * 100}%`, height: "100%", background: `linear-gradient(90deg,${col},${col}bb)`,
                borderRadius: "9px", transition: "width 0.7s cubic-bezier(.4,0,.2,1)"
              }} />
            </div>
            <span style={{ fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", color: col, fontWeight: 700, minWidth: "40px", textAlign: "right" }}>{p.value}%</span>
          </div>
        );
      })}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeInd, setActiveInd] = useState("literacy");
  const [activeTab, setActiveTab] = useState<"nacional" | "provincial" | "comparar" | "heatmap">("nacional");
  const [selProvs, setSelProvs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const ind = INDICATORS.find(i => i.id === activeInd)!;
  const natData = NATIONAL[activeInd];
  const latest = natData.at(-1)!;
  const prev = natData.at(-2)!;
  const delta = latest.value - prev.value;

  const toggleProv = (id: string) => setSelProvs(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 4 ? [...p, id] : p);

  const compareDS = selProvs.map((pid, i) => ({
    label: PROVINCES.find(p => p.id === pid)!.name,
    color: CCOLORS[i],
    data: YEARS.map((y, yi) => ({ year: y, value: PROVINCIAL[pid][activeInd][yi] })),
  }));

  const tabs = [
    { k: "nacional" as const, label: "Nacional" },
    { k: "provincial" as const, label: "Por Província" },
    { k: "comparar" as const, label: "Comparar" },
    { k: "heatmap" as const, label: "Heatmap" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Georgia','Times New Roman',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:#f3f4f6;}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp 0.4s ease both;}
        .fade1{animation:fadeUp 0.4s 0.05s ease both;}
        .fade2{animation:fadeUp 0.4s 0.1s ease both;}
        .fade3{animation:fadeUp 0.4s 0.15s ease both;}
        .fade4{animation:fadeUp 0.4s 0.2s ease both;}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        .ind-pill:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.12)!important;}
        .tab-btn:hover{color:#111827!important;}
        .prov-pill:hover{transform:translateY(-1px);}
        .card-hover:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.1)!important;}
        button{cursor:pointer;}
        button:focus{outline:none;}
      `}</style>

      {/* ════ HERO HEADER ════ */}
      <header style={{
        background: "linear-gradient(135deg, #003d1f 0%, #006633 40%, #00913F 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Subtle background detail */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.07) 1.5px,transparent 1.5px)",
            backgroundSize: "28px 28px",
          }} />
          <div style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%)",
          }} />
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
          {/* Top nav strip */}
          <div style={{
            height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Flag colour accent — four vertical stripes */}
              <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                <div style={{ width: "4px", height: "22px", borderRadius: "2px", background: "#D21034" }} />
                <div style={{ width: "4px", height: "22px", borderRadius: "2px", background: "#1a1a1a" }} />
                <div style={{ width: "4px", height: "22px", borderRadius: "2px", background: "#FCE100" }} />
                <div style={{ width: "4px", height: "22px", borderRadius: "2px", background: "#009A44" }} />
              </div>
              <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.12em", textTransform: "uppercase" }}>Development Dashboard</span>
            </div>
            <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.06em" }}>
              Banco Mundial · INE · UNDP
            </div>
          </div>

          {/* Hero content */}
          <div style={{ padding: "2.5rem 0 2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                Indicadores Sociais 2000–2022
              </p>
              <h1 style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(2.2rem,5vw,3.8rem)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}>
                Atlas do<br />Desenvolvimento
              </h1>
              <p style={{
                fontSize: "1rem", color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans',system-ui",
                marginTop: "0.75rem", maxWidth: "460px", lineHeight: 1.6, fontWeight: 300,
              }}>
                Explore a evolução de Moçambique em educação, saúde, energia e bem-estar social, com análise por província e ao longo do tempo.
              </p>
            </div>

            {/* Hero KPI pills */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[
                { label: "Províncias", val: "11" },
                { label: "Indicadores", val: "8" },
                { label: "Anos de dados", val: "22" },
                { label: "Pop. total", val: "33.9M" },
              ].map(k => (
                <div key={k.label} style={{
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "14px", padding: "0.875rem 1.25rem", textAlign: "center", minWidth: "90px",
                }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "white", lineHeight: 1, fontFamily: "'Playfair Display',serif" }}>{k.val}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans',system-ui", marginTop: "4px", letterSpacing: "0.05em" }}>{k.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab bar — inside hero */}
          <div style={{ display: "flex", gap: "0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {tabs.map(({ k, label }) => (
              <button key={k} onClick={() => setActiveTab(k)} className="tab-btn" style={{
                all: "unset", padding: "0.875rem 1.75rem",
                fontSize: "0.82rem", fontFamily: "'DM Sans',system-ui", fontWeight: 500,
                color: activeTab === k ? "white" : "rgba(255,255,255,0.5)",
                borderBottom: activeTab === k ? "3px solid #FFD100" : "3px solid transparent",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </header>

      {/* ════ INDICATOR PILLS ════ */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0.875rem 2.5rem", display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "4px", flexShrink: 0 }}>Indicador</span>
          {INDICATORS.map(i => (
            <button key={i.id} onClick={() => setActiveInd(i.id)} className="ind-pill" style={{
              all: "unset", cursor: "pointer",
              padding: "6px 18px", borderRadius: "100px",
              fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600,
              background: activeInd === i.id ? i.color : i.bg,
              color: activeInd === i.id ? "white" : i.color,
              border: `1.5px solid ${activeInd === i.id ? i.color : i.color + "40"}`,
              transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
              boxShadow: activeInd === i.id ? `0 4px 14px ${i.color}45` : "none",
            }}>{i.label}</button>
          ))}
        </div>
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 2.5rem 4rem" }}>

        {/* ═══ NACIONAL ═══ */}
        {activeTab === "nacional" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* KPI cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
              {[
                { label: "Valor Actual", val: `${latest.value}${ind.unit}`, sub: "2022 · mais recente", col: ind.color, bg: ind.bg, cls: "fade" },
                { label: "Variação recente", val: `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}${ind.unit}`, sub: "desde 2020", col: delta >= 0 ? "#00913F" : "#C23B22", bg: delta >= 0 ? "#e8f7ee" : "#fee2e2", cls: "fade1" },
                { label: ind.inverted ? "Redução total" : "Crescimento total", val: `${ind.inverted ? "-" : "+"}${Math.abs(latest.value - natData[0].value).toFixed(1)}${ind.unit}`, sub: "desde 2000", col: "#5B21B6", bg: "#ede9fe", cls: "fade2" },
                { label: "Média Provincial", val: `${(PROVINCES.reduce((s, p) => s + PROV_CURRENT[p.id][activeInd], 0) / PROVINCES.length).toFixed(1)}${ind.unit}`, sub: "todas as 11 províncias", col: "#D97706", bg: "#fef3c7", cls: "fade3" },
              ].map(k => (
                <div key={k.label} className={k.cls + " card-hover"} style={{
                  background: "white", borderRadius: "18px",
                  padding: "1.5rem",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  transition: "all 0.2s ease",
                }}>
                  <div style={{
                    display: "inline-flex", padding: "4px 10px", borderRadius: "100px",
                    background: k.bg, marginBottom: "0.75rem",
                  }}>
                    <span style={{ fontSize: "0.65rem", color: k.col, fontFamily: "'DM Sans',system-ui", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{k.label}</span>
                  </div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 700, color: k.col, lineHeight: 1, letterSpacing: "-0.02em", fontFamily: "'Playfair Display',serif" }}>{k.val}</div>
                  <div style={{ fontSize: "0.72rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", marginTop: "6px" }}>{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Main chart card */}
            <div className="fade2 card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#111827" }}>{ind.full}</h2>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Evolução nacional · 2000–2022 · Fonte: Banco Mundial</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, color: ind.color, lineHeight: 1, letterSpacing: "-0.03em", fontFamily: "'Playfair Display',serif" }}>{latest.value}<span style={{ fontSize: "1.5rem", opacity: 0.5 }}>%</span></div>
                </div>
              </div>
              {mounted && <LineChart datasets={[{ label: "Nacional", color: ind.color, data: natData }]} height={260} />}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #f3f4f6" }}>
                {natData.map(d => (
                  <div key={d.year} style={{
                    padding: "8px 14px", borderRadius: "10px",
                    border: `2px solid ${d.year === latest.year ? ind.color : "#f3f4f6"}`,
                    background: d.year === latest.year ? ind.bg : "#fafafa",
                    transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: d.year === latest.year ? ind.color : "#374151", fontFamily: "'DM Sans',system-ui" }}>{d.value}%</div>
                    <div style={{ fontSize: "0.65rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>{d.year}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking card */}
            <div className="fade3 card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#111827" }}>Ranking Provincial — {ind.full}</h3>
              </div>
              <ProvinceBar indicatorId={activeInd} highlighted={[]} />
            </div>
          </div>
        )}

        {/* ═══ PROVINCIAL ═══ */}
        {activeTab === "provincial" && (
          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Selector */}
            <div style={{ background: "white", borderRadius: "20px", padding: "1.75rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#e8f7ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00913F" strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Seleccionar Províncias</p>
                  <p style={{ fontSize: "0.72rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Escolha até 4 províncias para explorar</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {PROVINCES.map(p => {
                  const isOn = selProvs.includes(p.id);
                  const ci = selProvs.indexOf(p.id);
                  const col = isOn ? CCOLORS[ci] : undefined;
                  return (
                    <button key={p.id} onClick={() => toggleProv(p.id)} className="prov-pill" style={{
                      all: "unset", cursor: "pointer", padding: "7px 16px", borderRadius: "100px",
                      fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", fontWeight: 500,
                      background: isOn ? col + "18" : "#f9fafb",
                      color: isOn ? col : "#4b5563",
                      border: `1.5px solid ${isOn ? col + "60" : "#e5e7eb"}`,
                      transition: "all 0.18s",
                      boxShadow: isOn ? `0 2px 8px ${col}30` : "none",
                    }}>{p.name}</button>
                  );
                })}
              </div>
            </div>

            {selProvs.length === 0 ? (
              <div style={{ background: "white", borderRadius: "20px", padding: "4rem", textAlign: "center", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗺️</div>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#374151", marginBottom: "6px" }}>Nenhuma província seleccionada</p>
                <p style={{ fontSize: "0.8rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Seleccione uma ou mais províncias acima para explorar os dados</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
                  {selProvs.map((pid, ci) => {
                    const p = PROVINCES.find(x => x.id === pid)!;
                    const col = CCOLORS[ci];
                    const val = PROV_CURRENT[pid][activeInd];
                    const sc = getScore(pid, activeInd);
                    const rk = rankProv(pid, activeInd);
                    const trend = PROVINCIAL[pid][activeInd];
                    const tDelta = (trend.at(-1)! - trend[0]).toFixed(1);
                    return (
                      <div key={pid} className="card-hover" style={{
                        background: "white", borderRadius: "20px",
                        border: `2px solid ${col}30`,
                        padding: "1.75rem",
                        boxShadow: `0 4px 20px ${col}15`,
                        transition: "all 0.2s",
                      }}>
                        {/* Province header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: col, boxShadow: `0 0 0 3px ${col}30` }} />
                              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>{p.name}</h3>
                            </div>
                            <p style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", paddingLeft: "18px" }}>
                              {p.pop}M hab. · Rank <strong style={{ color: col }}>#{rk}</strong> de 11
                            </p>
                          </div>
                          <div style={{
                            padding: "4px 12px", borderRadius: "100px",
                            background: col + "15",
                            fontSize: "0.7rem", fontFamily: "'DM Sans',system-ui",
                            color: col, fontWeight: 700,
                          }}>{ind.inverted ? "-" : "+"}{Math.abs(Number(tDelta))}{ind.unit} {ind.inverted ? "↓" : "↑"}</div>
                        </div>

                        {/* Big value */}
                        <div style={{
                          background: `linear-gradient(135deg,${col}12,${col}06)`,
                          borderRadius: "14px", padding: "1.25rem", marginBottom: "1rem",
                          border: `1px solid ${col}20`,
                        }}>
                          <div style={{ fontSize: "3.2rem", fontWeight: 900, color: col, lineHeight: 1, fontFamily: "'Playfair Display',serif", letterSpacing: "-0.02em" }}>
                            {val}<span style={{ fontSize: "1.2rem", opacity: 0.6 }}>{ind.unit}</span>
                          </div>
                          <div style={{ fontSize: "0.78rem", color: col + "aa", fontFamily: "'DM Sans',system-ui", marginTop: "4px" }}>{ind.full}</div>
                          <div style={{ height: "6px", background: col + "20", borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
                            <div style={{ width: `${sc}%`, height: "100%", background: col, borderRadius: "3px" }} />
                          </div>
                        </div>

                        {/* Sparkline */}
                        {mounted && (
                          <div style={{ marginBottom: "1rem" }}>
                            <LineChart datasets={[{ label: p.name, color: col, data: YEARS.map((y, i) => ({ year: y, value: trend[i] })) }]} height={90} />
                          </div>
                        )}

                        {/* All indicators */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", borderTop: `1px solid ${col}18`, paddingTop: "0.875rem" }}>
                          {INDICATORS.map(i => {
                            const v = PROV_CURRENT[pid][i.id];
                            const s = getScore(pid, i.id);
                            return (
                              <div key={i.id} onClick={() => setActiveInd(i.id)} style={{
                                display: "flex", alignItems: "center", gap: "8px", cursor: "pointer",
                                padding: "4px 6px", borderRadius: "7px",
                                background: activeInd === i.id ? i.bg : "transparent",
                                transition: "background 0.15s",
                              }}>
                                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: i.color, flexShrink: 0 }} />
                                <span style={{ fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", color: "#6b7280", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{i.full}</span>
                                <div style={{ width: "48px", height: "5px", background: "#f3f4f6", borderRadius: "3px", overflow: "hidden" }}>
                                  <div style={{ width: `${s}%`, height: "100%", background: i.color, borderRadius: "3px" }} />
                                </div>
                                <span style={{ fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", color: i.color, fontWeight: 700, minWidth: "30px", textAlign: "right" }}>{v}{i.unit}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>Posição no Ranking — {ind.full}</h3>
                  </div>
                  <ProvinceBar indicatorId={activeInd} highlighted={selProvs} />
                </div>
              </>
            )}
          </div>
        )}

        {/* ═══ COMPARAR ═══ */}
        {activeTab === "comparar" && (
          <div className="fade" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Selector */}
            <div style={{ background: "white", borderRadius: "20px", padding: "1.75rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D6FBF" strokeWidth="2.5"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "#111827" }}>Comparar Províncias</p>
                  <p style={{ fontSize: "0.72rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Seleccione até 4 para comparação directa</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {PROVINCES.map(p => {
                  const isOn = selProvs.includes(p.id);
                  const ci = selProvs.indexOf(p.id);
                  const col = isOn ? CCOLORS[ci] : undefined;
                  return (
                    <button key={p.id} onClick={() => toggleProv(p.id)} className="prov-pill" style={{
                      all: "unset", cursor: "pointer", padding: "7px 16px", borderRadius: "100px",
                      fontSize: "0.8rem", fontFamily: "'DM Sans',system-ui", fontWeight: 500,
                      background: isOn ? col + "18" : "#f9fafb",
                      color: isOn ? col : "#4b5563",
                      border: `1.5px solid ${isOn ? col + "60" : "#e5e7eb"}`,
                      transition: "all 0.18s", boxShadow: isOn ? `0 2px 8px ${col}30` : "none",
                    }}>
                      {isOn && <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: col, marginRight: "7px", verticalAlign: "middle" }} />}
                      {p.name}
                    </button>
                  );
                })}
              </div>
              {selProvs.length > 0 && (
                <div style={{ display: "flex", gap: "16px", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6", flexWrap: "wrap" }}>
                  {selProvs.map((pid, ci) => (
                    <div key={pid} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: CCOLORS[ci] }} />
                      <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", color: "#374151", fontWeight: 500 }}>{PROVINCES.find(p => p.id === pid)!.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selProvs.length < 2 ? (
              <div style={{ background: "white", borderRadius: "20px", padding: "4rem", textAlign: "center", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚖️</div>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#374151", marginBottom: "6px" }}>Seleccione pelo menos 2 províncias</p>
                <p style={{ fontSize: "0.8rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Poderá então comparar a evolução e os indicadores lado a lado</p>
              </div>
            ) : (
              <>
                {/* Temporal chart */}
                <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: ind.color }} />
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#111827" }}>{ind.full} · 2015–2022</h3>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", marginBottom: "1.75rem", paddingLeft: "22px" }}>Evolução temporal comparada</p>
                  {mounted && <LineChart datasets={compareDS} height={280} />}
                </div>

                {/* Indicator grid */}
                <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>Todos os Indicadores</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "0.875rem" }}>
                    {INDICATORS.map(i => {
                      const vals = selProvs.map(pid => ({ pid, val: PROV_CURRENT[pid][i.id], score: getScore(pid, i.id) }));
                      const maxS = Math.max(...vals.map(v => v.score));
                      return (
                        <div key={i.id} onClick={() => setActiveInd(i.id)} style={{
                          padding: "1.25rem", borderRadius: "14px", cursor: "pointer",
                          background: activeInd === i.id ? i.bg : "#fafafa",
                          border: `1.5px solid ${activeInd === i.id ? i.color + "40" : "#f3f4f6"}`,
                          transition: "all 0.15s",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: i.color }} />
                            <span style={{ fontSize: "0.82rem", fontFamily: "'DM Sans',system-ui", fontWeight: 600, color: "#374151" }}>{i.full}</span>
                            {activeInd === i.id && <span style={{ fontSize: "0.6rem", color: i.color, fontFamily: "'DM Sans',system-ui", marginLeft: "auto", background: i.color + "20", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>ACTIVO</span>}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {vals.map((v, ci) => {
                              const col = CCOLORS[ci];
                              const isW = v.score === maxS;
                              return (
                                <div key={v.pid} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <span style={{ fontSize: "0.7rem", fontFamily: "'DM Sans',system-ui", color: col, fontWeight: 700, width: "28px" }}>{PROVINCES.find(p => p.id === v.pid)!.short}</span>
                                  <div style={{ flex: 1, height: "12px", background: "#f3f4f6", borderRadius: "6px", overflow: "hidden" }}>
                                    <div style={{ width: `${v.score}%`, height: "100%", background: `linear-gradient(90deg,${col},${col}cc)`, borderRadius: "6px", transition: "width 0.5s" }} />
                                  </div>
                                  <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", color: isW ? col : "#9ca3af", fontWeight: isW ? 700 : 400, minWidth: "44px", textAlign: "right" }}>
                                    {v.val}{i.unit} {isW ? "▲" : ""}
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

                {/* Radar + overall */}
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem" }}>
                  <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", transition: "all 0.2s" }}>
                    <p style={{ fontSize: "0.68rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui", letterSpacing: "0.1em", textTransform: "uppercase" }}>Perfil Global</p>
                    <RadarChart provinces={selProvs} size={200} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
                      {selProvs.map((pid, ci) => (
                        <div key={pid} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: CCOLORS[ci] }} />
                          <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',system-ui", color: "#374151" }}>{PROVINCES.find(p => p.id === pid)!.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>Score de Desenvolvimento Global</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {selProvs.map((pid, ci) => {
                        const sc = overallScore(pid);
                        const col = CCOLORS[ci];
                        const p = PROVINCES.find(x => x.id === pid)!;
                        return (
                          <div key={pid}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                              <span style={{ fontSize: "0.85rem", fontFamily: "'DM Sans',system-ui", color: "#374151", fontWeight: 500 }}>{p.name}</span>
                              <span style={{ fontSize: "1.5rem", fontFamily: "'Playfair Display',serif", fontWeight: 700, color: col }}>{sc}<span style={{ fontSize: "0.75rem", opacity: 0.6 }}>/100</span></span>
                            </div>
                            <div style={{ height: "14px", background: "#f3f4f6", borderRadius: "7px", overflow: "hidden" }}>
                              <div style={{ width: `${sc}%`, height: "100%", background: `linear-gradient(90deg,${col},${col}aa)`, borderRadius: "7px", transition: "width 0.7s" }} />
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
          <div className="fade">
            <div className="card-hover" style={{ background: "white", borderRadius: "20px", padding: "2rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.2s" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Heatmap de Desenvolvimento</h2>
                <p style={{ fontSize: "0.78rem", color: "#9ca3af", fontFamily: "'DM Sans',system-ui" }}>Todos os indicadores por província · ordenado por score global · clique numa linha para mais detalhes</p>
              </div>

              {/* Indicator legend */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                {INDICATORS.map(i => (
                  <div key={i.id} onClick={() => setActiveInd(i.id)} style={{
                    display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
                    padding: "4px 10px", borderRadius: "100px", background: activeInd === i.id ? i.bg : "transparent",
                    border: `1px solid ${activeInd === i.id ? i.color + "40" : "transparent"}`, transition: "all 0.15s"
                  }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: i.color }} />
                    <span style={{ fontSize: "0.72rem", fontFamily: "'DM Sans',system-ui", color: activeInd === i.id ? "#111827" : "#6b7280", fontWeight: activeInd === i.id ? 600 : 400 }}>{i.full}</span>
                  </div>
                ))}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "separate", borderSpacing: "4px", fontFamily: "'DM Sans',system-ui", fontSize: "0.75rem", width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", color: "#9ca3af", fontWeight: 500, paddingBottom: "10px", paddingRight: "16px", whiteSpace: "nowrap", fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Província</th>
                      {INDICATORS.map(i => (
                        <th key={i.id} onClick={() => setActiveInd(i.id)} style={{
                          textAlign: "center", fontWeight: 600, paddingBottom: "10px", minWidth: "80px", cursor: "pointer",
                          color: activeInd === i.id ? i.color : "#6b7280",
                          fontSize: "0.72rem",
                        }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: i.color, opacity: activeInd === i.id ? 1 : 0.5 }} />
                            {i.label}
                          </div>
                        </th>
                      ))}
                      <th style={{ textAlign: "center", color: "#111827", fontWeight: 700, paddingBottom: "10px", minWidth: "60px", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...PROVINCES].sort((a, b) => overallScore(b.id) - overallScore(a.id)).map((p, ri) => (
                      <tr key={p.id} onClick={() => { setSelProvs([p.id]); setActiveTab("provincial"); }}
                        style={{ cursor: "pointer" }}
                      >
                        <td style={{ paddingRight: "16px", paddingTop: "3px", paddingBottom: "3px", whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "0.65rem", color: "#d1d5db", fontWeight: 600, width: "18px", textAlign: "right" }}>{ri + 1}</span>
                            <span style={{ color: "#111827", fontWeight: 600, fontSize: "0.8rem" }}>{p.name}</span>
                          </div>
                        </td>
                        {INDICATORS.map(i => {
                          const v = PROV_CURRENT[p.id][i.id];
                          const s = getScore(p.id, i.id);
                          const opacity = 0.12 + 0.72 * (s / 100);
                          return (
                            <td key={i.id} style={{ textAlign: "center", paddingTop: "3px", paddingBottom: "3px" }}>
                              <div style={{
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                width: "68px", height: "28px", borderRadius: "8px",
                                background: i.color, opacity,
                                fontSize: "0.72rem", fontWeight: 700,
                              }}>
                                <span style={{ opacity: Math.min(1, (1 / opacity) * 0.85), color: "#1a1a1a" }}>{v}{i.unit}</span>
                              </div>
                            </td>
                          );
                        })}
                        <td style={{ textAlign: "center", paddingTop: "3px", paddingBottom: "3px" }}>
                          <div style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: "48px", height: "28px", borderRadius: "8px",
                            background: "#111827", color: "white", fontSize: "0.78rem", fontWeight: 700,
                          }}>{overallScore(p.id)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize: "0.7rem", color: "#d1d5db", marginTop: "1.25rem", fontFamily: "'DM Sans',system-ui" }}>
                Intensidade da cor reflecte o nível de desempenho. Clique numa linha para explorar o perfil completo da província.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#111827", padding: "2rem 2.5rem", marginTop: "0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 700, color: "white", marginBottom: "4px" }}>Mozambique Development Dashboard</p>
            <p style={{ fontSize: "0.7rem", color: "#6b7280", fontFamily: "'DM Sans',system-ui", marginBottom: "6px" }}>Dados estimados para fins ilustrativos · Fontes: Banco Mundial, INE, UNDP</p>
            <p style={{ fontSize: "0.7rem", color: "#4b5563", fontFamily: "'DM Sans',system-ui" }}>
              <span>© {new Date().getFullYear()} Gédia Jangamo. Reservados Todos os direitos</span>
            </p>
          </div>
          {/* Flag colour detail */}
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <div style={{ width: "5px", height: "32px", borderRadius: "3px", background: "#D21034" }} />
            <div style={{ width: "5px", height: "32px", borderRadius: "3px", background: "#1a1a1a" }} />
            <div style={{ width: "5px", height: "32px", borderRadius: "3px", background: "#FCE100" }} />
            <div style={{ width: "5px", height: "32px", borderRadius: "3px", background: "#009A44" }} />
          </div>
        </div>
      </footer>
    </div>
  );
}