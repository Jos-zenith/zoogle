"use client"

import { useRouter } from "next/navigation"

interface SearchFooterProps {
  query: string
}

export function SearchFooter({ query }: SearchFooterProps) {
  const router = useRouter()

  const relatedSearches = ["about", "experience", "projects", "skills", "achievements", "certifications", "stats", "contact"].filter(
    (term) => term !== query.toLowerCase(),
  )

  return (
    <footer className="mt-auto" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Jos_zenith Branded Footer - 1997 style */}
      <div className="flex items-center justify-center py-3">
        <span style={{ fontFamily: "'Times New Roman', serif", fontSize: "24px", fontWeight: "bold" }}>
          <span style={{ color: "#4285f4" }}>J</span>
          <span style={{ color: "#ea4335" }}>o</span>
          <span style={{ color: "#fbbc04" }}>s</span>
          <span style={{ color: "#4285f4" }}>_</span>
          <span style={{ color: "#34a853" }}>z</span>
          <span style={{ color: "#ea4335" }}>e</span>
          <span style={{ color: "#4285f4" }}>n</span>
          <span style={{ color: "#fbbc04" }}>i</span>
          <span style={{ color: "#34a853" }}>t</span>
          <span style={{ color: "#ea4335" }}>h</span>
        </span>
      </div>

      {/* Page Numbers */}
      <div className="flex items-center justify-center gap-2 pb-3 text-[11px]">
        <span className="text-[#ff0000] font-bold">1</span>
        <button className="text-[#0000ff] cursor-pointer">2</button>
        <button className="text-[#0000ff] cursor-pointer">3</button>
        <button className="text-[#0000ff] cursor-pointer">4</button>
        <button className="text-[#0000ff] cursor-pointer">5</button>
        <button className="text-[#0000ff] cursor-pointer">Next &gt;</button>
      </div>

      {/* Related Searches */}
      <div className="border-t border-[#cccccc] py-3 pl-[140px]">
        <p className="text-[11px] text-[#000000] mb-2">Searches related to &quot;{query}&quot;</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 max-w-[400px]">
          {relatedSearches.slice(0, 6).map((term) => (
            <button
              key={term}
              onClick={() => router.push(`/search?q=${term}`)}
              className="text-left text-[11px] text-[#0000ff]"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Footer - 1997 style */}
      <div className="bg-[#f5f5f5] border-t border-[#cccccc] px-4 py-2">
        <div className="flex flex-wrap gap-4 text-[11px] text-[#666666]">
          <button className="text-[#0000ff]">Help</button>
          <button className="text-[#0000ff]">Send feedback</button>
          <button className="text-[#0000ff]">Privacy</button>
          <button className="text-[#0000ff]">Terms</button>
        </div>
      </div>
    </footer>
  )
}
