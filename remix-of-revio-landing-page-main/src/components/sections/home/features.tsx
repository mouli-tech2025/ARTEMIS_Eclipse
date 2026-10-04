import Container from "@/components/container";
import FeatureCard from "@/components/ui/feature-card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../ui/card";

type FeatureItem = {
  id: string;
  type: "feature";
  icon: string;
  title: string;
  description: string;
};

type LottieItem = {
  id: string;
  type: "lottie";
};

const items: (FeatureItem | LottieItem)[] = [
  {
    id: "fast-reliable",
    type: "feature",
    icon: "/images/icons/star.svg",
    title: "Fast & Reliable",
    description: "Real-time processing with near-zero downtime."
  },
  {
    id: "flex-integrations",
    type: "feature",
    icon: "/images/icons/arrow.svg",
    title: "Flexible Integrations",
    description: "Works with your favorite platforms or custom APIs."
  },
  {
    id: "coin-animation",
    type: "lottie",
  },
  {
    id: "transparent-pricing",
    type: "feature",
    icon: "/images/icons/tag.svg",
    title: "Transparent Pricing",
    description: "Only pay per transaction—no hidden fees."
  },
  {
    id: "global-reach",
    type: "feature",
    icon: "/images/icons/globe.svg",
    title: "Global Reach",
    description: "Accept multiple & local payment methods."
  },
];

const Features = ({ heroRef }: { heroRef?: React.RefObject<HTMLElement> | null }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [isDesktop, setIsDesktop] = useState(false);

  // Check for desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  // Lottie Scroll Animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });

  useEffect(() => {
    const calculateOffset = () => {
      if (!heroRef?.current || !lottieContainerRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const containerRect = lottieContainerRef.current.getBoundingClientRect();

      const heroCenterX = heroRect.left + heroRect.width / 2;

      const heroCenterY = heroRect.top + heroRect.height / 2 + window.scrollY + 250;

      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2 + window.scrollY;

      const offsetX = heroCenterX - containerCenterX;
      const offsetY = heroCenterY - containerCenterY;

      setOffset({ x: offsetX, y: offsetY });
    };

    const timeoutId = setTimeout(() => {
      calculateOffset();
    }, 100);

    window.addEventListener("resize", calculateOffset);
    window.addEventListener("scroll", calculateOffset);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateOffset);
      window.removeEventListener("scroll", calculateOffset);
    };
  }, [heroRef]);

  const x = useTransform(scrollYProgress, [0, 1], [offset.x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [offset.y, 0]);
  // Scale: start at 1.2, end at 1.0
  const scale = useTransform(scrollYProgress, [0, 1], [3, 1]);

  return (
    <section ref={sectionRef} className="md:pt-20 xl:pt-[100px] pt-12 md:pb-20 pb-12" id="features">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        {/* Section header */}
        <AnimateOnView>
          <h2 className="h4 text-center max-w-[389px] mx-auto mb-4">
            Fast, secure, and flexible <span className="text-muted-foreground">payment solutions</span>
          </h2>
        </AnimateOnView>

        {/* Features grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-4 relative">
          {items.map((item, index) => {
            if (item.type === "lottie") {
              return (
                <div
                  key={item.id}
                  className="w-full lg:col-span-1 sm:col-span-2 col-span-1"
                >
                  <Card className="h-full flex flex-col justify-between gap-4 rounded-lg">
                    <CardContent className="h-full flex items-center justify-center p-0 sm:p-6">
                      <div ref={lottieContainerRef} className="w-32 h-32 sm:w-40 sm:h-40 md:w-full md:h-full relative">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={isDesktop ? { x, y, scale } : {}}>
                          <img
                            src="/images/coin.svg"
                            alt="Coin"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            }

            return (
              <AnimateOnView
                key={item.id}
                once
                y={40}
                delay={index * 0.1}
                className={`relative z-10 
                  ${index < 2 ? 'lg:col-span-1 sm:col-span-2 col-span-1' : 'lg:col-span-1 sm:col-span-3 col-span-1'}
                  `}
              >
                <FeatureCard icon={item.icon} title={item.title} description={item.description} />
              </AnimateOnView>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Features;