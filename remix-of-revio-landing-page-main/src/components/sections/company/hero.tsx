import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../ui/badge";

const CompanyHero = () => {
    return (
        <section className="relative bg-black overflow-hidden banner-top-padding pb-[400px] lg:pb-[453px]">
            <Container className="relative z-10">
                <StaggerContainer className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4 xl:gap-6 mb-4 md:mb-8">
                    <AnimateOnView blur>
                        <Badge variant="color" className="gap-2">
                            One seamless payment at a time.
                        </Badge>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.1}>
                        <Badge variant="color" className="gap-2">
                            <span>Use over <span className="text-white">12K+</span> businesses worldwide.</span>
                        </Badge>
                    </AnimateOnView>
                </StaggerContainer>

                <AnimateOnView blur className="text-center max-w-3xl mx-auto lg:mb-10 md:mb-8 mb-4" delay={0.2}>
                    <h1 className="h1 text-white">
                        Shaping the future of global payments
                    </h1>
                </AnimateOnView>

                <StaggerContainer className="flex flex-col sm:flex-row items-center justify-center gap-4 md:mb-16 mb-8">
                    <AnimateOnView delay={0.4}>
                        <Button asChild className="bg-primary text-white hover:bg-primary/90">
                            <Link to="/contact">
                                Get Started for Free
                                <ArrowRight className="w-5 h-5 ml-1" />
                            </Link>
                        </Button>
                    </AnimateOnView>
                    <AnimateOnView delay={0.5}>
                        <Button variant="link" asChild>
                            <Link to="/features">
                                Explore Features
                            </Link>
                        </Button>
                    </AnimateOnView>
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default CompanyHero;
