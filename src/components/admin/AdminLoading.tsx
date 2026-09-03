export function AdminLoading({ label = "Loading workspace…" }: { label?: string }) {
  return <div className="border border-border bg-card p-8 text-sm text-muted-foreground" role="status">{label}</div>;
}

export function AdminError({ message = "We could not load this workspace. Please refresh and try again." }: { message?: string }) {
  return <div className="border border-destructive/40 bg-destructive/10 p-5 text-sm text-foreground" role="alert">{message}</div>;
}
