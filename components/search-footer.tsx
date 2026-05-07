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
      <div className="border-t border-[#cccccc] py-3 pl-[140px]">
        <p className="text-[11px] text-[#000000] mb-2">Searches related to &quot;{query}&quot;</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 max-w-[400px]">
          {relatedSearches.slice(0, 6).map((term) => (
            <button
              key={term}
              onClick={() => router.push(`/search?q=${term}`)}
              className="text-left text-[11px] text-[#0000cc]"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#cccccc] px-4 py-3 text-[11px] text-[#222222]">
        <div className="mb-2 font-bold" style={{ fontFamily: "'Times New Roman', serif" }}>
          ©1997 Jos_zenith Inc.
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <a href="#" className="text-[#0000cc]">About</a>
          <span>|</span>
          <a href="#" className="text-[#0000cc]">Archive</a>
          <span>|</span>
          <a href="#" className="text-[#0000cc]">Submit Site</a>
          <span>|</span>
          <a href="#" className="text-[#0000cc]">Add URL</a>
        </div>
      </div>

      <div className="border-t border-[#cccccc] px-4 py-2 text-[10px] text-[#333333]">
        <div className="flex flex-wrap items-center gap-2">
          <strong>UNDER CONSTRUCTION</strong>
          <span>|</span>
          <span>Visitor Counter: 0001337</span>
          <span>|</span>
          <span>Best viewed in 800x600</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="border border-black px-1 py-[1px]">Netscape NOW!</span>
          <span className="border border-black px-1 py-[1px]">Internet Explorer 5 Ready</span>
        </div>
      </div>

      <div className="border-t border-[#cccccc] bg-[#f5f5f5] px-4 py-2">
        <div className="flex flex-wrap gap-4 text-[11px] text-[#666666]">
          <button className="text-[#0000cc]">Help</button>
          <button className="text-[#0000cc]">Send feedback</button>
          <button className="text-[#0000cc]">Privacy</button>
          <button className="text-[#0000cc]">Terms</button>
        </div>
      </div>
    </footer>
  )
}
