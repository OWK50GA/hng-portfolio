// ─── Enums & unions ────────────────────────────────────────────────────────

export type StageDepth = "full" | "pill";

/**
 * Two accent colours + neutral.
 * teal     → projects, deep dive (at reduced opacity), any technical section
 * teal-dim → deep dive at reduced opacity
 * amber    → learning reflection only
 * neutral  → hero, skills, contact
 */
export type SectionAccent = "teal" | "teal-dim" | "amber" | "neutral";

// ─── Metric ─────────────────────────────────────────────────────────────────

export interface Metric {
  /** e.g. "cold query", "cached hit", "DB load" */
  label: string;
  before: string;
  after: string;
}

// ─── HNG Project ────────────────────────────────────────────────────────────

export interface HngProject {
  /** Stage identifier, e.g. "2", "3", "4b", "8a" */
  stage: string;
  /** Human-readable title */
  title: string;
  /** 1–3 sentence description of the work */
  description: string;
  /** Tech stack labels shown as TechBadge pills */
  tech: string[];
  /** Whether to render a full card or a compact pill */
  depth: StageDepth;
  /** Optional: key performance/before-after metrics */
  metrics?: Metric[];
  /** Optional: score or outcome note */
  scoreNote?: string;
}

// ─── Featured Deep Dive ──────────────────────────────────────────────────────

export interface DeepDive {
  stageRef: string; // e.g. "4b"
  sectionTitle: string; // e.g. "Stage 4b: Query Optimization"
  problem: string; // paragraph(s)
  whatChanged: string; // paragraph(s)
  metrics: Metric[];
  keyChallenge: string;
  solution: string;
}

// ─── Backend Skill ───────────────────────────────────────────────────────────

export interface SkillGroup {
  /** Category name, e.g. "auth & security" */
  category: string;
  skills: string[];
  /** Stage(s) that evidence this group */
  stageRefs: string[];
}

// ─── Reflection Paragraph ────────────────────────────────────────────────────

export interface ReflectionEntry {
  /** Optional stage reference for a callout pill */
  stageRef?: string;
  text: string;
}

// ─── Social Link ─────────────────────────────────────────────────────────────

export type SocialPlatform = "github" | "linkedin" | "email" | "twitter";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

// ─── Design Doc (RFC / System Design) ───────────────────────────────────────

export type DocConcept =
  | "RFC"
  | "System Design"
  | "Architecture"
  | "API Design"
  | "Data Model";

export interface DesignDoc {
  /** Short document title */
  title: string;
  /** Document concept / type */
  concept: DocConcept;
  /** External link to the document (Google Docs, Notion, GitHub, etc.) */
  link: string;
  /** Full description — shown truncated on card, expanded in modal */
  description: string;
}

// ─── Root data shape ─────────────────────────────────────────────────────────

export interface PortfolioData {
  hero: {
    name: string;
    title: string;
    location: string;
    bio: string[];
    social: SocialLink[];
    /** Optional path to avatar image (relative to /public). Falls back to initials. */
    avatarSrc?: string;
    /** Optional quote shown in the right half of the hero card */
    quote?: string;
  };
  projects: HngProject[];
  deepDive: DeepDive;
  skills: SkillGroup[];
  designDocs: DesignDoc[];
  reflections: ReflectionEntry[];
  contact: SocialLink[];
}

