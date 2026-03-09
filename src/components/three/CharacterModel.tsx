"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useFBX, useAnimations } from "@react-three/drei";
import { useCharacterAnimation } from "@/hooks/useCharacterAnimation";
import * as THREE from "three";

const MODEL_URL = "/models/character.fbx";
const IDLE_CLIP = "Idle";
const RUN_CLIP = "Run";
const CROSSFADE = 0.25;

/** Scale of the FBX character in the scene (centered on seam). */
const CHARACTER_SCALE = 0.04;

/** FBX root can have .animations attached by FBXLoader at runtime */
type FBXWithAnimations = THREE.Group & { animations?: THREE.AnimationClip[] };

/**
 * Character from .fbx: starts still; Run + orient left/right only after click.
 * Expects clips named "Idle" and "Run" (or first available as fallback).
 */
export default function CharacterModel() {
  const fbx = useFBX(MODEL_URL) as FBXWithAnimations;
  const animations = fbx.animations ?? [];
  const fbxRef = useRef<THREE.Object3D>(fbx);
  fbxRef.current = fbx;
  const { actions, names } = useAnimations(animations, fbxRef);
  const { direction: runDirection, isRunning, persona } = useCharacterAnimation();

  const idleName = names.includes(IDLE_CLIP) ? IDLE_CLIP : names[0] ?? null;
  const runName = names.includes(RUN_CLIP) ? RUN_CLIP : names[1] ?? names[0] ?? null;

  useEffect(() => {
    // Ensure all FBX meshes can project shadows onto the ground.
    fbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [fbx]);

  useEffect(() => {
    if (!idleName && !runName) return;

    if (isRunning && runName && actions[runName]) {
      actions[runName].reset().fadeIn(CROSSFADE).play();
      if (idleName && actions[idleName]) actions[idleName].fadeOut(CROSSFADE);
    } else {
      // Stay fully static before click: do not play idle or hover motion.
      Object.values(actions).forEach((a) => a?.stop());
    }

    return () => {
      Object.values(actions).forEach((a) => a?.stop());
    };
  }, [isRunning, actions, idleName, runName]);

  useFrame((_, delta) => {
    const targetY = isRunning && runDirection ? (runDirection === "left" ? -Math.PI * 0.5 : Math.PI * 0.5) : 0;
    fbx.rotation.y = THREE.MathUtils.lerp(fbx.rotation.y, targetY, delta * 3);
  });

  return (
    <group position={[0, -1.5, 0]} scale={CHARACTER_SCALE}>
      <primitive object={fbx} />
      {persona === "professional-tech" && (
        <mesh position={[0.35, 2.1, 0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.35, 0.12, 0.18]} />
          <meshStandardMaterial color="#67e8f9" emissive="#155e75" emissiveIntensity={0.4} />
        </mesh>
      )}
      {persona === "personal-casual" && (
        <mesh position={[-0.35, 1.2, 0.3]} castShadow receiveShadow>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#f97316" emissive="#9a3412" emissiveIntensity={0.35} />
        </mesh>
      )}
    </group>
  );
}
