import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const coreValues = [
    {
        icon: "/images/icons/wallet.svg",
        title: "Simplifying payments",
        description: "Removing friction so businesses can focus on growth, not processing hurdles.",
        iconColor: "text-primary"
    },
    {
        icon: "/images/icons/shield.svg",
        title: "Ensuring security",
        description: "Protecting every transaction with enterprise-grade encryption prevention.",
        iconColor: "text-neutral-700"
    },
    {
        icon: "/images/icons/click.svg",
        title: "Driving accessibility",
        description: "Empowering businesses of all sizes to reach customers worldwide.",
        iconColor: "text-green-600"
    },
    {
        icon: "/images/icons/check.svg",
        title: "Building trust",
        description: "Operating with transparency and fairness in every service we provide.",
        iconColor: "text-primary"
    }
];

const Mission = () => {

    return (
        <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
            <Container>
                <div className="flex lg:flex-row flex-col gap-4">
                    {/* Left Column - Mission Card */}
                    <AnimateOnView delay={0.2} className="h-full w-full lg:max-w-[507px]">
                        <Card className="h-full rounded-3xl p-6 flex flex-col">
                            <CardContent className="p-0 flex flex-col flex-1 md:gap-10 sm:gap-8 gap-6">
                                <div>
                                    <h2 className="h4 text-foreground md:mb-4 mb-2">
                                        Our mission
                                    </h2>
                                    <p className="card-foreground md:mb-8 mb-6 flex-1">
                                        At Revio, our mission is simple yet powerful: to make global payments seamless, secure, and accessible for every business. We believe that the ability to transact should never be limited by borders, currencies, or complexity.
                                    </p>

                                    <Button asChild className="bg-primary text-white hover:bg-primary/90 w-fit">
                                        <Link to="/contact">
                                            Get Started for Free
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </Button>

                                </div>
                                <img
                                    src="/images/company/mission.webp"
                                    alt="Our mission"
                                    className="max-w-[274px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </CardContent>
                        </Card>
                    </AnimateOnView>

                    {/* Right Column - Core Values Grid (2x2) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-6 gap-y-4 gap-x-4">
                        {coreValues.map((value, index) => {
                            return (
                                <AnimateOnView key={index} delay={0.3 + index * 0.1} className="h-full">
                                    <Card className="h-full rounded-3xl flex flex-col">
                                        <CardContent className="p-0 flex flex-col justify-between h-full gap-4">
                                            <img
                                                src={value.icon}
                                                alt={value.title}
                                                className="w-10 h-10 object-cover"
                                                loading="lazy" />
                                            <div>
                                                <h3 className="h5 text-foreground md:mb-4 mb-2">
                                                    {value.title}
                                                </h3>
                                                <p className="card-foreground">
                                                    {value.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </AnimateOnView>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Mission;

