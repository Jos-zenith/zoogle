import Link from "next/link"
import type { SearchResult as SearchResultType } from "@/lib/portfolio-data"

interface SearchResultProps {
  result: SearchResultType
  index: number
}

export function SearchResult({ result, index }: SearchResultProps) {
  return (
    <article className="max-w-[600px] mb-7 pb-1 leading-[1.2]">
      <div className="flex items-start gap-2">
        <div className="w-8 shrink-0 text-[12px] font-bold text-[#666666] leading-[1.4]">
          {index + 1}.
        </div>

        <div className="min-w-0 flex-1">
          {/* URL - 1997 green style */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-[#008000]">
            <cite className="not-italic block">{result.url}</cite>
            <a href="#" className="hover:underline">
              Cached
            </a>
            <a href="#" className="hover:underline">
              Similar pages
            </a>
          </div>

          {/* Title - classic blue link */}
          <h3 className="text-[22px] leading-tight mt-1 mb-1" style={{ fontFamily: "'Times New Roman', serif" }}>
            <Link
              href={`/detail/${result.id}`}
              className="text-[#0000cc]"
            >
              {result.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-[12px] text-[#000000] leading-[1.35]">{result.description}</p>
        </div>
      </div>
    </article>
  )
}
