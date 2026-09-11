import { ScrambleText } from "@/components/ScrambleText";

export default function Home() {
  return (
    <div className="readme-container">
      <h1 className="flex items-center gap-2">
        <span>Hi, I'm <ScrambleText text="Shantanu" /></span>
        <span className="inline-block w-3 h-[0.8em] bg-[var(--color-accent)] animate-pulse"></span>
      </h1>
      
      <div className="readme-card mt-8">
        <h2>About Me</h2>
        <p>
          I'm an AI & Data Science undergrad at IIT Jodhpur and a builder at bits&bytes. I like working on technology that gives people more freedom and control over what they use.
        </p>
        <p>
          I'm less interested in chasing corporate trends or building another layer on top of existing products. I'd rather spend my time making useful, original things that solve real problems.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-bold text-xl text-[var(--color-foreground)]">Current Focus</h3>
        <ul className="space-y-2 text-[var(--color-muted-foreground)]">
          <li>→ Scaling a 1,500+ student dev collective at bits&bytes™</li>
          <li>→ Fostering a builder-first technical community via AWS Student Builder Group</li>
          <li>→ Engineering intuitive frontend architectures and exploring Agentic AI</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-xl text-[var(--color-foreground)] mb-4">Core Stack & Domains</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Artificial Intelligence", "Data Science", "React / Next.js", "Python", 
            "Generative AI", "Quantitative Reasoning", "Narrative Architecture", 
            "Digital Analytics", "Crisis Management"
          ].map((tech) => (
            <span key={tech} className="px-3 py-1 bg-[var(--color-muted)] text-[var(--color-muted-foreground)] rounded-full text-sm font-['Space_Grotesk']">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center gap-4 text-sm font-['Space_Grotesk'] text-[var(--color-muted-foreground)]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
          Open to work
        </span>
        <span>•</span>
        <span>Based in India</span>
      </div>
    </div>
  );
}
