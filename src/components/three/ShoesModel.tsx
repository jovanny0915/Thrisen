"use client";

import { useEffect, useMemo, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import * as THREE from "three";

const MODEL_URL = "/models/shoes/Untitled.fbx";
const TEXTURE_BASE_PATH = "/models/shoes";
const COLOR_BASE_NAMES = ["shoes_basecolor", "shoes_albedo", "shoes_diffuse", "shoes_color"];
const NORMAL_BASE_NAMES = ["shoes_normal", "shoes_nor", "shoes_n"];
const ROUGHNESS_BASE_NAMES = ["shoes_roughness", "shoes_rough", "shoes_r"];
const METALNESS_BASE_NAMES = ["shoes_metallic", "shoes_metalness", "shoes_m"];
const AO_BASE_NAMES = ["shoes_ao", "shoes_occlusion"];
const TEXTURE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

type ShoesModelProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

type FBXGroup = THREE.Group;

type ShoesTextures = {
  colorMap: THREE.Texture | null;
  normalMap: THREE.Texture | null;
  roughnessMap: THREE.Texture | null;
  metalnessMap: THREE.Texture | null;
  aoMap: THREE.Texture | null;
};

function setMapDefaults(texture: THREE.Texture, isColorMap = false) {
  texture.colorSpace = isColorMap ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
}

async function loadTextureFromBaseNames(
  loader: THREE.TextureLoader,
  baseNames: string[],
): Promise<THREE.Texture | null> {
  for (const baseName of baseNames) {
    for (const extension of TEXTURE_EXTENSIONS) {
      const url = `${TEXTURE_BASE_PATH}/${baseName}${extension}`;
      const texture = await new Promise<THREE.Texture | null>((resolve) => {
        loader.load(
          url,
          (loadedTexture) => resolve(loadedTexture),
          undefined,
          () => resolve(null),
        );
      });
      if (texture) return texture;
    }
  }

  return null;
}

export default function ShoesModel({
  position = [-4, -1, 0],
  rotation = [0, Math.PI / 5, 0],
  scale = 0.05,
}: ShoesModelProps) {
  const obj = useLoader(FBXLoader, MODEL_URL) as FBXGroup;
  const [textures, setTextures] = useState<ShoesTextures>({
    colorMap: null,
    normalMap: null,
    roughnessMap: null,
    metalnessMap: null,
    aoMap: null,
  });

  const groundedOffset = useMemo(() => {
    const bounds = new THREE.Box3().setFromObject(obj);
    return -bounds.min.y;
  }, [obj]);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();

    const loadTextures = async () => {
      const [colorMap, normalMap, roughnessMap, metalnessMap, aoMap] = await Promise.all([
        loadTextureFromBaseNames(loader, COLOR_BASE_NAMES),
        loadTextureFromBaseNames(loader, NORMAL_BASE_NAMES),
        loadTextureFromBaseNames(loader, ROUGHNESS_BASE_NAMES),
        loadTextureFromBaseNames(loader, METALNESS_BASE_NAMES),
        loadTextureFromBaseNames(loader, AO_BASE_NAMES),
      ]);

      if (cancelled) return;

      if (colorMap) setMapDefaults(colorMap, true);
      if (normalMap) setMapDefaults(normalMap);
      if (roughnessMap) setMapDefaults(roughnessMap);
      if (metalnessMap) setMapDefaults(metalnessMap);
      if (aoMap) setMapDefaults(aoMap);

      setTextures({ colorMap, normalMap, roughnessMap, metalnessMap, aoMap });
    };

    void loadTextures();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    obj.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const material = new THREE.MeshStandardMaterial({
        map: textures.colorMap,
        normalMap: textures.normalMap,
        roughnessMap: textures.roughnessMap,
        metalnessMap: textures.metalnessMap,
        aoMap: textures.aoMap,
        roughness: textures.roughnessMap ? 1 : 0.65,
        metalness: textures.metalnessMap ? 1 : 0.15,
      });

      mesh.material = material;
    });
  }, [obj, textures.aoMap, textures.colorMap, textures.metalnessMap, textures.normalMap, textures.roughnessMap]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={obj} position={[0, groundedOffset, 0]} />
    </group>
  );
}
