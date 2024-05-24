// src/components/VRGallery/VRGallery.jsx
import React, { useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Extend THREE namespace with BoxBufferGeometry
extend({ BoxBufferGeometry: THREE.BoxGeometry });

export default function VRGallery({ artworks }) {
  useEffect(() => {
    console.log('Artworks in VRGallery:', artworks); // Debug
  }, [artworks]);

  return (
    <div className="canvas-container">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {artworks.map((artwork, index) => (
          <mesh key={artwork._id} position={[index * 2, 0, 0]}>
            <boxBufferGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color="white" />
            <Html position={[0, 1, 0]}>
              <img src={artwork.image.url} alt={artwork.title} style={{ width: '100px' }} />
              <div style={{ color: 'white' }}>{artwork.title}</div>
            </Html>
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}
