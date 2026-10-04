import Layout from "@/components/layout";
import PlanDetails from "@/components/sections/pricing/plan-details";
import PlanHero from "@/components/sections/pricing/plan-hero";
import FAQ from "@/components/sections/shared/faq";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const EnterprisePlan = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Enterprise Plan | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/pricing/enterprise`
  };

  return (
    <>
      <SEO
        title={`Enterprise Plan | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/pricing/enterprise"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <PlanHero
          title="Enterprise Plan"
          description="Tailored for large-scale businesses requiring full flexibility, security, and compliance."
        />
        <PlanDetails
          planName="Enterprise plan"
          price={{
            monthly: "$89/monthly",
            annually: "$71/monthly",
          }}
          description="Tailored for large-scale businesses requiring full flexibility, security, and compliance."
          features={[
            "Everything in Pro",
            "Dedicated account manager",
            "SLA & priority support",
            "Custom transaction pricing",
            "Advanced fraud protection tools",
            "Global payout solutions",
            "Onboarding & compliance assistance",
          ]}
        />
        <FAQ />
      </Layout>
    </>
  );
};

export default EnterprisePlan;

