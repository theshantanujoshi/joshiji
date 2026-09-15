"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function GlobalDelight() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [sudoMode, setSudoMode] = useState(false);

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
      document.documentElement.style.setProperty("--color-muted-foreground", "#E5A000");
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

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Terminal Scrollbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-accent)] origin-left z-[100]"
        style={{ scaleX }}
      />
    </>
  );
}
