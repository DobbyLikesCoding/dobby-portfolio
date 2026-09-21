type SpaceSectionBackdropProps = {
  variant?: 'soft' | 'medium' | 'feature';
};

const variantClasses: Record<NonNullable<SpaceSectionBackdropProps['variant']>, string> = {
  soft: 'opacity-[0.12]',
  medium: 'opacity-[0.16]',
  feature: 'opacity-[0.2]',
};

export default function SpaceSectionBackdrop({
  variant = 'medium',
}: SpaceSectionBackdropProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,20,0)_0%,rgba(5,9,19,0.06)_12%,rgba(6,11,19,0.18)_34%,rgba(5,10,18,0.34)_100%)]" />
      <div
        className={[
          'absolute inset-0',
          'bg-[radial-gradient(circle_at_18%_20%,rgba(96,165,250,0.06),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(196,181,253,0.035),transparent_18%),radial-gradient(circle_at_62%_68%,rgba(45,212,191,0.03),transparent_22%),linear-gradient(180deg,rgba(8,15,25,0.02),rgba(8,15,25,0.08))]',
          variantClasses[variant],
        ].join(' ')}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0)_0%,rgba(4,8,16,0.01)_14%,rgba(5,10,18,0.06)_36%,rgba(5,10,18,0.14)_100%)]" />
    </div>
  );
}
