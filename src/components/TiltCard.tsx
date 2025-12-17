import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={`tilt-card-wrapper ${className}`}
    >
      <div 
        style={{ 
          transform: "translateZ(50px)", 
          transformStyle: "preserve-3d",
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
      
      {/* Glossy reflection effect */}
      <motion.div className="gloss-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 0.4 : 0 }}
        style={{
             backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)",
             position: "absolute",
             top: 0,
             left: 0,
             width: "100%",
             height: "100%",
             pointerEvents: "none",
             borderRadius: "inherit",
             zIndex: 10
        }}
      />
    </motion.div>
  );
};

export default TiltCard;
