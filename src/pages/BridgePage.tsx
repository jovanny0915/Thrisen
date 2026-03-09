import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Scene from "@/components/three/Scene";
import PageMeta from "@/components/PageMeta";
import { BridgeStateProvider } from "@/contexts/BridgeStateContext";
import { useBridgeState } from "@/hooks/useBridgeState";
import { useWorldTransition } from "@/hooks/useWorldTransition";
import { routeMeta } from "@/lib/seo";

/**
 * Phase 3: Transition flow — click → run → delay → GSAP exit (panel + canvas) → navigate.
 * Order: 1) setWorldTarget; 2) run + camera pan; 3) after RUN_DELAY_MS run exit timeline; 4) on complete navigate.
 */
function BridgeContent() {
  const navigate = useNavigate();
  const { worldTarget, phase, setTransitioning, resetBridge } = useBridgeState();
  const { startTransition, runDelayMs } = useWorldTransition();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetBridge();
  }, [resetBridge]);

  useEffect(() => {
    if (phase !== "running" || !worldTarget) return;
    const id = window.setTimeout(() => {
      setTransitioning();
      startTransition({ target: worldTarget, canvasRef, navigate });
    }, runDelayMs);
    return () => clearTimeout(id);
  }, [worldTarget, phase, navigate, runDelayMs, setTransitioning, startTransition]);

  return (
    <main
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden"
      style={{ width: "100vw", height: "100vh" }}
      aria-label="Bridge landing"
    >
      <div className="absolute inset-0 z-0 bg-[#0a0a0c]" aria-hidden />
      <div ref={canvasRef} className="absolute inset-0 z-[2]" style={{ opacity: 1 }}>
        <Scene />
        <div className="pointer-events-none absolute inset-0 z-10">
        </div>
      </div>
    </main>
  );
}

/**
 * Bridge — full viewport; canvas behind panels; Phase 3: exit timeline then navigate.
 */
export default function BridgePage() {
  return (
    <>
      <PageMeta meta={routeMeta["/"]} />
      <BridgeStateProvider>
        <BridgeContent />
      </BridgeStateProvider>
    </>
  );
}
