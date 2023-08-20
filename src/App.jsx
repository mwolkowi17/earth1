
import './App.css'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls,Environment,useGLTF,Stars,useTexture } from '@react-three/drei'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[.3, .3, .3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Earth(){
  const { nodes, materials } = useGLTF('/earth.gltf')
  const earthRef = useRef()
  useFrame((state, delta) => (earthRef.current.rotation.y += delta*0.2))
  return (
    <group  ref={earthRef} scale={2} >
    <mesh rotation={[-Math.PI / 2, 0, Math.PI]} geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice } />
    <mesh rotation={[-Math.PI / 2, 0, Math.PI]} geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0}/>
    <mesh rotation={[-Math.PI / 2, 0, Math.PI]} geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} />
    <Box position={[2,0,0]} />
    </group>
  )
}

function EartSphere(){
  const texture = useTexture('2k_earth_daymap.jpg')
  const earthRef2 = useRef()
  useFrame((state, delta) => (earthRef2.current.rotation.y += delta*0.2))
  return (
    <group ref={earthRef2}>
    <mesh  >
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial map={texture} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.5} />
    </mesh>
    <Box position={[2,0,0]} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas>
       <Environment files="kloppenheim_02_puresky_1k_dark.hdr" background={true} blur={0.1}/>
      {/* <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} /> */}
      {/* <Box position={[0, 0, 0]} />     */}
      {/* <Earth position={[0,0,0]} /> */}
      <EartSphere position={[0,0,0]} />
      <OrbitControls />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
     
    </Canvas>
    
  )
}

