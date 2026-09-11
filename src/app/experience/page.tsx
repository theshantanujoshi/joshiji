export default function Experience() {
  const experiences = [
    {
      company: "AWS Student Builder Group at IIT Jodhpur",
      roles: [
        {
          title: "Core Member",
          date: "Aug 2026 - Present",
          type: "Hybrid",
          description: "I wear a lot of hats across tech, operations, community, and social media. From helping run hands-on AWS workshops and coordinating events to growing campus outreach and shaping content, I enjoy connecting strategy with execution. At the heart of it, I'm focused on building a strong cloud-native builder community.",
          skills: ["Community Building", "Event Management", "AWS"]
        }
      ]
    },
    {
      company: "bits&bytes™",
      roles: [
        {
          title: "Head of Ground Operations",
          date: "May 2026 - Present",
          type: "Full-time • Hybrid",
          description: "Handling ground logistics, infrastructure setup, and floor coordination, keeping everything running smoothly and the energy high.",
          skills: ["Event Management", "Cross-functional Team Leadership"]
        },
        {
          title: "Creative Contributor & Content Writer",
          date: "Apr 2026 - May 2026",
          type: "",
          description: "I turn technical work into clear, engaging stories that people can understand.",
          skills: ["Brand Strategy", "Content Writing"]
        }
      ]
    },
    {
      company: "XFRUS",
      roles: [
        {
          title: "Web Engineer Lead",
          date: "Jul 2025 - Nov 2025",
          type: "Lucknow, India • Hybrid",
          description: "Engineered the secure frontend architecture for a post incident cybercrime support system, building optimized, intuitive interfaces to assist victims under high pressure scenarios.",
          skills: ["Front-End Development", "GitHub", "Architecture"]
        }
      ]
    },
    {
      company: "Tata Group",
      roles: [
        {
          title: "Generative AI Engineer (Internship)",
          date: "Jul 2025 - Aug 2025",
          type: "Internship",
          description: "Completed a job simulation involving AI-powered data analytics and strategy development for the Financial Services team at Tata iQ. Conducted exploratory data analysis (EDA) using GenAI tools to assess data quality and identify risk indicators. Designed an AI-driven collections strategy leveraging agentic AI and automation, incorporating ethical AI principles and regulatory compliance.",
          skills: ["Strategic Thinking", "Exploratory Data Analysis", "Generative AI"]
        }
      ]
    },
    {
      company: "JPMorganChase",
      roles: [
        {
          title: "Quantitative Researcher (Internship)",
          date: "Jun 2025 - Jul 2025",
          type: "Internship",
          description: "Focused on quantitative research methods, analyzed a book of loans to estimate a customer's probability of default and used dynamic programming to convert FICO scores into categorical data to predict defaults.",
          skills: ["Statistics", "Data Analysis", "Dynamic Programming"]
        }
      ]
    }
  ];

  return (
    <div className="readme-container">
      <h1>Experience</h1>

      <div className="mt-8 space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="readme-card relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            
            <h3 className="text-xl font-bold font-mono text-[var(--color-foreground)] mb-4">{exp.company}</h3>
            
            <div className="space-y-6">
              {exp.roles.map((role, roleIdx) => (
                <div key={roleIdx} className="relative">
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h4 className="font-semibold text-base text-[var(--color-foreground)]">{role.title}</h4>
                    <span className="text-[var(--color-muted-foreground)] text-sm font-mono">{role.date}</span>
                  </div>
                  
                  {role.type && <p className="text-sm text-[var(--color-accent)] mb-2">{role.type}</p>}
                  
                  <p className="text-[var(--color-muted-foreground)] text-sm mb-3 leading-relaxed">
                    {role.description}
                  </p>
                  
                  {role.skills && role.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {role.skills.map(skill => (
                        <span key={skill} className="text-xs px-2 py-1 bg-[var(--color-muted)] rounded text-[var(--color-muted-foreground)] font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold font-mono text-[var(--color-foreground)] mt-16 mb-8 border-b border-[var(--color-border)] pb-4">Education</h2>
      <div className="space-y-6">
        <div className="readme-card group hover:border-[var(--color-accent)] transition-colors">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">IIT Jodhpur</h3>
            <span className="text-[var(--color-muted-foreground)] text-sm font-mono">Aug 2024 — Aug 2028</span>
          </div>
          <p className="text-[var(--color-muted-foreground)]">BS. Artificial Intelligence & Data Science</p>
        </div>
        <div className="readme-card group hover:border-[var(--color-accent)] transition-colors">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">Rani Laxmi Bai Memorial School</h3>
            <span className="text-[var(--color-muted-foreground)] text-sm font-mono">Apr 2020 — Apr 2024</span>
          </div>
          <p className="text-[var(--color-muted-foreground)]">High School & Intermediate Education</p>
        </div>
        <div className="readme-card group hover:border-[var(--color-accent)] transition-colors">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">City Montessori School, Lucknow</h3>
            <span className="text-[var(--color-muted-foreground)] text-sm font-mono">Apr 2015 — Apr 2020</span>
          </div>
          <p className="text-[var(--color-muted-foreground)]">Middle School Education</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold font-mono text-[var(--color-foreground)] mt-16 mb-8 border-b border-[var(--color-border)] pb-4">Volunteering & Memberships</h2>
      <div className="space-y-6">
        <div className="readme-card relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">Google Cloud & NVIDIA</h3>
            <span className="text-[var(--color-muted-foreground)] text-sm font-mono">Jun 2026 — Present</span>
          </div>
          <p className="text-[var(--color-accent)] font-medium mb-2">Member</p>
        </div>
        <div className="readme-card relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">Hack4Good</h3>
            <span className="text-[var(--color-muted-foreground)] text-sm font-mono">Apr 2026 — Present</span>
          </div>
          <p className="text-[var(--color-accent)] font-medium mb-2">Volunteer</p>
          <p className="text-[var(--color-muted-foreground)] text-sm">Coordinated logistics and real-time social media content.</p>
        </div>
        <div className="readme-card relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">Google Developer Groups Lucknow</h3>
            <span className="text-[var(--color-muted-foreground)] text-sm font-mono">Nov 2025 — Present</span>
          </div>
          <p className="text-[var(--color-accent)] font-medium mb-2">Member</p>
          <p className="text-[var(--color-muted-foreground)] text-sm">Participating in frontend dev tasks and local tech events.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold font-mono text-[var(--color-foreground)] mt-16 mb-8 border-b border-[var(--color-border)] pb-4">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Notion Essentials Badge", issuer: "Notion", date: "Jun 2026" },
          { name: "Prompt Design in Vertex AI", issuer: "Google", date: "Jun 2026" },
          { name: "Introduction to Responsible AI", issuer: "Google", date: "May 2026" },
          { name: "Introduction to Large Language Models", issuer: "Google", date: "May 2026" },
          { name: "Introduction to Generative AI", issuer: "Google", date: "May 2026" },
          { name: "Pandas", issuer: "Kaggle", date: "Dec 2025" },
          { name: "Python", issuer: "Kaggle", date: "Dec 2025" },
          { name: "Analytics", issuer: "Google", date: "Jul 2025" },
          { name: "Campaign Manager 360", issuer: "Google", date: "Jul 2025" },
        ].map((cert, idx) => (
          <div key={idx} className="readme-card group hover:border-[var(--color-accent)] transition-colors !mb-0 p-4">
            <div className="flex flex-col">
              <h3 className="font-semibold text-[var(--color-foreground)] font-mono leading-tight mb-2">{cert.name}</h3>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-[var(--color-muted-foreground)] bg-[var(--color-muted)] px-2 py-1 rounded">{cert.issuer}</span>
                <span className="text-xs text-[var(--color-muted-foreground)] font-mono">{cert.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
