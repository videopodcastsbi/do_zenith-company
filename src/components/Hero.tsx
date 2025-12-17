import React, { useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  const ref = useRef(null);
  
  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  // Parallax calculations
  // Text moves slower (background)
  const textX = useTransform(moveX, [-1000, 1000], [-30, 30]);
  const textY = useTransform(moveY, [-1000, 1000], [-30, 30]);
  
  // Logo moves faster (foreground)
  const logoX = useTransform(moveX, [-1000, 1000], [60, -60]);
  const logoY = useTransform(moveY, [-1000, 1000], [60, -60]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate center relative position
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX - innerWidth / 2;
    const y = clientY - innerHeight / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section className="hero-3d" ref={ref} onMouseMove={handleMouseMove}>
      <div className="hero-3d-container">
        <motion.div 
          className="hero-text-layer"
          style={{ x: textX, y: textY }}
        >
          <h1 className="giant-text">DO_ZENITH</h1>
          <p className="hero-tagline">Reaching the Peak of Innovation</p>
        </motion.div>

        <motion.div 
          className="hero-logo-layer"
          style={{ x: logoX, y: logoY }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* <div className="glow-ring"></div> */}
          {/* Removed flat logo to focus on 3D Robot and Typography */}
        </motion.div>
        
        <div className="scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
