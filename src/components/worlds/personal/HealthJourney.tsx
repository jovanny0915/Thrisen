import type { Milestone } from "@/data/milestones";

type HealthJourneyProps = { milestones: Milestone[] };

/**
 * Phase 4.1: Health Journey — timeline of fitness milestones.
 */
export default function HealthJourney({ milestones }: HealthJourneyProps) {
  return (
    <section className="mb-14" aria-labelledby="health-heading">
      <h2 id="health-heading" className="text-2xl font-bold text-stone-800 mb-4">
        Health Journey
      </h2>
      <div className="relative pl-6 border-l-2 border-amber-300 space-y-6">
        {milestones.map((m) => (
          <div key={m.id} className="relative -left-6">
            <span className="absolute left-0 w-3 h-3 rounded-full bg-amber-500 -translate-x-[calc(0.75rem+5px)] top-1" />
            <time dateTime={m.date} className="text-sm font-medium text-amber-800">
              {m.date}
            </time>
            <p className="font-semibold text-stone-800">{m.event}</p>
            {m.detail && <p className="text-stone-600 text-sm">{m.detail}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
