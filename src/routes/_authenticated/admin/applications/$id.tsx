import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText, Trash2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { addApplicationNote, createApplicationCvUrl, deleteApplication, getApplication, updateApplicationStatus, type ApplicationStatus } from "@/lib/admin.functions";
import { AdminPageTitle, AdminStatus } from "@/components/admin/AdminShell";
import { AdminError, AdminLoading } from "@/components/admin/AdminLoading";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/_authenticated/admin/applications/$id")({ component: ApplicationDetail });

const statusOptions: Array<{ value: ApplicationStatus; label: string }> = [{ value: "new", label: "New" }, { value: "reviewing", label: "Reviewing" }, { value: "contacted", label: "Contacted" }, { value: "accepted", label: "Accepted" }, { value: "rejected", label: "Rejected" }];

function ApplicationDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const load = useServerFn(getApplication);
  const changeStatus = useServerFn(updateApplicationStatus);
  const createCvUrl = useServerFn(createApplicationCvUrl);
  const addNote = useServerFn(addApplicationNote);
  const remove = useServerFn(deleteApplication);
  const [data, setData] = useState<Awaited<ReturnType<typeof load>> | null>(null);
  const [status, setStatus] = useState<ApplicationStatus>("new");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [cvBusy, setCvBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { load({ data: { id } }).then((result) => { setData(result); setStatus(result.application.status); }).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Could not load application")); }, [id, load]);

  async function saveStatus() { setBusy(true); setError(""); try { const result = await changeStatus({ data: { id, status } }); setData((current) => current ? { ...current, application: { ...current.application, status: result.status, updated_at: result.updated_at } } : current); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not update status"); } finally { setBusy(false); } }
  async function saveNote(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!note.trim()) return; setBusy(true); setError(""); try { const created = await addNote({ data: { id, note } }); setData((current) => current ? { ...current, notes: [created, ...current.notes] } : current); setNote(""); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not add note"); } finally { setBusy(false); } }
  async function openCv() { setCvBusy(true); setError(""); try { const result = await createCvUrl({ data: { id } }); if (result.url) window.open(result.url, "_blank", "noopener,noreferrer"); else setError("No CV was attached to this application."); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not create a secure CV link"); } finally { setCvBusy(false); } }
  async function handleDelete() { if (!window.confirm("Delete this application and its private CV? This action cannot be undone.")) return; setBusy(true); try { await remove({ data: { id } }); await navigate({ to: "/admin/applications" }); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not delete application"); setBusy(false); } }

  if (error && !data) return <><Link to="/admin/applications" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"><ArrowLeft size={15} /> Applications</Link><AdminError message={error} /></>;
  if (!data) return <><AdminPageTitle eyebrow="Candidate record" title="Application" /><AdminLoading /></>;
  const { application, notes } = data;
  return <>
    <Link to="/admin/applications" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"><ArrowLeft size={15} /> Applications</Link>
    <div className="flex flex-wrap items-start justify-between gap-5"><AdminPageTitle eyebrow="Candidate record" title={application.full_name} description={`${application.email} · submitted ${new Date(application.created_at).toLocaleString("en-GB")}`} /><Button type="button" variant="outline" className="gap-2 text-destructive hover:bg-destructive/10" onClick={handleDelete} disabled={busy}><Trash2 size={16} /> Delete application</Button></div>
    {error ? <div className="mb-5"><AdminError message={error} /></div> : null}
    <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
      <div className="grid gap-6">
        <section className="border border-border bg-card p-6"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4"><h2 className="text-2xl">Submitted information</h2><AdminStatus status={application.status} /></div><dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2"><div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Email</dt><dd className="mt-1 text-sm text-foreground">{application.email}</dd></div><div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Phone</dt><dd className="mt-1 text-sm text-foreground">{application.phone}</dd></div><div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Specialty</dt><dd className="mt-1 text-sm text-foreground">{application.specialty}</dd></div><div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Position</dt><dd className="mt-1 text-sm text-foreground">{application.position || "Not specified"}</dd></div><div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Experience</dt><dd className="mt-1 text-sm text-foreground">{application.experience_years === null ? "Not specified" : `${application.experience_years} years`}</dd></div><div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">English level</dt><dd className="mt-1 text-sm text-foreground">{application.english_level}</dd></div><div className="sm:col-span-2"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Additional information</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{application.additional_information || "None provided"}</dd></div></dl></section>
        <section className="border border-border bg-card p-6"><div className="flex items-center justify-between gap-4"><h2 className="text-2xl">Private notes</h2><span className="text-xs text-muted-foreground">{notes.length} note{notes.length === 1 ? "" : "s"}</span></div><form onSubmit={saveNote} className="mt-5 flex flex-col gap-3"><textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={2000} rows={3} placeholder="Add an internal review note…" className="w-full rounded-sm border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none focus:border-accent" /><Button type="submit" disabled={busy || !note.trim()} className="self-start bg-gold text-navy-deep hover:bg-gold-soft">Add private note</Button></form><div className="mt-6 divide-y divide-border">{notes.map((item) => <article key={item.id} className="py-4 first:pt-0"><p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{item.note}</p><p className="mt-2 text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString("en-GB")}</p></article>)}</div></section>
      </div>
      <aside className="grid content-start gap-6"><section className="border border-border bg-card p-6"><p className="eyebrow">Pipeline status</p><h2 className="mt-2 text-2xl">Update review stage</h2><label className="mt-5 grid gap-2 text-sm"><span className="text-muted-foreground">Current status</span><select value={status} onChange={(event) => setStatus(event.target.value as ApplicationStatus)} className="rounded-sm border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-accent">{statusOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><Button type="button" disabled={busy || status === application.status} onClick={saveStatus} className="mt-4 w-full bg-gold text-navy-deep hover:bg-gold-soft">{busy ? "Saving…" : "Save status"}</Button><p className="mt-3 text-xs text-muted-foreground">Last updated {new Date(application.updated_at).toLocaleString("en-GB")}</p></section><section className="border border-border bg-card p-6"><p className="eyebrow">Private document</p><h2 className="mt-2 text-2xl">Candidate CV</h2>{application.cv_file_name ? <><div className="mt-5 flex items-center gap-3 border border-border bg-background p-3"><FileText size={19} className="text-gold" /><span className="min-w-0 flex-1 truncate text-sm text-foreground">{application.cv_file_name}</span></div><Button type="button" variant="outline" disabled={cvBusy} onClick={openCv} className="mt-4 w-full gap-2"><Download size={16} /> {cvBusy ? "Preparing secure link…" : "Open CV securely"}</Button><p className="mt-3 text-xs leading-relaxed text-muted-foreground">The link expires automatically after five minutes.</p></> : <p className="mt-5 text-sm text-muted-foreground">No CV was uploaded.</p>}</section></aside>
    </div>
  </>;
}
