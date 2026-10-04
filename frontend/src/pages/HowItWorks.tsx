import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Link as LinkIcon, 
  Mail, 
  MessageSquare, 
  Database, 
  Layers, 
  Bug, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Terminal, 
  ChevronRight, 
  Crosshair, 
  Cpu 
} from "lucide-react"
import { cn } from "../utils/cn"

export function HowItWorks() {
  const [activeModel, setActiveModel] = useState<'url' | 'email' | 'sms'>('email')
  const [activeLayer, setActiveLayer] = useState<number>(0)

  const models = {
    url: {
      icon: LinkIcon,
      title: "URL Classification",
      description: "Random Forest ensemble analyzing 25+ lexical, domain, and structural features.",
      dataset: "651,200 labeled URLs (benign, defacement, phishing, malware)",
      classes: [
        { name: "Benign", desc: "Safe, legitimate websites." },
        { name: "Phishing", desc: "Decoy pages designed to steal credentials." },
        { name: "Malware", desc: "Links hosting malicious binaries." },
        { name: "Defacement", desc: "Hacked websites displaying unauthorized content." }
      ]
    },
    email: {
      icon: Mail,
      title: "Email Classification",
      description: "Multi-Modal NLP model processing structural metadata, header alignment, and TF-IDF token vectors.",
      dataset: "23,332 perfectly balanced 5-class emails compiled from 7 recognized corpora",
      classes: [
        { name: "Ham", desc: "Legitimate personal or business emails." },
        { name: "Promotional", desc: "Unsolicited but safe marketing newsletters." },
        { name: "Phishing", desc: "Deceptive emails to steal credentials." },
        { name: "Scam", desc: "High-risk extortion or advance-fee frauds." },
        { name: "Spam", desc: "Generic bulk junk (non-threatening)." }
      ]
    },
    sms: {
      icon: MessageSquare,
      title: "SMS Classification",
      description: "Short-text NLP pipeline optimized for rapid mobile threats, urgency detection, and shortlink traps.",
      dataset: "10,191 balanced modern text messages from Mendeley Data",
      classes: [
        { name: "Ham", desc: "Safe, legitimate conversational texts." },
        { name: "Spam", desc: "Commercial advertising texts." },
        { name: "Smishing", desc: "Mobile phishing (bank alerts, urgent parcel scams)." }
      ]
    }
  }

  const layers = [
    {
      title: "Layer 1: Stacked URL Scan",
      desc: "Extracts links from incoming emails. If the dedicated URL model flags any link as malicious with >35% confidence, it initiates an immediate phishing override.",
      icon: Crosshair
    },
    {
      title: "Layer 2: Short-Text Safeguard",
      desc: "Short emails (<500 chars) are analyzed for social engineering urgency triggers. Two or more matched triggers automatically bypass standard NLP to prevent underfitting.",
      icon: ShieldAlert
    },
    {
      title: "Layer 3: Legitimate Overlay",
      desc: "Mitigates Enron-skew bias. If predicted phishing but lacks any Call-to-Action (no URLs, email addresses, or phone numbers), it safely overrides back to 'Ham'.",
      icon: CheckCircle2
    }
  ]

  const bugs = [
    {
      id: "BUG-01",
      title: "Typosquatting Brand Mismatch",
      issue: "Simple substring matching flagged official subdomains (google.com) as malicious.",
      fix: "Implemented tldextract to verify if the registered domain precisely matches the brand keyword."
    },
    {
      id: "BUG-02",
      title: "Dataset Shortcut Leakage",
      issue: "Model learned that 'http://' meant malicious because 96% of malware URLs in corpus had it vs 8% of benign.",
      fix: "Engineered a pre-processing normalization step to strip protocols before lexical extraction."
    },
    {
      id: "OPT-01",
      title: "Training Pipeline Speed Bottleneck",
      issue: "High-capacity TF-IDF + 30 features took over 10 minutes to train locally.",
      fix: "Utilized full multi-core CPU parallelism (n_jobs=-1), dropping execution to <25 seconds."
    }
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
          <Terminal className="w-4 h-4" />
          <span>NEURAL PIPELINE & REASONING</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
          Artemis Machine Learning Architecture
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm font-mono max-w-3xl leading-relaxed">
          Comprehensive telemetry breakdown of training corpora, feature engineering heuristics, and stacked ensemble overrides.
        </p>
      </div>

      {/* Model Selector Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/80 pb-3">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold uppercase tracking-widest text-primary font-mono">Core Threat Models</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(models) as Array<keyof typeof models>).map((key) => {
            const model = models[key]
            const Icon = model.icon
            const isActive = activeModel === key
            return (
              <button
                key={key}
                onClick={() => setActiveModel(key)}
                className={cn(
                  "p-4 rounded-2xl border font-mono text-left transition-all duration-300 relative overflow-hidden",
                  isActive 
                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.25)]" 
                    : "bg-card/60 border-border/80 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card"
                )}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-xl border",
                    isActive ? "border-primary/40 bg-primary/20 text-primary" : "border-border bg-background text-muted-foreground"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-xs block text-foreground">{model.title}</span>
                    <span className="text-[10px] text-muted-foreground">{key.toUpperCase()} VECTOR</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border border-primary/30 bg-card/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1">SPECIFICATION MATRIX</div>
              <h3 className="font-mono uppercase text-lg font-bold text-foreground">{models[activeModel].title}</h3>
              <p className="text-sm text-muted-foreground font-mono mt-1">{models[activeModel].description}</p>
            </div>

            <div className="bg-background/80 p-4 rounded-2xl border border-border">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono block mb-1">
                Training Dataset Corpus
              </span>
              <p className="font-mono text-sm text-primary font-semibold">{models[activeModel].dataset}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {models[activeModel].classes.map((cls, idx) => (
                <div key={idx} className="flex gap-3 items-start border border-border/70 p-3.5 rounded-2xl bg-card/40">
                  <div className={cn(
                    "w-2.5 h-2.5 mt-1.5 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]",
                    cls.name === 'Benign' || cls.name === 'Ham' || cls.name === 'Promotional' ? "text-success bg-success" :
                    cls.name === 'Phishing' || cls.name === 'Smishing' || cls.name === 'Scam' || cls.name === 'Malware' ? "text-destructive bg-destructive" :
                    "text-warning bg-warning"
                  )} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-foreground">{cls.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{cls.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Stacked Architecture Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/80 pb-3">
          <Layers className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold uppercase tracking-widest text-primary font-mono">Stacked Security Pipeline</h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">
          The email engine does not rely on isolated ML classifications. It routes inputs through a 3-tier heuristic pipeline to eliminate false positives while preserving maximum zero-day sensitivity.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-3">
            {layers.map((layer, idx) => {
              const isActive = activeLayer === idx
              return (
                <button
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl border font-mono text-left transition-all",
                    isActive 
                      ? "bg-secondary/40 text-foreground border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
                      : "bg-card/50 border-border/80 text-muted-foreground hover:bg-card hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-background border border-border text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span className="uppercase text-xs tracking-wider font-semibold">{layer.title}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 transition-transform", isActive ? "opacity-100 text-primary" : "opacity-0 -translate-x-2")} />
                </button>
              )
            })}
          </div>

          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                      {(() => {
                        const Icon = layers[activeLayer].icon
                        return <Icon className="w-5 h-5" />
                      })()}
                    </div>
                    <h3 className="font-mono uppercase tracking-wider text-base font-bold text-foreground">
                      {layers[activeLayer].title}
                    </h3>
                  </div>

                  <p className="text-foreground leading-relaxed font-mono text-xs border-l-2 border-primary pl-4 py-1">
                    {layers[activeLayer].desc}
                  </p>
                </div>
                
                {/* Visualizer pseudo-terminal */}
                <div className="mt-6 rounded-2xl border border-border/80 bg-black/80 p-4 font-mono text-xs overflow-hidden">
                  <div className="flex items-center gap-2 mb-3 opacity-60">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-warning"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
                    <span className="text-[10px] text-muted-foreground ml-2">SIMULATED EXECUTION TRACE</span>
                  </div>
                  
                  {activeLayer === 0 && (
                    <div className="space-y-1 text-muted-foreground">
                      <p>&gt; EXTRACTING payload URI...</p>
                      <p>&gt; Found: <span className="text-warning">http://update-billing-secure.com</span></p>
                      <p>&gt; Routing to URL Classifier sandbox...</p>
                      <p>&gt; RESULT: <span className="text-destructive font-bold">PHISHING</span> (Conf: 89%)</p>
                      <p className="text-primary font-bold">&gt; TIER 1 SYSTEM OVERRIDE INITIATED.</p>
                    </div>
                  )}
                  
                  {activeLayer === 1 && (
                    <div className="space-y-1 text-muted-foreground">
                      <p>&gt; CharCount: 124 <span className="text-success">(SHORT_TEXT_FLAG)</span></p>
                      <p>&gt; Scanning Social Engineering lexicon...</p>
                      <p>&gt; Matches: <span className="text-destructive">['urgent', 'compromised']</span></p>
                      <p>&gt; Threat Threshold Met (&gt;=2)</p>
                      <p className="text-primary font-bold">&gt; TIER 2 SAFEGUARD OVERRIDE INITIATED.</p>
                    </div>
                  )}

                  {activeLayer === 2 && (
                    <div className="space-y-1 text-muted-foreground">
                      <p>&gt; Base Prediction: <span className="text-warning">SCAM</span></p>
                      <p>&gt; Scanning Call-to-Actions (URLs, Emails, Phones)...</p>
                      <p>&gt; CTA Found: <span className="text-destructive">FALSE</span></p>
                      <p>&gt; Threat Signature: <span className="text-destructive">FALSE</span></p>
                      <p>&gt; Evaluating Enron-bias protocol...</p>
                      <p className="text-success font-bold">&gt; TIER 3 SAFEGUARD: DOWNGRADED TO HAM.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Debug & Optimization Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/80 pb-3">
          <Cpu className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold uppercase tracking-widest text-primary font-mono">Engine Optimizations & Patches</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bugs.map((bug, i) => (
            <div key={i} className="flex flex-col rounded-3xl border border-border/80 bg-card/40 p-5 hover:bg-card/70 transition-all shadow-md">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] uppercase font-mono tracking-wider bg-warning/15 text-warning px-2.5 py-1 rounded-lg border border-warning/30 font-bold">
                  {bug.id}
                </span>
                {bug.id.startsWith("OPT") ? <Zap className="w-4 h-4 text-warning" /> : <Bug className="w-4 h-4 text-warning" />}
              </div>
              <h3 className="text-sm uppercase tracking-wide font-mono font-bold text-foreground leading-snug">{bug.title}</h3>
              
              <div className="mt-3 space-y-1 text-xs font-mono">
                <span className="text-[10px] uppercase text-muted-foreground tracking-wider block">The Issue</span>
                <p className="text-foreground leading-relaxed">{bug.issue}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 text-xs font-mono">
                <span className="text-[10px] uppercase text-primary tracking-wider block">The Fix</span>
                <p className="text-muted-foreground leading-relaxed mt-0.5">{bug.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
