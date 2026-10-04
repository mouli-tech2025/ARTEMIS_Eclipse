import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, SquareCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingPlansProps {
  isAnnual: boolean;
  setIsAnnual: (value: boolean) => void;
}

const plans = [
  {
    name: "Starter plan",
    price: {
      monthly: "$19/monthly",
      annually: "$15/monthly",
    },
    description: "Perfect for small businesses and startups getting started with global payments.",
    features: [
      "Standard payment processing",
      "Accept major credit/debit cards",
      "Basic analytics dashboard",
      "Email support",
      "Secure checkout integration",
    ],
    buttonVariant: "white",
    buttonLink: "/pricing/starter",
  },
  {
    name: "Pro plan",
    price: {
      monthly: "$59/monthly",
      annually: "$47/monthly",
    },
    description: "For growing businesses that need advanced features and lower transaction fees.",
    features: [
      "Everything in Starter",
      "Multi-currency & cross-border payments",
      "Advanced analytics & reporting",
      "Subscription & recurring billing",
      "API & integrations support",
    ],
    buttonVariant: "default",
    highlighted: true,
    buttonLink: "/pricing/pro",
  },
  {
    name: "Enterprise plan",
    price: {
      monthly: "$89/monthly",
      annually: "$71/monthly",
    },
    description: "Tailored for large-scale businesses requiring full flexibility, security, and compliance.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "SLA & priority support",
      "Custom transaction pricing",
      "Advanced fraud protection tools",
      "Global payout solutions",
      "Onboarding & compliance assistance",
    ],
    buttonVariant: "white",
    buttonLink: "/pricing/enterprise",
  },
];

const PricingPlans = ({ isAnnual, setIsAnnual }: PricingPlansProps) => {



  return (
    <section className="relative mt-[-383px] z-20 md:pb-20 xl:pb-32 pb-12">
      <Container>
        {/* Pricing Toggle */}
        <AnimateOnView once className="flex items-center justify-center gap-4 mb-8" delay={0.3}>
          <div className="flex items-center gap-2.5">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-white" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=unchecked]:bg-secondary-foreground data-[state=checked]:bg-primary"
            />
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-white" : "text-muted-foreground"}`}>
                Annually
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium text-white transition-colors ${isAnnual ? "bg-primary" : "bg-secondary-foreground"
                }`}>
                Save 20%
              </span>
            </div>
          </div>
        </AnimateOnView>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <AnimateOnView
              key={plan.name}
              once
              y={40}
              delay={index * 0.1}
            >
              <Card className={`h-full flex flex-col transition-all bg-white p-0 ${plan.highlighted ? "border-primary border-2 shadow-lg" : "md:border-0 border border-border"}`}>
                <CardHeader className="space-y-4 px-6 pt-6 pb-[30px]">
                  <CardTitle className="h4">{plan.name}</CardTitle>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-1">
                      <span className="h4 text-foreground">
                        {(isAnnual ? plan.price.annually : plan.price.monthly).split('/')[0]}
                      </span>
                      <span className="text-sm text-foreground">
                        /{(isAnnual ? plan.price.annually : plan.price.monthly).split('/')[1]}
                      </span>
                    </div>
                    <CardDescription className="">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="bg-card p-6 flex-1 flex flex-col justify-between md:rounded-sm rounded">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Features</h3>
                    <ul className="space-y-[14px] flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2.5">
                          <SquareCheck className="w-5 h-5 mt-1 text-primary shrink-0" />
                          <span className="md:text-lg text-base text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant={plan.buttonVariant as "default" | "white"}
                    className="w-full"
                    asChild
                  >
                    <Link to={plan.buttonLink}>
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnView>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PricingPlans;

