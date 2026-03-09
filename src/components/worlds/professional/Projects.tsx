import { useState } from "react";
import type { Project } from "@/data/projects";

type ProjectsProps = { projects: Project[] };

/**
 * Phase 4.2 & 4.3: Projects gallery — accepts projects prop; modal for detail.
 */
export default function Projects({ projects }: ProjectsProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="clients" className="mb-14 scroll-mt-24" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-2xl font-bold text-cyan-100 mb-4">
        Project Gallery Wall
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="w-full text-left p-4 rounded-lg bg-slate-900/70 border border-cyan-400/25 hover:border-cyan-300/60 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <h3 className="font-semibold text-cyan-100">{project.title}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70 mt-1">{project.tagline}</p>
              <p className="text-sm text-slate-300 mt-2 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-100">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-slate-950 border border-cyan-400/30 rounded-xl shadow-xl max-w-xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="project-modal-title" className="text-xl font-bold text-cyan-100">
              {selected.title}
            </h3>
            <p className="mt-2 text-slate-300">{selected.description}</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-cyan-200">Problem:</strong> {selected.problem}
              </p>
              <p>
                <strong className="text-cyan-200">Solution:</strong> {selected.solution}
              </p>
              <p>
                <strong className="text-cyan-200">Impact:</strong> {selected.impact}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {selected.tech.map((t) => (
                <span key={t} className="text-sm px-2 py-1 rounded bg-cyan-900/60 text-cyan-100">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-200 underline hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded"
                >
                  Live demo →
                </a>
              )}
              {selected.repo && (
                <a
                  href={selected.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-cyan-200 underline hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded"
                >
                  Source code →
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-4 px-4 py-2 rounded bg-slate-800 text-cyan-100 hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
