import { motion } from "framer-motion"
import { Activity, ArrowRight, ShieldCheck, Terminal } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../ui/Button"
import { StaggerContainer } from "../../ui/motion/stagger"

const easingCurve = [0.21, 0.47, 0.32, 0.98] as const

const heroVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: easingCurve, staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easingCurve } },
}

const threatFlow = [
  { label: "URL", accent: "from-primary to-sky-400" },
  { label: "EMAIL", accent: "from-violet-400 to-indigo-400" },
  { label: "IMAGE", accent: "from-cyan-400 to-emerald-400" },
  { label: "SMS", accent: "from-amber-400 to-orange-400" },
]

const threatStatusRows = [
  { label: "Credential harvesting attempt", level: "Critical", tint: "text-destructive" },
  { label: "Malicious redirect chain", level: "High", tint: "text-warning" },
  { label: "New smishing variant", level: "Moderate", tint: "text-primary" },
]

const securityStackRows = [
  { label: "URL scanning", value: 98.7 },
  { label: "Email detection", value: 97.9 },
  { label: "Image OCR", value: 96.8 },
]

export function HeroSection() {
  return (
    <motion.section
      className="relative overflow-hidden pb-20 pt-12 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20"
      initial="hidden"
      animate="show"
      variants={heroVariants}
    >
      {/* Animated background blobs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.20),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.12),transparent_32%)]" />
        <motion.div
          className="absolute left-[10%] top-[8%] h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[6%] right-[8%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"
          animate={{ y: [0, 22, 0], x: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Badges */}
        <StaggerContainer className="mb-5 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <Activity className="h-3 w-3" />
              <span>Threat monitoring live</span>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-success" />
              <span>Realtime defense across mail, web and mobile</span>
            </div>
          </motion.div>
        </StaggerContainer>

        {/* Headline */}
        <motion.div variants={itemVariants} className="mx-auto max-w-5xl text-center">
          <h1 className="h1 text-foreground">
            Detect phishing before it reaches your users.
            <span className="mt-3 block bg-gradient-to-r from-primary via-sky-300 to-violet-400 bg-clip-text text-transparent">
              Built for modern security teams.
            </span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.div variants={itemVariants} className="mx-auto mt-6 max-w-2xl text-center">
          <p className="paragraph-lg text-sm text-muted-foreground md:text-base">
            Artemis combines URL, email, image, and SMS analysis into a single cyber defense platform engineered to detect deception at scale.
          </p>
        </motion.div>

        {/* CTAs */}
        <StaggerContainer className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div variants={itemVariants}>
            <Link to="/signup">
              <Button size="lg" className="h-12 gap-2 uppercase tracking-[0.2em] text-[11px] transition-all duration-300 hover:-translate-y-0.5">
                Start protection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/app/how-it-works">
              <Button variant="outline" size="lg" className="h-12 gap-2 uppercase tracking-[0.2em] text-[11px] transition-all duration-300 hover:-translate-y-0.5">
                <Terminal className="h-4 w-4" />
                How it works
              </Button>
            </Link>
          </motion.div>
        </StaggerContainer>

        {/* Live threat flow visual */}
        <motion.div variants={itemVariants} className="mx-auto mt-10 max-w-5xl">
          <div className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,_rgba(11,16,27,0.94),_rgba(10,13,24,0.9))] p-5 shadow-[0_30px_80px_-40px_rgba(59,130,246,0.8)] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] before:bg-[size:26px_26px]">
            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Live threat flow</div>
                <motion.div
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-success"
                >
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Protected
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {threatFlow.map((node, index) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: easingCurve }}
                  >
                    <div className={`flex h-14 w-20 items-center justify-center rounded-2xl border border-border/80 bg-gradient-to-br ${node.accent} px-3 text-[10px] font-mono uppercase tracking-[0.22em] text-white shadow-[0_10px_30px_-18px_rgba(96,165,250,0.9)]`}>
                      {node.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground md:gap-5">
                <motion.div
                  animate={{ opacity: [0.35, 1, 0.35], x: [0, 8, 0] }}
                  transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="h-px w-10 bg-gradient-to-r from-transparent via-primary/70 to-transparent md:w-16"
                />
                <span className="font-mono uppercase tracking-[0.25em] text-primary">Analyzing</span>
                <motion.div
                  animate={{ opacity: [0.35, 1, 0.35], x: [0, -8, 0] }}
                  transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="h-px w-10 bg-gradient-to-r from-transparent via-primary/70 to-transparent md:w-16"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: "Threat engine", accent: "from-primary to-violet-500" },
                  { label: "Safe / phishing", accent: "from-emerald-400 to-primary" },
                ].map((node, index) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.12, ease: easingCurve }}
                  >
                    <div className={`flex h-14 items-center justify-center rounded-full border border-primary/30 bg-gradient-to-r ${node.accent} px-6 text-[10px] font-mono uppercase tracking-[0.24em] text-white shadow-[0_0_24px_rgba(96,165,250,0.26)]`}>
                      {node.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Threat console + security stack */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          {/* Threat console */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-[28px] border border-primary/20 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_36%),linear-gradient(160deg,_rgba(17,24,39,0.94),_rgba(9,12,22,0.9))] p-6 sm:p-8"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,_rgba(96,165,250,0.18),transparent_20%)]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-border/80 pb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Threat intelligence</div>
                  <div className="mt-2 text-xl font-semibold text-foreground">Threat Console</div>
                </div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-success"
                >
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Protected
                </motion.div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Blocked today</div>
                  <div className="mt-3 text-3xl font-semibold text-foreground">814</div>
                  <div className="mt-2 text-xs text-success">+18.4% vs last week</div>
                </motion.div>
                <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-border/80 bg-background/60 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Avg. triage</div>
                  <div className="mt-3 text-3xl font-semibold text-foreground">42ms</div>
                  <div className="mt-2 text-xs text-primary">Across all channels</div>
                </motion.div>
              </div>

              <div className="mt-6 rounded-2xl border border-border/80 bg-[#0b1220] p-4">
                <div className="mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  <span>Live incidents</span>
                  <span>3 active</span>
                </div>
                <div className="space-y-3">
                  {threatStatusRows.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="flex items-center justify-between rounded-xl border border-border/80 bg-card/30 px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{ scale: [1, 1.35, 1], opacity: [0.45, 1, 0.45] }}
                          transition={{ duration: 1.6, delay: index * 0.18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          className="inline-block h-2 w-2 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <span className="text-foreground">{item.label}</span>
                      </div>
                      <span className={item.tint}>{item.level}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.22 }}
          >
            <div className="rounded-[28px] border border-border/80 bg-card/50 p-5 backdrop-blur-sm shadow-[0_30px_60px_-35px_rgba(59,130,246,0.7)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Security stack</div>
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-3">
                {securityStackRows.map((row, index) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08 * index }}
                    whileHover={{ x: 4 }}
                    className="rounded-2xl border border-border/80 bg-background/60 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="text-foreground">{row.value.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-border/80">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.28 + index * 0.12, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-sky-300"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
