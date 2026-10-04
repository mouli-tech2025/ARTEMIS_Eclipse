import Container from "@/components/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is Revio?",
    answer: "Revio is a secure and scalable payment gateway that helps businesses accept, process, and manage online payments worldwide. With features like real-time processing, multi-currency support, recurring billing, and fraud prevention, Revio makes payments seamless for both businesses and their customers.",
  },
  {
    question: "How long does it take to set up Revio?",
    answer: "Setting up Revio is quick and straightforward. Most businesses can get started within minutes. Our onboarding process typically takes 1-2 business days for account verification and integration setup. We provide comprehensive documentation and support to help you get up and running as fast as possible.",
  },
  {
    question: "Which payment methods does Revio support?",
    answer: "Revio supports all major payment methods including credit and debit cards (Visa, Mastercard, American Express), digital wallets (Apple Pay, Google Pay, PayPal), bank transfers, and local payment methods in over 150 countries. We continuously add new payment methods based on market demand.",
  },
  {
    question: "Is Revio safe and compliant?",
    answer: "Yes, Revio is fully PCI DSS Level 1 compliant and adheres to the highest security standards. We use end-to-end encryption, tokenization, and advanced fraud detection systems to protect your transactions. We're also compliant with GDPR, SOC 2, and other regional regulations.",
  },
  {
    question: "Can I use Revio for subscription billing?",
    answer: "Absolutely! Revio offers robust subscription and recurring billing features. You can set up flexible billing cycles, manage customer subscriptions, handle upgrades and downgrades, and automate recurring payments. Our Pro and Enterprise plans include advanced subscription management tools.",
  },
  {
    question: "Does Revio work for international businesses?",
    answer: "Yes, Revio is designed for global businesses. We support multi-currency transactions, cross-border payments, and local payment methods in over 150 countries. Our platform handles currency conversion, international compliance, and regulatory requirements automatically.",
  },
  {
    question: "What support options are available?",
    answer: "Revio offers multiple support tiers. Starter plans include email support, Pro plans add 24/7 live chat support, and Enterprise plans include dedicated account managers, SLA guarantees, and priority support. We also provide comprehensive documentation, API guides, and developer resources.",
  },
  {
    question: "Can I customize the checkout experience?",
    answer: "Yes, Revio offers flexible customization options. You can customize the look and feel of hosted checkout pages, use our API to build fully custom checkout experiences, and integrate with your existing design system. Enterprise plans include advanced customization and white-label options.",
  },
];

const FAQ = () => {

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-[507px] md:sticky static top-24 self-start">
            <AnimateOnView once blur>
              <Badge className="md:mb-4 mb-1.5">FAQs</Badge>
              <h2 className="h2 md:mb-6 mb-3">Frequently asked questions</h2>
              <Button asChild>
                <Link to="/contact">
                  Book a free call <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </AnimateOnView>
          </div>
          <div className="md:max-w-[612px]">
            <AnimateOnView once y={40}>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl p-5">
                    <AccordionTrigger className="text-left py-0">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 data-[state=closed]:pt-0 pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimateOnView>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;

