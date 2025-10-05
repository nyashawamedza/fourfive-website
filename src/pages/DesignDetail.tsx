
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DESIGNS } from '@/lib/data'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function DesignDetail() {
  const { id } = useParams<{ id: string }>()
  const d = DESIGNS.find(x => x.id === id)

  useEffect(() => {
    if (d) {
      const subject = `fourFIVE Design Interest: ${d.title}`
      const body = `Someone viewed the following design:\n\nTitle: ${d.title}\nCollection: ${d.collection}\nType: ${d.type}\nPrice: $${d.price}\nID: ${d.id}\n\nTimestamp: ${new Date().toLocaleString()}`

      window.location.href = `mailto:nwamedza.nw@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
  }, [d])

  if (!d) return <div className="container py-10">Not found.</div>

  return (
    <>
      <Header />
      <section className="container py-8 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden bg-zinc-100">
          <img src={d.image} alt={d.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <Link to="/collections" className="text-sm underline text-zinc-500">← Back to collections</Link>
          <h1 className="text-3xl font-semibold mt-2">{d.title}</h1>
          <div className="mt-1 text-sm text-zinc-500">{d.collection} • {d.type} • {d.theme}</div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">Premium cotton, screen-printed graphics, limited run.</p>
          <div className="mt-6 flex items-center gap-2">
            {d.colors.map((c: string) => <span key={c} className="inline-block size-5 rounded-full border" style={{ background: c }} title={c} />)}
          </div>
          <p className="mt-4 text-2xl font-semibold">${d.price}</p>
          <div className="mt-6 flex gap-3">
            <a href={d.image} download className="rounded-xl border px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800">Download mockup</a>
            <button className="rounded-xl border px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800">Preorder</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
