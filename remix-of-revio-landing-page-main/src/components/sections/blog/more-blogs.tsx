import Container from "@/components/container";
import BlogCard from "@/components/ui/blog-card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedPosts } from "@/hooks/use-blog";
import { useParams } from "react-router-dom";

const MoreBlogs = () => {
  const { slug } = useParams();
  const { data: relatedPosts = [], isLoading } = useRelatedPosts(slug || "", 3);

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12" id="blog">
      <Container className="md:space-y-10 xl:space-y-2xl space-y-8">
        {/* Section Header */}
        <AnimateOnView once blur delay={0.1} className="max-w-[683px]">
          <h2 className="h2">Explore more insights on payments gateway</h2>
        </AnimateOnView>

        {/* Articles Grid */}
        {isLoading ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((article, index) => (
              <AnimateOnView key={article.id} delay={index * 0.1}>
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
        )}
      </Container>
    </section>
  );
};

export default MoreBlogs;
