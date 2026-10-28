import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on touch-only screens
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if target or parent is interactive
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .interactive, [data-hover]');
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className={`${styles.cursorDot} ${isHovered ? styles.dotHovered : ''}`}
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.1 }}
      />

      {/* Outer Spring Ring */}
      <motion.div
        className={`${styles.cursorRing} ${isHovered ? styles.ringHovered : ''}`}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? '#00CD58' : 'rgba(0, 205, 88, 0.45)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22, mass: 0.2 }}
      />
    </>
  );
}
