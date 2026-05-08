"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchHeader } from "@/components/search-header"
import { SearchResult } from "@/components/search-result"
import { SearchFooter } from "@/components/search-footer"
import { searchPortfolio } from "@/lib/portfolio-data"

const INDEXED_PAGE_COUNT = 12493
const FAKE_SEARCH_MIN_MS = 350
const FAKE_SEARCH_MAX_MS = 800

function randomDelay() {
  return Math.floor(Math.random() * (FAKE_SEARCH_MAX_MS - FAKE_SEARCH_MIN_MS + 1)) + FAKE_SEARCH_MIN_MS
}

export function SearchPageClient({ initialQuery }: { initialQuery: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [status, setStatus] = useState("Ready")
  const [isSearching, setIsSearching] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const results = useMemo(() => searchPortfolio(query), [query])

  const syncUrl = (nextQuery: string) => {
    const path = nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search"
    router.replace(path, { scroll: false })
  }

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery)
    setIsSearching(true)
    setStatus(`Searching ${INDEXED_PAGE_COUNT.toLocaleString()} indexed pages...`)

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(() => {
      const nextResults = searchPortfolio(nextQuery)
      setIsSearching(false)
      setStatus(nextResults.length > 0 ? `Showing ${nextResults.length} results` : "No matching documents")
      syncUrl(nextQuery)
    }, randomDelay())
  }

  const handleSubmitQuery = (nextQuery: string) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    setQuery(nextQuery)
    setIsSearching(false)
    setStatus(searchPortfolio(nextQuery).length > 0 ? `Showing ${searchPortfolio(nextQuery).length} results` : "No matching documents")
    syncUrl(nextQuery)
  }

  const relatedSearches = ["about", "experience", "projects", "skills", "achievements", "certifications", "stats", "contact"].filter(
    (term) => term !== query.toLowerCase(),
  )

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <SearchHeader query={query} onQueryChange={handleQueryChange} onSubmitQuery={handleSubmitQuery} />

      <main className="flex-1 py-4 pl-[180px] pr-4">
        <div className="mb-4 max-w-[600px] text-[12px] text-[#666666]">
          <p className="text-[13px] text-[#70757a]">{isSearching ? status : `About ${results.length} results (0.42 seconds)`}</p>
          <p className="mt-1 text-[11px] text-[#8a8a8a]">Searching the web since 2026</p>
          <p className="mt-2 text-[12px] text-[#666666]">
            Did you mean: <a href={`/search?q=${encodeURIComponent(query || "about")}`} className="text-[#0000cc] underline">{query || "about"}</a>
          </p>
        </div>

        {query && isSearching ? (
          <div className="max-w-[600px] border border-[#d9d9d9] bg-[#fafafa] px-3 py-4 text-[12px] text-[#333333]">
            {status}
          </div>
        ) : results.length === 0 ? (
          <div className="py-8 max-w-[600px]">
            <p className="text-[13px] text-[#545454]">
              Your search - <strong className="text-black">{query}</strong> - did not match any documents.
            </p>
            <p className="mt-4 text-[13px] text-[#545454]">Suggestions:</p>
            <ul className="mt-2 text-[13px] text-[#545454] list-disc ml-6">
              <li>Try searching for: about, projects, experience, experiments, writing, or contact</li>
              <li>Make sure all words are spelled correctly</li>
              <li>Try different keywords</li>
            </ul>
          </div>
        ) : (
          <div>
            {results.map((result, index) => (
              <SearchResult key={result.id} result={result} index={index} />
            ))}
          </div>
        )}
      </main>

      <SearchFooter query={query} />
    </div>
  )
}
