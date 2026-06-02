// ─── ContactSection ──────────────────────────────────────────────────────────
// Req 13.1: <a> for each link with href and visible text label
// Req 13.2: SVG icons have aria-hidden="true"
// Req 13.3: neutral SectionAccent

import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/ui/icons";
import { SectionCard } from "@/components/ui/SectionCard";
import type { SocialLink } from "@/data/hng-projects";

interface ContactSectionProps {
  social: SocialLink[];
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

export function ContactSection({ social }: ContactSectionProps) {
  return (
    <SectionCard accent="neutral" heading="CONTACT">
      <div className="flex flex-row items-center gap-6 flex-wrap">
        {social.map((s) => (
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

export default ContactSection;
