import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  tone?: "light" | "muted" | "navy";
}) {
  const toneClass =
    tone === "navy"
      ? "bg-navy text-primary-foreground"
      : tone === "muted"
        ? "bg-secondary text-foreground"
        : "bg-background text-foreground";

  return (
    <section id={id} className={`${toneClass} py-20 md:py-28`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl leading-tight md:text-[2.6rem]">{title}</h2>
        {intro && (
          <p
            className={`mt-5 max-w-2xl text-[0.98rem] leading-relaxed ${
              tone === "navy" ? "text-primary-foreground/75" : "text-muted-foreground"
            }`}
          >
            {intro}
          </p>
        )}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
