import { useReducedMotion } from 'framer-motion';

export default function SharedSectionsBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#030611_0%,#060d17_34%,#08101a_66%,#050912_100%)]" />
      {!prefersReducedMotion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/sections-unified-space-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.34] saturate-[0.94] brightness-[0.68] contrast-[1.04]"
        >
          <source src="/videos/sections-unified-space.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,17,0.1)_0%,rgba(4,8,16,0.18)_18%,rgba(5,10,18,0.3)_56%,rgba(5,10,18,0.52)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(120,214,255,0.09),transparent_20%),radial-gradient(circle_at_82%_24%,rgba(142,154,255,0.06),transparent_18%),radial-gradient(circle_at_56%_72%,rgba(92,234,214,0.05),transparent_22%)]" />
      <div className="cosmic-grain cosmic-grain-base absolute inset-0 opacity-[0.05]" />
      <div className="cosmic-grain cosmic-grain-drift absolute inset-[-10%] opacity-[0.02] mix-blend-screen" />
      <div className="cosmic-particles cosmic-particles-soft absolute inset-0 opacity-[0.02]" />
      <div className="absolute inset-0 opacity-[0.012] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:92px_92px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />
    </div>
  );
}
