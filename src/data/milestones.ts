/**
 * Health journey milestones — replace with API or real data later.
 */
export type Milestone = {
  id: string;
  date: string;
  event: string;
  detail?: string;
};

export const exampleMilestones: Milestone[] = [
  { id: "1", date: "2024-03", event: "Half marathon", detail: "Completed first half" },
  { id: "2", date: "2024-02", event: "10K PB", detail: "Sub-55 min" },
  { id: "3", date: "2024-01", event: "Consistent 5K", detail: "3x per week" },
  { id: "4", date: "2023-12", event: "Started running", detail: "Couch to 5K" },
];
