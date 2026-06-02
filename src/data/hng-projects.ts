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
  summary: string;
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
  type: "individual" | "team";
}

// ─── Featured Deep Dive ──────────────────────────────────────────────────────

export interface DeepDive {
  stageRef: string; // e.g. "4b"
  sectionTitle: string; // e.g. "Stage 4b: Query Optimization",
  background: string;
  problem: string; // paragraph(s)
  whatChanged: string; // paragraph(s)
  // metrics: Metric[];
  // keyChallenge: string;
  // solution: string;
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
        href: "https://github.com/OWK50GA",
        label: "GitHub",
      },
      {
        platform: "linkedin",
        href: "https://www.linkedin.com/in/wilfrid-okorie-072685232",
        label: "LinkedIn",
      },
      {
        platform: "email",
        href: "mailto:wilfridokorie@gmail.com",
        label: "Email",
      },
    ],
  },

  projects: [
    // ── Full-depth cards ──────────────────────────────────────────────────
    {
      stage: "0",
      depth: "full",
      title: "Name Classification API",
      summary: "A single GET endpoint that calls the Genderize API, processes the response, and returns a structured classification with confidence scoring.",
      description: "Built a REST API endpoint that accepts a name query parameter, calls the external Genderize API, and returns a processed response including gender, probability, sample size, and a computed is_confident flag — true only when probability ≥ 0.7 and sample size ≥ 100. Handled edge cases including null gender responses, zero counts, upstream failures, and CORS. First production-style API with strict response contracts and automated grading.",
      tech: ["Node.js", "Express.js"],
      type: "individual",
    },
    {
      stage: "1",
      depth: "full",
      title: "Demographic Profile Builder",
      summary: "A multi-API integration that builds and persists demographic profiles by combining gender, age, and nationality predictions for any given name.",
      description: "Extended Stage 0 by integrating three external APIs simultaneously — Genderize, Agify, and Nationalize. For each name, the system fetches gender probability, predicted age, and top nationality, applies classification logic (age groups: child/teenager/adult/senior), and persists the result to a database. Implemented idempotency so duplicate names return the existing record rather than creating new entries. Added full CRUD endpoints with filtering by gender, country, and age group.",
      tech: ["Node.js", "Express.js", "PostgreSQL"],
      type: "individual",
    },
    {
      stage: "2",
      depth: "full",
      title: "Intelligence Query Engine",
      summary: "Advanced querying layer over the demographic dataset with filtering, sorting, pagination, and a rule-based natural language search endpoint.",
      description:
        `Upgraded the profile system into a proper query engine for Insighta Labs, a fictional demographic intelligence company. Implemented combined multi-field filtering (gender, age range, country, probability thresholds), multi-field sorting, and cursor-based pagination — all combinable in a single request. The centrepiece was a rule-based natural language parser: plain English queries like "young males from Nigeria" are parsed into structured filters without any AI or LLMs. Seeded the database with 2,026 profiles from a provided JSON file. First stage that felt like real backend engineering`,
      tech: ["Node.js", "Express.js", "PostgreSQL"],
      type: "individual"
    },
    {
      stage: "3",
      depth: "full",
      title: "Secure Platform: Auth, RBAC & Multi-Interface Access",
      summary: "Full authentication system with GitHub OAuth PKCE, role-based access control, a globally installable CLI tool, and a web portal — all talking to the same backend.",
      description:
        "Transformed the profile system into a multi-interface platform with real security. Implemented GitHub OAuth with PKCE flow for both CLI and browser clients, short-lived access tokens with refresh token rotation, and role-based access control enforcing admin vs. analyst permissions across every endpoint. Built a globally installable CLI tool persisting credentials at ~/.insighta/credentials.json, a web portal with HTTP-only cookies and CSRF protection, API versioning, CSV export, rate limiting, and request logging. Three separate repos (backend, CLI, web portal) all integrated to the same system. Score: 76/100 — the hardest stage personally.",
      tech: ["GitHub OAuth", "PKCE", "RBAC"],
      type: "individual"
    },
    {
      stage: "4b",
      depth: "full",
      title: "Query Optimization & CSV Ingestion",
      summary: "Implemented the design doc written in RFC 001 - reduced P95 query latency from 1200ms+ to 230ms, cached routes hitting 70ms, and built a streaming CSV ingestion pipeline handling up to 500,000 rows per file.",
      description:
        `Implementation stage for the scale design. Optimized query execution through composite indexing, Redis caching, canonical query normalization (so "Nigerian females 20–45" and "Women aged 20–45 from Nigeria" map to the same cache key), query restructuring, and connection pooling. Cold queries dropped from 1200ms+ to 230ms; cached hits to 70ms. Also built a large-scale CSV ingestion endpoint handling files up to 500,000 rows via streaming and chunked processing — no full file loads into memory, concurrent uploads supported, partial failure handling with per-row skip logic and a summary response. Existing API contracts stayed unchanged throughout.`,
      tech: ["Indexing", "Caching", "Redis"],
      // metrics: [
      //   { label: "cold query", before: "1200ms", after: "230ms" },
      //   { label: "cached hit", before: "—", after: "70ms" },
      //   { label: "DB load", before: "high", after: "−40%" },
      // ],
      type: "individual"
    },
    {
      stage: "5",
      depth: "full",
      title: "Real-Time Inverter Streaming (EnergyIQ)",
      summary: "Replaced frontend polling with an event-driven architecture using Redis pub/sub and SSE, so inverter data pushes to clients in real time.",
      description:
        `For EnergyIQ — a solar inverter monitoring platform — the original design had the frontend polling the backend, which in turn polled external inverter APIs (Victron, Growatt, Deye/Sunsynk) on every request. Replaced this with a proper event-driven flow: a single background polling service fetches inverter data and publishes updates to Redis channels named by inverter ID. An SSE endpoint lets each client open a persistent connection and subscribe to their inverter's channel, receiving updates as they arrive. Wrote the RFC before touching any code, documented the divergences during implementation, and handled the "curveball" scope change under deadline pressure in Stage 5b.`,
      tech: ["Redis pub/sub", "SSE"],
      type: "team",
    },
    {
      stage: "6",
      depth: "full",
      title: " Inverter Alert Detection System (Team)",
      summary: "An alert detection service that listens to all inverter data streams via Redis pattern pub/sub, checks for anomalies, and notifies users when something goes wrong.",
      description:
        "Team stage built on top of the Stage 5 streaming architecture. Implemented an AlertDetectionService subscribed to the inverter:* Redis pattern channel — meaning it receives every inverter update across all users. On each message, the service inspects the data payload for abnormal readings (voltage out of range, battery critically low, unexpected status codes), and dispatches alerts to the relevant user if thresholds are breached. Integrated with the existing SSE and notification infrastructure. Delivered working implementation with tests, structured logging, and edge case documentation. Personal lesson: not dividing the team task well upfront meant carrying most of the implementation alone — resulted in scrappy work near deadline.",
      tech: ["Pattern pub/sub"],
      type: "team",
    },
    {
      stage: "8a",
      depth: "full",
      title: "Retry Engine",
      summary: "An HTTP service that accepts outbound requests, retries them on failure using exponential backoff with jitter, and tracks every attempt — never retrying on 4xx, dead-lettering at max retries.",
      description:
        " Built a resilience layer for unreliable external API calls. POST /request returns immediately with a pending ID; a background worker loop (waking every ~500ms) picks up due requests and executes them. Backoff doubles each retry (1s → 2s → 4s → 8s → 16s) with per-attempt jitter in the [0.8, 1.2) range. Retries on 5xx responses, timeouts, and network errors; 4xx responses are terminal and never retried. Full attempt history is persisted alongside each request record. Requests that exhaust maxRetries are dead-lettered and never touched again. Spent more time thinking through the design than writing the code — and it showed in the implementation.",
      tech: ["SQLite", "Exponential backoff"],
      type: "individual"
    },
  ],

  deepDive: {
    stageRef: "5",
    sectionTitle: "Stage 5: Real-Time Inverter Streaming (EnergyIQ)",
    background: "EnergyIQ is a platform that turns solar inverter system data into actionable financial and optimization intelligence for users",
    problem:
      `
      The design of EnergyIQ put it that to get user data, the frontend polls the backend, and then the backend makes a request to the inverter API to get the data for the user's registered inverter.
      This works for one or two users, but as a systems architect, I thought about the effect this would have when EnergyIQ grows to many users. \n The frontend having to poll the backend, and the backend in turn making request to the inverter API is hell at scale, and the system is likely to crumble under that load. There is a polling inefficiency there. N clients triggering N api calls, and the backend in turn making N API calls to respond is hell to think about.
      `,
    whatChanged:
      `
      Instead, my solution was to replace this with a proper event-driven flow: a single background polling service fetches inverter data and publishes updates to Redis channels named by inverterID. 
      In turn, an SSE endpoint lets each client open a persisten connection to subscribe to their inverter's channel, and receive updates as they arrive. I wrote the RFC before touching any code, and docoumented
      divergences during implementation.
      This turned out to be a very influential change, given that many of the systems are now built around it, and the pubsub flow makes it easy to get data
      External API calls go from O(N clients) to O(N inverters). Those are very different numbers. You might have 500 clients but only 200 unique inverters. And more importantly, if one inverter has 50 people
       watching it (a business owner, their accountant, their technician, etc.), that inverter still only gets polled once, and published to the same channel anyway.
      `,
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
