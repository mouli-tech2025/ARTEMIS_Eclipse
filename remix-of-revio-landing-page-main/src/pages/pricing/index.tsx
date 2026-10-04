import Layout from "@/components/layout";
import AllPlansWithCustom from "@/components/sections/pricing/all-plans-with-custom";
import PricingHero from "@/components/sections/pricing/hero";
import PricingPlans from "@/components/sections/pricing/pricing-plans";
import FAQ from "@/components/sections/shared/faq";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";
import { useState } from "react";

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `Pricing | ${appConfig.name}`,
        "description": `${appConfig.description}`,
        "url": `${appConfig.url}/pricing`
    };

    return (
        <>
            <SEO
                title={`Pricing | ${appConfig.name}`}
                description={`${appConfig.description}`}
                canonicalUrl="/pricing"
                ogType="website"
                jsonLd={jsonLd}
            />
            <Layout>
                <PricingHero />
                <PricingPlans isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
                <AllPlansWithCustom />
                <FAQ />
            </Layout>
        </>
    );
};

export default Pricing;

