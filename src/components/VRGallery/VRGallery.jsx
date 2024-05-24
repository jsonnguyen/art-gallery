// src/components/VRGallery/VRGallery.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

export default function VRGallery({ artworks }) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {artworks.map((artwork, index) => (
        <mesh key={artwork._id} position={[index * 2, 0, 0]}>
          <boxBufferGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color="white" />
          <Html>
            <img src={artwork.image.url} alt={artwork.title} style={{ width: '100px' }} />
            <div style={{ color: 'white' }}>{artwork.title}</div>
          </Html>
        </mesh>
      ))}
    </Canvas>
  );
}
