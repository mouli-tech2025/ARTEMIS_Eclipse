import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import BlogBreadcrumbs from "@/components/sections/blog/blog-breadcrumbs";

const BlogHero = () => {
  return (
    <section className="relative bg-black overflow-hidden banner-top-padding pb-[200px] lg:pb-[301px]">
      <Container className="relative z-10">
        <BlogBreadcrumbs
          className="mb-8 flex justify-center"
          items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }]}
        />

        {/* Trust badges */}
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4 xl:gap-6 mb-4 md:mb-8">
          <AnimateOnView blur>
            <Badge variant="color" className="gap-2">
              One seamless payment at a time.
            </Badge>
          </AnimateOnView>
          <AnimateOnView blur delay={0.1}>
            <Badge variant="color" className="gap-2">
              <span>Use over <span className="text-white">12K+</span> businesses worldwide.</span>
            </Badge>
          </AnimateOnView>
        </StaggerContainer>

        {/* Main headline */}
        <AnimateOnView blur className="text-center max-w-3xl mx-auto lg:mb-10 md:mb-8 mb-4" delay={0.2}>
          <h1 className="h1 text-white">
            Stay ahead with insights on payments & fintech
          </h1>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default BlogHero;

