
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Filters, { type FilterState } from '@/components/Filters'
import DesignCard from '@/components/DesignCard'
import { DESIGNS } from '@/lib/data'
import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Collections() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<FilterState>({ search: '', type: 'All', theme: 'All', colors: [], price: [0, 1000] })

  useEffect(() => {
    const typeParam = searchParams.get('type')
    const themeParam = searchParams.get('theme')

    if (typeParam || themeParam) {
      setFilters(prev => ({
        ...prev,
        type: typeParam || 'All',
        theme: themeParam || 'All',
      }))
    }
  }, [searchParams])

  const data = useMemo(() => {
    return DESIGNS.filter(d => {
      // Hide items that are part of a group (marked with hideInGrid)
      if ('hideInGrid' in d && d.hideInGrid) return false

      const hay = [d.title, d.collection, d.theme, d.tags.join(' ')].join(' ').toLowerCase()
      const matchSearch = hay.includes(filters.search.toLowerCase())
      const matchType = filters.type === 'All' || d.type === filters.type
      const matchTheme = filters.theme === 'All' || d.theme === filters.theme
      const matchColor = filters.colors.length === 0 || filters.colors.some(c => (d.colors as readonly string[]).includes(c))
      const matchPrice = d.price >= filters.price[0] && d.price <= filters.price[1]
      return matchSearch && matchType && matchTheme && matchColor && matchPrice
    })
  }, [filters])

  return (
    <>
      <Header />
      <section className="container py-12">
        <div className="border-b-2 border-[#2B2B2B] pb-6 mb-8">
          <h1 className="typewriter-heading text-4xl md:text-5xl mb-3">ALL COLLECTIONS</h1>
          <p className="text-[#6B6B6B] text-lg">Explore our complete catalog</p>
        </div>

        <div className="mb-8">
          <Filters onChange={setFilters} />
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-xl text-[#6B6B6B]">No designs match your filters.</p>
            <p className="text-[#6B6B6B] mt-2">Try adjusting your selection.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-[#6B6B6B]">
              Showing {data.length} {data.length === 1 ? 'design' : 'designs'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map(d => <DesignCard key={d.id} d={d} />)}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  )
}
