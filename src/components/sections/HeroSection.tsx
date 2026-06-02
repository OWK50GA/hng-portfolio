// ─── HeroSection ─────────────────────────────────────────────────────────────
// Req 8.1: displays name, title, location, both bio lines, and all social links
// Req 8.2: avatar with "WO" initials fallback
// Req 8.3: avatar aria-label
// Req 8.4: neutral SectionAccent
// Req 15.1: single <h1> for engineer name

import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/icons";
import { SectionCard } from "@/components/ui/SectionCard";
import type { PortfolioData } from "@/data/hng-projects";

interface HeroSectionProps {
  hero: PortfolioData["hero"];
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "github":
      return <GitHubIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "email":
      return <EmailIcon />;
    case "twitter":
      return <TwitterIcon />;
    default:
      return null;
  }
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <SectionCard accent="neutral" heading="HELLO">
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <div
          className="rounded-full bg-[var(--bg-card)] border border-[var(--border-neutral)] w-14 h-14 flex items-center justify-center font-mono text-sm text-[var(--text-dim)] shrink-0"
          role="img"
          aria-label="Wilfrid Okorie avatar"
        >
          WO
        </div>

        {/* Name + bio */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[2rem] font-bold text-[var(--text-primary)] leading-tight">
            {hero.name}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {hero.title} · {hero.location}
          </p>
          {hero.bio.map((line) => (
            <p key={line} className="text-sm text-[var(--text-secondary)]">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div className="flex flex-row flex-wrap gap-4 mt-4">
        {hero.social.map((s) => (
          <a
            key={s.platform}
            href={s.href}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-teal)] hover:text-[var(--text-primary)] transition-colors"
          >
            <SocialIcon platform={s.platform} />
            {s.label}
          </a>
        ))}
      </div>
    </SectionCard>
  );
}

export default HeroSection;
