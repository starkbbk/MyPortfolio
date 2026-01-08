import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CosmicDust() {
    const count = 2000
    const meshRef = useRef()

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            // Spread wider for a "Web" feel
            const x = (Math.random() - 0.5) * 100
            const y = (Math.random() - 0.5) * 100
            const z = (Math.random() - 0.5) * 80
            // Palette: Cyan, Blue, Purple, Magenta
            const colorType = Math.random()
            let color = new THREE.Color('#00E5FF') // Cyan
            if (colorType > 0.7) color = new THREE.Color('#aa00ff') // Purple
            else if (colorType > 0.4) color = new THREE.Color('#0055ff') // Blue

            temp.push({ x, y, z, ox: x, oy: y, oz: z, color })
        }
        return temp
    }, [])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.getElapsedTime()
        const mx = state.pointer.x * 20
        const my = state.pointer.y * 20

        particles.forEach((p, i) => {
            // Flowing "Web" motion
            // We use noise to make them wave like filaments
            const t = time * 0.2
            const noiseX = Math.sin(i * 0.05 + t) * 0.5
            const noiseY = Math.cos(i * 0.05 + t * 0.3) * 0.5

            // Mouse Repulsion
            const dx = p.ox - mx
            const dy = p.oy - my
            const dist = Math.sqrt(dx * dx + dy * dy)
            let pushX = 0
            let pushY = 0

            if (dist < 10) {
                const force = (10 - dist) * 0.4
                pushX = dx * force
                pushY = dy * force
            }

            dummy.position.set(
                p.ox + noiseX + pushX,
                p.oy + noiseY + pushY,
                p.oz // Minimal Z movement
            )

            // Twinkle
            const scale = (Math.sin(t * 3 + i) + 2) * 0.1
            dummy.scale.setScalar(scale)

            dummy.updateMatrix()

            // Update color per instance if using instanceColor buffer
            // For simplicity in standard InstancedMesh with basic material, 
            // we usually need a custom shader or setColorAt if allowed.
            // Let's assume uniform color for now to save perf, OR use the mix in material.
            // To get the multi-color look effectively with one draw call without custom shader:
            // We'd need to set instanceColor. 
        })

        meshRef.current.instanceMatrix.needsUpdate = true
    })

    // Apply colors once
    useMemo(() => {
        if (meshRef.current) {
            particles.forEach((p, i) => {
                meshRef.current.setColorAt(i, p.color)
            })
            meshRef.current.instanceColor.needsUpdate = true
        }
    }, [particles])

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.15, 0]} />
            <meshBasicMaterial
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                vertexColors // Essential for multi-colored particles
            />
        </instancedMesh>
    )
}
