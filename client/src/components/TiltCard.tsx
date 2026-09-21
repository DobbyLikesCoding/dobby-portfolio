import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'framer-motion';
import { useRef } from 'react';

type TiltCardProps = HTMLMotionProps<'div'> & {
  disabled?: boolean;
  glare?: boolean;
};

export default function TiltCard({
  children,
  className = '',
  disabled = false,
  glare = true,
  onPointerMove,
  onPointerLeave,
  style,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const smoothRotateX = useSpring(rotateX, { stiffness: 160, damping: 18, mass: 0.5 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 160, damping: 18, mass: 0.5 });
  const smoothGlowX = useSpring(glowX, { stiffness: 140, damping: 18, mass: 0.45 });
  const smoothGlowY = useSpring(glowY, { stiffness: 140, damping: 18, mass: 0.45 });
  const translateZ = useTransform(smoothRotateY, (value) => 18 + Math.abs(value) * 1.5);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(255,255,255,0.18), transparent 26%)`;

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current || disabled) {
      onPointerMove?.(event);
      return;
    }

    const bounds = ref.current.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
    onPointerMove?.(event);
  }

  function handleLeave(event: React.PointerEvent<HTMLDivElement>) {
    reset();
    onPointerLeave?.(event);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        ...style,
      }}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.5 }}
      {...rest}
    >
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ backgroundImage: glareBg, transform: 'translateZ(24px)' }}
        />
      )}
      <motion.div
        className="relative h-full"
        style={{ transform: useMotionTemplate`translateZ(${translateZ}px)` }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
