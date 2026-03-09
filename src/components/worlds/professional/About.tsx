import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Phase 4.2: About Me — scrollytelling with GSAP fade-in.
 */
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const pars = Array.from(container.querySelectorAll<HTMLParagraphElement>("p"));
    pars.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          delay: i * 0.1,
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="about" className="mb-14 scroll-mt-24" aria-labelledby="about-heading">
      <h2 id="about-heading" className="text-2xl font-bold text-cyan-100 mb-4">
        About Me
      </h2>
      <div ref={containerRef} className="space-y-4">
        <p className="text-slate-300">
          I build interfaces and experiences with React and TypeScript. Clean code and clear UX matter.
        </p>
        <p className="text-slate-300">
          When I&apos;m not coding, I run. The same discipline—consistency, small steps—shows up everywhere.
        </p>
        <p className="text-slate-300">
          This site is the bridge between the personal and the professional. Pick a side and explore.
        </p>
      </div>
    </section>
  );
}
