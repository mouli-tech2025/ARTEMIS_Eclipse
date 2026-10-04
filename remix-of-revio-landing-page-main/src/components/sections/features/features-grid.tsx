import Container from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";

const chartData = [
  {
    icon: "/images/icons/shield-green.svg",
    title: "Banking & Payout Solutions",
    description: "Streamline global payouts with ease whether you're paying merchants, partners, or employees.",
    image: "/images/features/chart-1.webp"
  },
  {
    icon: "/images/icons/timeline.svg",
    title: "Real-Time Payment Processing",
    description: "Process transactions instantly with Revio's real-time payment engine, built for reliability, and scale.",
    image: "/images/features/chart-2.webp"
  },
  {
    icon: "/images/icons/growth.svg",
    title: "Transaction Analytics & Reporting",
    description: "Get powerful insights into transaction data, customer behavior.",
    image: "/images/features/chart-3.webp"
  }
]

const FeaturesGrid = () => {
  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">

        <AnimateOnView once blur className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2">
            All-in-one payment tools to grow your business faster.
          </h2>
        </AnimateOnView>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {
            chartData.map((item, index) => (
              <AnimateOnView once y={40} delay={0.2}>
                <Card className="h-full border-border border overflow-hidden shadow-sm p-0">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-10 h-10 object-cover mb-4"
                        loading="lazy" />
                      <h3 className="h5 mb-[14px]">
                        {item.title}
                      </h3>
                      <p className="">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[379/352] max-w-[379px] w-full h-full object-cover" />
                    </div>

                  </CardContent>
                </Card>
              </AnimateOnView>
            ))
          }
        </div>
      </Container>
    </section>
  );
};

export default FeaturesGrid;

