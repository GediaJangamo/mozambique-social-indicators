"use client";

import { useState, useEffect } from "react";
import { cn } from "./lib/utils";
import {
  INDICATORS, PROVINCES, PROV_CURRENT, COMPARE_COLORS,
  NATIONAL, PROVINCIAL, getScore, YEARS, overallScore, rankProv
} from "./lib/data";
import {
  BarChart3, Map, Table2, MapPin, Scale,
  Grid3X3, Download, FileJson, Users, Activity
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

  const card = "bg-[#14141e] border border-white/[0.18] rounded-2xl";

  return (
    <div
      className="min-h-screen bg-[#0d0d16] text-white"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" }}
    >
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0d0d16; }
        ::-webkit-scrollbar-thumb { background: #ffffff35; border-radius: 2px; }
        @keyframes up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim   { animation: up .35s ease both; }
        .anim-1 { animation: up .35s .06s ease both; }
        .anim-2 { animation: up .35s .12s ease both; }
        .anim-3 { animation: up .35s .18s ease both; }
      `}</style>

      <div className="flex min-h-screen">

        {/* this is the sidebar */}
        <aside
          className="hidden lg:flex flex-col w-64 shrink-0 sticky top-0 h-screen border-r border-white/[0.15]"
          style={{ background: "#0b0b14" }}
        >
          {/* Brand */}
          <div className="px-5 pt-7 pb-6 border-b border-white/[0.15]">
            <div className="flex gap-[3px] mb-4">
              {["#D21034", "#555", "#FCE100", "#009A44"].map(c => (
                <div key={c} className="w-[5px] h-8 rounded-[2px]" style={{ background: c }} />
              ))}
            </div>
            <p className="text-[17px] font-bold leading-snug text-white">
              Atlas do<br />Desenvolvimento
            </p>
            <p className="text-[13px] text-white/60 mt-2 font-semibold tracking-wide">
              MOÇAMBIQUE · 2000–2022
            </p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <p className="text-[12px] text-white/55 tracking-widest px-2 mb-2 font-bold uppercase">Vistas</p>
            {TABS.map(({ k, label, icon }) => (
              <button
                key={k}
                onClick={() => setActiveTab(k)}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[14px] font-semibold mb-0.5 transition-all text-left",
                  activeTab === k
                    ? "bg-white/[0.12] text-white"
                    : "text-white/60 hover:text-white/85 hover:bg-white/[0.07]"
                )}
                style={
                  activeTab === k
                    ? { borderLeft: `3px solid ${ind.color}`, paddingLeft: 10 }
                    : { borderLeft: "3px solid transparent" }
                }
              >
                <span style={{ color: activeTab === k ? ind.color : undefined }}>{icon}</span>
                {label}
              </button>
            ))}

            <p className="text-[12px] text-white/55 tracking-widest px-2 mt-5 mb-2 font-bold uppercase">Indicadores</p>
            {INDICATORS.map(i => (
              <button
                key={i.id}
                onClick={() => setActiveInd(i.id)}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[14px] mb-0.5 transition-all text-left",
                  activeInd === i.id
                    ? "text-white font-bold"
                    : "text-white/60 hover:text-white/80 hover:bg-white/[0.05]"
                )}
                style={{ background: activeInd === i.id ? `${i.color}25` : undefined }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                  style={{ background: i.color, opacity: activeInd === i.id ? 1 : 0.6 }}
                />
                {i.label}
              </button>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="px-5 py-4 border-t border-white/[0.15]">
            <div className="flex gap-2">
              <button
                onClick={exportAllCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-bold text-white/70 hover:text-white border border-white/[0.20] hover:border-white/40 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> CSV
              </button>
              <button
                onClick={exportJSON}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-bold text-white/70 hover:text-white border border-white/[0.20] hover:border-white/40 transition-all"
              >
                <FileJson className="w-3.5 h-3.5" /> JSON
              </button>
            </div>
            <p className="text-[13px] text-white/50 mt-3 leading-relaxed font-medium">
              Banco Mundial · INE · UNDP
            </p>
          </div>
        </aside>

        {/*RIGHT SIDE */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* TOP BAR */}
          <header
            className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-8 border-b border-white/[0.15]"
            style={{ height: 54, background: "#0d0d16" }}
          >
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex gap-[3px]">
                {["#D21034", "#555", "#FCE100", "#009A44"].map(c => (
                  <div key={c} className="w-1 h-5 rounded-sm" style={{ background: c }} />
                ))}
              </div>
              <span className="text-[15px] font-bold">Atlas do Desenvolvimento</span>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-[2px]"
                style={{ background: ind.color, boxShadow: `0 0 8px ${ind.color}` }}
              />
              <span className="text-[14px] text-white/80 font-semibold">{ind.full}</span>
            </div>

            <div className="flex items-center gap-2 lg:hidden overflow-x-auto">
              {TABS.map(({ k, label }) => (
                <button
                  key={k}
                  onClick={() => setActiveTab(k)}
                  className={cn(
                    "text-[12px] px-3 py-1 rounded-full whitespace-nowrap transition-all font-bold",
                    activeTab === k ? "text-black" : "text-white/60 hover:text-white/85"
                  )}
                  style={{ background: activeTab === k ? ind.color : "transparent" }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <span className="text-[13px] text-white/55 tracking-wide font-semibold">DADOS · 2022</span>
            </div>
          </header>

          {/* MOBILE INDICATOR SELECTOR  */}
          <div className="lg:hidden border-b border-white/[0.15] overflow-x-auto" style={{ background: "#0b0b14" }}>
            <div className="flex gap-1.5 px-4 py-2.5 w-max">
              {INDICATORS.map(i => (
                <button
                  key={i.id}
                  onClick={() => setActiveInd(i.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all shrink-0"
                  style={{
                    background: activeInd === i.id ? `${i.color}28` : "rgba(255,255,255,0.09)",
                    color: activeInd === i.id ? i.color : "rgba(255,255,255,0.70)",
                    border: `1px solid ${activeInd === i.id ? i.color + "60" : "rgba(255,255,255,0.18)"}`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-[2px] shrink-0"
                    style={{ background: i.color, opacity: activeInd === i.id ? 1 : 0.6 }}
                  />
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          {/* PAGE TITLE STRIP */}
          <div
            className="px-6 lg:px-10 py-8 border-b border-white/[0.10]"
            style={{ background: "linear-gradient(180deg, #181826 0%, #0d0d16 100%)" }}
          >
            <p className="text-[13px] text-white/65 tracking-widest mb-2 font-bold uppercase">
              {TABS.find(t => t.k === activeTab)?.label} · {ind.full}
            </p>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h1 className="text-4xl lg:text-5xl font-black leading-none">
                <span style={{ color: ind.color }}>{latest.value}</span>
                <span className="text-white/50 text-2xl ml-1 font-bold">{ind.unit}</span>
                <span className="block text-white/70 text-xl lg:text-2xl mt-2 font-semibold">
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
                    className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-white/[0.18]"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <span className="text-white/55 mb-1">{s.icon}</span>
                    <span className="text-[18px] font-black leading-none text-white">{s.val}</span>
                    <span className="text-[12px] text-white/60 mt-1 font-semibold">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT  */}
          <main className="flex-1 px-6 lg:px-10 py-8 space-y-5">

            {/* NACIONAl */}
            {activeTab === "nacional" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 anim">
                  <StatCard label="Valor Actual" value={`${latest.value}${ind.unit}`} subtext="2022 · mais recente" color={ind.color} />
                  <StatCard label="Variação recente" value={`${delta >= 0 ? "+" : ""}${delta.toFixed(1)}${ind.unit}`} subtext="desde 2020" color={delta >= 0 ? "#22c55e" : "#ef4444"} />
                  <StatCard label={ind.inverted ? "Redução total" : "Crescimento total"} value={`${ind.inverted ? "−" : "+"}${Math.abs(latest.value - natData[0].value).toFixed(1)}${ind.unit}`} subtext="desde 2000" color="#a78bfa" />
                  <StatCard label="Média Provincial" value={`${(PROVINCES.reduce((s, p) => s + PROV_CURRENT[p.id][activeInd], 0) / PROVINCES.length).toFixed(1)}${ind.unit}`} subtext="11 províncias" color="#f59e0b" />
                </div>

                <div className={cn(card, "p-6 anim-1")}>
                  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-3 h-3 rounded-[2px]" style={{ background: ind.color }} />
                        <h2 className="text-[22px] font-bold text-white">{ind.full}</h2>
                      </div>
                      <p className="text-[13px] text-white/65 pl-6 font-medium">
                        Evolução nacional · 2000–2022 · Banco Mundial
                      </p>
                    </div>
                    <div className="text-[48px] font-black leading-none" style={{ color: ind.color }}>
                      {latest.value}<span className="text-[22px] text-white/45 font-bold">{ind.unit}</span>
                    </div>
                  </div>

                  {mounted && (
                    <LineChart datasets={[{ label: "Nacional", color: ind.color, data: natData }]} height={260} />
                  )}

                  <div className="flex gap-2 flex-wrap mt-5 pt-4 border-t border-white/[0.10]">
                    {natData.map(d => (
                      <div
                        key={d.year}
                        className="px-3 py-2 rounded-lg border transition-all"
                        style={{
                          borderColor: d.year === latest.year ? `${ind.color}80` : "rgba(255,255,255,0.14)",
                          background: d.year === latest.year ? `${ind.color}22` : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <div className="text-[13px] font-bold" style={{ color: d.year === latest.year ? ind.color : "rgba(255,255,255,0.80)" }}>
                          {d.value}{ind.unit}
                        </div>
                        <div className="text-[12px] text-white/55 font-semibold">{d.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={cn(card, "p-6 anim-2")}>
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-3 h-3 rounded-[2px]" style={{ background: ind.color }} />
                    <h3 className="text-[20px] font-bold text-white">Ranking Provincial — {ind.label}</h3>
                  </div>
                  <ProvinceBar indicatorId={activeInd} />
                </div>
              </div>
            )}

            {/* ═══ MAPA ═══ */}
            {activeTab === "mapa" && (
              <div className={cn(card, "p-6 anim")}>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="w-3 h-3 rounded-[2px]" style={{ background: ind.color }} />
                  <h2 className="text-[22px] font-bold text-white">{ind.full} por Província</h2>
                </div>
                <MozambiqueMap
                  indicatorId={activeInd}
                  onProvinceClick={setMapSelectedProv}
                  selectedProvince={mapSelectedProv}
                />
              </div>
            )}

            {/* TABELA */}
            {activeTab === "tabela" && (
              <div className="anim">
                <DataTable indicatorId={activeInd} />
              </div>
            )}

            {/* PROVINCIAL  */}
            {activeTab === "provincial" && (
              <div className="space-y-5">
                <div className={cn(card, "p-5 anim")}>
                  <p className="text-[13px] text-white/65 tracking-wide mb-3 font-bold uppercase">
                    Seleccionar Províncias · Máx. 4
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
                          className="px-3.5 py-1.5 rounded-full text-[14px] font-bold transition-all"
                          style={{
                            background: isOn ? `${col}25` : "rgba(255,255,255,0.09)",
                            color: isOn ? col : "rgba(255,255,255,0.75)",
                            border: `1px solid ${isOn ? col + "60" : "rgba(255,255,255,0.18)"}`,
                            boxShadow: isOn ? `0 0 16px ${col}30` : "none",
                          }}
                        >
                          {isOn && (
                            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: col }} />
                          )}
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selProvs.length === 0 ? (
                  <div className={cn(card, "p-16 text-center anim-1")}>
                    <MapPin className="w-10 h-10 mx-auto mb-3 text-white/30" />
                    <p className="text-[18px] font-semibold text-white/60">Nenhuma província seleccionada</p>
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
                            style={{ background: "#14141e", borderColor: `${col}45`, boxShadow: `0 0 40px ${col}15` }}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="w-3 h-3 rounded-full" style={{ background: col, boxShadow: `0 0 6px ${col}` }} />
                                  <h3 className="text-[20px] font-bold text-white">{p.name}</h3>
                                </div>
                                <p className="text-[13px] text-white/65 pl-5 font-semibold">
                                  {p.pop}M hab · Rank <strong style={{ color: col }}>#{rk}</strong>
                                </p>
                              </div>
                              <span className="text-[13px] font-bold px-3 py-1 rounded-full" style={{ background: `${col}28`, color: col }}>
                                {ind.inverted ? "−" : "+"}{Math.abs(Number(tDelta))}{ind.unit}
                              </span>
                            </div>

                            <div
                              className="rounded-xl p-4 mb-4"
                              style={{ background: `linear-gradient(135deg,${col}22,${col}0a)`, border: `1px solid ${col}35` }}
                            >
                              <div className="text-[40px] font-black" style={{ color: col }}>
                                {val}<span className="text-[18px] font-bold opacity-70">{ind.unit}</span>
                              </div>
                              <div className="text-[13px] mt-1.5 font-semibold" style={{ color: `${col}dd` }}>{ind.full}</div>
                              <div className="h-1.5 rounded-full mt-3 overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
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

                            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/[0.10]">
                              {INDICATORS.slice(0, 4).map(i => (
                                <div
                                  key={i.id}
                                  onClick={() => setActiveInd(i.id)}
                                  className="p-2.5 rounded-lg cursor-pointer transition-all hover:opacity-90"
                                  style={{
                                    background: activeInd === i.id ? `${i.color}25` : "rgba(255,255,255,0.06)",
                                    border: `1px solid ${activeInd === i.id ? i.color + "55" : "rgba(255,255,255,0.13)"}`,
                                  }}
                                >
                                  <div className="text-[12px] mb-0.5 font-bold" style={{ color: i.color }}>{i.label}</div>
                                  <div className="text-[15px] font-black" style={{ color: i.color }}>
                                    {PROV_CURRENT[pid][i.id]}<span className="text-[11px] opacity-65 font-bold">{i.unit}</span>
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
                        <span className="w-3 h-3 rounded-[2px]" style={{ background: ind.color }} />
                        <h3 className="text-[18px] font-bold text-white">Ranking — {ind.full}</h3>
                      </div>
                      <ProvinceBar indicatorId={activeInd} highlighted={selProvs} />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* COMPARAR  */}
            {activeTab === "comparar" && (
              <div className="space-y-5">
                <div className={cn(card, "p-5 anim")}>
                  <p className="text-[13px] text-white/65 tracking-wide mb-3 font-bold uppercase">
                    Comparar Províncias · Máx. 4
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
                          className="px-3.5 py-1.5 rounded-full text-[14px] font-bold transition-all"
                          style={{
                            background: isOn ? `${col}25` : "rgba(255,255,255,0.09)",
                            color: isOn ? col : "rgba(255,255,255,0.75)",
                            border: `1px solid ${isOn ? col + "60" : "rgba(255,255,255,0.18)"}`,
                          }}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                  {selProvs.length > 0 && (
                    <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.10] flex-wrap">
                      {selProvs.map((pid, ci) => (
                        <div key={pid} className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-[2px]" style={{ background: COMPARE_COLORS[ci] }} />
                          <span className="text-[14px] font-semibold text-white/85">
                            {PROVINCES.find(p => p.id === pid)!.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selProvs.length < 2 ? (
                  <div className={cn(card, "p-16 text-center anim-1")}>
                    <Scale className="w-10 h-10 mx-auto mb-3 text-white/30" />
                    <p className="text-[18px] font-semibold text-white/60">Seleccione pelo menos 2 províncias</p>
                  </div>
                ) : (
                  <>
                    <div className={cn(card, "p-6 anim-1")}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-3 h-3 rounded-[2px]" style={{ background: ind.color }} />
                        <h3 className="text-[22px] font-bold text-white">{ind.full} · 2015–2022</h3>
                      </div>
                      <p className="text-[13px] text-white/60 mb-5 pl-6 font-medium">Evolução temporal comparada</p>
                      {mounted && <LineChart datasets={compareDS} height={300} />}
                    </div>

                    <div className={cn(card, "p-6 anim-2")}>
                      <h3 className="text-[22px] font-bold text-white mb-5">Todos os Indicadores</h3>
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
                                background: activeInd === i.id ? `${i.color}18` : "rgba(255,255,255,0.05)",
                                borderColor: activeInd === i.id ? `${i.color}65` : "rgba(255,255,255,0.13)",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ background: i.color }} />
                                <span className="text-[13px] font-bold text-white/90">{i.full}</span>
                                {activeInd === i.id && (
                                  <span className="text-[11px] px-1.5 py-0.5 rounded-full ml-auto font-black" style={{ background: `${i.color}35`, color: i.color }}>
                                    ACTIVO
                                  </span>
                                )}
                              </div>
                              <div className="space-y-2">
                                {vals.map((v, ci) => {
                                  const col = COMPARE_COLORS[ci];
                                  const isW = v.score === maxS;
                                  return (
                                    <div key={v.pid} className="flex items-center gap-2">
                                      <span className="text-[13px] font-black w-7" style={{ color: col }}>
                                        {PROVINCES.find(p => p.id === v.pid)!.short}
                                      </span>
                                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.11)" }}>
                                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${v.score}%`, background: col }} />
                                      </div>
                                      <span
                                        className="text-[13px] min-w-10 text-right"
                                        style={{ color: isW ? col : "rgba(255,255,255,0.60)", fontWeight: isW ? 800 : 600 }}
                                      >
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
                        <p className="text-[13px] text-white/65 tracking-wide font-bold uppercase">Perfil Global</p>
                        <RadarChart provinces={selProvs} size={220} />
                        <div className="space-y-2 w-full">
                          {selProvs.map((pid, ci) => (
                            <div key={pid} className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-[2px]" style={{ background: COMPARE_COLORS[ci] }} />
                              <span className="text-[14px] font-semibold text-white/85">
                                {PROVINCES.find(p => p.id === pid)!.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={cn(card, "p-6 lg:col-span-2 anim-3")}>
                        <p className="text-[20px] font-bold text-white mb-5">Score de Desenvolvimento Global</p>
                        <div className="space-y-5">
                          {selProvs.map((pid, ci) => {
                            const sc = overallScore(pid);
                            const col = COMPARE_COLORS[ci];
                            const p = PROVINCES.find(x => x.id === pid)!;
                            return (
                              <div key={pid}>
                                <div className="flex justify-between items-baseline mb-2">
                                  <span className="text-[16px] font-semibold text-white/85">{p.name}</span>
                                  <span className="text-[24px] font-black" style={{ color: col }}>
                                    {sc}<span className="text-[14px] opacity-55 font-bold">/100</span>
                                  </span>
                                </div>
                                <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
                                  <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${sc}%`, background: col, boxShadow: `0 0 10px ${col}55` }}
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

            {/* HEATMAP  */}
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

          {/* FOOTER */}
          <footer
            className="px-6 lg:px-10 py-5 border-t border-white/[0.15] flex items-center justify-between gap-4 flex-wrap"
            style={{ background: "#0b0b14" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-[3px]">
                {["#D21034", "#555", "#FCE100", "#009A44"].map(c => (
                  <div key={c} className="w-1 h-4 rounded-sm" style={{ background: c }} />
                ))}
              </div>
              <span className="text-[13px] text-white/60 font-semibold">
                Atlas do Desenvolvimento · Moçambique
              </span>
            </div>
            <span className="text-[13px] text-white/50 font-medium">
              Banco Mundial · INE · UNDP · 2000–2022
            </span>
          </footer>

        </div>
      </div>
    </div>
  );
}