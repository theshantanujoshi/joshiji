import SignatureAnimation from "./SignatureAnimation";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] mt-auto bg-transparent overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-[var(--spacing-md)] py-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 text-sm text-[var(--color-muted-foreground)] font-['Space_Grotesk']">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center md:items-start order-2 md:order-1 gap-1">
          <p>© {new Date().getFullYear()} Shantanu Joshi. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted-foreground)]"></span>
            Based in India
          </p>
        </div>

        {/* Right: Signature */}
        <div className="flex justify-center md:justify-end items-center order-1 md:order-2">
          <div className="scale-75 md:scale-90 origin-right h-[50px] flex items-center justify-end">
            <SignatureAnimation duration={0.8} delay={0.1}>
              Shantanu Joshi
            </SignatureAnimation>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
