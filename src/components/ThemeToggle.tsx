
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const d = localStorage.getItem('theme') === 'dark'
    setDark(d)
    document.documentElement.classList.toggle('dark', d)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => {
        const next = !dark
        setDark(next)
        localStorage.setItem('theme', next ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', next)
      }}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center rounded-xl border px-2.5 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
