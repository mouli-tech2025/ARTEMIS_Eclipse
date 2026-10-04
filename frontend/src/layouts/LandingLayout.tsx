import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Outlet, Link, NavLink } from "react-router-dom"
import { Shield, ArrowRight, ChevronRight, Menu, X } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useAuth } from "../contexts/AuthContext"

const navItems = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/app/how-it-works" },
]

const footerLinks = {
  product: [
    { label: "Dashboard", href: "/app" },
    { label: "URL Scanner", href: "/app/url-scanner" },
    { label: "Email Analyzer", href: "/app/email-analyzer" },
    { label: "Image Scanner", href: "/app/image-scanner" },
    { label: "Message Scanner", href: "/app/message-scanner" },
  ],
  company: [
    { label: "How It Works", href: "/app/how-it-works" },
    { label: "Login", href: "/login" },
    { label: "Sign Up", href: "/signup" },
  ],
}

export function LandingLayout() {
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let frameId = 0

    const handleScroll = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 12)
        frameId = 0
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  const allNavItems = [
    ...navItems,
    ...(user ? [{ label: "Dashboard", href: "/app" }] : []),
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ── Navbar ── */}
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={[
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          isScrolled
            ? "border-border/80 bg-background/75 shadow-[0_20px_45px_-30px_rgba(59,130,246,0.45)] backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur-sm",
        ].join(" ")}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary shadow-[0_0_12px_rgba(59,130,246,0.25)]">
                <Shield className="h-4 w-4" />
              </span>
              <span>Artemis</span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-border/80 bg-card/30 p-1 md:flex">
            {allNavItems.map((item) => (
              <motion.div key={item.label} whileHover={{ y: -1 }}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    [
                      "rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.18)]"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    ].join(" ")
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Desktop auth actions */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <motion.div whileHover={{ translateY: -1 }} className="hidden sm:block">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -1 }}>
                  <Link to="/signup">
                    <Button size="sm" className="gap-2 uppercase tracking-[0.18em] text-[10px]">
                      Get Started
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </motion.div>
              </>
            ) : (
              <motion.div whileHover={{ y: -1 }}>
                <Link to="/app">
                  <Button size="sm" className="gap-2 uppercase tracking-[0.18em] text-[10px]">
                    Dashboard
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Mobile hamburger */}
            <motion.button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/80 bg-card/20 text-foreground transition-colors hover:bg-muted md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden border-t border-border/80 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="px-4 pb-4 pt-3">
                <nav className="flex flex-col gap-1">
                  {allNavItems.map((item) => (
                    <motion.div key={item.label} whileHover={{ x: 2 }}>
                      <NavLink
                        to={item.href}
                        end={item.href === "/"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          [
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors block",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                          ].join(" ")
                        }
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}

                  {!user ? (
                    <>
                      <motion.div whileHover={{ x: 2 }}>
                        <NavLink
                          to="/login"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            [
                              "rounded-md px-3 py-2 text-sm font-medium transition-colors block",
                              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                            ].join(" ")
                          }
                        >
                          Login
                        </NavLink>
                      </motion.div>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
                        <Button size="sm" className="w-full justify-center gap-2 uppercase tracking-[0.18em] text-[10px]">
                          Get Started
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/app" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
                      <Button size="sm" className="w-full justify-center gap-2 uppercase tracking-[0.18em] text-[10px]">
                        Dashboard
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Page content ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="relative border-t border-border bg-background/95 py-14 backdrop-blur-xl overflow-hidden"
      >
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.07),transparent_50%)]" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
            {/* Brand column */}
            <div>
              <Link to="/" className="mb-5 flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
                  <Shield className="h-3.5 w-3.5" />
                </span>
                Artemis
              </Link>
              <p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
                Enterprise-grade phishing detection for URLs, email, images, and SMS — all in one platform.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="GitHub"
                >
                  <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="Twitter / X"
                >
                  <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-card/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Product</h3>
              <ul className="space-y-2.5">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">Company</h3>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-8 text-sm text-muted-foreground md:flex-row">
            <div className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              <p>© {new Date().getFullYear()} Artemis. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
