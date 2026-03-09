"use client";

import { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { AdditiveBlending, DoubleSide, SRGBColorSpace, Texture } from "three";

const GROUND_WIDTH = 40;
const GROUND_HEIGHT = 50;
const GROUND_ASPECT = GROUND_WIDTH / GROUND_HEIGHT;
const TOTAL_GROUND_DEPTH = GROUND_HEIGHT;
const GROUND_Y = -1.35;
const WALL_HEIGHT = 7;
const WALL_THICKNESS = 0.6;
const LEFT_WALL_COLOR = "#f4f4f4";
const RIGHT_WALL_COLOR = "#000000";
const DIVIDER_LINE_WIDTH = 0.12;
const DIVIDER_GLOW_WIDTH = 0.65;
const DIVIDER_AURA_WIDTH = 1.8;
const DIVIDER_OBJECT_WIDTH = 0.22;
const LEFT_GROUND_X = -(GROUND_WIDTH * 0.5 + DIVIDER_OBJECT_WIDTH * 0.5);
const RIGHT_GROUND_X = GROUND_WIDTH * 0.5 + DIVIDER_OBJECT_WIDTH * 0.5;
const TOTAL_LAYOUT_WIDTH = GROUND_WIDTH * 2 + DIVIDER_OBJECT_WIDTH;

function applyCoverUV(texture: Texture, targetAspect: number) {
  const image = texture.image as { width?: number; height?: number } | undefined;
  const imageWidth = image?.width ?? 0;
  const imageHeight = image?.height ?? 0;
  if (!imageWidth || !imageHeight) return;

  const imageAspect = imageWidth / imageHeight;
  let repeatX = 1;
  let repeatY = 1;

  if (imageAspect > targetAspect) {
    // Image is wider than panel: crop left/right.
    repeatX = targetAspect / imageAspect;
  } else {
    // Image is taller than panel: crop top/bottom.
    repeatY = imageAspect / targetAspect;
  }

  texture.repeat.set(repeatX, repeatY);
  texture.offset.set((1 - repeatX) * 0.5, (1 - repeatY) * 0.5);
  texture.needsUpdate = true;
}

/**
 * Split ground under the character:
 * left side = personal, right side = professional.
 */
export default function BridgePanels() {
  const leftBackground = useTexture("/images/left_background.png");
  const rightBackground = useTexture("/images/right_background.png");
  leftBackground.colorSpace = SRGBColorSpace;
  rightBackground.colorSpace = SRGBColorSpace;

  useEffect(() => {
    applyCoverUV(leftBackground, GROUND_ASPECT);
    applyCoverUV(rightBackground, GROUND_ASPECT);
  }, [leftBackground, rightBackground]);

  return (
    <>
      <group position={[LEFT_GROUND_X, GROUND_Y, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <mesh>
          <planeGeometry args={[GROUND_WIDTH, GROUND_HEIGHT]} />
          <meshBasicMaterial color="#ffffff" map={leftBackground} />
        </mesh>
        <mesh position={[0, 0, 0.01]} receiveShadow>
          <planeGeometry args={[GROUND_WIDTH, GROUND_HEIGHT]} />
          <shadowMaterial opacity={0.35} transparent />
        </mesh>
      </group>

      <group position={[RIGHT_GROUND_X, GROUND_Y, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <mesh>
          <planeGeometry args={[GROUND_WIDTH, GROUND_HEIGHT]} />
          <meshBasicMaterial color="#ffffff" map={rightBackground} />
        </mesh>
        <mesh position={[0, 0, 0.01]} receiveShadow>
          <planeGeometry args={[GROUND_WIDTH, GROUND_HEIGHT]} />
          <shadowMaterial opacity={0.32} transparent />
        </mesh>
      </group>

      <group>
        <mesh position={[0, GROUND_Y + 0.012, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[DIVIDER_LINE_WIDTH, TOTAL_GROUND_DEPTH]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.95}
            depthWrite={false}
            toneMapped={false}
            blending={AdditiveBlending}
            side={DoubleSide}
          />
        </mesh>
        <mesh position={[0, GROUND_Y + 0.011, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[DIVIDER_GLOW_WIDTH, TOTAL_GROUND_DEPTH]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.38}
            depthWrite={false}
            toneMapped={false}
            blending={AdditiveBlending}
            side={DoubleSide}
          />
        </mesh>
        <mesh position={[0, GROUND_Y + 0.0105, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[DIVIDER_AURA_WIDTH, TOTAL_GROUND_DEPTH]} />
          <meshBasicMaterial
            color="#e9f6ff"
            transparent
            opacity={0.14}
            depthWrite={false}
            toneMapped={false}
            blending={AdditiveBlending}
            side={DoubleSide}
          />
        </mesh>
        <pointLight position={[0, GROUND_Y + 0.55, 0]} intensity={2.2} distance={18} color="#ffffff" />
        <pointLight position={[0, GROUND_Y + 0.35, -12]} intensity={1.05} distance={12} color="#f4fbff" />
        <pointLight position={[0, GROUND_Y + 0.35, 12]} intensity={1.05} distance={12} color="#f4fbff" />
        <mesh
          position={[LEFT_GROUND_X, GROUND_Y + WALL_HEIGHT * 0.5, TOTAL_GROUND_DEPTH * 0.5 + WALL_THICKNESS * 0.5]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[GROUND_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={LEFT_WALL_COLOR} roughness={0.86} metalness={0.08} />
        </mesh>
        <mesh
          position={[RIGHT_GROUND_X, GROUND_Y + WALL_HEIGHT * 0.5, TOTAL_GROUND_DEPTH * 0.5 + WALL_THICKNESS * 0.5]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[GROUND_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={RIGHT_WALL_COLOR} roughness={0.86} metalness={0.08} />
        </mesh>
        <mesh
          position={[LEFT_GROUND_X, GROUND_Y + WALL_HEIGHT * 0.5, -(TOTAL_GROUND_DEPTH * 0.5 + WALL_THICKNESS * 0.5)]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[GROUND_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={LEFT_WALL_COLOR} roughness={0.86} metalness={0.08} />
        </mesh>
        <mesh
          position={[RIGHT_GROUND_X, GROUND_Y + WALL_HEIGHT * 0.5, -(TOTAL_GROUND_DEPTH * 0.5 + WALL_THICKNESS * 0.5)]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[GROUND_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
          <meshStandardMaterial color={RIGHT_WALL_COLOR} roughness={0.86} metalness={0.08} />
        </mesh>
        <mesh
          position={[TOTAL_LAYOUT_WIDTH * 0.5 + WALL_THICKNESS * 0.5, GROUND_Y + WALL_HEIGHT * 0.5, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, TOTAL_GROUND_DEPTH]} />
          <meshStandardMaterial color={RIGHT_WALL_COLOR} roughness={0.86} metalness={0.08} />
        </mesh>
        <mesh
          position={[-(TOTAL_LAYOUT_WIDTH * 0.5 + WALL_THICKNESS * 0.5), GROUND_Y + WALL_HEIGHT * 0.5, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, TOTAL_GROUND_DEPTH]} />
          <meshStandardMaterial color={LEFT_WALL_COLOR} roughness={0.86} metalness={0.08} />
        </mesh>
      </group>
    </>
  );
}
