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
    color: "#FF1493", // Deep Pink
  },
  {
    id: "2",
    title: "AOK",
    artist: "Tai Verdes",
    src: "/music/Track2/AOK.mp3", 
    cover: "/music/Track2/AOK.webp",
    color: "#00FFFF", // Cyan
  },
  {
    id: "3",
    title: "turn out fine",
    artist: "The Astronomers, sammy rash",
    src: "/music/Track3/turn out fine (with sammy rash).mp3", 
    cover: "/music/Track3/turn_out_fine.webp",
    color: "#FF8C00", // Dark Orange
  },
  {
    id: "4",
    title: "Mister Mister",
    artist: "Mishaal Tamer",
    src: "/music/Track4/Mister Mister.mp3", 
    cover: "/music/Track4/Mister_Mister.webp",
    color: "#E2A97E", // Desert Sand
  },
  {
    id: "5",
    title: "JETSKI",
    artist: "Internet Money, Lil Tecca, Lil Mosey",
    src: "/music/Track5/JETSKI.mp3", 
    cover: "/music/Track5/JETSKI.webp",
    color: "#87CEFA", // Light Sky Blue
  },
  {
    id: "6",
    title: "Reminder",
    artist: "The Weeknd",
    src: "/music/Track6/Reminder.mp3", 
    cover: "/music/Track6/Reminder.webp",
    color: "#EF4444", // Vibrant Red
  },
  {
    id: "7",
    title: "Sicko Drop",
    artist: "KVSH, Schillist",
    src: "/music/Track7/Sicko Drop.mp3", 
    cover: "/music/Track7/Sicko_Drop.webp",
    color: "#00FFB2", // Neon Teal
  },
  {
    id: "8",
    title: "War?",
    artist: "System Of A Down",
    src: "/music/Track8/War.mp3", 
    cover: "/music/Track8/War.webp",
    color: "#FFD700", // Gold
  },
  {
    id: "9",
    title: "Fight the Vegans",
    artist: "WILLIS",
    src: "/music/Track9/Fight the Vegans.mp3", 
    cover: "/music/Track9/Fight_the_Vegans.webp",
    color: "#32CD32", // Lime Green
  },
  {
    id: "10",
    title: "find your own",
    artist: "Humble the Great",
    src: "/music/Track10/find your own.mp3", 
    cover: "/music/Track10/find_your_own.webp",
    color: "#607D8B", // Slate/Steel Blue
  }
];

