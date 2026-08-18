import { useState } from "react";
import { Menu, X } from "lucide-react";

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "founder", label: "Founder" },
  { id: "career", label: "Crew Development" },
  { id: "life-at-sea", label: "Life at Sea" },
  { id: "responsible", label: "Responsible Hiring" },
  { id: "employers", label: "For Employers" },
  { id: "partners", label: "Network" },
  { id: "updates", label: "Updates" },
  { id: "register", label: "Candidate Portal" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-navy-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <a href="#home" className="flex items-baseline gap-2 text-primary-foreground">
          <span className="font-serif text-xl tracking-tight">GHPs</span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.24em] text-gold sm:inline">
            Management Co., Ltd.
          </span>
        </a>

        <nav className="hidden items-center gap-5 xl:flex">
          {["about", "founder", "career", "life-at-sea", "responsible", "employers", "contact"].map(
            (id) => {
              const s = sections.find((x) => x.id === id)!;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[0.78rem] text-primary-foreground/70 transition-colors hover:text-gold"
                >
                  {s.label}
                </a>
              );
            },
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#employers"
            className="hidden rounded-sm border border-gold/60 px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-navy-deep lg:inline-block"
          >
            Partner With Us
          </a>
          <a
            href="#register"
            className="hidden rounded-sm bg-gold px-4 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft sm:inline-block"
          >
            Candidate Portal
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="text-primary-foreground xl:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-primary-foreground/10 px-5 pb-5 pt-3 xl:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="py-1.5 text-sm text-primary-foreground/75 transition-colors hover:text-gold"
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
