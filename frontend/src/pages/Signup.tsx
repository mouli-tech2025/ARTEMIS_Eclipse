import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import {
  Shield,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react"

export function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    setIsLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/app")
    } catch (err: any) {
      setError(err.message || "Failed to create an account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(96,165,250,0.12),transparent_30%)]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="hidden rounded-[28px] border border-border/80 bg-[linear-gradient(135deg,_rgba(17,24,39,0.94),_rgba(15,23,42,0.72))] p-8 shadow-[0_30px_80px_-45px_rgba(59,130,246,0.75)] backdrop-blur-sm lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 text-foreground transition-opacity hover:opacity-90">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-semibold tracking-tight">Artemis</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Threat Defense Suite</div>
              </div>
            </Link>

            <div className="mt-10 max-w-md">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                <Sparkles className="h-3 w-3" />
                New operator onboarding
              </div>
              <h1 className="h2 text-foreground">Create secure access to your threat console.</h1>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Register a protected account to begin real-time phishing detection, URL intelligence, and multilingual threat analysis.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/80 bg-card/35 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <Activity className="h-3 w-3 text-primary" />
                Signal quality
              </div>
              <div className="mt-3 text-3xl font-semibold text-foreground">98.7%</div>
            </div>
            <div className="rounded-2xl border border-border/80 bg-card/35 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-success" />
                Zero-trust ready
              </div>
              <div className="mt-3 text-3xl font-semibold text-foreground">AES-256</div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[30px] border border-border/80 bg-card/55 p-5 shadow-[0_35px_100px_-50px_rgba(59,130,246,0.8)] backdrop-blur-xl sm:p-7 lg:p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center gap-3 text-foreground transition-opacity hover:opacity-90 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold">Artemis</span>
            </Link>
            <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-success">
              <CheckCircle2 className="h-3 w-3" />
              Access enabled
            </div>
          </div>

          <div className="mb-7 space-y-2 text-left">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Request access</div>
            <h2 className="h3 text-foreground">Create account</h2>
            <p className="text-sm text-muted-foreground">Set up your operator profile and begin active threat monitoring.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Operator ID [Email]</label>
                <Input
                  type="email"
                  placeholder="name@artemis.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">New passkey</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4" />}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Confirm passkey</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4" />}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 uppercase tracking-[0.2em] text-[11px]" isLoading={isLoading}>
              Generate clearance
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 border-t border-border pt-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Already authorized?{" "}
            <Link to="/login" className="text-primary transition-colors hover:text-primary/80">
              Authenticate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
