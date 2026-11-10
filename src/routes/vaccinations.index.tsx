import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/zatu/AppShell";
import { dependents } from "@/lib/zatu-data";

export const Route = createFileRoute("/vaccinations/")({
  head: () => ({
    meta: [
      { title: "Vaccine Registry | Vacc Plus" },
      { name: "description", content: "All your dependents and their vaccination records." },
      { property: "og:title", content: "Vaccine Registry | Vacc Plus" },
      { property: "og:description", content: "All your dependents and their vaccination records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Vaccination" back action={<Link to="/vaccinations/add" aria-label="Add dependent" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></Link>}>
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">My dependents</p>
      <div className="space-y-3">
        {dependents.map((d) => {
          const due = d.vaccines.filter((v) => !v.taken).length;
          return (
            <Link key={d.id} to="/vaccinations/$id" params={{ id: d.id }} className="flex items-center gap-4 rounded-2xl bg-card p-3 shadow-card">
              <img src={d.avatar} alt={d.name} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-foreground">{d.fullName}</p>
                <p className="text-xs text-muted-foreground">{d.relationship} · {d.vaccines.length} records</p>
              </div>
              {due > 0 && <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">{due} due</span>}
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
