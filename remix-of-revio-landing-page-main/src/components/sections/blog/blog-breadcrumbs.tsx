import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { appConfig } from "@/utils/app-config";

export interface BlogCrumb {
  label: string;
  to?: string;
}

interface BlogBreadcrumbsProps {
  items: BlogCrumb[];
  className?: string;
}

const BlogBreadcrumbs = ({ items, className }: BlogBreadcrumbsProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.to ? { item: `${appConfig.url}${item.to}` } : {}),
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span
                key={`${item.label}-${index}`}
                className="inline-flex items-center gap-1.5 sm:gap-2.5"
              >
                <BreadcrumbItem>
                  {item.to && !isLast ? (
                    <BreadcrumbLink asChild className="hover:text-white">
                      <Link to={item.to}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-white line-clamp-1">
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default BlogBreadcrumbs;
