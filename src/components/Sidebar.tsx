import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const categories = {
    'T-Shirts': [
      { name: 'Teddy Bear Designs', href: '/collections?type=T-Shirt&theme=Teddy' },
      { name: 'Classic Designs', href: '/collections?type=T-Shirt&theme=Classic' },
      { name: 'We Are Culture Designs', href: '/collections?type=T-Shirt&theme=We Are Culture' },
      { name: 'I Am Music Designs', href: '/collections?type=T-Shirt&theme=I Am Music' },
    ],
    'Hoodies': [
      { name: 'Teddy Bear Designs', href: '/collections?type=Hoodie&theme=Teddy' },
      { name: 'Emblem Designs', href: '/collections?type=Hoodie&theme=Emblem' },
    ],
  }

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-brand-black border-r-2 border-brand-black dark:border-brand-grey z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="typewriter-heading text-2xl">DESIGNS</h2>
            <button
              onClick={onClose}
              className="text-2xl hover:text-brand-grey transition-colors"
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>

          {/* Categories */}
          <nav className="space-y-2">
            {Object.entries(categories).map(([category, designs]) => (
              <div key={category} className="border-b border-brand-grey/20 pb-2">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between py-3 px-2 hover:bg-brand-grey/10 transition-colors"
                >
                  <span className="typewriter-heading text-sm">{category}</span>
                  <span className="text-xl">
                    {expandedCategory === category ? '−' : '+'}
                  </span>
                </button>

                {/* Subcategories */}
                {expandedCategory === category && (
                  <ul className="pl-4 space-y-2 mt-2 mb-2">
                    {designs.map((design) => (
                      <li key={design.name}>
                        <a
                          href={design.href}
                          className="block py-2 px-2 text-sm hover:bg-brand-grey/10 hover:underline transition-colors"
                          onClick={onClose}
                        >
                          {design.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
