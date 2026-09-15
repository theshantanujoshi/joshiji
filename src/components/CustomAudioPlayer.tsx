"use client";

import { useState, useRef, useEffect } from "react";
import { SkipForward, SkipBack } from "lucide-react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string; // e.g., '/music/track1.mp3'
  cover: string; // e.g., '/music/cover1.jpg'
  color: string;
}

export const playlist: Track[] = [
  {
    id: "1",
    title: "Strawberry Huracan",
    artist: "MASN",
    src: "/music/Track1/Strawberry Huracan.mp3", 
    cover: "/music/Track1/Strawberry-Huracan.webp",
    color: "#00E5FF", // Electric Blue
  },
  {
    id: "2",
    title: "AOK",
    artist: "Tai Verdes",
    src: "/music/Track2/AOK.mp3", 
    cover: "/music/Track2/AOK.webp",
    color: "#39FF14", // Toxic Green
  },
  {
    id: "3",
    title: "turn out fine",
    artist: "The Astronomers, sammy rash",
    src: "/music/Track3/turn out fine (with sammy rash).mp3", 
    cover: "/music/Track3/turn_out_fine.webp",
    color: "#FF007F", // Neon Pink
  },
  {
    id: "4",
    title: "Mister Mister",
    artist: "Mishaal Tamer",
    src: "/music/Track4/Mister Mister.mp3", 
    cover: "/music/Track4/Mister_Mister.webp",
    color: "#FFE600", // Pure Yellow
  },
  {
    id: "5",
    title: "JETSKI",
    artist: "Internet Money, Lil Tecca, Lil Mosey",
    src: "/music/Track5/JETSKI.mp3", 
    cover: "/music/Track5/JETSKI.webp",
    color: "#8A2BE2", // Deep Violet
  },
  {
    id: "6",
    title: "Reminder",
    artist: "The Weeknd",
    src: "/music/Track6/Reminder.mp3", 
    cover: "/music/Track6/Reminder.webp",
    color: "#FF5E00", // Bright Orange
  },
  {
    id: "7",
    title: "Sicko Drop",
    artist: "KVSH, Schillist",
    src: "/music/Track7/Sicko Drop.mp3", 
    cover: "/music/Track7/Sicko_Drop.webp",
    color: "#00FFB2", // Seafoam / Mint
  },
  {
    id: "8",
    title: "War?",
    artist: "System Of A Down",
    src: "/music/Track8/War.mp3", 
    cover: "/music/Track8/War.webp",
    color: "#E60000", // True Crimson
  },
  {
    id: "9",
    title: "Fight the Vegans",
    artist: "WILLIS",
    src: "/music/Track9/Fight the Vegans.mp3", 
    cover: "/music/Track9/Fight_the_Vegans.webp",
    color: "#D500FF", // Laser Purple
  },
  {
    id: "10",
    title: "find your own",
    artist: "Humble the Great",
    src: "/music/Track10/find your own.mp3", 
    cover: "/music/Track10/find_your_own.webp",
    color: "#FFB300", // Amber Gold
  }
];

export function CustomAudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const savedIndex = sessionStorage.getItem("randomTrackIndex");
    let initialIndex = 0;
    if (savedIndex !== null) {
      initialIndex = parseInt(savedIndex, 10);
      setCurrentTrackIndex(initialIndex);
    } else {
      initialIndex = Math.floor(Math.random() * playlist.length);
      setCurrentTrackIndex(initialIndex);
      sessionStorage.setItem("randomTrackIndex", initialIndex.toString());
    }
    setIsMounted(true);
    
    // Dispatch initial color immediately on mount
    if (playlist[initialIndex]?.color) {
      window.dispatchEvent(new CustomEvent("themeChange", { detail: { color: playlist[initialIndex].color } }));
      (window as any).__themeColor = playlist[initialIndex].color;
      document.documentElement.style.setProperty("--color-accent", playlist[initialIndex].color);
    }

    // Attempt to autoplay on load
    setIsPlaying(true);
  }, []);

  const track = playlist[currentTrackIndex];

  // Also dispatch whenever track changes
  useEffect(() => {
    if (track && track.color) {
      window.dispatchEvent(new CustomEvent("themeChange", { detail: { color: track.color } }));
      (window as any).__themeColor = track.color;
      document.documentElement.style.setProperty("--color-accent", track.color);
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => handleNext();

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  const hasInteractedRef = useRef(false);

  // Handle browser autoplay policy by waiting for the first user interaction
  useEffect(() => {
    const forcePlay = () => {
      hasInteractedRef.current = true;
      if (audioRef.current && audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }
      setIsPlaying(true);
    };

    window.addEventListener("forceAudioPlay", forcePlay);

    const handleFirstInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      
      // Call play() synchronously inside the event handler to satisfy strict browser policies
      if (audioRef.current && audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
             // Silently catch if it still fails
          });
        }
      }
      
      setIsPlaying(true);
      
      // Remove listeners once interacted
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    if (!hasInteractedRef.current) {
      window.addEventListener("click", handleFirstInteraction);
      window.addEventListener("keydown", handleFirstInteraction);
      window.addEventListener("touchstart", handleFirstInteraction);
      window.addEventListener("scroll", handleFirstInteraction, { once: true });
    }

    return () => {
      window.removeEventListener("forceAudioPlay", forcePlay);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []); // Run only once on mount

  const togglePlay = () => {
    hasInteractedRef.current = true;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }
    }
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    hasInteractedRef.current = true;
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    // Note: track change updates the src, so the useEffect handles playing the new track.
    // The interaction bit might be lost here, but since the user has already interacted,
    // the domain should be whitelisted for autoplay for this session.
  };

  const handlePrev = () => {
    hasInteractedRef.current = true;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const playPromiseRef = useRef<Promise<void> | void>(undefined);

  // Single source of truth for playing/pausing to avoid AbortError
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    
    if (isPlaying) {
      playPromiseRef.current = audio.play();
      if (playPromiseRef.current !== undefined) {
        playPromiseRef.current.catch((err) => {
          if (err.name !== "AbortError") {
             // Browsers block autoplay without interaction. Suppress the noisy console error for this specific case.
             if (err.name !== "NotAllowedError") {
               console.error("Playback error:", err);
             }
             setIsPlaying(false);
          }
        });
      }
    } else {
      if (playPromiseRef.current !== undefined) {
        playPromiseRef.current.then(() => {
          audio.pause();
        }).catch(() => {
          // Play promise was rejected (e.g. AbortError), no need to pause
        });
      } else {
        audio.pause();
      }
    }
  }, [currentTrackIndex, isPlaying]);

  if (!isMounted || !track) return null;

  return (
    <div className="flex items-center gap-1 md:gap-2 ml-2 pl-2 border-l border-[var(--color-border)] shrink-0 snap-start">
      <button onClick={handlePrev} className="cursor-target text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors p-1">
        <SkipBack className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </button>
      <button onClick={togglePlay} className="cursor-target relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden group hover:ring-2 ring-[var(--color-accent)] transition-all shrink-0 shadow-sm" title={track.title}>
        <img src={track.cover} alt={track.title} className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} crossOrigin="anonymous" />
      </button>
      <button onClick={handleNext} className="cursor-target text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors p-1">
        <SkipForward className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </button>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} src={track.src || undefined} preload="metadata" />
    </div>
  );
}
