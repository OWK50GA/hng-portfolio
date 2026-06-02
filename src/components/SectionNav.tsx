// ─── SectionNav ──────────────────────────────────────────────────────────────
// Horizontal navigation bar linking to each section anchor.
// No card wrapper — sits between the hero and the first section.

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Deep Dive", href: "#deep-dive" },
  { label: "Design Docs", href: "#design-docs" },
  { label: "Skills", href: "#skills" },
  { label: "Reflections", href: "#reflections" },
  { label: "Contact", href: "#contact" },
];

export function SectionNav() {
  return (
    <nav
      aria-label="Page sections"
      className="flex items-center flex-wrap gap-x-0 gap-y-2 border-y border-[var(--border-neutral)] py-3"
    >
      {NAV_LINKS.map((link, i) => (
        <span key={link.href} className="flex items-center">
          {i > 0 && (
            <span
              className="mx-3 text-[var(--border-neutral)] select-none"
              aria-hidden="true"
            >
              ·
            </span>
          )}
          <a
            href={link.href}
            className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--accent-teal)] transition-colors"
          >
            {link.label}
          </a>
        </span>
      ))}
    </nav>
  );
}

export default SectionNav;
