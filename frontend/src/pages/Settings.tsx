import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { 
  AlertCircle, 
  CheckCircle2, 
  KeyRound, 
  Mail, 
  Shield, 
  UserCog, 
  Sliders, 
  Code, 
  Copy, 
  Check, 
  Terminal, 
  Save 
} from "lucide-react"
import { sendPasswordResetEmail, updateEmail, updatePassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { useAuth } from "../contexts/AuthContext"
import { cn } from "../utils/cn"

export function Settings() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'engine' | 'api'>('profile')
  const [email, setEmail] = useState(user?.email ?? "")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)

  // Threat Engine Preferences state
  const [engineSettings, setEngineSettings] = useState({
    heuristicSensitivity: "high",
    autoDetonateUrls: true,
    quishingScan: true,
    becConfidenceThreshold: "85%"
  })

  // Simulated API Key
  const [apiKey] = useState("phishx_live_sk_89f3a921d09e742ba811")

  const hasEmailChanged = useMemo(() => email.trim() !== (user?.email ?? ""), [email, user])

  const handleSave = async () => {
    if (!user) {
      setStatus({ type: "error", message: "You must be signed in to update account settings." })
      return
    }

    if (newPassword && newPassword !== confirmPassword) {
      setStatus({ type: "error", message: "New password and confirmation do not match." })
      return
    }

    if (!hasEmailChanged && !newPassword) {
      setStatus({ type: "success", message: "No updates were necessary." })
      return
    }

    setIsSaving(true)
    setStatus(null)

    try {
      if (hasEmailChanged) {
        await updateEmail(user, email.trim())
      }

      if (newPassword) {
        await updatePassword(user, newPassword)
      }

      setStatus({
        type: "success",
        message:
          hasEmailChanged && newPassword
            ? "Email and password updated successfully."
            : hasEmailChanged
              ? "Email updated successfully."
              : "Password updated successfully.",
      })

      if (hasEmailChanged) {
        setEmail(user.email ?? "")
      }
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error?.message || "Unable to update your account settings right now.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const resetPassword = async () => {
    if (!user?.email) {
      setStatus({ type: "error", message: "No account email is available to send a reset link." })
      return
    }

    try {
      await sendPasswordResetEmail(auth, user.email)
      setStatus({ type: "success", message: "A password reset email has been sent to your account." })
    } catch (error: any) {
      setStatus({ type: "error", message: error?.message || "Failed to send a password reset email." })
    }
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <Terminal className="w-4 h-4" />
            <span>OPERATOR CONTROLS</span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground uppercase">
            System & Security Settings
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-mono mt-1">
            Configure authentication credentials, heuristic sensitivity parameters, and SecOps API integrations.
          </p>
        </div>
        <div className="self-start sm:self-auto rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-success flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          SESSION: AUTHENTICATED
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/80 gap-3">
        {[
          { id: 'profile', label: 'Operator Credentials', icon: UserCog },
          { id: 'engine', label: 'Heuristic Engine Policies', icon: Sliders },
          { id: 'api', label: 'SecOps API Keys', icon: Code },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 py-3 px-4 font-mono text-xs font-semibold border-b-2 transition-all",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Profile & Credentials */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <UserCog className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">CREDENTIAL ROTATION</div>
                <h2 className="text-base font-bold text-foreground">Operator Account</h2>
              </div>
            </div>

            <div className="space-y-4 font-mono">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Operator Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4 text-primary" />}
                  className="rounded-xl bg-background/80"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">New Security Passphrase</label>
                <Input
                  type="password"
                  placeholder="Enter new passphrase..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  icon={<KeyRound className="h-4 w-4 text-primary" />}
                  className="rounded-xl bg-background/80"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Confirm Passphrase</label>
                <Input
                  type="password"
                  placeholder="Repeat new passphrase..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={<KeyRound className="h-4 w-4 text-primary" />}
                  className="rounded-xl bg-background/80"
                />
              </div>

              {status && (
                <div
                  className={cn(
                    "flex items-start gap-2.5 rounded-2xl border p-3.5 text-xs font-mono",
                    status.type === "success"
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-destructive/30 bg-destructive/10 text-destructive"
                  )}
                >
                  {status.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  type="button" 
                  onClick={handleSave} 
                  disabled={isSaving} 
                  className="flex-1 rounded-xl h-11 uppercase font-mono tracking-wider text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetPassword} 
                  className="rounded-xl h-11 uppercase font-mono tracking-wider text-xs"
                >
                  Send Reset Link
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">ZERO-TRUST LAYER</div>
                <h2 className="text-base font-bold text-foreground">Security Posture</h2>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-2xl border border-border/70 bg-background/60 space-y-1">
                <span className="text-[10px] uppercase text-muted-foreground">Registered Identity</span>
                <div className="text-sm font-bold text-foreground truncate">{user?.email || "Unknown"}</div>
              </div>
              <div className="p-4 rounded-2xl border border-border/70 bg-background/60 space-y-1">
                <span className="text-[10px] uppercase text-muted-foreground">Authentication Authority</span>
                <div className="text-sm font-bold text-success flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Google Firebase (OAuth 2.0 / JWT)
                </div>
              </div>
              <div className="p-4 rounded-2xl border border-border/70 bg-background/60 space-y-1">
                <span className="text-[10px] uppercase text-muted-foreground">Defensive Coverage</span>
                <div className="text-sm font-bold text-foreground">4 Active ML Pipeline Endpoints</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Threat Engine Policies */}
      {activeTab === 'engine' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h2 className="text-base font-bold text-foreground font-mono uppercase">Detection Policy Matrix</h2>
              <p className="text-xs text-muted-foreground font-mono">Control threshold tolerances for neural classification models</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/60">
              <div>
                <div className="font-bold text-foreground text-sm">Shannon Entropy Sensitivity</div>
                <div className="text-muted-foreground text-xs mt-0.5">Flags randomized high-entropy subdomains and obfuscated payloads</div>
              </div>
              <select 
                value={engineSettings.heuristicSensitivity}
                onChange={(e) => setEngineSettings({...engineSettings, heuristicSensitivity: e.target.value})}
                className="bg-card border border-border rounded-xl px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:border-primary"
              >
                <option value="high">High (Strict Zero-Trust)</option>
                <option value="balanced">Balanced (Recommended)</option>
                <option value="conservative">Conservative</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/60">
              <div>
                <div className="font-bold text-foreground text-sm">Automatic Secondary URL Detonation</div>
                <div className="text-muted-foreground text-xs mt-0.5">Route links extracted from emails through dedicated URL classifier</div>
              </div>
              <input 
                type="checkbox" 
                checked={engineSettings.autoDetonateUrls}
                onChange={(e) => setEngineSettings({...engineSettings, autoDetonateUrls: e.target.checked})}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/60">
              <div>
                <div className="font-bold text-foreground text-sm">Computer Vision Quishing Radar</div>
                <div className="text-muted-foreground text-xs mt-0.5">Extract QR codes embedded inside uploaded screenshots and graphics</div>
              </div>
              <input 
                type="checkbox" 
                checked={engineSettings.quishingScan}
                onChange={(e) => setEngineSettings({...engineSettings, quishingScan: e.target.checked})}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab 3: SecOps API Keys */}
      {activeTab === 'api' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-xl space-y-6"
        >
          <div className="pb-4 border-b border-border/60">
            <h2 className="text-base font-bold text-foreground font-mono uppercase">SecOps REST API Integration</h2>
            <p className="text-xs text-muted-foreground font-mono">Use your secret bearer token to automate scans via CI/CD or SIEM webhooks</p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-muted-foreground">Live Secret API Key</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={apiKey} 
                  className="flex-1 bg-background/90 border border-border rounded-xl px-4 py-2.5 text-foreground font-mono text-xs focus:outline-none"
                />
                <button
                  onClick={copyApiKey}
                  className="px-4 py-2.5 rounded-xl border border-border bg-card/80 hover:bg-card text-foreground font-mono text-xs flex items-center gap-1.5"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-black/50 space-y-2">
              <div className="text-muted-foreground text-[10px] uppercase">Example cURL Request:</div>
              <pre className="text-primary text-xs overflow-x-auto p-2 bg-black/40 rounded-lg">
                {`curl -X POST http://localhost:8000/api/scan/url \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://suspicious-target.com"}'`}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
