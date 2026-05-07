import type React from "react"
import Link from "next/link"
import { portfolioData, examResults } from "@/lib/portfolio-data"
import { GoogleLogo } from "@/components/google-logo"
import { notFound } from "next/navigation"

interface DetailPageProps {
  params: Promise<{ id: string }>
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const item = portfolioData.find((p) => p.id === id)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#f2f2f2] border-b border-[#ebebeb] px-4 py-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <GoogleLogo size="small" />
          </Link>
          <Link href={`/search?q=${item.category}`} className="text-[14px] text-[#1a0dab] hover:underline">
            ← Back to {item.category} results
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[800px] mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="text-[13px] text-[#006621] mb-2">{item.url}</div>

        {/* Title */}
        <h1 className="text-[28px] text-[#1a0dab] mb-4">{item.title}</h1>

        {/* Category Badge */}
        <div className="inline-block px-3 py-1 bg-[#f2f2f2] text-[12px] text-[#5f6368] border border-[#dadce0] mb-6 capitalize">
          {item.category}
        </div>

        {/* Description */}
        <div className="text-[16px] text-[#3c4043] leading-relaxed mb-8 border-l-4 border-[#4285f4] pl-4 py-2 bg-[#f8f9fa]">
          {item.description}
        </div>

            {/* Detailed Content based on category */}
            <DetailContent item={item} />

        {/* Related Items */}
        <RelatedItems currentId={id} category={item.category} />
      </main>

      {/* Footer */}
      <footer className="bg-[#f2f2f2] border-t border-[#e4e4e4] py-4 px-4 mt-8">
        <div className="text-center text-[13px] text-[#70757a]">Portfolio of Zenith Joshua · Built with care</div>
      </footer>
    </div>
  )
}

