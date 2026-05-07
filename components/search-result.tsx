import Link from "next/link"
import type { SearchResult as SearchResultType } from "@/lib/portfolio-data"

interface SearchResultProps {
  result: SearchResultType
}

export function SearchResult({ result }: SearchResultProps) {
  return (
    <article className="max-w-[600px] mb-4">
      {/* URL - 1997 green style */}
      <cite className="text-[11px] text-[#008000] not-italic block mb-0">
        {result.url}
      </cite>

      {/* Title - classic blue link */}
      <h3 className="text-[14px] leading-tight mb-1">
        <Link 
          href={`/detail/${result.id}`} 
          className="text-[#0000ff]"
        >
          {result.title}
        </Link>
      </h3>

      {/* Description */}
      <p className="text-[12px] text-[#000000] leading-[1.4]">{result.description}</p>
    </article>
  )
}
