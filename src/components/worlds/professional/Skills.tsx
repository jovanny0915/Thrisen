/**
 * Professional stack cloud with subtle motion-focused styling.
 */
const skills = ["React", "TypeScript", "JavaScript", "Node.js", "Tailwind", "GSAP", "Three.js", "Vite"];

export default function Skills() {
  return (
    <section className="mb-14" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-2xl font-bold text-cyan-100 mb-4">
        Interactive Tech Stack
      </h2>
      <ul className="flex flex-wrap gap-3">
        {skills.map((name, i) => (
          <li key={name}>
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-cyan-400/30 bg-slate-900/70 text-cyan-100 transition-transform hover:-translate-y-0.5 hover:border-cyan-300/70 hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
