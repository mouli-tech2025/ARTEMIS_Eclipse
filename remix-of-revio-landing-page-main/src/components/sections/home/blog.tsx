import Container from "@/components/container";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/use-blog";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const { data: posts = [], isLoading: postsLoading } = useBlogPosts();
  
  // Limit to 3 posts for homepage
  const homepagePosts = posts.slice(0, 3);

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" id="blog">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between md:gap-8 gap-4">
          <StaggerContainer
            className="max-w-[567px]"
          >
            <AnimateOnView
              once
              blur
              className="flex items-center gap-2 md:mb-4 mb-1.5">
              <Badge>
                Blog
              </Badge>
            </AnimateOnView>
            <AnimateOnView
              once
              blur
              delay={0.1}
            >
              <h2 className="h2">
                Our articles for startups & peoples
              </h2>
            </AnimateOnView>
          </StaggerContainer>
          <Link to="/blog">
            <Button variant="secondary">
              All Blogs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        {/* Articles Grid */}
        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full aspect-[4/3] rounded-sm" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : homepagePosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepagePosts.map((article, index) => (
              <AnimateOnView
                key={article.id}
                delay={index * 0.1}
              >
                <BlogCard
                  image={article.image}
                  category={article.category}
                  readTime={article.read_time}
                  title={article.title}
                  date={article.date}
                  author={article.author}
                  slug={article.slug}
                />
              </AnimateOnView>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
};

export default Blog;