import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/ghps-logo.png.asset.json";


export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "founder", label: "Founder" },
  { id: "why", label: "Why We Started" },
  { id: "career", label: "Crew Development" },
  { id: "life-at-sea", label: "For Candidates" },
  { id: "responsible", label: "Responsible Hiring" },
  { id: "employers", label: "For Employers" },
  { id: "partners", label: "Working With Us" },
  { id: "commitment", label: "Commitment" },
  { id: "roadmap", label: "Future Direction" },
  { id: "updates", label: "Updates" },
  { id: "register", label: "Register Interest" },
  { id: "contact", label: "Contact" },
];


export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/10 bg-navy-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-primary-foreground">
          <img
            src={logoAsset.url}
            alt="GHPs Management Co., Ltd. — Cruises Crew Career Development and Management"
            className="h-10 w-auto rounded-sm bg-primary-foreground/95 px-2 py-1 sm:h-12"
          />
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
            Register Interest
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
