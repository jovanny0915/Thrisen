import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import PageMeta from "@/components/PageMeta";
import { routeMeta } from "@/lib/seo";
import About from "@/components/worlds/professional/About";
import Skills from "@/components/worlds/professional/Skills";
import Projects from "@/components/worlds/professional/Projects";
import Contact from "@/components/worlds/professional/Contact";
import LiveStats from "@/components/worlds/professional/LiveStats";
import { exampleProjects } from "@/data/projects";
import { exampleStats } from "@/data/stats";
import { useRoutePersona } from "@/hooks/useRoutePersona";

/**
 * Professional world — full-page; Phase 3 enter animation; Phase 4: About, Skills, Projects, Contact.
 */
export default function ProfessionalPage() {
  const mainRef = useRef<HTMLElement>(null);
  const persona = useRoutePersona("professional-tech");
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  }, []);

  return (
    <>
      <PageMeta meta={routeMeta["/professional"]} />
      <main ref={mainRef} className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(22,78,99,0.45),transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#082f49_100%)]">
        <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur border-b border-cyan-900/60 px-4 py-3">
          <Link to="/" className="text-cyan-100 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded">
            ← Back to Bridge
          </Link>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-cyan-100 mb-2">Professional</h1>
          <p className="text-slate-300 mb-2">Technical credibility, project outcomes, and contact pathways.</p>
          <p className="text-sm text-cyan-300/80 mb-10">Persona active: {persona}</p>
          <LiveStats snapshot={exampleStats} />
          <About />
          <Skills />
          <Projects projects={exampleProjects} />
          <Contact />
        </div>
      </main>
    </>
  );
}
