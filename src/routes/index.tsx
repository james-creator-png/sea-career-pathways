import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  Award,
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
  ListChecks,
  Mail,
  MapPin,
  Phone,
  Route as RouteIcon,
  Ship,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Section } from "@/components/site/Section";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import heroShip from "@/assets/hero-ship.jpg";
import trainingImg from "@/assets/training.jpg";
import lifeAtSeaImg from "@/assets/life-at-sea.jpg";
import founderImgAsset from "@/assets/founder-photo-v2.png.asset.json";

const founderImg = founderImgAsset.url;

const TITLE = "GHPs Management — Cruise Crew Career Development & Recruitment";
const DESCRIPTION =
  "Myanmar-based management and human resources development company preparing hospitality professionals for responsible, legitimate international careers at sea.";

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
        <WhyWeStarted />
        <CareerDevelopment />
        <LifeAtSea />
        <ResponsibleRecruitment />
        <Employers />
        <Partners />
        <Commitment />
        <FutureDirection />
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
        <p className="eyebrow">Cruise Crew Career Development &amp; Recruitment</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] text-primary-foreground md:text-6xl">
          Developing Myanmar talent for responsible careers at sea
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/75">
          Founded by Kyaw Thein (James@TUN), GHPs Management Co., Ltd. builds on more than two
          decades of international cruise, hotel, hospitality and human resources experience. We are
          developing a dedicated Cruise Crew Career Development &amp; Recruitment division to prepare
          Myanmar professionals for legitimate international careers at sea.
        </p>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-gold">
          We do not sell jobs. We prepare candidates for genuine opportunities and employer
          selection.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#employers"
            className="rounded-sm bg-gold px-7 py-3.5 text-center text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            For Employers: Partner With Us
          </a>
          <a
            href="#register"
            className="rounded-sm border border-primary-foreground/35 px-7 py-3.5 text-center text-[0.78rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:border-gold hover:text-gold"
          >
            For Candidates: Register Interest
          </a>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-primary-foreground/70">
          Founded by a former international cruise professional and HR Assistant Manager with
          extensive experience in cruise operations, hotel management and people development.{" "}
          <a href="#founder" className="text-gold underline-offset-4 hover:underline">
            Meet the founder &rarr;
          </a>
        </p>
        <div className="mt-14 grid gap-6 border-t border-primary-foreground/15 pt-8 sm:grid-cols-3">
          {[
            {
              k: "Since 1998",
              v: "International cruise, hotel and human resources experience",
            },
            {
              k: "A Professional Bridge",
              v: "Connecting prepared Myanmar talent with reputable international employers",
            },
            {
              k: "Preparation First",
              v: "Developing skills before presenting candidates for opportunity",
            },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-serif text-2xl text-gold">{s.k}</p>
              <p className="mt-1.5 text-sm text-primary-foreground/65">{s.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl border-l-2 border-gold/50 pl-4 text-xs leading-relaxed text-primary-foreground/55">
          GHPs Management is currently developing its international recruitment partnerships and
          regulatory framework for its Cruise Crew Career Development &amp; Recruitment division.
        </p>

      </div>
    </section>
  );
}

function About() {
  const points = [
    {
      icon: Building2,
      title: "A Myanmar management company",
      body: "GHPs Management Co., Ltd. was established as a Myanmar company with experience in hospitality management, accommodation, human resources development and related management services.",
    },
    {
      icon: Ship,
      title: "Founded on a personal conviction",
      body: "Our Cruise Crew Career Development & Recruitment initiative began from the belief that young people should access legitimate international opportunities without exposure to misleading recruitment practices or unrealistic promises of employment.",
    },
    {
      icon: ShieldCheck,
      title: "Built on a compliant framework",
      body: "GHPs is currently developing the regulatory and operational framework required for its future seafarer recruitment and placement activities, in accordance with applicable Myanmar requirements and international maritime standards.",
    },
  ];

  return (
    <Section
      id="about"
      eyebrow="About GHPs Management"
      title="Hospitality management rooted in integrity & experience"
      intro="The initiative is designed around four principles: preparation, transparency, professional development and responsible recruitment."
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
    {
      label: "Maritime career start",
      value:
        "1998 — Limassol-based cruise operations, progressing from bar service and bartender responsibilities into supervisory and management functions.",
    },
    {
      label: "Fleet experience",
      value: "Louis Cruises, Paradise Cruise and TUI Cruises.",
    },
    {
      label: "Key leadership role",
      value:
        "Recruited from Myanmar by sea chefs and subsequently served on Mein Schiff, where his responsibilities eventually included HR Assistant Manager.",
    },
    {
      label: "Return to Myanmar",
      value:
        "His cruise career continued until 2012, after which he returned to Myanmar and developed his own hospitality and accommodation businesses while continuing to work in human resources development and management.",
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
          <p className="eyebrow">Our Founder</p>
          <h2 className="mt-4 text-3xl leading-tight md:text-[2.6rem]">
            Guided by real shipboard leadership
          </h2>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-primary-foreground/75">
            These experiences provide the foundation for the GHPs Cruise Crew Career Development
            initiative. The purpose is not simply to place people on ships — it is to help people
            become better prepared professionals who understand what international shipboard
            employment requires.
          </p>
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
              on international fleets, I founded this division so that our young talent enters the
              maritime industry properly prepared, protected and respected.&rdquo;
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

function WhyWeStarted() {
  const understand = [
    "What the job actually requires",
    "What professional standards they will be expected to meet",
    "How multicultural workplaces operate",
    "How safety and responsibility affect daily life onboard",
    "What documents and qualifications are required",
    "What the recruitment and selection process involves",
    "What they should expect from a legitimate international employer",
  ];

  return (
    <Section
      id="why"
      eyebrow="Why We Started"
      title="A more professional pathway for Myanmar talent"
      intro="Myanmar has a long history of producing hardworking and capable hospitality professionals. Many, however, face difficulties in identifying trustworthy recruitment channels, understanding genuine employment opportunities, preparing for international workplaces and developing the practical skills required onboard."
      tone="muted"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            At the same time, Myanmar&rsquo;s hospitality industry has experienced significant
            disruption in recent years, causing many experienced personnel to seek opportunities
            abroad.
          </p>
          <p>
            GHPs was established to contribute to a more professional pathway — one in which
            candidates enter the process informed rather than hopeful.
          </p>
          <img
            src={trainingImg}
            alt="Hospitality training session for prospective cruise crew"
            width={1400}
            height={1000}
            loading="lazy"
            className="mt-2 w-full rounded-sm object-cover shadow-elegant"
          />
        </div>
        <div className="rounded-sm border border-border bg-card p-7">
          <h3 className="text-sm uppercase tracking-[0.16em] text-accent">
            Our vision: candidates who understand
          </h3>
          <ul className="mt-5 space-y-3.5">
            {understand.map((u) => (
              <li key={u} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <BadgeCheck className="mt-0.5 shrink-0 text-accent" size={16} strokeWidth={1.5} />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function CareerDevelopment() {
  const steps = [
    {
      icon: GraduationCap,
      title: "Professional skills",
      body: "Practical preparation for hospitality and cruise-related positions, including service standards, workplace discipline, communication and job-specific responsibilities.",
    },
    {
      icon: LifeBuoy,
      title: "Safety awareness",
      body: "Understanding the importance of onboard safety, emergency procedures, personal responsibility and following established shipboard rules and procedures.",
    },
    {
      icon: Globe2,
      title: "Multicultural awareness",
      body: "Preparing candidates to work respectfully and effectively with colleagues and guests from different cultures, nationalities and backgrounds.",
    },
    {
      icon: Ship,
      title: "Shipboard working environment",
      body: "Helping candidates understand accommodation, working routines, teamwork, reporting structures, schedules and the realities of living onboard.",
    },
    {
      icon: Users,
      title: "Social responsibility",
      body: "Encouraging professional behaviour, respect for colleagues, responsible use of shared spaces, teamwork and appropriate conduct in an international working environment.",
    },
    {
      icon: Languages,
      title: "Career development",
      body: "Helping candidates understand that an international cruise career is a professional pathway rather than simply a short-term overseas job.",
    },
  ];

  return (
    <Section
      id="career"
      eyebrow="Cruise Crew Career Development"
      title="Preparing people before they board"
      intro="Cruise employment is very different from ordinary hotel employment. A successful crew member must combine hospitality skills with safety awareness, discipline, teamwork, cultural understanding and the ability to live and work professionally alongside many nationalities. Our development programs are therefore designed around the realities of shipboard life."
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-3">
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
  const encourage = [
    "Develop your skills.",
    "Understand the job.",
    "Prepare properly.",
    "Verify the opportunity.",
    "Build your career responsibly.",
  ];

  return (
    <Section
      id="life-at-sea"
      eyebrow="For Candidates"
      title="Build your career before you build your journey"
      intro="A cruise ship is a workplace, a community and a multicultural environment. Before joining an international vessel, candidates should understand that professional conduct, safety awareness, communication and teamwork are just as important as technical or hospitality skills."
      tone="muted"
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
          <p className="eyebrow">How we prepare candidates</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            GHPs helps candidates prepare for this environment through career-development programs
            and transparent recruitment practices.
          </p>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-sm bg-border">
            {encourage.map((c) => (
              <li key={c} className="flex gap-3 bg-card p-4 text-sm text-muted-foreground">
                <Anchor className="mt-0.5 shrink-0 text-accent" size={16} strokeWidth={1.5} />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            GHPs does not promise employment simply because a candidate registers with us. Selection
            depends on genuine employment requirements, candidate qualifications, employer standards
            and the formal recruitment process.
          </p>
        </div>
      </div>
    </Section>
  );
}

function ResponsibleRecruitment() {
  const flow = [
    "Verified opportunity",
    "Candidate screening",
    "Skills assessment",
    "Documentation",
    "Employer selection",
    "Deployment",
  ];

  const principles = [
    {
      icon: ShieldCheck,
      title: "We do not sell jobs",
      body: "GHPs works only with legitimate and verifiable employment opportunities from established international employers and recruitment partners.",
    },
    {
      icon: BadgeCheck,
      title: "Payment never guarantees employment",
      body: "Candidates should never be encouraged to believe that any payment secures a position, a selection or a job offer.",
    },
    {
      icon: FileCheck2,
      title: "A transparent, documented process",
      body: "Every stage — from verified opportunity to deployment — is explained to the candidate before they commit to it.",
    },
    {
      icon: Handshake,
      title: "Decisions rest with the principal",
      body: "Employment decisions remain with the authorized employer or recruitment principal at all times.",
    },
  ];

  return (
    <Section
      id="responsible"
      eyebrow="Our Recruitment Philosophy"
      title="We do not sell jobs"
      intro="Our objective is to create a transparent process in which candidates always know where they stand and what happens next."
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
        <p className="eyebrow">The recruitment pathway</p>
        <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-primary-foreground/85">
          {flow.map((f, i) => (
            <li key={f} className="flex items-center gap-3">
              <span>{f}</span>
              {i < flow.length - 1 && <span className="text-gold">&rarr;</span>}
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed text-primary-foreground/70">
          GHPs Management Co., Ltd. does not guarantee employment on board any vessel and does not
          represent itself as a licensed seafarer recruitment agency. Current activities are limited
          to career awareness, training and career development preparation, and opportunities are
          published strictly upon full regulatory authorization and verified employer agreements.
        </p>
      </div>
    </Section>
  );
}

function Employers() {
  const offers = [
    "Candidate sourcing",
    "Initial screening",
    "Hospitality experience verification",
    "Skills assessment",
    "English and communication assessment",
    "Training and career preparation",
    "Document coordination",
    "Interview preparation",
    "Candidate communication",
    "Pre-departure preparation",
  ];

  return (
    <section id="employers" className="bg-navy-deep py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">For International Cruise &amp; Crewing Companies</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-[2.6rem]">
            A Myanmar talent-sourcing partner
          </h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-primary-foreground/75">
            GHPs is developing a Myanmar-based candidate sourcing and career-development platform
            for international cruise and maritime employers. Our founder&rsquo;s international
            cruise and hotel experience provides first-hand understanding of the expectations placed
            on crew members in hospitality operations.
          </p>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-primary-foreground/75">
            We provide international principals with candidates who have been appropriately
            identified, screened and prepared according to the requirements agreed with the employer
            or authorized crewing organization. We welcome discussions with established cruise
            lines, shipowners, crew managers and authorized recruitment organizations interested in
            developing a reliable Myanmar sourcing channel.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            Contact Employer Partnerships Team
          </a>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:pt-2">
          {offers.map((o) => (
            <li
              key={o}
              className="flex gap-3 border border-primary-foreground/12 bg-navy/60 p-4 text-sm leading-relaxed text-primary-foreground/80"
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
      name: "Clear recruitment requirements",
      body: "Defined roles, standards and expectations agreed with the principal before sourcing begins.",
    },
    {
      name: "Transparent candidate standards",
      body: "Documented screening criteria and honest reporting of candidate capability.",
    },
    {
      name: "Proper documentation & procedure",
      body: "Coordinated documentation and clearly defined recruitment procedures at every stage.",
    },
    {
      name: "Candidate protection & compliance",
      body: "Skills development, candidate protection, compliance and accountability throughout.",
    },
  ];

  return (
    <Section
      id="partners"
      eyebrow="Working With Us"
      title="Long-term relationships, not short-term transactions"
      intro="We welcome contact from established cruise lines, shipowners, crew-management companies and authorized international recruitment organizations interested in exploring cooperation with Myanmar."
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
          We also cooperate with maritime training centres, hospitality academies and veteran
          industry educators throughout Myanmar and Southeast Asia. Institutions interested in
          joining the network are invited to contact our executive team.
        </p>
      </div>
    </Section>
  );
}

function Commitment() {
  const values = [
    {
      icon: Award,
      title: "Professionalism",
      body: "We respect the standards expected by international employers.",
    },
    {
      icon: FileCheck2,
      title: "Transparency",
      body: "Candidates should understand the recruitment process and the nature of the opportunity.",
    },
    {
      icon: GraduationCap,
      title: "Training",
      body: "We believe preparation increases both employability and long-term career success.",
    },
    {
      icon: LifeBuoy,
      title: "Safety",
      body: "Safety awareness is an essential part of professional shipboard life.",
    },
    {
      icon: Users,
      title: "Respect",
      body: "International workplaces require respect for people, cultures, rules and responsibilities.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance",
      body: "Our recruitment activities are developed in accordance with applicable Myanmar requirements and relevant international maritime standards.",
    },
  ];

  return (
    <Section
      id="commitment"
      eyebrow="Our Commitment"
      title="The standards this division is built on"
      intro="GHPs is committed to developing its Cruise Crew Career Development & Recruitment division around six non-negotiable principles."
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2 lg:grid-cols-3">
        {values.map((v) => (
          <article key={v.title} className="bg-card p-7">
            <v.icon className="text-accent" size={22} strokeWidth={1.5} />
            <h3 className="mt-4 text-lg">{v.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function FutureDirection() {
  const priorities = [
    "Complete the appropriate Myanmar regulatory and licensing requirements.",
    "Establish formal relationships with reputable international cruise and crewing organizations.",
    "Develop structured candidate-screening and career-development procedures.",
    "Establish cooperation with suitable training institutions and professional networks.",
    "Build a qualified candidate database based on genuine employer requirements.",
    "Develop a trusted Myanmar-to-international recruitment pathway for future generations of crew.",
  ];

  return (
    <Section
      id="roadmap"
      eyebrow="Our Future Direction"
      title="Developing this initiative progressively"
      intro="GHPs Management is building this division step by step, in the right order, with compliance first."
      tone="navy"
    >
      <ol className="grid gap-px overflow-hidden rounded-sm bg-primary-foreground/15 md:grid-cols-2 lg:grid-cols-3">
        {priorities.map((p, i) => (
          <li key={p} className="bg-navy p-7">
            <div className="flex items-center justify-between">
              <RouteIcon className="text-gold" size={20} strokeWidth={1.5} />
              <span className="font-serif text-2xl text-primary-foreground/30">0{i + 1}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">{p}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Registration() {
  return (
    <Section
      id="register"
      eyebrow="Register Your Interest"
      title="Begin your journey toward a career at sea"
      intro="If you are a motivated hospitality or service professional aiming to join the global cruise industry, register your interest for upcoming screening sessions, workshops and orientation programs. Registration does not constitute a job offer or guarantee of employment."
    >

      <div className="max-w-4xl">
        <RegistrationForm />
      </div>
    </Section>
  );
}

function Updates() {
  const updates = [
    {
      tag: "Programme Update",
      date: "In development",
      title: "Pre-departure hospitality orientation modules",
      body: "Service standards, grooming, shipboard conduct and workplace discipline modules are being finalised ahead of candidate screening sessions.",
    },
    {
      tag: "Network News",
      date: "Ongoing",
      title: "English and maritime terminology preparation",
      body: "Communication coursework is being extended to cover technical maritime vocabulary and structured interview preparation.",
    },
    {
      tag: "Notice",
      date: "Verified",
      title: "Verification guidance regarding recruitment scams",
      body: "Announcements are published exclusively through our verified communication channels. GHPs never charges candidates for a job offer or selection.",
    },
  ];

  return (
    <Section
      id="updates"
      eyebrow="Crew Development Updates & News"
      title="Verified announcements & field news"
      intro="Stay informed on our verified screening events, professional workshops, regulatory progress and upcoming training sessions."
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

function Contact() {
  return (
    <section id="contact" className="bg-navy py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-5 text-3xl leading-tight md:text-[2.6rem]">
            Connect with our executive team
          </h2>
          <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-primary-foreground/75">
            GHPs Management Co., Ltd. — Cruise Crew Career Development &amp; Recruitment. Founder
            &amp; Executive Director: James@TUN (Kyaw Thein).
          </p>
          <div className="mt-8 space-y-6">
            <div className="border-l-2 border-gold pl-5">
              <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-gold">
                <Target size={14} strokeWidth={1.5} /> International recruitment &amp; partnership
                inquiries
              </div>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                For international cruise lines, shipowners, crew-management companies and authorized
                recruitment organizations interested in discussing cooperation, please contact us
                directly.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-5">
              <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-gold">
                <ListChecks size={14} strokeWidth={1.5} /> Candidate &amp; career development
                inquiries
              </div>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                For Myanmar hospitality professionals interested in future international cruise
                career opportunities, please contact us for information about upcoming programs and
                verified recruitment opportunities.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          {[
            { icon: MapPin, label: "Location", value: "Myanmar", href: undefined },
            {
              icon: Phone,
              label: "Phone / WhatsApp",
              value: "+95 9 431 705 19",
              href: "tel:+959431 70519".replace(/\s/g, ""),
            },
            {
              icon: Mail,
              label: "Official email",
              value: "contact@crewghpsmanagement.org",
              href: "mailto:contact@crewghpsmanagement.org",
            },
            {
              icon: Globe2,
              label: "Website",
              value: "www.crewghpsmanagement.org",
              href: "https://www.crewghpsmanagement.org",
            },
            {
              icon: Linkedin,
              label: "LinkedIn",
              value: "james-tun-kyaw-thein",
              href: "https://linkedin.com/in/james-tun-kyaw-thein-10bb3860",
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
        <p>
          © {new Date().getFullYear()} GHPs Management Co., Ltd. — Developing Myanmar talent for
          responsible careers at sea.
        </p>
        <p className="max-w-2xl">
          Legal Notice: GHPs Management Co., Ltd. operates in full transparency. Official
          announcements are published exclusively through our verified communication channels.
        </p>
      </div>
    </footer>
  );
}
