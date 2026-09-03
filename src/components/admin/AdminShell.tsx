import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { BriefcaseBusiness, ClipboardList, LogOut, Ship, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function AdminShell() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    await navigate({ to: "/admin/login", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-navy-deep lg:flex lg:flex-col">
        <div className="flex items-center gap-3 border-b border-primary-foreground/10 px-6 py-6">
          <div className="grid size-10 place-items-center rounded-sm border border-gold/50 text-gold">
            <Ship size={19} />
          </div>
          <div>
            <p className="font-serif text-xl text-primary-foreground">GHPs</p>
            <p className="text-[0.63rem] uppercase tracking-[0.16em] text-primary-foreground/55">Admin workspace</p>
          </div>
        </div>
        <nav className="grid gap-1 px-3 py-6" aria-label="Admin navigation">
          <Link to="/admin" activeOptions={{ exact: true }} className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-primary-foreground/65 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground" activeProps={{ className: "flex items-center gap-3 rounded-sm bg-primary-foreground/10 px-3 py-2.5 text-sm text-gold" }}>
            <BriefcaseBusiness size={17} /> Dashboard
          </Link>
          <Link to="/admin/applications" className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-primary-foreground/65 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground" activeProps={{ className: "flex items-center gap-3 rounded-sm bg-primary-foreground/10 px-3 py-2.5 text-sm text-gold" }}>
            <ClipboardList size={17} /> Applications
          </Link>
          <Link to="/admin/profile" className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-primary-foreground/65 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground" activeProps={{ className: "flex items-center gap-3 rounded-sm bg-primary-foreground/10 px-3 py-2.5 text-sm text-gold" }}>
            <UserRound size={17} /> Admin profile
          </Link>
        </nav>
        <div className="mt-auto border-t border-primary-foreground/10 p-4">
          <Button type="button" variant="ghost" className="w-full justify-start gap-3 text-primary-foreground/65 hover:text-primary-foreground" onClick={handleLogout}>
            <LogOut size={17} /> Sign out
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur lg:px-8">
          <div>
            <p className="eyebrow">Private operations</p>
            <p className="mt-1 text-xs text-muted-foreground">Candidate development workspace</p>
          </div>
          <Button type="button" variant="outline" size="sm" className="gap-2 lg:hidden" onClick={handleLogout}>
            <LogOut size={15} /> Sign out
          </Button>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminStatus({ status }: { status: string }) {
  const labels: Record<string, string> = { new: "New", reviewing: "Reviewing", contacted: "Contacted", accepted: "Accepted", rejected: "Rejected" };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] ${status === "accepted" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : status === "rejected" ? "border-red-400/40 bg-red-400/10 text-red-300" : status === "new" ? "border-gold/50 bg-gold/10 text-gold" : "border-border bg-secondary text-muted-foreground"}`}>{labels[status] ?? status}</span>;
}

export function AdminPageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mb-8 max-w-3xl"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 text-4xl text-foreground md:text-5xl">{title}</h1>{description ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p> : null}</div>;
}
