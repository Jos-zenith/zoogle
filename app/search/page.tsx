import { SearchPageClient } from "@/components/search-page-client"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""
  return <SearchPageClient initialQuery={query} />
}
