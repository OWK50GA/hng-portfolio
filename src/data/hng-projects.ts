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
  /** GitHub repository URL */
  githubUrl: string;
  /** Optional: live/deployed URL */
  liveUrl?: string;
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
  summary: string;
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
      summary:
        "A single GET endpoint that calls the Genderize API, processes the response, and returns a structured classification with confidence scoring.",
      description:
        "Built a REST API endpoint that accepts a name query parameter, calls the external Genderize API, and returns a processed response including gender, probability, sample size, and a computed is_confident flag — true only when probability ≥ 0.7 and sample size ≥ 100. Handled edge cases including null gender responses, zero counts, upstream failures, and CORS. First production-style API with strict response contracts and automated grading.",
      tech: ["Node.js", "Express.js"],
      type: "individual",
      githubUrl: "https://github.com/InsightaLabs/insighta-backend",
    },
    {
      stage: "1",
      depth: "full",
      title: "Demographic Profile Builder",
      summary:
        "A multi-API integration that builds and persists demographic profiles by combining gender, age, and nationality predictions for any given name.",
      description:
        "Extended Stage 0 by integrating three external APIs simultaneously — Genderize, Agify, and Nationalize. For each name, the system fetches gender probability, predicted age, and top nationality, applies classification logic (age groups: child/teenager/adult/senior), and persists the result to a database. Implemented idempotency so duplicate names return the existing record rather than creating new entries. Added full CRUD endpoints with filtering by gender, country, and age group.",
      tech: ["Node.js", "Express.js", "PostgreSQL"],
      type: "individual",
      githubUrl: "https://github.com/InsightaLabs/insighta-backend",
    },
    {
      stage: "2",
      depth: "full",
      title: "Intelligence Query Engine",
      summary:
        "Advanced querying layer over the demographic dataset with filtering, sorting, pagination, and a rule-based natural language search endpoint.",
      description: `Upgraded the profile system into a proper query engine for Insighta Labs, a fictional demographic intelligence company. Implemented combined multi-field filtering (gender, age range, country, probability thresholds), multi-field sorting, and cursor-based pagination — all combinable in a single request. The centrepiece was a rule-based natural language parser: plain English queries like "young males from Nigeria" are parsed into structured filters without any AI or LLMs. Seeded the database with 2,026 profiles from a provided JSON file. First stage that felt like real backend engineering`,
      tech: ["Node.js", "Express.js", "PostgreSQL"],
      type: "individual",
      githubUrl: "https://github.com/InsightaLabs/insighta-web-portal",
    },
    {
      stage: "3",
      depth: "full",
      title: "Secure Platform: Auth, RBAC & Multi-Interface Access",
      summary:
        "Full authentication system with GitHub OAuth PKCE, role-based access control, a globally installable CLI tool, and a web portal — all talking to the same backend.",
      description:
        "Transformed the profile system into a multi-interface platform with real security. Implemented GitHub OAuth with PKCE flow for both CLI and browser clients, short-lived access tokens with refresh token rotation, and role-based access control enforcing admin vs. analyst permissions across every endpoint. Built a globally installable CLI tool persisting credentials at ~/.insighta/credentials.json, a web portal with HTTP-only cookies and CSRF protection, API versioning, CSV export, rate limiting, and request logging. Three separate repos (backend, CLI, web portal) all integrated to the same system. Score: 76/100 — the hardest stage personally.",
      tech: ["GitHub OAuth", "PKCE", "RBAC"],
      type: "individual",
      githubUrl: "https://github.com/InsightaLabs/insighta-cli",
    },
    {
      stage: "4b",
      depth: "full",
      title: "Query Optimization & CSV Ingestion",
      summary:
        "Implemented the design doc written in RFC 001 - reduced P95 query latency from 1200ms+ to 230ms, cached routes hitting 70ms, and built a streaming CSV ingestion pipeline handling up to 500,000 rows per file.",
      description: `Implementation stage for the scale design. Optimized query execution through composite indexing, Redis caching, canonical query normalization (so "Nigerian females 20–45" and "Women aged 20–45 from Nigeria" map to the same cache key), query restructuring, and connection pooling. Cold queries dropped from 1200ms+ to 230ms; cached hits to 70ms. Also built a large-scale CSV ingestion endpoint handling files up to 500,000 rows via streaming and chunked processing — no full file loads into memory, concurrent uploads supported, partial failure handling with per-row skip logic and a summary response. Existing API contracts stayed unchanged throughout.`,
      tech: ["Indexing", "Caching", "Redis"],
      // metrics: [
      //   { label: "cold query", before: "1200ms", after: "230ms" },
      //   { label: "cached hit", before: "—", after: "70ms" },
      //   { label: "DB load", before: "high", after: "−40%" },
      // ],
      type: "individual",
      githubUrl: "https://github.com/InsightaLabs/insighta-backend",
    },
    {
      stage: "5",
      depth: "full",
      title: "Real-Time Inverter Streaming (EnergyIQ)",
      summary:
        "Replaced frontend polling with an event-driven architecture using Redis pub/sub and SSE, so inverter data pushes to clients in real time.",
      description: `For EnergyIQ — a solar inverter monitoring platform — the original design had the frontend polling the backend, which in turn polled external inverter APIs (Victron, Growatt, Deye/Sunsynk) on every request. Replaced this with a proper event-driven flow: a single background polling service fetches inverter data and publishes updates to Redis channels named by inverter ID. An SSE endpoint lets each client open a persistent connection and subscribe to their inverter's channel, receiving updates as they arrive. Wrote the RFC before touching any code, documented the divergences during implementation, and handled the "curveball" scope change under deadline pressure in Stage 5b.`,
      tech: ["Redis pub/sub", "SSE"],
      type: "team",
      githubUrl:
        "https://github.com/hngprojects/energy-iq-api/tree/dev/src/modules/metrics-stream",
    },
    {
      stage: "6",
      depth: "full",
      title: " Inverter Alert Detection System (Team)",
      summary:
        "An alert detection service that listens to all inverter data streams via Redis pattern pub/sub, checks for anomalies, and notifies users when something goes wrong.",
      description:
        "Team stage built on top of the Stage 5 streaming architecture. Implemented an AlertDetectionService subscribed to the inverter:* Redis pattern channel — meaning it receives every inverter update across all users. On each message, the service inspects the data payload for abnormal readings (voltage out of range, battery critically low, unexpected status codes), and dispatches alerts to the relevant user if thresholds are breached. Integrated with the existing SSE and notification infrastructure. Delivered working implementation with tests, structured logging, and edge case documentation. Personal lesson: not dividing the team task well upfront meant carrying most of the implementation alone — resulted in scrappy work near deadline.",
      tech: ["Pattern pub/sub"],
      type: "team",
      githubUrl: "https://github.com/hngprojects/energy-iq-api/pull/38",
    },
    {
      stage: "8a",
      depth: "full",
      title: "Retry Engine",
      summary:
        "An HTTP service that accepts outbound requests, retries them on failure using exponential backoff with jitter, and tracks every attempt — never retrying on 4xx, dead-lettering at max retries.",
      description:
        " Built a resilience layer for unreliable external API calls. POST /request returns immediately with a pending ID; a background worker loop (waking every ~500ms) picks up due requests and executes them. Backoff doubles each retry (1s → 2s → 4s → 8s → 16s) with per-attempt jitter in the [0.8, 1.2) range. Retries on 5xx responses, timeouts, and network errors; 4xx responses are terminal and never retried. Full attempt history is persisted alongside each request record. Requests that exhaust maxRetries are dead-lettered and never touched again. Spent more time thinking through the design than writing the code — and it showed in the implementation.",
      tech: ["SQLite", "Exponential backoff"],
      type: "individual",
      githubUrl: "https://github.com/OWK50GA/retry_engine",
    },
  ],

  deepDive: {
    stageRef: "5",
    sectionTitle: "Stage 5: Real-Time Inverter Streaming (EnergyIQ)",
    background:
      "EnergyIQ is a platform that turns solar inverter system data into actionable financial and optimization intelligence for users",
    problem: `
      The design of EnergyIQ put it that to get user data, the frontend polls the backend, and then the backend makes a request to the inverter API to get the data for the user's registered inverter.
      This works for one or two users, but as a systems architect, I thought about the effect this would have when EnergyIQ grows to many users. \n The frontend having to poll the backend, and the backend in turn making request to the inverter API is hell at scale, and the system is likely to crumble under that load. There is a polling inefficiency there. N clients triggering N api calls, and the backend in turn making N API calls to respond is hell to think about.
      `,
    whatChanged: `
      Instead, my solution was to replace this with a proper event-driven flow: a single background polling service fetches inverter data and publishes updates to Redis channels named by inverterID. 
      In turn, an SSE endpoint lets each client open a persisten connection to subscribe to their inverter's channel, and receive updates as they arrive. I wrote the RFC before touching any code, and docoumented
      divergences during implementation.
      This turned out to be a very influential change, given that many of the systems in EnergyIQ are now built around it, and the pubsub flow makes it easy to get data. The Alert Detection for instance builds on the polling service, through pattern pubsub
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
      title: "Stage 4a: Scaling Insighta Labs+: System Design Under Growth",
      concept: "System Design",
      link: "https://docs.google.com/document/d/1vc6Jf647_jhW6CmS5eNLwT91EIZb1E3YkgDtXXEGSPA/edit?tab=t.0#heading=h.x8hn4xkr353c",
      summary:
        "Architecture document for evolving a demographic intelligence platform from millions to tens of millions of records while maintaining near-interactive query response times.",
      description:
        "Produced a full system design document for scaling Insighta Labs+ under sustained growth — hundreds to low thousands of queries per minute, a dataset growing from millions to tens of millions of profiles, multiple concurrent teams. Defined functional and non-functional requirements, designed the component architecture with justified decisions (indexing strategy, caching layer, query normalization, connection pooling), mapped the complete data flow from ingestion through query execution to result delivery, and documented trade-offs and limitations honestly. Every component had a reason; nothing was added speculatively. Presented to mentors — received recognition for decisions that were practical, measurable, and actually reflected in implementation results.",
    },
    {
      title: "Stage 5: Real-Time Inverter Data Streaming",
      concept: "RFC",
      link: "https://docs.google.com/document/d/1M2Inm44CkelMJdM9lWHfvu-inWrBLpK5eNTiuCvYx60/edit?tab=t.0",
      summary:
        "Engineering proposal replacing client-side polling with a Redis pub/sub and SSE architecture for EnergyIQ's inverter monitoring platform.",
      description:
        "Wrote a full RFC before touching any implementation code — the problem statement, proposed solution, cross-track impact on frontend and PM scope, two alternatives considered and why they were rejected, the API contract (SSE endpoint shape, channel naming convention, event payload structure), risks, open questions, and definition of done. The core argument: polling creates an O(N clients) pressure on external inverter APIs, while a single background poller publishing to Redis reduces that to O(N inverters) and decouples data freshness from connection count entirely. Documented mid-implementation divergences from the RFC rather than silently changing direction. Also produced a system design document with architectural diagram.",
    },
    {
      title: "Stage 6: Inverter Alert Detection",
      concept: "System Design",
      link: "https://docs.google.com/document/d/1_k474GN6N1yEGgi7cthzlt7Sl-9uuCVU4LgXEpsNnMw/edit?tab=t.0",
      summary:
        "Architecture document for a pattern-subscribed alert detection service that monitors all inverter data streams and dispatches user notifications on anomalies.",
      description:
        "Produced the system design document for the team's alert detection feature built on top of the Stage 5 streaming infrastructure. Documented the architecture decision to use Redis pattern pub/sub (inverter:*) rather than individual channel subscriptions — allowing the AlertDetectionService to receive every inverter update across all users in a single listener without managing per-inverter subscriptions explicitly. Covered the data flow from inverter poll → Redis publish → alert detection → notification dispatch, defined threshold logic for anomaly detection, specified failure handling strategy, and documented scaling considerations. Included architectural diagram, trade-offs, and what the team would improve with more time.",
    },
    // {
    //   title: "RFC-004: PKCE OAuth Flow with JWT Rotation and RBAC Policy Engine",
    //   concept: "RFC",
    //   link: "https://github.com/wilfrid-k",
    //   description:
    //     "This RFC documents the authentication and authorisation system designed and implemented in Stage 3. It covers the full GitHub OAuth PKCE flow from code challenge generation through token exchange, explains why PKCE was chosen over implicit flow for the CLI client (no redirect URI), and specifies the JWT rotation strategy: short-lived access tokens (15 minutes), long-lived refresh tokens (7 days) stored as opaque references in the database, and automatic rotation on every refresh. The RBAC section defines the policy model: roles are hierarchical, permissions are additive, and a central policy engine evaluates every protected route before handler execution. The RFC includes the full permission matrix for the three built-in roles (viewer, editor, admin), the rate limiting strategy (per-IP sliding window for auth endpoints, per-user token bucket for API endpoints), and the bcrypt work factor selection rationale. A post-mortem section documents the Technical Requirements Document that was missed during submission and what would have been done differently.",
    // },
  ],

  reflections: [
    {
      text: "I have been in tech since 2024. I started with frontend development, did HNGi12, and got to stage 5, but was dropped off. As a frontend developer, I always hated things to do with UI, and I knew I needed to deal with logic.",
    },
    {
      text: "Immediately I dropped out of HNG that year, I closed my heart to UI, so I went to learn Blockchain Development instead. As an Engineering student, I grasped the concepts really fast, and it came so natural to me that I have been recruited on occassions by Starknet Africa to teach.",
    },
    {
      text: "However, I always knew something separated me from the best software engineers. I used to just 'do what works', because I built projects for myself only. I lacked architectural thinking, but I didn't know that is what I lacked. When I got a good-enough review from a hirer that didn't hire me, I decided that learning backend development was the solution.",
    },
    {
      text: "That is how HNG came in. Here in HNG, I think I understand how to look at systems from the bottom, how to properly separate systems into components, look at them individually, and design components that will scale. I have done a lot of reading, and I now I feel far more confident making design decisions than I did in earlier stages.",
    },
    {
      text: "Today, I can recognize when things can scale and cannot, I understand when things should be separated - I understand all of it, and I understand that there is much more to learn.",
    },
    {
      stageRef: "0 - 3",
      text: "Stages 0 - 3 were about learning the basics of backend development. Here, we didn't exactly have to think of scaling and resilience, and the most important concepts. This was about learning how to write endpoints correctly, use database, write queries, and all of the things that make ordinary backend developers.",
    },
    {
      stageRef: "4 - 6",
      text: "Stages 4 - 6 were about design thinking, designing for speed, scalability, and all the resilience under load - but especially speed and durability. This is where we started to draw architecture diagrams, and had to question each decision critically before making them. This is where I loved HNG the most. We also moved into teams where we got to use these skills instantly, and it was beautiful. I enjoyed it.",
    },
    {
      stageRef: "8+",
      text: "Stage 8 has been about learning how systems survive under load, resilience and crash survival. That is what prompted the three tasks that were given, of which I chose the Retry Engine.",
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
