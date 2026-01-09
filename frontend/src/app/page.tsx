import HeroSection from '@/components/sections/HeroSection'
import FeaturedCollections from '@/components/sections/FeaturedCollections'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Testimonials from '@/components/sections/Testimonials'
import Newsletter from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedCollections />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
