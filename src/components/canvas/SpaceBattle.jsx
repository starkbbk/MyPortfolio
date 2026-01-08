import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Spaceship({ color, ...props }) {
    return (
        <group {...props}>
            {/* Main Fuselage */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <coneGeometry args={[0.3, 1.5, 8]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Wings */}
            <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
                <boxGeometry args={[1.5, 0.1, 0.5]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Engine Glow */}
            <mesh position={[0, 0, 0.8]}>
                <sphereGeometry args={[0.15]} />
                <meshBasicMaterial color="#00ffff" />
                <pointLight distance={3} intensity={3} color="#00ffff" />
            </mesh>
        </group>
    )
}

export default function SpaceBattle() {
    const chaserRef = useRef()
    const fleeingRef = useRef()
    const laserMeshRef = useRef()
    const LASER_COUNT = 30

    // Laser state storage (not React state)
    // Each laser: active (0/1), position (vec3), velocity (vec3), life (0-1)
    const laserData = useMemo(() => {
        return new Array(LASER_COUNT).fill().map(() => ({
            active: false,
            pos: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            life: 0
        }))
    }, [])

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const fireTimer = useRef(0)
    const currentLaserIdx = useRef(0)

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime

        // --- 1. Ship Animation (Same as before) ---
        const t = time * 0.5

        // Fleeing Ship
        const fleePos = new THREE.Vector3(
            Math.sin(t) * 8,
            Math.cos(t * 1.5) * 2,
            Math.cos(t) * 4
        )
        const fleeLook = new THREE.Vector3(
            Math.sin(t + 0.1) * 8,
            Math.cos((t + 0.1) * 1.5) * 2,
            Math.cos(t + 0.1) * 4
        )

        // Chaser Ship
        const chaseT = t - 0.3
        const chasePos = new THREE.Vector3(
            Math.sin(chaseT) * 8,
            Math.cos(chaseT * 1.5) * 2,
            Math.cos(chaseT) * 4
        )
        const chaseLook = fleePos.clone()

        if (fleeingRef.current) {
            fleeingRef.current.position.copy(fleePos)
            fleeingRef.current.lookAt(fleeLook)
            fleeingRef.current.rotation.z -= Math.cos(t) * 0.5
        }

        if (chaserRef.current) {
            chaserRef.current.position.copy(chasePos)
            chaserRef.current.lookAt(chaseLook)
            chaserRef.current.rotation.z -= Math.cos(chaseT) * 0.5
        }

        // --- 2. Laser Logic (Optimized) ---
        fireTimer.current += delta
        if (fireTimer.current > 0.15) { // Rapid fire
            fireTimer.current = 0

            // Activate next laser
            const idx = currentLaserIdx.current
            const laser = laserData[idx]

            laser.active = true
            laser.life = 1.0
            laser.pos.copy(chasePos)

            // Aim at target with slight randomness
            const target = fleePos.clone()
            target.x += (Math.random() - 0.5) * 0.5
            target.y += (Math.random() - 0.5) * 0.5
            target.z += (Math.random() - 0.5) * 0.5

            laser.velocity.subVectors(target, chasePos).normalize().multiplyScalar(15) // Speed 15

            // Cycle index
            currentLaserIdx.current = (currentLaserIdx.current + 1) % LASER_COUNT
        }

        // Update Lasers
        if (laserMeshRef.current) {
            let activeCount = 0
            laserData.forEach((laser, i) => {
                if (laser.active) {
                    laser.life -= delta * 0.5 // 2 seconds life

                    if (laser.life <= 0) {
                        laser.active = false
                        // Move out of view
                        dummy.position.set(0, -9999, 0)
                        dummy.scale.set(0, 0, 0)
                    } else {
                        // Move
                        laser.pos.addScaledVector(laser.velocity, delta)

                        dummy.position.copy(laser.pos)
                        dummy.lookAt(laser.pos.clone().add(laser.velocity))
                        dummy.scale.set(1, 1, 1)
                        activeCount++
                    }
                } else {
                    dummy.position.set(0, -9999, 0)
                    dummy.scale.set(0, 0, 0)
                }

                dummy.updateMatrix()
                laserMeshRef.current.setMatrixAt(i, dummy.matrix)
            })

            laserMeshRef.current.instanceMatrix.needsUpdate = true
        }
    })

    return (
        <group>
            <Spaceship ref={fleeingRef} color="#aaaaaa" scale={0.5} />
            <Spaceship ref={chaserRef} color="#ff2200" scale={0.5} />

            {/* Instanced Lasers */}
            <instancedMesh ref={laserMeshRef} args={[null, null, LASER_COUNT]}>
                <boxGeometry args={[0.05, 0.05, 1]} />
                <meshBasicMaterial color="#00ff00" toneMapped={false} />
            </instancedMesh>
        </group>
    )
}
