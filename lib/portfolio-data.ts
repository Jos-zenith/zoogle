export interface SearchResult {
  id: string
  title: string
  url: string
  description: string
  category: string
}

export const portfolioData: SearchResult[] = [
  // About
  {
    id: "about-1",
    title: "Zenith Joshua - Tech Enthusiast & Entrepreneur",
    url: "zenithjoshua.dev/about",
    description:
      "Innovative product leader and developer from Chennai, Tamil Nadu, focused on scalable solutions across IoT, AI, and automotive engineering.",
    category: "about",
  },
  {
    id: "about-2",
    title: "Bio and Focus Areas",
    url: "zenithjoshua.dev/about/bio",
    description:
      "Builds people-first solutions focused on real local challenges, with strong interest in agriculture, education, and everyday-impact innovation.",
    category: "about",
  },
  {
    id: "about-3",
    title: "Education - Loyola ICAM College of Engineering and Technology",
    url: "zenithjoshua.dev/about/education",
    description: "Bachelor of Information Technology, 2023-2027, with a calculated CGPA of 6.93 based on current grade records.",
    category: "about",
  },
  {
    id: "about-4",
    title: "Resume and Quick Links",
    url: "zenithjoshua.dev/about/resume",
    description:
      "Resume, LinkedIn, GitHub, Skillrack, LeetCode, Duolingo, and Unstop profiles collected in one place for quick review.",
    category: "about",
  },

  // Experience
  {
    id: "work-1",
    title: "Team Lead - Electric Four Wheeler Design Club (SAEISS)",
    url: "zenithjoshua.dev/experience/efwdc-2025",
    description:
      "Led a 22-member cross-functional team through procurement, roadmap planning, and prototype delivery to secure 3rd Place at EFWDC'25.",
    category: "experience",
  },
  {
    id: "work-2",
    title: "Co-Founder & CTO - ParkinToday",
    url: "zenithjoshua.dev/experience/parkingtoday",
    description:
      "Built backend infrastructure for live parking data streams and architected a high-concurrency IoT analytics stack; won 1st Place at ECircle B-Pitch.",
    category: "experience",
  },
  {
    id: "work-3",
    title: "AI & Machine Learning Intern - Edunet Foundation (AICTE)",
    url: "zenithjoshua.dev/experience/edunet",
    description:
      "Completed structured AI/ML training and built regression-based models, including a salary predictor using Python, NumPy, Pandas, and Scikit-learn.",
    category: "experience",
  },

  // Projects
  {
    id: "proj-1",
    title: "Electric 4-Wheeler Design Challenge - SAEISS",
    url: "drive.google.com/drive/folders/1SVLk6qsWlZ-nsQEsMhuZbYVaBtXikEPL",
    description:
      "Designed and developed an electric 4-wheeler prototype with a 22-member team; placed 3rd at EFWDC'25.",
    category: "projects",
  },
  {
    id: "proj-2",
    title: "EngineerFit - Vernacular Psychometric Job Matching Engine",
    url: "ebv-engineerfit.vercel.app",
    description:
      "A vernacular-first talent marketplace replacing resumes with psychometric vectors to match Tier-2/3 engineering talent with the right roles.",
    category: "projects",
  },
  {
    id: "proj-3",
    title: "Storm-Resilient Mars Rover",
    url: "github.com/Jos-zenith/sand-strom-resistant-rover",
    description:
      "Anticipatory rover survival system combining orbiter early-warning intelligence with autonomous mechanical protection. Addresses Mars dust storms through predictive positioning, ground anchoring, and protective enclosures—transforming rovers from reactive to proactive.",
    category: "projects",
  },
  {
    id: "proj-4",
    title: "Karuvelam - Seemai Karuvelam Bio-Refinery Platform",
    url: "karuvelam.vercel.app",
    description:
      "Dual-pronged bio-refinery and digital management platform that converts Prosopis juliflora into high-value industrial inputs and biochar.",
    category: "projects",
  },
  {
    id: "proj-5",
    title: "ParkinToday",
    url: "drive.google.com/drive/folders/1VZtImJUuUCpftdFahDbpq6ZtNqSo3CA7",
    description:
      "IoT-based real-time parking management solution that won 1st Place at the ECircle B-Pitch Competition.",
    category: "projects",
  },
  {
    id: "proj-6",
    title: "Jalodhyam - Smart Water Circular Economy System",
    url: "e-jalodayam.vercel.app",
    description:
      "Full-stack digital hub for a rural water circular economy addressing Non-Revenue Water losses through real-time leak detection, water credits incentivization, and greywater reuse.",
    category: "projects",
  },
  {
    id: "proj-7",
    title: "E-Mart Inventory Management System",
    url: "github.com/Jos-zenith/E-Mart",
    description: "A sleek full-stack shopping and inventory experience built as a mini-project.",
    category: "projects",
  },
  {
    id: "proj-8",
    title: "IoT Gesture Wheelchair",
    url: "canva.com/design/DAGP55P-uCM",
    description:
      "IoT-based gesture-controlled wheelchair for differently-abled individuals; won 1st Place at Envision'23 with INR 10,000.",
    category: "projects",
  },
  {
    id: "proj-9",
    title: "Smart Navigation Device for Ride-Hailing Drivers",
    url: "zenithjoshua.dev/projects/ride-hailing-device",
    description:
      "Standalone ESP32-based navigation and trip-management device that reduces driver distraction with Mapbox routing, sensor fusion, and offline logging.",
    category: "projects",
  },
  {
    id: "proj-10",
    title: "Portable Non-Contact Glaucoma IOP Monitor",
    url: "zenithjoshua.dev/projects/glaucoma-pressure-monitor",
    description:
      "Portable non-contact intraocular pressure monitor for glaucoma patients, combining imaging, wireless feedback, and historical trend analysis.",
    category: "projects",
  },
  {
    id: "proj-11",
    title: "VICT - Emotional Fingerprinting Cipher",
    url: "vict-emotion-cipher.vercel.app",
    description:
      "A hybrid cryptography system that binds emotional fingerprints to encrypted messages with metadata headers, random IVs, and dynamic UI theming.",
    category: "projects",
  },

  // Skills
  {
    id: "skill-1",
    title: "Programming Languages",
    url: "zenithjoshua.dev/skills/programming",
    description: "Python, Java, C, React, SQL, Next.js, Embedded C, Figma, Node.js, and Tailwind CSS.",
    category: "skills",
  },
  {
    id: "skill-2",
    title: "Technologies",
    url: "zenithjoshua.dev/skills/technologies",
    description: "IoT, embedded systems with Arduino, ESP32, and Raspberry Pi, MATLAB, networks, and web development.",
    category: "skills",
  },
  {
    id: "skill-3",
    title: "Tools",
    url: "zenithjoshua.dev/skills/tools",
    description: "Jira, Trello, MS Excel (Advanced), Power BI, AutoCAD, NX CAD, and Simulink.",
    category: "skills",
  },
  {
    id: "skill-4",
    title: "Core Competencies",
    url: "zenithjoshua.dev/skills/core-competencies",
    description: "Agile project management, leadership, hardware-software integration, and documentation.",
    category: "skills",
  },

  // Achievements
  {
    id: "award-1",
    title: "1st Place - Envision'23",
    url: "zenithjoshua.dev/awards/envision-23",
    description: "IoT gesture wheelchair project; won INR 10,000.",
    category: "achievements",
  },
  {
    id: "award-2",
    title: "1st Place - ECircle B-Pitch",
    url: "zenithjoshua.dev/awards/ecircle-bpitch",
    description: "Real-time parking management solution and ParkinToday startup pitch.",
    category: "achievements",
  },
  {
    id: "award-3",
    title: "2nd Place - INDIA@2047",
    url: "zenithjoshua.dev/awards/india-2047",
    description: "Portable non-contact glaucoma IOP monitoring device.",
    category: "achievements",
  },
  {
    id: "award-4",
    title: "3rd Place - EFWDC'25",
    url: "zenithjoshua.dev/awards/efwdc-2025",
    description: "Electric four-wheeler prototype and chairman's special award.",
    category: "achievements",
  },
  {
    id: "award-5",
    title: "4th Place - EFWDC'24",
    url: "zenithjoshua.dev/awards/efwdc-2024",
    description: "Electric 4-wheeler project and INR 10,000 award.",
    category: "achievements",
  },
  {
    id: "award-6",
    title: "4th Place - ImpactX 2.0",
    url: "zenithjoshua.dev/awards/impactx-2",
    description: "Smart navigation device for ride-hailing drivers.",
    category: "achievements",
  },
  {
    id: "award-7",
    title: "5th Place - KSR Innovative Business Pitch",
    url: "zenithjoshua.dev/awards/ksr-pitch",
    description: "IoT smart parking concept for Indian Tier-1 cities.",
    category: "achievements",
  },
  {
    id: "award-8",
    title: "Top 10 - AI Buildathon '26",
    url: "zenithjoshua.dev/awards/ai-buildathon-26",
    description: "EngineerFit recognized among the best innovative ideas.",
    category: "achievements",
  },
  {
    id: "award-9",
    title: "Hardware Hackathon 2.0 Recognition",
    url: "zenithjoshua.dev/awards/hardware-hackathon-2",
    description: "Storm-resilient Mars rover project recognition.",
    category: "achievements",
  },
  {
    id: "award-10",
    title: "Ramnad Hackathon (STARTUPTN) Recognition",
    url: "zenithjoshua.dev/awards/ramnad-hackathon",
    description: "Karuvelam project recognition.",
    category: "achievements",
  },
  {
    id: "award-11",
    title: "Smart India Hackathon Recognition",
    url: "zenithjoshua.dev/awards/sih",
    description: "Jalodhyam project recognition.",
    category: "achievements",
  },

  // Certifications
  {
    id: "cert-1",
    title: "Agile Business Analysis - Udemy",
    url: "zenithjoshua.dev/certifications/agile-business-analysis",
    description: "Certification focused on analysis practices, delivery, and stakeholder alignment.",
    category: "certifications",
  },
  {
    id: "cert-2",
    title: "Networks and Network Security - Coursera",
    url: "zenithjoshua.dev/certifications/networks-security",
    description: "Covers networking fundamentals and security best practices.",
    category: "certifications",
  },
  {
    id: "cert-3",
    title: "Foundations of Cybersecurity - Coursera",
    url: "zenithjoshua.dev/certifications/foundations-cybersecurity",
    description: "Introduces core cybersecurity concepts and threat awareness.",
    category: "certifications",
  },
  {
    id: "cert-4",
    title: "Security Risk Management - Coursera",
    url: "zenithjoshua.dev/certifications/security-risk-management",
    description: "Covers risk identification, treatment, and mitigation.",
    category: "certifications",
  },
  {
    id: "cert-5",
    title: "C, MySQL, Java and Python Programming - Skillrack",
    url: "zenithjoshua.dev/certifications/skillrack-programming",
    description: "Hands-on programming certification across multiple languages and databases.",
    category: "certifications",
  },
  {
    id: "cert-6",
    title: "AI Fundamentals - IBM SkillsBuild",
    url: "zenithjoshua.dev/certifications/ai-fundamentals",
    description: "Introductory certification covering AI concepts and applications.",
    category: "certifications",
  },
  {
    id: "cert-7",
    title: "Ports and Protocols - Springboard",
    url: "zenithjoshua.dev/certifications/ports-protocols",
    description: "Networking certification centered on common ports, protocols, and communication layers.",
    category: "certifications",
  },

  // Stats
  {
    id: "stats-1",
    title: "Problem Solving Stats",
    url: "zenithjoshua.dev/stats/problem-solving",
    description:
      "500+ problems solved on Skillrack, 60+ on LeetCode, 500+ day Duolingo streak, and 25+ Unstop competitions.",
    category: "stats",
  },
  {
    id: "stats-2",
    title: "Leadership and Output",
    url: "zenithjoshua.dev/stats/leadership",
    description: "22 team members led, 15 projects completed, 6 awards won, and 7+ certifications earned.",
    category: "stats",
  },

  // Interests
  {
    id: "interest-1",
    title: "Interests and Direction",
    url: "zenithjoshua.dev/interests",
    description:
      "Team leadership, innovation, IoT and embedded systems, business development, healthcare tech, and data analytics.",
    category: "interests",
  },

  // Contact
  {
    id: "contact-1",
    title: "Contact Zenith Joshua",
    url: "zenithjoshua.dev/contact",
    description:
      "Email: zenithjoshua.27it@licet.ac.in | Phone: +91 7448343632 | Chennai, Tamil Nadu, India.",
    category: "contact",
  },
  {
    id: "contact-2",
    title: "LinkedIn Profile",
    url: "linkedin.com/in/zenith-joshua-7178a623a",
    description: "Professional profile for networking, updates, and project highlights.",
    category: "contact",
  },
  {
    id: "contact-3",
    title: "GitHub Profile",
    url: "github.com/Jos-zenith",
    description: "Repository of projects, prototypes, and technical experiments.",
    category: "contact",
  },
  {
    id: "contact-4",
    title: "Resume and Profiles",
    url: "zenithjoshua.dev/contact/profiles",
    description: "Resume, Skillrack, Duolingo, LeetCode, and Unstop profile links for quick access.",
    category: "contact",
  },
]

