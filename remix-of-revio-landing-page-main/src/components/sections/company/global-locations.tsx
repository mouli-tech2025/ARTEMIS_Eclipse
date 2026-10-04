import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

const GlobalLocations = () => {
    const locations = [
        {
            title: "Headquarters",
            location: "San Francisco, USA",
            description: "Revio's global headquarters and innovation hub, driving product development and strategic growth."
        },
        {
            title: "Europe",
            location: "London, United Kingdom",
            description: "Serving as our European headquarters, focusing on banking partnerships with EU/UK regulations."
        },
        {
            title: "Asia-Pacific",
            location: "Singapore",
            description: "Supporting fast-growing businesses across Southeast Asia and the Asia-Pacific region."
        },
        {
            title: "Middle East",
            location: "Dubai, UAE",
            description: "Our fintech operations center for clients across the Middle East and North Africa."
        }
    ];

    return (
        <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
            <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
                <StaggerContainer className="text-center max-w-3xl mx-auto">
                    <AnimateOnView blur>
                        <Badge>
                            Our Locations
                        </Badge>
                    </AnimateOnView>

                    <AnimateOnView blur delay={0.1}>
                        <h2 className="h2 text-foreground mb-6">
                            Connecting businesses across the globe
                        </h2>
                    </AnimateOnView>

                    <AnimateOnView delay={0.2}>
                        <p className="max-w-[560px] mx-auto">
                            Revio operates globally with offices strategically located in major financial and tech hubs. Our distributed team allows us to better serve clients around the world.
                        </p>
                    </AnimateOnView>
                </StaggerContainer>

                {/* Location Cards Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 max-w-[822px] w-full mx-auto">
                    {locations.map((location, index) => (
                        <AnimateOnView key={index} delay={0.1 + index * 0.1} className="h-full">
                            <Card className="h-full rounded-3xl">
                                <CardHeader className="mb-6">
                                    <h3 className="h5 text-foreground mb-2">
                                        {location.title}
                                    </h3>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-lg font-medium mb-3">
                                        {location.location}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {location.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimateOnView>
                    ))}
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default GlobalLocations;

