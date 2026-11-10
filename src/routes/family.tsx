import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/zatu/AppShell";
import { dependents } from "@/lib/zatu-data";

export const Route = createFileRoute("/family")({
  head: () => ({
    meta: [
      { title: "My Family | Vacc Plus" },
      { name: "description", content: "Everyone in your household, including pets." },
      { property: "og:title", content: "My Family | Vacc Plus" },
      { property: "og:description", content: "Everyone in your household, including pets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="My Family">
      <p className="text-sm text-muted-foreground">Tap a member to see their vaccine records.</p>
      <SectionTitle>Members ({dependents.length})</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        {dependents.map((d) => (
          <Link key={d.id} to="/vaccinations/$id" params={{ id: d.id }} className="rounded-2xl bg-card p-3 text-center shadow-card">
            <img src={d.avatar} alt={d.name} width={120} height={120} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
            <p className="mt-2 truncate text-sm font-semibold text-foreground">{d.name}</p>
            <p className="text-xs text-muted-foreground">{d.relationship}</p>
          </Link>
        ))}
        <Link to="/vaccinations/add" className="flex flex-col items-center justify-center gap-2 min-h-[180px] rounded-2xl border-2 border-dashed border-border p-3 text-primary">
          <UserPlus className="h-8 w-8" /><span className="text-sm font-semibold">Add member</span>
        </Link>
      </div>
    </AppShell>
  );
}
