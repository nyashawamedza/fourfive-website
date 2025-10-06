import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Design, HeroSlide } from '@/lib/data'

interface HeroCarouselProps {
  designs: readonly (Design | HeroSlide)[]
}

export default function HeroCarousel({ designs }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % designs.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + designs.length) % designs.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const currentDesign = designs[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section className="relative vintage-paper border-b-2 border-[#2B2B2B] overflow-hidden">
      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[600px] py-12">
          {/* Text Content */}
          <div className="order-2 md:order-1 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDesign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block border border-[#2B2B2B] px-3 py-1 text-sm mb-4">
                  {currentDesign.collection}
                </span>
                <h1 className="typewriter-heading text-4xl md:text-6xl mb-4 leading-tight">
                  {currentDesign.title}
                </h1>
                <p className="text-xl text-[#6B6B6B] mb-2">
                  {currentDesign.theme}
                </p>
                <p className="text-2xl font-bold mb-6">
                  ${currentDesign.price}
                </p>
                <div className="flex gap-4">
                  <Link
                    to={`/designs/${currentDesign.id}`}
                    className="border-2 border-[#2B2B2B] px-6 py-3 hover:bg-[#2B2B2B] hover:text-[#F5F1E8] transition-colors"
                  >
                    VIEW DETAILS
                  </Link>
                  <Link
                    to="/collections"
                    className="border border-[#6B6B6B] px-6 py-3 hover:border-[#2B2B2B] transition-colors"
                  >
                    SEE ALL
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Carousel */}
          <div className="order-1 md:order-2 relative h-[500px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentDesign.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <img
                  src={currentDesign.image}
                  alt={currentDesign.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#F5F1E8]/80 border-2 border-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-[#F5F1E8] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#F5F1E8]/80 border-2 border-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-[#F5F1E8] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 pb-8">
          {designs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[#2B2B2B] w-8'
                  : 'bg-[#6B6B6B] hover:bg-[#2B2B2B]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
