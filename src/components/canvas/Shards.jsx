import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function Shards() {
    const group = useRef()
    const scroll = useScroll()

    // Generate random shard data
    const shardsData = useMemo(() => {
        return new Array(40).fill().map(() => ({
            position: [
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            ],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            ],
            scale: 0.2 + Math.random() * 0.5
        }))
    }, [])

    useFrame((state, delta) => {
        // Phase 2 range: 0.25 to 0.5 (approx, or 1/4 to 2/4)
        // Actually, usually ScrollControls with pages=4:
        // Page 0: 0.0 - 0.25 (Hero)
        // Page 1: 0.25 - 0.5 (Energy)
        // Page 2: 0.5 - 0.75 (Creature)
        // Page 3: 0.75 - 1.0 (Portal)

        // Visibility logic
        const visible = scroll.range(0.2, 0.3) // Peak at 0.35 roughly
        // Or simpler: fade in starting at 0.2, fade out by 0.6

        // Animate opacity based on scroll
        // But MeshStandardMaterial opacity needs transparent=true

        // Movement logic
        if (group.current) {
            // Rotate the whole group
            group.current.rotation.y += delta * 0.5

            // Explode effect: Check scroll offset
            // const explosion = scroll.range(0.25, 0.25)
            // Adjust scale based on scroll
            const scale = scroll.range(0.25, 0.25) * 1.5; // Grow/Shrink
            // group.current.scale.setScalar(scale)
        }
    })

    return (
        <group ref={group} position={[0, -11, 0]} > {/* Positioned 1 viewport down usually, but we move camera? No, ScrollControls moves camera or contents? */}
            {/* 
           With default ScrollControls, neither camera nor content moves automatically unless we bind it.
           Usually we move the camera or the group.
           
           If we want "Camera moves through world", we should update Camera position in Scene.
           For now, let's assume we are moving the objects or moving camera.
           It's easier to move the Camera if we want parallax.
       */}

            {shardsData.map((data, i) => (
                <mesh key={i} position={data.position} rotation={data.rotation} scale={data.scale}>
                    <tetrahedronGeometry />
                    <meshStandardMaterial
                        color="#00E5FF"
                        emissive="#8C52FF"
                        emissiveIntensity={0.5}
                        roughness={0.1}
                        metalness={1}
                    />
                </mesh>
            ))}
        </group>
    )
}
/* 
NOTE: In Scene.jsx, we need to decide if we move the Camera or the Content.
"As user scrolls, the camera moves through the 3D world" -> implies Camera movement.
We need a rig component in Scene.jsx.
*/
