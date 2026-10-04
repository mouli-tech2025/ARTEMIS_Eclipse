import Layout from "@/components/layout";
import Features from "@/components/sections/home/features";
import Hero from "@/components/sections/home/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";
import { lazy, Suspense, useRef } from "react";

// Lazy load below-the-fold components for code splitting
const Blog = lazy(() => import("@/components/sections/home/blog"));
const BusinessAccount = lazy(() => import("@/components/sections/home/business-account"));
const CoreFeatures = lazy(() => import("@/components/sections/home/core-features"));
const Integrations = lazy(() => import("@/components/sections/home/integrations"));
const MobileApp = lazy(() => import("@/components/sections/home/mobile-app"));
const SecurityCompliance = lazy(() => import("@/components/sections/home/security-compliance"));
const Testimonials = lazy(() => import("@/components/sections/home/testimonials"));

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const metaTitle = "SaaS Website Design Template | Lovable";
  const metaDescription = "Launch a fintech SaaS marketing site with blog CMS and admin dashboard. Remix this template and go live in hours with pricing pages, SEO, and auth built in.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": appConfig.name,
    "description": appConfig.description,
    "url": appConfig.url,
    "logo": appConfig.logo,
    "image": appConfig.ogImage,
    "applicationCategory": "FinanceApplication, BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "description": "Start for free with our basic plan"
    },
    "areaServed": "Worldwide",
    "serviceType": "Payment Processing",
    "knowsAbout": [
      "PCI DSS Compliance",
      "Merchant Accounts",
      "Point of Sale Systems",
      "Digital Wallets",
      "Global Payouts"
    ]
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonicalUrl="/"
        ogType="profile"
        jsonLd={jsonLd}
      />
      <Layout>
        <Hero heroRef={heroRef} />
        <Features heroRef={heroRef} />
        <Suspense fallback={null}>
          <CoreFeatures />
        </Suspense>
        <Suspense fallback={null}>
          <MobileApp />
        </Suspense>
        <Suspense fallback={null}>
          <BusinessAccount />
        </Suspense>
        <Suspense fallback={null}>
          <Integrations />
        </Suspense>
        <Suspense fallback={null}>
          <SecurityCompliance />
        </Suspense>
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={null}>
          <Blog />
        </Suspense>
      </Layout>
    </>
  );
};

export default Home;
