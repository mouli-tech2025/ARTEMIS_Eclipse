import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

const CEOProfile = () => {
    return (
        <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
            <Container className="flex sm:flex-row flex-col gap-10 md:gap-20 justify-center sm:items-start items-center">
                {/* Left Column - CEO Image */}
                <AnimateOnView delay={0.2}>
                    <div className="w-full aspect-[444/513] max-w-[444px] mx-auto lg:mx-0 rounded-3xl overflow-hidden relative group bg-gradient-to-br from-primary/20 to-primary/5">
                        <img
                            src="/images/company/ceo.webp"
                            alt="James Whitaker - Founder & CEO"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </AnimateOnView>

                {/* Right Column - CEO Information */}
                <StaggerContainer className="max-w-[507px] w-full sm:text-left text-center">
                    <AnimateOnView blur>
                        <Badge className="mb-[14px]">
                            Our CEO
                        </Badge>
                    </AnimateOnView>

                    <AnimateOnView blur delay={0.1}>
                        <h2 className="h5 text-foreground mb-4">
                            James Whitaker - Founder & CEO of Revio
                        </h2>
                    </AnimateOnView>

                    <AnimateOnView delay={0.2}>
                        <div className="space-y-4 md:mb-[30px] mb-6">
                            <p>
                                James Whitaker founded Revio with a vision to make global payments simple, secure, and accessible for businesses of every size. With over 15 years of experience in financial technology and digital banking, he has led multiple startups and worked with leading payment networks before launching Revio.
                            </p>
                            <p>
                                Under his leadership, Revio has grown into a trusted payment gateway, serving thousands of companies worldwide and processing millions of secure transactions every month. James is passionate about financial inclusion, innovation at scale, and building technology that empowers business growth.
                            </p>
                            <p>
                                "At Revio, we believe payments should fuel business growth—not hold it back. My mission is to build a payment ecosystem where every business, anywhere in the world, can succeed without barriers."
                            </p>
                        </div>
                        <div className="max-w-[191px] w-full sm:mx-0 mx-auto">
                            <img
                                src="/images/company/signature.svg"
                                alt="James Whitaker signature"
                                className="w-full h-full object-contain"
                                loading="lazy" />
                        </div>
                    </AnimateOnView>
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default CEOProfile;

