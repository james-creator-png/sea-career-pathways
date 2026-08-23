import { Link } from "@tanstack/react-router";

import logoAsset from "@/assets/ghps-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep py-10 text-primary-foreground/55">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 text-xs leading-relaxed lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <img
            src={logoAsset.url}
            alt="GHPs Management Co., Ltd. logo — Cruise Crew Career Development & Recruitment"
            className="h-12 w-auto self-start rounded-sm bg-primary-foreground/95 px-2 py-1"
          />
          <p>
            © {new Date().getFullYear()} GHPs Management Co., Ltd. — Developing Myanmar talent for
            responsible careers at sea. www.crewghpsmanagement.org
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/candidate-notice" className="transition-colors hover:text-gold">
              Candidate Notice &amp; Terms
            </Link>
            <a href="/#contact" className="transition-colors hover:text-gold">
              Contact
            </a>
          </nav>
        </div>

        <p className="max-w-2xl">
          Legal Notice: GHPs Management Co., Ltd. operates in full transparency. Official
          announcements are published exclusively through our verified communication channels. GHPs
          Management is currently developing its regulatory and operational framework for future
          seafarer recruitment and placement activities and does not represent itself as a licensed
          seafarer recruitment agency.
        </p>
      </div>
    </footer>
  );
}
