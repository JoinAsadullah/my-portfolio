import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import {Effects, useLoader, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Suspense , useRef, useEffect } from "react";
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";
import {useAnimations } from '@react-three/drei'


export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Rotatingbox.gltf')
  const { actions, names } = useAnimations(animations, group)
  useEffect(() =>{actions[names[0]].play()}, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Light001" position={[4.08, 5.9, -1.01]} rotation={[1.89, 0.88, -2.05]} />
        <group name="Camera001" position={[7.36, 4.96, 6.93]} rotation={[1.24, 0.33, -0.76]} />
        <mesh name="Cube" geometry={nodes.Cube.geometry}  material={materials['Material.001']} position={[0, 0, 0.06]} />
      </group>
    </group>
  )
}

useGLTF.preload('/Rotatingbox.gltf')



export default function Appp() {
  return (
    <div className="App">
      <Canvas onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }}>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
        </Suspense>

      </Canvas>

    </div>
  );
}
