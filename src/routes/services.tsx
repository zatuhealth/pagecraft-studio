import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, School, Zap, Droplet, Flame, Tv, Receipt, Ticket, Syringe, CalendarPlus, FileText, Stethoscope } from "lucide-react";
import { AppShell, IconTile, SectionTitle } from "@/components/zatu/AppShell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Vacc Plus" },
      { name: "description", content: "Health services, recharge and bill payments." },
      { property: "og:title", content: "Services | Vacc Plus" },
      { property: "og:description", content: "Health services, recharge and bill payments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Services">
      <p className="text-sm text-muted-foreground">Everything you can pay for or book in one place.</p>
      <SectionTitle>Health</SectionTitle>
      <div className="grid grid-cols-4 gap-y-5">
        <IconTile icon={Syringe} label="Vaccines" to="/vaccinations" />
        <IconTile icon={CalendarPlus} label="Book Visit" to="/appointments" />
        <IconTile icon={FileText} label="Invoices" to="/invoices" />
        <IconTile icon={Stethoscope} label="Clinics" />
      </div>
      <SectionTitle>Recharge &amp; Pay Bills</SectionTitle>
      <div className="grid grid-cols-4 gap-y-5">
        <IconTile icon={Smartphone} label="Mobile" />
        <IconTile icon={School} label="School" />
        <IconTile icon={Zap} label="Electricity" />
        <IconTile icon={Droplet} label="Water" />
        <IconTile icon={Flame} label="Gas" />
        <IconTile icon={Tv} label="TV" />
        <IconTile icon={Receipt} label="Tax" />
        <IconTile icon={Ticket} label="Events" />
      </div>
    </AppShell>
  );
}
