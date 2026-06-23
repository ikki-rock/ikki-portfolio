export default function HeroCover() {
  return (
    <section className="snap-start h-dvh w-full flex flex-col justify-center relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "3rem 3rem",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-[64rem] mx-auto px-md">
        {/* Mobile: 세로 중앙 스택 */}
        <div className="flex flex-col items-center text-center md:hidden">
          <h2 className="hero-enter text-[clamp(3.25rem,11vw,5.75rem)] font-black italic tracking-[-0.03em] leading-[0.95]">
            IKKI
          </h2>
          <div className="hero-enter-delay mt-8 flex flex-col items-center gap-4">
            <p className="text-[13px] font-medium text-foreground/55 tracking-[0.04em]">
              Web Developer
            </p>
            <span className="block w-8 h-px bg-foreground/15" aria-hidden />
            <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/32">
              Simple · Flexible
            </p>
          </div>
        </div>

        {/* Desktop: 화면 가운데 · IKKI + 서브카피 */}
        <div className="hidden md:flex md:justify-center md:items-center md:gap-8 lg:gap-10">
          <h2 className="hero-enter text-[clamp(5.5rem,13vw,10rem)] font-black italic tracking-[-0.04em] leading-[0.85] shrink-0">
            IKKI
          </h2>

          <div className="hero-enter-delay flex flex-col items-start justify-center text-left border-l border-foreground/12 pl-6 lg:pl-7 self-stretch py-1">
            <p className="text-sm lg:text-[15px] font-medium text-foreground/55 tracking-[0.04em] whitespace-nowrap">
              Web Developer
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-foreground/32 leading-relaxed whitespace-nowrap">
              Simple · Flexible
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
        <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/50">
          Scroll
        </span>
        <div className="w-px h-10 bg-foreground/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/60 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
