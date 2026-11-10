import { createFileRoute } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/zatu/AppShell";
import { invoices, ugx } from "@/lib/zatu-data";

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Payment Invoices | Vacc Plus" },
      { name: "description", content: "Pending and paid invoices from clinics and merchants." },
      { property: "og:title", content: "Payment Invoices | Vacc Plus" },
      { property: "og:description", content: "Pending and paid invoices from clinics and merchants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Payment Invoices" back>
      <div className="space-y-3">
        {invoices.map((i) => (
          <div key={i.id} className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary"><Leaf className="h-5 w-5 text-accent" /></span>
              <div className="flex-1"><p className="font-bold text-foreground">{i.merchant}</p><p className="text-xs text-muted-foreground">{i.note} · {i.date}</p></div>
              <p className="font-bold text-foreground">{ugx(i.amount)}</p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs">
              <span className="text-muted-foreground">Ref {i.ref}</span>
              {i.status === "pending"
                ? <button onClick={() => toast.success("Payment sent")} className="rounded-lg bg-accent px-4 py-1.5 font-bold text-accent-foreground">Pay</button>
                : <span className="font-bold text-accent">Paid</span>}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
