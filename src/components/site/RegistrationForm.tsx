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
        <p className="eyebrow">Interest recorded</p>
        <h3 className="mt-3 text-2xl">Thank you for your interest</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your details have been noted for our candidate interest list. A member of our crew
          development team will contact you when a screening or preparation session is scheduled.
          Registration does not constitute a job offer or a guarantee of employment, and no fee is
          ever charged for registering your interest.
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
          <span className="text-muted-foreground">Email</span>
          <input required type="email" name="email" className={fieldClass} placeholder="you@email.com" />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Phone / Viber</span>
          <input required name="phone" className={fieldClass} placeholder="+95 ..." />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Area of interest</span>
          <select name="department" className={fieldClass}>
            <option>Food &amp; Beverage Service</option>
            <option>Galley / Culinary</option>
            <option>Housekeeping &amp; Cabin Service</option>
            <option>Guest Services &amp; Reception</option>
            <option>Bar &amp; Beverage</option>
            <option>Retail, Spa &amp; Other</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">English level (self-assessed)</span>
          <select name="english" className={fieldClass}>
            <option>Basic</option>
            <option>Conversational</option>
            <option>Good</option>
            <option>Fluent</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Hospitality experience</span>
          <select name="experience" className={fieldClass}>
            <option>No experience</option>
            <option>Under 1 year</option>
            <option>1–3 years</option>
            <option>3+ years</option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-1.5 text-sm">
        <span className="text-muted-foreground">Brief background (optional)</span>
        <textarea
          name="notes"
          rows={4}
          className={fieldClass}
          placeholder="Education, current role, training completed, availability"
        />
      </label>

      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input required type="checkbox" className="mt-0.5 accent-[var(--gold)]" />
        <span>
          I understand that GHPs Management Co., Ltd. is building a candidate interest list for
          future cruise crew career development activities, that registration is free, that it is
          not an offer of employment, and that placement services will only be provided once the
          relevant Myanmar regulatory authorization has been obtained.
        </span>
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-sm bg-navy px-6 py-3 text-[0.78rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-navy-deep md:w-auto"
      >
        Submit registration
      </button>
    </form>
  );
}
