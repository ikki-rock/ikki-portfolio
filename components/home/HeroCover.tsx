export default function HeroCover() {
  return (
    <section className="snap-start h-dvh w-full flex flex-col justify-center items-center px-md relative overflow-hidden">
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

      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <h2 className="hero-enter text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
          IKKI{" "}
          <span className="text-foreground/25 not-italic font-bold">STUDIO</span>
        </h2>
        <p className="hero-enter-delay font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-foreground/40">
          Simple · Flexible · Secure
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-px h-12 bg-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
