
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <>
      <Header />
      <section className="container py-10 prose prose-zinc dark:prose-invert max-w-3xl">
        <h1>About fourFIVE</h1>
        <p><strong>fourFIVE</strong> blends streetwear, music culture, and minimalist design. Each drop is built on three principles: <em>Craft. Culture. Consistency.</em></p>
        <p>This site showcases our designs and collections. Hit the Contact page for collabs, wholesale, or custom print inquiries.</p>
      </section>
      <Footer />
    </>
  )
}
