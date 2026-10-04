import { BlogBody } from "@/components/blog-body";
import Container from "@/components/container";
import NewsletterForm from "@/components/newsletter-form";
import { Card } from "@/components/ui/card";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { BlogPost } from "@/lib/services/blog-service";
import DOMPurify from "dompurify";
import { useMemo } from "react";

interface BlogDetailsContentProps {
  post: BlogPost;
}

const BlogDetailsContent = ({ post }: BlogDetailsContentProps) => {

  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(post.content || "", {
      // Allow common HTML tags for blog content
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'strong', 'em', 'u', 's', 'b', 'i',
        'ul', 'ol', 'li', 'blockquote',
        'a', 'img', 'code', 'pre',
        'div', 'span', 'hr', 'table', 'thead', 'tbody', 'tr', 'td', 'th'
      ],
      // Allow specific attributes
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id'],
      // Prevent data URIs and javascript: URLs
      ALLOW_DATA_ATTR: false,
    });
  }, [post.content]);

  return (
    <section>
      {/* Featured Image Section */}
      <AnimateOnView once blur delay={0.3} className="">
        <div className="max-w-[2000px] mx-auto w-full md:h-[691px] h-[300px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </AnimateOnView>
      <Container className="flex flex-col lg:flex-row justify-between md:gap-10 gap-6 py-[60px]">
        {/* Main Content Column */}
        <div className="max-w-[717px]">
          <BlogBody content={sanitizedContent} />
        </div>
        {/* Newsletter Sidebar */}
        <aside className="max-w-[400px] w-full lg:sticky lg:top-[60px] lg:h-fit">
          <Card className="space-y-6 bg-black">
            <div className="max-w-[240px]">
              <h2 className="h6 mb-2 text-white">
                Get insights delivered straight to you
              </h2>
              <p className="text-muted">
                Get the latest insights on payments.
              </p>
            </div>

            <NewsletterForm
              buttonVariant="default"
              buttonClassName="bg-primary text-white hover:bg-primary/90"
              inputClassName="h-[46px]"
              formClassName="flex"
              gap="gap-2.5"
            />
          </Card>
        </aside>
      </Container>
    </section>
  );
};

export default BlogDetailsContent;
