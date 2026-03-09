"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Html, OrbitControls, RoundedBox, Text3D } from "@react-three/drei";
import helvetikerBoldUrl from "three/examples/fonts/helvetiker_bold.typeface.json?url";
import { useBridgeState } from "@/hooks/useBridgeState";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Character from "./Character";
import BridgePanels from "./BridgePanels";
import Lighting from "./Lighting";
import CabinetModel from "./CabinetModel";
import ShoesModel from "./ShoesModel";
import LaptopModel from "./LaptopModel";
import RoundPlan from "./RoundPlan";
import { CAMERA_DEPTH, CAMERA_HEIGHT } from "./cameraConfig";

type WorldTarget = "personal" | "professional";

type WorldLabelProps = {
  label: "PERSONAL" | "PROFESSIONAL";
  target: WorldTarget;
  position: [number, number, number];
  onExploreClick: (target: WorldTarget) => void;
};

function WorldLabel({ label, target, position, onExploreClick }: WorldLabelProps) {
  const { phase, hoverTarget, setHoverTarget } = useBridgeState();
  const isClickable = phase === "idle" || phase === "hovering";
  const isHovered = hoverTarget === target;
  const buttonOffsetX = -15;

  const labelColor = useMemo(() => (label === "PERSONAL" ? "#111111" : "#000000"), [label]);
  const buttonBaseColor = useMemo(() => (label === "PERSONAL" ? "#f2f2f2" : "#111111"), [label]);
  const buttonTextColor = useMemo(() => (label === "PERSONAL" ? "#101010" : "#ffffff"), [label]);

  const handleClick = (event: { stopPropagation?: () => void }) => {
    event.stopPropagation?.();
    if (!isClickable) return;
    onExploreClick(target);
  };

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
      <Center>
        <Text3D
          font={helvetikerBoldUrl}
          size={2.2}
          height={0.22}
          letterSpacing={0.02}
          bevelEnabled
          bevelSize={0.03}
          bevelThickness={0.03}
        >
          {label}
          <meshStandardMaterial color={labelColor} roughness={0.58} metalness={0.18} />
        </Text3D>
      </Center>

      <group
        position={[buttonOffsetX, 1, 1]}
        rotation={isHovered ? [0, -Math.PI / 4, -Math.PI / 2] : [Math.PI / 2, -Math.PI / 2, 0]}
        scale={isHovered ? 1.05 : 1}
        onClick={handleClick}
        onPointerOver={() => {
          if (!isClickable) return;
          setHoverTarget(target);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoverTarget(null);
          document.body.style.cursor = "default";
        }}
      >
        <RoundedBox args={[4.8, 1.55, 0.48]} radius={0.2} smoothness={6}>
          <meshStandardMaterial color={buttonBaseColor} roughness={0.45} metalness={0.2} />
        </RoundedBox>
        <Center position={[0, 0, 0.28]}>
          <Text3D
            font={helvetikerBoldUrl}
            size={0.5}
            height={0.14}
            letterSpacing={0.03}
            bevelEnabled
            bevelSize={0.02}
            bevelThickness={0.02}
          >
            EXPLORE
            <meshStandardMaterial color={buttonTextColor} roughness={0.45} metalness={0.15} />
          </Text3D>
        </Center>
      </group>
    </group>
  );
}

type ExploreDropdownProps = {
  target: WorldTarget;
  onEnter: (target: WorldTarget) => void;
  onClose: () => void;
};

function ExploreDropdown({ target, onEnter, onClose }: ExploreDropdownProps) {
  const position: [number, number, number] = target === "personal" ? [-5, -1, 8] : [5, -1, 8];
  const isLightTheme = target === "personal";

  const containerClassName = isLightTheme
    ? "min-w-[180px] rounded-xl border border-black/20 bg-white/90 p-2 text-black shadow-2xl backdrop-blur-sm"
    : "min-w-[180px] rounded-xl border border-white/20 bg-black/80 p-2 text-white shadow-2xl backdrop-blur-sm";
  const headerClassName = isLightTheme
    ? "mb-2 border-b border-black/20 px-2 pb-2 text-xs font-semibold uppercase tracking-widest text-black/70"
    : "mb-2 border-b border-white/20 px-2 pb-2 text-xs font-semibold uppercase tracking-widest text-white/70";
  const enterButtonClassName = isLightTheme
    ? "mb-1 w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-black/10"
    : "mb-1 w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-white/15";
  const closeButtonClassName = isLightTheme
    ? "w-full rounded-md px-3 py-2 text-left text-sm text-black/80 transition hover:bg-black/10"
    : "w-full rounded-md px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/15";

  return (
    <group position={position} rotation={[-Math.PI/2, 0, 0]}>
      <Html transform occlude distanceFactor={12}>
        <div className={containerClassName}>
          <div className={headerClassName}>
            {target} world
          </div>
          <button
            type="button"
            className={enterButtonClassName}
            onClick={() => onEnter(target)}
          >
            Enter
          </button>
          <button
            type="button"
            className={closeButtonClassName}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </Html>
    </group>
  );
}

/**
 * Phase 2: Full-screen R3F canvas behind bridge panels.
 * Character on seam, camera frames character with optional pan; basic lighting.
 */
export default function Scene() {
  const { startRun } = useBridgeState();
  const [openDropdownTarget, setOpenDropdownTarget] = useState<WorldTarget | null>(null);

  return (
    <div className="w-full h-full min-h-full">
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 2.8;
        }}
        shadows
        camera={{ position: [0, CAMERA_HEIGHT, CAMERA_DEPTH], fov: 45 }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <color attach="background" args={["#ffffff"]} />
        {/* <Sky
          distance={450000}
          sunPosition={[60, 140, 25]}
          turbidity={1.3}
          rayleigh={0.95}
          mieCoefficient={0.0018}
          mieDirectionalG={0.985}
        /> */}
        <Lighting />
        <OrbitControls />
        <axesHelper args={[5]} position={[0, 0, 0]} />
        <BridgePanels />
        <WorldLabel
          label="PERSONAL"
          target="personal"
          position={[-10, -1.34, -10]}
          onExploreClick={(target) => setOpenDropdownTarget(target)}
        />
        <WorldLabel
          label="PROFESSIONAL"
          target="professional"
          position={[10, -1.34, -10]}
          onExploreClick={(target) => setOpenDropdownTarget(target)}
        />
        {openDropdownTarget ? (
          <ExploreDropdown
            target={openDropdownTarget}
            onEnter={(target) => {
              setOpenDropdownTarget(null);
              startRun(target);
            }}
            onClose={() => setOpenDropdownTarget(null)}
          />
        ) : null}
        <Character />
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <RoundPlan position={[-4, -1.03, 0]} rotationSpeed={1.9} />
            <RoundPlan position={[4, -1.03, 0]} rotationSpeed={-1.9} />
            <CabinetModel />
            <ShoesModel position={[-4, -1, 0]} />
            <LaptopModel position={[4, -1, 0]} />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  );
}
