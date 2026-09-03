import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Anchor, LockKeyhole, Ship } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin sign in | GHPs Management" },
      { name: "description", content: "Secure administration sign in for GHPs Management candidate operations." },
      { property: "og:title", content: "Admin sign in | GHPs Management" },
      { property: "og:description", content: "Secure administration sign in for GHPs Management candidate operations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (result.error) {
      setError("Sign in failed. Check your email and password, then try again.");
      setBusy(false);
      return;
    }
    await navigate({ to: "/admin", replace: true });
  }

  return <main className="grid min-h-screen place-items-center bg-navy-deep px-5 py-12">
    <div className="w-full max-w-md border border-primary-foreground/15 bg-background p-7 shadow-elegant sm:p-9">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-sm border border-gold/50 text-gold"><Ship size={20} /></div>
        <div><p className="font-serif text-2xl text-foreground">GHPs Management</p><p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Private administration</p></div>
      </div>
      <p className="eyebrow">Authorized access</p>
      <h1 className="mt-3 text-4xl">Admin sign in</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Use an authorized administrator account to review candidate applications and documents.</p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm"><span className="text-muted-foreground">Email address</span><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-sm border border-border bg-card px-3.5 py-3 text-foreground outline-none focus:border-accent" /></label>
        <label className="grid gap-2 text-sm"><span className="text-muted-foreground">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-sm border border-border bg-card px-3.5 py-3 text-foreground outline-none focus:border-accent" /></label>
        {error ? <p role="alert" className="border border-destructive/40 bg-destructive/10 p-3 text-xs leading-relaxed text-foreground">{error}</p> : null}
        <Button type="submit" disabled={busy} className="mt-1 h-11 w-full gap-2 bg-gold text-navy-deep hover:bg-gold-soft"><LockKeyhole size={16} /> {busy ? "Signing in…" : "Sign in securely"}</Button>
      </form>
      <a href="/#home" className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-gold"><Anchor size={14} /> Return to public website</a>
    </div>
  </main>;
}
