import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

export default function Creature() {
    const group = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (group.current) {
            // Flapping motion
            group.current.rotation.z = Math.sin(t) * 0.1
            group.current.position.y = Math.sin(t * 2) * 0.5 - 20 // Base Y is -20
        }
    })

    return (
        <group position={[0, -20, 0]}>
            <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
                <group ref={group}>
                    {/* Body */}
                    <mesh>
                        <octahedronGeometry args={[1, 0]} />
                        <meshPhysicalMaterial
                            color="skyblue"
                            transmission={1}
                            thickness={1}
                            roughness={0}
                            ior={1.5}
                            emissive="#8C52FF"
                            emissiveIntensity={0.2}
                        />
                    </mesh>

                    {/* Left Wing */}
                    <mesh position={[-1.5, 0.5, 0]} rotation={[0, 0, 0.5]}>
                        <boxGeometry args={[2, 0.1, 1]} />
                        <meshStandardMaterial color="#00E5FF" transparent opacity={0.6} />
                    </mesh>

                    {/* Right Wing */}
                    <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, -0.5]}>
                        <boxGeometry args={[2, 0.1, 1]} />
                        <meshStandardMaterial color="#00E5FF" transparent opacity={0.6} />
                    </mesh>
                </group>
            </Float>
        </group>
    )
}
