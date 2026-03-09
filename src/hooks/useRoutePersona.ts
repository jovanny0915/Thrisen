import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { Persona } from "@/hooks/useBridgeState";

type PersonaState = {
  persona?: Persona;
  fromBridge?: boolean;
};

export function useRoutePersona(fallback: Extract<Persona, "professional-tech" | "personal-casual">) {
  const location = useLocation();
  const state = location.state as PersonaState | null;

  return useMemo(() => {
    if (state?.persona === "professional-tech" || state?.persona === "personal-casual") {
      return state.persona;
    }
    return fallback;
  }, [fallback, state?.persona]);
}
