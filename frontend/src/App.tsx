import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useLayoutEffect } from "react"
import { ThemeProvider } from "./components/ThemeProvider"
import { LandingLayout } from "./layouts/LandingLayout"
import { DashboardLayout } from "./layouts/DashboardLayout"
import { Landing } from "./pages/Landing"
import { Dashboard } from "./pages/Dashboard"
import { UrlScanner } from "./pages/UrlScanner"
import { EmailAnalyzer } from "./pages/EmailAnalyzer"
import { ImageScanner } from "./pages/ImageScanner"
import { MessageScanner } from "./pages/MessageScanner"
import { GlobalChatbot } from "./components/GlobalChatbot"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { HowItWorks } from "./pages/HowItWorks"
import { Settings } from "./pages/Settings"
import { GeolocationDashboard } from "./pages/GeolocationDashboard"

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1))
      if (element) {
        element.scrollIntoView({ behavior: "auto", block: "start" })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="url-scanner" element={<UrlScanner />} />
              <Route path="email-analyzer" element={<EmailAnalyzer />} />
              <Route path="image-scanner" element={<ImageScanner />} />
              <Route path="message-scanner" element={<MessageScanner />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="settings" element={<Settings />} />
              <Route path="geolocation" element={<GeolocationDashboard />} />
            </Route>
          </Route>
        </Routes>
        <GlobalChatbot />
      </Router>
    </ThemeProvider>
    </AuthProvider>
  )
}

export default App
