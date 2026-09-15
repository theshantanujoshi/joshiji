"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrambleText } from "./ScrambleText";

export function IntroVideo() {
  const [stage, setStage] = useState<"video" | "welcome" | "done">("video");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobileCheck = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

  useEffect(() => {
    if (stage !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  const handleVideoEnd = () => {
    setStage("welcome");
  };

  const handleDiveIn = () => {
    window.dispatchEvent(new CustomEvent("forceAudioPlay"));
    setStage("done");
  };

  const videoSrc = mounted && isMobile ? "/IntroVideoMobile.mp4" : "/IntroVideo.mp4";

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="intro-container"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
        >
          <video
            key={videoSrc}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          <AnimatePresence>
            {stage === "welcome" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <button
                  onClick={handleDiveIn}
                  className="cursor-target group relative px-6 md:px-10 py-4 bg-transparent text-[var(--color-foreground)] font-mono text-xs md:text-sm tracking-[0.2em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl bg-black/40 backdrop-blur-md"
                >
                  {/* Cyberpunk corner brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-[var(--color-accent)] transition-colors duration-300" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40 group-hover:border-[var(--color-accent)] transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40 group-hover:border-[var(--color-accent)] transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-[var(--color-accent)] transition-colors duration-300" />

                  {/* Soft background glow on hover */}
                  <div className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  
                  {/* Button Content */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-[var(--color-accent)] font-bold">&gt;</span>
                    <span className="font-semibold"><ScrambleText text="EXECUTE_BOOT_SEQUENCE" /></span>
                    <span className="w-1.5 h-4 bg-[var(--color-muted-foreground)] group-hover:bg-[var(--color-accent)] animate-pulse" />
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
