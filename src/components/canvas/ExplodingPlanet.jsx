import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ExplodingPlanet({ color = '#8b3a3a', ...props }) {
    const meshRef = useRef()
    const coreRef = useRef()
    const count = 300 // Number of debris pieces
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate random debris data
    const debris = useMemo(() => {
        return new Array(count).fill().map(() => {
            // Random position in a sphere shell
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 1.0 + Math.random() * 1.5 // Distance from center (explosion spread)

            return {
                pos: new THREE.Vector3(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                ),
                rot: new THREE.Vector3(Math.random(), Math.random(), Math.random()), // Random rotation axis
                speed: Math.random() * 0.5 + 0.1, // Rotation speed
                drift: Math.random() * 0.05 + 0.01, // Expansion speed
                scale: Math.random() * 0.3 + 0.05 // Debris size
            }
        })
    }, [])

    useFrame((state, delta) => {
        // Animate Debris
        if (meshRef.current) {
            debris.forEach((d, i) => {
                // Rotate piece
                d.rot.x += d.speed * delta
                d.rot.y += d.speed * delta

                // Drift outwards (Blast wave)
                // We'll oscillate them slightly to keep them in the "scene" but looking like expanding
                // Or just continuous slow expansion
                const time = state.clock.elapsedTime
                const expansion = Math.sin(time * 0.5 + i) * 0.2 // Breathing explosion

                dummy.position.copy(d.pos).multiplyScalar(1 + expansion)
                dummy.rotation.set(d.rot.x, d.rot.y, d.rot.z)
                dummy.scale.setScalar(d.scale)

                dummy.updateMatrix()
                meshRef.current.setMatrixAt(i, dummy.matrix)
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }

        // Animate Molten Core
        if (coreRef.current) {
            coreRef.current.rotation.y -= delta * 0.2
            const s = 0.8 + Math.sin(state.clock.elapsedTime * 5) * 0.1 // Fast pulse
            coreRef.current.scale.setScalar(s)
        }
    })

    return (
        <group {...props}>
            {/* Floating Debris Field */}
            <instancedMesh ref={meshRef} args={[null, null, count]}>
                <dodecahedronGeometry args={[1, 0]} /> {/* Low poly rock shape */}
                <meshStandardMaterial
                    color={color}
                    roughness={0.8}
                    flatShading
                />
            </instancedMesh>

            {/* The Blasted Molten Core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshBasicMaterial color="#ff3300" toneMapped={false} />
                <pointLight distance={10} intensity={5} color="#ff5500" decay={2} />
            </mesh>

            {/* Blast Glow */}
            <mesh scale={3}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#ffaa00"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    )
}
