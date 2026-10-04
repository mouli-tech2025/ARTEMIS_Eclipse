import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Mail, 
  Image as ImageIcon, 
  MessageSquare, 
  Shield, 
  Bell, 
  Settings, 
  FileCode, 
  LogOut, 
  Menu, 
  X, 
  Activity, 
  Terminal,
  Cpu,
  MapPin
} from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../utils/cn"
import { useAuth } from "../contexts/AuthContext"

const navigation = [
  { name: "Command Center", href: "/app", icon: LayoutDashboard, badge: "Live" },
  { name: "URL Scanner", href: "/app/url-scanner", icon: LinkIcon, badge: "Sandbox" },
  { name: "Email Forensic", href: "/app/email-analyzer", icon: Mail, badge: "NLP" },
  { name: "Image & QR Scan", href: "/app/image-scanner", icon: ImageIcon, badge: "Vision" },
  { name: "SMS / Smishing", href: "/app/message-scanner", icon: MessageSquare, badge: "Mobile" },
  { name: "ML Architecture", href: "/app/how-it-works", icon: FileCode, badge: "Docs" },
  { name: "Geolocation", href: "/app/geolocation", icon: MapPin, badge: "GEO" },
]

export function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOutUser } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const handleSignOut = async () => {
    navigate("/", { replace: true })
    try {
      await signOutUser()
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  const handleSettings = () => {
    setMobileMenuOpen(false)
    navigate("/app/settings")
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 flex-col border-r border-border/80 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08),transparent_40%),rgba(11,15,25,0.98)] md:flex backdrop-blur-2xl">
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-border/70 px-6">
          <Link to="/" className="flex items-center gap-3 text-lg font-bold tracking-tight text-foreground group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Shield className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-background animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider">ARTEMIS</span>
              </div>
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.25em]">DEFENSE SUITE</span>
            </div>
          </Link>
        </div>

        {/* Engine Status Pill */}
        <div className="mx-4 mt-4 p-3 rounded-xl border border-primary/20 bg-primary/5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-foreground font-semibold">HEURISTICS ACTIVE</span>
            </div>
            <span className="text-[10px] text-primary bg-primary/15 px-2 py-0.5 rounded-full border border-primary/30">v2.4</span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground font-mono">Real-time Zero-Day Telemetry</p>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1.5 px-3 py-5 overflow-y-auto">
          <div className="mb-2.5 px-3 text-[10px] font-mono uppercase tracking-[0.28em] text-muted-foreground/80 flex items-center justify-between">
            <span>DETECTION MATRIX</span>
            <Terminal className="w-3 h-3 text-muted-foreground/60" />
          </div>

          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== "/app" && location.pathname.startsWith(item.href))

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium font-mono transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.18)] font-semibold"
                    : "text-muted-foreground hover:bg-card/70 hover:text-foreground hover:border hover:border-border/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-colors duration-200",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded-md uppercase font-mono tracking-wider transition-colors",
                      isActive
                        ? "bg-primary/25 text-primary font-bold border border-primary/40"
                        : "bg-muted text-muted-foreground/80 group-hover:bg-muted/80"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Card & Sign Out */}
        <div className="border-t border-border/80 p-4 bg-black/20">
          <div className="mb-3 flex items-center gap-3 rounded-xl border border-border/80 bg-card/40 p-2.5 backdrop-blur-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/15 font-mono text-xs font-bold uppercase text-primary shadow-[0_0_12px_rgba(59,130,246,0.2)]">
              {user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold text-foreground">{user?.email || "Security Analyst"}</div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-success">
                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block"></span>
                SOC Level 1
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSettings}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border/70 bg-card/30 px-3 py-2 text-xs font-mono text-muted-foreground transition-all hover:bg-card hover:text-foreground hover:border-primary/40"
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-mono text-destructive transition-all hover:bg-destructive/20 hover:border-destructive/60"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Mobile Brand & Hamburger */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-foreground"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-bold tracking-tight text-foreground font-mono">ARTEMIS</span>
              </div>
            </div>

            {/* Breadcrumb / Title Indicator for Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-card/50 text-[11px] font-mono text-muted-foreground">
                <Cpu className="w-3.5 h-3.5 text-primary" />
                <span>ARTEMIS DEFENSE ENGINE</span>
                <span className="text-muted-foreground/40">•</span>
                <span className="text-primary font-semibold">ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                <Activity className="w-3 h-3 text-success animate-pulse" />
                <span>Latency: 18ms</span>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/50 text-muted-foreground transition-all hover:text-foreground hover:border-primary/40 hover:bg-card"
                  aria-label="Alerts"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
                </button>

                {/* Notifications dropdown */}
                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl z-50 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                        <span className="font-bold uppercase tracking-wider text-foreground">Threat Advisories</span>
                        <span className="text-[10px] text-primary">2 NEW</span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20 text-foreground">
                          <p className="font-semibold text-destructive text-[11px]">Zero-Day Heuristics Synced</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Brand-spoof signatures updated for 1,240 banking domains.</p>
                        </div>
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-foreground">
                          <p className="font-semibold text-primary text-[11px]">System Status: Optimal</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">All 4 analysis engines operating with 0 dropped packets.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={handleSettings}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-card/50 text-muted-foreground transition-all hover:text-foreground hover:border-primary/40 hover:bg-card"
                aria-label="Open settings"
              >
                <Settings className="h-4 w-4" />
              </button>

              <div className="hidden sm:block h-6 w-[1px] bg-border mx-1" />

              <div className="hidden sm:flex items-center gap-2 pl-1">
                <div className="h-8 w-8 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center text-xs font-mono font-bold text-primary">
                  {user?.email?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-semibold leading-none truncate max-w-[120px]">{user?.email?.split("@")[0] || "Operator"}</div>
                  <div className="text-[9px] font-mono text-muted-foreground mt-1">SEC_LEVEL_1</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-border bg-card/95 backdrop-blur-2xl px-4 py-4 space-y-2 z-30"
            >
              <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                NAVIGATION MATRIX
              </div>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-mono",
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30 font-semibold"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}

              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                <button
                  onClick={handleSettings}
                  className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground"
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-xs font-mono text-destructive hover:underline"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
