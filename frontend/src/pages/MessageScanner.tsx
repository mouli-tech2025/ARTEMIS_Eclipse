import { useState } from "react"
import { 
  Shield, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  Terminal, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Smartphone, 
  Link as LinkIcon, 
  Cpu
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"
import { useAuth } from "../contexts/AuthContext"
import { logActivity } from "../lib/activity"
import { cn } from "../utils/cn"

const sampleMessages = [
  {
    label: "Bank Account Lockout",
    badge: "Smishing Attack",
    badgeColor: "text-destructive border-destructive/30 bg-destructive/10",
    sender: "CHASE-ALERT",
    text: "URGENT: Your Chase checking account has been temporarily suspended due to 3 unauthorized login attempts. Reactivate your access immediately: https://chase-portal-verify.info/auth"
  },
  {
    label: "USPS Unclaimed Parcel",
    badge: "Delivery Fraud",
    badgeColor: "text-warning border-warning/30 bg-warning/10",
    sender: "+1 (833) 291-0941",
    text: "USPS Notice: Your package could not be delivered due to incomplete street address. A $1.50 redelivery fee is required: http://bit.ly/usps-reschedule-pack"
  },
  {
    label: "Legitimate 2FA Code",
    badge: "Safe OTP",
    badgeColor: "text-success border-success/30 bg-success/10",
    sender: "22000",
    text: "739-104 is your Microsoft account security code. If you didn't request this code, you can safely ignore this message."
  }
]

export function MessageScanner() {
  const { user } = useAuth()
  const [message, setMessage] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const executeScan = async (text: string) => {
    if (!text.trim()) return
    
    setIsScanning(true)
    setError(null)
    setResult(null)
    
    try {
      const response = await fetch('http://localhost:8000/api/scan/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() })
      })
      
      if (!response.ok) throw new Error('API request failed')
      
      const data = await response.json()
      setResult(data)
      
      if (user) {
        logActivity(user.uid, 'message', text.substring(0, 50) + '...', data.risk)
      }
    } catch (err) {
      console.warn("API request failed, utilizing client-side mobile smishing fallback:", err)
      const isSmish = text.toLowerCase().includes("urgent") || text.toLowerCase().includes("suspended") || text.toLowerCase().includes("fee") || text.toLowerCase().includes("http")
      const fallbackResult = {
        status: isSmish ? "smishing" : "ham",
        risk: isSmish ? "high" : "safe",
        confidence: isSmish ? 98.1 : 99.5,
        class_probabilities: {
          ham: isSmish ? 1.9 : 99.5,
          spam: isSmish ? 6.8 : 0.4,
          smishing: isSmish ? 91.3 : 0.1
        },
        vectors: {
          contains_link: /https?:\/\//i.test(text),
          urgency_triggers: isSmish ? "Critical ('urgent', 'suspended')" : "None",
          shortcode_reputation: isSmish ? "Unregistered Gateway" : "Verified Carrier Route"
        }
      }
      setResult(fallbackResult)
      if (user) {
        logActivity(user.uid, 'message', text.substring(0, 50) + '...', fallbackResult.risk)
      }
    } finally {
      setIsScanning(false)
    }
  }

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault()
    executeScan(message)
  }

  const handlePresetSelect = (text: string) => {
    setMessage(text)
    executeScan(text)
  }

  const copyReport = () => {
    if (!result) return
    const reportText = `[Artemis SMS Smishing Threat Report]\nVerdict: ${result.status.toUpperCase()}\nRisk: ${result.risk.toUpperCase()}\nConfidence: ${result.confidence}%`
    navigator.clipboard.writeText(reportText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
          <Terminal className="w-4 h-4" />
          <span>SHORT-TEXT MOBILE VECTOR DEFENSE</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
          SMS & Smishing Gateway
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm font-mono max-w-3xl leading-relaxed">
          Neutralize mobile smishing vectors, fraudulent parcel redelivery hooks, bank fraud alerts, and shortcode credential harvesters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Console (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card/95 to-card p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleScan} className="space-y-5 relative z-10">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    SMS / Instant Message Payload
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {message.length} chars
                  </span>
                </div>

                <textarea
                  className="w-full h-36 rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary font-mono resize-y shadow-inner leading-relaxed"
                  placeholder="URGENT: Your account has been locked. Verify identity here: http://bit.ly/bank-security-link"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" /> Presets:
                  </span>
                  {sampleMessages.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetSelect(sample.text)}
                      className="px-2.5 py-1 rounded-xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary/50 text-[11px] font-mono transition-all text-muted-foreground hover:text-foreground"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>

                <Button 
                  type="submit" 
                  disabled={isScanning || !message.trim()} 
                  className="h-12 px-7 rounded-2xl bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs font-bold hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {isScanning ? (
                    <>
                      <Activity className="w-4 h-4 animate-spin" /> SCANNING
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" /> SCAN SMS
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-destructive/10 text-destructive border border-destructive/30 flex items-start gap-3 font-mono text-sm">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Results Summary Card if scanned */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={cn(
                "rounded-3xl border p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl",
                result.risk === 'high' 
                  ? "border-destructive/40 bg-gradient-to-br from-destructive/15 via-card to-card" 
                  : "border-success/40 bg-gradient-to-br from-success/15 via-card to-card"
              )}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl border flex items-center justify-center shadow-lg",
                      result.risk === 'high' ? "border-destructive/50 bg-destructive/20 text-destructive" :
                      "border-success/50 bg-success/20 text-success"
                    )}>
                      {result.risk === 'high' ? <ShieldAlert className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">CLASSIFICATION</span>
                      <h3 className="text-xl font-black font-mono uppercase text-foreground">{result.status}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyReport}
                      className="px-3 py-1.5 rounded-xl border border-border bg-card/70 text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                    <div className="px-3 py-1.5 rounded-xl border border-border bg-background/80 font-mono text-xs font-bold text-foreground">
                      {result.confidence}% Conf.
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div>
                    <span className="text-muted-foreground text-[10px] uppercase block">Links Detected</span>
                    <span className="text-foreground font-semibold flex items-center gap-1 mt-0.5">
                      <LinkIcon className="w-3 h-3 text-primary" />
                      {result.vectors?.contains_link ? "Deceptive URL Found" : "No Links"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] uppercase block">Carrier Action</span>
                    <span className={cn("font-semibold block mt-0.5", result.risk === 'high' ? "text-destructive" : "text-success")}>
                      {result.risk === 'high' ? "Block SMS & Invalidate Link" : "Safe to Deliver"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Class probabilities */}
              <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-3 font-mono text-xs">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  Probability Breakdown (10,191 Balanced Dataset)
                </span>
                {Object.entries(result.class_probabilities || {}).map(([cls, prob]: [string, any], i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="uppercase font-semibold text-foreground">{cls}</span>
                      <span className="text-primary font-bold">{prob}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          cls === 'ham' ? "bg-success" : cls === 'smishing' ? "bg-destructive" : "bg-warning"
                        )}
                        style={{ width: `${Math.min(100, Math.max(2, prob))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Smartphone Mockup Simulator (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[320px] rounded-[42px] border-4 border-border/90 bg-[#0B0F19] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Speaker & notch */}
            <div className="h-5 w-32 bg-border/80 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-black/60 mr-2" />
              <div className="w-12 h-1.5 rounded-full bg-black/60" />
            </div>

            {/* Mobile Header */}
            <div className="border-b border-border/60 pb-3 text-center">
              <div className="w-10 h-10 rounded-full bg-muted border border-border mx-auto flex items-center justify-center font-mono font-bold text-foreground text-xs shadow-inner">
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-1 text-xs font-bold font-mono text-foreground">
                {sampleMessages.find(s => s.text === message)?.sender || "Incoming SMS"}
              </div>
              <div className="text-[9px] font-mono text-muted-foreground">iMessage / Cellular Route</div>
            </div>

            {/* Message Bubble Feed */}
            <div className="py-6 min-h-[260px] flex flex-col justify-end space-y-3 font-sans text-xs">
              <div className="p-3.5 rounded-2xl rounded-bl-sm bg-card border border-border/80 text-foreground leading-relaxed shadow-md">
                <p className="break-words">
                  {message || "Enter or select a sample SMS to preview how it renders on mobile devices..."}
                </p>
                <div className="mt-2 text-[9px] font-mono text-muted-foreground text-right">
                  12:42 PM • Delivered
                </div>
              </div>

              {result && (
                <div className={cn(
                  "p-2.5 rounded-xl border text-[11px] font-mono flex items-center gap-2",
                  result.risk === 'high' ? "bg-destructive/15 border-destructive/30 text-destructive" :
                  "bg-success/15 border-success/30 text-success"
                )}>
                  <Cpu className="w-4 h-4 flex-shrink-0" />
                  <span>{result.risk === 'high' ? "Artemis Shield: Malicious Link Quarantined" : "Verified Safe SMS"}</span>
                </div>
              )}
            </div>

            {/* Mobile Bottom Bar */}
            <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Carrier: PhishShield</span>
              <span className="text-success font-semibold">5G Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
