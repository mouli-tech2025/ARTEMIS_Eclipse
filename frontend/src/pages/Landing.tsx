import { HeroSection } from "../components/sections/home/HeroSection"
import { FeaturesSection } from "../components/sections/home/FeaturesSection"
import { HowItWorksSection } from "../components/sections/home/HowItWorksSection"
import { CTASection } from "../components/sections/home/CTASection"
import { FAQSection } from "../components/sections/home/FAQSection"

export function Landing() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-background text-foreground">
      <main className="relative z-10 flex flex-1 flex-col">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
        <FAQSection />
      </main>
    </div>
  )
}
