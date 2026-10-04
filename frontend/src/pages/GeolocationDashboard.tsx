import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapPin, Globe, Wifi, ShieldCheck, Server, Navigation } from "lucide-react"

// ── Fix Leaflet's broken default icon paths when bundled with Vite ──────────
// (leaflet ships icon paths that point to /dist/images; Vite moves them)
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// ── Single hardcoded mock data object ────────────────────────────────────────
const mockLocation = {
  ip: "103.47.144.29",
  country: "India",
  countryCode: "IN",
  city: "Kolkata",
  region: "West Bengal",
  latitude: 22.5726,
  longitude: 88.3639,
  asn: "AS45609",
  organization: "Bharti Airtel Ltd.",
  isp: "Airtel Broadband",
  confidence: "Medium",
  timezone: "Asia/Kolkata",
  postalCode: "700001",
}

// ── Confidence badge color helper ─────────────────────────────────────────────
function confidenceBadge(level: string) {
  const map: Record<string, string> = {
    High: "bg-success/15 text-success border-success/40",
    Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
    Low: "bg-destructive/15 text-destructive border-destructive/40",
  }
  return map[level] ?? map.Medium
}

// ── Custom pulsing SVG map pin ────────────────────────────────────────────────
const pulsingIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:32px;height:32px;">
      <span style="
        position:absolute;inset:0;border-radius:50%;
        background:rgba(59,130,246,0.4);
        animation:ping 1.4s cubic-bezier(0,0,0.2,1) infinite;
      "></span>
      <div style="
        position:absolute;inset:4px;border-radius:50%;
        background:rgb(59,130,246);
        border:2px solid white;
        box-shadow:0 0 14px rgba(59,130,246,0.8);
      "></div>
    </div>
    <style>
      @keyframes ping{0%{transform:scale(1);opacity:.8}80%,100%{transform:scale(2.2);opacity:0}}
    </style>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
})

// ── Component ─────────────────────────────────────────────────────────────────
export function GeolocationDashboard() {
  // Page title
  useEffect(() => {
    document.title = "Geolocation — Artemis Defense Suite"
    return () => {
      document.title = "Artemis Defense Suite"
    }
  }, [])

  const { latitude, longitude } = mockLocation

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-bold font-mono tracking-tight text-foreground">
              Geolocation Dashboard
            </h1>
          </div>
          <p className="text-xs font-mono text-muted-foreground ml-10.5">
            IP geolocation intelligence · mock data · offline
          </p>
        </div>
        <span className="text-[9px] px-2 py-1 rounded-md uppercase font-mono tracking-wider bg-primary/15 text-primary border border-primary/30">
          GEO ENGINE
        </span>
      </div>

      {/* ── Top stats row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "IP Address", value: mockLocation.ip, icon: Globe },
          { label: "Country", value: `${mockLocation.country} (${mockLocation.countryCode})`, icon: Navigation },
          { label: "Latitude", value: mockLocation.latitude.toFixed(4), icon: MapPin },
          { label: "Longitude", value: mockLocation.longitude.toFixed(4), icon: MapPin },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm p-3.5 flex items-center gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">{label}</p>
              <p className="text-xs font-mono font-semibold text-foreground truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Map + Cards row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Accuracy disclaimer banner above the map card ── */}
        <div className="lg:col-span-2 rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-4 py-2.5 flex items-start gap-2.5">
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-[10px] font-mono text-yellow-400/90 leading-relaxed">
            <span className="font-bold uppercase tracking-wider">Location Accuracy Notice —</span>{" "}
            Location is estimated from IP data only. Accuracy varies by ISP and network type; this represents a regional area, not a confirmed physical address.
          </p>
        </div>

        {/* Map — spans 2 columns on large screens */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border/70 bg-card/60 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              OBSERVED IP LOCATION
            </div>
            <span className="text-[10px] font-mono text-primary">
              {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
            </span>
          </div>

          {/* Leaflet map */}
          <div style={{ height: 380 }}>
            <MapContainer
              center={[latitude, longitude]}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
              attributionControl={false}
            >
              {/* Free OpenStreetMap tile layer — no API key required */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Approximate accuracy radius — 5 km mock value */}
              <Circle
                center={[latitude, longitude]}
                radius={5000}
                pathOptions={{
                  color: "rgba(59,130,246,0.8)",
                  fillColor: "rgba(59,130,246,0.12)",
                  fillOpacity: 1,
                  weight: 1.5,
                  dashArray: "5 5",
                }}
              />

              {/* Pulsing marker */}
              <Marker position={[latitude, longitude]} icon={pulsingIcon}>
                <Popup className="geo-popup">
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      lineHeight: 1.6,
                      minWidth: 180,
                    }}
                  >
                    <strong style={{ fontSize: 12 }}>
                      {mockLocation.city}, {mockLocation.country}
                    </strong>
                    <br />
                    <span style={{ color: "#6b7280" }}>IP: </span>
                    {mockLocation.ip}
                    <br />
                    <span style={{ color: "#6b7280" }}>ASN: </span>
                    {mockLocation.asn}
                    <br />
                    <span style={{ color: "#f59e0b", fontSize: 10, display: "block", marginTop: 6, borderTop: "1px solid #374151", paddingTop: 5 }}>
                      ⚠ Approximate location — based on IP-to-region mapping, not a confirmed physical address.
                    </span>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Right-side cards column */}
        <div className="flex flex-col gap-4">
          {/* ── Estimated Origin Card ── */}
          <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
                Estimated Origin
              </h2>
            </div>

            <dl className="space-y-3">
              {[
                { label: "Country", value: mockLocation.country },
                { label: "Region", value: mockLocation.region },
                { label: "City", value: mockLocation.city },
                { label: "Postal Code", value: mockLocation.postalCode },
                { label: "Timezone", value: mockLocation.timezone },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0">
                    {label}
                  </dt>
                  <dd className="text-[11px] font-mono font-semibold text-foreground text-right">
                    {value}
                  </dd>
                </div>
              ))}

              {/* Location accuracy confidence badge */}
              <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Location Accuracy
                  </dt>
                  <span className="text-[9px] font-mono text-muted-foreground/50">ISP region estimate</span>
                </div>
                <dd>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md border font-mono uppercase tracking-wider font-bold ${confidenceBadge(mockLocation.confidence)}`}
                  >
                    {mockLocation.confidence}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* ── Network Card ── */}
          <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wifi className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
                Network Intel
              </h2>
            </div>

            <dl className="space-y-3">
              {[
                { label: "IP Address", value: mockLocation.ip, icon: Globe },
                { label: "ASN", value: mockLocation.asn, icon: Server },
                { label: "Organization", value: mockLocation.organization, icon: Server },
                { label: "ISP", value: mockLocation.isp, icon: Wifi },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Icon className="h-3 w-3 text-muted-foreground/60" />
                    <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {label}
                    </dt>
                  </div>
                  <dd className="text-[11px] font-mono font-semibold text-foreground text-right break-all">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ── Footer attribution ── */}
      <p className="text-center text-[10px] font-mono text-muted-foreground/50 pb-2">
        ⚠ All data is hardcoded mock data for demonstration purposes only. No real geolocation APIs are used.
      </p>
    </div>
  )
}
