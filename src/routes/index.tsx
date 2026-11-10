import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Plus, ReceiptText, QrCode, CalendarPlus, CalendarCheck, RefreshCw, XCircle, History, Bell, Leaf, Calendar } from "lucide-react";
import { AppShell, IconTile, SectionTitle } from "@/components/zatu/AppShell";
import { dependents, invoices, ugx } from "@/lib/zatu-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home | Vacc Plus" },
      { name: "description", content: "Your Vacc Plus dashboard: wallet, family vaccinations, appointments and invoices." },
      { property: "og:title", content: "Home | Vacc Plus" },
      { property: "og:description", content: "Wallet, family vaccinations, appointments and invoices in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const cats = ["immunity", "travel", "high-risk"] as const;

function Index() {
  const [sel, setSel] = useState("ali");
  const [cat, setCat] = useState<(typeof cats)[number]>("immunity");
  const d = dependents.find((x) => x.id === sel)!;
  const list = d.vaccines.filter((v) => v.category === cat);
  const inv = invoices[0];

  return (
    <AppShell>
      <div className="flex items-center gap-4 pt-6">
        <Menu className="h-6 w-6 text-foreground" />
        <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground">A</div>
        <div>
          <p className="text-sm text-muted-foreground">Welcome to Vacc Plus</p>
          <p className="text-xl font-bold text-foreground">Ali Jjunju</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 rounded-3xl bg-primary p-4 shadow-card">
        {[
          { icon: Plus, label: "Add Fund" },
          { icon: ReceiptText, label: "Invoices" },
          { icon: CalendarCheck, label: "Appointments" },
          { icon: QrCode, label: "Scan QR" },
        ].map(({ icon: I, label }) => (
          <Link to={label === "Invoices" ? "/invoices" : label === "Appointments" ? "/appointments" : "/wallet"} key={label} className="flex min-w-0 flex-col items-center gap-2">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary-foreground"><I className="h-5 w-5" /></span>
            <span className="max-w-full break-words text-center text-xs text-primary-foreground">{label}</span>
          </Link>
        ))}
      </div>

      <SectionTitle right={<Link to="/vaccinations/add" aria-label="Add dependent"><Plus className="h-6 w-6 text-primary" /></Link>}>Vaccinations</SectionTitle>
      <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
        <span className="text-muted-foreground">My records</span>
        <Link to="/vaccinations" className="text-primary">Vaccine registry &gt;</Link>
      </div>
      <div className="scrollbar-none -mx-5 mt-3 flex gap-3 overflow-x-auto px-5">
        {dependents.map((p) => (
          <button key={p.id} onClick={() => setSel(p.id)} className="flex w-[72px] shrink-0 flex-col items-center gap-1">
            <img src={p.avatar} alt={p.name} width={64} height={64} loading="lazy" className={cn("h-16 w-16 rounded-2xl object-cover border-2", sel === p.id ? "border-accent" : "border-transparent")} />
            <span className={cn("truncate text-[11px] w-full text-center", sel === p.id ? "font-bold text-primary" : "text-muted-foreground")}>{p.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-6 border-b border-border">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("-mb-px border-b-2 pb-2 text-sm font-bold uppercase", cat === c ? "border-accent text-primary" : "border-transparent text-muted-foreground")}>
            {c.replace("-", " ")}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {list.length === 0 && <p className="py-3 text-center text-sm text-muted-foreground">No {cat.replace("-", " ")} vaccines recorded.</p>}
        {list.map((v) => (
          <Link key={v.name} to="/vaccinations/$id" params={{ id: d.id }} className="flex items-center justify-between rounded-2xl bg-card p-3 shadow-card">
            <div>
              <p className="text-sm font-semibold text-foreground">{v.name}</p>
              <p className="text-xs text-muted-foreground">Due {v.dueDate} · {v.location}</p>
            </div>
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", v.taken ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground")}>{v.taken ? "Taken" : "Due"}</span>
          </Link>
        ))}
      </div>

      <SectionTitle>Manage Appointments</SectionTitle>
      <div className="grid grid-cols-4 gap-y-5">
        <IconTile icon={CalendarPlus} label="Book Visit" to="/appointments" />
        <IconTile icon={CalendarCheck} label="Upcoming" to="/appointments" />
        <IconTile icon={RefreshCw} label="Reschedule" to="/appointments" />
        <IconTile icon={XCircle} label="Cancel" to="/appointments" />
        <IconTile icon={History} label="Past Visits" to="/appointments" />
        <IconTile icon={Bell} label="Reminders" to="/appointments" />
      </div>

      <SectionTitle right={<Link to="/invoices" className="text-sm text-muted-foreground">See All &gt;</Link>}>Pay Invoice</SectionTitle>
      <div className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-card">
        <div className="flex gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-card"><Leaf className="h-7 w-7 text-accent" /></span>
          <div className="flex-1">
            <p className="font-bold">{inv.merchant}</p>
            <p className="text-sm opacity-80">{inv.note}</p>
            <p className="flex items-center gap-1 text-xs opacity-80"><Calendar className="h-3 w-3" />{inv.date}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{ugx(inv.amount)}</p>
            <button className="mt-2 rounded-xl bg-accent px-5 py-1.5 text-sm font-bold text-accent-foreground">Pay</button>
          </div>
        </div>
        <div className="mt-4 flex justify-between border-t border-primary-soft pt-3 text-xs">
          <span className="opacity-80">Invoice Reference</span><span className="font-bold">{inv.ref}</span>
        </div>
      </div>
    </AppShell>
  );
}
