import Layout from "@/components/layout";
import PlanDetails from "@/components/sections/pricing/plan-details";
import PlanHero from "@/components/sections/pricing/plan-hero";
import FAQ from "@/components/sections/shared/faq";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const StarterPlan = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Starter Plan | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/pricing/starter`
  };

  return (
    <>
      <SEO
        title={`Starter Plan | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/pricing/starter"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <PlanHero
          title="Starter Plan"
          description="Perfect for small businesses and startups getting started with global payments."
        />
        <PlanDetails
          planName="Starter plan"
          price={{
            monthly: "$19/monthly",
            annually: "$15/monthly",
          }}
          description="Perfect for small businesses and startups getting started with global payments."
          features={[
            "Standard payment processing",
            "Accept major credit/debit cards",
            "Basic analytics dashboard",
            "Email support",
            "Secure checkout integration",
          ]}
        />
        <FAQ />
      </Layout>
    </>
  );
};

export default StarterPlan;

