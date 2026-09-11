"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
      <div className="w-full sticky top-6 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="w-full max-w-4xl border border-white/10 px-6 py-3 flex flex-col md:flex-row items-center justify-between bg-[var(--color-card)]/70 backdrop-blur-xl md:rounded-full rounded-3xl shadow-2xl pointer-events-auto transition-all">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="font-['Space_Grotesk'] font-bold text-xl tracking-tight text-[var(--color-foreground)] no-underline hover:text-[var(--color-accent)] transition-colors">
              Shantanu Joshi
            </Link>
          </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium font-['Space_Grotesk'] transition-colors whitespace-nowrap ${
                  isActive ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-horizontal"
                    className="absolute inset-0 bg-[var(--color-muted)] rounded-full border border-[var(--color-border)]"
                    initial={false}
                    transition={{
                      type: "tween",
                      ease: "circOut",
                      duration: 0.25,
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--color-foreground)] text-[var(--color-background)] font-['Space_Grotesk'] px-4 py-2 rounded shadow-xl text-sm border border-[var(--color-border)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
