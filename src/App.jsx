import { Canvas } from '@react-three/fiber'
import Scene from './components/canvas/Scene'
import { Suspense } from 'react'
import Cursor from './components/dom/Cursor'

function App() {
  return (
    <>
      <Cursor />
      {/* UI Overlay that sits on top of canvas (static UI like nav) */}
      <div className="overlay">
        <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
          <div className="text-display" style={{ fontSize: '1.5rem' }}>ANTIGRAVITY</div>
          <div style={{ cursor: 'pointer' }}>MENU</div>
        </nav>
      </div>

      <div className="canvas-container">
        <Canvas
          dpr={[1, 2]} // Handle high DPI screens
          gl={{ antialias: false, pixelRatio: window.devicePixelRatio }} // Optimization
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

export default App
