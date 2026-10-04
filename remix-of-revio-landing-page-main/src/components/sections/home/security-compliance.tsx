import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SecurityCompliance = () => {
  const features = [
    {
      title: "Fully Licensed & Compliant",
      description: "Revio operates under strict financial regulations, ensuring your business is always backed by secure practices.",
      highlighted: false,
    },
    {
      title: "100% Digital Experience",
      description: "Revio is built as a modern online payment platform—designed to handle all your business transactions seamlessly, anywhere, anytime.",
      highlighted: true,
    },
    {
      title: "Independent & Reliable",
      description: "Revio owns its core infrastructure, giving you direct access to payment processing without relying on third-party providers.",
      highlighted: false,
    },
  ];

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" id="security-compliance">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        {/* Section Title */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between md:gap-8 gap-4">
          <div className="flex-1 max-w-[683px]">
            <AnimateOnView
              once
              blur
              className="flex items-center gap-2 md:mb-4 mb-1.5"
            >
              <Badge>
                Security
              </Badge>
            </AnimateOnView>

            <AnimateOnView
              once
              blur
              delay={0.1}
              className="h2"
            >
              Security & Compliance
            </AnimateOnView>
          </div>

          <AnimateOnView
            once
            delay={0.3}
          >
            <Button asChild>
              <Link to="/contact">
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </AnimateOnView>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-[120px]">
          {features.map((feature, index) => (
            <AnimateOnView
              key={index}
              once
              delay={index * 0.1}
            >

              <Card className="h-full p-[30px] hover:scale-[0.9] hover:bg-revio-light-pink transition-all">
                <CardContent className="flex flex-col justify-between gap-y-[100px] h-full">
                  <h3 className="h5 max-w-[235px]">
                    {feature.title}
                  </h3>
                  <p className="text-card-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </AnimateOnView>
          ))}
        </div>

        {/* Bottom Banner */}
        <AnimateOnView
          once
          delay={0.3}
          className="p-[27px] bg-revio-light-green flex flex-col md:flex-row items-center justify-center gap-3"
        >
          <p className="text-foreground text-lg text-center md:text-left max-w-[400px] md:max-w-full">
            ⚡️ The complete solution to accept money, make payments, and manage finances effortlessly.
          </p>
          <Button className="bg-foreground text-background hover:bg-foreground/90" asChild>
            <Link to="/contact">
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default SecurityCompliance;

