import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function Wormhole(props) {
    const meshRef = useRef()

    return (
        <group {...props}>
            <mesh ref={meshRef} scale={1.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshTransmissionMaterial
                    backside
                    samples={2} // Reduced
                    resolution={256} // Low res
                    thickness={50} // Very thick lens
                    chromaticAberration={1} // High CA for sci-fi look
                    distortion={2} // Extreme distortion to simulate bending space
                    distortionScale={1}
                    roughness={0}
                    transmission={1}
                    ior={2} // High index of refraction
                    color="#aaf0ff" // Slight blue tint
                />
            </mesh>

            {/* Rim Glow */}
            <pointLight color="#00aaff" distance={5} intensity={5} />
        </group>
    )
}
