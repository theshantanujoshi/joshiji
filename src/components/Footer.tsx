import SignatureAnimation from "./SignatureAnimation";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] mt-auto bg-transparent overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-[var(--spacing-md)] py-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 text-sm text-[var(--color-muted-foreground)] font-['Space_Grotesk']">
        
        {/* Left: Copyright */}
        <div className="flex justify-center md:justify-start flex-1 order-3 md:order-1">
          <p>© {new Date().getFullYear()} Shantanu Joshi</p>
        </div>

        {/* Center: Signature */}
        <div className="flex justify-center items-center flex-1 order-1 md:order-2">
          <div className="scale-75 md:scale-90 h-[50px] flex items-center justify-center">
            <SignatureAnimation duration={0.8} delay={0.1}>
              Shantanu Joshi
            </SignatureAnimation>
          </div>
        </div>

        {/* Right: All Rights Reserved */}
        <div className="flex justify-center md:justify-end flex-1 order-2 md:order-3">
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
