import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CheckSquare, Square, Pencil } from "lucide-react";
import { AppShell } from "@/components/zatu/AppShell";
import { findDependent } from "@/lib/zatu-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vaccinations/$id")({
  loader: ({ params }) => {
    const d = findDependent(params.id);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.fullName} vaccines | Vacc Plus` : "Unavailable | Vacc Plus" },
      { name: "description", content: "Vaccination details and schedule for this dependent." },
      { property: "og:title", content: "Vaccine Info | Vacc Plus" },
      { property: "og:description", content: "Vaccination details and schedule for this dependent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const tabs = ["immunity", "travel", "high-risk"] as const;

function Page() {
  const d = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof tabs)[number]>("immunity");
  const list = d.vaccines.filter((v) => v.category === tab);
  const info = [["Full name", d.fullName], ["Relationship", d.relationship], ["Date of birth", d.dob], ["Gender", d.gender], ["Country", d.country], ["State", d.state]];

  return (
    <AppShell title="Vaccine Info" back action={<button aria-label="Edit profile" className="grid h-9 w-9 place-items-center rounded-full bg-card text-primary shadow-card"><Pencil className="h-4 w-4" /></button>}>
      <div className="flex items-center gap-4 rounded-3xl bg-primary p-4 text-primary-foreground shadow-card">
        <img src={d.avatar} alt={d.name} width={72} height={72} className="h-18 w-18 h-[72px] w-[72px] rounded-2xl object-cover" />
        <div>
          <p className="text-lg font-bold">{d.fullName}</p>
          <p className="text-sm opacity-80">{d.relationship} · {d.gender}</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-card p-4 text-sm shadow-card">
        {info.map(([k, v]) => (
          <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-semibold text-foreground">{v}</dd></div>
        ))}
      </dl>
      <div className="mt-5 flex gap-6 border-b border-border">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("-mb-px border-b-2 pb-2 text-sm font-bold uppercase", tab === t ? "border-accent text-primary" : "border-transparent text-muted-foreground")}>{t.replace("-", " ")}</button>
        ))}
      </div>
      <div className="mt-3 space-y-3">
        {list.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No records in this category.</p>}
        {list.map((v) => (
          <div key={v.name} className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-bold text-foreground">{v.name}</p>
              <span className={cn("flex items-center gap-1 text-xs font-bold", v.taken ? "text-accent" : "text-muted-foreground")}>
                {v.taken ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}{v.taken ? "Taken" : "Not yet"}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
            <div className="mt-3 flex justify-between text-xs"><span className="text-muted-foreground">Due date</span><span className="font-semibold text-foreground">{v.dueDate}</span></div>
            <div className="mt-1 flex justify-between text-xs"><span className="text-muted-foreground">Location</span><span className="font-semibold text-foreground">{v.location}</span></div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
