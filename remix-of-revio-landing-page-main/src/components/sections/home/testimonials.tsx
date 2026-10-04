import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import TestimonialCard from "@/components/ui/testimonial-card";
import VideoTestimonialCard from "@/components/ui/video-testimonial-card";

const Testimonials = () => {
  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" id="testimonials">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        {/* Section Header */}
        <StaggerContainer
          className="max-w-[683px]"
        >
          <AnimateOnView
            once
            blur
            className="flex items-center gap-2 md:mb-4 mb-1.5">
            <Badge>
              Testimonials
            </Badge>
          </AnimateOnView>
          <AnimateOnView
            once
            blur
            delay={0.1}
          >
            <h2 className="h3">
              Designed for businesses that value seamless and secure payments.
            </h2>
          </AnimateOnView>
        </StaggerContainer>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-12 gap-4">
          <TestimonialCard
            className="col-span-12 sm:col-span-6 lg:col-span-5 sm:order-1 lg:order-1"
            companyLogo="/images/homepage/logo-5.svg"
            text="Revio transformed how we handle payments—simple, fast, and reliable!"
            avatar="/images/homepage/avatar-1.png"
            author="Sophia Martinez"
            designation="Co-Founder & CEO"
          />
          <VideoTestimonialCard
            className="col-span-12 sm:col-span-6 lg:col-span-3 sm:order-2 lg:order-2"
            thumbnail="/images/homepage/testimonial-1.webp"
            logo="/images/homepage/logo-2.svg"
            videoUrl="https://youtu.be/xDwR1_vrIg8"
          />
          <TestimonialCard
            className="col-span-12 sm:col-span-6 lg:col-span-4 sm:order-4 lg:order-3"
            companyLogo="/images/homepage/logo-3.svg"
            text="Revio transformed how we handle payments—simple, fast, and reliable!"
            avatar="/images/homepage/avatar-1.png"
            author="Sophia Martinez"
            designation="Co-Founder & CEO"
          />
          <VideoTestimonialCard
            className="col-span-12 sm:col-span-6 lg:col-span-3 sm:order-3 lg:order-4"
            thumbnail="/images/homepage/testimonial-2.webp"
            logo="/images/homepage/logo-4.svg"
            videoUrl="https://youtu.be/xDwR1_vrIg8"
          />
          <TestimonialCard
            className="col-span-12 sm:col-span-6 lg:col-span-4 sm:order-5 lg:order-5"
            companyLogo="/images/homepage/logo-5.svg"
            text="Revio transformed how we handle payments—simple, fast, and reliable!"
            avatar="/images/homepage/avatar-1.png"
            author="Sophia Martinez"
            designation="Co-Founder & CEO"
          />
          <TestimonialCard
            className="col-span-12 sm:col-span-6 lg:col-span-5 sm:order-6 lg:order-6"
            companyLogo="/images/homepage/logo-1.svg"
            text="Revio transformed how we handle payments—simple, fast, and reliable!"
            avatar="/images/homepage/avatar-1.png"
            author="Sophia Martinez"
            designation="Co-Founder & CEO"
          />
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;