export const searchSuggestions = [
  "about",
  "experience",
  "projects",
  "skills",
  "achievements",
  "certifications",
  "stats",
  "interests",
  "contact",
  "resume",
  "github",
  "linkedin",
  "leetcode",
  "skillrack",
  "unstop",
]

export const categoryMap: Record<string, string[]> = {
  about: ["about", "bio", "education", "background", "resume", "zenith joshua", "introduction"],
  experience: ["experience", "work", "job", "career", "lead", "founder", "cto", "intern", "team lead", "leadership"],
  projects: ["projects", "portfolio", "prototype", "app", "iot", "rover", "parking", "health", "startup", "mental health", "water", "wheel chair", "glaucoma", "cipher", "engineerfit", "karuvelam", "jalodhyam", "mars", "efwdc", "ride-hailing", "gesture"],
  skills: ["skills", "stack", "programming", "technology", "tools", "competencies", "python", "java", "react", "nodejs", "embedded", "arduino", "esp32"],
  achievements: ["awards", "achievements", "competition", "place", "winner", "recognition", "first place", "second place", "third place", "envision", "ecircle", "india@2047", "efwdc", "impactx", "hackathon"],
  certifications: ["certifications", "certificates", "course", "coursera", "udemy", "ibm", "springboard", "skillrack", "agile", "cybersecurity", "networks"],
  stats: ["stats", "numbers", "problems", "projects completed", "awards won", "leetcode", "skillrack", "duolingo", "unstop"],
  interests: ["interests", "focus", "passion", "innovation", "healthcare", "analytics", "iot", "ai", "automotive", "leadership"],
  contact: ["contact", "reach", "email", "social", "connect", "github", "linkedin", "phone", "resume", "zenithjoshua.27it"],
}

