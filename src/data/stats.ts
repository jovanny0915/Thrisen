export type StatItem = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

export type StatsSnapshot = {
  source: "manual" | "github";
  updatedAt: string;
  items: StatItem[];
};

export const exampleStats: StatsSnapshot = {
  source: "manual",
  updatedAt: "2026-03-05",
  items: [
    { id: "1", label: "Years Building", value: "6+", hint: "Frontend-first product engineering." },
    { id: "2", label: "Production Projects", value: "20+", hint: "Shipped for startups and internal platforms." },
    { id: "3", label: "Public Repositories", value: "45", hint: "Tools, experiments, and learning builds." },
  ],
};
