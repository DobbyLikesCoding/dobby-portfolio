import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import useIsMobileViewport from './useIsMobileViewport';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export default function Reveal({
  children,
  className = '',
  delayMs = 0,
}: RevealProps) {
  const isMobile = useIsMobileViewport();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : { opacity: 0, y: 28, scale: 0.975, filter: 'blur(8px)' }
      }
      transition={{
        duration: isMobile ? 0 : 0.9,
        delay: isMobile ? 0 : delayMs / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={['will-change-transform', className].join(' ')}
    >
      {children}
    </motion.div>
  );
}
