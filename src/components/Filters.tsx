
import { useMemo, useState } from 'react'
import { DESIGNS } from '@/lib/data'

export type FilterState = { search: string; type: string; theme: string; colors: string[]; price: [number, number]; };

export default function Filters({ onChange }: { onChange: (f: FilterState) => void }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [theme, setTheme] = useState('All')
  const [colors, setColors] = useState<string[]>([])
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1000)

  const TYPES = useMemo(() => ['All', ...Array.from(new Set(DESIGNS.map(d => d.type)))], [])
  const THEMES = useMemo(() => ['All', ...Array.from(new Set(DESIGNS.map(d => d.theme)))], [])
  const COLORS = useMemo(() => Array.from(new Set(DESIGNS.flatMap(d => d.colors))), [])

  const emit = (override?: Partial<FilterState>) => {
    const f: FilterState = { search, type, theme, colors, price: [min, max] }
    onChange({ ...f, ...override })
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <div className="md:col-span-2">
          <input placeholder="Search designs, themes, tags…" className="w-full rounded-xl border px-3 py-2"
                 value={search} onChange={(e)=>{ setSearch(e.target.value); emit({ search: e.target.value }) }} />
        </div>
        <div>
          <label className="text-sm text-zinc-500">Type</label>
          <select className="w-full rounded-xl border px-3 py-2" value={type}
                  onChange={(e)=>{ setType(e.target.value); emit({ type: e.target.value }) }}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-zinc-500">Theme</label>
          <select className="w-full rounded-xl border px-3 py-2" value={theme}
                  onChange={(e)=>{ setTheme(e.target.value); emit({ theme: e.target.value }) }}>
            {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-zinc-500">Price range</label>
          <div className="flex items-center gap-2">
            <input type="number" min={0} className="w-full rounded-xl border px-3 py-2" value={min}
                   onChange={(e)=>{ const v = Number(e.target.value || 0); setMin(v); emit({ price: [v, max] }) }} placeholder="Min"/>
            <span className="text-zinc-400">–</span>
            <input type="number" min={0} className="w-full rounded-xl border px-3 py-2" value={max}
                   onChange={(e)=>{ const v = Number(e.target.value || 0); setMax(v); emit({ price: [min, v] }) }} placeholder="Max"/>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border">Colors</span>
        {COLORS.map((c) => {
          const key = String(c)
          const active = colors.includes(key)
          return (
            <button key={key}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition ${active ? "bg-black text-white border-black" : "bg-white hover:bg-zinc-50 dark:bg-zinc-900"}`}
                    onClick={() => {
                      const next = active ? colors.filter(x => x!==key) : [...colors, key]
                      setColors(next); emit({ colors: next })
                    }}>
              <span className="inline-block size-3 rounded-full border" style={{ background: key }} />
              {key}
            </button>
          )
        })}
        {colors.length > 0 && (
          <button className="text-sm underline ml-2" onClick={()=>{ setColors([]); emit({ colors: [] }) }}>Clear</button>
        )}
      </div>
    </div>
  )
}
