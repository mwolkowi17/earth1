import { useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'


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