const itemKeywordIndex: Record<string, string[]> = {
  "about-3": ["cgpa", "grade", "semester", "licet", "education"],
  "about-4": ["resume", "cv", "document", "profile"],
  "work-1": ["hackathon", "efwdc", "automotive", "team", "lead"],
  "work-2": ["iot", "startup", "parking", "cto"],
  "proj-1": ["efwdc", "automotive", "ev", "prototype"],
  "proj-3": ["hackathon", "rover", "mars", "hardware"],
  "proj-5": ["iot", "parking", "startup"],
  "proj-8": ["iot", "gesture", "wheelchair", "hackathon"],
  "proj-9": ["esp32", "iot", "navigation", "drivers"],
  "proj-10": ["healthtech", "medical", "monitor"],
  "skill-1": ["skills", "programming", "react", "next", "python", "java"],
  "skill-2": ["iot", "esp32", "arduino", "raspberry", "embedded"],
  "award-8": ["hackathon", "ai", "buildathon"],
  "award-9": ["hackathon", "hardware", "rover"],
  "award-10": ["hackathon", "startup", "karuvelam"],
  "award-11": ["hackathon", "sih", "jalodhyam"],
}

function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9@.+-]+/)
    .map((token) => token.trim())
    .filter(Boolean)
}

export function searchPortfolio(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase().trim()
  const queryTokens = tokenizeQuery(lowerQuery)

  if (!lowerQuery) return []

  // Special case: "lucky" - return a highlighted impressive item
  if (lowerQuery === "lucky") {
    const luckyItem = portfolioData.find((item) => item.id === "proj-11") // VICT cipher
    return luckyItem ? [luckyItem] : []
  }

  // Special case: "recent" or "latest" - return the most impressive items across all categories
  if (lowerQuery === "recent" || lowerQuery === "latest") {
    return [
      portfolioData.find((item) => item.id === "award-9")!, // Hardware Hackathon 2.0 - Mars rover
      portfolioData.find((item) => item.id === "proj-3")!, // Mars Rover
      portfolioData.find((item) => item.id === "work-1")!, // EFWDC Team Lead
      portfolioData.find((item) => item.id === "award-4")!, // 3rd Place EFWDC'25
      portfolioData.find((item) => item.id === "proj-11")!, // VICT cipher
      portfolioData.find((item) => item.id === "work-2")!, // ParkinToday CTO
      portfolioData.find((item) => item.id === "proj-2")!, // EngineerFit
      portfolioData.find((item) => item.id === "award-8")!, // AI Buildathon Top 10
    ].filter(Boolean)
  }

  // Search-engine-like scoring across title/description/url/category plus indexed keywords.
  const scoredResults = portfolioData
    .map((item) => {
      const haystack = `${item.title} ${item.description} ${item.url} ${item.category}`.toLowerCase()
      const indexedKeywords = itemKeywordIndex[item.id] || []
      let score = 0

      if (haystack.includes(lowerQuery)) {
        score += 6
      }

      for (const token of queryTokens) {
        if (item.title.toLowerCase().includes(token)) score += 6
        if (item.url.toLowerCase().includes(token)) score += 4
        if (item.description.toLowerCase().includes(token)) score += 3
        if (item.category.toLowerCase().includes(token)) score += 2

        if (indexedKeywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
          score += 5
        }

        for (const categoryKeywords of Object.values(categoryMap)) {
          if (categoryKeywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
            if (categoryMap[item.category]?.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
              score += 2
            }
          }
        }
      }

      return { item, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)

  return scoredResults
}

export interface ExamEntry {
  semester: string
  subjectCode: string
  subjectName?: string
  grade: string
  result: string
}

// Detailed exam results keyed by portfolio `id` (used by /detail/[id])
export const examResults: Record<string, ExamEntry[]> = {
  // Education detail (about-3)
  "about-3": [
    // Nov/Dec 2023 (Semester 01) — with subject names
    { semester: "01", subjectCode: "HS3152", subjectName: "Professional English – I", grade: "B+", result: "PASS" },
    { semester: "01", subjectCode: "MA3151", subjectName: "Matrices and Calculus", grade: "B+", result: "PASS" },
    { semester: "01", subjectCode: "PH3151", subjectName: "Engineering Physics", grade: "B+", result: "PASS" },
    { semester: "01", subjectCode: "CY3151", subjectName: "Engineering Chemistry", grade: "B+", result: "PASS" },
    { semester: "01", subjectCode: "GE3151", subjectName: "Problem Solving and Python Programming", grade: "B", result: "PASS" },
    { semester: "01", subjectCode: "GE3152", subjectName: "Heritage of Tamils / தமிர் மரப்", grade: "B+", result: "PASS" },
    { semester: "01", subjectCode: "GE3171", subjectName: "Problem Solving and Python Programming Laboratory", grade: "A+", result: "PASS" },
    { semester: "01", subjectCode: "BS3171", subjectName: "Physics and Chemistry Laboratory", grade: "O", result: "PASS" },
    { semester: "01", subjectCode: "GE3172", subjectName: "English Laboratory", grade: "O", result: "PASS" },

    // April/May 2024 (Semester 02) — with subject names
    { semester: "02", subjectCode: "HS3252", subjectName: "Professional English – II", grade: "A", result: "PASS" },
    { semester: "02", subjectCode: "MA3251", subjectName: "Statistics and Numerical Methods", grade: "B+", result: "PASS" },
    { semester: "02", subjectCode: "PH3256", subjectName: "Physics for Information Science", grade: "B", result: "PASS" },
    { semester: "02", subjectCode: "BE3251", subjectName: "Basic Electrical and Electronics Engineering", grade: "C", result: "PASS" },
    { semester: "02", subjectCode: "GE3251", subjectName: "Engineering Graphics", grade: "B+", result: "PASS" },
    { semester: "02", subjectCode: "CS3251", subjectName: "Programming in C", grade: "B", result: "PASS" },
    { semester: "02", subjectCode: "GE3252", subjectName: "Tamils and Technology / தமிர் தொழிநுட்பம்", grade: "B+", result: "PASS" },
    { semester: "02", subjectCode: "GE3271", subjectName: "Engineering Practices Laboratory", grade: "A+", result: "PASS" },
    { semester: "02", subjectCode: "CS3271", subjectName: "Programming in C Laboratory", grade: "A+", result: "PASS" },
    { semester: "02", subjectCode: "GE3272", subjectName: "Communication Laboratory", grade: "A", result: "PASS" },

    // Semester 03
    { semester: "03", subjectCode: "CD3281", subjectName: "Algorithms Laboratory", grade: "A", result: "P" },
    { semester: "03", subjectCode: "CS3381", subjectName: "Object Oriented Programming Laboratory", grade: "A+", result: "P" },
    { semester: "03", subjectCode: "CS3361", subjectName: "Data Science Laboratory", grade: "O", result: "P" },
    { semester: "03", subjectCode: "MA3354", subjectName: "Discrete Mathematics", grade: "B", result: "P" },
    { semester: "03", subjectCode: "CS3352", subjectName: "Foundations of Data Science", grade: "B+", result: "P" },
    { semester: "03", subjectCode: "CS3391", subjectName: "Object Oriented Programming", grade: "B", result: "P" },
    { semester: "03", subjectCode: "CS3351", subjectName: "Digital Principles and Computer Organization", grade: "B+", result: "P" },
    { semester: "03", subjectCode: "GE3361", subjectName: "Professional Development", grade: "O", result: "P" },

    // Semester 04
    { semester: "04", subjectCode: "CS3452", subjectName: "Theory of Computation", grade: "U", result: "F" },
    { semester: "04", subjectCode: "CS3491", subjectName: "Artificial Intelligence and Machine Learning", grade: "C", result: "P" },
    { semester: "04", subjectCode: "CS3492", subjectName: "Database Management Systems", grade: "C", result: "P" },
    { semester: "04", subjectCode: "IT3401", subjectName: "Web Essentials", grade: "B+", result: "P" },
    { semester: "04", subjectCode: "CS3451", subjectName: "Introduction to Operating Systems", grade: "C", result: "P" },
    { semester: "04", subjectCode: "GE3451", subjectName: "Environmental Sciences and Sustainability", grade: "B+", result: "P" },
    { semester: "04", subjectCode: "CS3461", subjectName: "Operating Systems Laboratory", grade: "A+", result: "P" },
    { semester: "04", subjectCode: "CS3481", subjectName: "Database Management Systems Laboratory", grade: "O", result: "P" },

    // Semester 05
    { semester: "05", subjectCode: "CS3591", subjectName: "Computer Networks", grade: "B", result: "P" },
    { semester: "05", subjectCode: "MX3084", subjectName: "Disaster Risk Reduction and Management", grade: "B+", result: "P" },
    { semester: "05", subjectCode: "CS3691", subjectName: "Embedded Systems and IoT", grade: "B", result: "P" },
    { semester: "05", subjectCode: "IT3501", subjectName: "Full Stack Web Development", grade: "B", result: "P" },
    { semester: "05", subjectCode: "CCW331", subjectName: "Business Analytics", grade: "C", result: "F" },
    { semester: "05", subjectCode: "IT3511", subjectName: "Full Stack Web Development Laboratory", grade: "A", result: "P" },
    { semester: "05", subjectCode: "CCS370", subjectName: "UI and UX Design", grade: "B", result: "P" },
    { semester: "05", subjectCode: "CS3551", subjectName: "Distributed Computing", grade: "B", result: "P" },
  ],
}
