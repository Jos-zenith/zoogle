import { GoogleLogo } from "@/components/google-logo"
import { SearchBar } from "@/components/search-bar"

export default function HomePage() {
  return (
    <div className="h-screen w-full bg-white flex flex-col m-0 p-0 overflow-hidden" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {/* Header Links - 1997 web style */}
      <header className="flex justify-end items-center gap-4 px-4 py-2 text-[11px]">
        <a href="mailto:zenithjoshua.27it@licet.ac.in">Email</a>
        <span className="text-[#666666]">|</span>
        <a href="https://www.linkedin.com/in/zenith-joshua-7178a623a/">LinkedIn</a>
        <span className="text-[#666666]">|</span>
        <a href="https://github.com/Jos-zenith">GitHub</a>
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

          {/* Footer text - simple and minimal */}
          <p className="text-[11px] text-[#666666] mt-4">
            Search: about, experience, projects, skills, achievements, certifications, contact
          </p>
        </div>
      </main>

      {/* Footer - 1997 style */}
      <footer className="bg-[#f5f5f5] border-t border-[#cccccc]">
        <div className="px-4 py-2 text-[11px] border-b border-[#cccccc] text-[#666666]">
          Chennai, Tamil Nadu, India
        </div>
        <div className="px-4 py-2 flex flex-col sm:flex-row justify-between gap-2 text-[11px]">
          <div className="flex flex-wrap gap-4">
            <a href="#">Portfolio</a>
            <a href="#">Projects</a>
            <a href="#">Contact</a>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#">Resume</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
