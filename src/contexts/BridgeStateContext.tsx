"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  BridgePhase,
  HoverTarget,
  Persona,
  WorldTarget,
} from "@/hooks/useBridgeState";

type BridgeStateContextValue = {
  worldTarget: WorldTarget;
  hoverTarget: HoverTarget;
  phase: BridgePhase;
  persona: Persona;
  setHoverTarget: (target: HoverTarget) => void;
  startRun: (target: Exclude<WorldTarget, null>) => void;
  setTransitioning: () => void;
  markArrived: () => void;
  resetBridge: () => void;
};

const BridgeStateContext = createContext<BridgeStateContextValue | null>(null);

export function BridgeStateProvider({ children }: { children: ReactNode }) {
  const [worldTarget, setWorldTargetState] = useState<WorldTarget>(null);
  const [hoverTarget, setHoverTargetState] = useState<HoverTarget>(null);
  const [phase, setPhase] = useState<BridgePhase>("idle");
  const [persona, setPersona] = useState<Persona>("default");

  const setHoverTarget = useCallback((target: HoverTarget) => {
    setHoverTargetState(target);
    setPhase((prev) => {
      if (prev === "running" || prev === "transitioning") return prev;
      return target ? "hovering" : "idle";
    });
  }, []);

  const startRun = useCallback((target: Exclude<WorldTarget, null>) => {
    setWorldTargetState(target);
    setHoverTargetState(null);
    setPhase("running");
    setPersona(target === "professional" ? "professional-tech" : "personal-casual");
  }, []);

  const setTransitioning = useCallback(() => {
    setPhase("transitioning");
  }, []);

  const markArrived = useCallback(() => {
    setPhase("arrived");
  }, []);

  const resetBridge = useCallback(() => {
    setWorldTargetState(null);
    setHoverTargetState(null);
    setPhase("idle");
    setPersona("default");
  }, []);

  const value = useMemo(
    () => ({
      worldTarget,
      hoverTarget,
      phase,
      persona,
      setHoverTarget,
      startRun,
      setTransitioning,
      markArrived,
      resetBridge,
    }),
    [
      worldTarget,
      hoverTarget,
      phase,
      persona,
      setHoverTarget,
      startRun,
      setTransitioning,
      markArrived,
      resetBridge,
    ]
  );

  return (
    <BridgeStateContext.Provider value={value}>
      {children}
    </BridgeStateContext.Provider>
  );
}

export { BridgeStateContext };
