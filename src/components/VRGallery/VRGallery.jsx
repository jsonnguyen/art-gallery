// src/components/VRGallery/VRGallery.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react';
import { useSpring, a } from '@react-spring/three';

extend({
  BoxBufferGeometry: THREE.BoxGeometry,
  PlaneBufferGeometry: THREE.PlaneGeometry,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
});

function GalleryRoom({ artworks }) {
  const floorTexture = useTexture('/path/to/floor_texture.png');
  const wallTexture = useTexture('/path/to/wall_texture.png');

  const wallPositions = [
    { position: [0, 4, -9.5], rotation: [0, 0, 0] }, // Back wall
    { position: [-9.5, 4, 0], rotation: [0, Math.PI / 2, 0] }, // Left wall
    { position: [9.5, 4, 0], rotation: [0, -Math.PI / 2, 0] }, // Right wall
    { position: [0, 4, 9.5], rotation: [0, Math.PI, 0] }, // Front wall
  ];

  return (
    <>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeBufferGeometry args={[20, 20]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      {/* Walls */}
      {wallPositions.map((wall, index) => (
        <mesh key={index} position={wall.position} rotation={wall.rotation}>
          <planeBufferGeometry args={[20, 10]} />
          <meshStandardMaterial map={wallTexture} />
        </mesh>
      ))}
      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, 9, 0]}>
        <planeBufferGeometry args={[20, 20]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Artworks */}
      {artworks.map((artwork, index) => {
        const wallIndex = Math.floor(Math.random() * wallPositions.length);
        const offset = (index % 5) * 4 - 8;
        const position = wallPositions[wallIndex].position;
        const rotation = wallPositions[wallIndex].rotation;

        return (
          <mesh key={artwork._id} position={[position[0] + offset, position[1], position[2]]} rotation={rotation}>
            <boxBufferGeometry args={[3, 3, 0.1]} />
            <meshStandardMaterial color="white" />
            <Html position={[0, 0, 0.06]}>
              <img src={artwork.image.url} alt={artwork.title} style={{ width: '200px' }} />
              <div style={{ color: 'black', textAlign: 'center' }}>{artwork.title}</div>
            </Html>
          </mesh>
        );
      })}
    </>
  );
}

function LightSwitch({ position, isOn, toggleLight }) {
  return (
    <>
      <mesh position={position} onClick={toggleLight}>
        <sphereBufferGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={isOn ? 'yellow' : 'gray'} />
      </mesh>
      {isOn && <pointLight position={position} intensity={1} />}
    </>
  );
}

function Controls() {
  const ref = useRef();
  const [, set] = useSpring(() => ({ position: [0, 0, 0], rotation: [0, 0, 0] }));

  const bind = useDrag(({ offset: [x, y], memo = ref.current.position }) => {
    set.start({ position: [memo.x + x / 100, memo.y, memo.z + y / 100] });
    return memo;
  });

  useFrame(() => ref.current && ref.current.update());

  return (
    <OrbitControls ref={ref} {...bind()} />
  );
}

export default function VRGallery({ artworks }) {
  const [lights, setLights] = useState([false, false, false]);

  const toggleLight = (index) => {
    setLights((prevLights) => {
      const newLights = [...prevLights];
      newLights[index] = !newLights[index];
      return newLights;
    });
  };

  useEffect(() => {
    console.log('Artworks in VRGallery:', artworks); // Debug
  }, [artworks]);

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Controls />
        <GalleryRoom artworks={artworks} />
        <LightSwitch position={[5, 5, -5]} isOn={lights[0]} toggleLight={() => toggleLight(0)} />
        <LightSwitch position={[-5, 5, -5]} isOn={lights[1]} toggleLight={() => toggleLight(1)} />
        <LightSwitch position={[0, 5, 5]} isOn={lights[2]} toggleLight={() => toggleLight(2)} />
      </Canvas>
    </div>
  );
}
