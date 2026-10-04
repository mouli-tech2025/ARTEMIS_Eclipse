import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { ArrowRight, SquareCheck } from "lucide-react";
import { Link } from "react-router-dom";

const allPlansFeatures = [
  "Accept all major credit & debit cards",
  "Subscription & recurring billing",
  "Basic fraud protection",
  "Advanced analytics & reporting",
  "Secure hosted checkout pages",
  "Easy API & 3rd-party integrations",
  "Transaction history & basic reporting",
  "24/7 live chat support",
  "Email support",
  "Lower transaction fees for high volume",
  "Quick setup and onboarding",
  "Custom transaction pricing for scale",
  "Multi-currency & cross-border payments",
  "Global banking & payout solutions",
];

const customPlanFeatures = [
  "Tailored pricing based on transaction",
  "Mix & match features from all plans",
  "Flexible integration support",
];

const AllPlansWithCustom = () => {

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        <div className="flex flex-col items-center">
          <AnimateOnView once blur>
            <h2 className="h5">All plans</h2>
          </AnimateOnView>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: Feature List */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              {allPlansFeatures.map((feature, index) => (
                <AnimateOnView
                  key={index}
                  once
                  delay={index * 0.03}
                  className="flex items-center gap-2.5 py-5 border-b border-border/40 last:border-0 md:last:border-b"
                >
                  <SquareCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-lg">
                    {feature}
                  </span>
                </AnimateOnView>
              ))}
            </div>
          </div>

          {/* Right Column: Custom Plan Card */}
          <div className="lg:col-span-4">
            <AnimateOnView once y={20} className="h-full">
              <Card className="h-full flex flex-col justify-between gap-2">
                <div>
                  <CardHeader className="space-y-4 pb-[30px]">
                    <p className="font-medium">
                      Custom plan
                    </p>
                    <h3 className="h4">
                      Let's Build Together
                    </h3>
                    <p className="">
                      If your business model doesn't fit into Starter, Pro, or
                      Enterprise, Revio offers fully customized.
                    </p>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="border-t border-gray-200 pt-4 space-y-4">
                      <p className="text-lg font-medium">
                        What's included
                      </p>
                      <ul className="space-y-3">
                        {customPlanFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <SquareCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                            <span className="text-lg">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>
                <CardFooter className="p-0">
                  <Button
                    variant="white"
                    asChild
                    className="w-full"
                  >
                    <Link to="/contact">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnView>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AllPlansWithCustom;