"use client";

import { useMemo } from "react";
import { useBridgeState } from "@/hooks/useBridgeState";

export type CharacterDirection = "left" | "right" | null;
export type CharacterAnimation = "idle" | "run";

/**
 * Character animation state — idle vs run; run direction (left/right).
 * Phase 2: maps bridge state to clip intent and orientation direction.
 */
export function useCharacterAnimation() {
  const { worldTarget, hoverTarget, phase, persona } = useBridgeState();

  return useMemo(() => {
    const direction: CharacterDirection =
      worldTarget === "personal" ? "left" : worldTarget === "professional" ? "right" : null;
    const lookDirection: CharacterDirection =
      !direction && phase === "hovering"
        ? hoverTarget === "personal"
          ? "left"
          : hoverTarget === "professional"
            ? "right"
            : null
        : null;
    const animation: CharacterAnimation =
      (phase === "running" || phase === "transitioning") && direction ? "run" : "idle";
    return { animation, direction, lookDirection, persona, isRunning: animation === "run" };
  }, [phase, hoverTarget, persona, worldTarget]);
}
