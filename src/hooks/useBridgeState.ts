import { useContext } from "react";
import { BridgeStateContext } from "@/contexts/BridgeStateContext";

export type WorldTarget = "personal" | "professional" | null;
export type HoverTarget = "personal" | "professional" | null;
export type BridgePhase = "idle" | "hovering" | "running" | "transitioning" | "arrived";
export type Persona = "default" | "professional-tech" | "personal-casual";

export function useBridgeState() {
  const ctx = useContext(BridgeStateContext);
  if (!ctx) throw new Error("useBridgeState must be used within BridgeStateProvider");
  return ctx;
}
