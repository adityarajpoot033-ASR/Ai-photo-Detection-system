import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TiltCard Component
 * Provides a premium 3D tilt effect with cursor-following light reflection.
 * Optimized for performance and smooth transitions.
 */
export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for cursor position relative to the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth, non-jittery movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // Light reflection / Shine effect position
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized cursor position (-0.5 to 0.5)
    const mouseXRelative = (e.clientX - rect.left) / width;
    const mouseYRelative = (e.clientY - rect.top) / height;

    x.set(mouseXRelative - 0.5);
    y.set(mouseYRelative - 0.5);

    // Update shine position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset tilt to center
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          // Subtle floating animation when idle
          y: isHovered ? 0 : [0, -10, 0],
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }
        }}
        className="relative w-full h-full"
      >
        {/* Children content */}
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          {children}
        </div>

        {/* Shine / Light Reflection Effect */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([cx, cy]) => `radial-gradient(circle at ${cx}px ${cy}px, rgba(255,255,255,0.15) 0%, transparent 80%)`
            ),
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Subtle Inner Shadow for Depth */}
        <div className="absolute inset-0 rounded-[inherit] shadow-inner pointer-events-none z-30 opacity-20" />
      </motion.div>
    </div>
  );
}
