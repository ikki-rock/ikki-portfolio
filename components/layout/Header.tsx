export default function Header() {
  return (
    <header className="h-20 bg-background/60 fixed top-0 left-0 w-full border-b border-accent z-50 backdrop-blur">
      <div className="mx-auto max-w-[64rem] w-full flex justify-between items-center h-full px-md">
        <h1 className="font-bold text-foreground text-h2 tracking-tighter italic">
          IKKI
        </h1>
      </div>
    </header>
  );
}
