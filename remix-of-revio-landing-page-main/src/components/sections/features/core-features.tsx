import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    id: "api-integration",
    title: "Easy API & Integration",
    description: "Connect Revio with your existing apps, e-commerce stores, and platforms using our developer-friendly API and pre-built integrations.",
    image: "/images/features/tab-1.webp",
  },
  {
    id: "multi-currency",
    title: "Multi-Currency & Cross-Border",
    description: "Expand your business globally by accepting payments in over 100 currencies, with built-in real-time conversion. Revio makes international transactions simple, transparent, and seamless—helping you reach more consumers without the complexity of managing cross-border payments.",
    image: "/images/features/tab-2.webp",
  },
  {
    id: "subscription-billing",
    title: "Subscription & Recurring Billing",
    description: "Simplify revenue management with automated billing cycles and flexible subscription options tailored to your business model. Revio helps reduce missed payments with intelligent retry logic.",
    image: "/images/features/tab-3.webp",
  },
  {
    id: "dispute-chargeback",
    title: "Dispute & Chargeback Management",
    description: "Managing disputes doesn't have to be complicated. Revio provides an all-in-one chargeback management system that helps businesses resolve conflicts quickly and transparently.",
    image: "/images/features/tab-4.webp",
  },
];

const CoreFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  const handleFeatureClick = (index: number) => {
    if (isMobile) {
      setActiveFeature(index);
    } else {
      scrollToFeature(index);
    }
  };

  const scrollToFeature = (index: number) => {
    const element = featureRefs.current[index];
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);

      window.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  };

  // Detect which feature is centered on scroll (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = activeFeature;
      let closestDistance = Infinity;

      featureRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - elementCenter);

          if (rect.top < window.innerHeight && rect.bottom > 0 && distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (closestIndex !== activeFeature) {
        setActiveFeature(closestIndex);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [activeFeature, isMobile]);

  return (
    <section ref={sectionRef} className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        {/* Section Title */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between md:gap-8 gap-4">
          <div className="flex-1 max-w-[683px]">
            <AnimateOnView once blur className="md:mb-4 mb-1.5">
              <Badge variant="default">Core Features</Badge>
            </AnimateOnView>

            <AnimateOnView once blur delay={0.2}>
              <h2 className="h2">
                Smarter payments stronger growth tools.
              </h2>
            </AnimateOnView>
          </div>

          <AnimateOnView once delay={0.4}>
            <Button asChild>
              <Link to="/contact">
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </AnimateOnView>
        </div>

        {/* Mobile Navigation - Vertical List (Text only, no bg) */}
        <div className="block md:hidden">
          <nav className="flex flex-col">
            {features.map((feature, index) => {
              const isActive = activeFeature === index;
              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(index)}
                  className={`
                    w-full text-left py-2 transition-colors duration-200
                    ${isActive
                      ? "text-primary font-semibold" // Active: Primary color, bold text, no bg
                      : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <span className="block">{feature.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8 lg:gap-16">
          {/* Left Navigation - Sticky (Desktop Only) */}
          <div className="hidden md:block md:w-[375px] md:flex-shrink-0 relative">
            <div className="absolute top-0 left-0 w-[2px] h-full bg-border"></div>
            <div className="lg:sticky lg:top-24">
              <nav className="space-y-1">
                {features.map((feature, index) => {
                  const isActive = activeFeature === index;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureClick(index)}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg transition-all duration-300 relative
                        ${isActive
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 block">{feature.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Features Content */}
          <div className="flex-1 lg:pl-8 flex flex-col gap-2xl max-w-[717px]">
            {isMobile ? (
              // Mobile: Show only active feature with fade transition
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  className="w-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="h6 mb-3">{features[activeFeature].title}</h3>
                  <p className="mb-6 text-muted-foreground">
                    {features[activeFeature].description}
                  </p>
                  <div className="rounded-2xl w-full overflow-hidden bg-muted aspect-[717/400] md:aspect-auto">
                    <img
                      src={features[activeFeature].image}
                      alt={features[activeFeature].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              // Desktop: Show all features stacked
              features.map((feature, index) => (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="pb-10 border-b border-border last:border-0"
                  data-feature-index={index}
                >
                  <div className="w-full">
                    <AnimateOnView once blur className="mb-4">
                      <h3 className="h6 mb-4">{feature.title}</h3>
                    </AnimateOnView>

                    <AnimateOnView once delay={0.2}>
                      <p className="mb-8">
                        {feature.description}
                      </p>
                    </AnimateOnView>

                    <AnimateOnView once delay={0.3}>
                      <div className="rounded-2xl w-full max-w-[717px] overflow-hidden">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </AnimateOnView>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CoreFeatures;