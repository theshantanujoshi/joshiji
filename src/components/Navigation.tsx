"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CustomAudioPlayer } from "./CustomAudioPlayer";

const links = [
  { name: "Home", href: "/", key: "h" },
  { name: "Experience", href: "/experience", key: "e" },
  { name: "Projects", href: "/projects", key: "p" },
  { name: "Contact", href: "/contact", key: "c" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is using a modifier key (like Ctrl+C to copy)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      // Ignore if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      const link = links.find((l) => l.key === key);

      if (link && pathname !== link.href) {
        router.push(link.href);
        setToast(`> CD ${link.href.toUpperCase() || '/HOME'}`);
        setTimeout(() => setToast(null), 1500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);

  return (
    <>
      <div className="w-full fixed top-8 md:top-14 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="w-full max-w-5xl border border-white/10 p-2 md:px-6 md:py-3 flex flex-row items-center justify-between bg-[var(--color-card)]/70 backdrop-blur-xl rounded-full shadow-2xl pointer-events-auto transition-all">
          <div className="flex items-center shrink-0 mr-2 md:mr-0 pl-1 md:pl-0">
            <Link href="/" className="no-underline flex items-center gap-3 group">
              <img 
                src="https://github.com/theshantanujoshi.png" 
                alt="Shantanu Joshi" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 group-hover:border-[var(--color-accent)] transition-all duration-300 object-cover group-hover:scale-105" 
              />
              <span className="hidden sm:block text-base font-bold font-mono text-[var(--color-foreground)] tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                Shantanu Joshi
              </span>
            </Link>
          </div>

        <div className="flex gap-1 md:gap-2 min-w-0 items-center justify-end overflow-x-auto overflow-y-hidden md:overflow-visible hide-scrollbar snap-x snap-mandatory">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`cursor-target relative px-3 py-2 md:px-4 md:py-3 min-h-[36px] md:min-h-[44px] flex items-center justify-center text-xs md:text-sm font-medium font-mono transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded-full snap-start shrink-0 ${
                  isActive ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-horizontal"
                    className="absolute inset-0 bg-[var(--color-muted)] rounded-full border border-[var(--color-border)]"
                    initial={false}
                    transition={{
                      type: "spring",
                      bounce: 0,
                      duration: shouldReduceMotion ? 0.01 : 0.4,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  <span className={`${isActive ? "text-[var(--color-accent)]" : "opacity-0 hidden md:inline-block"} transition-opacity duration-200`}>
                    &gt;
                  </span>
                  {link.name} <span className="hidden md:inline-block text-[10px] opacity-50 ml-1">[{link.key.toUpperCase()}]</span>
                </span>
              </Link>
            );
          })}
          <CustomAudioPlayer />
        </div>
      </nav>
      </div>

      {/* Keyboard Navigation Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.3 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--color-foreground)] text-[var(--color-background)] font-mono px-4 py-2 rounded shadow-xl text-sm border border-[var(--color-border)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
