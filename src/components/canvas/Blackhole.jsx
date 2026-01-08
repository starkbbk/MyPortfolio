import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function Blackhole(props) {
    const diskRef = useRef()

    useFrame((state, delta) => {
        if (diskRef.current) {
            diskRef.current.rotation.z -= delta * 0.5 // Rotate accretion disk
        }
    })

    return (
        <group {...props}>
            {/* Event Horizon (Pure Black Sphere) */}
            <mesh scale={1}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Accretion Disk (Glowing Ring) */}
            <mesh ref={diskRef} rotation={[Math.PI / 2.5, 0, 0]}>
                <ringGeometry args={[1.5, 4, 128]} />
                {/* Simple gradient texture or just emissive color for now */}
                <meshStandardMaterial
                    color="#ffaa00"
                    emissive="#ff5500"
                    emissiveIntensity={4}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Gravitational Lensing Shell */}
            {/* A larger sphere with transmission to distort background stars */}
            <mesh scale={3}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshTransmissionMaterial
                    backside
                    samples={2} // Reduced samples
                    resolution={256} // Low resolution buffer
                    thickness={2}
                    chromaticAberration={0.5}
                    anisotropy={0.1}
                    distortion={1} // Heavy distortion
                    distortionScale={1}
                    temporalDistortion={0}
                    iridescence={0}
                    roughness={0}
                    transmission={1}
                    color="#ffffff"
                />
            </mesh>
        </group>
    )
}
