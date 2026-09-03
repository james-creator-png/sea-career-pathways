import { useState, type FormEvent } from "react";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AdminPageTitle } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/_authenticated/admin/profile")({ component: AdminProfile });

function AdminProfile() {
  const { user } = useRouteContext({ from: "/_authenticated" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<{ tone: "ok" | "error"; message: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    if (password.length < 10) {
      setStatus({ tone: "error", message: "Use at least 10 characters for the new password." });
      return;
    }
    if (password !== confirmPassword) {
      setStatus({ tone: "error", message: "The two passwords do not match." });
      return;
    }
    setBusy(true);
    const result = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (result.error) {
      setStatus({ tone: "error", message: "Password could not be updated. Please try again." });
      return;
    }
    setPassword("");
    setConfirmPassword("");
    setStatus({ tone: "ok", message: "Password updated. Use the new password at the next sign in." });
  }

  return (
    <>
      <AdminPageTitle eyebrow="Account" title="Admin profile" description="The signed-in account currently accessing the private workspace." />
      <div className="grid max-w-2xl gap-6">
        <div className="border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Signed-in email</p>
          <p className="mt-2 text-lg text-foreground">{user.email}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Administrator permissions are managed securely in the backend role system and cannot be changed from this page.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-5 border border-border bg-card p-6">
          <div>
            <h2 className="text-2xl">Change password</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Replace the temporary password issued during account setup with one only you know.</p>
          </div>
          <label className="grid gap-2 text-sm">
            <span className="text-muted-foreground">New password</span>
            <input required type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-sm border border-border bg-background px-3.5 py-3 text-foreground outline-none focus:border-accent" />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-muted-foreground">Confirm new password</span>
            <input required type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-sm border border-border bg-background px-3.5 py-3 text-foreground outline-none focus:border-accent" />
          </label>
          {status ? <p role="alert" className={`border p-3 text-xs leading-relaxed ${status.tone === "ok" ? "border-accent/40 bg-accent/10 text-foreground" : "border-destructive/40 bg-destructive/10 text-foreground"}`}>{status.message}</p> : null}
          <Button type="submit" disabled={busy} className="h-11 w-fit gap-2 bg-gold text-navy-deep hover:bg-gold-soft"><KeyRound size={16} /> {busy ? "Updating…" : "Update password"}</Button>
        </form>
      </div>
    </>
  );
}
