import Layout from "@/components/layout";
import BlogList from "@/components/sections/blog/blog-list";
import FeaturedBlog from "@/components/sections/blog/featured-blog";
import BlogHero from "@/components/sections/blog/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const Blog = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `Blog | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/blog`
  };

  return (
    <>
      <SEO
        title={`Blog | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/blog"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <BlogHero />
        <FeaturedBlog />
        <BlogList />
      </Layout>
    </>
  );
};

export default Blog;




