import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

interface LogoItem {
  id: number;
  x: number;
  y: number;
  scrollThreshold: number;
}

interface LogoProps {
  index: number;
  logo: LogoItem;
  scrollYProgress: MotionValue<number>;
}

const Logo = ({ index, logo, scrollYProgress }: LogoProps) => {
  const opacity = useTransform(
    scrollYProgress,
    [logo.scrollThreshold - 0.15, logo.scrollThreshold],
    [0, 1],
    { clamp: true }
  );

  const scale = useTransform(
    scrollYProgress,
    [logo.scrollThreshold - 0.15, logo.scrollThreshold],
    [0.8, 1],
    { clamp: true }
  );

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${logo.x}%`,
        top: `${logo.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity,
        scale,
      }}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[91px] md:h-[91px]">
        <img
          src={`/images/homepage/integration-${index}.svg`}
          alt={`Platform ${logo.id + 1}`}
          className="w-full h-full object-contain"
          width="91"
          height="91"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

const Integrations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const logos = useMemo(() => {
    const logoCount = 5;

    // Use safer positions on mobile to prevent logos from going off-screen
    const positions = isMobile
      ? [
        { x: 20, y: 20 },
        { x: 80, y: 20 },
        { x: 20, y: 70 },
        { x: 50, y: 75 },
        { x: 80, y: 70 },
      ]
      : [
        { x: 15, y: 15 },
        { x: 85, y: 15 },
        { x: 15, y: 75 },
        { x: 50, y: 80 },
        { x: 85, y: 75 },
      ];

    const baseLogos: LogoItem[] = Array.from({ length: logoCount }, (_, i) => ({
      id: i,
      x: positions[i].x,
      y: positions[i].y,
      scrollThreshold: 0,
    }));

    const shuffle = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledLogos = shuffle(baseLogos);

    const thresholds = [0.15, 0.3, 0.45, 0.6, 0.75];
    return shuffledLogos.map((logo, index) => ({
      ...logo,
      scrollThreshold: thresholds[index],
    }));
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative bg-card" id="integrations" style={{ height: '300vh' }}>
      {/* Sticky centered text container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <Container className="relative z-10">
          <AnimateOnView>
            <h2 className="h2 text-center max-w-[644px] mx-auto mb-4">
              Connect with <span className="text-muted-foreground">your Favorite Platforms</span>
            </h2>
          </AnimateOnView>
        </Container>

        {/* Random positioned logos - positioned relative to viewport */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
          {logos.map((logo, i) => (
            <Logo key={logo.id} index={i + 1} logo={logo} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;