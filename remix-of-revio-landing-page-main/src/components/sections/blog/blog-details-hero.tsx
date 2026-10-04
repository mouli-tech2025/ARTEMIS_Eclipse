import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import BlogBreadcrumbs from "@/components/sections/blog/blog-breadcrumbs";
import { BlogPost } from "@/lib/services/blog-service";

interface BlogDetailsHeroProps {
  post?: BlogPost | null;
}

const BlogDetailsHero = ({ post }: BlogDetailsHeroProps) => {
  if (!post) {
    return null;
  }

  return (
    <section className="relative bg-black text-white banner-top-padding md:pb-24 pb-12">
      <Container className="flex-1 flex flex-col justify-center">
        <BlogBreadcrumbs
          className="mb-8 max-w-[1024px]"
          items={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: post.title, to: `/blog/${post.slug}` },
          ]}
        />
        <StaggerContainer className="max-w-[1024px]">
          <AnimateOnView once blur>
            <div className="text-muted-foreground mb-[14px]">
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </AnimateOnView>
          <AnimateOnView once blur delay={0.1}>
            <h1 className="h2 md:mb-10 mb-6">{post.title}</h1>
          </AnimateOnView>
          <AnimateOnView once blur delay={0.2}>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-white/20 bg-muted">
                <AvatarImage src={post.author_image || undefined} alt={post.author} />
                <AvatarFallback className="bg-muted text-white text-lg">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-lg font-medium text-white">{post.author}</p>
                <p className="text-muted-foreground">{post.category}</p>
              </div>
            </div>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default BlogDetailsHero;
