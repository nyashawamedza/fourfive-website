
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroCarousel from '@/components/HeroCarousel'
import { DESIGNS, HERO_SLIDES } from '@/lib/data'
import DesignCard from '@/components/DesignCard'
import { motion } from 'framer-motion'

export default function Home() {
  // Use hero slides for carousel
  const featuredDesigns = HERO_SLIDES

  // Remaining designs for grid
  const gridDesigns = DESIGNS.filter(d => !d.hideInGrid)

  return (
    <>
      <Header />

      {/* Hero Carousel */}
      <HeroCarousel designs={featuredDesigns} />

      {/* Featured Designs Grid with Animation */}
      <section className="container py-16">
        <div className="border-b-2 border-[#2B2B2B] pb-4 mb-10">
          <h2 className="typewriter-heading text-3xl">LATEST DESIGNS</h2>
          <p className="text-[#6B6B6B] mt-2">Fresh from the studio</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridDesigns.map((d, index) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DesignCard d={d} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="vintage-paper border-y-2 border-[#2B2B2B] py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="typewriter-heading text-4xl mb-6">OUR PHILOSOPHY</h2>
            <p className="text-xl leading-relaxed text-[#6B6B6B]">
              We believe clothing should be more than fabric. Each fourFIVE piece
              is a canvas for self-expression, meticulously designed and ethically produced.
              Slow fashion, timeless style.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
