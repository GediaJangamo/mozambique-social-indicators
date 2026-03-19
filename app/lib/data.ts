export const PROVINCES = [
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
] as const;

export type ProvinceId = typeof PROVINCES[number]["id"];

export const INDICATORS = [
  { id: "literacy", label: "Literacia", full: "Taxa de Literacia", unit: "%", color: "#2d8a57", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "electricity", label: "Electricidade", full: "Acesso à Electricidade", unit: "%", color: "#c77b3f", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "water", label: "Água Potável", full: "Água Potável", unit: "%", color: "#3574a5", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "health", label: "Saúde", full: "Cobertura de Saúde", unit: "%", color: "#b5496d", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "poverty", label: "Pobreza", full: "Taxa de Pobreza", unit: "%", color: "#c25550", inverted: true, scoreMin: 0, scoreMax: 100 },
  { id: "school", label: "Escolaridade", full: "Escolaridade Primária", unit: "%", color: "#7859a5", inverted: false, scoreMin: 0, scoreMax: 100 },
  { id: "infant_mortality", label: "Mort. Infantil", full: "Mortalidade Infantil", unit: "/1000", color: "#2a8a8a", inverted: true, scoreMin: 0, scoreMax: 150 },
  { id: "life_expectancy", label: "Expect. de Vida", full: "Expectativa de Vida", unit: " anos", color: "#5a9e6f", inverted: false, scoreMin: 40, scoreMax: 80 },
] as const;

export type IndicatorId = typeof INDICATORS[number]["id"];

export const NATIONAL: Record<string, { year: number; value: number }[]> = {
  literacy: [{ year: 2000, value: 44.4 }, { year: 2005, value: 47.8 }, { year: 2010, value: 50.6 }, { year: 2015, value: 58.8 }, { year: 2018, value: 60.7 }, { year: 2020, value: 63.4 }, { year: 2022, value: 65.1 }],
  electricity: [{ year: 2000, value: 6.2 }, { year: 2005, value: 8.5 }, { year: 2010, value: 13.7 }, { year: 2015, value: 24.1 }, { year: 2018, value: 30.2 }, { year: 2020, value: 33.0 }, { year: 2022, value: 38.4 }],
  water: [{ year: 2000, value: 37.1 }, { year: 2005, value: 42.2 }, { year: 2010, value: 49.7 }, { year: 2015, value: 56.0 }, { year: 2018, value: 60.8 }, { year: 2020, value: 63.2 }, { year: 2022, value: 65.7 }],
  health: [{ year: 2000, value: 42.0 }, { year: 2005, value: 48.0 }, { year: 2010, value: 55.0 }, { year: 2015, value: 62.0 }, { year: 2018, value: 66.0 }, { year: 2020, value: 68.0 }, { year: 2022, value: 71.0 }],
  poverty: [{ year: 2000, value: 70.0 }, { year: 2005, value: 65.0 }, { year: 2010, value: 60.0 }, { year: 2015, value: 55.0 }, { year: 2018, value: 52.0 }, { year: 2020, value: 50.0 }, { year: 2022, value: 46.0 }],
  school: [{ year: 2000, value: 55.0 }, { year: 2005, value: 62.0 }, { year: 2010, value: 70.0 }, { year: 2015, value: 76.0 }, { year: 2018, value: 79.0 }, { year: 2020, value: 82.0 }, { year: 2022, value: 86.0 }],
  infant_mortality: [{ year: 2000, value: 128.4 }, { year: 2005, value: 108.2 }, { year: 2010, value: 86.1 }, { year: 2015, value: 66.8 }, { year: 2018, value: 59.4 }, { year: 2020, value: 55.1 }, { year: 2022, value: 51.7 }],
  life_expectancy: [{ year: 2000, value: 47.2 }, { year: 2005, value: 50.4 }, { year: 2010, value: 54.9 }, { year: 2015, value: 58.1 }, { year: 2018, value: 60.2 }, { year: 2020, value: 61.4 }, { year: 2022, value: 62.9 }],
};

export const PROVINCIAL: Record<string, Record<string, number[]>> = {
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

export const PROV_CURRENT: Record<string, Record<string, number>> = {
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

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

export const COMPARE_COLORS = ["#c25550", "#2d8a57", "#3574a5", "#c77b3f"];

// SVG Map Paths
export const PROVINCE_PATHS: Record<string, { path: string; cx: number; cy: number }> = {
  cabo_delgado: { path: "M 155 20 L 220 18 L 240 30 L 235 70 L 215 85 L 190 90 L 165 80 L 148 60 Z", cx: 194, cy: 55 },
  niassa: { path: "M 90 25 L 155 20 L 148 60 L 165 80 L 150 110 L 120 120 L 85 100 L 70 70 L 75 40 Z", cx: 115, cy: 72 },
  nampula: { path: "M 148 60 L 190 90 L 215 85 L 230 100 L 220 130 L 195 145 L 165 140 L 148 120 L 150 110 L 165 80 Z", cx: 186, cy: 110 },
  zambezia: { path: "M 85 100 L 120 120 L 150 110 L 148 120 L 165 140 L 195 145 L 190 175 L 155 185 L 130 180 L 95 165 L 80 140 L 82 115 Z", cx: 135, cy: 145 },
  tete: { path: "M 70 70 L 85 100 L 82 115 L 80 140 L 60 155 L 35 145 L 25 120 L 30 90 L 50 75 Z", cx: 57, cy: 113 },
  manica: { path: "M 60 155 L 80 140 L 95 165 L 90 195 L 70 210 L 50 205 L 38 185 L 38 165 Z", cx: 65, cy: 183 },
  sofala: { path: "M 80 140 L 130 180 L 155 185 L 160 215 L 145 235 L 115 240 L 90 225 L 80 200 L 70 210 L 90 195 L 95 165 Z", cx: 115, cy: 200 },
  inhambane: { path: "M 90 225 L 115 240 L 130 265 L 125 295 L 105 310 L 80 305 L 65 285 L 68 255 L 75 235 Z", cx: 97, cy: 268 },
  gaza: { path: "M 38 165 L 50 205 L 70 210 L 80 200 L 90 225 L 75 235 L 68 255 L 55 255 L 30 240 L 20 210 L 22 180 Z", cx: 52, cy: 213 },
  maputo: { path: "M 30 240 L 55 255 L 68 255 L 65 285 L 55 305 L 35 305 L 20 285 L 18 260 Z", cx: 43, cy: 276 },
  maputo_city: { path: "M 35 305 L 55 305 L 60 320 L 50 330 L 35 325 L 28 315 Z", cx: 44, cy: 315 },
};

// Helper functions
export function getScore(pid: string, iid: string): number {
  const ind = INDICATORS.find(i => i.id === iid)!;
  const v = PROV_CURRENT[pid][iid];
  const range = ind.scoreMax - ind.scoreMin;
  const norm = range === 100 ? v : Math.round(((v - ind.scoreMin) / range) * 100);
  return ind.inverted ? 100 - norm : norm;
}

export function overallScore(pid: string): number {
  return Math.round(INDICATORS.reduce((s, i) => s + getScore(pid, i.id), 0) / INDICATORS.length);
}

export function rankProv(pid: string, iid: string): number {
  return [...PROVINCES].sort((a, b) => getScore(b.id, iid) - getScore(a.id, iid)).findIndex(p => p.id === pid) + 1;
}

export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export function interpolateColor(score: number, color: string): string {
  const opacity = 0.15 + (score / 100) * 0.75;
  return `rgba(${hexToRgb(color)},${opacity})`;
}
