import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { GoogleLogo } from "@/components/google-logo"
import { examResults, portfolioData } from "@/lib/portfolio-data"

interface DetailPageProps {
  params: Promise<{ id: string }>
}

type SectionSpec = {
  id: string
  title: string
  content: React.ReactNode
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function buildSections(item: (typeof portfolioData)[0]): SectionSpec[] {
  const results = examResults[item.id] || []

  if (item.id === "about-3") {
    const semesterLinks: Record<string, string> = {
      "01": "/results/novdec2023/BS3171.jpg",
      "02": "/results/aprmay2024/GE3272.jpg",
      "03": "/results/novdec2024/CS3351.jpg",
      "04": "/results/mayjun2025/CS3452.jpg",
      "05": "/results/novdec2025/CCW331.jpg",
    }

    const semesterLabelMap: Record<string, string> = {
      "01": "Nov-Dec 2023",
      "02": "Apr-May 2024",
      "03": "Nov-Dec 2024",
      "04": "Apr-May 2025",
      "05": "Nov-Dec 2025",
    }

    const gradePointMap: Record<string, number> = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5, RA: 0, U: 0, F: 0 }

    const getGradePoint = (grade: string, result: string) => {
      if (result.trim().toUpperCase() === "F") return 0
      return gradePointMap[grade.trim().toUpperCase()] ?? 0
    }

    const resultsBySemester = results.reduce((acc, cur) => {
      acc[cur.semester] = acc[cur.semester] || []
      acc[cur.semester].push(cur)
      return acc
    }, {} as Record<string, typeof results>)

    const semesterSummary = Object.keys(resultsBySemester)
      .sort()
      .map((semester) => {
        const entries = resultsBySemester[semester]
        const totalPoints = entries.reduce((sum, entry) => sum + getGradePoint(entry.grade, entry.result), 0)
        return {
          semester,
          label: semesterLabelMap[semester] || `Semester ${semester}`,
          gpa: (totalPoints / entries.length).toFixed(2),
          status: entries.some((entry) => entry.result.toUpperCase() === "F") ? "Arrears" : "All papers cleared",
        }
      })

    const totalPoints = results.reduce((sum, entry) => sum + getGradePoint(entry.grade, entry.result), 0)
    const cgpa = results.length > 0 ? (totalPoints / results.length).toFixed(2) : "0.00"

    const getSubjectLink = (semester: string, subjectCode: string) => {
      const folderBySemester: Record<string, string> = {
        "01": "novdec2023",
        "02": "aprmay2024",
        "03": "novdec2024",
        "04": "mayjun2025",
        "05": "novdec2025",
      }

      return `/results/${folderBySemester[semester] || "misc"}/${subjectCode}.jpg`
    }

    return [
      {
        id: "academic-performance",
        title: "Academic Performance",
        content: (
          <div className="overflow-x-auto">
            <table className="mx-auto min-w-[760px] border-collapse text-[16px]" border={1} cellPadding={10} cellSpacing={0}>
              <thead>
                <tr>
                  <th className="px-4 py-2">Semester</th>
                  <th className="px-4 py-2">GPA</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {semesterSummary.map((entry) => (
                  <tr key={entry.semester}>
                    <td className="px-4 py-2">
                      <a href={semesterLinks[entry.semester]} className="retro-link underline">
                        {entry.label}
                      </a>
                    </td>
                    <td className="px-4 py-2">{entry.gpa}</td>
                    <td className="px-4 py-2">{entry.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id: "cgpa",
        title: "Calculated CGPA",
        content: <div className="text-[18px] font-semibold">Calculated CGPA: {cgpa}</div>,
      },
      {
        id: "exam-results",
        title: "Exam Results",
        content: results.length === 0 ? (
          <p className="text-[14px] text-[#3c4043]">No exam records available.</p>
        ) : (
          <div className="space-y-8">
            {Object.keys(resultsBySemester)
              .sort()
              .map((sem) => (
                <div key={sem}>
                  <h3 className="mb-4 text-[20px] font-semibold">
                    <a href={semesterLinks[sem] || "#"} className="retro-link underline">
                      Semester {sem}
                    </a>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="mx-auto min-w-[980px] border-collapse text-[15px]" border={1} cellPadding={10} cellSpacing={0}>
                      <thead>
                        <tr>
                          <th className="px-4 py-2 whitespace-nowrap">Type</th>
                          <th className="px-4 py-2 whitespace-nowrap">Subject Code</th>
                          <th className="px-4 py-2 min-w-[420px]">Subject Name</th>
                          <th className="px-4 py-2 whitespace-nowrap">Grade</th>
                          <th className="px-4 py-2 whitespace-nowrap">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultsBySemester[sem].map((r) => {
                          const isPractical = (r.subjectName || "").toLowerCase().includes("laboratory")
                          return (
                            <tr key={`${r.semester}-${r.subjectCode}`}>
                              <td className="px-4 py-2 whitespace-nowrap">{isPractical ? "Practical" : "Theory"}</td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <a href={getSubjectLink(r.semester, r.subjectCode)} className="retro-link underline">
                                  {r.subjectCode}
                                </a>
                              </td>
                              <td className="px-4 py-2">{r.subjectName || "-"}</td>
                              <td className="px-4 py-2 whitespace-nowrap">{r.grade}</td>
                              <td className="px-4 py-2 whitespace-nowrap">{r.result}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        ),
      },
    ]
  }

  if (item.category === "about") {
    return [
      { id: "overview", title: "Overview", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">{item.description}</p> },
      {
        id: "focus-areas",
        title: "Focus Areas",
        content: (
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>People-first product thinking</li>
            <li>Practical innovation for local problems</li>
            <li>Hardware, software, and systems-level delivery</li>
          </ul>
        ),
      },
      {
        id: "links",
        title: "Links",
        content: (
          <div className="flex flex-wrap gap-4 text-[14px]">
            <a href={`https://${item.url.replace(/^https?:\/\//, "")}`} className="text-[#0000ff] underline hover:text-[#ff0000]">
              View Profile →
            </a>
            <a href="https://github.com/Jos-zenith" className="text-[#0000ff] underline hover:text-[#ff0000]">
              GitHub →
            </a>
          </div>
        ),
      },
    ]
  }

  if (item.category === "experience") {
    return [
      { id: "overview", title: "Overview", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">{item.description}</p> },
      {
        id: "responsibilities",
        title: "Responsibilities",
        content: (
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Led multidisciplinary teams and coordinated delivery</li>
            <li>Managed roadmaps, logistics, and milestone tracking</li>
            <li>Worked across product, engineering, and execution layers</li>
          </ul>
        ),
      },
    ]
  }

  if (item.category === "projects") {
    return [
      { id: "project-overview", title: "Project Overview", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">{item.description}</p> },
      {
        id: "what-it-shows",
        title: "What It Shows",
        content: (
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Applied problem solving</li>
            <li>Prototype-first delivery</li>
            <li>Competition, startup, or community impact</li>
          </ul>
        ),
      },
      {
        id: "links",
        title: "Links",
        content: (
          <div className="flex flex-wrap gap-4 text-[14px]">
            <a href={`https://${item.url.replace(/^https?:\/\//, "")}`} className="text-[#0000ff] underline hover:text-[#ff0000]">
              View Project →
            </a>
          </div>
        ),
      },
    ]
  }

  if (item.category === "skills") {
    return [
      { id: "summary", title: "Skill Summary", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">{item.description}</p> },
      { id: "breakdown", title: "Breakdown", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">Programming, tooling, hardware, and delivery capabilities across the portfolio.</p> },
    ]
  }

  if (item.category === "achievements") {
    return [
      { id: "summary", title: "Award Summary", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">Competitive wins across EV, IoT, healthcare, and product-building challenges.</p> },
      {
        id: "highlights",
        title: "Highlights",
        content: (
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>6 awards won across national and institutional competitions</li>
            <li>22 team members led on the electric four-wheeler program</li>
            <li>15 projects completed with a strong engineering and startup focus</li>
          </ul>
        ),
      },
    ]
  }

  if (item.category === "certifications") {
    return [
      { id: "summary", title: "Certification Summary", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">Practical certifications in business analysis, networking, cybersecurity, programming, AI fundamentals, and protocol knowledge.</p> },
      { id: "certifications", title: "Certifications", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">Agile Business Analysis, Networks and Network Security, Foundations of Cybersecurity, Security Risk Management, AI Fundamentals, and more.</p> },
    ]
  }

  if (item.category === "stats") {
    return [
      {
        id: "numbers",
        title: "Numbers",
        content: (
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-1">
            <li>500+ problems solved on Skillrack</li>
            <li>60+ problems solved on LeetCode</li>
            <li>500+ day Duolingo streak</li>
            <li>25+ competitions on Unstop</li>
            <li>6 awards won</li>
            <li>22 team members led</li>
            <li>15 projects completed</li>
            <li>7+ certifications earned</li>
          </ul>
        ),
      },
    ]
  }

  if (item.category === "contact") {
    return [
      { id: "get-in-touch", title: "Get In Touch", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">I&apos;m open to collaboration, startup conversations, engineering projects, and opportunities across product, IoT, and applied AI.</p> },
      {
        id: "contact-methods",
        title: "Contact Methods",
        content: (
          <div className="space-y-3 text-[14px]">
            <p>
              <span className="text-[#5f6368]">Email:</span>{" "}
              <a href="mailto:zenithjoshua.27it@licet.ac.in" className="text-[#0000ff] underline hover:text-[#ff0000]">
                zenithjoshua.27it@licet.ac.in
              </a>
            </p>
            <p>
              <span className="text-[#5f6368]">Phone:</span> <span className="text-[#3c4043]">+91 7448343632</span>
            </p>
          </div>
        ),
      },
    ]
  }

  return [{ id: "overview", title: "Overview", content: <p className="text-[14px] text-[#3c4043] leading-relaxed">{item.description}</p> }]
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const item = portfolioData.find((p) => p.id === id)

  if (!item) {
    notFound()
  }

  const lastModified = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })

  const shouldShowBadge = item.category === "achievements" || /(award|winner|won|place|recent|new)/i.test(`${item.title} ${item.description}`)
  const sections = buildSections(item)

  return (
    <div id="detail-top" className="min-h-screen bg-white">
      <header className="border-b border-[#ebebeb] bg-[#f2f2f2] px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <GoogleLogo size="small" />
          </Link>
          <Link href={`/search?q=${item.category}`} className="retro-button inline-block">
            ← Back to {item.category}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-4 py-8">
        <div className="mb-2 text-[13px] text-[#006621]">{item.url}</div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h1 className="text-[28px] text-[#1a0dab]">{item.title}</h1>
          {shouldShowBadge && (
            <span className="retro-award-badge inline-flex items-center gap-1 rounded-sm border border-[#d93025] bg-[#fff3f3] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#d93025]">
              <span aria-hidden="true">★</span>
              NEW!
            </span>
          )}
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-[#666666]">
          <span className="inline-block px-3 py-1 border border-[#dadce0] bg-[#f2f2f2] text-[12px] text-[#5f6368] capitalize">
            {item.category}
          </span>
          <span className="text-[#c0c0c0]">|</span>
          <span>Last modified: {lastModified}</span>
          <span className="text-[#c0c0c0]">|</span>
          <a href="javascript:window.print()" className="text-[#0000ff] underline hover:text-[#ff0000]">
            Print this page
          </a>
          <span className="text-[#c0c0c0]">|</span>
          <Link href={`/detail/${item.id}`} className="text-[#0000ff] underline hover:text-[#ff0000]">
            Bookmark this page
          </Link>
        </div>

        <div className="mb-8 border-l-4 border-[#4285f4] bg-[#f8f9fa] py-2 pl-4 text-[16px] leading-relaxed text-[#3c4043]">
          {item.description}
        </div>

        <DetailContent item={item} />

        <RelatedItems currentId={item.id} category={item.category} />

        <div className="mt-8 text-right text-[12px]">
          <a href="#detail-top" className="retro-button inline-block">
            ↑ Back to Top
          </a>
        </div>
      </main>

      <footer className="mt-8 border-t border-[#e4e4e4] bg-[#f2f2f2] px-4 py-4">
        <div className="text-center text-[13px] text-[#70757a]">Portfolio of Zenith Joshua · Built with care</div>
      </footer>
    </div>
  )
}

function DetailContent({ item }: { item: (typeof portfolioData)[0] }) {
  const sections = buildSections(item)

  return (
    <div className="retro-detail-content space-y-6">
      {sections.length > 1 && (
        <nav className="border border-[#d9d9d9] bg-[#fafafa] px-3 py-2 text-[12px]">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#666666]">Table of Contents</div>
          <ol className="ml-5 list-decimal space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-[#0000ff] underline hover:text-[#ff0000]">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2 className="mb-3 border-b border-[#ebebeb] pb-2 text-[18px] font-medium text-black">{section.title}</h2>
          {section.content}
        </section>
      ))}
    </div>
  )
}

function RelatedItems({ currentId, category }: { currentId: string; category: string }) {
  const related = portfolioData.filter((item) => item.category === category && item.id !== currentId).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-10 border-t border-[#ebebeb] pt-6">
      <h2 className="mb-4 text-[16px] font-medium text-black">Related Results</h2>
      <div className="space-y-4">
        {related.map((relatedItem) => (
          <div key={relatedItem.id}>
            <cite className="mb-0 block not-italic text-[12px] text-[#006621]">{relatedItem.url}</cite>
            <Link href={`/detail/${relatedItem.id}`} className="text-[#0000ff] underline hover:text-[#ff0000]">
              {relatedItem.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}