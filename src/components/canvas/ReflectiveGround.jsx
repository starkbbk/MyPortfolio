import { MeshReflectorMaterial, useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useState } from 'react'

export default function ReflectiveGround() {
    // Generate a normal map for water ripples on the fly?
    // MeshReflectorMaterial's "distortion" property handles this without a texture usually
    // It uses a noise texture internally or we can provide a displacement map.
    // The distortion prop distorts the Reflection, not the geometry.
    // To make it look like water, we need both.

    // For now, let's rely on the built-in distortion of the Reflector material which looks great for water.

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={512}
                mixBlur={1}
                mixStrength={80}
                roughness={0.5} // Shinier for water
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101020" // Dark Cyan/Blue Water Base
                metalness={0.8}

                // Water Effect
                mirror={1}
                distortion={1.0} // High distortion for water waves
                distortionScale={2.0} // Size of waves
                temporalDistortion={0.1} // Speed of waves
            />
        </mesh>
    )
}
