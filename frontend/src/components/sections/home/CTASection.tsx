import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../ui/Button"

export function CTASection() {
  return (
    <section id="api" className="border-y border-border bg-card/20 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -4 }}
          className="mx-auto max-w-5xl rounded-[28px] border border-border/80 bg-[linear-gradient(135deg,_rgba(17,24,39,0.95),_rgba(14,17,29,0.9))] p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_-40px_rgba(59,130,246,0.7)]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                API ready
              </div>
              <h2 className="h3 text-foreground">Protect your workflow without breaking your stack.</h2>
            </div>
            <Link to="/signup">
              <Button size="lg" className="gap-2 uppercase tracking-[0.2em] text-[11px] transition-all duration-300 hover:-translate-y-0.5">
                Start analysis
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
