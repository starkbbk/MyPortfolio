import { motion } from 'framer-motion'

const Section = ({ children, style }) => {
    return (
        <section
            style={{
                height: '100vh',
                width: '100vw',
                position: 'relative',
                padding: '10vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                ...style
            }}
        >
            {children}
        </section>
    )
}

export default function Overlay() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* PHASE 01: INTRO / ABOUT */}
            <Section>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h3 style={{ color: '#00E5FF', marginBottom: '1rem', letterSpacing: '0.2em' }} className="text-display">PHASE 01</h3>
                    <h1 className="text-display text-gradient" style={{ fontSize: '5rem', lineHeight: '0.9', maxWidth: '800px', marginBottom: '2rem' }}>
                        STARK<br />DIGITAL ARTISAN
                    </h1>
                    <p style={{ maxWidth: '500px', marginBottom: '2rem', lineHeight: '1.6', fontSize: '1.2rem' }}>
                        I craft immersive web experiences using advanced WebGL, React, and Creative Coding.
                        Blurring the line between interactive art and functional design.
                    </p>
                    <button
                        style={{
                            background: 'transparent',
                            border: '1px solid #fff',
                            color: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        className="interactive"
                        onMouseEnter={(e) => {
                            e.target.style.background = '#8C52FF';
                            e.target.style.borderColor = '#8C52FF';
                            e.target.style.boxShadow = '0 0 20px #8C52FF';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = '#fff';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        EXPLORE WORK
                    </button>
                </motion.div>
            </Section>

            {/* PHASE 02: SKILLS */}
            <Section style={{ justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right' }}>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h3 style={{ color: '#FF00E6', marginBottom: '1rem', letterSpacing: '0.2em' }} className="text-display">MY SKILLS</h3>
                    <h1 className="text-display" style={{ fontSize: '4rem', lineHeight: '1', maxWidth: '600px', marginBottom: '1rem' }}>
                        CORE <span className="text-gradient">STACK</span>
                    </h1>
                    <ul style={{ listStyle: 'none', fontSize: '1.5rem', lineHeight: '2', fontWeight: 300 }}>
                        <li>REACT / NEXT.JS</li>
                        <li>THREE.JS / WEBGL</li>
                        <li>SHADERS / GLSL</li>
                        <li>UI / UX DESIGN</li>
                    </ul>
                </motion.div>
            </Section>

            {/* PHASE 03: PROJECTS */}
            <Section style={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{ marginBottom: '10vh', width: '100%' }}
                >
                    <h3 style={{ color: '#00E5FF', marginBottom: '1rem', letterSpacing: '0.2em' }} className="text-display">LATEST WORK</h3>
                    <h1 className="text-display" style={{ fontSize: '3rem', maxWidth: '800px', marginBottom: '3rem', marginInline: 'auto' }}>
                        FEATURED PROJECTS
                    </h1>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', textAlign: 'left', maxWidth: '1000px', marginInline: 'auto' }}>
                        <div className="interactive">
                            <h4 style={{ color: '#00E5FF', fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI DASHBOARD</h4>
                            <p style={{ fontSize: '1rem', opacity: 0.7 }}>Next.js, Tailwind, OpenAI</p>
                        </div>
                        <div className="interactive">
                            <h4 style={{ color: '#FF00E6', fontSize: '1.5rem', marginBottom: '0.5rem' }}>METAVERSE LANDING</h4>
                            <p style={{ fontSize: '1rem', opacity: 0.7 }}>Three.js, Blender, GSAP</p>
                        </div>
                        <div className="interactive">
                            <h4 style={{ color: '#FFD700', fontSize: '1.5rem', marginBottom: '0.5rem' }}>CRYPTO EXCHANGE</h4>
                            <p style={{ fontSize: '1rem', opacity: 0.7 }}>Web3, Solidity, React</p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* PHASE 04: CONTACT */}
            <Section style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h3 style={{ color: '#FFD700', marginBottom: '1rem', letterSpacing: '0.2em' }} className="text-display">CONTACT</h3>
                    <h1 className="text-display text-gradient" style={{ fontSize: '5rem', marginBottom: '2rem' }}>
                        LET'S BUILD<br />THE FUTURE
                    </h1>
                    <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center' }}>
                        <a href="mailto:hello@stark.com" className="interactive" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', fontSize: '1.2rem' }}>EMAIL ME</a>
                        <a href="#" className="interactive" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', fontSize: '1.2rem' }}>TWITTER</a>
                        <a href="#" className="interactive" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', fontSize: '1.2rem' }}>GITHUB</a>
                    </div>
                </motion.div>
            </Section>
        </div>
    )
}
