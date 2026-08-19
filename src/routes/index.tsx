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
  Linkedin,
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

const TITLE = "GHPs Management — Cruise Crew Career Development & Recruitment";
const DESCRIPTION =
  "Myanmar-based hospitality management company preparing high-potential talent for international cruise careers through zero placement-fee, transparent and safety-first crew development.";

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
        <Employers />
        <Partners />
        <Registration />
        <Updates />
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy-deep/40" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-32 lg:px-8">
        <p className="eyebrow">Global Standards, Local Talent</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] text-primary-foreground md:text-6xl">
          Building Myanmar&rsquo;s pipeline for international maritime excellence
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
          Over 14 years of grounded hospitality management combined with two decades of
          international shipboard experience. We prepare high-potential Myanmar talent for
          responsible, world-class careers at sea.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#employers"
            className="rounded-sm bg-gold px-7 py-3.5 text-center text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            For Employers: Request Talent Profile
          </a>
          <a
            href="#register"
            className="rounded-sm border border-primary-foreground/35 px-7 py-3.5 text-center text-[0.78rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:border-gold hover:text-gold"
          >
            For Candidates: Register Interest
          </a>
        </div>
        <div className="mt-14 grid gap-6 border-t border-primary-foreground/15 pt-8 sm:grid-cols-3">
          {[
            { k: "20+ Years", v: "International cruise & hospitality expertise" },
            { k: "100% Transparent", v: "Zero placement-fee recruitment model" },
            { k: "End-to-End", v: "Practical, safety & cultural readiness pipeline" },
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
      title: "Registered under DICA in Myanmar",
      body: "GHPs Management Co., Ltd. has dedicated over 14 years to advancing hospitality operations and staff skills development across Myanmar.",
    },
    {
      icon: Ship,
      title: "A dedicated preparation bridge",
      body: "Our Cruise Crew Career Development & Recruitment division connects ambitious local professionals with legitimate international maritime opportunities.",
    },
    {
      icon: ShieldCheck,
      title: "Resilient and compliance-led",
      body: "Resilient through shifting industry landscapes, we publish opportunities strictly upon full regulatory authorization and verified employer agreements.",
    },
  ];

  return (
    <Section
      id="about"
      eyebrow="About GHPs Management Co., Ltd."
      title="Hospitality management rooted in integrity & experience"
      intro="Fourteen years of hospitality operations ashore, two decades of shipboard reality at sea — combined into one honest, structured pathway for Myanmar talent."
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
  const profile = [
    { label: "Founder", value: "Kyaw Thein (James@TUN)" },
    { label: "Current role", value: "Founder & Executive Director, GHPs Management Co., Ltd." },
    { label: "Maritime career start", value: "1998 — Limassol-based cruise operations" },
    { label: "Fleet experience", value: "Louis Cruises, Paradise Cruises, TUI Cruises (sea chefs)" },
    { label: "Key leadership role", value: "HR Assistant Manager, Mein Schiff" },
    {
      label: "Core mission",
      value:
        "Translating 20+ years of global cruise & hotel management into transparent, structured career pipelines for Myanmar youth.",
    },
  ];

  return (
    <section id="founder" className="bg-navy py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <img
            src={founderImg}
            alt="Kyaw Thein, Founder and Executive Director of GHPs Management"
            width={1000}
            height={1200}
            loading="lazy"
            className="w-full rounded-sm object-cover shadow-elegant"
          />
        </div>
        <div>
          <p className="eyebrow">Executive Leadership & Origin</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
            Guided by real shipboard leadership
          </h2>
          <dl className="mt-8 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
            {profile.map((p) => (
              <div key={p.label} className="grid gap-1 py-4 sm:grid-cols-[0.55fr_1fr] sm:gap-6">
                <dt className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">{p.label}</dt>
                <dd className="text-sm leading-relaxed text-primary-foreground/80">{p.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="mt-6 border-l-2 border-gold pl-6">
            <p className="font-serif text-xl leading-relaxed text-primary-foreground/90">
              &ldquo;Having walked the path from entry-level bar service to shipboard HR leadership
              on top-tier global fleets, I founded this division to ensure our young talent enters
              the maritime industry fully prepared, protected, and empowered.&rdquo;
            </p>
            <footer className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-gold">
              — James@TUN
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function CareerDevelopment() {
  const steps = [
    {
      icon: GraduationCap,
      title: "Vocational & hospitality mastery",
      body: "Advanced food & beverage, housekeeping, and guest-facing operational standards.",
    },
    {
      icon: LifeBuoy,
      title: "Maritime safety & protocol",
      body: "Foundational understanding of shipboard safety, emergency awareness, and chain-of-command discipline.",
    },
    {
      icon: Languages,
      title: "English & interview readiness",
      body: "Technical maritime terminology, conversational fluency, and professional interview coaching.",
    },
    {
      icon: Globe2,
      title: "Cross-cultural adaptation",
      body: "Equipping crew members to thrive within diverse, multicultural shipboard teams.",
    },
  ];

  return (
    <Section
      id="career"
      eyebrow="Cruise Crew Career Development"
      title="Preparing candidates for operational reality"
      intro="We do not just train on paper; we condition candidates for the operational, technical, and behavioral expectations of modern cruise vessels."
      tone="muted"
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <article key={s.title} className="bg-card p-7">
            <div className="flex items-center justify-between">
              <s.icon className="text-accent" size={22} strokeWidth={1.5} />
              <span className="font-serif text-2xl text-muted-foreground/40">0{i + 1}</span>
            </div>
            <h3 className="mt-4 text-lg">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function LifeAtSea() {
  const cultivate = [
    "Professional pride",
    "International work standards",
    "Cultural adaptability",
  ];
  const demand = [
    "Strict shipboard discipline",
    "Physical & mental resilience",
    "Absolute safety compliance",
  ];

  return (
    <Section
      id="life-at-sea"
      eyebrow="Life at Sea: Realities & Orientation"
      title="Expectation alignment before deployment"
      intro="A career at sea offers unparalleled global exposure, but demands exceptional resilience, long working hours, and strict adherence to international maritime law."
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
        <div>
          <p className="eyebrow">The GHPs preparation model</p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
            <div className="bg-card p-6">
              <h3 className="text-sm uppercase tracking-[0.16em] text-accent">What we cultivate</h3>
              <ul className="mt-3.5 space-y-3">
                {cultivate.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-muted-foreground">
                    <BadgeCheck className="mt-0.5 shrink-0 text-accent" size={16} strokeWidth={1.5} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-6">
              <h3 className="text-sm uppercase tracking-[0.16em] text-accent">What we demand</h3>
              <ul className="mt-3.5 space-y-3">
                {demand.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-muted-foreground">
                    <Anchor className="mt-0.5 shrink-0 text-accent" size={16} strokeWidth={1.5} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            We conduct thorough pre-orientation sessions so every candidate fully understands the
            realities of shipboard life before accepting employment.
          </p>
        </div>
      </div>
    </Section>
  );
}

function ResponsibleRecruitment() {
  const principles = [
    {
      icon: ShieldCheck,
      title: "Zero placement fees",
      body: "Candidates are never charged for job offers or selections.",
    },
    {
      icon: BadgeCheck,
      title: "Merit-based selection",
      body: "Hiring is strictly subject to genuine vacancies, employer criteria, and candidate qualification.",
    },
    {
      icon: FileCheck2,
      title: "Rigorous screening",
      body: "Complete background verification, skills assessment, and document validation.",
    },
    {
      icon: Handshake,
      title: "Regulatory compliance",
      body: "GHPs Management is actively expanding its international partnerships and regulatory framework.",
    },
  ];

  return (
    <Section
      id="responsible"
      eyebrow="Responsible & Transparent Recruitment"
      title="Ethical standards first: zero-tolerance policy"
      intro="DECLARATION: GHPs Management Co., Ltd. strictly adheres to ethical recruitment principles. We do not sell employment."
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
      <div className="mt-10 rounded-sm border border-gold/40 bg-navy-deep/60 p-7">
        <p className="eyebrow">Important notice</p>
        <p className="mt-2.5 max-w-4xl text-sm leading-relaxed text-primary-foreground/80">
          We publish employment opportunities strictly upon full compliance with local regulatory
          authorizations and verified employer agreements. GHPs Management Co., Ltd. does not
          guarantee employment on board any vessel and does not represent itself as a licensed
          seafarer recruitment agency. Current activities are limited to career awareness, training
          and career development preparation.
        </p>
      </div>
    </Section>
  );
}

function Employers() {
  const offers = [
    "Target candidate sourcing & pre-screening",
    "Hospitality & language assessments",
    "Maritime documentation & STCW coordination",
    "Customized pre-departure & cultural orientation",
    "Comprehensive pre-deployment briefings",
  ];

  return (
    <section id="employers" className="bg-navy-deep py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">For International Employers & Manning Agencies</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-[2.6rem]">
            Your trusted sourcing & pre-qualification partner in Myanmar
          </h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-primary-foreground/75">
            GHPs Management provides global cruise lines and maritime crew managers with
            operational-ready candidates screened for competence, character, and communication
            skills.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            Contact Employer Partnerships Team
          </a>
        </div>
        <ul className="space-y-4 lg:pt-2">
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
    {
      name: "Maritime training centres",
      body: "Safety, familiarisation and STCW-aligned coursework coordination.",
    },
    {
      name: "Hospitality academies",
      body: "Service, culinary and housekeeping curriculum cooperation.",
    },
    {
      name: "Veteran industry educators",
      body: "Practitioner-led coaching drawn from active and former shipboard leadership.",
    },
    {
      name: "Regional partners",
      body: "Collaboration throughout Myanmar and Southeast Asia to raise candidate benchmarks.",
    },
  ];

  return (
    <Section
      id="partners"
      eyebrow="Training & Development Network"
      title="Collaborative growth & industry synergy"
      intro="To continuously raise candidate benchmarks, GHPs Management collaborates with premier maritime training centers, hospitality academies, and veteran industry educators throughout Myanmar and Southeast Asia."
      tone="muted"
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((p) => (
          <article key={p.name} className="bg-card p-7">
            <Compass className="text-accent" size={22} strokeWidth={1.5} />
            <h3 className="mt-4 text-lg">{p.name}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 flex items-start gap-4 rounded-sm border border-border bg-card p-7">
        <GraduationCap className="mt-0.5 shrink-0 text-accent" size={20} strokeWidth={1.5} />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Training institutions and educators interested in joining the network are invited to
          contact our executive team.
        </p>
      </div>
    </Section>
  );
}

function Updates() {
  const updates = [
    {
      tag: "Workshop Update",
      date: "Completed",
      title: "Pre-Departure Hospitality Orientation Cohort #4 completed",
      body: "Participants completed service standards, grooming and shipboard conduct modules ahead of screening.",
    },
    {
      tag: "Network News",
      date: "Ongoing",
      title: "GHPs expands language & maritime terminology modules",
      body: "Extended English coursework now covers technical maritime vocabulary and interview simulation.",
    },
    {
      tag: "Notice",
      date: "Verified",
      title: "Official verification guidelines regarding recruitment scams",
      body: "Announcements are published exclusively through our verified communication channels. GHPs never charges candidates a placement fee.",
    },
  ];

  return (
    <Section
      id="updates"
      eyebrow="Crew Development Updates & News"
      title="Verified announcements & field news"
      intro="Stay informed on our verified screening events, professional workshops, regulatory updates, and upcoming training sessions."
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
      eyebrow="Candidate Registration Portal"
      title="Begin your journey toward a career at sea"
      intro="If you are a motivated hospitality or service professional aiming to join the global cruise industry, submit your profile to our talent repository for upcoming screening sessions, workshops, and orientation programs."
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
          <p className="eyebrow">Contact & Corporate Information</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-[2.6rem]">
            Connect with our executive team
          </h2>
          <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-primary-foreground/75">
            GHPs Management Co., Ltd. — Division of Cruise Crew Career Development &amp;
            Recruitment. Registered in DICA, Myanmar.
          </p>
        </div>
        <div className="space-y-5">
          {[
            { icon: MapPin, label: "HQ location", value: "Yangon, Myanmar", href: undefined },
            {
              icon: Phone,
              label: "Phone / WhatsApp",
              value: "+95 9 431 705 19",
              href: "tel:+959431 70519".replace(/\s/g, ""),
            },
            {
              icon: Mail,
              label: "Official email",
              value: "contact@ghpsmanagement.com",
              href: "mailto:contact@ghpsmanagement.com",
            },
            {
              icon: Linkedin,
              label: "LinkedIn",
              value: "GHPs Management Co., Ltd. Official",
              href: undefined,
            },
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
                {c.href ? (
                  <a
                    href={c.href}
                    className="mt-0.5 block text-sm text-primary-foreground/85 transition-colors hover:text-gold"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm text-primary-foreground/85">{c.value}</p>
                )}
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
        <p>© {new Date().getFullYear()} GHPs Management Co., Ltd. All Rights Reserved.</p>
        <p className="max-w-2xl">
          Legal Notice: GHPs Management Co., Ltd. operates in full transparency. Official
          announcements are published exclusively through our verified communication channels.
        </p>
      </div>
    </footer>
  );
}
