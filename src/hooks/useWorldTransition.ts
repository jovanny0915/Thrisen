import gsap from "gsap";
import type { RefObject } from "react";
import { BRIDGE_TRANSITION, createBridgeExitTimeline } from "@/lib/gsap/bridgeTimeline";

type TargetWorld = "personal" | "professional";
type Navigate = (to: string, options?: { replace?: boolean; state?: unknown }) => void;

type WorldTransitionArgs = {
  target: TargetWorld;
  canvasRef: RefObject<HTMLDivElement>;
  navigate: Navigate;
};

/**
 * World transition — GSAP exit timeline then navigate.
 * Phase 3: Trigger after run; on complete call navigate('/personal'|'/professional') from react-router-dom.
 */
export function useWorldTransition() {
  const startTransition = ({
    target,
    canvasRef,
    navigate,
  }: WorldTransitionArgs) => {
    const refs = {
      canvas: canvasRef.current,
    };
    const persona = target === "professional" ? "professional-tech" : "personal-casual";
    const onComplete = () =>
      navigate(target === "personal" ? "/personal" : "/professional", {
        state: { persona, fromBridge: true },
      });
    createBridgeExitTimeline(gsap, refs, onComplete);
  };

  return { startTransition, runDelayMs: BRIDGE_TRANSITION.RUN_DELAY_MS };
}
