import Layout from "@/components/layout";
import PlanDetails from "@/components/sections/pricing/plan-details";
import PlanHero from "@/components/sections/pricing/plan-hero";
import FAQ from "@/components/sections/shared/faq";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const ProPlan = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Pro Plan | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/pricing/pro`
  };

  return (
    <>
      <SEO
        title={`Pro Plan | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/pricing/pro"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <PlanHero
          title="Pro Plan"
          description="For growing businesses that need advanced features and lower transaction fees."
        />
        <PlanDetails
          planName="Pro plan"
          price={{
            monthly: "$59/monthly",
            annually: "$47/monthly",
          }}
          description="For growing businesses that need advanced features and lower transaction fees."
          features={[
            "Everything in Starter",
            "Multi-currency & cross-border payments",
            "Advanced analytics & reporting",
            "Subscription & recurring billing",
            "API & integrations support",
          ]}
        />
        <FAQ />
      </Layout>
    </>
  );
};

export default ProPlan;

