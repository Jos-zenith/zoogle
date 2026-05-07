import { Suspense } from "react"
import { SearchHeader } from "@/components/search-header"
import { SearchResult } from "@/components/search-result"
import { SearchFooter } from "@/components/search-footer"
import { searchPortfolio } from "@/lib/portfolio-data"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

function SearchResults({ query }: { query: string }) {
  const results = searchPortfolio(query)

  if (results.length === 0) {
    return (
      <div className="py-8">
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
    )
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-[13px] text-[#70757a]">
          About {results.length} results (0.42 seconds)
        </p>
        <p className="mt-1 text-[11px] text-[#8a8a8a]">Searching the web since 1997</p>
        <p className="mt-2 text-[12px] text-[#666666]">
          Did you mean: <a href={`/search?q=${encodeURIComponent(query || "about")}`} className="text-[#0000cc] underline">{query || "about"}</a>
        </p>
      </div>

      <section className="max-w-[600px] mb-7 border border-[#bbbbbb] p-2">
        <p className="text-[12px] font-bold text-black">Sponsored Links</p>
        <p className="text-[11px] text-[#444444]">--------------------------------</p>
        <div className="mt-1 flex flex-col gap-1 text-[13px] leading-[1.2]">
          <a href="#" className="text-[#0000cc]">Learn HTML in 24 Hours</a>
          <a href="#" className="text-[#0000cc]">Free Guestbook Hosting</a>
          <a href="#" className="text-[#0000cc]">Download Winamp Skins</a>
        </div>
      </section>

      {results.map((result, index) => (
        <SearchResult key={result.id} result={result} index={index} />
      ))}
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SearchHeader query={query} />

      <main className="flex-1 py-4 pl-[180px] pr-4">
        <Suspense fallback={<p className="text-[#545454]">Loading...</p>}>
          <SearchResults query={query} />
        </Suspense>
      </main>

      <SearchFooter query={query} />
    </div>
  )
}
