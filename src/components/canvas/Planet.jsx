import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural Earth Texture (Continents + Ocean)
function createEarthTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Base Ocean (Deep Blue)
    ctx.fillStyle = '#001133';
    ctx.fillRect(0, 0, size, size);

    // Continents (Green/Brown blobs)
    // Simple circle blobs to simulate landmasses
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * 80 + 20;

        ctx.fillStyle = `rgb(${30 + Math.random() * 40}, ${100 + Math.random() * 50}, ${30 + Math.random() * 20})`; // Variable Green
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Add some "Land detail"
        for (let j = 0; j < 5; j++) {
            ctx.fillStyle = `rgb(${30 + Math.random() * 40}, ${100 + Math.random() * 50}, ${30 + Math.random() * 20})`;
            ctx.beginPath();
            ctx.arc(x + (Math.random() - 0.5) * r * 2, y + (Math.random() - 0.5) * r * 2, r * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return new THREE.CanvasTexture(canvas);
}

// Procedural Cloud Texture
function createCloudTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Transparent background
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, size, size);

    // Cloud puffs
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * 40 + 10;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

export default function Planet({ type = 'rocky', color = '#ff0000', size = 1, ring = false, ...props }) {
    const meshRef = useRef()
    const cloudsRef = useRef()

    const earthTex = useMemo(() => {
        if (type === 'earth') return createEarthTexture()
        return null
    }, [type])

    const cloudTex = useMemo(() => {
        if (type === 'earth') return createCloudTexture()
        return null
    }, [type])

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotation
            meshRef.current.rotation.y += 0.05 * delta
        }
        if (cloudsRef.current) {
            // Clouds rotate slightly faster/independent
            cloudsRef.current.rotation.y += 0.07 * delta
            cloudsRef.current.rotation.x += 0.01 * delta
        }
    })

    return (
        <group {...props}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[size, 64, 64]} />
                {type === 'rocky' && (
                    <meshStandardMaterial
                        color={color}
                        roughness={0.9}
                        bumpScale={0.5}
                    />
                )}
                {type === 'gas' && (
                    <meshStandardMaterial
                        color={color}
                        roughness={0.4}
                        metalness={0.1}
                    />
                )}
                {type === 'ringed' && (
                    <meshStandardMaterial
                        color={color}
                        roughness={0.6}
                    />
                )}
                {type === 'earth' && (
                    <meshStandardMaterial
                        map={earthTex}
                        color="#ffffff" // Tint by texture
                        roughness={0.6}
                        metalness={0.1}
                    />
                )}
            </mesh>

            {/* Earth Cloud Layer */}
            {type === 'earth' && (
                <mesh ref={cloudsRef} scale={size * 1.02}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial
                        map={cloudTex}
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                        depthWrite={false} // Soft clouds
                    />
                </mesh>
            )}

            {/* Ring System */}
            {ring && (
                <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
                    <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
                    <meshStandardMaterial
                        color={color}
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            )}

            {/* Atmosphere Glow */}
            <mesh scale={size * 1.15}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color={type === 'earth' ? '#0066ff' : color}
                    transparent
                    opacity={type === 'earth' ? 0.2 : 0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    )
}
