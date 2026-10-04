import Layout from "@/components/layout";
import DownloadHero from "@/components/sections/utility/download-hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const DownloadPage = () => {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Download | ${appConfig.name}`,
    "description": `${appConfig.description}`,
    "url": `${appConfig.url}/download`
  };

  return (
    <>
      <SEO
        title={`Download | ${appConfig.name}`}
        description={`${appConfig.description}`}
        canonicalUrl="/download"
        ogType="website"
        jsonLd={jsonLd}
      />
      <Layout>
        <DownloadHero />
      </Layout>
    </>
  );
};

export default DownloadPage;

