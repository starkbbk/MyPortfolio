import { useEffect, useRef } from 'react'

export default function Cursor() {
    const cursorRef = useRef(null)

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
            }
        }

        window.addEventListener('mousemove', moveCursor)
        return () => window.removeEventListener('mousemove', moveCursor)
    }, [])

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '40px',
                height: '40px',
                border: '2px solid #00E5FF',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999,
                transform: 'translate3d(-50%, -50%, 0)', // Centering logic needs offset
                marginLeft: '-20px',
                marginTop: '-20px',
                boxShadow: '0 0 10px #00E5FF, inset 0 0 10px #00E5FF',
                mixBlendMode: 'difference',
                transition: 'transform 0.1s linear' // Slight lag for smooth feel? Or 0 for instant
                // Actually, for "magnetic" feel, we might want to use framer motion or spring, but simple CSS transform is fast.
            }}
        />
    )
}
