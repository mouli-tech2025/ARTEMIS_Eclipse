import Layout from "@/components/layout";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactHero from "@/components/sections/contact/contact-hero";
import FAQ from "@/components/sections/shared/faq";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const ContactPage = () => {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Contact | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/contact`
  };

  return (
    <>
      <SEO
        title={`Contact | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/contact"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <ContactHero />
        <ContactForm />
        <FAQ />
      </Layout>
    </>
  );
};

export default ContactPage;

