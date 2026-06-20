/** Three bouncing dots shown while Frank "checks it the honest way". */
export function TypingDots() {
  return (
    <span className="flex gap-1" aria-hidden>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-subtle [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-subtle [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-subtle" />
    </span>
  );
}