export function CustomAudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  
  const [activePlaylist, setActivePlaylist] = useState<Track[]>(playlist);

  useEffect(() => {
    const shuffled = [...playlist];
    
    // Shuffle all tracks randomly
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setActivePlaylist(shuffled);
    setCurrentTrackIndex(0);
    setIsMounted(true);
  }, []);

  const [canShowTheme, setCanShowTheme] = useState(false);
  const track = activePlaylist[currentTrackIndex];

  useEffect(() => {
    const handleReveal = () => setCanShowTheme(true);
    window.addEventListener("introVideoEnded", handleReveal);
    window.addEventListener("forceAudioPlay", handleReveal);
    return () => {
      window.removeEventListener("introVideoEnded", handleReveal);
      window.removeEventListener("forceAudioPlay", handleReveal);
    };
  }, []);

  // Dispatch track color after the intro video finishes, coloring the "Hold to Initialize" UI
  useEffect(() => {
    if (canShowTheme && track && track.color) {
      window.dispatchEvent(new CustomEvent("themeChange", { detail: { color: track.color } }));
      (window as any).__themeColor = track.color;
      document.documentElement.style.setProperty("--color-accent", track.color);
    }
  }, [currentTrackIndex, canShowTheme, track]);

  const hasInteractedRef = useRef(false);

  // Listen for explicit forceAudioPlay event (after 'yes' is typed)
  useEffect(() => {
    const forcePlay = () => {
      hasInteractedRef.current = true;
      setCanShowTheme(true);
      const audio = audioRefs.current[currentTrackIndex];
      if (audio && audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }
      setIsPlaying(true);
    };

    (window as any).__playAudio = forcePlay;
    window.addEventListener("forceAudioPlay", forcePlay);

    return () => {
      if ((window as any).__playAudio === forcePlay) {
        delete (window as any).__playAudio;
      }
      window.removeEventListener("forceAudioPlay", forcePlay);
    };
  }, [currentTrackIndex]); // Run when current track changes so the closure has the correct index

  const togglePlay = () => {
    hasInteractedRef.current = true;
    setCanShowTheme(true);
    const audio = audioRefs.current[currentTrackIndex];
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }
    }
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    hasInteractedRef.current = true;
    setCanShowTheme(true);
    setCurrentTrackIndex((prev) => (prev + 1) % activePlaylist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    hasInteractedRef.current = true;
    setCanShowTheme(true);
    setCurrentTrackIndex((prev) => (prev - 1 + activePlaylist.length) % activePlaylist.length);
    setIsPlaying(true);
  };

  const playPromiseRef = useRef<Promise<void> | void>(undefined);

  // Single source of truth for playing/pausing to avoid AbortError
  useEffect(() => {
    audioRefs.current.forEach((audio, idx) => {
      if (!audio) return;
      
      if (idx === currentTrackIndex) {
        if (isPlaying) {
          if (audio.paused) {
            playPromiseRef.current = audio.play();
            if (playPromiseRef.current !== undefined) {
              playPromiseRef.current.catch((err) => {
                if (err.name !== "AbortError") {
                   if (err.name !== "NotAllowedError") {
                     console.error("Playback error:", err);
                   }
                   setIsPlaying(false);
                }
              });
            }
          }
        } else {
          if (playPromiseRef.current !== undefined) {
            playPromiseRef.current.then(() => {
              audio.pause();
            }).catch(() => {});
          } else {
            audio.pause();
          }
        }
      } else {
        // Pause all other tracks and reset their time to start
        if (!audio.paused) {
          audio.pause();
        }
        audio.currentTime = 0;
      }
    });
  }, [currentTrackIndex, isPlaying]);

  if (!isMounted || !track) return null;

  return (
    <div className="flex items-center gap-0 md:gap-1 ml-2 pl-2 border-l border-[var(--color-border)] shrink-0 snap-start">
      <button onClick={handlePrev} aria-label="Previous Track" className="cursor-target flex items-center justify-center min-w-[44px] min-h-[44px] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
        <SkipBack className="w-4 h-4" />
      </button>
      <button onClick={togglePlay} aria-label={isPlaying ? "Pause Track" : "Play Track"} className="cursor-target relative flex items-center justify-center min-w-[44px] min-h-[44px] group" title={track.title}>
        <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden group-hover:ring-2 ring-[var(--color-accent)] transition-all shrink-0 shadow-sm pointer-events-none">
          {activePlaylist.map((t, idx) => (
            <img 
              key={t.id}
              src={t.cover} 
              alt="" 
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${idx === currentTrackIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${isPlaying && idx === currentTrackIndex ? 'animate-[spin_10s_linear_infinite]' : ''}`} 
              crossOrigin="anonymous" 
            />
          ))}
        </div>
      </button>
      <button onClick={handleNext} aria-label="Next Track" className="cursor-target flex items-center justify-center min-w-[44px] min-h-[44px] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
        <SkipForward className="w-4 h-4" />
      </button>
      
      {/* Hidden audio elements for fast switching */}
      {activePlaylist.map((t, idx) => (
        <audio 
          key={t.id}
          ref={(el) => {
            if (el) audioRefs.current[idx] = el;
          }}
          src={t.src} 
          preload={idx === currentTrackIndex || idx === (currentTrackIndex + 1) % activePlaylist.length ? "auto" : "metadata"} 
          onEnded={handleNext}
        />
      ))}
    </div>
  );
}
