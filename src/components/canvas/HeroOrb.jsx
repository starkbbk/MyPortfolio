import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'

// Cellular Noise Generator (Voronoi-like for cracks)
function createCellularTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Fill background black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // Generate feature points
    const points = [];
    for (let i = 0; i < 40; i++) {
        points.push({
            x: Math.random() * size,
            y: Math.random() * size
        });
    }

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    points.forEach((p, i) => {
        // Connect to nearest neighbors
        points.forEach((p2, j) => {
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < size * 0.2 && dist > 5) {
                ctx.globalAlpha = 1 - (dist / (size * 0.2));
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

export default function HeroOrb() {
    const meshRef = useRef()
    const coreRef = useRef()
    const groupRef = useRef() // Helper group for entrance animation
    const [hovered, setHover] = useState(false)
    const [started, setStarted] = useState(false)

    // Create textures once
    const crackTex = useMemo(() => createCellularTexture(), [])

    // Trigger animation on mount
    useState(() => {
        setTimeout(() => setStarted(true), 500) // Delay slightly
    })

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Floating Rotation
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.1;
        }

        // Pulsing Core
        if (coreRef.current) {
            const scale = 1 + Math.sin(t * 2) * 0.1;
            coreRef.current.scale.setScalar(scale);
        }

        // Entrance Animation: Rise from -5 to 0
        if (groupRef.current) {
            // Soft Damp to target Y=0
            easing.damp3(groupRef.current.position, [0, started ? 0 : -6, 0], 2.5, delta)
        }
    })

    return (
        <group ref={groupRef}> {/* Wrap in group for rising animation */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 0, 0]}>
                {/* Outer Ice Shell */}
                <mesh
                    ref={meshRef}
                    scale={2.2}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <sphereGeometry args={[1, 128, 128]} />

                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        resolution={512}
                        thickness={2.5}
                        chromaticAberration={0.2}
                        anisotropy={0.1}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.0}
                        iridescence={0.5}
                        iridescenceIOR={1}
                        roughness={0.4}
                        color="#a0a0ff"
                        displacementMap={crackTex}
                        displacementScale={0.15}
                        normalMap={crackTex}
                        normalScale={[1, 1]}
                    />
                </mesh>

                {/* Inner Fire Core (Orange/Pink) */}
                <mesh ref={coreRef} scale={1.0}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshBasicMaterial
                        color="#ff5500"
                        toneMapped={false}
                    />
                </mesh>

                {/* Inner Glare/Halo for Core */}
                <mesh scale={1.2}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial color="#ff0080" transparent opacity={0.2} side={THREE.BackSide} />
                </mesh>

                {/* External Glow Light */}
                <pointLight color="#00E5FF" distance={5} intensity={5} />
            </Float>
        </group>
    )
}
