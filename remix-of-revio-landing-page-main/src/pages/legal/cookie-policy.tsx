import Container from "@/components/container";
import Layout from "@/components/layout";
import LegalHero from "@/components/sections/legal/hero";
import SEO from "@/components/seo";
import { appConfig } from "@/utils/app-config";

const CookiePolicyPage = () => {

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `Cookie Policy | ${appConfig.name}`,
        "description": `${appConfig.description}`,
        "url": `${appConfig.url}/legal/cookie-policy`
    };

    return (
        <>
            <SEO
                title={`Cookie Policy | ${appConfig.name}`}
                description={`${appConfig.description}`}
                canonicalUrl={`/legal/cookie-policy`}
                ogType="website"
                jsonLd={jsonLd}
            />
            <Layout>
                <LegalHero
                    title={`Cookie Policy`}
                    description={`${appConfig.description}`}
                />
                <section>
                    <Container className="flex flex-col lg:flex-row justify-center md:gap-10 gap-6 py-[60px]">
                        {/* Main Content Column */}
                        <article className="max-w-[1030px] prose prose-lg">
                            <p className="lead text-xl text-muted-foreground mb-8">
                                In the rapidly evolving landscape of digital commerce, payment gateways have emerged as the unsung heroes, silently powering the transactions that drive the global economy.
                            </p>

                            <h3>The backbone of global expansion</h3>
                            <p>
                                Gone are the days when online transactions were clumsy and insecure. Today, modern payment gateways offer seamless, encrypted, and instant processing capabilities that have democratized access to global markets for businesses of all sizes.
                            </p>

                            <p>
                                From simple credit card processing to integrating digital wallets and cryptocurrencies, the scope of what a payment gateway handles has expanded dramatically. This evolution is not just about technology; it's about customer experience.
                            </p>

                            <h3>Security: Where trust meets technology</h3>
                            <p>
                                Consumers demand speed and security. A study shows that 40% of users abandon their cart if the checkout process is too complicated. Payment gateways solve this by offering one-click checkouts and biometric authentication.
                            </p>

                            <blockquote>
                                "The future of commerce is frictionless. Payment gateways are the oil in the engine of the digital economy."
                            </blockquote>

                            <h3>The growth of global online payments</h3>
                            <p>
                                As we move forward, AI-driven fraud detection and decentralized finance (DeFi) integrations are set to redefine the standards again. Businesses that adapt to these changes will lead the charge in the next decade of digital innovation.
                            </p>

                            <h3>Greater flexibility & payment choices</h3>
                            <p>
                                The modern payment gateway ecosystem offers unprecedented flexibility, allowing businesses to accept payments from multiple sources including credit cards, digital wallets, bank transfers, and emerging cryptocurrencies.
                            </p>

                            <h3>Why flexibility matters</h3>
                            <p>
                                In today's global marketplace, customers expect to pay using their preferred method. Payment gateways that offer diverse payment options see higher conversion rates and customer satisfaction.
                            </p>

                            <h3>Backbone of global online transactions</h3>
                            <p>
                                Payment gateways serve as the critical infrastructure that enables businesses to operate across borders, handling currency conversions, compliance, and regulatory requirements seamlessly.
                            </p>

                            <h3>How payment gateways empower digital commerce</h3>
                            <p>
                                By providing secure, fast, and reliable transaction processing, payment gateways remove the technical barriers that once prevented small businesses from competing on a global scale.
                            </p>

                            <h3>Conclusion: The currency of innovation</h3>
                            <p>
                                As digital commerce continues to evolve, payment gateways will remain at the forefront of innovation, enabling new business models and transforming how we think about money and transactions in the digital age.
                            </p>
                        </article>
                    </Container>
                </section>
            </Layout>
        </>
    )
}

export default CookiePolicyPage;