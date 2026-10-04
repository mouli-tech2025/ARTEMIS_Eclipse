import Layout from "@/components/layout";
import BlogDetailsContent from "@/components/sections/blog/blog-details-content";
import BlogDetailsHero from "@/components/sections/blog/blog-details-hero";
import MoreBlogs from "@/components/sections/blog/more-blogs";
import SEO from "@/components/seo";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost } from "@/hooks/use-blog";
import { appConfig } from "@/utils/app-config";
import { Navigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { slug } = useParams();
  const { data: post, isLoading, isError } = useBlogPost(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !post) {
    return <Navigate to="/blog" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    image: post.image,
    url: `${appConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <SEO
        title={`${post.title} | ${appConfig.name}`}
        description={`Read ${post.title} by ${post.author} on ${appConfig.name} blog.`}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Layout>
        <BlogDetailsHero post={post} />
        <BlogDetailsContent post={post} />
        <MoreBlogs />
      </Layout>
    </>
  );
};

export default BlogDetails;
