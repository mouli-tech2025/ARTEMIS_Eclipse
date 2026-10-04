import { motion } from "framer-motion"
import { CheckCircle2, MessageSquareText, Radar, Zap } from "lucide-react"
import { AnimateOnView } from "../../ui/motion/animate-on-view"

const steps = [
  {
    title: "Context extraction",
    description: "Reads sender structure, links, metadata, and user intent to identify suspicious patterns.",
    icon: Radar,
  },
  {
    title: "ML verdict",
    description: "Applies trained models for URL, email, and SMS classification with confidence scoring.",
    icon: Zap,
  },
  {
    title: "Actionable response",
    description: "Escalates verified threats and gives operators safe, explainable decision paths.",
    icon: MessageSquareText,
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnView className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-success">
            <CheckCircle2 className="h-3 w-3" />
            Layered defense model
          </div>
          <h2 className="h2 text-foreground">Built to intercept malicious intent before it spreads.</h2>
        </AnimateOnView>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="relative h-full rounded-[28px] border border-border/80 bg-card/50 p-6 shadow-[0_30px_70px_-45px_rgba(59,130,246,0.7)]"
              >
                <div className="absolute left-6 right-6 top-0 hidden h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent md:block" />
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">0{index + 1}</div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
