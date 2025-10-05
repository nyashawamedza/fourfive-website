
import { Link } from 'react-router-dom'
import { Menu, Search, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 border-b-2 border-[#2B2B2B] vintage-paper">
        <div className="container py-4 flex items-center justify-between">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-[#E8E3D6]">
            <Menu className="size-6" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="typewriter-heading text-2xl font-bold tracking-wider">fourFIVE</span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#E8E3D6]">
              <Search className="size-5" />
            </button>
            <Link to="#" className="p-2 hover:bg-[#E8E3D6]">
              <ShoppingBag className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="flex-1 bg-black/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="w-80 vintage-paper border-l-2 border-[#2B2B2B] p-8 overflow-y-auto">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-2xl"
            >
              ×
            </button>

            <nav className="mt-12 space-y-6">
              <div>
                <h3 className="typewriter-heading text-sm mb-3 text-[#6B6B6B]">Collections</h3>
                <ul className="space-y-2 text-lg">
                  <li><Link to="/collections" className="hover:underline block">All Designs</Link></li>
                  <li><Link to="/collections?type=T-Shirt" className="hover:underline block">T-Shirts</Link></li>
                  <li><Link to="/collections?type=Hoodie" className="hover:underline block">Hoodies</Link></li>
                  <li><Link to="/collections?type=Cap" className="hover:underline block">Accessories</Link></li>
                </ul>
              </div>

              <div className="border-t-2 border-[#2B2B2B] pt-6">
                <h3 className="typewriter-heading text-sm mb-3 text-[#6B6B6B]">About</h3>
                <ul className="space-y-2 text-lg">
                  <li><Link to="/about" className="hover:underline block">Our Story</Link></li>
                  <li><Link to="/contact" className="hover:underline block">Contact</Link></li>
                </ul>
              </div>
            </nav>

            <div className="mt-12 pt-6 border-t-2 border-[#2B2B2B] text-sm text-[#6B6B6B]">
              <p>EST. 2024</p>
              <p className="mt-1">HANDCRAFTED DESIGNS</p>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
