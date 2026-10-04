import Container from "@/components/container";
import BlogCard from "@/components/ui/blog-card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedPosts } from "@/hooks/use-blog";

const FeaturedBlog = () => {
  const { data: featuredPosts = [], isLoading } = useFeaturedPosts();

  return (
    <section className="relative md:mt-[-240px] mt-[-140px] z-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          {isLoading ? (
            <>
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full aspect-[4/3] rounded-sm" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </>
          ) : (
            featuredPosts.map((post, index) => (
              <AnimateOnView key={post.id} once delay={0.2 + index * 0.1}>
                <BlogCard
                  image={post.image}
                  category={post.category}
                  readTime={post.read_time}
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                />
              </AnimateOnView>
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedBlog;
