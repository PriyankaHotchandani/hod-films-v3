import Head from 'next/head'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import FeaturedWork from '../components/FeaturedWork'
import Testimonials from '../components/Testimonials'
import TeamSection from '../components/TeamSection'
import ContactCTA from '../components/ContactCTA'
import Footer from '../components/Footer'
import ClientBrandsMarquee from '../components/ClientBrandsMarquee'

export default function Home() {
  return (
    <>
      <Head>
        <title>House of Doshi Films — Premium Film Production, Mumbai</title>
        <meta name="description" content="House of Doshi Films is Mumbai's premier film production house. Feature films, brand films, short films, and music videos crafted with cinematic precision." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        {/* Open Graph */}
        <meta property="og:title" content="House of Doshi Films" />
        <meta property="og:description" content="Where Vision Becomes Film. Premium production house based in Mumbai." />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content="/og-image.jpg" /> */}
      </Head>

      {/* Global Navigation */}
      <Navigation />

      <main>
        <HeroSection />

        <ClientBrandsMarquee />

        <Testimonials />

        <FeaturedWork />

        <TeamSection />

        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
