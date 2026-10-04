import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Vision = () => {

    return (
        <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
            <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
                {/* Section Title */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between md:gap-8 gap-4">
                    <StaggerContainer className="flex-1 max-w-[683px]">
                        <AnimateOnView
                            once
                            blur
                            className="flex items-center gap-2 md:mb-4 mb-1.5"
                        >
                            <Badge>
                                Our Vision
                            </Badge>
                        </AnimateOnView>

                        <AnimateOnView
                            once
                            blur
                            delay={0.2}
                            className="h2"
                        >
                            Redefining the way businesses transact
                        </AnimateOnView>
                    </StaggerContainer>

                    <AnimateOnView
                        once
                        delay={0.4}
                    >
                        <Button asChild>
                            <Link to="/contact">
                                Get Started for Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </AnimateOnView>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <AnimateOnView
                        once
                        blur
                        className="max-w-[465px] w-full md:sticky static top-[60px] self-start"
                    >
                        <img
                            src="/images/company/vision.webp"
                            alt="Our Vision"
                            loading="lazy" />
                    </AnimateOnView>
                    <AnimateOnView className="space-y-8 max-w-[715px] w-full">
                        <div className="space-y-4">
                            <h3 className="h5">
                                Our Vision for a Borderless World
                            </h3>
                            <p>
                                At Revio, we envision a world where payments are borderless, seamless, and secure. Our goal is to remove the barriers that limit businesses and empower them to grow globally without worrying about payment complexities. We believe geography should never limit opportunity. Revio enables businesses to connect with customers worldwide, regardless of currency or location.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="h5">
                                Trust & Transparency
                            </h3>
                            <p>
                                At Revio, we believe that trust is the foundation of every successful transaction. Businesses and customers alike should feel confident that their payments are processed with the highest level of security, reliability, and fairness. That’s why we go beyond simply moving money—we build relationships based on openness and integrity.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="h5">
                                Innovation at Scale
                            </h3>
                            <p>
                                At Revio, we don’t just innovate—we innovate with purpose and scalability in mind. As businesses grow, so do their payment challenges, and our mission is to provide solutions that adapt effortlessly to increasing demands. From handling thousands of daily transactions for small businesses to processing millions for global enterprises, our infrastructure is designed to perform reliably at every level.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="h5">
                                Empowering Growth
                            </h3>
                            <p>
                                At Revio, we believe that payments should be a catalyst for business success—not a barrier. That’s why we design our platform to give businesses the freedom to focus on what truly matters: growth. By removing the complexity of global payments, we enable companies of every size to expand faster, reach more customers, and unlock new opportunities.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="h5">
                                Listen & Learn
                            </h3>
                            <p>
                                Interview merchants, analyze payment pain points, and map use-cases across SMB to enterprise to guide what we build first. Ship an API-first gateway with robust SDKs, webhooks, and sandbox environments so developers can integrate in hours, not weeks.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="h5">
                                Defend with Intelligence
                            </h3>
                            <p>
                                Layer risk scoring, velocity rules, device fingerprinting, and chargeback workflows to cut fraud without adding friction. Provide real-time dashboards, cohort analytics, and A/B experimentation on payment flows to continually raise approval rates.
                            </p>
                        </div>
                    </AnimateOnView>
                </div>
            </Container>
        </section>
    );
};

export default Vision;