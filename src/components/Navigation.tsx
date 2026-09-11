"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Socials", href: "/socials" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full sticky top-0 border-b border-[var(--color-border)] px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-[var(--color-background)]/90 backdrop-blur-md z-50">
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
                  className="absolute inset-0 bg-[var(--color-muted)] rounded-md border border-[var(--color-border)]"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className={`${isActive ? "text-[var(--color-accent)]" : "opacity-0"} transition-opacity duration-200`}>
                  &gt;
                </span>
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
