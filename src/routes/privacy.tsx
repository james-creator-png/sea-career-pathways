import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, LegalBlock } from "@/components/site/LegalPage";

const TITLE = "Privacy Policy — GHPs Management Cruise Crew Division";
const DESCRIPTION =
  "How GHPs Management Co., Ltd. collects, uses, stores, shares and deletes candidate information and CVs submitted to its Cruise Crew Career Development & Recruitment division.";
const URL = "https://www.crewghpsmanagement.org/privacy";

export const Route = createFileRoute("/privacy")({
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
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="August 2026"
      intro="This policy explains how GHPs Management Co., Ltd. (“GHPs”, “we”) handles the personal information of candidates and enquirers who contact our Cruise Crew Career Development & Recruitment division."
    >
      <LegalBlock heading="1. Who we are">
        <p>
          GHPs Management Co., Ltd. is a Myanmar-registered management and human resources
          development company operating a Cruise Crew Career Development &amp; Recruitment division.
          Data protection enquiries: contact@crewghpsmanagement.org.
        </p>
      </LegalBlock>

      <LegalBlock heading="2. Information we collect">
        <p>
          At initial registration we collect only what is necessary for first-stage screening: your
          name, phone or WhatsApp number, email address, primary specialty, years of hospitality or
          cruise experience, self-declared English level, any optional notes you provide, and your
          CV if you choose to upload one.
        </p>
        <p>
          We do not request passport scans, national identity documents, medical information,
          seafarer certificates, financial details or other sensitive personal data at registration.
          Should such documents become necessary at a later, formally agreed stage of a genuine
          recruitment process, we will explain why, request them separately and obtain your consent
          first.
        </p>
      </LegalBlock>

      <LegalBlock heading="3. Why we collect it">
        <p>
          Your information is used to assess your suitability for training, screening and
          career-development activities; to invite you to workshops, orientation sessions and
          assessments; to answer your enquiries; and, where a genuine and verified opportunity
          exists in future, to present your profile to a prospective employer with your prior
          consent.
        </p>
        <p>We do not sell, rent or trade candidate data, and we never charge candidates a fee.</p>
      </LegalBlock>

      <LegalBlock heading="4. Storage and security">
        <p>
          Registrations are delivered to our official company email address and stored in
          access-controlled company systems. Access is limited to authorised GHPs personnel involved
          in candidate development and screening.
        </p>
      </LegalBlock>

      <LegalBlock heading="5. Retention">
        <p>
          We retain candidate records for up to 24 months from your last contact with us, after
          which they are deleted unless you ask us to keep your profile active or a longer period is
          required by law.
        </p>
      </LegalBlock>

      <LegalBlock heading="6. Sharing">
        <p>
          Your details are shared with a prospective employer, crew manager or authorised
          recruitment organisation only when you have given specific consent for that opportunity.
          We may also disclose information where required by applicable Myanmar law.
        </p>
      </LegalBlock>

      <LegalBlock heading="7. Your rights: access, correction and withdrawal">
        <p>
          You may at any time request a copy of the information we hold about you, ask us to correct
          it, withdraw your consent, or ask us to delete your profile and CV. Email
          contact@crewghpsmanagement.org with your full name and the phone number used at
          registration. We aim to respond within 30 days.
        </p>
      </LegalBlock>

      <LegalBlock heading="8. Changes to this policy">
        <p>
          We may update this policy as our regulatory and operational framework develops. The
          current version is always published on this page with its revision date.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}
