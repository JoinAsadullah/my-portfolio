import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense , useRef, useEffect } from "react";
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";


function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/d.gltf')
  const { actions, names} = useAnimations(animations, group)

useEffect(() =>{ animations.forEach((clip) => { actions[clip.name].play() })}, [animations, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene" scale={0.4}>
        <mesh name="Circle" geometry={nodes.Circle.geometry} material={materials['Material.010']} scale={6.13}>
          <mesh name="Icosphere002" geometry={nodes.Icosphere002.geometry} material={materials['Material.008']} position={[1, 0, 0]} scale={0.06} />
        </mesh>
        <mesh name="Circle643" geometry={nodes.Circle643.geometry} material={materials['Material.004']} scale={4.79} />
        <mesh name="Sphere002" geometry={nodes.Sphere002.geometry} material={materials['Material.006']} rotation={[Math.PI, -0.13, Math.PI]} scale={0.97} />
        <mesh name="TERRE1" geometry={nodes.TERRE1.geometry} material={materials['Material.005']} scale={3.27} />
        <mesh name="Circle455" geometry={nodes.Circle455.geometry} material={materials['Material.007']} morphTargetDictionary={nodes.Circle455.morphTargetDictionary} morphTargetInfluences={nodes.Circle455.morphTargetInfluences} scale={0.18} />
      </group>
    </group>
  )
}

useGLTF.preload('/d.gltf')




export default function Earth() {
  return (
    <Canvas flat> 

      <Suspense fallback={null}>
        <Model />
        <OrbitControls enableZoom={true} />
      </Suspense>
      <EffectComposer multisampling={0} >
        <Bloom intensity={.3} luminanceThreshold={0.1} luminanceSmoothing={0}/>
        <SSAO />
      </EffectComposer>
      <Preload all />

    </Canvas>
  );
}
