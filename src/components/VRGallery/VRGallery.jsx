// src/components/VRGallery/VRGallery.jsx
import React, { useRef } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react';
import { useSpring, a } from '@react-spring/three';

// Extend THREE namespace with geometries and materials
extend({
  BoxBufferGeometry: THREE.BoxGeometry,
  PlaneBufferGeometry: THREE.PlaneGeometry,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
});

function GalleryRoom({ artworks }) {
  const floorTexture = useTexture('/path/to/floor_texture.png');
  const wallTexture = useTexture('/path/to/wall_texture.png');

  return (
    <>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeBufferGeometry args={[20, 20]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 4, -10]}>
        <planeBufferGeometry args={[20, 10]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh rotation-y={Math.PI / 2} position={[-10, 4, 0]}>
        <planeBufferGeometry args={[20, 10]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh rotation-y={-Math.PI / 2} position={[10, 4, 0]}>
        <planeBufferGeometry args={[20, 10]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      <mesh position={[0, 4, 10]}>
        <planeBufferGeometry args={[20, 10]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation-x={Math.PI / 2} position={[0, 9, 0]}>
        <planeBufferGeometry args={[20, 20]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      {/* Artworks */}
      {artworks.map((artwork, index) => (
        <mesh key={artwork._id} position={[index % 5 * 4 - 8, 4, -9.5]}>
          <boxBufferGeometry args={[3, 3, 0.1]} />
          <meshStandardMaterial color="white" />
          <Html position={[0, 0, 0.06]}>
            <img src={artwork.image.url} alt={artwork.title} style={{ width: '200px' }} />
            <div style={{ color: 'black', textAlign: 'center' }}>{artwork.title}</div>
          </Html>
        </mesh>
      ))}
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
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Controls />
        <GalleryRoom artworks={artworks} />
      </Canvas>
    </div>
  );
}
