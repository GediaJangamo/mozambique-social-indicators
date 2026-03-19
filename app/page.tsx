"use client";

import { useState, useEffect } from "react";
import { cn } from "./lib/utils";
import {
  INDICATORS, PROVINCES, PROV_CURRENT, COMPARE_COLORS,
  NATIONAL, PROVINCIAL, getScore, YEARS, overallScore, rankProv
} from "./lib/data";
import {
  BarChart3, Map, Table2, MapPin, Scale,
  Grid3X3, Download, FileJson, TrendingUp, Users, Activity
} from "lucide-react";
import { StatCard } from "./components/dashboard/stat-card";
import { LineChart } from "./components/charts/line-chart";
import { ProvinceBar } from "./components/charts/province-bar";
import { MozambiqueMap } from "./components/map/mozambique-map";
import { DataTable } from "./components/dashboard/data-table";
import { Heatmap } from "./components/dashboard/heatmap";
import { RadarChart } from "./components/charts/radar-chart";

type TabKey = "nacional" | "mapa" | "provincial" | "comparar" | "heatmap" | "tabela";

const TABS: { k: TabKey; label: string; icon: React.ReactNode }[] = [
  { k: "nacional", label: "Nacional", icon: <BarChart3 className="w-3.5 h-3.5" /> },
  { k: "mapa", label: "Mapa", icon: <Map className="w-3.5 h-3.5" /> },
  { k: "tabela", label: "Tabela", icon: <Table2 className="w-3.5 h-3.5" /> },
  { k: "provincial", label: "Por Província", icon: <MapPin className="w-3.5 h-3.5" /> },
  { k: "comparar", label: "Comparar", icon: <Scale className="w-3.5 h-3.5" /> },
  { k: "heatmap", label: "Heatmap", icon: <Grid3X3 className="w-3.5 h-3.5" /> },
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
  a.href = url; a.download = "mozambique_all_indicators_2022.csv"; a.click();
}

