import { motion } from 'framer-motion'

const Section = ({ children, style }) => {
    return (
        <section
            style={{
                minHeight: '100vh',
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
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        padding: 'clamp(1.5rem, 5vw, 3rem)', // Responsive padding
                        borderRadius: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                        borderLeft: '1px solid rgba(255, 255, 255, 0.5)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        width: '90%', // Ensure it doesn't touch edges
                        maxWidth: '900px'
                    }}
                >
                    <h1 className="text-display text-gradient" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: '1.1', marginBottom: '1.5rem', wordBreak: 'break-word' }}>
                        SHIVANAND VERMA
                    </h1>
                    <p style={{ maxWidth: '600px', marginBottom: '2rem', lineHeight: '1.6', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#eee' }}>
                        B.Tech Computer Science student specializing in AI/ML and Creative Web Development.
                        Building innovative solutions with Data Structures, Machine Learning, and Interactive 3D Web approaches.
                    </p>
                    <button
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            color: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(5px)'
                        }}
                        className="interactive"
                        onMouseEnter={(e) => {
                            e.target.style.background = '#8C52FF';
                            e.target.style.borderColor = '#8C52FF';
                            e.target.style.boxShadow = '0 0 20px #8C52FF';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
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
                    <h1 className="text-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1', maxWidth: '600px', marginBottom: '1rem' }}>
                        CORE <span className="text-gradient">STACK</span>
                    </h1>
                    <ul style={{ listStyle: 'none', fontSize: 'clamp(1rem, 2vw, 1.5rem)', lineHeight: '1.8', fontWeight: 300 }}>
                        <li>JAVA / PYTHON / C++</li>
                        <li>REACT / NEXT.JS / THREE.JS</li>
                        <li>MACHINE LEARNING / TENSORFLOW</li>
                        <li>SQL / POSTGRESQL</li>
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
                    <h1 className="text-display" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', maxWidth: '800px', marginBottom: '3rem', marginInline: 'auto' }}>
                        FEATURED PROJECTS
                    </h1>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left', maxWidth: '1200px', marginInline: 'auto', width: '100%' }}>

                        {/* Project 1 */}
                        <div
                            className="interactive glass-card"
                            style={{
                                padding: '2rem',
                                borderRadius: '15px',
                                background: 'rgba(20, 20, 40, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 229, 255, 0.05)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(0, 229, 255, 0.2)'
                                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(0, 229, 255, 0.05)'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h4 style={{ color: '#00E5FF', fontSize: '1.8rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }}>SKIN CANCER DETECTION</h4>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#e0e0e0' }}>
                                A medical diagnostic tool using <strong>Convolutional Neural Networks (CNN)</strong> with <strong>95.6% precision</strong>.
                                Built with TensorFlow and Keras to analyze dermatological images.
                            </p>
                        </div>

                        {/* Project 2 */}
                        <div
                            className="interactive glass-card"
                            style={{
                                padding: '2rem',
                                borderRadius: '15px',
                                background: 'rgba(20, 20, 40, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 0, 230, 0.05)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(255, 0, 230, 0.2), inset 0 0 20px rgba(255, 0, 230, 0.2)'
                                e.currentTarget.style.borderColor = 'rgba(255, 0, 230, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 0, 230, 0.05)'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h4 style={{ color: '#FF00E6', fontSize: '1.8rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(255, 0, 230, 0.5)' }}>STOCK PRICE PREDICTION</h4>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#e0e0e0' }}>
                                Advanced financial forecasting using <strong>Deep Learning (RNN)</strong> and <strong>NLP</strong> to analyze news sentiment.
                                Real-time data processing for market trend prediction.
                            </p>
                        </div>

                        {/* Project 3 */}
                        <div
                            className="interactive glass-card"
                            style={{
                                padding: '2rem',
                                borderRadius: '15px',
                                background: 'rgba(20, 20, 40, 0.6)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.2)'
                                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h4 style={{ color: '#FFD700', fontSize: '1.8rem', marginBottom: '1rem', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>LOST AND FOUND</h4>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#e0e0e0' }}>
                                A community platform for reporting lost items. Built with <strong>PHP, MySQL</strong>, and <strong>JavaScript</strong>.
                                Features secure admin management and user reporting portals.
                            </p>
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
                    <h1 className="text-display text-gradient" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem' }}>
                        LET'S BUILD<br />THE FUTURE
                    </h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(1rem, 5vw, 3rem)', justifyContent: 'center' }}>
                        <a href="mailto:shivanandbbk06@gmail.com" className="interactive" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', fontSize: '1.2rem' }}>EMAIL</a>
                        <a href="https://linkedin.com/in/starkbbk" target="_blank" className="interactive" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', fontSize: '1.2rem' }}>LINKEDIN</a>
                        <a href="https://github.com/starkbbk" target="_blank" className="interactive" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #fff', fontSize: '1.2rem' }}>GITHUB</a>
                    </div>
                </motion.div>
            </Section>
        </div>
    )
}
