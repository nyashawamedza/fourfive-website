
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { Design } from '@/lib/data'

const sendDesignEmail = (design: Design) => {
  const subject = `fourFIVE Design Interest: ${design.title}`
  const body = `Someone clicked on the following design:\n\nTitle: ${design.title}\nCollection: ${design.collection}\nType: ${design.type}\nPrice: $${design.price}\nID: ${design.id}\n\nTimestamp: ${new Date().toLocaleString()}`

  window.location.href = `mailto:nwamedza.nw@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function DesignCard({ d }: { d: Design }) {
  const [showModal, setShowModal] = useState(false)
  const hasMultipleViews = 'views' in d && d.views && d.views.length > 1

  const handleClick = (e: React.MouseEvent) => {
    if (hasMultipleViews) {
      e.preventDefault()
      setShowModal(true)
      sendDesignEmail(d)
    }
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        {hasMultipleViews ? (
          <div onClick={handleClick} className="group block cursor-pointer">
            <div className="border-2 border-brand-black dark:border-brand-grey overflow-hidden bg-brand-white dark:bg-brand-dark hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden bg-brand-light dark:bg-brand-black">
                <img
                  src={d.image}
                  alt={d.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="p-5 border-t-2 border-brand-black dark:border-brand-grey">
                <h3 className="typewriter-heading text-lg mb-2 line-clamp-1">{d.title}</h3>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-brand-grey">{d.type}</span>
                  <span className="text-sm text-brand-grey">{d.collection}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-black dark:border-brand-grey">
                  <div className="flex items-center gap-2">
                    {d.colors.map((c: string) => (
                      <span
                        key={c}
                        className="inline-block size-4 border border-brand-black dark:border-brand-grey"
                        style={{ background: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <span className="font-bold">${d.price}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link to={`/design/${d.id}`} onClick={() => sendDesignEmail(d)} className="group block">
            <div className="border-2 border-brand-black dark:border-brand-grey overflow-hidden bg-brand-white dark:bg-brand-dark hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden bg-brand-light dark:bg-brand-black">
                <img
                  src={d.image}
                  alt={d.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="p-5 border-t-2 border-brand-black dark:border-brand-grey">
                <h3 className="typewriter-heading text-lg mb-2 line-clamp-1">{d.title}</h3>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-brand-grey">{d.type}</span>
                  <span className="text-sm text-brand-grey">{d.collection}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-black dark:border-brand-grey">
                  <div className="flex items-center gap-2">
                    {d.colors.map((c: string) => (
                      <span
                        key={c}
                        className="inline-block size-4 border border-brand-black dark:border-brand-grey"
                        style={{ background: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <span className="font-bold">${d.price}</span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </motion.div>

      {/* Modal for multiple views */}
      <AnimatePresence>
        {showModal && hasMultipleViews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-white dark:bg-brand-dark border-2 border-brand-black dark:border-brand-grey max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6 border-b-2 border-brand-black dark:border-brand-grey pb-4">
                  <h2 className="typewriter-heading text-2xl">{d.title}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-2xl hover:text-brand-grey transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {d.views.map((view, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold mb-2">{view.label}</h3>
                      <div className="border-2 border-brand-black dark:border-brand-grey overflow-hidden bg-brand-light dark:bg-brand-black">
                        <img
                          src={view.image}
                          alt={`${d.title} - ${view.label}`}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t-2 border-brand-black dark:border-brand-grey">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-sm text-brand-grey">Type:</span>
                        <span className="ml-2">{d.type}</span>
                      </div>
                      <div>
                        <span className="text-sm text-brand-grey">Collection:</span>
                        <span className="ml-2">{d.collection}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold">${d.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
