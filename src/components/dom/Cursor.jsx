import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
    const cursorRef = useRef(null)
    const [trail, setTrail] = useState([])

    // Trail history ref to avoid state re-renders on every mousemove for logic
    const historyRef = useRef([])

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e

            // 1. Move main cursor
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
            }

            // 2. Add to history
            historyRef.current.push({ x: clientX, y: clientY, id: Math.random() })
            if (historyRef.current.length > 20) historyRef.current.shift()
        }

        window.addEventListener('mousemove', moveCursor)

        // Loop to update React state for rendering trail (less freq than mousemove)
        const interval = setInterval(() => {
            setTrail([...historyRef.current])
        }, 15) // ~60fps

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            {/* SVG Filter for Liquid Gooeiness */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    filter: "url('#goo')" // Apply the liquid filter
                }}
            >
                {/* Main Cursor (Leader) */}
                <div
                    ref={cursorRef}
                    style={{
                        position: 'fixed',
                        left: -15, // half width
                        top: -15,
                        width: 30,
                        height: 30,
                        background: '#00E5FF', // Cyan liquid
                        borderRadius: '50%',
                        mixBlendMode: 'screen', // Glowing look
                        pointerEvents: 'none',
                    }}
                />

                {/* Trail (Followers) */}
                {trail.map((t, i) => (
                    <div
                        key={t.id}
                        style={{
                            position: 'fixed',
                            left: t.x - (10 + i * 0.5) / 2, // Shrink based on index? Or just constant
                            top: t.y - (10 + i * 0.5) / 2,
                            width: 10 + i * 0.5, // Get larger towards the lead
                            height: 10 + i * 0.5,
                            background: `rgba(0, 229, 255, ${i / 20})`, // Fade in tail
                            borderRadius: '50%',
                            transform: 'translate3d(0,0,0)',
                        }}
                    />
                ))}
            </div>
        </>
    )
}
