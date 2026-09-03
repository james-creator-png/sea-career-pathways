import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { submitRegistration } from "@/lib/registration.functions";

const fieldClass =
  "w-full rounded-sm border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

const MAX_CV_BYTES = 4 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the selected file"));
    reader.readAsDataURL(file);
  });
}

type SubmissionNotice = "delivered" | "not-delivered" | "duplicate";

export function RegistrationForm() {
  const send = useServerFn(submitRegistration);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [submissionNotice, setSubmissionNotice] = useState<SubmissionNotice | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setSubmissionNotice(null);
    setErrorMessage("");

    try {
      const file = fd.get("cv");
      let cv: { filename: string; content: string } | null = null;
      if (file instanceof File && file.size > 0) {
        const extension = file.name.split(".").pop()?.toLowerCase();
        const hasAllowedType = ALLOWED_CV_TYPES.includes(file.type);
        const hasAllowedExtension = ["pdf", "doc", "docx"].includes(extension || "");
        if (!hasAllowedType && !hasAllowedExtension) {
          setStatus("error");
          setErrorMessage("Your CV must be a PDF or Word document (.pdf, .doc or .docx).");
          return;
        }
        if (file.size > MAX_CV_BYTES) {
          setStatus("error");
          setErrorMessage("Your CV file is larger than 4 MB. Please upload a smaller file.");
          return;
        }
        cv = { filename: file.name, content: await readFileAsBase64(file) };
      }

      const result = await send({
        data: {
          name: String(fd.get("name") || ""),
          phone: String(fd.get("phone") || ""),
          email: String(fd.get("email") || ""),
          specialty: String(fd.get("specialty") || ""),
          experience: String(fd.get("experience") || ""),
          english: String(fd.get("english") || ""),
          notes: String(fd.get("notes") || ""),
          consent: fd.get("consent") === "on",
          cv,
        },
      });

      if (result.ok) {
        setSubmissionNotice(result.duplicate ? "duplicate" : result.emailDelivered ? "delivered" : "not-delivered");
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "We could not save your registration. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "We could not send your registration just now. Please check your details and try again, or email contact@crewghpsmanagement.org.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-sm border border-accent/40 bg-card p-6 shadow-elegant md:p-8"
      >
        <p className="eyebrow">Registration received</p>
        <h3 className="mt-3 text-2xl">Thank you — your profile has reached our team</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your details have been sent to contact@crewghpsmanagement.org. Our crew development team
          will contact you when a screening session, workshop or orientation programme is scheduled.
          Registration enters your profile into our training and screening pool. It does not
          constitute a job offer, guarantee of employment or placement commitment, and no fee is
          ever charged.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-sm border border-border px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Submit another profile
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-border bg-card p-5 shadow-elegant sm:p-6 md:p-8"
    >
      <div className="mb-6 rounded-sm border border-accent/30 bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-accent">
          Privacy &amp; data-use notice
        </p>
        <p className="mt-2">
          The information you provide is collected only to assess your suitability for future
          training, screening and career-development activities, and to contact you about them. We
          do not ask for passport scans, medical records or other sensitive documents at
          registration. Your data is stored securely, is never sold, and is shared with a potential
          employer only with your prior consent. You may request correction, deletion or withdrawal
          at any time by emailing contact@crewghpsmanagement.org. Read the full{" "}
          <Link to="/privacy" className="text-accent underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/candidate-notice" className="text-accent underline underline-offset-4">
            Candidate Notice &amp; Terms
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Full name</span>
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={120}
            className={fieldClass}
            placeholder="As shown on passport"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Phone / WhatsApp</span>
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            className={fieldClass}
            placeholder="+95 ..."
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={255}
            className={fieldClass}
            placeholder="you@email.com"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted-foreground">Primary specialty</span>
          <select name="specialty" defaultValue="Food & Beverage" className={fieldClass}>
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
          <select name="english" defaultValue="Basic" className={fieldClass}>
            <option>Basic</option>
            <option>Intermediate</option>
            <option>Fluent</option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-1.5 text-sm">
        <span className="text-muted-foreground">Upload CV / Resume (PDF or Word, max 4 MB)</span>
        <input
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          className={`${fieldClass} file:mr-3 file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-[0.14em] file:text-foreground`}
        />
      </label>

      <label className="mt-4 grid gap-1.5 text-sm">
        <span className="text-muted-foreground">
          Anything else relevant to initial screening (optional)
        </span>
        <textarea
          name="notes"
          rows={3}
          maxLength={1000}
          className={fieldClass}
          placeholder="Positions held, languages spoken, availability"
        />
      </label>

      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input required type="checkbox" name="consent" className="mt-0.5 accent-[var(--gold)]" />
        <span>
          I have read and accept the Privacy Policy and Candidate Notice &amp; Terms, and I consent
          to GHPs Management Co., Ltd. storing and processing the information above for training,
          screening and career-development purposes. I understand that registration is free of
          charge and does not constitute a job offer, guarantee of employment or placement
          commitment, and that GHPs Management is currently developing its regulatory framework for
          future seafarer recruitment and placement activities.
        </span>
      </label>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-sm border border-destructive/50 bg-destructive/10 p-4 text-xs leading-relaxed text-foreground"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-sm bg-gold px-6 py-3 text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? "Sending…" : "Submit profile"}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
        Registration does not constitute a job offer or guarantee of employment. Opportunities are
        subject to verified vacancies, candidate qualifications and employer selection.
      </p>
    </form>
  );
}
