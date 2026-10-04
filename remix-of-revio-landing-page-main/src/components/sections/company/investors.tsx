import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Investors = () => {
    const partners = [
        {
            logo: "/images/company/investors/brand-1.svg",
            name: "Laura Mitchell",
            designation: "Venture Partner"
        },
        {
            logo: "/images/company/investors/brand-2.svg",
            name: "David Chen",
            designation: "Managing Partner"
        },
        {
            logo: "/images/company/investors/brand-3.svg",
            name: "Anika Sharma",
            designation: "Founding Partner"
        },
        {
            logo: "/images/company/investors/brand-4.svg",
            name: "Robert Hayes",
            designation: "Investment Director"
        },
        {
            logo: "/images/company/investors/brand-5.svg",
            name: "Sofia Alvarez",
            designation: "Partner"
        },
        {
            logo: "/images/company/investors/brand-6.svg",
            name: "Elena Petrova",
            designation: "Principal"
        },
        {
            logo: "/images/company/investors/brand-7.svg",
            name: "Oliver Grant",
            designation: "Investment Partner"
        },
        {
            logo: "/images/company/investors/brand-8.svg",
            name: "Isabelle Laurent",
            designation: "Managing Director"
        },
        {
            logo: "/images/company/investors/brand-9.svg",
            name: "Kenji Tanaka",
            designation: "Partner"
        },
        {
            logo: "/images/company/investors/brand-10.svg",
            name: "Michael O'Reilly",
            designation: "Founding Partner"
        },
        {
            logo: "/images/company/investors/brand-11.svg",
            name: "Fatima Khan",
            designation: "Investment Director"
        },
        {
            logo: "/images/company/investors/brand-12.svg",
            name: "Mark Jensen",
            designation: "Co-Founder"
        },
    ];

    return (
        <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
            <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between md:gap-8 gap-4">
                    <StaggerContainer className="flex-1 max-w-[683px]">
                        <AnimateOnView
                            once
                            blur
                            className="flex items-center gap-2 md:mb-4 mb-1.5"
                        >
                            <Badge>
                                Investor
                            </Badge>
                        </AnimateOnView>

                        <AnimateOnView
                            once
                            blur
                            delay={0.2}
                            className="h2"
                        >
                            Trusted by leading investors & partners
                        </AnimateOnView>
                    </StaggerContainer>

                    <AnimateOnView
                        once
                        delay={0.4}
                    >
                        <Button asChild>
                            <Link to="/contact">
                                Join Us Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </AnimateOnView>
                </div>

                {/* Partners Grid */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-5">
                    {partners.map((partner, index) => (
                        <AnimateOnView key={index} delay={0.1 + index * 0.05} className="h-full">
                            <Card className="h-full bg-white border border-neutral-100 rounded-[10px] p-4 hover:shadow-lg transition-shadow">
                                <CardContent className="p-0 flex flex-col justify-between h-full gap-20">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-w-[138px] w-full aspect-[138/48] object-cover"
                                        loading="lazy" />

                                    <div>
                                        <h3 className="text-lg font-medium text-foreground mb-1">
                                            {partner.name}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {partner.designation}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimateOnView>
                    ))}
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default Investors;

