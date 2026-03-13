"use client";

interface ThemeToggleProps {
  isIkki: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isIkki, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      type="button"
      aria-checked={isIkki}
      role="switch"
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        isIkki ? "bg-accent" : "bg-neutral-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          isIkki ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
