import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural texture for the Energy Jet (Flame)
function createJetTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Gradient stream
    const grd = ctx.createLinearGradient(0, 0, 0, 512);
    grd.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Core Source
    grd.addColorStop(0.2, 'rgba(100, 200, 255, 0.8)'); // Blue-ish
    grd.addColorStop(0.5, 'rgba(200, 50, 255, 0.4)'); // Purple
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Fade out

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 128, 512);

    // Add noise/streaks
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 128;
        const h = Math.random() * 200 + 50;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 2, h);
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

export default function Pulsar(props) {
    const jetRef = useRef()
    const jetRef2 = useRef()
    const diskRef = useRef()

    const jetTex = useMemo(() => createJetTexture(), [])

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime() * 5

        // Animate Jet Texture "Flow"
        // Since we can't easily scroll canvas texture UVs without cloning, 
        // we'll just flicker opacity or scale to simulate flow energy

        if (jetRef.current) {
            jetRef.current.scale.y = 1 + Math.sin(t) * 0.05
            jetRef.current.material.opacity = 0.6 + Math.sin(t * 10) * 0.1
        }
        if (jetRef2.current) {
            jetRef2.current.scale.y = 1 + Math.sin(t + 1) * 0.05
            jetRef2.current.material.opacity = 0.6 + Math.sin(t * 10 + 1) * 0.1
        }

        if (diskRef.current) {
            diskRef.current.rotation.z -= delta * 2
        }
    })

    return (
        <group {...props}>
            {/* The Star Core */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Accretion Disk */}
            <mesh ref={diskRef} rotation={[Math.PI / 1.5, 0, 0]}>
                <ringGeometry args={[0.6, 2, 64]} />
                <meshStandardMaterial
                    color="#ff00ff"
                    emissive="#aa00ff"
                    emissiveIntensity={2}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Energy Jet 1 (Up) */}
            <mesh ref={jetRef} position={[0, 4, 0]}>
                <cylinderGeometry args={[0.1, 0.4, 8, 32, 1, true]} />
                <meshBasicMaterial
                    map={jetTex}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Energy Jet 2 (Down) */}
            <mesh ref={jetRef2} position={[0, -4, 0]} rotation={[Math.PI, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.4, 8, 32, 1, true]} />
                <meshBasicMaterial
                    map={jetTex}
                    transparent
                    opacity={0.8}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Glow Light */}
            <pointLight color="#aa00ff" distance={10} intensity={2} />
        </group>
    )
}
