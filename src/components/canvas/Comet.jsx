import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'

function Blast({ position, color, onComplete }) {
    const meshRef = useRef()
    const [timer, setTimer] = useState(0)

    useFrame((state, delta) => {
        if (!meshRef.current) return
        setTimer(t => t + delta * 3) // Fast expansion

        const scale = 1 + timer * 5
        meshRef.current.scale.setScalar(scale)

        // Fade out
        const opacity = Math.max(0, 1 - timer)
        meshRef.current.material.opacity = opacity

        if (opacity <= 0) onComplete()
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial
                color="#ffffff"
                transparent
                depthWrite={false} // No depth write for flash
                blending={THREE.AdditiveBlending}
            />
            <pointLight color={color} intensity={10} distance={5} decay={2} />
        </mesh>
    )
}

export default function Comet({ start, end, speed = 1, size = 0.2, color = '#ff5500' }) {
    const ref = useRef()
    const [active, setActive] = useState(true)
    const [exploding, setExploding] = useState(false)

    // Calculate direction vector
    const direction = new THREE.Vector3().subVectors(end, start)
    const totalDistance = direction.length()
    direction.normalize()

    useFrame((state, delta) => {
        if (!ref.current || exploding) return

        // Move comet
        const move = speed * delta
        ref.current.position.addScaledVector(direction, move)

        // Check collision with end point
        if (ref.current.position.distanceTo(start) >= totalDistance) {
            // Impact!
            setExploding(true)
            // Hide comet mesh
            ref.current.visible = false
        }

        // Spin head
        ref.current.rotation.x += delta * 5
        ref.current.rotation.y += delta * 5
    })

    const reset = () => {
        setExploding(false)
        if (ref.current) {
            ref.current.position.copy(start)
            ref.current.visible = true
        }
    }

    return (
        <group>
            {!exploding && (
                <Trail
                    width={size * 8}
                    length={8}
                    color={new THREE.Color(color)}
                    attenuation={(t) => t * t}
                >
                    <mesh ref={ref} position={start}>
                        <dodecahedronGeometry args={[size, 0]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} />
                        <pointLight color={color} intensity={5} distance={5} />
                    </mesh>
                </Trail>
            )}

            {exploding && (
                <Blast position={end} color={color} onComplete={reset} />
            )}
        </group>
    )
}
