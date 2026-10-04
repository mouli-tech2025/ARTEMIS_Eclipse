import Container from '@/components/container'
import ComingSoonContent from '@/components/sections/utility/coming-soon-content'
import SEO from '@/components/seo'
import { appConfig } from '@/utils/app-config'
import { Link } from 'react-router-dom'

const ComingSoonPage = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ComingSoonPage",
        "name": `Coming Soon | ${appConfig.name}`,
        "description": `${appConfig.description}`,
        "url": `${appConfig.url}/coming-soon`
    }

    return (
        <>
            <SEO
                title={`Coming Soon | ${appConfig.name}`}
                description={`${appConfig.description}`}
                canonicalUrl="/coming-soon"
                ogType="website"
                jsonLd={jsonLd}
            />
            <main className='bg-black'>
                <header className="w-full md:top-10 top-6 mx-auto absolute z-40">
                    <Container className="flex justify-center items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/images/common/logo.svg" alt="Revio" className="h-8" />
                        </Link>
                    </Container>
                </header>
                <ComingSoonContent />
            </main>
        </>
    )
}

export default ComingSoonPage