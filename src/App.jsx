
import './App.css'
import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Loader, Stars, useTexture } from '@react-three/drei'
import { Plane } from './Plane'
import { FaGitkraken, FaGrunt, FaMapMarkerAlt } from 'react-icons/fa'
import { Marker } from './Marker'
import { Display } from './Display'
import { dataText } from './datatext'
import { useSpring, animated, config } from '@react-spring/three'

function EartSphere(props) {
  const texture = useTexture('2k_earth_daymap.jpg')
  const earthRef2 = useRef()
  const [activeB, setActiveB] = useState(false);
  const { rotate, rotateB, position } = useSpring({
    rotate: props.activeA ? props.angle : Math.PI / 2,
    rotateB: props.activeB ? Math.PI / 2 : 0,
    position: props.activeA ? [0, 0, 2] : [0, 0, 0],
    config: config.slow
  })
  useFrame((state, delta) => (earthRef2.current.rotation.y += delta * props.rotateSphere))
  return (
    <group >
      <animated.mesh scale={1.5} ref={earthRef2} rotation-y={rotate} rotation-x={rotateB} position={position} >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial map={texture} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.5} />
        <Marker rotation={[0, Math.PI / 2, 0]} position={[0, 1.3, 0]}>
          <div style={{ position: 'absolute', fontSize: 14, letterSpacing: -0.5, left: 37.5, color: 'white' }}>north</div>
          <FaMapMarkerAlt style={{ color: 'orange', scale: '3' }} onClick={props.northclick} />
        </Marker>
        <group position={[0, 0, 1.1]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
            <div style={{ position: 'absolute', fontSize: 14, letterSpacing: -0.5, left: 37.5, color: 'white' }}>kraken base</div>
            <FaGitkraken className='ikon' style={{ color: 'indianred', scale: '3' }} onClick={props.krakenclick} />
          </Marker>
        </group>
        <group position={[0, 0, -1.1]} rotation={[0, 0, Math.PI]}>
          <Marker rotation={[0, Math.PI / 2, Math.PI / 2]}>
            <div style={{ position: 'absolute', fontSize: 14, letterSpacing: -0.5, left: 37.5, color: 'white' }}>corsar group</div>
            <FaGrunt className='ikon' style={{ color: 'indianred', scale: '3' }} onClick={props.gruntclick} />
          </Marker>
        </group>
      </animated.mesh>

    </group>
  )
}
function PlaneMoving() {

  const earthRef2 = useRef()
  useFrame((state, delta) => (earthRef2.current.rotation.y += delta * 0.3))
  return (
    <group ref={earthRef2}>
      <Plane position={[0, 0, 0]} />
    </group>
  )
}



export default function App() {

  const [visabilityDisplay, setVisabitityDisplay] = useState('hidden')
  const [innerdatashow, setInnerdatashow] = useState(dataText[0])
  const [rotateS, setRotateS] = useState(0.1)
  const [rotationIni, setRotationIni] = useState(Math.PI / 2)
  const [animacja1, setAnimacja1] = useState(false)
  const [angleanimacja1, setAngleanimacja1] = useState(0)
  const [animacja2, setAnimacja2] = useState(false);

  const orbitref = useRef();




  return (
    <>
      <Canvas>

        <ambientLight />
        <Environment files="kloppenheim_02_puresky_1k_dark.hdr" background={true} blur={0.1} />
        <Suspense fallback={null}>
          <EartSphere position={[0, 0, 0]}
            krakenclick={(e) => {
              setVisabitityDisplay('visible'),
                setInnerdatashow(dataText[0]),
                setRotateS(0),
                setAngleanimacja1(0)
              setAnimacja1(true)
              setAnimacja2(false)
              orbitref.current.reset()
            }}
            gruntclick={(e) => {
              setVisabitityDisplay('visible'),
                setInnerdatashow(dataText[1]),
                setRotateS(0),
                setAngleanimacja1(Math.PI)
              setAnimacja1(true)
              setAnimacja2(false)
              orbitref.current.reset()
            }}
            northclick={() => { setAnimacja2(!animacja2) }}
            rotateSphere={rotateS}
            angle={angleanimacja1}
            activeA={animacja1}
            activeB={animacja2}
          />
          <PlaneMoving position={[0, 0, 0]} />

          <OrbitControls
            ref={orbitref}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
      <Display isVisible={visabilityDisplay}
        closeDisplay={(e) => {
          setVisabitityDisplay('hidden'),
            setRotateS(0.1),
            //setRotationIni(Math.PI / 2),
            setAnimacja1(false)
          orbitref.current.reset()
        }}
        content2={innerdatashow}
      />
      <Loader />
    </>
  )
}

