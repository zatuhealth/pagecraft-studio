import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { AppShell, SectionTitle } from "@/components/zatu/AppShell";
import { appointments } from "@/lib/zatu-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments | Vacc Plus" },
      { name: "description", content: "Book, reschedule and review your family's health visits." },
      { property: "og:title", content: "Appointments | Vacc Plus" },
      { property: "og:description", content: "Book, reschedule and review your family's health visits." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = appointments.filter((a) => a.status === tab);
  return (
    <AppShell title="Appointments" back>
      <button onClick={() => toast.success("Visit request sent")} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 font-bold text-accent-foreground shadow-card">
        <CalendarPlus className="h-5 w-5" /> Book a Visit
      </button>
      <SectionTitle>My Visits</SectionTitle>
      <div className="grid grid-cols-2 rounded-xl bg-secondary p-1">
        {(["upcoming", "past"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("rounded-lg py-2 text-sm font-bold capitalize", tab === t ? "bg-primary text-primary-foreground" : "text-secondary-foreground")}>{t === "past" ? "Past visits" : "Upcoming"}</button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {list.length === 0 && <p className="py-3 text-center text-sm text-muted-foreground">No visits here yet.</p>}
        {list.map((a) => (
          <div key={a.id} className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-start justify-between gap-3"><p className="text-sm font-bold text-foreground">{a.title}</p><span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-secondary-foreground">{a.who}</span></div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-4 w-4" />{a.place}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-4 w-4" />{a.date} · {a.time}</p>
            {tab === "upcoming" && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => toast("Pick a new time")} className="rounded-xl bg-secondary py-2 text-sm font-bold text-secondary-foreground">Reschedule</button>
                <button onClick={() => toast("Appointment cancelled")} className="rounded-xl border border-destructive py-2 text-sm font-bold text-destructive">Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
