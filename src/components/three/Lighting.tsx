"use client";

/**
 * Bright sunny daytime lighting with strong overhead sun and gentle fill.
 */
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight
        position={[60, 140, 25]}
        intensity={3.6}
        color="#fff7e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={300}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[-10, 6, 6]} intensity={0.7} color="#fff3cf" />
      <directionalLight position={[10, 6, 6]} intensity={0.65} color="#e6f2ff" />
    </>
  );
}
