"use client"

import Link from "next/link"
import { GoogleLogo } from "./google-logo"
import { SearchBar } from "./search-bar"

interface SearchHeaderProps {
  query: string
}

export function SearchHeader({ query }: SearchHeaderProps) {
  return (
    <header className="bg-[#f5f5f5] border-b border-[#cccccc] sticky top-0 z-10" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="flex items-center gap-4 px-4 py-2">
        <Link href="/">
          <GoogleLogo size="small" />
        </Link>
        <div className="flex-1 max-w-[400px]">
          <SearchBar initialQuery={query} compact />
        </div>
      </div>

      {/* Navigation Tabs - 1997 style */}
      <nav className="flex gap-0 pl-[140px] border-t border-[#cccccc] bg-white">
        <span className="px-3 py-1 text-[11px] text-[#0000ff] border-b-2 border-[#0000ff] bg-white cursor-pointer">
          All
        </span>
        <span className="px-3 py-1 text-[11px] text-[#0000ff] hover:underline cursor-pointer">
          About
        </span>
        <span className="px-3 py-1 text-[11px] text-[#0000ff] hover:underline cursor-pointer">
          Experience
        </span>
        <span className="px-3 py-1 text-[11px] text-[#0000ff] hover:underline cursor-pointer">
          Projects
        </span>
        <span className="px-3 py-1 text-[11px] text-[#0000ff] hover:underline cursor-pointer">
          Skills
        </span>
        <span className="px-3 py-1 text-[11px] text-[#0000ff] hover:underline cursor-pointer">
          Contact
        </span>
      </nav>
    </header>
  )
}
