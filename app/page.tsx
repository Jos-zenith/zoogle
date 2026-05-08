import Link from "next/link"
import { GoogleLogo } from "@/components/google-logo"
import { SearchBar } from "@/components/search-bar"

export default function HomePage() {
  return (
    <div className="h-screen w-full bg-white flex flex-col m-0 p-0 overflow-hidden" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Header Links - 1997 web style */}
      <header className="px-4 py-2 text-[11px]">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#bfbfbf] bg-[#f4f4f4] px-2 py-1 text-[#5f6368]">
            <span className="h-2 w-2 rounded-full bg-[#d93025] animate-pulse" aria-hidden="true" />
            <span className="font-bold tracking-[0.2em] uppercase text-[#6b6b6b]">Welcome to Jos_zenith&apos;s Portfolio</span>
            <span className="retro-cursor" aria-hidden="true">_</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="mailto:zenithjoshua.27it@licet.ac.in">Email</a>
            <span className="text-[#666666]">|</span>
            <a href="https://www.linkedin.com/in/zenith-joshua-7178a623a/">LinkedIn</a>
            <span className="text-[#666666]">|</span>
            <a href="https://github.com/Jos-zenith">GitHub</a>
          </div>
        </div>

        <div className="mt-2 overflow-hidden rounded-sm border border-[#d9d9d9] bg-[#fffdf2] px-2 py-1 text-[#444444]">
          <div className="retro-marquee whitespace-nowrap text-[11px] uppercase tracking-[0.2em]">
            Under construction forever - Last updated: May 2026
          </div>
        </div>
      </header>

      {/* Main Content - centered classic 1997 Google style */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <GoogleLogo size="large" />
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-[480px] mb-4">
            <SearchBar autoFocus />
          </div>

          <div className="mb-4 text-[12px] text-[#666666]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            You are visitor #001,337
          </div>

          {/* Footer text - simple and minimal */}
          <p className="text-[11px] text-[#666666] mt-4">
            Search: about, experience, projects, skills, achievements, certifications, contact
          </p>
        </div>
      </main>

      <hr className="mx-4 border-0 border-t-2 border-dotted border-[#b9b9b9]" />

      {/* Footer - 1997 style */}
      <footer className="bg-[#f5f5f5] border-t border-[#cccccc]">
        <div className="px-4 py-2 text-[11px] border-b border-[#cccccc] text-[#666666]">
          Chennai, Tamil Nadu, India
        </div>
        <div className="px-4 py-2 text-[11px]">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[#0000ff]">
            <Link href="/search?q=about">Portfolio</Link>
            <span className="text-[#666666]">|</span>
            <Link href="/search?q=projects">Projects</Link>
            <span className="text-[#666666]">|</span>
            <Link href="/search?q=contact">Contact</Link>
            <span className="text-[#666666]">|</span>
            <Link href="/search?q=resume">Resume</Link>
          </div>
          <div className="mt-2 text-center text-[10px] text-[#8a8a8a]">
            Best viewed in 800x600
          </div>
        </div>
      </footer>
    </div>
  )
}
