import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CrystalField() {
    const meshRef = useRef()
    const count = 40

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const crystals = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            // Re-roll position if it's too close to center
            let x, z;
            let safetyAttempts = 0;
            do {
                x = (Math.random() - 0.5) * 40;
                z = (Math.random() - 0.5) * 15 - 5; // z range -12.5 to 2.5

                // Safe zone for orb at [0, ?, -2]
                // Radius ~ 4 units check
                const dist = Math.hypot(x - 0, z - (-2));
                if (dist > 4) break;

                safetyAttempts++;
            } while (safetyAttempts < 10);

            temp.push({
                position: [x, -2, z],
                scale: [0.2 + Math.random() * 0.2, 0.5 + Math.random() * 1.5, 0.2 + Math.random() * 0.2],
                rotation: [
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.2
                ]
            });
        }
        return temp;
    }, [])

    useMemo(() => {
        if (meshRef.current) {
            crystals.forEach((data, i) => {
                dummy.position.set(data.position[0], data.position[1], data.position[2])
                dummy.rotation.set(data.rotation[0], data.rotation[1], data.rotation[2])
                dummy.scale.set(data.scale[0], data.scale[1], data.scale[2])
                dummy.updateMatrix()
                meshRef.current.setMatrixAt(i, dummy.matrix)
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }
    }, [crystals, dummy])

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <cylinderGeometry args={[0, 1, 1, 5]} /> {/* Shard shape */}
            <meshStandardMaterial
                color="#00ffff"
                emissive="#00E5FF"
                emissiveIntensity={2}
                transparent
                opacity={0.8}
                roughness={0.1}
            />
        </instancedMesh>
    )
}
