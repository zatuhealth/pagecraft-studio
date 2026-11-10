import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Bell, Shield, HelpCircle, LogOut, Store } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/zatu/AppShell";
import { Switch } from "@/components/ui/switch";
import ali from "@/assets/avatar-ali.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile | Vacc Plus" },
      { name: "description", content: "Your Vacc Plus account and settings." },
      { property: "og:title", content: "Profile | Vacc Plus" },
      { property: "og:description", content: "Your Vacc Plus account and settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const [agent, setAgent] = useState(false);
  return (
    <AppShell title="Profile">
      <div className="flex flex-col items-center rounded-3xl bg-primary p-6 text-primary-foreground shadow-card">
        <img src={ali} alt="Ali Jjunju" width={88} height={88} className="h-[88px] w-[88px] rounded-full border-4 border-accent object-cover" />
        <p className="mt-3 text-xl font-bold">Ali Jjunju</p>
        <p className="text-sm opacity-80">0772 XXX XXX · Kampala</p>
      </div>
      <SectionTitle>Account</SectionTitle>
      <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
        <Store className="h-5 w-5 text-primary" />
        <div className="flex-1"><p className="text-sm font-semibold text-foreground">{agent ? "Agent / Merchant" : "End User"} mode</p><p className="text-xs text-muted-foreground">Switch to collect payments as an agent</p></div>
        <Switch checked={agent} onCheckedChange={setAgent} />
      </div>
      <SectionTitle>Settings</SectionTitle>
      <div className="divide-y divide-border rounded-2xl bg-card shadow-card">
        {[{ i: Bell, l: "Notifications" }, { i: Shield, l: "Privacy & security" }, { i: HelpCircle, l: "Help & support" }, { i: LogOut, l: "Log out" }].map(({ i: I, l }) => (
          <button key={l} className="flex w-full items-center gap-3 p-4 text-left"><I className="h-5 w-5 text-primary" /><span className="flex-1 text-sm font-medium text-foreground">{l}</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></button>
        ))}
      </div>
    </AppShell>
  );
}
