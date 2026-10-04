import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

const PricingHero = () => {
  return (
    <section className="relative bg-black overflow-hidden banner-top-padding md:pb-[479px] pb-[400px]">
      <Container className="relative z-10">
        {/* Trust badges */}
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4 xl:gap-6 mb-4">
          <AnimateOnView once blur>
            <Badge variant="color">One seamless payment at a time.</Badge>
          </AnimateOnView>
          <AnimateOnView once blur delay={0.1}>
            <Badge variant="color">
              <span>Use over <span className="text-white">12K+</span> businesses worldwide.</span>
            </Badge>
          </AnimateOnView>
        </StaggerContainer>

        {/* Main headline */}
        <AnimateOnView once blur className="text-center max-w-4xl mx-auto mb-12" delay={0.2}>
          <h1 className="h1 text-white">
            Simple transparent and scalable pricing plans
          </h1>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default PricingHero;

