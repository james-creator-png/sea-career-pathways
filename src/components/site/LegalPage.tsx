import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { SiteFooter } from "@/components/site/SiteFooter";

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 text-3xl leading-tight md:text-[2.6rem]">{title}</h1>
        <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">{intro}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground/70">
          Last updated: {updated}
        </p>
        <div className="mt-10 space-y-8">{children}</div>
        <Link
          to="/"
          className="mt-12 inline-block rounded-sm border border-border px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          &larr; Back to home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl leading-snug">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
