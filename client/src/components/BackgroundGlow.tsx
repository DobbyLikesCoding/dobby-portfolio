// src/components/BackgroundGlow.tsx
export function BackgroundGlow() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        overflow-hidden
      "
    >
      {/* 큰 블롭 1 */}
      <div
        className="
          absolute
          -top-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-teal-500/20
          blur-3xl
          animate-glow-move
          mix-blend-screen
        "
      />

      {/* 큰 블롭 2 */}
      <div
        className="
          absolute
          bottom-0
          right-0
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-sky-500/10
          blur-[110px]
          animate-glow-move2
          mix-blend-screen
        "
      />

      {/* 가운데 희미한 빛 */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-72
          w-72
          rounded-full
          bg-[#64ffda]/5
          blur-3xl
          mix-blend-screen
        "
      />
    </div>
  );
}
