import { useState, type FormEvent } from "react";

const fieldClass =
  "w-full rounded-sm border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-accent/40 bg-card p-8 shadow-elegant">
        <p className="eyebrow">Profile received</p>
        <h3 className="mt-3 text-2xl">Thank you — your profile is in our talent repository</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Our crew development team will contact you when a screening session, workshop or
          orientation program is scheduled. Registration enters your profile into our training and
          screening pool. It does not guarantee employment or constitute a job offer, and no fee is
          ever charged.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-card p-6 shadow-elegant md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Full name</span>
          <input required name="name" className={fieldClass} placeholder="As shown on passport" />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Phone / WhatsApp</span>
          <input required name="phone" className={fieldClass} placeholder="+95 ..." />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Email</span>
          <input required type="email" name="email" className={fieldClass} placeholder="you@email.com" />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Primary specialty</span>
          <select name="specialty" className={fieldClass}>
            <option>Food &amp; Beverage</option>
            <option>Housekeeping</option>
            <option>Front Office</option>
            <option>Other</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Cruise / hotel experience (years)</span>
          <input
            name="experience"
            type="number"
            min={0}
            max={50}
            className={fieldClass}
            placeholder="0"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">English proficiency level</span>
          <select name="english" className={fieldClass}>
            <option>Basic</option>
            <option>Intermediate</option>
            <option>Fluent</option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-1.5 text-sm">
        <span className="text-muted-foreground">Upload CV / Resume</span>
        <input
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          className={`${fieldClass} file:mr-3 file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-[0.14em] file:text-foreground`}
        />
      </label>

      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input required type="checkbox" className="mt-0.5 accent-[var(--gold)]" />
        <span>
          I understand that registration enters my profile into the GHPs Management training and
          screening pool, that it is free of charge, and that it does not guarantee employment or
          constitute a job offer. Placement services will be provided only once the relevant
          Myanmar regulatory authorization has been obtained.
        </span>
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-sm bg-gold px-6 py-3 text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft md:w-auto"
      >
        Submit profile
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
        Registration does not constitute a job offer or guarantee of employment. Opportunities are
        subject to verified vacancies, candidate qualifications and employer selection.
      </p>

    </form>
  );
}
