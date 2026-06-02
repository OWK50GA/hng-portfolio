// ─── HeroSection ─────────────────────────────────────────────────────────────

import Image from "next/image";
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

function Avatar({ src, name }: { src?: string; name: string }) {
  const base =
    "rounded-full border-2 border-[var(--border-neutral)] w-24 h-24 shrink-0 overflow-hidden";

  if (src) {
    return (
      <div className={`${base} relative`} role="img" aria-label={`${name} avatar`}>
        <Image
          src={src}
          alt={`${name} avatar`}
          fill
          className="object-cover"
          sizes="96px"
          priority
        />
      </div>
    );
  }

  return (
    <div
      className={`${base} bg-[var(--bg-card)] flex items-center justify-center font-mono text-lg text-[var(--text-dim)]`}
      role="img"
      aria-label={`${name} avatar`}
    >
      WO
    </div>
  );
}

export function HeroSection({ hero }: HeroSectionProps) {
  // Only show github, email, linkedin in the header bar (not twitter)
  const headerLinks = hero.social.filter((s) =>
    ["github", "email", "linkedin"].includes(s.platform),
  );

  return (
    <SectionCard accent="neutral" heading="HELLO">
      {/* ── Main row: avatar + identity left, social links right ── */}
      <div className="flex items-center justify-between gap-6 flex-wrap">

        {/* Left: avatar + name + role */}
        <div className="flex items-center gap-5">
          <Avatar src={hero.avatarSrc} name={hero.name} />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {hero.name}
            </h1>
            <p className="text-base text-[var(--text-secondary)] font-medium">
              {hero.title}
            </p>
            <p className="text-sm text-[var(--text-dim)]">{hero.location}</p>
          </div>
        </div>

        {/* Right: social links separated by · */}
        <nav aria-label="Social links" className="flex items-center gap-0 flex-wrap">
          {headerLinks.map((s, i) => (
            <span key={s.platform} className="flex items-center">
              {i > 0 && (
                <span
                  className="mx-3 text-[var(--border-neutral)] select-none"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              <a
                href={s.href}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-teal)] transition-colors"
              >
                <SocialIcon platform={s.platform} />
                {s.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </SectionCard>
  );
}

export default HeroSection;
