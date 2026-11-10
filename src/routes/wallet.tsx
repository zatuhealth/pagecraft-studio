import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Plus, ReceiptText, CalendarCheck, QrCode, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/zatu/AppShell";
import { transactions, ugx } from "@/lib/zatu-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "My Digital Wallet | Vacc Plus" },
      { name: "description", content: "Check your balance, add funds, view invoices and pay for care." },
      { property: "og:title", content: "My Digital Wallet | Vacc Plus" },
      { property: "og:description", content: "Check your balance, add funds, view invoices and pay for care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const [show, setShow] = useState(false);
  return (
    <AppShell title="My Digital Wallet">
      <div className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-card">
        <p className="text-sm opacity-80">Mobile No. 0772 XXX XXX</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-2xl font-extrabold">{show ? ugx(105000) : "UGX ••••••"}</p>
          <button onClick={() => setShow(!show)} aria-label="Toggle balance">{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
        </div>
        <button onClick={() => setShow(!show)} className="mt-3 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">{show ? "Hide Balance" : "Tap to View Balance"}</button>
        <div className="mt-5 grid grid-cols-4">
          {([{ i: Plus, l: "Fund" }, { i: ReceiptText, l: "Invoices", to: "/invoices" }, { i: CalendarCheck, l: "Appointments", to: "/appointments" }, { i: QrCode, l: "My QR" }] as { i: typeof Plus; l: string; to?: "/invoices" | "/appointments" }[]).map(({ i: I, l, to }) => {
            const inner = <><span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft"><I className="h-5 w-5" /></span><span className="max-w-full break-words text-center text-xs">{l}</span></>;
            return to ? <Link key={l} to={to} className="flex min-w-0 flex-col items-center gap-2">{inner}</Link> : <button key={l} className="flex min-w-0 flex-col items-center gap-2">{inner}</button>;
          })}
        </div>
      </div>
      <SectionTitle>History</SectionTitle>
      <div className="space-y-2 pb-2">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-card">
            <span className={cn("grid h-10 w-10 place-items-center rounded-xl", t.amount > 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-primary")}>
              {t.amount > 0 ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
            </span>
            <div className="flex-1"><p className="text-sm font-semibold text-foreground">{t.label}</p><p className="text-xs text-muted-foreground">{t.sub} · {t.date}</p></div>
            <p className={cn("text-sm font-bold", t.amount > 0 ? "text-accent" : "text-foreground")}>{t.amount > 0 ? "+" : "-"}{ugx(t.amount)}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
