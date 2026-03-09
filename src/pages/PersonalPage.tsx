import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import PageMeta from "@/components/PageMeta";
import { routeMeta } from "@/lib/seo";
import RunningBlog from "@/components/worlds/personal/RunningBlog";
import HealthJourney from "@/components/worlds/personal/HealthJourney";
import SocialHub from "@/components/worlds/personal/SocialHub";
import HobbyShelf from "@/components/worlds/personal/HobbyShelf";
import { examplePosts } from "@/data/posts";
import { exampleMilestones } from "@/data/milestones";
import { useRoutePersona } from "@/hooks/useRoutePersona";

/**
 * Personal world — full-page; Phase 3 enter animation; Phase 4: Blog, Health, Social.
 */
export default function PersonalPage() {
  const mainRef = useRef<HTMLElement>(null);
  const persona = useRoutePersona("personal-casual");
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  }, []);

  return (
    <>
      <PageMeta meta={routeMeta["/personal"]} />
      <main ref={mainRef} className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200/90">
        <header className="sticky top-0 z-10 bg-amber-50/90 backdrop-blur border-b border-amber-200/50 px-4 py-3">
          <Link to="/" className="text-amber-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded">
            ← Back to Bridge
          </Link>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-stone-800 mb-2">Personal</h1>
          <p className="text-stone-600 mb-2">Hobby highlights, micro-blog stories, and community touchpoints.</p>
          <p className="text-sm text-amber-800/80 mb-10">Persona active: {persona}</p>
          <HobbyShelf />
          <RunningBlog posts={examplePosts} />
          <HealthJourney milestones={exampleMilestones} />
          <SocialHub />
        </div>
      </main>
    </>
  );
}
