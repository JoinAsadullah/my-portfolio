import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Suspense , useRef, useEffect } from "react";

const Model = () => {
  const gltf = useGLTF("./eeee.gltf");
  return (
    <>
      <primitive
       object={gltf.scene} scale={.0055} />
    </>
  );
};



export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <Model />
          <ambientLight />
          <OrbitControls />
        </Suspense>
        <Preload all />
      </Canvas>

    </div>
  );
}

