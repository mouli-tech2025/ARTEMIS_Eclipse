import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../../container";
import { Badge } from "../../ui/badge";

const Hero = ({ heroRef }: {
  heroRef?: React.RefObject<HTMLElement> | null
}) => {
  const isMobile = useIsMobile();
  
  return (
    <section ref={heroRef} className="relative min-h-screen bg-black overflow-hidden banner-top-padding md:pb-20 lg:pb-24 pb-[60px]">
      <Container className="relative z-10">
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4 xl:gap-6 mb-4 md:mb-8">
          <AnimateOnView>
            <Badge variant="color">SaaS website design template</Badge>
          </AnimateOnView>
          <AnimateOnView delay={0.1}>
            <Badge variant="color">
              <span>Use over <span className="text-white">12K+</span> businesses worldwide.</span>
            </Badge>
          </AnimateOnView>
        </StaggerContainer>

        <AnimateOnView blur className="text-center max-w-3xl mx-auto lg:mb-10 md:mb-8 mb-4" delay={0.2}>
          <h1 className="h1 text-white">
            Revio Landing Page
          </h1>
        </AnimateOnView>

        <StaggerContainer className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <AnimateOnView delay={0.4}>
            <Button asChild>
              <Link to="/contact">
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </AnimateOnView>
          <AnimateOnView delay={0.5}>
            <Button variant="outline" asChild>
              <Link to="/demo/dashboard/blog">
                Try demo
              </Link>
            </Button>
          </AnimateOnView>
          <AnimateOnView delay={0.6}>
            <Button variant="link" asChild>
              <Link to="/features">
                Explore Features
              </Link>
            </Button>
          </AnimateOnView>
        </StaggerContainer>

        {/* 3D Visual Composition */}
        <div className="relative flex justify-between xl:gap-10 gap-4 flex-wrap lg:flex-nowrap mt-[50px] xl:mt-24 max-w-[904px] mx-auto">
          {/* Credit Card - Left */}
          <div className="relative z-10">
            <AnimateOnView
              delay={0.6}
              className={`relative sm:max-w-[395px] w-full aspect-[395/257] ${isMobile ? '' : 'animate-float'}`}
              style={{ perspective: "1000px" }}
            >
              <img 
                src="/images/homepage/credit-card.webp" 
                alt="Credit Card" 
                className="w-full h-full object-cover" 
                width="395"
                height="257"
                fetchPriority="high"
                loading="eager"
              />
            </AnimateOnView>
          </div>

          {/* Dashboard Widget - Right */}
          <div className="relative z-10">
            <AnimateOnView
              delay={0.7}
              className={`relative sm:max-w-[307px] w-full aspect-[307/137] ${isMobile ? '' : 'animate-float-slow'}`}
            >
              <img 
                src="/images/homepage/hero-stat.webp" 
                alt="Stat Card" 
                className="w-full h-full object-cover" 
                width="307"
                height="137"
                fetchPriority="high"
                loading="eager"
              />
            </AnimateOnView>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
