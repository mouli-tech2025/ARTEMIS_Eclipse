import Layout from "@/components/layout";
import CoreFeatures from "@/components/sections/features/core-features";
import FeaturesGrid from "@/components/sections/features/features-grid";
import FeaturesHero from "@/components/sections/features/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const Features = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Features | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/features`
  };

  return (
    <>
      <SEO
        title={`Features | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/features"
        ogType="website"
        jsonLd={jsonLd}
      />

      <Layout>
        <FeaturesHero />
        <FeaturesGrid />
        <CoreFeatures />
      </Layout>
    </>
  );
};

export default Features;

