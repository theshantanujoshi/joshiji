"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useMotionTemplate } from "framer-motion";
import { ScrambleText } from "./ScrambleText";
import { FastAverageColor } from "fast-average-color";

function InitializeOverlay({ onComplete }: { onComplete: () => void }) {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const progress = useMotionValue(0);
  const controlsRef = useRef<any>(null);
  const completedRef = useRef(false);

  // Derived values for visual intensity
  const opacity = useTransform(progress, [0, 100], [0.6, 1]);
  const scale = useTransform(progress, [0, 100], [1, 1.05]);
  const bgOpacity = useTransform(progress, [0, 100], [0.2, 0.9]);
  const barWidth = useTransform(progress, v => `${v}%`);
  
  // Dynamic glow and brightness for higher peak brightness
  const blurBase = useTransform(progress, [0, 100], [0, 24]);
  const blurCore = useTransform(progress, [0, 100], [0, 8]);
  const dynamicTextShadow = useMotionTemplate`0px 0px ${blurBase}px var(--color-accent), 0px 0px ${blurCore}px #ffffff`;
  const dynamicBoxShadow = useMotionTemplate`0px 0px ${blurBase}px var(--color-accent), 0px 0px ${blurCore}px #ffffff`;
  const brightness = useTransform(progress, [0, 100], [1, 1.5]);
  const dynamicFilter = useMotionTemplate`brightness(${brightness})`;
  
  const startHold = () => {
    if (completedRef.current) return;
    setIsHolding(true);
    controlsRef.current = animate(progress, 100, {
      duration: 1.5,
      ease: "linear",
      onUpdate: (latest) => {
        if (latest >= 100 && !completedRef.current) {
          completedRef.current = true;
          setIsCompleted(true);
          onComplete();
        }
      }
    });
  };

  const endHold = () => {
    if (completedRef.current) return;
    setIsHolding(false);
    if (controlsRef.current) {
      controlsRef.current.stop();
    }
    animate(progress, 0, { duration: 0.3, ease: "easeOut" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center select-none"
      style={{ touchAction: 'none', WebkitTouchCallout: 'none' }}
      onPointerDown={startHold}
      onPointerUp={endHold}
      onPointerLeave={endHold}
      onPointerCancel={endHold}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Dynamic background darken */}
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: bgOpacity }}
      />
      
      <motion.div 
        style={{ scale, filter: dynamicFilter, pointerEvents: isCompleted ? "none" : "auto" }}
        className={`relative flex flex-col items-center gap-6 p-8 rounded-2xl ${isCompleted ? "" : "cursor-target"}`}
      >
        <motion.div 
          animate={isHolding ? { 
            x: [-1, 1, -1, 1, 0],
            y: [1, -1, 1, -1, 0]
          } : { x: 0, y: 0 }}
          transition={isHolding ? { repeat: Infinity, duration: 0.1 } : undefined}
          className="font-mono text-base md:text-xl tracking-[0.2em] lowercase font-semibold"
          style={{ 
            opacity, 
            color: "var(--color-accent)",
            textShadow: isHolding ? dynamicTextShadow : "none" 
          }}
        >
          hold to initialize...
        </motion.div>
        
        {/* Brutalist Progress Bar */}
        <div className="w-72 md:w-96 h-[3px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 bottom-0"
            style={{ 
              width: barWidth, 
              backgroundColor: "var(--color-accent)",
              boxShadow: isHolding ? dynamicBoxShadow : "none"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function IntroVideo() {
  const [stage, setStage] = useState<"video" | "initialize" | "done">("video");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const realAccentRef = useRef<string>("");

  useEffect(() => {
    setMounted(true);
    const mobileCheck = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
    
    realAccentRef.current = document.documentElement.style.getPropertyValue("--color-accent");
    const handleThemeChange = (e: any) => {
      realAccentRef.current = e.detail;
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const videoSrc = mounted && isMobile ? "/IntroVideoMobile.mp4" : "/IntroVideo.mp4";

  const restoreAccent = () => {
    if (realAccentRef.current) {
      document.documentElement.style.setProperty("--color-accent", realAccentRef.current);
    } else {
      document.documentElement.style.removeProperty("--color-accent");
    }
  };

  useEffect(() => {
    if (stage !== "video" || !videoRef.current || !mounted) {
      if (stage === "done") {
        restoreAccent();
      }
      return;
    }
    
    const fac = new FastAverageColor();
    const video = videoRef.current;
    
    let animFrame: number;
    let lastTime = 0;
    
    const updateColor = (timestamp: number) => {
      if (timestamp - lastTime > 150) {
        if (!video.paused && !video.ended) {
          try {
            const color = fac.getColor(video);
            document.documentElement.style.setProperty("--color-accent", color.hex);
          } catch (e) {
            // ignore
          }
        }
        lastTime = timestamp;
      }
      animFrame = requestAnimationFrame(updateColor);
    };
    
    const startTimeout = setTimeout(() => {
      animFrame = requestAnimationFrame(updateColor);
    }, 500);
    
    return () => {
      clearTimeout(startTimeout);
      if (animFrame) cancelAnimationFrame(animFrame);
      restoreAccent();
    };
  }, [stage, mounted, videoSrc]);

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
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setStage("initialize");
  };

  const handleDiveIn = () => {
    if (typeof (window as any).__playAudio === "function") {
      (window as any).__playAudio();
    } else {
      window.dispatchEvent(new CustomEvent("forceAudioPlay"));
    }
    setStage("done");
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="intro-container"
          id="intro-container"
          exit={{ opacity: 0, scale: 1.1, pointerEvents: "none" }} // shattering scale out
          transition={{ duration: 0.15, ease: "easeOut" }} // Fast snappy shatter transition
          className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            muted
            playsInline
            crossOrigin="anonymous"
            onEnded={handleVideoEnd}
            onClick={handleVideoEnd}
            className="w-full h-full object-cover cursor-pointer"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {stage === "video" && isMobile && (
            <div 
              className="absolute bottom-12 text-white/50 font-mono text-sm tracking-widest animate-pulse pointer-events-none"
            >
              [tap to skip]
            </div>
          )}

          <AnimatePresence>
            {stage === "initialize" && (
              <InitializeOverlay onComplete={handleDiveIn} />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
