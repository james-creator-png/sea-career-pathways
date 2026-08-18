import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  BadgeCheck,
  Building2,
  CalendarDays,
  Compass,
  FileCheck2,
  GraduationCap,
  Globe2,
  Handshake,
  Languages,
  LifeBuoy,
  Mail,
  MapPin,
  Phone,
  Ship,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Section } from "@/components/site/Section";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import heroShip from "@/assets/hero-ship.jpg";
import trainingImg from "@/assets/training.jpg";
import lifeAtSeaImg from "@/assets/life-at-sea.jpg";
import founderImg from "@/assets/founder.jpg";

const TITLE = "GHPs Management Co., Ltd. — Cruise Crew Career Development";
const DESCRIPTION =
  "Myanmar-based hospitality management and human resources company developing cruise crew careers through training, responsible recruitment practices and transparent international partnerships.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <About />
        <Founder />
        <CareerDevelopment />
        <LifeAtSea />
        <ResponsibleRecruitment />
        <Training />
        <Employers />
        <Partners />
        <Updates />
        <Registration />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[92vh] items-end overflow-hidden">
      <img
        src={heroShip}
        alt="Cruise ship at sea during blue hour"
        width={1920}
        height={1200}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/30" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-32 lg:px-8">
        <p className="eyebrow">Myanmar · Hospitality Management &amp; Human Resources</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] text-primary-foreground md:text-6xl">
          Preparing Myanmar hospitality talent for professional careers at sea
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
          GHPs Management Co., Ltd. is establishing a Cruise Crew Career Development &amp;
          Recruitment division built on international shipboard experience, structured skills
          training and transparent, ethical recruitment practices.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#employers"
            className="rounded-sm bg-gold px-7 py-3.5 text-center text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            International Recruitment Partners
          </a>
          <a
            href="#register"
            className="rounded-sm border border-primary-foreground/35 px-7 py-3.5 text-center text-[0.78rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Candidate Registration
          </a>
        </div>
        <div className="mt-14 grid gap-6 border-t border-primary-foreground/15 pt-8 sm:grid-cols-3">
          {[
            { k: "20+ years", v: "Cruise and hotel industry experience of our founder" },
            { k: "Since 1998", v: "Beginning in international cruise operations" },
            { k: "Ethical by design", v: "No fees for registration, no guaranteed employment claims" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-serif text-2xl text-gold">{s.k}</p>
              <p className="mt-1.5 text-sm text-primary-foreground/65">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const points = [
    {
      icon: Building2,
      title: "Hospitality management background",
      body: "GHPs Management Co., Ltd. operates in hospitality management and human resources in Myanmar, supporting employers and professionals with structured people practices.",
    },
    {
      icon: Ship,
      title: "A new cruise crew division",
      body: "We are establishing a dedicated Cruise Crew Career Development & Recruitment division to prepare candidates for the standards expected on international cruise vessels.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance first",
      body: "We do not currently operate as a licensed seafarer recruitment agency. Placement activity will begin only after the relevant Myanmar regulatory authorization is obtained.",
    },
  ];

  return (
    <Section
      id="about"
      eyebrow="About GHPs"
      title="A hospitality company building a credible pathway to the cruise industry"
      intro="Our work is grounded in real operational experience on board and ashore. We focus on preparing people properly, documenting their background honestly, and working only with partners who share those standards."
    >
      <div className="grid gap-8 md:grid-cols-3">
        {points.map((p) => (
          <article key={p.title} className="border-t border-border pt-6">
            <p.icon className="text-accent" size={22} strokeWidth={1.5} />
            <h3 className="mt-4 text-xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Founder() {
  const timeline = [
    { year: "1998", text: "Entered international cruise operations, starting a career at sea in guest-facing hospitality roles." },
    { year: "Louis Cruises", text: "Shipboard service experience across multicultural crews and international itineraries." },
    { year: "Paradise Cruises", text: "Operational hospitality responsibilities and team supervision on board." },
    { year: "TUI Cruises / Mein Schiff", text: "Served in roles including HR Assistant Manager, working on crew welfare, onboard people processes and multicultural team support." },
  ];

  return (
    <section id="founder" className="bg-navy py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <img
            src={founderImg}
            alt="Founder of GHPs Management standing on a ship deck"
            width={1000}
            height={1200}
            loading="lazy"
            className="w-full rounded-sm object-cover shadow-elegant"
          />
        </div>
        <div>
          <p className="eyebrow">Founder</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
            More than 20 years of cruise and hotel experience
          </h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-primary-foreground/75">
            Our founder began working in international cruise operations in 1998 and has since built
            a career spanning shipboard hospitality service, supervision and human resources, as
            well as hotel operations ashore. That combination shapes how GHPs prepares candidates:
            realistically, respectfully and with a clear understanding of what shipboard life
            demands.
          </p>
          <div className="mt-10 space-y-6 border-l border-primary-foreground/20 pl-6">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <span className="absolute -left-[1.72rem] top-2 h-1.5 w-1.5 rounded-full bg-gold" />
                <p className="text-sm font-medium text-gold">{t.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-primary-foreground/70">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerDevelopment() {
  const steps = [
    { icon: Users, title: "Awareness & orientation", body: "Honest briefings on cruise careers, contract realities, departments and the standards international operators expect." },
    { icon: GraduationCap, title: "Skills preparation", body: "Hospitality fundamentals, English communication, grooming, service etiquette and shipboard conduct." },
    { icon: FileCheck2, title: "Documentation guidance", body: "Support in understanding and preparing the documents a maritime employer will verify." },
    { icon: Compass, title: "Screening readiness", body: "Interview practice and profile preparation ahead of employer or crewing partner screening events." },
  ];

  return (
    <Section
      id="career"
      eyebrow="Cruise Crew Career Development"
      title="A structured pathway, not a promise"
      intro="Our division exists to develop career readiness. We prepare candidates to meet international standards and connect them, transparently, with legitimate employers and licensed crewing channels. We do not guarantee employment."
      tone="muted"
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <article key={s.title} className="bg-card p-7">
            <div className="flex items-center justify-between">
              <s.icon className="text-accent" size={22} strokeWidth={1.5} />
              <span className="font-serif text-2xl text-muted-foreground/40">0{i + 1}</span>
            </div>
            <h3 className="mt-5 text-lg">{s.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function LifeAtSea() {
  const realities = [
    "Long contracts away from home, with structured working hours and shared cabins",
    "Multicultural crews where English is the working language",
    "High service standards, strict safety drills and shipboard discipline",
    "Real opportunities to build savings, skills and international careers",
  ];

  return (
    <Section
      id="life-at-sea"
      eyebrow="Life at Sea"
      title="An honest picture of shipboard life"
      intro="Candidates make better decisions when they know what to expect. We describe cruise employment as it truly is — demanding, rewarding and professionally transformative."
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <img
          src={lifeAtSeaImg}
          alt="Cruise ship crew member in uniform in a ship dining room"
          width={1400}
          height={1000}
          loading="lazy"
          className="w-full rounded-sm object-cover shadow-elegant"
        />
        <ul className="space-y-5">
          {realities.map((r) => (
            <li key={r} className="flex gap-4 border-b border-border pb-5 text-sm leading-relaxed">
              <LifeBuoy className="mt-0.5 shrink-0 text-accent" size={18} strokeWidth={1.5} />
              <span className="text-muted-foreground">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function ResponsibleRecruitment() {
  const principles = [
    { icon: ShieldCheck, title: "Candidate safety", body: "Clear guidance against exploitative offers, informal brokers and unverifiable job promises." },
    { icon: FileCheck2, title: "Document verification", body: "Careful checking of identity, education, experience and certification records before any referral." },
    { icon: BadgeCheck, title: "Transparent process", body: "Every step, requirement and expected timeline is explained in writing, in plain language." },
    { icon: Handshake, title: "Social responsibility", body: "Respect for fair treatment, dignity at work and the wellbeing of crew and their families." },
  ];

  return (
    <Section
      id="responsible"
      eyebrow="Responsible Recruitment"
      title="Ethical practice is the foundation of the division"
      intro="We follow a simple standard: no false promises, no hidden costs to candidates, and no activity beyond what our authorizations permit."
      tone="navy"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {principles.map((p) => (
          <article key={p.title} className="border-t border-primary-foreground/20 pt-6">
            <p.icon className="text-gold" size={22} strokeWidth={1.5} />
            <h3 className="mt-4 text-xl">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">{p.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-12 rounded-sm border border-gold/40 bg-navy-deep/60 p-7">
        <p className="eyebrow">Important notice</p>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-primary-foreground/80">
          GHPs Management Co., Ltd. does not guarantee employment on board any vessel and does not
          represent itself as a licensed seafarer recruitment agency. Recruitment and placement
          services will be offered only after the relevant Myanmar regulatory authorization has been
          obtained. Current activities are limited to career awareness, training and career
          development preparation.
        </p>
      </div>
    </Section>
  );
}

function Training() {
  const modules = [
    { icon: Languages, title: "English for shipboard service", body: "Practical guest interaction, safety vocabulary and workplace communication." },
    { icon: Globe2, title: "Multicultural awareness", body: "Working respectfully within crews and guest groups from many nationalities." },
    { icon: Anchor, title: "Shipboard conduct & discipline", body: "Uniform standards, chain of command, safety culture and behavioural expectations." },
    { icon: Users, title: "Professional hospitality skills", body: "Service sequence, hygiene, housekeeping standards and guest recovery basics." },
  ];

  return (
    <Section
      id="training"
      eyebrow="Training & Skills Development"
      title="Preparation that meets international expectations"
      intro="Training is delivered in cooperation with hospitality institutions and experienced practitioners, focused on the competencies cruise operators consistently look for."
      tone="muted"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
          {modules.map((m) => (
            <article key={m.title} className="bg-card p-7">
              <m.icon className="text-accent" size={22} strokeWidth={1.5} />
              <h3 className="mt-4 text-lg">{m.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
            </article>
          ))}
        </div>
        <img
          src={trainingImg}
          alt="Hospitality trainees in uniform during a classroom session"
          width={1400}
          height={1000}
          loading="lazy"
          className="w-full rounded-sm object-cover shadow-elegant"
        />
      </div>
    </Section>
  );
}

function Employers() {
  const offers = [
    "Pre-screened candidate pools from Myanmar's hospitality sector",
    "Verified documentation and consistent candidate profiles",
    "Local coordination for screening events, interviews and assessment days",
    "Pre-employment orientation aligned to your brand standards",
    "A single, accountable point of contact throughout the process",
  ];

  return (
    <section id="employers" className="bg-navy-deep py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">For International Employers</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
            A reliable Myanmar partner for cruise lines and crewing companies
          </h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-primary-foreground/75">
            We work alongside cruise lines, global crewing companies and maritime employers to
            prepare and present candidates who are genuinely ready for shipboard service — within
            the boundaries of applicable regulation and your own compliance requirements.
          </p>
          <a
            href="#contact"
            className="mt-9 inline-block rounded-sm bg-gold px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            Talk to our partnership team
          </a>
        </div>
        <ul className="space-y-4 lg:pt-4">
          {offers.map((o) => (
            <li
              key={o}
              className="flex gap-4 border border-primary-foreground/12 bg-navy/60 p-5 text-sm leading-relaxed text-primary-foreground/80"
            >
              <BadgeCheck className="mt-0.5 shrink-0 text-gold" size={18} strokeWidth={1.5} />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "Hospitality training institutes", body: "Curriculum cooperation for service, culinary and housekeeping fundamentals." },
    { name: "English language centres", body: "Structured language preparation for shipboard communication." },
    { name: "Hotels & resorts in Myanmar", body: "Practical experience and workplace assessment for junior candidates." },
    { name: "Maritime safety trainers", body: "Coordination for recognised safety and familiarisation courses." },
  ];

  return (
    <Section
      id="partners"
      eyebrow="Training Partners"
      title="Building a network of credible institutions"
      intro="We collaborate with training and hospitality organisations that maintain verifiable standards. Partnership enquiries are welcome."
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((p) => (
          <article key={p.name} className="bg-card p-7">
            <h3 className="text-lg">{p.name}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Updates() {
  const updates = [
    {
      tag: "Division",
      date: "Ongoing",
      title: "Cruise Crew Career Development division in formation",
      body: "Programme design, trainer selection and partner discussions are currently underway ahead of the first candidate intake.",
    },
    {
      tag: "Training",
      date: "Upcoming",
      title: "Shipboard readiness workshops",
      body: "Short workshops covering English communication, grooming standards and shipboard conduct for registered candidates.",
    },
    {
      tag: "Partnerships",
      date: "Open",
      title: "Discussions with international crewing partners",
      body: "We welcome introductions from cruise lines and crewing companies interested in the Myanmar talent market.",
    },
  ];

  return (
    <Section
      id="updates"
      eyebrow="Crew Development Updates"
      title="Screening events, training sessions and partnership news"
      intro="This section is updated as new activities are confirmed. Registered candidates are notified directly."
      tone="muted"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {updates.map((u) => (
          <article key={u.title} className="rounded-sm border border-border bg-card p-7">
            <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em]">
              <span className="text-accent">{u.tag}</span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays size={13} /> {u.date}
              </span>
            </div>
            <h3 className="mt-4 text-xl leading-snug">{u.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Registration() {
  return (
    <Section
      id="register"
      eyebrow="Candidate Registration"
      title="Register your interest in a cruise hospitality career"
      intro="Registration is free and places you on our candidate interest list for future training and screening activities. It is not a job application and does not guarantee employment."
    >
      <div className="max-w-4xl">
        <RegistrationForm />
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-navy py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
            Speak with GHPs Management
          </h2>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-primary-foreground/75">
            Whether you are an international employer, a training institution or a candidate, we are
            glad to answer questions clearly and without obligation.
          </p>
        </div>
        <div className="space-y-5">
          {[
            { icon: Mail, label: "Email", value: "info@ghpsmanagement.com" },
            { icon: Phone, label: "Phone / Viber", value: "+95 (0) 9 000 000 000" },
            { icon: MapPin, label: "Office", value: "Yangon, Myanmar" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-4 border-b border-primary-foreground/15 pb-5"
            >
              <c.icon className="text-gold" size={18} strokeWidth={1.5} />
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-primary-foreground/50">
                  {c.label}
                </p>
                <p className="mt-0.5 text-sm text-primary-foreground/85">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep py-10 text-primary-foreground/55">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-xs leading-relaxed lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} GHPs Management Co., Ltd. — Yangon, Myanmar</p>
        <p className="max-w-2xl">
          GHPs Management Co., Ltd. is not a licensed seafarer recruitment agency and does not
          guarantee employment. Placement services will commence only upon receipt of the relevant
          Myanmar regulatory authorization.
        </p>
      </div>
    </footer>
  );
}
