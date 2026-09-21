import { motion, type MotionValue, useReducedMotion } from 'framer-motion';

type CosmicVoyageBackgroundProps = {
  y: MotionValue<number>;
  scale: MotionValue<number>;
};

export default function CosmicVoyageBackground({
  y,
  scale,
}: CosmicVoyageBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{ y, scale }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#040814_0%,#08111b_34%,#090f18_66%,#050912_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(93,176,255,0.16),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(255,165,123,0.1),transparent_20%),radial-gradient(circle_at_56%_74%,rgba(88,214,194,0.12),transparent_26%),linear-gradient(135deg,rgba(6,13,23,0.24),transparent_38%,rgba(5,10,18,0.2)_100%)]" />

      <motion.div
        className="absolute inset-[-8%] mix-blend-screen opacity-70"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -40, 18, 0],
                y: [0, 22, -12, 0],
                scale: [1, 1.04, 1.08, 1.02],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(72,177,171,0.36),transparent_16%),radial-gradient(circle_at_36%_18%,rgba(82,114,255,0.28),transparent_18%),radial-gradient(circle_at_76%_42%,rgba(174,88,154,0.32),transparent_18%),radial-gradient(circle_at_64%_70%,rgba(51,125,112,0.24),transparent_18%),radial-gradient(circle_at_26%_80%,rgba(255,164,119,0.16),transparent_14%)] blur-[34px]" />
      </motion.div>

      <motion.div
        className="absolute inset-[-12%] mix-blend-lighten opacity-52"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 34, -20, 0],
                y: [0, -20, 14, 0],
                scale: [1.02, 1.08, 1.02],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_68%,rgba(56,185,210,0.22),transparent_18%),radial-gradient(circle_at_48%_52%,rgba(124,92,181,0.24),transparent_26%),radial-gradient(circle_at_82%_20%,rgba(82,187,158,0.24),transparent_18%),radial-gradient(circle_at_78%_76%,rgba(186,146,211,0.16),transparent_14%)] blur-[54px]" />
      </motion.div>

      <motion.div
        className="absolute inset-x-[-12%] top-[4%] h-[38%] cosmic-aurora cosmic-aurora-top"
        animate={prefersReducedMotion ? undefined : { x: [0, -28, 14, 0], y: [0, 8, -6, 0], opacity: [0.32, 0.5, 0.36, 0.32] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-8%] right-[-8%] h-[44%] w-[60%] cosmic-aurora cosmic-aurora-bottom"
        animate={prefersReducedMotion ? undefined : { x: [0, 18, -10, 0], y: [0, -10, 6, 0], opacity: [0.22, 0.38, 0.26, 0.22] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="cosmic-grain cosmic-grain-base absolute inset-0 opacity-[0.68]" />
      <div className="cosmic-grain cosmic-grain-drift absolute inset-[-10%] opacity-[0.54] mix-blend-screen" />
      <div className="cosmic-grain cosmic-grain-highlight absolute inset-[-4%] opacity-[0.34] mix-blend-lighten" />

      <div className="cosmic-particles cosmic-particles-soft absolute inset-0 opacity-45" />
      <div className="cosmic-particles cosmic-particles-near absolute inset-[-6%] opacity-55" />
      <div className="cosmic-constellation absolute inset-0 opacity-[0.18]" />

      <motion.div
        className="absolute left-[-14%] top-[34%] h-[44vw] w-[44vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28)_0%,rgba(170,222,255,0.22)_18%,rgba(103,175,220,0.12)_38%,transparent_66%)] blur-[20px] mix-blend-screen"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 18, -12, 0],
                y: [0, -12, 8, 0],
                scale: [0.84, 1.08, 0.96, 0.84],
                opacity: [0.14, 0.42, 0.22, 0.14],
              }
        }
        transition={{ duration: 8.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute right-[-18%] top-[6%] h-[58vw] w-[52vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(189,200,255,0.1)_18%,rgba(115,76,148,0.12)_34%,transparent_68%)] blur-[56px]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -42, 14, 0],
                y: [0, 18, -10, 0],
                opacity: [0.28, 0.38, 0.24, 0.28],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-[10%] top-[20%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,248,232,0.86)_0%,rgba(145,228,255,0.38)_24%,rgba(84,122,184,0.14)_48%,transparent_72%)] mix-blend-screen"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [0.42, 1.06, 0.76, 0.42],
                opacity: [0.06, 0.24, 0.1, 0.06],
              }
        }
        transition={{ duration: 7.2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="cosmic-current absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.08),transparent_8%),radial-gradient(circle_at_64%_44%,rgba(145,228,255,0.08),transparent_10%),radial-gradient(circle_at_74%_70%,rgba(255,184,120,0.06),transparent_12%)] blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,16,0.14),transparent_22%,transparent_76%,rgba(4,8,16,0.18))]" />
    </motion.div>
  );
}
