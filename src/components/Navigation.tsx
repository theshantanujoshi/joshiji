"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

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
      <div className="w-full sticky top-6 z-50 flex justify-center px-4 mt-6 pointer-events-none">
        <nav className="w-full max-w-4xl border border-white/10 px-6 py-3 flex flex-col md:flex-row items-center justify-between bg-[var(--color-card)]/70 backdrop-blur-xl md:rounded-full rounded-3xl shadow-2xl pointer-events-auto transition-all">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="no-underline flex items-center gap-3 group">
              <img 
                src="https://github.com/theshantanujoshi.png" 
                alt="Shantanu Joshi" 
                className="w-10 h-10 rounded-full border border-white/20 group-hover:border-[var(--color-accent)] transition-all duration-300 object-cover group-hover:scale-105" 
              />
              <span className="text-base font-bold font-mono text-[var(--color-foreground)] tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                Shantanu Joshi
              </span>
            </Link>
          </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-3 min-h-[44px] flex items-center justify-center text-sm font-medium font-mono transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] rounded-full ${
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
                <span className="relative z-10 flex items-center gap-2">
                  <span className={`${isActive ? "text-[var(--color-accent)]" : "opacity-0"} transition-opacity duration-200`}>
                    &gt;
                  </span>
                  {link.name} <span className="hidden md:inline-block text-[10px] opacity-50 ml-1">[{link.key.toUpperCase()}]</span>
                </span>
              </Link>
            );
          })}
          {/* Spacer to prevent scrollbar jump on right-most item bounce */}
          <div className="w-2 flex-shrink-0 hidden md:block" />
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
