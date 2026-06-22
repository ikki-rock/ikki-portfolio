export default function Footer() {
  return (
    <footer className="w-full max-w-[64rem] px-md py-20 h-full flex flex-col items-center text-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-12">
          GET IN TOUCH.
        </h3>

        <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center mb-16">
          <a href="mailto:selfnum_1357@naver.com" className="group">
            <p className="font-mono text-xs opacity-50 mb-2 uppercase">Email</p>
            <p className="text-xl font-bold group-hover:text-accent transition-colors">
              selfnum_1357@naver.com
            </p>
          </a>
          <div>
            <p className="font-mono text-xs opacity-50 mb-2 uppercase">
              Location
            </p>
            <p className="text-xl font-bold">Seoul, Korea</p>
          </div>
          <a
            href="https://github.com/ikki-rock"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <p className="font-mono text-xs opacity-50 mb-2 uppercase">
              Github
            </p>
            <p className="text-xl font-bold group-hover:text-accent transition-colors">
              @ikki-rock
            </p>
          </a>
        </div>
      </div>

      <div className="w-full pt-8 border-t border-accent/10 flex justify-between items-center font-mono text-[10px] opacity-40 uppercase tracking-widest mt-auto">
        <p>Portfolio</p>
        <p>© 2026 IKKI</p>
      </div>
    </footer>
  );
}
