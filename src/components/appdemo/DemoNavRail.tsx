import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookMarked,
  CalendarCheck,
  MessageCircle,
  MessagesSquare,
  Settings,
  Sparkles,
} from "lucide-react";

import { Wordmark } from "@/components/brand/Wordmark";
import { cn } from "@/lib/utils";

interface NavItem {
  readonly label: string;
  readonly icon: LucideIcon;
  readonly active?: boolean;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Practice", icon: MessageCircle, active: true },
  { label: "Scenarios", icon: Sparkles },
  { label: "Review", icon: BookMarked },
  { label: "Progress", icon: BarChart3 },
  { label: "Plan", icon: CalendarCheck },
  { label: "Community", icon: MessagesSquare },
  { label: "Settings", icon: Settings },
];

/** Static, non-routing recreation of the app's left NavRail. Hidden < lg. */
export function DemoNavRail({ className }: { readonly className?: string }) {
  return (
    <aside className={cn("hidden w-56 shrink-0 flex-col border-r border-ink-800 bg-ink-900/50 p-3 lg:flex", className)}>
      <div className="px-2 py-1.5">
        <Wordmark markClassName="h-6 w-6" />
      </div>
      <nav className="mt-2 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <span
            key={item.label}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
              item.active ? "bg-ink-800 text-ink-50" : "text-ink-400",
            )}
          >
            <item.icon className="h-4 w-4" aria-hidden />
            {item.label}
          </span>
        ))}
      </nav>
    </aside>
  );
}
