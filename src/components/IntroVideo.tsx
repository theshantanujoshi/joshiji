"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroVideo() {
  const [showVideo, setShowVideo] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mobileCheck = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);

    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideo]);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  const videoSrc = mounted && isMobile ? "/IntroVideoMobile.mp4" : "/IntroVideo.mp4";

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
