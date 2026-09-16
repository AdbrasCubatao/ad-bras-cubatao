import Hero from '../components/Hero.jsx'
import QuickAccessGrid from '../components/QuickAccessGrid.jsx'
import { VerseBanner, SocialLinks } from '../components/VerseAndSocial.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <QuickAccessGrid />
      <VerseBanner />
      <SocialLinks />
    </main>
  )
}
