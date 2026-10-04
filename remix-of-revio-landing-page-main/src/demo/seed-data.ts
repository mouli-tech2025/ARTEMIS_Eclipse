import type { BlogPost } from "@/lib/services/blog-service";

/**
 * Static seed data for the /demo/* marketing routes.
 * No auth, no network, no database — purely hardcoded content so the
 * dashboard screenshots look populated and real.
 */

export interface DemoProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
}

export const demoProfile: DemoProfile = {
  first_name: "Amara",
  last_name: "Okafor",
  email: "amara@revio.com",
  phone: "+1 (415) 555-0142",
  avatar_url: "/images/homepage/avatar-1.png",
};

const FEATURED_IMAGES = [
  "/images/homepage/core-feature.webp",
  "/images/homepage/core-feature-settlements.webp",
  "/images/homepage/core-feature-control.webp",
  "/images/homepage/core-feature-stat.webp",
  "/images/homepage/credit-card.webp",
  "/images/homepage/phone.webp",
];

const AUTHOR_IMAGES = [
  "/images/homepage/avatar-1.png",
  "/images/homepage/avatar-2.png",
  "/images/homepage/avatar-3.png",
  "/images/homepage/avatar-4.png",
];

const body = (intro: string) => `<h2>Overview</h2>
<p>${intro}</p>
<p>Payments teams rarely fail because of a single broken integration. They fail because the
operational surface grows faster than the tooling around it. This is a look at how modern
finance teams keep that surface manageable.</p>
<h3>What changes first</h3>
<ul>
  <li>Reconciliation moves from spreadsheets to event streams</li>
  <li>Settlement windows shrink from days to hours</li>
  <li>Risk rules are versioned like application code</li>
</ul>
<blockquote>The teams that win treat money movement as a product, not a back office.</blockquote>
<h3>Getting there</h3>
<p>Start with observability. Once every authorization, capture, and payout is queryable in one
place, the rest of the roadmap tends to write itself.</p>`;

interface Seed {
  title: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  status: "draft" | "published";
  intro: string;
}

const seeds: Seed[] = [
  {
    title: "Instant settlements: what actually happens behind the scenes",
    category: "Payments",
    author: "Amara Okafor",
    date: "Aug 18, 2026",
    read_time: "7 min read",
    status: "published",
    intro:
      "Instant payouts feel like magic to customers and like plumbing to engineers. Here is the plumbing.",
  },
  {
    title: "A practical guide to PCI DSS 4.0 for growing fintechs",
    category: "Compliance",
    author: "Daniel Reyes",
    date: "Aug 12, 2026",
    read_time: "9 min read",
    status: "published",
    intro:
      "The new requirements are less about paperwork and more about continuous evidence. Plan accordingly.",
  },
  {
    title: "Designing a merchant dashboard people actually open daily",
    category: "Product",
    author: "Priya Raman",
    date: "Aug 6, 2026",
    read_time: "6 min read",
    status: "published",
    intro:
      "Dashboards die when they answer questions nobody asked. We rebuilt ours around three jobs.",
  },
  {
    title: "Cutting card decline rates by 4.2% in one quarter",
    category: "Growth",
    author: "Amara Okafor",
    date: "Jul 29, 2026",
    read_time: "5 min read",
    status: "published",
    intro:
      "Most declines are recoverable. The trick is knowing which retry to attempt, and when.",
  },
  {
    title: "Multi-currency pricing without the spreadsheet chaos",
    category: "Payments",
    author: "Sofia Lindqvist",
    date: "Jul 22, 2026",
    read_time: "8 min read",
    status: "published",
    intro:
      "FX spreads, rounding rules, and tax inclusivity all fight each other. Here is a model that holds.",
  },
  {
    title: "How we ship risk rules twice a week without incidents",
    category: "Engineering",
    author: "Daniel Reyes",
    date: "Jul 15, 2026",
    read_time: "10 min read",
    status: "published",
    intro:
      "Fraud rules are code. Once we treated them that way, our rollback time dropped to seconds.",
  },
  {
    title: "The onboarding funnel audit that doubled activation",
    category: "Growth",
    author: "Priya Raman",
    date: "Jul 8, 2026",
    read_time: "6 min read",
    status: "published",
    intro:
      "We recorded 40 real onboarding sessions. Six friction points explained almost all the drop-off.",
  },
  {
    title: "Webhooks that survive outages: idempotency in practice",
    category: "Engineering",
    author: "Marcus Chen",
    date: "Jun 30, 2026",
    read_time: "7 min read",
    status: "published",
    intro:
      "Delivering a webhook once is easy. Delivering it exactly once, forever, is a design problem.",
  },
  {
    title: "What SOC 2 Type II taught us about internal tooling",
    category: "Compliance",
    author: "Sofia Lindqvist",
    date: "Jun 24, 2026",
    read_time: "5 min read",
    status: "published",
    intro:
      "Audit prep exposed every undocumented admin script we had. That turned out to be a gift.",
  },
  {
    title: "Building a payouts API your finance team can trust",
    category: "Product",
    author: "Marcus Chen",
    date: "Jun 17, 2026",
    read_time: "8 min read",
    status: "published",
    intro:
      "Finance does not want more endpoints. They want guarantees they can explain to an auditor.",
  },
  {
    title: "Pricing experiments that did not tank our margins",
    category: "Growth",
    author: "Amara Okafor",
    date: "Jun 9, 2026",
    read_time: "6 min read",
    status: "published",
    intro:
      "Four pricing tests, two winners, one expensive lesson about grandfathering existing plans.",
  },
  {
    title: "Observability for money movement, end to end",
    category: "Engineering",
    author: "Daniel Reyes",
    date: "Jun 2, 2026",
    read_time: "9 min read",
    status: "published",
    intro:
      "Every ledger entry should be traceable to a request ID. We got there in three milestones.",
  },
  {
    title: "Draft: 2027 embedded finance outlook",
    category: "Insights",
    author: "Priya Raman",
    date: "Aug 20, 2026",
    read_time: "11 min read",
    status: "draft",
    intro:
      "Working notes on where embedded finance margins compress next, and who benefits from it.",
  },
  {
    title: "Draft: interviewing for payments engineers",
    category: "Engineering",
    author: "Marcus Chen",
    date: "Aug 19, 2026",
    read_time: "4 min read",
    status: "draft",
    intro:
      "Our loop, the questions we dropped, and the one exercise that predicts on-the-job success.",
  },
  {
    title: "Draft: the reconciliation playbook",
    category: "Payments",
    author: "Sofia Lindqvist",
    date: "Aug 15, 2026",
    read_time: "12 min read",
    status: "draft",
    intro:
      "A step-by-step playbook for closing the books when three processors disagree with each other.",
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/^draft:\s*/, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const demoBlogPosts: BlogPost[] = seeds.map((seed, index) => ({
  id: `demo-post-${index + 1}`,
  title: seed.title,
  slug: slugify(seed.title),
  category: seed.category,
  author: seed.author,
  author_image: AUTHOR_IMAGES[index % AUTHOR_IMAGES.length],
  status: seed.status,
  date: seed.date,
  read_time: seed.read_time,
  image: FEATURED_IMAGES[index % FEATURED_IMAGES.length],
  content: body(seed.intro),
  created_at: new Date(2026, 5, 1 + index).toISOString(),
  updated_at: new Date(2026, 5, 1 + index).toISOString(),
}));

export const demoCategories = Array.from(
  new Set(demoBlogPosts.map((post) => post.category))
).sort();
