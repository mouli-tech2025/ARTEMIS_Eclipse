import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { Badge } from "../../ui/badge";

const ContactHero = () => {
    return (
        <section className="relative bg-black overflow-hidden banner-top-padding pb-[80px] md:pb-[100px] lg:pb-[160px] xl:pb-[180px]">
            <Container className="relative z-10">
                {/* Trust badges */}
                <StaggerContainer className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4 xl:gap-6 mb-4 md:mb-8">
                    <AnimateOnView blur>
                        <Badge variant="color">One seamless payment at a time.</Badge>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.1}>
                        <Badge variant="color">
                            <span>Use over <span className="text-white">12K+</span> businesses worldwide.</span>
                        </Badge>
                    </AnimateOnView>
                </StaggerContainer>

                {/* Main headline */}
                <AnimateOnView blur className="text-center max-w-2xl mx-auto lg:mb-10 md:mb-8 mb-4" delay={0.2}>
                    <h1 className="h1 text-white">
                        Contact revio for payment solution
                    </h1>
                </AnimateOnView>
            </Container>
        </section>
    );
};

export default ContactHero;

