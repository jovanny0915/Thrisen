/**
 * Bridge exit timeline.
 * Transition flow: 1) Click panel → setWorldTarget; 2) Character runs, camera pans;
 * 3) After RUN_DELAY_MS (1200ms) run this timeline; 4) Canvas animates out;
 * 5) On complete → navigate('/personal'|'/professional'); 6) World page mount + enter animation.
 */

import type gsap from "gsap";

const RUN_DELAY_MS = 1200;
const EXIT_DURATION = 0.7;

export const BRIDGE_TRANSITION = {
  RUN_DELAY_MS,
  EXIT_DURATION,
} as const;

export type BridgeExitRefs = {
  canvas: HTMLElement | null;
};

export function createBridgeExitTimeline(
  gsapInstance: typeof gsap,
  refs: BridgeExitRefs,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsapInstance.timeline({ onComplete });
  const { canvas } = refs;
  if (!canvas) return tl;
  tl.set(canvas, { willChange: "opacity, transform" });
  tl.to(canvas, { opacity: 0, duration: EXIT_DURATION * 0.8, ease: "power2.inOut" }, 0);
  tl.to(canvas, { scale: 1.02, duration: EXIT_DURATION, ease: "power2.inOut" }, 0);
  return tl;
}