function exportJSON() {
  const data = PROVINCES.map(p => ({
    id: p.id, name: p.name, population_millions: p.pop,
    overall_score: overallScore(p.id),
    indicators: Object.fromEntries(INDICATORS.map(i => [i.id, {
      value: PROV_CURRENT[p.id][i.id], unit: i.unit.trim(),
      score: getScore(p.id, i.id), rank: rankProv(p.id, i.id),
    }])),
  }));
  const blob = new Blob([JSON.stringify({ source: "World Bank / INE / UNDP", year: 2022, provinces: data }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "mozambique_development_2022.json"; a.click();
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

  const toggleProv = (id: string) =>
    setSelProvs(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 4 ? [...p, id] : p);

  const compareDS = selProvs.map((pid, i) => ({
    label: PROVINCES.find(p => p.id === pid)!.name,
    color: COMPARE_COLORS[i],
    data: YEARS.map((y, yi) => ({ year: y, value: PROVINCIAL[pid][activeInd][yi] })),
  }));

  // ── shared card classes ────────────────────────────────────────────────────
  const card = "bg-[#16161f] border border-white/[0.10] rounded-2xl";

  return (
    <div className="min-h-screen bg-[#11111a] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #11111a; }
        ::-webkit-scrollbar-thumb { background: #ffffff25; border-radius: 2px; }
        .serif { font-family: 'Instrument Serif', Georgia, serif; }
        .mono  { font-family: 'JetBrains Mono', monospace; }
        @keyframes up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .anim { animation: up .35s ease both; }
        .anim-1 { animation: up .35s .06s ease both; }
        .anim-2 { animation: up .35s .12s ease both; }
        .anim-3 { animation: up .35s .18s ease both; }
      `}</style>

      {/* ── LAYOUT WRAPPER: sidebar + content ─────────────────────────────── */}
      <div className="flex min-h-screen">

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside
          className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen border-r border-white/[0.10]"
          style={{ background: "#13131e" }}
        >
          {/* Brand */}
          <div className="px-5 pt-7 pb-6 border-b border-white/[0.10]">
            <div className="flex gap-[3px] mb-3">
              {["#D21034", "#333", "#FCE100", "#009A44"].map(c => (
                <div key={c} className="w-[5px] h-7 rounded-[2px]" style={{ background: c }} />
              ))}
            </div>
            <p className="serif text-[17px] font-normal leading-snug text-white">
              Atlas do<br />Desenvolvimento
            </p>
            <p className="mono text-[10px] text-white/40 mt-1.5 tracking-widest">MOÇAMBIQUE · 2000–2022</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <p className="mono text-[10px] text-white/35 tracking-widest px-2 mb-2">VISTAS</p>
            {TABS.map(({ k, label, icon }) => (
              <button
                key={k}
                onClick={() => setActiveTab(k)}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all text-left",
                  activeTab === k
                    ? "bg-white/[0.10] text-white"
                    : "text-white/45 hover:text-white/75 hover:bg-white/[0.06]"
                )}
                style={activeTab === k ? { borderLeft: `2px solid ${ind.color}`, paddingLeft: 10 } : { borderLeft: "2px solid transparent" }}
              >
                <span style={{ color: activeTab === k ? ind.color : undefined }}>{icon}</span>
                {label}
              </button>
            ))}

            <p className="mono text-[10px] text-white/35 tracking-widest px-2 mt-5 mb-2">INDICADORES</p>
            {INDICATORS.map(i => (
              <button
                key={i.id}
                onClick={() => setActiveInd(i.id)}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] mb-0.5 transition-all text-left",
                  activeInd === i.id
                    ? "text-white font-semibold"
                    : "text-white/45 hover:text-white/70 hover:bg-white/[0.04]"
                )}
                style={{ background: activeInd === i.id ? `${i.color}22` : undefined }}
              >
                <span
                  className="w-2 h-2 rounded-[2px] shrink-0"
                  style={{ background: i.color, opacity: activeInd === i.id ? 1 : 0.5 }}
                />
                {i.label}
              </button>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="px-5 py-4 border-t border-white/[0.10]">
            <div className="flex gap-2">
              <button
                onClick={exportAllCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white border border-white/[0.12] hover:border-white/30 transition-all"
              >
                <Download className="w-3 h-3" /> CSV
              </button>
              <button
                onClick={exportJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/50 hover:text-white border border-white/[0.12] hover:border-white/30 transition-all"
              >
                <FileJson className="w-3 h-3" /> JSON
              </button>
            </div>
            <p className="mono text-[10px] text-white/30 mt-3 leading-relaxed">
              Banco Mundial · INE · UNDP
            </p>
          </div>
        </aside>

        {/* ── RIGHT SIDE ───────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
          <header
            className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-8 border-b border-white/[0.10]"
            style={{ height: 52, background: "#11111a" }}
          >
            {/* Mobile brand */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex gap-[3px]">
                {["#D21034", "#333", "#FCE100", "#009A44"].map(c => (
                  <div key={c} className="w-1 h-5 rounded-sm" style={{ background: c }} />
                ))}
              </div>
              <span className="serif text-sm">Atlas do Desenvolvimento</span>
            </div>

            {/* Active indicator pill */}
            <div className="hidden lg:flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-[2px]"
                style={{ background: ind.color, boxShadow: `0 0 8px ${ind.color}` }}
              />
              <span className="mono text-xs text-white/55">{ind.full}</span>
            </div>

            {/* Mobile tab pills */}
            <div className="flex items-center gap-2 lg:hidden overflow-x-auto">
              {TABS.map(({ k, label }) => (
                <button
                  key={k}
                  onClick={() => setActiveTab(k)}
                  className={cn(
                    "mono text-[11px] px-3 py-1 rounded-full whitespace-nowrap transition-all",
                    activeTab === k ? "text-black font-bold" : "text-white/45 hover:text-white/70"
                  )}
                  style={{ background: activeTab === k ? ind.color : "transparent" }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <span className="mono text-[11px] text-white/35 tracking-widest">DADOS · 2022</span>
            </div>
          </header>

          {/* ── PAGE TITLE STRIP ────────────────────────────────────────────── */}
          <div
            className="px-6 lg:px-10 py-8 border-b border-white/[0.08]"
            style={{ background: "linear-gradient(180deg, #1a1a28 0%, #11111a 100%)" }}
          >
            <p className="mono text-[11px] text-white/40 tracking-widest mb-2">
              {TABS.find(t => t.k === activeTab)?.label.toUpperCase()} · {ind.full.toUpperCase()}
            </p>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h1 className="serif text-4xl lg:text-5xl font-normal leading-none">
                <span style={{ color: ind.color }}>{latest.value}</span>
                <span className="text-white/30 text-2xl ml-1">{ind.unit}</span>
                <span className="block text-white/60 text-xl lg:text-2xl mt-1.5 font-normal">
                  nacional · 2022
                </span>
              </h1>
              <div className="flex gap-3">
                {[
                  { label: "Províncias", val: "11", icon: <MapPin className="w-3.5 h-3.5" /> },
                  { label: "Indicadores", val: "8", icon: <Activity className="w-3.5 h-3.5" /> },
                  { label: "Pop.", val: "33.9M", icon: <Users className="w-3.5 h-3.5" /> },
                ].map(s => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-white/[0.10]"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-white/40 mb-1">{s.icon}</span>
                    <span className="serif text-lg leading-none text-white/90">{s.val}</span>
                    <span className="mono text-[10px] text-white/35 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
          <main className="flex-1 px-6 lg:px-10 py-8 space-y-5">

            {/* ═══ NACIONAL ═══ */}
            {activeTab === "nacional" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 anim">
                  <StatCard
                    label="Valor Actual"
                    value={`${latest.value}${ind.unit}`}
                    subtext="2022 · mais recente"
                    color={ind.color}
                  />
                  <StatCard
                    label="Variação recente"
                    value={`${delta >= 0 ? "+" : ""}${delta.toFixed(1)}${ind.unit}`}
                    subtext="desde 2020"
                    color={delta >= 0 ? "#22c55e" : "#ef4444"}
                  />
                  <StatCard
                    label={ind.inverted ? "Redução total" : "Crescimento total"}
                    value={`${ind.inverted ? "−" : "+"}${Math.abs(latest.value - natData[0].value).toFixed(1)}${ind.unit}`}
                    subtext="desde 2000"
                    color="#a78bfa"
                  />
                  <StatCard
                    label="Média Provincial"
                    value={`${(PROVINCES.reduce((s, p) => s + PROV_CURRENT[p.id][activeInd], 0) / PROVINCES.length).toFixed(1)}${ind.unit}`}
                    subtext="11 províncias"
                    color="#f59e0b"
                  />
                </div>

                <div className={cn(card, "p-6 anim-1")}>
                  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: ind.color }} />
                        <h2 className="serif text-2xl">{ind.full}</h2>
                      </div>
                      <p className="mono text-xs text-white/50 pl-5">Evolução nacional · 2000–2022 · Banco Mundial</p>
                    </div>
                    <div className="serif text-5xl leading-none" style={{ color: ind.color }}>
                      {latest.value}<span className="text-2xl text-white/35">{ind.unit}</span>
                    </div>
                  </div>

                  {mounted && (
                    <LineChart datasets={[{ label: "Nacional", color: ind.color, data: natData }]} height={260} />
                  )}

                  <div className="flex gap-2 flex-wrap mt-5 pt-4 border-t border-white/[0.08]">
                    {natData.map(d => (
                      <div
                        key={d.year}
                        className="px-3 py-2 rounded-lg border transition-all"
                        style={{
                          borderColor: d.year === latest.year ? `${ind.color}70` : "rgba(255,255,255,0.09)",
                          background: d.year === latest.year ? `${ind.color}18` : "rgba(255,255,255,0.04)",
                        }}
                      >
                        <div className="mono text-xs font-semibold" style={{ color: d.year === latest.year ? ind.color : "rgba(255,255,255,0.6)" }}>
                          {d.value}{ind.unit}
                        </div>
                        <div className="mono text-[10px] text-white/35">{d.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={cn(card, "p-6 anim-2")}>
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: ind.color }} />
                    <h3 className="serif text-xl">Ranking Provincial — {ind.label}</h3>
                  </div>
                  <ProvinceBar indicatorId={activeInd} />
                </div>
              </div>
            )}

            {/* ═══ MAPA ═══ */}
            {activeTab === "mapa" && (
              <div className={cn(card, "p-6 anim")}>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: ind.color }} />
                  <h2 className="serif text-2xl">{ind.full} por Província</h2>
                </div>
                <MozambiqueMap
                  indicatorId={activeInd}
                  onProvinceClick={setMapSelectedProv}
                  selectedProvince={mapSelectedProv}
                />
              </div>
            )}

            {/* ═══ TABELA ═══ */}
            {activeTab === "tabela" && (
              <div className="anim">
                <DataTable indicatorId={activeInd} />
              </div>
            )}

            {/* ═══ PROVINCIAL ═══ */}
            {activeTab === "provincial" && (
              <div className="space-y-5">
                {/* Selector */}
                <div className={cn(card, "p-5 anim")}>
                  <p className="mono text-xs text-white/45 tracking-widest mb-3">
                    SELECCIONAR PROVÍNCIAS · MÁX. 4
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROVINCES.map(p => {
                      const isOn = selProvs.includes(p.id);
                      const ci = selProvs.indexOf(p.id);
                      const col = isOn ? COMPARE_COLORS[ci] : undefined;
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggleProv(p.id)}
                          className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all"
                          style={{
                            background: isOn ? `${col}22` : "rgba(255,255,255,0.07)",
                            color: isOn ? col : "rgba(255,255,255,0.60)",
                            border: `1px solid ${isOn ? col + "55" : "rgba(255,255,255,0.12)"}`,
                            boxShadow: isOn ? `0 0 16px ${col}30` : "none",
                          }}
                        >
                          {isOn && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: col }} />}
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selProvs.length === 0 ? (
                  <div className={cn(card, "p-16 text-center anim-1")}>
                    <MapPin className="w-10 h-10 mx-auto mb-3 text-white/20" />
                    <p className="serif text-xl text-white/50">Nenhuma província seleccionada</p>
                  </div>
                ) : (
                  <>
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
                            className="rounded-2xl p-5 border-2 transition-all anim"
                            style={{
                              background: "#16161f",
                              borderColor: `${col}40`,
                              boxShadow: `0 0 40px ${col}12`,
                            }}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: col, boxShadow: `0 0 6px ${col}` }} />
                                  <h3 className="serif text-xl">{p.name}</h3>
                                </div>
                                <p className="mono text-xs text-white/45 pl-4">
                                  {p.pop}M hab · Rank <strong style={{ color: col }}>#{rk}</strong>
                                </p>
                              </div>
                              <span
                                className="mono text-xs font-bold px-2.5 py-1 rounded-full"
                                style={{ background: `${col}25`, color: col }}
                              >
                                {ind.inverted ? "−" : "+"}{Math.abs(Number(tDelta))}{ind.unit}
                              </span>
                            </div>

                            <div
                              className="rounded-xl p-4 mb-4"
                              style={{ background: `linear-gradient(135deg,${col}20,${col}08)`, border: `1px solid ${col}30` }}
                            >
                              <div className="serif text-4xl" style={{ color: col }}>
                                {val}<span className="text-lg opacity-60">{ind.unit}</span>
                              </div>
                              <div className="mono text-xs mt-1.5" style={{ color: `${col}cc` }}>{ind.full}</div>
                              <div className="h-1.5 rounded-full mt-3 overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
                                <div className="h-full rounded-full" style={{ width: `${sc}%`, background: col }} />
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

                            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.08]">
                              {INDICATORS.slice(0, 4).map(i => (
                                <div
                                  key={i.id}
                                  onClick={() => setActiveInd(i.id)}
                                  className="p-2.5 rounded-lg cursor-pointer transition-all hover:opacity-90"
                                  style={{
                                    background: activeInd === i.id ? `${i.color}22` : "rgba(255,255,255,0.05)",
                                    border: `1px solid ${activeInd === i.id ? i.color + "50" : "rgba(255,255,255,0.08)"}`,
                                  }}
                                >
                                  <div className="mono text-[10px] mb-0.5 font-medium" style={{ color: i.color }}>{i.label}</div>
                                  <div className="mono text-sm font-bold" style={{ color: i.color }}>
                                    {PROV_CURRENT[pid][i.id]}<span className="text-[10px] opacity-60">{i.unit}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className={cn(card, "p-6 anim-1")}>
                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: ind.color }} />
                        <h3 className="serif text-lg">Ranking — {ind.full}</h3>
                      </div>
                      <ProvinceBar indicatorId={activeInd} highlighted={selProvs} />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ═══ COMPARAR ═══ */}
            {activeTab === "comparar" && (
              <div className="space-y-5">
                <div className={cn(card, "p-5 anim")}>
                  <p className="mono text-xs text-white/45 tracking-widest mb-3">COMPARAR PROVÍNCIAS · MÁX. 4</p>
                  <div className="flex flex-wrap gap-2">
                    {PROVINCES.map(p => {
                      const isOn = selProvs.includes(p.id);
                      const ci = selProvs.indexOf(p.id);
                      const col = isOn ? COMPARE_COLORS[ci] : undefined;
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggleProv(p.id)}
                          className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all"
                          style={{
                            background: isOn ? `${col}22` : "rgba(255,255,255,0.07)",
                            color: isOn ? col : "rgba(255,255,255,0.60)",
                            border: `1px solid ${isOn ? col + "55" : "rgba(255,255,255,0.12)"}`,
                          }}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                  {selProvs.length > 0 && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.08] flex-wrap">
                      {selProvs.map((pid, ci) => (
                        <div key={pid} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: COMPARE_COLORS[ci] }} />
                          <span className="text-sm text-white/70">{PROVINCES.find(p => p.id === pid)!.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selProvs.length < 2 ? (
                  <div className={cn(card, "p-16 text-center anim-1")}>
                    <Scale className="w-10 h-10 mx-auto mb-3 text-white/20" />
                    <p className="serif text-xl text-white/50">Seleccione pelo menos 2 províncias</p>
                  </div>
                ) : (
                  <>
                    <div className={cn(card, "p-6 anim-1")}>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: ind.color }} />
                        <h3 className="serif text-2xl">{ind.full} · 2015–2022</h3>
                      </div>
                      <p className="mono text-xs text-white/40 mb-5 pl-5">Evolução temporal comparada</p>
                      {mounted && <LineChart datasets={compareDS} height={300} />}
                    </div>

                    <div className={cn(card, "p-6 anim-2")}>
                      <h3 className="serif text-2xl mb-5">Todos os Indicadores</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {INDICATORS.map(i => {
                          const vals = selProvs.map(pid => ({ pid, val: PROV_CURRENT[pid][i.id], score: getScore(pid, i.id) }));
                          const maxS = Math.max(...vals.map(v => v.score));
                          return (
                            <div
                              key={i.id}
                              onClick={() => setActiveInd(i.id)}
                              className="p-4 rounded-xl cursor-pointer transition-all border"
                              style={{
                                background: activeInd === i.id ? `${i.color}15` : "rgba(255,255,255,0.04)",
                                borderColor: activeInd === i.id ? `${i.color}60` : "rgba(255,255,255,0.09)",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full" style={{ background: i.color }} />
                                <span className="text-sm font-semibold text-white/80">{i.full}</span>
                                {activeInd === i.id && (
                                  <span className="mono text-[10px] px-1.5 py-0.5 rounded-full ml-auto font-bold" style={{ background: `${i.color}30`, color: i.color }}>ACTIVO</span>
                                )}
                              </div>
                              <div className="space-y-2">
                                {vals.map((v, ci) => {
                                  const col = COMPARE_COLORS[ci];
                                  const isW = v.score === maxS;
                                  return (
                                    <div key={v.pid} className="flex items-center gap-2">
                                      <span className="mono text-xs font-bold w-7" style={{ color: col }}>
                                        {PROVINCES.find(p => p.id === v.pid)!.short}
                                      </span>
                                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.09)" }}>
                                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${v.score}%`, background: col }} />
                                      </div>
                                      <span className="mono text-xs min-w-10 text-right" style={{ color: isW ? col : "rgba(255,255,255,0.40)", fontWeight: isW ? 700 : 400 }}>
                                        {v.val}{i.unit}
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                      <div className={cn(card, "p-6 flex flex-col items-center gap-4 anim-3")}>
                        <p className="mono text-xs text-white/45 tracking-widest">PERFIL GLOBAL</p>
                        <RadarChart provinces={selProvs} size={220} />
                        <div className="space-y-2 w-full">
                          {selProvs.map((pid, ci) => (
                            <div key={pid} className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: COMPARE_COLORS[ci] }} />
                              <span className="text-sm text-white/70">{PROVINCES.find(p => p.id === pid)!.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={cn(card, "p-6 lg:col-span-2 anim-3")}>
                        <p className="serif text-xl mb-5">Score de Desenvolvimento Global</p>
                        <div className="space-y-5">
                          {selProvs.map((pid, ci) => {
                            const sc = overallScore(pid);
                            const col = COMPARE_COLORS[ci];
                            const p = PROVINCES.find(x => x.id === pid)!;
                            return (
                              <div key={pid}>
                                <div className="flex justify-between items-baseline mb-2">
                                  <span className="text-base text-white/75">{p.name}</span>
                                  <span className="serif text-2xl" style={{ color: col }}>
                                    {sc}<span className="text-sm opacity-50">/100</span>
                                  </span>
                                </div>
                                <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                                  <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${sc}%`, background: col, boxShadow: `0 0 10px ${col}50` }}
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
              <div className="anim">
                <Heatmap
                  activeIndicator={activeInd}
                  onIndicatorChange={setActiveInd}
                  onProvinceSelect={(id) => { setSelProvs([id]); setActiveTab("provincial"); }}
                />
              </div>
            )}

          </main>

          {/* ── FOOTER ──────────────────────────────────────────────────────── */}
          <footer className="px-6 lg:px-10 py-5 border-t border-white/[0.10] flex items-center justify-between gap-4 flex-wrap" style={{ background: "#13131e" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-[3px]">
                {["#D21034", "#333", "#FCE100", "#009A44"].map(c => (
                  <div key={c} className="w-1 h-3.5 rounded-sm" style={{ background: c }} />
                ))}
              </div>
              <span className="mono text-xs text-white/40">Atlas do Desenvolvimento · Moçambique</span>
            </div>
            <span className="mono text-xs text-white/30">Banco Mundial · INE · UNDP · 2000–2022</span>
          </footer>

        </div>
      </div>
    </div>
  );
}