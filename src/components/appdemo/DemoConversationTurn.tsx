import type { ReactNode } from "react";
import { Languages, Volume2 } from "lucide-react";

import { DemoRole } from "@/lib/enums";
import { cn } from "@/lib/utils";

interface TurnProps {
  readonly role: DemoRole;
  readonly text: string;
  readonly gloss?: string;
  /** Render the coach phrase in the editorial display serif (the L2 line). */
  readonly display?: boolean;
  /** Show the translate / listen tool row (coach turns only). */
  readonly tools?: boolean;
  /** Highlight the bubble when its correction card is focused. */
  readonly highlighted?: boolean;
  readonly onListen?: () => void;
  readonly listening?: boolean;
  /** Right-to-left script (e.g. Arabic). */
  readonly rtl?: boolean;
}

/** A single chat bubble — learner (right, sage) or coach (left, ink). */
export function DemoConversationTurn({
  role,
  text,
  gloss,
  display,
  tools,
  highlighted,
  onListen,
  listening,
  rtl,
}: TurnProps) {
  const isLearner = role === DemoRole.Learner;

  return (
    <div className={cn("flex w-full", isLearner ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[85%] flex-col", isLearner ? "items-end" : "items-start")}>
        <div
          dir={rtl ? "rtl" : undefined}
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-shadow",
            isLearner
              ? "bg-sage-500/15 text-ink-100 ring-1 ring-sage-500/20"
              : "bg-ink-800 text-ink-100",
            highlighted && "ring-2 ring-gold-400/60",
          )}
        >
          <p className={cn(display && "font-display text-base font-medium leading-snug")}>{text}</p>
          {gloss ? <p className="mt-1 text-xs text-ink-400">{gloss}</p> : null}
        </div>

        {tools ? (
          <div className="mt-1.5 flex items-center gap-1">
            <ToolButton icon={<Languages className="h-3.5 w-3.5" />} label="Translate" />
            <ToolButton
              icon={<Volume2 className={cn("h-3.5 w-3.5", listening && "animate-pulse")} />}
              label="Listen"
              onClick={onListen}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ToolButton({
  icon,
  label,
  onClick,
}: {
  readonly icon: ReactNode;
  readonly label: string;
  readonly onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      tabIndex={-1}
      className="grid h-7 w-7 place-items-center rounded-md text-ink-400 transition-colors hover:bg-ink-800 hover:text-ink-200"
    >
      {icon}
    </button>
  );
}
