"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, AnimatePresence, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";

export function GlobalDelight() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [sudoMode, setSudoMode] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input reliably when opened
  useEffect(() => {
    if (cmdkOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [cmdkOpen]);

  // Reset selection when search changes or palette opens
  useEffect(() => {
    setSelectedIndex(0);
  }, [search, cmdkOpen]);

  const commands = [
    { id: "home", label: "Go to Home", action: () => router.push("/") },
    { id: "experience", label: "View Experience", action: () => router.push("/experience") },
    { id: "projects", label: "View Projects", action: () => router.push("/projects") },
    { id: "contact", label: "Contact & Socials", action: () => router.push("/contact") },
    { id: "resume", label: "Download Resume", action: () => window.open("/Shantanu_Joshi_Resume.pdf", "_blank") },
    { id: "sudo", label: "Toggle Sudo Mode", action: () => setSudoMode(p => !p) },
    { id: "whoami", label: "whoami", action: () => alert("> I am Shantanu Joshi. Nice to meet you.") },
  ];

  const filteredCommands = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  // Sudo Sequence and Favicon logic
  useEffect(() => {
    // 1. Dynamic Favicon
    const originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "> Connection lost...";
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 2. Sudo Easter Egg
    let sequence = "";
    const konamiCode = "sudo";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K Palette (or Cmd+/ as backup for Chrome Windows)
      if ((e.metaKey || e.ctrlKey) && (e.key.toLowerCase() === "k" || e.key === "/")) {
        e.preventDefault();
        setCmdkOpen((prev) => !prev);
        return;
      }
      
      // Escape closes palette
      if (e.key === "Escape") {
        setCmdkOpen(false);
        return;
      }

      // Ignore sequence if typing in input or using modifier keys
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      sequence += e.key.toLowerCase();
      if (sequence.length > konamiCode.length) {
        sequence = sequence.slice(1);
      }

      if (sequence === konamiCode) {
        setSudoMode((prev) => !prev);
        sequence = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Apply Sudo Theme
  useEffect(() => {
    if (sudoMode) {
      document.body.classList.add("sudo-crt");
      document.documentElement.style.setProperty("--color-background", "#09090B");
      document.documentElement.style.setProperty("--color-foreground", "#FFB000");
      document.documentElement.style.setProperty("--color-muted", "#2A1D00");
      document.documentElement.style.setProperty("--color-border", "#5C3D00");
      document.documentElement.style.setProperty("--color-accent", "#FFB000");
      document.documentElement.style.setProperty("--color-muted-foreground", "#D98E00");
    } else {
      document.body.classList.remove("sudo-crt");
      document.documentElement.style.removeProperty("--color-background");
      document.documentElement.style.removeProperty("--color-foreground");
      document.documentElement.style.removeProperty("--color-muted");
      document.documentElement.style.removeProperty("--color-border");
      document.documentElement.style.removeProperty("--color-accent");
      document.documentElement.style.removeProperty("--color-muted-foreground");
    }
  }, [sudoMode]);

  // Global mouse position and console greeting
  useEffect(() => {
    console.log(
      "%c Shantanu Joshi \n%cBuilder & Agentic AI Engineer\n%c=========================\n%c> System initialized.\n> Type 'sudo' anywhere on the page to gain root.",
      "font-size: 24px; font-weight: bold; color: #EF4444;",
      "font-size: 14px; color: #A1A1AA;",
      "color: #475569;",
      "color: #FFB000; font-family: monospace;"
    );

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
      setCmdkOpen(false);
      setSearch("");
    }
  };

  return (
    <>
      {/* Terminal Scrollbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-accent)] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Cmd+K Palette */}
      <AnimatePresence>
        {cmdkOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCmdkOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl shadow-2xl overflow-hidden font-['Space_Grotesk'] flex flex-col"
            >
              <div className="flex items-center px-4 py-3 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-muted-foreground)] mr-2">&gt;</span>
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)]"
                />
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setCmdkOpen(false);
                        setSearch("");
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-[var(--color-foreground)] transition-colors flex justify-between group ${
                        idx === selectedIndex ? "bg-[var(--color-muted)]" : "hover:bg-[var(--color-muted)]/50"
                      }`}
                    >
                      <span>{cmd.label}</span>
                      <span className={`text-[var(--color-muted-foreground)] transition-opacity ${idx === selectedIndex ? "opacity-100" : "opacity-0"}`}>↵</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-[var(--color-muted-foreground)]">
                    No commands found.
                  </div>
                )}
              </div>
              <div className="px-4 py-2 bg-[var(--color-muted)] border-t border-[var(--color-border)] text-xs text-[var(--color-muted-foreground)] flex justify-between">
                <span>Use arrows to navigate</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
