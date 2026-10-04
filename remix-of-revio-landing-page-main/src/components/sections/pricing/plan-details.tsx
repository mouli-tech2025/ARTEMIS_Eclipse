import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, SquareCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PlanDetailsProps {
  planName: string;
  price: {
    monthly: string;
    annually: string;
  };
  description: string;
  features: string[];
}

const PlanDetails = ({ planName, price, description, features }: PlanDetailsProps) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container className="flex flex-col md:flex-row justify-between gap-12">
        {/* Pricing Card */}
        <div className="max-w-[402px] w-full md:sticky static top-24 self-start">
          <AnimateOnView once y={40} className="space-y-4">
            <div className="flex items-center justify-center gap-2.5">
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=unchecked]:bg-secondary-foreground data-[state=checked]:bg-primary"
              />
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                  Annually
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${isAnnual ? "bg-primary text-white" : "bg-secondary-foreground text-white"
                  }`}>
                  Save 20%
                </span>
              </div>
            </div>
            <Card className="p-0">
              <CardHeader className="space-y-4 px-6 pt-6 pb-[30px]">
                <CardTitle className="h4">{planName}</CardTitle>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="h4 text-foreground">
                      {(isAnnual ? price.annually : price.monthly).split('/')[0]}
                    </span>
                    <span className="text-sm text-foreground">
                      /{(isAnnual ? price.annually : price.monthly).split('/')[1]}
                    </span>
                  </div>
                  <CardDescription className="">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="white"
                  className="w-full"
                  asChild
                >
                  <Link to="/contact">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </AnimateOnView>
        </div>

        {/* Plan Details */}
        <div className="max-w-[612px] w-full space-y-8">
          <AnimateOnView once blur>
            <div>
              <h2 className="h4 mb-4">About the {planName.toLowerCase()}</h2>
              <p className="text-lg text-foreground leading-relaxed">
                The {planName} is designed for fast-growing businesses that need advanced payment solutions.
                It combines powerful features like multi-currency support, recurring billing, and real-time
                analytics to help you scale your operations efficiently.
              </p>
            </div>
          </AnimateOnView>

          {/* Features */}
          <AnimateOnView once blur delay={0.1}>
            <div>
              <h2 className="h4 mb-4">Features</h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <SquareCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-lg text-foreground leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnView>

          {/* Why choose the plan */}
          <AnimateOnView once blur delay={0.2}>
            <div>
              <h2 className="h4 mb-4">Why choose the plan?</h2>
              <p className="text-lg text-foreground leading-relaxed">
                The {planName} offers scalability to handle higher transaction volumes, global payment
                capabilities for international expansion, recurring billing for subscription businesses,
                reduced transaction fees for cost savings, and real-time analytics for data-driven decisions.
              </p>
            </div>
          </AnimateOnView>

          {/* Benefits of the plan */}
          <AnimateOnView once blur delay={0.3}>
            <div>
              <h2 className="h4 mb-4">Benefits of the plan</h2>
              <p className="text-lg text-foreground leading-relaxed">
                The {planName} is tailored for businesses that have moved beyond the startup stage and
                need more robust payment infrastructure. It provides the flexibility to expand globally,
                manage complex billing scenarios, and operate more efficiently with advanced tools and
                dedicated support.
              </p>
            </div>
          </AnimateOnView>
        </div>
      </Container>
    </section>
  );
};

export default PlanDetails;

