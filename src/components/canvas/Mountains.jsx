import { useMemo } from 'react'
import * as THREE from 'three'

// Simplex-like noise function (simplified for dependency-free usage)
// In a real app, I'd use 'maath/random' or 'simplex-noise' which we might have installed.
// Let's try to use a simple multi-frequency sine summation for "Ridge Noise"
// Ridge noise is abs(noise) inverted, creating sharp peaks.

function ridgeNoise(x, y) {
    // Frequency stacking
    let e = 0;
    let amp = 1;
    let freq = 0.1;
    let maxAmp = 0;

    for (let i = 0; i < 4; i++) {
        // Simple faux-random mix
        const n = Math.sin(x * freq + i) * Math.cos(y * freq + i * 1.32);
        // Sharp peaks: 1 - abs(n)
        e += (1 - Math.abs(n)) * amp;
        maxAmp += amp;
        amp *= 0.5;
        freq *= 2;
    }

    // Normalize and power for valleys
    return Math.pow(e / maxAmp, 2) * 15; // Height multiplier
}

export default function Mountains() {
    const { geometry } = useMemo(() => {
        // High resolution plane for displacement
        // 100x100 size, 128 segments to resolution
        const width = 120;
        const depth = 80;
        const segmentsW = 128;
        const segmentsD = 128;

        const geo = new THREE.PlaneGeometry(width, depth, segmentsW, segmentsD);
        const pos = geo.attributes.position.array;

        for (let i = 0; i < pos.length / 3; i++) {
            const x = pos[i * 3];
            const y = pos[i * 3 + 1];

            // We want a valley in the center (x=0)
            // So height should increase as abs(x) increases

            const noiseH = ridgeNoise(x * 0.5, y * 0.5); // noise scale

            // Valley factor: shape the terrain to be low in middle, high on sides
            const distFromCenter = Math.abs(x) / (width / 2);
            const valleyShape = Math.pow(distFromCenter, 1.5) * 15;

            // Apply height to Z (standard Plane normal)
            // Lift sides, keep center random but low
            let h = noiseH + valleyShape;

            // Flatten the "near" part (bottom of plane where y is low?)
            // Plane Y goes from -depth/2 to +depth/2.
            // We look at it from Z? No, we rotate -PI/2 X.
            // So Y becomes Z-depth.

            pos[i * 3 + 2] = h;
        }

        geo.computeVertexNormals();
        return { geometry: geo };
    }, []);

    return (
        <mesh geometry={geometry} position={[0, -5, -40]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Silhouette Material: Dark, Low Roughness to catch rim light */}
            <meshStandardMaterial
                color="#08020a" // Very dark purple/black
                roughness={0.6}
                metalness={0.4}
                flatShading={false} // Smooth shading for organic look
            />
        </mesh>
    )
}
