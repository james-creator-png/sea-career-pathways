import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, LegalBlock } from "@/components/site/LegalPage";

const TITLE = "Candidate Notice & Terms — GHPs Management";
const DESCRIPTION =
  "Registration with GHPs Management Co., Ltd. does not constitute a job offer, guarantee of employment or placement commitment. Read the candidate terms before registering.";
const URL = "https://www.crewghpsmanagement.org/candidate-notice";

export const Route = createFileRoute("/candidate-notice")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: CandidateNoticePage,
});

function CandidateNoticePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Candidate Notice & Terms"
      updated="August 2026"
      intro="Please read this notice carefully before registering your interest with the GHPs Management Cruise Crew Career Development & Recruitment division."
    >
      <LegalBlock heading="1. Registration is not a job offer">
        <p>
          Submitting the registration form places your profile in our training and screening pool.
          It does not constitute a job offer, an employment guarantee, a placement commitment or any
          form of contract with GHPs Management Co., Ltd. or with any employer.
        </p>
      </LegalBlock>

      <LegalBlock heading="2. Current status of our activities">
        <p>
          GHPs Management is currently developing the regulatory and operational framework required
          for future seafarer recruitment and placement activities. We do not represent ourselves as
          a licensed seafarer recruitment agency, and we do not currently hold guaranteed vacancies
          or formal recruitment agreements with named international cruise lines, shipowners or
          crewing companies. Present activities are limited to career awareness, training and
          career-development preparation.
        </p>
      </LegalBlock>

      <LegalBlock heading="3. We do not sell jobs">
        <p>
          GHPs never charges candidates for registration, screening, selection or a job offer. No
          payment of any kind secures a position. If anyone requests money in our name, do not pay
          and report it to contact@crewghpsmanagement.org.
        </p>
      </LegalBlock>

      <LegalBlock heading="4. Selection rests with the employer">
        <p>
          Any future opportunity will depend on genuine, verified vacancies, employer criteria, your
          qualifications and documentation, and the formal recruitment process. Employment decisions
          remain at all times with the authorised employer or recruitment principal.
        </p>
      </LegalBlock>

      <LegalBlock heading="5. Accuracy of information">
        <p>
          You confirm that the information and documents you submit are true and belong to you.
          False or misleading information may result in your profile being removed from our pool.
        </p>
      </LegalBlock>

      <LegalBlock heading="6. Data and consent">
        <p>
          Your information is handled as described in our Privacy Policy. You may request
          correction, deletion or withdrawal of consent at any time by emailing
          contact@crewghpsmanagement.org.
        </p>
      </LegalBlock>

      <LegalBlock heading="7. Official channels">
        <p>
          Announcements, screening events and programme information are published exclusively
          through our verified channels: the website www.crewghpsmanagement.org and the email
          address contact@crewghpsmanagement.org.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
