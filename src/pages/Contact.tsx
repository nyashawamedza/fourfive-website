
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Contact() {
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true); setStatus(null)
    const form = new FormData(e.currentTarget)
    await new Promise(r => setTimeout(r, 600))
    setPending(false); setStatus('Thanks! We\'ll be in touch.')
  }

  return (
    <>
      <Header />
      <section className="container py-8 max-w-2xl">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="text-zinc-500 mt-1">Custom prints, wholesale, collabs—tell us what you need.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input name="name" placeholder="Your name" className="w-full rounded-xl border px-3 py-2" required />
          <input type="email" name="email" placeholder="Email" className="w-full rounded-xl border px-3 py-2" required />
          <textarea name="message" placeholder="Message" className="w-full min-h-[140px] rounded-xl border px-3 py-2" required />
          <button disabled={pending} className="rounded-xl border px-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800">
            {pending ? 'Sending…' : 'Send'}
          </button>
          {status && <p className="text-sm text-zinc-500">{status}</p>}
        </form>
      </section>
      <Footer />
    </>
  )
}
