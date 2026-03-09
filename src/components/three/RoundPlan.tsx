"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type RoundPlanProps = {
  position: [number, number, number];
  rotationSpeed?: number;
  outerRadius?: number;
  innerRadius?: number;
  thickness?: number;
};

export default function RoundPlan({
  position,
  rotationSpeed = 0.9,
  outerRadius = 1.7,
  innerRadius = 1.05,
  thickness = 0.12,
}: RoundPlanProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const gradientMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, "#0b3d1f");
    gradient.addColorStop(0.5, "#23a455");
    gradient.addColorStop(1, "#9bf5b4");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;

    return texture;
  }, []);

  useEffect(() => {
    return () => {
      gradientMap?.dispose();
    };
  }, [gradientMap]);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += rotationSpeed * delta;
  });

  return (
    <mesh ref={ringRef} position={position} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial map={gradientMap} roughness={0.35} metalness={0.4} side={THREE.DoubleSide} />

      {/* Add a subtle raised edge so the ring reads as a platform. */}
      <mesh position={[0, 0, thickness * 0.5]}>
        <ringGeometry args={[innerRadius * 0.96, outerRadius * 0.98, 64]} />
        <meshStandardMaterial map={gradientMap} roughness={0.28} metalness={0.45} side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
}
