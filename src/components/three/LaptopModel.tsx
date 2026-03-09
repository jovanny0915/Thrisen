"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const MODEL_URL = "/models/ASUS Laptop.glb";

type LaptopModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

export default function LaptopModel({
  position = [4, -1, 1],
  rotation = [0, -Math.PI / 5, 0],
  scale = 0.7,
}: LaptopModelProps) {
  const gltf = useLoader(GLTFLoader, MODEL_URL);
  const obj = gltf.scene as THREE.Group;


  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={obj} position={[0, 0, 0]} />
    </group>
  );
}
