import { ScrambleText } from "@/components/ScrambleText";

export default function Home() {
  return (
    <div className="readme-container pt-8 relative z-10">
      <div className="mb-24 md:mb-32 mt-8 md:mt-12 relative group cursor-default">
        <h1 className="!border-0 !m-0 !p-0 flex flex-col text-[15vw] sm:text-[12vw] md:text-[7.5rem] font-black leading-[0.85] tracking-tighter uppercase text-[var(--color-foreground)] select-none">
          <span className="block opacity-20 hover:opacity-100 transition-opacity duration-500">SYSTEMS.</span>
          <span className="block opacity-20 hover:opacity-100 transition-opacity duration-500">AGENTS.</span>
          <span className="block flex items-end gap-2 md:gap-4 text-[var(--color-accent)]">
            <ScrambleText text="SHANTANU" />
            <span className="inline-block w-[6vw] sm:w-[5vw] md:w-[3.5rem] h-[0.7em] bg-[var(--color-accent)] motion-safe:animate-pulse mb-[1.5vw] sm:mb-[1vw] md:mb-[0.5rem]"></span>
          </span>
        </h1>
        
        <div className="mt-8 md:mt-12 font-mono text-xs md:text-sm text-[var(--color-muted-foreground)] tracking-widest uppercase flex flex-col sm:flex-row gap-3 sm:gap-6 border-l-2 border-[var(--color-accent)] pl-4 md:pl-6">
          <span className="opacity-75">AI & Data Science @ IIT Jodhpur</span>
          <span className="hidden sm:inline-block text-[var(--color-border)]">///</span>
          <span className="text-[var(--color-foreground)] font-bold tracking-[0.25em]">Core @ bits&bytes</span>
        </div>
      </div>
      
      <div className="readme-card mt-8">
        <h2>About Me</h2>
        <p>
          I'm an AI & Data Science undergrad at Indian Institute of Technology, Jodhpur and a core builder at bits&bytes. I build original systems, not just wrappers for whatever API is trending this week.
        </p>
        <p>
          I don't care about chasing industry hype. I just want to write good code and build tools that actually solve problems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="readme-card m-0 flex flex-col">
          <h2>Current Focus</h2>
          <ul className="flex-1">
            <li>Scaling a 1,500+ student dev collective at bits&bytes™</li>
            <li>Fostering a builder-first technical community via AWS Student Builder Group</li>
            <li>Engineering intuitive frontend architectures and exploring Agentic AI</li>
          </ul>
        </div>

        <div className="readme-card m-0 flex flex-col">
          <h2>Core Stack & Domains</h2>
          <div className="flex flex-wrap gap-2 flex-1 content-start mt-2">
            {[
              "Artificial Intelligence", "Data Science", "React / Next.js", "Python", 
              "Generative AI", "Quantitative Reasoning", "Narrative Architecture", 
              "Digital Analytics", "Crisis Management"
            ].map((tech) => (
              <span key={tech} className="cursor-target px-3 py-1 bg-[var(--color-muted)] text-[var(--color-foreground)] border border-[var(--color-border)] rounded-full text-xs font-mono transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="readme-card m-0 md:col-span-2 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          <div className="flex-1">
            <h2>Beyond the screen</h2>
            <div className="text-sm [&>p:last-child]:mb-0">
              <p>
                I want to build tools that give people control over their digital lives. Most of the time, that just means deleting things until the interface gets entirely out of the user's way.
              </p>
              <p>
                When I step away from the keyboard, I'm usually reading sci-fi or digging through random open-source repos. I try to stay curious. The best code usually comes from caring about how systems work in the real world, not just on a screen.
              </p>
            </div>
          </div>
          
          <div className="hidden md:block w-px bg-[var(--color-border)] shrink-0 self-stretch my-2"></div>
          <div className="block md:hidden h-px w-full bg-[var(--color-border)] shrink-0 my-2"></div>

          <div className="shrink-0 w-full md:w-1/4 flex flex-col justify-center">
            <p className="font-mono text-xs text-[var(--color-muted-foreground)] mb-3 tracking-wider">OTHER INTERESTS</p>
            <ul className="text-sm space-y-2.5 text-[var(--color-foreground)]">
              <li className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50"></span> English Literature</li>
              <li className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50"></span> Design</li>
              <li className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50"></span> Football</li>
              <li className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50"></span> Comp Sci Documentaries</li>
              <li className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50"></span> Webtoons</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
