import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function Plane() {
    const gltf = useLoader(GLTFLoader, 'samolot1.glb')
    return <primitive object={gltf.scene} scale={.1}  position={[2,0,0]} rotation={[0,-Math.PI/2,0]}/>
  }