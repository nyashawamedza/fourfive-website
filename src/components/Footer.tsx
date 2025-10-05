import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Footer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <footer className="border-t-2 border-brand-black dark:border-brand-grey vintage-paper">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="typewriter-heading text-xl mb-4">fourFIVE</h3>
              <p className="text-brand-grey text-sm leading-relaxed">
                Timeless designs for the modern individual. Crafted with intention, worn with pride.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="typewriter-heading text-sm mb-4 text-brand-grey">DESIGNS</h4>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-sm hover:underline text-left"
              >
                Browse All Designs →
              </button>
            </div>

            {/* Info */}
            <div>
              <h4 className="typewriter-heading text-sm mb-4 text-brand-grey">CONNECT</h4>
              <p className="text-sm text-brand-grey mb-2">EST. OCTOBER 2017</p>
              <p className="text-sm text-brand-grey">Handcrafted. Limited Edition.</p>
            </div>
          </div>

          <div className="border-t-2 border-brand-black dark:border-brand-grey pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-brand-grey">
            <p>© {new Date().getFullYear()} fourFIVE. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Craft. Culture. Consistency.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