function DetailContent({ item }: { item: (typeof portfolioData)[0] }) {
  const isEducationDetail = item.id === "about-3"
  const currentResults = examResults[item.id] || []

  const gradePointMap: Record<string, number> = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    RA: 0,
    U: 0,
    F: 0,
  }

  const getGradePoint = (grade: string, result: string) => {
    const normalizedGrade = grade.trim().toUpperCase()
    const normalizedResult = result.trim().toUpperCase()

    if (normalizedResult === "F") return 0
    return gradePointMap[normalizedGrade] ?? 0
  }

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

  const resultsBySemester: Record<string, typeof currentResults> = currentResults.reduce((acc, cur) => {
    acc[cur.semester] = acc[cur.semester] || []
    acc[cur.semester].push(cur)
    return acc
  }, {} as Record<string, typeof currentResults>)

  const semesterSummary = Object.keys(resultsBySemester)
    .sort()
    .map((semester) => {
      const entries = resultsBySemester[semester]
      const totalPoints = entries.reduce((sum, entry) => sum + getGradePoint(entry.grade, entry.result), 0)
      const failCount = entries.filter((entry) => entry.result.toUpperCase() === "F").length

      return {
        semester,
        label: semesterLabelMap[semester] || `Semester ${semester}`,
        gpa: (totalPoints / entries.length).toFixed(2),
        status: failCount === 0 ? "All papers cleared" : `${failCount} arrear${failCount > 1 ? "s" : ""}`,
      }
    })

  const totalPoints = currentResults.reduce((sum, entry) => sum + getGradePoint(entry.grade, entry.result), 0)
  const cgpa = currentResults.length > 0 ? (totalPoints / currentResults.length).toFixed(2) : "0.00"

  const getSubjectLink = (semester: string, subjectCode: string) => {
    const folderBySemester: Record<string, string> = {
      "01": "novdec2023",
      "02": "aprmay2024",
      "03": "novdec2024",
      "04": "mayjun2025",
      "05": "novdec2025",
    }
    const folder = folderBySemester[semester] || "misc"
    return `/results/${folder}/${subjectCode}.jpg`
  }

  const categoryContent: Record<string, React.ReactNode> = {
    about: isEducationDetail ? (
      <div className="text-center leading-relaxed" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        <div className="flex items-center justify-center gap-2 mb-6">
          <img
            src="https://media.tenor.com/8Mup6Qj6l18AAAAi/books-study.gif"
            alt="Retro academic icon"
            width={18}
            height={18}
          />
          <h2 className="text-[28px] font-bold">Academic Performance</h2>
        </div>

        <div className="overflow-x-auto mb-10">
          <table className="mx-auto border-collapse text-[16px] min-w-[760px]" border={1} cellPadding={10} cellSpacing={0}>
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
                    <a
                      href={semesterLinks[entry.semester]}
                      className="underline"
                      style={{ color: "#0000EE" }}
                    >
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

        <div className="text-[18px] font-semibold mb-8">Calculated CGPA: {cgpa}</div>

        {(() => {
          const results = currentResults
          if (results.length === 0) return <p className="text-[14px]">No exam records available.</p>

          const bySemester: Record<string, typeof results> = results.reduce((acc, cur) => {
            acc[cur.semester] = acc[cur.semester] || []
            acc[cur.semester].push(cur)
            return acc
          }, {} as Record<string, typeof results>)

          const semesters = Object.keys(bySemester).sort()

          return (
            <div className="space-y-10">
              {semesters.map((sem) => (
                <div key={sem} className="pt-2">
                  <h3 className="text-[20px] font-semibold mb-4">
                    <a href={semesterLinks[sem] || "#"} className="underline" style={{ color: "#0000EE" }}>
                      Semester {sem}
                    </a>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="mx-auto border-collapse text-[15px] min-w-[980px]" border={1} cellPadding={10} cellSpacing={0}>
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
                        {bySemester[sem].map((r) => {
                          const isPractical = (r.subjectName || "").toLowerCase().includes("laboratory")
                          return (
                            <tr key={`${r.semester}-${r.subjectCode}`}>
                              <td className="px-4 py-2 whitespace-nowrap">{isPractical ? "Practical" : "Theory"}</td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <a
                                  href={getSubjectLink(r.semester, r.subjectCode)}
                                  className="underline"
                                  style={{ color: "#0000EE" }}
                                >
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

              <div className="text-[12px] text-[#666666] mt-8">
                Last updated: {new Date().toLocaleString("en-IN")}
              </div>
              <div className="text-[12px] text-[#666666]">You are visitor #00123</div>
            </div>
          )
        })()}
      </div>
    ) : (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Overview</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            {item.description}
          </p>
        </section>
        {item.id === "about-2" && (
          <section>
            <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Perspective</h2>
            <p className="text-[14px] text-[#3c4043] leading-relaxed">
              My perspective is simple: every solution should answer one core question, will this truly help the person next to me
              and the community around me? That is why I focus on solving real, local problems that affect everyday life.
            </p>
            <p className="text-[14px] text-[#3c4043] leading-relaxed mt-3">
              Even when opportunities in Web3 come my way, my strongest drive is to build in domains like agriculture,
              education, and other sectors where practical innovation can create direct social value.
            </p>
            <p className="text-[14px] text-[#3c4043] leading-relaxed mt-3">
              For me, meaningful work is work that can support anyone, anywhere, in some way. I try to contribute through
              systems and products that are grounded, useful, and built with long-term impact in mind.
            </p>
          </section>
        )}
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Personal Details</h2>
          <div className="grid gap-2 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Name:</span> Zenith Joshua
            </p>
            <p>
              <span className="text-[#5f6368]">Role:</span> Tech Enthusiast & Entrepreneur
            </p>
            <p>
              <span className="text-[#5f6368]">Location:</span> Chennai, Tamil Nadu, India
            </p>
            <p>
              <span className="text-[#5f6368]">Institution:</span> Loyola ICAM College of Engineering and Technology
            </p>
            <p>
              <span className="text-[#5f6368]">Degree:</span> Bachelor of Information Technology (2023-2027), CGPA 7.0
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Resume Link</h2>
          <a
            href="https://docs.google.com/document/d/1ojae1n-xKYxAsfgFJk5XETuKijtpQ_1nXZOaocUttjY/edit?usp=sharing"
            className="text-[14px] text-[#1a0dab] hover:underline"
          >
            Open resume
          </a>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Exam Results</h2>
          {(() => {
            const results = examResults[item.id] || []
            if (results.length === 0) return <p className="text-[14px] text-[#3c4043]">No exam records available.</p>

            const bySemester: Record<string, typeof results> = results.reduce((acc, cur) => {
              acc[cur.semester] = acc[cur.semester] || []
              acc[cur.semester].push(cur)
              return acc
            }, {} as Record<string, typeof results>)

            const semesters = Object.keys(bySemester).sort()

            return (
              <div className="space-y-4">
                {semesters.map((sem) => (
                  <div key={sem}>
                    <h3 className="text-[15px] font-semibold mb-2">Semester {sem}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-[13px] text-[#5f6368]">
                            <th className="py-2 pr-4">Code</th>
                            <th className="py-2 pr-4">Name</th>
                            <th className="py-2 pr-4">Grade</th>
                            <th className="py-2 pr-4">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bySemester[sem].map((r) => (
                            <tr key={r.subjectCode} className="border-t border-[#ebebeb]">
                              <td className="py-2">{r.subjectCode}</td>
                              <td className="py-2">{r.subjectName || "-"}</td>
                              <td className="py-2">{r.grade}</td>
                              <td className="py-2">{r.result}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )
          })()}
        </section>
      </div>
    ),
    experiments: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">
            About This Experiment
          </h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            This UI experiment explores modern design patterns and interactive elements. Each experiment is built to
            push the boundaries of what&apos;s possible with CSS and JavaScript.
          </p>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technologies Used</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-1">
            <li>Pure CSS animations</li>
            <li>CSS custom properties</li>
            <li>Minimal JavaScript</li>
            <li>Modern browser APIs</li>
          </ul>
        </section>
      </div>
    ),
    experience: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Responsibilities</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Led multidisciplinary teams across mechanical, electrical, electronics, and IT workstreams</li>
            <li>Managed roadmaps, procurement logistics, milestone tracking, and prototype delivery</li>
            <li>Designed product and technical workflows for mental-health and IoT startups</li>
            <li>Built backend infrastructure for live sensor data and analytics pipelines</li>
            <li>Developed ML models and experimentation workflows during internship training</li>
          </ul>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Key Achievements</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Secured 3rd Place at EFWDC&apos;25 with a 22-member team</li>
            <li>Won 1st Place at ECircle B-Pitch for ParkinToday</li>
            <li>Completed AI and ML internship work including a regression-based salary predictor</li>
          </ul>
        </section>
      </div>
    ),
    projects: item.id === "proj-11" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Concept</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            VICT is a next-generation hybrid encryption system that mathematically binds emotions to encrypted messages.
            It combines Emotional Fingerprinting, random IVs, metadata headers, and dynamic UI theming to create
            enterprise-grade secure messaging with emotional intelligence.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technical Execution</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Metadata header format: v1.0|EMO:&lt;Joy+Anxiety&gt;|DATA:&lt;Base64_Ciphertext&gt;</li>
            <li>Random IV: each encryption produces a unique ciphertext</li>
            <li>Enterprise security: 600K PBKDF2 iterations with SHA-256 fingerprinting</li>
            <li>Backward compatible: supports both legacy and v1.0 formats</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Innovation</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Dynamic emotion theming: UI acts as an empathy mirror reflecting detected emotions</li>
            <li>Confidence scores: emotion percentages such as Joy 92% and Anxiety 45%</li>
            <li>Visual feedback: color-coded glows based on emotional profile</li>
            <li>Real-time analysis: emotion detection without decrypting the message</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Core Mathematics</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            The same text encrypted with different emotions produces completely different ciphertext. VICT hashes the
            emotion set with SHA-256, uses that fingerprint as salt in PBKDF2, and combines it with a random IV so that
            changing the emotion changes the derived key and the ciphertext entirely.
          </p>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>SHA-256 emotion hashing for collision-resistant fingerprints</li>
            <li>Key derivation via PBKDF2 using 600,000 iterations</li>
            <li>Random IV for maximum security and non-deterministic output</li>
            <li>Emotion metadata remains readable while the payload stays encrypted</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Features</h2>
          <div className="grid gap-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Emotional Fingerprinting:</span> 9 supported emotions including Joy,
              Anxiety, Sadness, Anger, Excitement, Love, Fear, Surprise, and Neutral.
            </p>
            <p>
              <span className="text-[#5f6368]">Advanced Encryption:</span> AES-256 with CBC mode, random IVs, and
              PBKDF2 key derivation.
            </p>
            <p>
              <span className="text-[#5f6368]">AI Integration:</span> Claude API support, keyword fallback, emotion
              metadata, and cloud emotion gateway with local fallback.
            </p>
            <p>
              <span className="text-[#5f6368]">User Experience:</span> one-click copy, scramble animation, mobile
              responsiveness, and 44px touch targets.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Security Rationale</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>AES handles bulk data efficiently while RSA can be used for secure key distribution.</li>
            <li>Randomness comes from cryptographic libraries backed by the OS CSPRNG.</li>
            <li>Entropy quality matters: weaker seeds reduce key unpredictability.</li>
            <li>For high-security environments, hardware entropy sources like TRNG or HSMs strengthen the model.</li>
            <li>The trapdoor one-way principle explains public-key encryption for session key wrapping.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Tech Stack</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Backend: Node.js</li>
            <li>Encryption: crypto-js for AES-256 and PBKDF2</li>
            <li>Frontend: Vanilla JavaScript</li>
            <li>UI: dynamic CSS theming, glassmorphism, gradients, and animations</li>
            <li>Emotion detection: Claude API with offline keyword fallback</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Links</h2>
          <div className="flex flex-wrap gap-4 text-[14px]">
            <a href="https://vict-emotion-cipher.vercel.app/" className="text-[#1a0dab] hover:underline">
              Demo -&gt;
            </a>
            <a href="https://github.com/Jos-zenith/mini-Emotion-Cipher" className="text-[#1a0dab] hover:underline">
              Repository -&gt;
            </a>
          </div>
        </section>
      </div>
    ) : item.id === "proj-3" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">The Challenge</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            Mars rovers don&apos;t crash—they slowly fade away. Environmental hazards pose a far greater threat than mechanical failures. The primary threat: dust storms block solar power and degrade critical systems. The industry&apos;s current approach is reactive—respond after the storm hits.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Case Study: Opportunity Rover</h2>
          <div className="space-y-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Mission Design:</span> Planned for 90 days
            </p>
            <p>
              <span className="text-[#5f6368]">Achievement:</span> Survived 14 years, 46 days (ended June 2018)
            </p>
            <p>
              <span className="text-[#5f6368]">Failure Mode:</span> Global dust storm covered solar panels. Power depleted. Final message: &quot;My battery is low and it&apos;s getting dark.&quot;
            </p>
            <p>
              <span className="text-[#5f6368]">Key Insight:</span> Not a hardware failure—an environmental defeat. A fully functional rover rendered powerless.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Case Study: InSight Lander</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            Fully functional seismometer and scientific instruments. Gradual dust accumulation on solar panels reduced power below operational threshold. Mission ended December 2022.
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            <span className="text-[#5f6368]">Pattern:</span> Environment was monitored. Decline was predicted. But no autonomous response existed. Reactive strategy failed.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">The Insight</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li><span className="text-[#5f6368]">Failures are environmental, not mechanical.</span> Systems remain functional but cannot operate.</li>
            <li><span className="text-[#5f6368]">Threats are predictable.</span> Orbital data shows storms developing days in advance.</li>
            <li><span className="text-[#5f6368]">Current systems are reactive.</span> Rovers wait for problems to reach them.</li>
            <li><span className="text-[#5f6368]">The gap:</span> We can see danger coming, but rovers cannot prepare.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Our Solution</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            Paradigm shift: From <span className="text-[#5f6368]">Detect → Endure → Hope</span> to <span className="text-[#5f6368]">Predict → Prepare → Protect</span>
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Core innovation: Convert orbital early-warning data into autonomous rover survival actions. Orbiters monitor large-scale environmental changes, transmit warnings, and trigger mechanical protection protocols that secure critical components.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">System Architecture: Two-Tier Model</h2>
          <div className="grid gap-4 text-[14px] text-[#3c4043]">
            <div>
              <p className="font-medium text-[#5f6368] mb-2">Orbiter Unit (Intelligence Layer)</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Wide-area atmospheric monitoring</li>
                <li>Storm detection and trajectory prediction</li>
                <li>Alert generation and wireless transmission</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-[#5f6368] mb-2">Rover Unit (Action Layer)</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Autonomous navigation and operation</li>
                <li>Alert reception and interpretation</li>
                <li>Mechanical protection deployment</li>
                <li>Emergency power management</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Orbiter Module</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            Monitoring capabilities: temperature sensors for atmospheric disturbances, light intensity sensors for dust concentration, pressure monitors for storm formation, change-detection algorithms for rapid shifts.
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            <span className="text-[#5f6368]">Real-World Application:</span> Mars orbiters like MRO already perform atmospheric monitoring. Our system leverages existing infrastructure without requiring new space hardware.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Rover Module</h2>
          <div className="space-y-2 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Control System:</span> ESP32 microcontroller, event-driven architecture, low-power modes
            </p>
            <p>
              <span className="text-[#5f6368]">Sensors:</span> Ultrasonic (obstacles), LDR (dust detection), vibration (wind monitoring), temperature
            </p>
            <p>
              <span className="text-[#5f6368]">Actuators:</span> DC motors (mobility), servo motors (deployment), slider-crank (anchoring)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Mechanical Innovation</h2>
          <div className="space-y-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Screw-Type Ground Anchor:</span> Servo-driven mechanism that penetrates loose Martian regolith, creates stable low-profile stance, prevents tipping and drift.
            </p>
            <p>
              <span className="text-[#5f6368]">Deployable Dome:</span> Covers sensitive instruments and solar panels, reduces dust accumulation, minimizes wind resistance. Retractable for normal operations.
            </p>
            <p>
              <span className="text-[#5f6368]">Physics Advantage:</span> Mars&apos; thin atmosphere (0.6% of Earth&apos;s) means 100 mph Mars winds ≈ 6 mph Earth winds. Design works with rover&apos;s low center of gravity using simple, reliable mechanisms.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Autonomous Response Protocol</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li><span className="text-[#5f6368]">Normal Mode:</span> Monitoring, exploration, alert system active</li>
            <li><span className="text-[#5f6368]">Alert Received:</span> Parse threat level, calculate positioning, initiate protection</li>
            <li><span className="text-[#5f6368]">Protection Deployment:</span> Halt operations, reposition, deploy anchors, activate enclosure, low-power mode</li>
            <li><span className="text-[#5f6368]">Storm Duration:</span> Minimal power consumption, local monitoring</li>
            <li><span className="text-[#5f6368]">Recovery:</span> Retract mechanisms, diagnostics, resume operations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Prototype Demonstration</h2>
          <div className="space-y-2 text-[14px] text-[#3c4043]">
            <p><span className="text-[#5f6368]">Phase 1:</span> Rover navigates, sensors monitoring, green status</p>
            <p><span className="text-[#5f6368]">Phase 2:</span> Orbiter warning received, yellow status, movement halted</p>
            <p><span className="text-[#5f6368]">Phase 3:</span> Anchoring deploys, protection activates, red status</p>
            <p><span className="text-[#5f6368]">Phase 4:</span> Systems retract, normal operations resume</p>
            <p className="text-[#5f6368] italic mt-2">Note: Time-compressed and scaled demo. Real deployment occurs over hours.</p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technical Feasibility</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li><span className="text-[#5f6368]">Existing Infrastructure:</span> Mars orbiters already gather atmospheric data. No new space hardware needed.</li>
            <li><span className="text-[#5f6368]">Proven Principles:</span> Anchoring systems (terrestrial robotics), protective enclosures (standard engineering), low-power modes (current missions).</li>
            <li><span className="text-[#5f6368]">Energy Efficient:</span> Minimal power deployment, energy preservation during storms, quick operational return.</li>
            <li><span className="text-[#5f6368]">Materials:</span> Standard engineering materials. Withstands Mars extremes (-80°C to +20°C), UV resistant, dust tolerant.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Impact</h2>
          <div className="space-y-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">For Space Agencies:</span> Extended mission duration, increased data collection, reduced environmental risk, higher success rates.
            </p>
            <p>
              <span className="text-[#5f6368]">For Industry:</span> Technology transfer to Earth robotics (desert exploration, mining, disaster response). Patent potential for novel protection systems.
            </p>
            <p>
              <span className="text-[#5f6368]">Economics:</span> Adding $15-20M in protection systems to a $2.5-3B mission provides cost-effective risk insurance.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Future Enhancements</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li><span className="text-[#5f6368]">Phase 2:</span> AI-based prediction, ML anchor positioning, adaptive response</li>
            <li><span className="text-[#5f6368]">Phase 3:</span> Variable-depth anchoring, multiple anchor points, self-cleaning sensors</li>
            <li><span className="text-[#5f6368]">Phase 4:</span> Solar panel orientation, energy-aware survival, advanced battery management</li>
            <li><span className="text-[#5f6368]">Phase 5:</span> Multi-orbiter data fusion, rover swarm protocols, shared environmental awareness</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">The Larger Vision</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            &quot;Survival on Mars is not about withstanding force—it&apos;s about anticipating danger and acting before it arrives.&quot;
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Mars exploration is maturing beyond &quot;getting there.&quot; Long-term presence requires environmental adaptation. This system bridges detection and survival: &quot;Let&apos;s ensure the next generation of Mars rovers doesn&apos;t just land—they endure.&quot;
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Links</h2>
          <div className="flex gap-4 text-[14px]">
            <a href="https://github.com/Jos-zenith/sand-strom-resistant-rover" className="text-[#1a0dab] hover:underline">
              GitHub Repository →
            </a>
          </div>
        </section>
      </div>
    ) : item.id === "proj-9" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Project Overview</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            This project is a dedicated hardware-software navigation system for ride-hailing drivers. It moves trip
            guidance, route updates, and logging away from the driver&apos;s personal smartphone so the driver can stay
            focused on the road.
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mt-3">
            The device combines ESP32 firmware, sensor inputs, a touchscreen interface, and live routing services to
            create a safer and more focused driving workflow.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technical Architecture</h2>
          <div className="grid gap-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Core Controller:</span> ESP32 firmware built in Arduino IDE, using the
              chip&apos;s dual-core processing for concurrent sensor acquisition and API communication.
            </p>
            <p>
              <span className="text-[#5f6368]">Mobile Interface:</span> Cross-platform React Native dashboard for
              navigation, trip management, and driver interaction.
            </p>
            <p>
              <span className="text-[#5f6368]">Connectivity:</span> REST APIs connecting the ESP32 hardware layer with
              the mobile application.
            </p>
            <p>
              <span className="text-[#5f6368]">Routing:</span> Mapbox API integration for real-time routing and
              geospatial visualization.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Hardware Integration</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>NEO-6M GPS module for precise live positioning.</li>
            <li>DS3231 RTC and SD card module for accurate timestamps and offline trip logging.</li>
            <li>TFT touch screen for physical interaction while driving.</li>
            <li>Ambient light sensor for automatic brightness adjustment in day and night conditions.</li>
            <li>7.4V Li-ion battery with TP4056 charging circuit for portable power management.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Software Stack</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Arduino IDE for embedded development on ESP32.</li>
            <li>React Native for the driver dashboard.</li>
            <li>Mapbox API for route computation and map display.</li>
            <li>REST API layer for hardware-to-app communication.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Outcome</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            The system demonstrates how a purpose-built device can reduce driver distraction, centralize trip
            operations, and support safer ride-hailing workflows with a robust sensor-rich interface.
          </p>
        </section>
      </div>
    ) : item.id === "proj-4" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Challenge</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            The project targets the aggressive spread of Prosopis juliflora, also known as Seemai Karuvelam, across
            the Ramnad-Tuticorin belt. This invasive species depletes groundwater, damages farmland, and creates a
            long-term environmental burden for local communities.
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mt-3">
            The core goal was to convert that hazard into a high-value industrial resource instead of treating it as
            waste.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Bio-Refinery Process</h2>
          <div className="grid gap-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Extraction Method:</span> Ultrasound-Assisted Extraction (UAE) is used
              to isolate high-purity bioactive compounds from the invasive biomass.
            </p>
            <p>
              <span className="text-[#5f6368]">Yield Target:</span> The process produces extracts with 16% flavonoids,
              creating a commercially useful input for downstream applications.
            </p>
            <p>
              <span className="text-[#5f6368]">Industrial Use:</span> The extracts are positioned as natural alternatives
              to synthetic preservatives such as BHA, BHT, and parabens.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Circular Economy</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Recovered biomass is converted into biochar for soil rejuvenation.</li>
            <li>The process supports carbon sequestration credit pathways.</li>
            <li>The model creates value across extraction, agriculture, and environmental remediation.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Victori Digital Ecosystem</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            I designed and built the Victori Digital Ecosystem as the software layer for supply-chain transparency and
            stakeholder access across the project workflow.
          </p>
          <div className="grid gap-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Tech Stack:</span> React-based architecture.
            </p>
            <p>
              <span className="text-[#5f6368]">Supply Chain Tracker:</span> Tracks the flow from mechanical
              root-grubbing in the field to modular extraction units.
            </p>
            <p>
              <span className="text-[#5f6368]">Farmer Interface:</span> Gives local stakeholders visibility into the
              project&apos;s economic benefits.
            </p>
            <p>
              <span className="text-[#5f6368]">B2B Dashboard:</span> Lets industrial clients review purity levels and
              sourcing data.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Impact</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            The platform turns an invasive species problem into a circular, traceable resource pipeline that can serve
            both local land recovery and industrial sustainability needs.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Links</h2>
          <div className="flex flex-wrap gap-4 text-[14px]">
            <a href="https://karuvelam.vercel.app" className="text-[#1a0dab] hover:underline">
              Live MVP -&gt;
            </a>
          </div>
        </section>
      </div>
    ) : item.id === "proj-2" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Vision</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Coming from a Tier-2 background, I have seen talented peers ask if they can compete equally in placements.
            EngineerFit is built to ensure problem-solving ability is the core currency, not English fluency or college
            location. The mission is to reduce talent decay and show each student a fair percentage-level view of true
            capability.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Target Users And Problem</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Users: Tier-2/3 engineering students in Tamil Nadu and SME recruiters.</li>
            <li>Talent decay: strong students stagnate without exposure or affordable finishing support.</li>
            <li>English tax: language bias hides true engineering potential in regional ecosystems.</li>
            <li>Placement illusion: high placement percentages with low median salary due to role mismatch.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">What We Are Building</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            EngineerFit is a vernacular-first talent marketplace that replaces PDF resumes with a psychometric vector
            profile, available in both Tamil and English.
          </p>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Live MVP: https://ebv-engineerfit.vercel.app/</li>
            <li>
              Detailed research: https://docs.google.com/document/d/1EEcS5xXIb_ov6Xfc7AbthBtsQb_rWNqTh-Le9wvaR8Y/edit
            </li>
            <li>
              Expected outcome: Students get a Career Fit Snapshot; recruiters shortlist top-fit candidates faster.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">How It Works</h2>
          <div className="grid gap-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Input:</span> Students answer SJTs mapped to Cognitive Aptitude,
              RIASEC, and localized Big Five traits.
            </p>
            <p>
              <span className="text-[#5f6368]">Process:</span> Answers become a student vector. Recruiters define a
              job vector. The engine computes cosine similarity to produce a Person-Environment fit score.
            </p>
            <p>
              <span className="text-[#5f6368]">Output:</span> Matches above 80% are prioritized for recruiter
              connection.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technology Stack</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Frontend: React.js (high-speed CDN delivery)</li>
            <li>Backend: Node.js with Firebase Firestore (NoSQL)</li>
            <li>Rural optimization: text-first, low-bandwidth design for budget Android phones on 2G/3G networks</li>
            <li>MVP development budget target: under Rs. 65,000</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Why EngineerFit Is Better</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Marketplace, not just an assessment tool; the profile itself is the application layer.</li>
            <li>Reduces top-of-funnel sourcing load for recruiters by ranking fit early.</li>
            <li>Contextual validity: SJTs built for Indian Tier-2/3 workplace scenarios, not direct western translations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Feasibility And Pilot KPI Focus</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Team Victori is executing a 3-month Tirunelveli pilot (250 students). KPI focus is realistic and
            efficiency-driven: profile completion rates, fit-match quality above threshold, recruiter shortlisting speed,
            and interview conversion improvement.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Links</h2>
          <div className="flex flex-wrap gap-4 text-[14px]">
            <a href="https://ebv-engineerfit.vercel.app/" className="text-[#1a0dab] hover:underline">
              Live MVP -&gt;
            </a>
            <a href="https://ebv-engineerfit-seven.vercel.app/" className="text-[#1a0dab] hover:underline">
              Alternate Prototype -&gt;
            </a>
            <a
              href="https://docs.google.com/document/d/1EEcS5xXIb_ov6Xfc7AbthBtsQb_rWNqTh-Le9wvaR8Y/edit?usp=sharing"
              className="text-[#1a0dab] hover:underline"
            >
              Research Doc -&gt;
            </a>
          </div>
        </section>
      </div>
    ) : item.id === "proj-10" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Challenge</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            This project addresses the need for a portable, user-friendly way to measure intraocular pressure for
            glaucoma patients without relying on repeated clinic visits. The goal was to support early detection and
            ongoing home-based monitoring.
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mt-3">
            The device combines precision imaging hardware, wireless connectivity, and local data logic to make eye
            pressure tracking more accessible outside traditional tonometry workflows.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technical Contributions</h2>
          <div className="grid gap-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Precision Hardware:</span> ARM Cortex-M3 microcontroller paired with an
              OV7670 CMOS camera and an Achromat Doublet Lens for high-resolution anterior chamber capture.
            </p>
            <p>
              <span className="text-[#5f6368]">Measurement Model:</span> Optical Coherence Tomography (OCT) principles
              combined with imaging technology for non-contact IOP estimation.
            </p>
            <p>
              <span className="text-[#5f6368]">User Feedback:</span> A 2.4-inch TFT LCD provides real-time measurement
              feedback, while a 2.4GHz transceiver supports wireless communication.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Software And Data Logic</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>IAR Embedded Workbench was used for firmware development.</li>
            <li>SQL was used for local database management and measurement storage.</li>
            <li>Current readings are compared against historical data to show change over time.</li>
            <li>The interface displays the difference and the average IOP from the past ten tests.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Modeling And Analysis</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Colab and Kaggle were used for initial software modeling and data analysis, supporting early validation of
            the logic and measurement workflow before the embedded implementation.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Outcome</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            The result is a practical home-monitoring concept that improves accessibility, encourages regular IOP
            tracking, and gives patients a clearer view of their glaucoma risk over time.
          </p>
        </section>
      </div>
    ) : item.id === "proj-8" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Project Overview</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            This project aims to provide a solution for differently-abled individuals, specifically those with limited hand function,
            to navigate independently using simple hand movements. The primary goal is to minimize dependence on others for basic
            locomotion and daily activities.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Problem Statement</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            The team addressed the challenge of physical dependency caused by conditions like genetic disorders, myogenic dystrophy,
            or accidents. The core objective was to create a control system using gesture recognition technology to aid in locomotion
            and obstacle detection.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technical Implementation</h2>
          <div className="space-y-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Sensing:</span> A 3-axis accelerometer records the user's hand gestures and
              trajectories.
            </p>
            <p>
              <span className="text-[#5f6368]">Processing:</span> An Arduino UNO microcontroller processes the data and
              classifies signals into six specific control commands.
            </p>
            <p>
              <span className="text-[#5f6368]">Communication:</span> Data is transmitted wirelessly from the sensors to the
              microcontroller via an RF module.
            </p>
            <p>
              <span className="text-[#5f6368]">Motor Control:</span> L293D Motor Driver and Gear Motors for wheel actuation.
            </p>
            <p>
              <span className="text-[#5f6368]">Safety:</span> Ultrasonic sensors for automatic obstacle detection and alarm
              triggering.
            </p>
            <p>
              <span className="text-[#5f6368]">Power & Input:</span> Potentiometers, capacitors, and slide switches for control
              and configuration.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Functional Features</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>
              <span className="text-[#5f6368]">Navigation:</span> Movement commands (Forward, Backward, Left, Right) triggered by
              physical gestures.
            </li>
            <li>
              <span className="text-[#5f6368]">Obstacle Detection:</span> An automatic alarm beeps if an object is detected within
              a specific range.
            </li>
            <li>
              <span className="text-[#5f6368]">System Control:</span> A dedicated on/off button to start or stop the device
              completely.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Mechanical Design &amp; Prototyping</h2>
          <div className="space-y-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Custom Handpiece Design:</span> Engineered a bespoke handpiece using Autodesk to
              serve as the ergonomic interface between the user's hand and the sensors.
            </p>
            <p>
              <span className="text-[#5f6368]">Additive Manufacturing:</span> Utilized 3D printing to fabricate the handpiece,
              ensuring a lightweight and durable bridge between the user's gestures and the electronic motor system.
            </p>
            <p>
              <span className="text-[#5f6368]">Hardware Integration:</span> Managed the physical assembly of the L293D motor
              driver, gear motors, and custom 3D-printed parts to ensure seamless mechanical operation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Core Team</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Tabitha (ECE), Zenith Joshua (IT), Smitha .V (EEE), Keerthi Sabatine (CS), Steve Godwin (EEE), Srivathsan (EEE),
            and T.S Suganthan (IT).
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Recognition</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Won 1st Place at Envision'23 with INR 10,000. This award recognized the innovation in gesture-controlled mobility,
            the quality of mechanical design, and the real-world applicability of the system for differently-abled individuals.
          </p>
        </section>
      </div>
    ) : item.id === "proj-6" ? (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Challenge</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Rural water systems in Kerala face critical Non-Revenue Water (NRW) losses, with hidden pipeline leakages
            accounting for 40-45% of total water loss. Additionally, household overconsumption and inefficient water use
            compound the problem, putting strain on already limited water resources.
          </p>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mt-3">
            The project aims to create a self-sustaining water circular economy that combines real-time monitoring, leak
            detection, and greywater reuse specifically designed for rural environments.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Strategic Contribution</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            I conceived the "Water Circular Economy" model which integrates intelligent monitoring, incentivization, and
            sustainable reuse cycles tailored for the rural Kerala context.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Real-Time Monitoring & Leak Detection</h2>
          <div className="grid gap-3 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Digital Twin Architecture:</span> Designed a digital replica of rural
              pipelines to enable real-time flow monitoring and leak detection.
            </p>
            <p>
              <span className="text-[#5f6368]">Smart Sensors:</span> Integrated smart sensor infrastructure to track water
              supply with precision, minimizing the need for costly manual inspections.
            </p>
            <p>
              <span className="text-[#5f6368]">Remote Sensing:</span> Remote sensing capabilities enable quick
              identification of pipeline anomalies, reducing operational costs and response time.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Water Credits & Incentivization</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            Developed a "Water Credits" system that motivates conservation through financial incentives and direct
            visibility into consumption patterns.
          </p>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Water Footprint Dashboard: A user-centric interface that displays household consumption patterns in real-time.</li>
            <li>Behavioral Incentives: Conservation-conscious households earn credits that translate into lower bills.</li>
            <li>Transparency: Visibility into individual and community-level water consumption drives awareness and change.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Circular Economy Loop</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed mb-3">
            Engineered a closed-loop system that collects, treats, and reuses wastewater for domestic purposes such as
            flushing and gardening, minimizing freshwater consumption.
          </p>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Low-cost treatment suitable for rural deployment with minimal infrastructure.</li>
            <li>Scalable design that adapts to varying household sizes and water availability.</li>
            <li>Greywater reuse reduces freshwater demand and supports long-term sustainability.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Technology Stack</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>Frontend: Next.js for a performant and responsive digital hub.</li>
            <li>Backend: Node.js for API layer and real-time data processing.</li>
            <li>Real-Time Data: Sensor integration for live water flow and leak detection.</li>
            <li>Database: Structured data storage for consumption history and credit tracking.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Competition & Recognition</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Developed for Smart India Hackathon (SIH) 2025, this project demonstrates a scalable, community-centric
            approach to addressing rural water scarcity and inefficiency through technology and behavioral incentives.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Links</h2>
          <div className="flex flex-wrap gap-4 text-[14px]">
            <a href="https://e-jalodayam.vercel.app" className="text-[#1a0dab] hover:underline">
              Live Platform -&gt;
            </a>
          </div>
        </section>
      </div>
    ) : (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Project Overview</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            {item.description}
          </p>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Features</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-1">
            <li>Hands-on engineering or product prototyping</li>
            <li>Cross-functional collaboration and iteration</li>
            <li>Real-world impact through competition, startup, or community use</li>
            <li>Hardware, software, and UX alignment where relevant</li>
          </ul>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Links</h2>
          <div className="flex gap-4">
            <a href={`https://${item.url.replace(/^https?:\/\//, "")}`} className="text-[14px] text-[#1a0dab] hover:underline">
              View Demo →
            </a>
            <a href="https://github.com/Jos-zenith" className="text-[14px] text-[#1a0dab] hover:underline">
              GitHub Repo →
            </a>
          </div>
        </section>
      </div>
    ),
    skills: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Skill Summary</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">{item.description}</p>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Breakdown</h2>
          <div className="grid gap-4 text-[14px] text-[#3c4043]">
            <p>
              <span className="text-[#5f6368]">Programming:</span> Python, Java, C, React, SQL, Next.js, Embedded C,
              Node.js, Tailwind CSS
            </p>
            <p>
              <span className="text-[#5f6368]">Technologies:</span> IoT, Arduino, ESP32, Raspberry Pi, MATLAB, networks,
              web development
            </p>
            <p>
              <span className="text-[#5f6368]">Tools:</span> Jira, Trello, MS Excel, Power BI, AutoCAD, NX CAD, Simulink
            </p>
            <p>
              <span className="text-[#5f6368]">Competencies:</span> Agile delivery, leadership, integration, documentation
            </p>
          </div>
        </section>
      </div>
    ),
    achievements: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Award Summary</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Competitive wins across EV, IoT, healthcare, and product-building challenges.
          </p>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Highlights</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-2">
            <li>6 awards won across national and institutional competitions</li>
            <li>22 team members led on the electric four-wheeler program</li>
            <li>15 projects completed with a strong engineering and startup focus</li>
          </ul>
        </section>
      </div>
    ),
    certifications: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Certification Summary</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            Practical certifications in business analysis, networking, cybersecurity, programming, AI fundamentals, and
            protocol knowledge.
          </p>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Certifications</h2>
          <ul className="list-disc ml-6 text-[14px] text-[#3c4043] space-y-1">
            <li>Agile Business Analysis - Udemy</li>
            <li>Networks and Network Security - Coursera</li>
            <li>Foundations of Cybersecurity - Coursera</li>
            <li>Security Risk Management - Coursera</li>
            <li>C, MySQL, Java and Python Programming - Skillrack</li>
            <li>AI Fundamentals - IBM SkillsBuild</li>
            <li>Ports and Protocols - Springboard</li>
          </ul>
        </section>
      </div>
    ),
    stats: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Numbers</h2>
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
        </section>
      </div>
    ),
    interests: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Interests</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">{item.description}</p>
        </section>
      </div>
    ),
    contact: (
      <div className="space-y-6">
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Get In Touch</h2>
          <p className="text-[14px] text-[#3c4043] leading-relaxed">
            I&apos;m open to collaboration, startup conversations, engineering projects, and opportunities across product,
            IoT, and applied AI.
          </p>
        </section>
        <section>
          <h2 className="text-[18px] font-medium text-black mb-3 border-b border-[#ebebeb] pb-2">Contact Methods</h2>
          <div className="space-y-3">
            <p className="text-[14px]">
              <span className="text-[#5f6368]">Email:</span>{" "}
              <a href="mailto:zenithjoshua.27it@licet.ac.in" className="text-[#1a0dab] hover:underline">
                zenithjoshua.27it@licet.ac.in
              </a>
            </p>
            <p className="text-[14px]">
              <span className="text-[#5f6368]">Phone:</span> <span className="text-[#3c4043]">+91 7448343632</span>
            </p>
            <p className="text-[14px]">
              <span className="text-[#5f6368]">LinkedIn:</span>{" "}
              <a href="https://www.linkedin.com/in/zenith-joshua-7178a623a/" className="text-[#1a0dab] hover:underline">
                linkedin.com/in/zenith-joshua-7178a623a
              </a>
            </p>
            <p className="text-[14px]">
              <span className="text-[#5f6368]">GitHub:</span>{" "}
              <a href="https://github.com/Jos-zenith" className="text-[#1a0dab] hover:underline">
                github.com/Jos-zenith
              </a>
            </p>
          </div>
        </section>
      </div>
    ),
  }

  return categoryContent[item.category] || null
}

function RelatedItems({ currentId, category }: { currentId: string; category: string }) {
  const related = portfolioData.filter((item) => item.category === category && item.id !== currentId).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-10 pt-6 border-t border-[#ebebeb]">
      <h2 className="text-[16px] font-medium text-black mb-4">Related Results</h2>
      <div className="space-y-4">
        {related.map((item) => (
          <div key={item.id}>
            <cite className="text-[12px] text-[#006621] not-italic block">{item.url}</cite>
            <Link href={`/detail/${item.id}`} className="text-[14px] text-[#1a0dab] hover:underline">
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
