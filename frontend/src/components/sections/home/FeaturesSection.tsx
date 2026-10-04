import { motion } from "framer-motion"
import { ArrowRight, Globe, Link as LinkIcon, Lock, Mail, Radar, ShieldAlert } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../ui/Button"
import { AnimateOnView } from "../../ui/motion/animate-on-view"

const featureCards = [
  {
    icon: LinkIcon,
    title: "URL Sandbox Analysis",
    description: "Real-time deep scanning of web destinations, detecting malicious payloads and deceptive routing.",
    metric: "99.9% Detection Rate",
  },
  {
    icon: Mail,
    title: "Email Forensic Engine",
    description: "Comprehensive header extraction and content analysis to identify spear-phishing attempts.",
    metric: "Sub-50ms Latency",
  },
  {
    icon: ShieldAlert,
    title: "SMS Threat Gateway",
    description: "Mobile-focused pattern matching to neutralize smishing vectors before they compromise devices.",
    metric: "Global Carrier Sync",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-card/20 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <AnimateOnView className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              <Radar className="h-3 w-3" />
              Phishing defense stack
            </div>
            <h2 className="h2 text-foreground">One platform for every threat vector.</h2>
          </AnimateOnView>
          <AnimateOnView delay={0.1}>
            <Link to="/signup">
              <Button size="lg" className="gap-2 uppercase tracking-[0.2em] text-[11px] transition-all duration-300 hover:-translate-y-0.5">
                Explore platform
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </AnimateOnView>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Feature cards grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="overflow-hidden rounded-[28px] border border-border/80 bg-[linear-gradient(135deg,_rgba(17,24,39,0.92),_rgba(9,12,22,0.94))] p-6 sm:p-8"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Core protection</div>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">Multi-channel threat detection</h3>
              </div>
              <div className="rounded-full border border-primary/25 bg-primary/10 p-2 text-primary">
                <ShieldAlert className="h-5 w-5" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {featureCards.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="rounded-2xl border border-border/80 bg-card/35 p-4"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    <div className="mt-4 border-t border-border/80 pt-3 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                      {feature.metric}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Side cards */}
          <div className="grid gap-4">
            <AnimateOnView delay={0.2} asChild>
              <motion.div whileHover={{ y: -6 }} className="rounded-[28px] border border-border/80 bg-card/50 p-6 shadow-[0_20px_50px_-35px_rgba(59,130,246,0.7)]">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-success/20 bg-success/10 text-success">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Safe-by-default workflow</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Apply layered inspections before suspicious content reaches production systems or end users.</p>
              </motion.div>
            </AnimateOnView>

            <AnimateOnView delay={0.25} asChild>
              <motion.div whileHover={{ y: -6 }} className="rounded-[28px] border border-border/80 bg-card/50 p-6 shadow-[0_20px_50px_-35px_rgba(59,130,246,0.7)]">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Global exposure monitoring</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Track malicious campaign patterns across web, messaging, and user-facing entry points in near real time.</p>
              </motion.div>
            </AnimateOnView>
          </div>
        </div>
      </div>
    </section>
  )
}
