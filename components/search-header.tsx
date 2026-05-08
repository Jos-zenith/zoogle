"use client"

import Link from "next/link"
import { GoogleLogo } from "./google-logo"
import { SearchBar } from "./search-bar"

interface SearchHeaderProps {
  query: string
  onQueryChange?: (query: string) => void
  onSubmitQuery?: (query: string) => void
}

export function SearchHeader({ query, onQueryChange, onSubmitQuery }: SearchHeaderProps) {
  const tabs = [
    { label: "All", q: "" },
    { label: "About", q: "about" },
    { label: "Experience", q: "experience" },
    { label: "Projects", q: "projects" },
    { label: "Skills", q: "skills" },
    { label: "Contact", q: "contact" },
  ]

  return (
    <header className="bg-[#f5f5f5] border-b border-[#cccccc]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="flex items-center gap-4 px-4 py-2">
        <Link href="/">
          <GoogleLogo size="small" />
        </Link>
        <div className="flex-1 max-w-[400px]">
          <SearchBar initialQuery={query} value={query} compact onQueryChange={onQueryChange} onSubmitQuery={onSubmitQuery} />
        </div>
      </div>

      {/* Navigation Tabs - clickable like Google */}
      <nav className="flex gap-0 pl-[140px] border-t border-[#cccccc] bg-white">
        {tabs.map((tab) => {
          const isActive = (tab.q === "" && !query) || query === tab.q
          return (
            <Link
              key={tab.label}
              href={`/search${tab.q ? `?q=${encodeURIComponent(tab.q)}` : ""}`}
              className={`px-3 py-1 text-[11px] ${isActive ? "text-[#0000cc] border-b-2 border-[#0000cc] bg-white" : "text-[#0000cc] hover:underline"}`}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
