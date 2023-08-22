
import './App.css'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Loader, Stars, useTexture } from '@react-three/drei'
import { Plane } from './Plane'
import { FaGitkraken, FaGrunt, FaMapMarkerAlt } from 'react-icons/fa'
import { Marker } from './Marker'


function EartSphere() {
  const texture = useTexture('2k_earth_daymap.jpg')
  const earthRef2 = useRef()
  useFrame((state, delta) => (earthRef2.current.rotation.y += delta * 0.1))
  return (
    <group ref={earthRef2}>
      <mesh scale={1.5}  >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial map={texture} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.5} />
        <Marker  rotation={[0, Math.PI / 2, 0]} position={[0, 1.3, 0]}>
        <div style={{ position: 'absolute', fontSize: 14, letterSpacing: -0.5, left: 37.5, color: 'white' }}>north</div>
          <FaMapMarkerAlt style={{ color: 'orange', scale:'3' }} />
        </Marker>
        <group position={[0, 0, 1.1]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <div style={{ position: 'absolute', fontSize: 14, letterSpacing: -0.5, left: 37.5, color:'white' }}>kraken base</div>
            <FaGitkraken style={{ color: 'indianred', scale:'3' }} />
          </Marker>
        </group>
        <group position={[0, 0, -1.1]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <div style={{ position: 'absolute', fontSize: 14, letterSpacing: -0.5, left: 37.5, color:'white' }}>corsar group</div>
            <FaGrunt style={{ color: 'indianred', scale:'3' }} />
          </Marker>
        </group>
      </mesh>
      {/* <Box position={[2, 0, 0]} /> */}
      {/* <Plane position={[0, 0, 0]} /> */}
    </group>
  )
}
function PlaneMoving() {
  
  const earthRef2 = useRef()
  useFrame((state, delta) => (earthRef2.current.rotation.y += delta * 0.3))
  return (
    <group ref={earthRef2}>
      {/* <mesh scale={1.5}  >
        <sphereGeometry args={[0.2, 64, 64]} />
        <meshStandardMaterial  />
      </mesh> */}
      {/* <Box position={[2, 0, 0]} /> */}
      <Plane position={[0, 0, 0]} />
    </group>
  )
}



export default function App() {
  return (
    <>
      <Canvas>

        <ambientLight />
        <Environment files="kloppenheim_02_puresky_1k_dark.hdr" background={true} blur={0.1} />
        <Suspense fallback={null}>
          <EartSphere position={[0, 0, 0]} />
          <PlaneMoving position={[0, 0, 0]} />
          <OrbitControls
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}

