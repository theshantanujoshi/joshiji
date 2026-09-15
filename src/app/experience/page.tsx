import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Shantanu Joshi's professional experience, internships, and education.",
};

export default function Experience() {
  const experiences = [
    {
      company: "AWS Student Builder Group at IIT Jodhpur",
      roles: [
        {
          title: "Core Member",
          date: "Aug 2026 - Present",
          type: "Hybrid",
          description: "Wear multiple hats spanning engineering, operations, and community growth. From running hands-on AWS workshops to scaling campus outreach, I bridge the gap between technical strategy and execution to build a robust cloud-native community.",
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
          description: "Manage ground logistics, infrastructure, and event operations to ensure smooth execution and high engagement.",
          skills: ["Event Management", "Cross-functional Team Leadership"]
        },
        {
          title: "Creative Contributor & Content Writer",
          date: "Apr 2026 - May 2026",
          type: "",
          description: "Translate complex technical concepts into clear, engaging narratives for a broad audience.",
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
          description: "Engineered the secure frontend architecture for a post-incident cybercrime support system. Designed optimized, intuitive interfaces to assist victims in high-pressure scenarios.",
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
          description: "Executed a job simulation in AI-driven data analytics for Tata iQ's Financial Services team. Leveraged GenAI tools for exploratory data analysis to identify risk indicators. Designed an automated collections strategy using Agentic AI, balancing operational efficiency with ethical compliance.",
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
          description: "Applied quantitative research methods to analyze a loan portfolio, estimating customer default probabilities. Utilized dynamic programming to categorize FICO scores and enhance default prediction models.",
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
                  
                  <p className="text-[var(--color-foreground)] text-sm mb-3 leading-relaxed">
                    {role.description}
                  </p>
                  
                  {role.skills && role.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {role.skills.map(skill => (
                        <span key={skill} className="cursor-target text-xs px-2 py-1 bg-[var(--color-muted)] rounded text-[var(--color-foreground)] font-mono hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] border border-transparent transition-colors">
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
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">Indian Institute of Technology, Jodhpur</h3>
            <span className="text-[var(--color-muted-foreground)] text-sm font-mono">Aug 2024 — Aug 2028</span>
          </div>
          <p className="text-[var(--color-muted-foreground)]">BS. Artificial Intelligence & Data Science</p>
        </div>
        <div className="readme-card group hover:border-[var(--color-accent)] transition-colors">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <h3 className="text-lg font-bold font-mono text-[var(--color-foreground)]">RLBMSSS, Lucknow</h3>
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
          <div key={idx} className="cursor-target readme-card group hover:border-[var(--color-accent)] transition-colors !mb-0 p-4">
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
