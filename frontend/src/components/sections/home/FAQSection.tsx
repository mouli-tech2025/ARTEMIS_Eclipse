import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useState } from "react"
import { AnimateOnView } from "../../ui/motion/animate-on-view"

const faqs = [
  {
    question: "What does Artemis analyze?",
    answer: "Artemis inspects URLs, email content, image context, and SMS traffic to surface evolving phishing and scam patterns before they reach users.",
  },
  {
    question: "How does authentication work?",
    answer: "The app uses Firebase authentication. Sign up with your email to get started — your data is protected and your existing sessions carry over seamlessly.",
  },
  {
    question: "How does the detection workflow work?",
    answer: "Each scanner sends the relevant artifact to the existing ML or API backend. The platform combines classification confidence, feature extraction, and risk scoring to surface a clear verdict.",
  },
  {
    question: "Is Artemis suitable for enterprise security teams?",
    answer: "Yes. Artemis is built to scale — from individual analysts to full SOC teams — with real-time dashboards, multi-channel scanning, and API-ready integrations.",
  },
]

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState(-1)

  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <AnimateOnView className="mx-auto max-w-3xl text-center">
          <h2 className="h2 text-foreground">Frequently asked questions</h2>
          <p className="mt-4 text-sm text-muted-foreground">Everything you need to know about Artemis.</p>
        </AnimateOnView>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="overflow-hidden rounded-[22px] border border-border/80 bg-card/40 shadow-[0_20px_50px_-38px_rgba(59,130,246,0.7)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-primary/5"
                >
                  <h3 className="text-base font-semibold text-foreground">{item.question}</h3>
                  <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }}>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <div className="border-t border-border/80 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
