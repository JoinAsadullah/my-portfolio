import * as THREE from 'three';
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense , useRef, useEffect } from "react";
import { EffectComposer, SSAO, Bloom, DepthOfField } from "@react-three/postprocessing";



function Model(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/Rotatingbox.gltf')
    const { actions, names } = useAnimations(animations, group)
    useEffect(() =>{actions[names[0]].play()}, [])
    return (
        <>
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
            <group name="Light001" position={[4.08, 5.9, -1.01]} rotation={[1.89, 0.88, -2.05]} />
            <group name="Camera001" position={[7.36, 4.96, 6.93]} rotation={[1.24, 0.33, -0.76]} />
            <mesh name="Cube" geometry={nodes.Cube.geometry}  material={materials['Material.001']} position={[0, 0, 0.06]} />
            </group>
        </group>
        </>
    )
  }
  
  useGLTF.preload('/Rotatingbox.gltf')



  export default function Box() {
    return (
      <Canvas frameloop="always" flat>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls enableZoom={false} />
        </Suspense>
        <EffectComposer multisampling={0} >
            <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={1}  />
            <SSAO />
        </EffectComposer>
      </Canvas>
    );
  }
  