// ─── Static content ──────────────────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  hero: {
    name: "Wilfrid Okorie",
    title: "Backend Engineer",
    location: "Lagos, Nigeria",
    avatarSrc: "/basically-me.jpg",
    quote:
      "I build systems that hold under pressure — the kind of infrastructure work that's invisible when it works and catastrophic when it doesn't. Databases, queues, auth flows, retry engines. The parts users never see, but always feel.",
    bio: [
      "I build systems that don't fall over.",
      "APIs, reliability, and the parts users never see.",
    ],
    social: [
      {
        platform: "github",
        href: "https://github.com/wilfrid-k",
        label: "GitHub",
      },
      {
        platform: "linkedin",
        href: "https://www.linkedin.com/in/wilfrid-okorie/",
        label: "LinkedIn",
      },
      {
        platform: "email",
        href: "mailto:wilfridkenneth98@gmail.com",
        label: "Email",
      },
    ],
  },

  projects: [
    // ── Full-depth cards ──────────────────────────────────────────────────
    {
      stage: "2",
      depth: "full",
      title: "Filtering, sorting, pagination — NL parsing",
      description:
        "First real backend: built query engine with natural-language parameter parsing, full sort/filter/paginate pipeline on PostgreSQL.",
      tech: ["Node.js", "PostgreSQL"],
    },
    {
      stage: "3",
      depth: "full",
      title: "GitHub OAuth · PKCE · RBAC",
      description:
        "Auth system covering OAuth PKCE flow, JWT rotation, role-based access control, rate limiting, and a CLI + web portal. Missed the TRD. Score: 74/100.",
      tech: ["GitHub OAuth", "PKCE", "RBAC"],
      scoreNote: "74/100",
    },
    {
      stage: "4b",
      depth: "full",
      title: "Indexing · Caching · CSV Ingest",
      description:
        "Query optimisation dropped cold query time from 1200ms to 230ms. Redis cache layer brought cached hits to 70ms. Canonical query normalisation for consistent cache keys.",
      tech: ["Indexing", "Caching", "Redis"],
      metrics: [
        { label: "cold query", before: "1200ms", after: "230ms" },
        { label: "cached hit", before: "—", after: "70ms" },
        { label: "DB load", before: "high", after: "−40%" },
      ],
    },
    {
      stage: "5",
      depth: "full",
      title: "Redis pub/sub · SSE",
      description:
        "Replaced polling with event-driven architecture: Redis pub/sub channels feeding Server-Sent Events to clients.",
      tech: ["Redis pub/sub", "SSE"],
    },
    {
      stage: "6",
      depth: "full",
      title: "Pattern pub/sub · Alert detection",
      description:
        "Alert detection service subscribed to Inserter.* Redis channel pattern. Honest about team task-division issues this stage.",
      tech: ["Pattern pub/sub"],
    },
    {
      stage: "8a",
      depth: "full",
      title: "Worker loop · Exponential backoff",
      description:
        "Retry engine with jitter, dead-letter queue, and 4xx terminal logic. SQLite-backed worker with configurable backoff parameters.",
      tech: ["SQLite", "Exponential backoff"],
    },
    // ── Compact pill stages ───────────────────────────────────────────────
    {
      stage: "0",
      depth: "pill",
      title: "Orientation",
      description: "",
      tech: [],
    },
    {
      stage: "1",
      depth: "pill",
      title: "Basic CRUD",
      description: "",
      tech: [],
    },
    {
      stage: "4a",
      depth: "pill",
      title: "Design doc",
      description: "",
      tech: [],
    },
    {
      stage: "5b",
      depth: "pill",
      title: "RFC / curveball",
      description: "",
      tech: [],
    },
    {
      stage: "7b",
      depth: "pill",
      title: "This portfolio (spec)",
      description: "",
      tech: [],
    },
  ],

  deepDive: {
    stageRef: "4b",
    sectionTitle: "Stage 4b: Query Optimization",
    problem:
      "PostgreSQL queries on the filtered/sorted endpoint were consistently slow under real data volumes. Cold query times hit 1200ms — well above the 300ms target. No indexes existed on the filter columns, and repeated identical queries hit the database every time.",
    whatChanged:
      "Added composite indexes on the most-queried filter columns. Introduced a Redis cache layer with a 5-minute TTL. Implemented canonical query normalisation so that semantically identical queries (different key ordering, whitespace) map to the same cache key.",
    metrics: [
      { label: "cold query", before: "1200ms", after: "230ms" },
      { label: "cached hit", before: "—", after: "70ms" },
      { label: "DB load", before: "high", after: "−40%" },
    ],
    keyChallenge:
      "The same query expressed with different parameter ordering produced different cache keys, causing near-zero cache hit rates even after Redis was wired in.",
    solution:
      "Canonical query normalisation: sort query parameters alphabetically and strip whitespace before hashing. Cache hit rate jumped from under 5% to over 60% within the same test run.",
  },

  skills: [
    {
      category: "auth & security",
      stageRefs: ["3"],
      skills: [
        "GitHub OAuth PKCE",
        "JWT rotation",
        "RBAC",
        "rate limiting",
        "bcrypt",
      ],
    },
    {
      category: "performance",
      stageRefs: ["4b", "8a", "5"],
      skills: [
        "Indexing",
        "Redis caching",
        "query normalisation",
        "connection pooling",
        "retry engine",
        "exponential backoff",
        "dead-letter queue",
      ],
    },
    {
      category: "async & resilience",
      stageRefs: ["5", "6", "8a"],
      skills: [
        "event-driven architecture",
        "SSE",
        "pattern pub/sub",
        "worker loops",
        "Redis pub/sub",
      ],
    },
  ],

  designDocs: [
    {
      title: "RFC-001: Canonical Query Normalisation for Cache Key Consistency",
      concept: "RFC",
      link: "https://github.com/wilfrid-k",
      description:
        "This RFC proposes a canonical query normalisation strategy to address cache key fragmentation in the filtered/sorted API endpoints. The core problem is that semantically identical queries — differing only in parameter ordering or whitespace — generate distinct cache keys, resulting in near-zero Redis cache hit rates despite a correctly configured cache layer. The proposal defines a deterministic normalisation algorithm: sort query parameters alphabetically, strip leading and trailing whitespace from both keys and values, and lower-case all keys before hashing. The document covers the failure mode in depth, presents benchmark data showing cache hit rates below 5% before the fix, and argues why normalisation at the application layer (rather than at the cache or database layer) is the correct boundary. It also addresses edge cases: boolean coercion, array parameters, and pagination tokens that must not be normalised. The RFC concludes with a migration plan and a rollout strategy that allows gradual adoption without invalidating existing cache entries.",
    },
    {
      title: "RFC-002: Event-Driven Alert Detection via Redis Pattern Subscriptions",
      concept: "RFC",
      link: "https://github.com/wilfrid-k",
      description:
        "This RFC designs the alert detection subsystem for Stage 6, replacing a polling-based approach with a Redis pattern subscription architecture. The document opens with a critique of the existing polling loop: fixed 500ms intervals created unnecessary database load under low-event conditions and introduced unacceptable latency spikes under high-event conditions. The proposed design subscribes the alert service to the `Inserter.*` Redis channel pattern, allowing it to react to any event published by the Inserter service family without coupling the two services directly. The RFC specifies the message envelope schema, the deduplication window (5-second sliding window backed by a Redis sorted set), and the dead-letter strategy for events that fail alert evaluation. A separate section covers operational concerns: how to drain the subscription queue on graceful shutdown, how to handle Redis reconnection, and how to emit structured logs for each alert evaluation cycle. The RFC also documents the team task-division issue encountered during implementation and what was deliberately descoped.",
    },
    {
      title: "RFC-003: Retry Engine with Exponential Backoff and Dead-Letter Queue",
      concept: "RFC",
      link: "https://github.com/wilfrid-k",
      description:
        "This RFC specifies the retry engine built during Stage 8a. The document starts from first principles: why naive immediate retries are harmful (thundering herd, cascading failures), and why a well-designed retry system needs three things — bounded retry count, randomised backoff with jitter, and a terminal state for permanently failed jobs. The proposed engine uses full jitter exponential backoff (base 200ms, multiplier 2×, cap 30s, ±25% jitter), a configurable maximum retry count per job type, and 4xx terminal logic that immediately moves non-retriable HTTP errors to the dead-letter queue without consuming retry budget. The RFC defines the SQLite schema for the worker state table, the tick interval for the worker loop, and the concurrency model (single-process, single-thread, explicit serialisation). It also covers the dead-letter queue consumer contract: what metadata is preserved, how to replay a dead-lettered job manually, and how to emit alerting signals when the DLQ depth crosses a threshold. Appendices include the full backoff formula and a comparison against three alternative libraries that were evaluated and rejected.",
    },
    {
      title: "RFC-004: PKCE OAuth Flow with JWT Rotation and RBAC Policy Engine",
      concept: "RFC",
      link: "https://github.com/wilfrid-k",
      description:
        "This RFC documents the authentication and authorisation system designed and implemented in Stage 3. It covers the full GitHub OAuth PKCE flow from code challenge generation through token exchange, explains why PKCE was chosen over implicit flow for the CLI client (no redirect URI), and specifies the JWT rotation strategy: short-lived access tokens (15 minutes), long-lived refresh tokens (7 days) stored as opaque references in the database, and automatic rotation on every refresh. The RBAC section defines the policy model: roles are hierarchical, permissions are additive, and a central policy engine evaluates every protected route before handler execution. The RFC includes the full permission matrix for the three built-in roles (viewer, editor, admin), the rate limiting strategy (per-IP sliding window for auth endpoints, per-user token bucket for API endpoints), and the bcrypt work factor selection rationale. A post-mortem section documents the Technical Requirements Document that was missed during submission and what would have been done differently.",
    },
  ],

  reflections: [
    {
      stageRef: "3",
      text: "Stage 3 was humbling. I built a complete auth system — OAuth PKCE, JWT rotation, RBAC, rate limiting — and still scored 74/100 because I missed the Technical Requirements Document. The code worked; the communication didn't. That gap between 'it works' and 'it meets spec' is something I haven't forgotten.",
    },
    {
      stageRef: "4b",
      text: "The cache hit rate problem in Stage 4b looked like a Redis issue until I spent a day staring at the keys. It was a normalisation problem — same query, different parameter order, different hash. The fix was straightforward once I saw it. The lesson was about looking at the data before assuming I knew the cause.",
    },
    {
      text: "I was honest in Stage 6 about the team task-division issues. Some work didn't get done the way it should have. I documented what I built and what I didn't, rather than pretending otherwise. That's the only way these reflections are useful.",
    },
    {
      text: "The retry engine in Stage 8a was the most satisfying build. Jitter, dead-letter queues, 4xx terminal logic — it's the kind of infrastructure work that's invisible when it works and catastrophic when it doesn't. I'd like to go deeper on distributed systems patterns.",
    },
  ],

  contact: [
    {
      platform: "github",
      href: "https://github.com/wilfrid-k",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      href: "https://www.linkedin.com/in/wilfrid-okorie/",
      label: "LinkedIn",
    },
    {
      platform: "email",
      href: "mailto:wilfridkenneth98@gmail.com",
      label: "Email",
    },
    {
      platform: "twitter",
      href: "https://x.com/wilfrid_k",
      label: "Twitter",
    },
  ],
};
