import SignatureAnimation from "./SignatureAnimation";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] mt-auto bg-[var(--color-background)] overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-[var(--spacing-md)] py-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 text-sm text-[var(--color-muted-foreground)] font-['Space_Grotesk']">
        
        {/* Left: Copyright */}
        <div className="md:w-1/3 flex justify-center md:justify-start order-3 md:order-1">
          <p>© {new Date().getFullYear()} Popolio. All rights reserved.</p>
        </div>

        <div className="md:w-1/3 flex justify-center items-center order-1 md:order-2">
          <div className="scale-75 md:scale-90 origin-center h-[50px] flex items-center justify-center">
            <SignatureAnimation duration={0.8} delay={0.1}>
              Shantanu Joshi
            </SignatureAnimation>
          </div>
        </div>

        {/* Right: Socials */}
        <div className="md:w-1/3 flex justify-center md:justify-end gap-6 order-2 md:order-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors">LinkedIn</a>
        </div>
        
      </div>
    </footer>
  );
}
