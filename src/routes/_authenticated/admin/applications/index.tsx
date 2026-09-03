import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { listApplications, type ApplicationStatus } from "@/lib/admin.functions";
import { AdminError, AdminLoading, AdminPageTitle, AdminStatus } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/applications/")({ component: ApplicationsPage });

const statuses: Array<{ value: ApplicationStatus | ""; label: string }> = [{ value: "", label: "All statuses" }, { value: "new", label: "New" }, { value: "reviewing", label: "Reviewing" }, { value: "contacted", label: "Contacted" }, { value: "accepted", label: "Accepted" }, { value: "rejected", label: "Rejected" }];

function ApplicationsPage() {
  const list = useServerFn(listApplications);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Awaited<ReturnType<typeof list>> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    list({ data: { page, pageSize: 20, search: query, specialty: "", position: "", status: status || null } }).then(setData).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Could not load applications"));
  }, [list, page, query, status]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setPage(1); setQuery(search.trim()); }
  return <>
    <AdminPageTitle eyebrow="Candidate pipeline" title="Applications" description="Search and review submitted candidate profiles without loading the full pipeline at once." />
    <form onSubmit={submitSearch} className="mb-5 flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Search applications</span><Search size={16} className="absolute left-3 top-3.5 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email or phone" className="w-full rounded-sm border border-border bg-card py-3 pl-9 pr-3 text-sm text-foreground outline-none focus:border-accent" /></label><select value={status} onChange={(event) => { setStatus(event.target.value as ApplicationStatus | ""); setPage(1); }} className="rounded-sm border border-border bg-card px-3 py-3 text-sm text-foreground outline-none focus:border-accent">{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select><Button type="submit" className="h-11 bg-gold text-navy-deep hover:bg-gold-soft">Search</Button></form>
    {error ? <AdminError message={error} /> : !data ? <AdminLoading label="Loading applications…" /> : <>
      <div className="overflow-hidden border border-border bg-card"><div className="hidden grid-cols-[1.5fr_1.4fr_1fr_0.8fr_0.8fr] gap-4 border-b border-border px-5 py-3 text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground md:grid"><span>Candidate</span><span>Contact</span><span>Specialty</span><span>Submitted</span><span>Status</span></div>{data.applications.length === 0 ? <p className="p-8 text-sm text-muted-foreground">No applications match your search.</p> : <div className="divide-y divide-border">{data.applications.map((application) => <Link key={application.id} to="/admin/applications/$id" params={{ id: application.id }} className="grid gap-2 px-5 py-4 transition-colors hover:bg-secondary md:grid-cols-[1.5fr_1.4fr_1fr_0.8fr_0.8fr] md:items-center md:gap-4"><div><p className="font-medium text-foreground">{application.full_name}</p><p className="mt-1 text-xs text-muted-foreground">{application.experience_years === null ? "Experience not specified" : `${application.experience_years} years' experience`}</p></div><div className="text-xs text-muted-foreground"><p>{application.email}</p><p className="mt-1">{application.phone}</p></div><p className="text-sm text-muted-foreground">{application.specialty}{application.position ? ` · ${application.position}` : ""}</p><p className="text-xs text-muted-foreground">{new Date(application.created_at).toLocaleDateString("en-GB")}</p><div><AdminStatus status={application.status} /></div></Link>)}</div>}</div>
      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground"><span>{data.total} total · Page {data.page} of {data.totalPages}</span><div className="flex gap-2"><Button type="button" variant="outline" size="icon" aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={16} /></Button><Button type="button" variant="outline" size="icon" aria-label="Next page" disabled={page >= data.totalPages} onClick={() => setPage((value) => value + 1)}><ChevronRight size={16} /></Button></div></div>
    </>}
  </>;
}
