import Container from "@/components/container";
import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts, useCategories } from "@/hooks/use-blog";
import { useSearchParams } from "react-router-dom";

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || undefined;

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: filteredPosts = [], isLoading: postsLoading } = useBlogPosts(selectedCategory);

  const handleCategoryFilter = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container className="space-y-2xl">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Button
            variant={!selectedCategory ? "default" : "secondary"}
            onClick={() => handleCategoryFilter(null)}
            className="rounded-full"
          >
            All
          </Button>
          {categoriesLoading ? (
            <>
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </>
          ) : (
            categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => handleCategoryFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))
          )}
        </div>

        {/* Articles Grid */}
        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[30px] gap-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full aspect-[4/3] rounded-sm" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[30px] gap-x-4">
            {filteredPosts.map((article, index) => (
              <AnimateOnView
                key={article.id}
                once
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
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No articles found in this category.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default BlogList;
