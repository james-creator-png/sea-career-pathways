import { useEffect, useState } from "react";
import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { AdminPageTitle } from "@/components/admin/AdminShell";
import { AdminError } from "@/components/admin/AdminLoading";

export const Route = createFileRoute("/_authenticated/admin/profile")({ component: AdminProfile });

function AdminProfile() {
  const { user } = useRouteContext({ from: "/_authenticated" });
  const [message, setMessage] = useState("");
  useEffect(() => { setMessage(user.email ?? ""); }, [user.email]);
  return <><AdminPageTitle eyebrow="Account" title="Admin profile" description="The signed-in account currently accessing the private workspace." /><div className="max-w-2xl border border-border bg-card p-6"><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Signed-in email</p><p className="mt-2 text-lg text-foreground">{message}</p><AdminError message="Administrator permissions are managed securely in the backend role system." /></div></>;
}
