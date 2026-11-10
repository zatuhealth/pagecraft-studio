import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/zatu/AppShell";

export const Route = createFileRoute("/vaccinations/add")({
  head: () => ({
    meta: [
      { title: "Add Dependent | Vacc Plus" },
      { name: "description", content: "Add a family member or pet to track their vaccinations." },
      { property: "og:title", content: "Add Dependent | Vacc Plus" },
      { property: "og:description", content: "Add a family member or pet to track their vaccinations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const field = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring";

function Page() {
  const nav = useNavigate();
  return (
    <AppShell title="Add Dependent" back>
      <form
        className="space-y-3"
        onSubmit={(e) => { e.preventDefault(); toast.success("Dependent saved"); nav({ to: "/vaccinations" }); }}
      >
        <label className="mx-auto mb-4 flex w-fit cursor-pointer flex-col items-center gap-2">
          <span className="grid h-24 w-24 place-items-center rounded-3xl bg-secondary text-primary"><Camera className="h-8 w-8" /></span>
          <span className="text-xs font-semibold text-primary">Add picture</span>
          <input type="file" accept="image/*" className="hidden" />
        </label>
        <input required placeholder="Name" className={field} />
        <select className={field} defaultValue=""><option value="" disabled>Relationship</option><option>Spouse</option><option>Son</option><option>Daughter</option><option>Parent</option><option>Pet</option></select>
        <input type="date" className={field} aria-label="Date of birth" />
        <select className={field} defaultValue=""><option value="" disabled>Gender</option><option>Male</option><option>Female</option></select>
        <select className={field} defaultValue=""><option value="" disabled>Country</option><option>Uganda</option><option>Kenya</option><option>Tanzania</option><option>Rwanda</option></select>
        <input placeholder="State / District" className={field} />
        <input placeholder="School name" className={field} />
        <input placeholder="School number" className={field} />
        <button className="mt-2 w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground shadow-card">Save Dependent</button>
      </form>
    </AppShell>
  );
}
