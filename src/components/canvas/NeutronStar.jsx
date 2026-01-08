import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Instance, Instances } from '@react-three/drei'
import * as THREE from 'three'

// High-Definition Granular Sun Texture (Kept from previous)
function createGranularTexture() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#aa1100'; // Darker Red base for contrast
    ctx.fillRect(0, 0, size, size);

    // Granulation
    for (let i = 0; i < 8000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * 5 + 2;

        ctx.fillStyle = `rgba(255, ${Math.random() * 150 + 50}, 0, ${Math.random() * 0.5 + 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // Sunspots / Active Regions
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * 60 + 20;

        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
        grd.addColorStop(0, 'rgba(255, 255, 220, 1)');
        grd.addColorStop(0.3, 'rgba(255, 200, 0, 0.9)');
        grd.addColorStop(1, 'rgba(255, 50, 0, 0)');

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Giant Solar Loop (Prominence) - Animated Torus
function SolarLoop({ radius = 1.2, rotation, scale = 1, speed = 1 }) {
    const meshRef = useRef()

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime * speed

        // Pulse/Grow animation similar to a flare eruption
        // We want it to be somewhat stable but alive
        const s = scale + Math.sin(t) * 0.05
        meshRef.current.scale.set(s, s, s)

        // Subtle flow texture offset would be ideal, but rotating looks okay
        meshRef.current.rotation.z = t * 0.1
    })

    return (
        <group rotation={rotation}>
            <mesh ref={meshRef} position={[radius, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                {/* Arc geometry: Torus segment */}
                <torusGeometry args={[0.4, 0.02, 16, 64, Math.PI]} />
                <meshBasicMaterial
                    color="#ff6600"
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}

// Dense Glowing Particles Field
function CoronalParticles() {
    const count = 400
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        return new Array(count).fill().map(() => ({
            angle: Math.random() * Math.PI * 2,
            phi: Math.acos(2 * Math.random() - 1),
            radius: 1.1 + Math.random() * 0.8, // Zone around surface
            speed: Math.random() * 0.2 + 0.1,
            size: Math.random() * 0.5 + 0.2
        }))
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const t = state.clock.elapsedTime

        particles.forEach((p, i) => {
            // Orbit/float behavior
            const r = p.radius + Math.sin(t * p.speed + i) * 0.1
            const theta = p.angle + t * 0.1 * p.speed
            const phi = p.phi

            dummy.position.set(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            )

            // Pulse glow size
            const pulse = (Math.sin(t * 2 + i) + 1.5) * 0.5
            dummy.scale.setScalar(p.size * 0.05 * pulse)

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial
                color="#ffaa00"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    )
}

export default function NeutronStar() {
    const [hovered, setHover] = useState(false)
    const coreRef = useRef()
    const granularTex = useMemo(() => createGranularTexture(), [])

    useFrame((state, delta) => {
        if (coreRef.current) {
            coreRef.current.rotation.y += 0.01 * delta
        }
    })

    return (
        <group
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                {/* Granular Sun Core */}
                <mesh ref={coreRef} scale={1.8}>
                    <sphereGeometry args={[1, 128, 128]} />
                    <meshStandardMaterial
                        map={granularTex}
                        emissiveMap={granularTex}
                        emissiveIntensity={1.2}
                        emissive="#ffffff"
                        color="#ff1100"
                        roughness={0.5}
                        toneMapped={false}
                        displacementMap={granularTex}
                        displacementScale={0.08}
                    />
                </mesh>

                {/* Giant Solar Loops (Manually placed for composition) */}
                <SolarLoop radius={1.7} rotation={[0, 0, 0.5]} scale={1.2} />
                <SolarLoop radius={1.7} rotation={[1, 1, 2]} scale={0.8} speed={1.5} />
                <SolarLoop radius={1.75} rotation={[2, 0, 1]} scale={1.5} speed={0.8} />

                {/* Glowing Coronal Particles */}
                <CoronalParticles />

                <pointLight color="#ff5500" distance={30} intensity={3} decay={2} />
            </Float>
        </group>
    )
}
