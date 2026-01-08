import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'

export default function Portal() {
    const meshRef = useRef()

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z -= delta * 0.5
        }
    })

    return (
        <group position={[0, -30, 0]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <torusGeometry args={[2, 0.2, 16, 100]} />
                    <meshStandardMaterial
                        color="#FFD700"
                        emissive="#FFD700"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                </mesh>

                {/* Inner Particle Flow */}
                <Sparkles count={100} scale={4} size={4} speed={0.4} opacity={0.5} color="#FFD700" />
            </Float>
        </group>
    )
}
