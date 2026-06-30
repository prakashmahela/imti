import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover / is mouse-driven to prevent console noise on mobile touchscreens
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') || 
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-neutral-400 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          translateX: isHovered ? -12 : 0,
          translateY: isHovered ? -12 : 0,
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
      {/* Inner Pin Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: 8,
          translateY: 8,
        }}
        animate={{
          scale: isHovered ? 0.3 : 1,
        }}
      />
    </>
  );
}
