import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ClipboardList, FileText, UserCheck, Users } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getAdminOverview } from "@/lib/admin.functions";
import { AdminPageTitle, AdminStatus } from "@/components/admin/AdminShell";
import { AdminError, AdminLoading } from "@/components/admin/AdminLoading";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/")({ component: AdminDashboard });

function AdminDashboard() {
  const load = useServerFn(getAdminOverview);
  const [data, setData] = useState<Awaited<ReturnType<typeof load>> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    load().then(setData).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Could not load dashboard"));
  }, [load]);

  if (error) return <><AdminPageTitle eyebrow="Overview" title="Dashboard" /><AdminError message={error === "Forbidden" ? "This account is not authorized for the administration workspace." : undefined} /></>;
  if (!data) return <><AdminPageTitle eyebrow="Overview" title="Dashboard" description="A live view of candidate registrations and review activity." /><AdminLoading /></>;

  const cards = [
    { label: "Total applications", value: data.total, icon: Users },
    { label: "New", value: data.counts.new, icon: ClipboardList },
    { label: "Reviewing", value: data.counts.reviewing, icon: FileText },
    { label: "Contacted", value: data.counts.contacted, icon: UserCheck },
    { label: "Accepted", value: data.counts.accepted, icon: ArrowUpRight },
    { label: "Rejected", value: data.counts.rejected, icon: FileText },
  ];

  return <>
    <AdminPageTitle eyebrow="Overview" title="Dashboard" description="A live view of candidate registrations and review activity." />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map(({ label, value, icon: Icon }) => <div key={label} className="border border-border bg-card p-5"><div className="flex items-start justify-between gap-4"><p className="text-sm text-muted-foreground">{label}</p><Icon size={18} className="text-gold" /></div><p className="mt-5 font-serif text-4xl text-foreground">{value}</p></div>)}
    </div>
    <section className="mt-10 border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4"><div><p className="eyebrow">Latest activity</p><h2 className="mt-1 text-2xl">Recent applications</h2></div><Button asChild variant="outline" size="sm"><Link to="/admin/applications">View all <ArrowUpRight size={14} /></Link></Button></div>
      {data.recent.length === 0 ? <p className="p-6 text-sm text-muted-foreground">No applications have been submitted yet.</p> : <div className="divide-y divide-border">{data.recent.map((application) => <Link key={application.id} to="/admin/applications/$id" params={{ id: application.id }} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-secondary"><div><p className="font-medium text-foreground">{application.full_name}</p><p className="mt-1 text-xs text-muted-foreground">{application.email} · {application.specialty}</p></div><div className="flex items-center gap-3"><AdminStatus status={application.status} /><span className="text-xs text-muted-foreground">{new Date(application.created_at).toLocaleDateString("en-GB")}</span></div></Link>)}</div>}
    </section>
  </>;
}
