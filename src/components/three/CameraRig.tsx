"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useBridgeState } from "@/hooks/useBridgeState";
import * as THREE from "three";
import { CAMERA_DEPTH, CAMERA_HEIGHT, CAMERA_LOOK_AT_Y } from "./cameraConfig";

/**
 * Camera frames scene from a shallow top-down angle (~30deg); pans left/right when running.
 */
const PAN_AMOUNT = 2;
const LERP = 0.04;

export default function CameraRig() {
  const { camera } = useThree();
  const targetX = useRef(0);
  const { worldTarget, phase } = useBridgeState();

  useFrame(() => {
    if (phase === "running" && worldTarget === "personal") targetX.current = -PAN_AMOUNT;
    else if (phase === "running" && worldTarget === "professional") targetX.current = PAN_AMOUNT;
    else targetX.current = 0;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX.current, LERP);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, CAMERA_HEIGHT, LERP);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, CAMERA_DEPTH, LERP);
    camera.lookAt(0, CAMERA_LOOK_AT_Y, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}
