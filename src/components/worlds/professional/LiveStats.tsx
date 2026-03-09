import type { StatsSnapshot } from "@/data/stats";

type LiveStatsProps = {
  snapshot: StatsSnapshot;
};

export default function LiveStats({ snapshot }: LiveStatsProps) {
  return (
    <section className="mb-14" aria-labelledby="stats-heading">
      <div className="flex items-end justify-between gap-4 mb-4">
        <h2 id="stats-heading" className="text-2xl font-bold text-cyan-100">
          Live Stats
        </h2>
        <p className="text-xs text-cyan-200/70">
          Source: {snapshot.source} - Updated {snapshot.updatedAt}
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3">
        {snapshot.items.map((item) => (
          <li key={item.id} className="rounded-xl border border-cyan-400/20 bg-slate-900/60 p-4 shadow-lg shadow-cyan-950/30">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-300/70">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-cyan-100">{item.value}</p>
            <p className="mt-2 text-sm text-slate-300">{item.hint}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
