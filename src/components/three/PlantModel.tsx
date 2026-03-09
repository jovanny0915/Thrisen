"use client";

import { useEffect, useMemo, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

const MODEL_URL = "/models/eb_house_plant_02/eb_house_plant_02.obj";
const TEXTURE_BASE_PATH = "/models/eb_house_plant_02";
const COLOR_BASE_NAME = "eb_house_plant_02_c";
const PACKED_BASE_NAME = "eb_house_plant_02_g";
const NORMAL_BASE_NAME = "eb_house_plant_02_n";
const TEXTURE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".tga"];

type PlantModelProps = {
  position?: [number, number, number];
};

type OBJGroup = THREE.Group;

type PlantTextures = {
  colorMap: THREE.Texture | null;
  normalMap: THREE.Texture | null;
  packedMap: THREE.Texture | null;
};

function setMapDefaults(texture: THREE.Texture, isColorMap = false) {
  if (isColorMap) {
    texture.colorSpace = THREE.SRGBColorSpace;
  } else {
    texture.colorSpace = THREE.NoColorSpace;
  }
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
}

function createSingleChannelTexture(source: THREE.Texture, channelIndex: 0 | 1 | 2): THREE.Texture | null {
  const image = source.image as
    | HTMLImageElement
    | HTMLCanvasElement
    | ImageBitmap
    | { width?: number; height?: number }
    | undefined;

  const width = image?.width ?? 0;
  const height = image?.height ?? 0;
  if (!width || !height) return null;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  context.drawImage(image as CanvasImageSource, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const channelValue = data[i + channelIndex];
    data[i] = channelValue;
    data[i + 1] = channelValue;
    data[i + 2] = channelValue;
    data[i + 3] = 255;
  }

  context.putImageData(imageData, 0, 0);

  const channelTexture = new THREE.CanvasTexture(canvas);
  channelTexture.flipY = source.flipY;
  channelTexture.wrapS = source.wrapS;
  channelTexture.wrapT = source.wrapT;
  channelTexture.repeat.copy(source.repeat);
  channelTexture.offset.copy(source.offset);
  channelTexture.rotation = source.rotation;
  channelTexture.center.copy(source.center);
  channelTexture.minFilter = source.minFilter;
  channelTexture.magFilter = source.magFilter;
  channelTexture.generateMipmaps = source.generateMipmaps;
  channelTexture.colorSpace = THREE.NoColorSpace;
  channelTexture.needsUpdate = true;

  return channelTexture;
}

async function loadTextureWithFallback(
  loader: THREE.TextureLoader,
  baseName: string,
): Promise<THREE.Texture | null> {
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

  console.warn(`[PlantModel] Missing texture for base name: ${baseName}`);
  return null;
}

export default function PlantModel({ position = [10, 10, 10] }: PlantModelProps) {
  const obj = useLoader(OBJLoader, MODEL_URL) as OBJGroup;
  const [textures, setTextures] = useState<PlantTextures>({
    colorMap: null,
    normalMap: null,
    packedMap: null,
  });

  const extractedMaps = useMemo(() => {
    const packedMap = textures.packedMap;
    if (!packedMap) {
      return { roughnessMap: null, metalnessMap: null, opacityMap: null };
    }

    // Source spec: roughness=R, metal=G, opacity=B.
    return {
      roughnessMap: createSingleChannelTexture(packedMap, 0),
      metalnessMap: createSingleChannelTexture(packedMap, 1),
      opacityMap: createSingleChannelTexture(packedMap, 2),
    };
  }, [textures.packedMap]);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();

    const loadTextures = async () => {
      const [colorMap, normalMap, packedMap] = await Promise.all([
        loadTextureWithFallback(loader, COLOR_BASE_NAME),
        loadTextureWithFallback(loader, NORMAL_BASE_NAME),
        loadTextureWithFallback(loader, PACKED_BASE_NAME),
      ]);

      if (cancelled) return;

      if (colorMap) setMapDefaults(colorMap, true);
      if (normalMap) setMapDefaults(normalMap);
      if (packedMap) setMapDefaults(packedMap);

      setTextures({ colorMap, normalMap, packedMap });
    };

    void loadTextures();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const material = new THREE.MeshStandardMaterial({
          map: textures.colorMap,
          normalMap: textures.normalMap,
          roughnessMap: extractedMaps.roughnessMap,
          metalnessMap: extractedMaps.metalnessMap,
          alphaMap: extractedMaps.opacityMap,
          alphaTest: extractedMaps.opacityMap ? 0.5 : 0,
          transparent: Boolean(extractedMaps.opacityMap),
          side: THREE.DoubleSide,
          roughness: 0.8,
          metalness: 0.1,
        });

        mesh.material = material;
      }
    });
  }, [obj, extractedMaps.metalnessMap, extractedMaps.opacityMap, extractedMaps.roughnessMap, textures.colorMap, textures.normalMap]);

  return (
    <group position={position} scale={0.08}>
      <primitive object={obj} />
    </group>
  );
}
