import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Layers, Wallet, Users, User, ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Layers },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/family", label: "Family", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children, title, back, action }: { children: ReactNode; title?: string; back?: boolean; action?: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen items-start justify-center bg-stage sm:py-8">
      <div className="relative flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-background sm:h-[860px] sm:rounded-[2.75rem] sm:border-[10px] sm:border-device sm:shadow-card">
        {title && (
          <header className="flex items-center gap-3 px-5 pb-3 pt-6">
            {back && (
              <button onClick={() => history.back()} aria-label="Back" className="grid h-9 w-9 place-items-center rounded-full bg-card text-primary shadow-card">
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <h1 className="flex-1 text-xl font-bold text-foreground">{title}</h1>
            {action}
          </header>
        )}
        <main className="scrollbar-none flex-1 overflow-y-auto px-5 pb-6">{children}</main>
        <nav className="flex items-center justify-around border-t border-border bg-card px-2 py-2">
          {tabs.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <Link key={to} to={to} className={cn("flex flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-medium transition-colors", active ? "bg-accent text-accent-foreground" : "text-muted-foreground")}>
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between">
      <h2 className="text-lg font-bold text-foreground">{children}</h2>
      {right}
    </div>
  );
}

export function IconTile({ icon: Icon, label, to }: { icon: typeof Home; label: string; to?: string }) {
  const inner = (
    <>
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-card">
        <Icon className="h-7 w-7" />
      </span>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </>
  );
  const cls = "flex flex-col items-center gap-2";
  return to ? <Link to={to} className={cls}>{inner}</Link> : <button className={cls}>{inner}</button>;
}
