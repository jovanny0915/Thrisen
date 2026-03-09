"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

const MODEL_URL = "/models/cabinet.obj";
const CABINET_BODY_COLOR = "#6b7280";
const DRAWER_COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6"];

type CabinetModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
};

type OBJGroup = THREE.Group;

export default function CabinetModel({
  position = [-30, 0, -22],
  rotation = [0, Math.PI/2, 0],
}: CabinetModelProps) {
  const obj = useLoader(OBJLoader, MODEL_URL) as OBJGroup;

  const fitTransform = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    bounds.getSize(size);

    const centerX = (bounds.min.x + bounds.max.x) * 0.5;
    const centerZ = (bounds.min.z + bounds.max.z) * 0.5;
    const scale = 0.02;

    return {
      scale,
      offset: [-centerX, -bounds.min.y, -centerZ] as [number, number, number],
    };
  }, [obj]);

  useEffect(() => {
    const bounds = new THREE.Box3().setFromObject(obj);
    const overallSize = new THREE.Vector3();
    bounds.getSize(overallSize);
    const frontThreshold = bounds.max.z - overallSize.z * 0.12;

    const drawerCandidates: THREE.Mesh[] = [];

    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.material = new THREE.MeshStandardMaterial({
          color: CABINET_BODY_COLOR,
          roughness: 0.65,
          metalness: 0.35,
        });

        const meshBounds = new THREE.Box3().setFromObject(mesh);
        const meshSize = new THREE.Vector3();
        meshBounds.getSize(meshSize);

        const isFrontPanel = meshBounds.max.z >= frontThreshold;
        const isWideEnough = meshSize.x >= overallSize.x * 0.22;
        const isDrawerLikeHeight = meshSize.y >= overallSize.y * 0.06 && meshSize.y <= overallSize.y * 0.22;
        const isNotDeep = meshSize.z <= overallSize.z * 0.2;

        if (isFrontPanel && isWideEnough && isDrawerLikeHeight && isNotDeep) {
          drawerCandidates.push(mesh);
        }
      }
    });

    drawerCandidates
      .sort((a, b) => {
        const aBounds = new THREE.Box3().setFromObject(a);
        const bBounds = new THREE.Box3().setFromObject(b);
        const aCenterY = (aBounds.min.y + aBounds.max.y) * 0.5;
        const bCenterY = (bBounds.min.y + bBounds.max.y) * 0.5;
        return bCenterY - aCenterY;
      })
      .forEach((mesh, index) => {
        mesh.material = new THREE.MeshStandardMaterial({
          color: DRAWER_COLORS[index % DRAWER_COLORS.length],
          roughness: 0.5,
          metalness: 0.2,
        });
      });
  }, [obj]);

  return (
    <group position={position} rotation={rotation} scale={fitTransform.scale}>
      <primitive object={obj} position={fitTransform.offset} />
    </group>
  );
}
