import NewsletterForm from "@/components/newsletter-form";
import Container from "../../container";

const ComingSoonContent = () => {
    return (
        <section className="min-h-screen flex items-center justify-center">
            <Container className="lg:space-y-[60px] md:space-y-10 space-y-4">
                <div className="text-center max-w-[581px] mx-auto">
                    <h1 className="h2 text-white mb-8">
                        Exciting new features are on the way
                    </h1>
                    <p className="text-muted">
                        Exciting new features are on the way! Revio is continuously evolving to provide you with the most advanced, secure, and seamless payment solutions.
                    </p>
                </div>
                <div className="max-w-[470px] mx-auto w-full">
                    <NewsletterForm
                        placeholder="Your email"
                        buttonText="Join the Waitlist"
                        buttonVariant="default"
                        buttonClassName="bg-primary text-white hover:bg-primary/90 h-[46px]"
                        inputClassName="h-[46px] bg-black"
                        formClassName="w-full"
                        gap="gap-2.5"
                    />
                </div>
            </Container>
        </section>
    )
}

export default ComingSoonContent