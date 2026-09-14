"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string; // e.g., '/music/track1.mp3'
  cover: string; // e.g., '/music/cover1.jpg'
}

export const playlist: Track[] = [
  {
    id: "1",
    title: "Strawberry Huracan",
    artist: "MASN",
    src: "", 
    cover: "/music/Track1/Strawberry-Huracan.webp",
  },
  {
    id: "2",
    title: "AOK",
    artist: "Tai Verdes",
    src: "", 
    cover: "/music/Track2/AOK.webp",
  },
  {
    id: "3",
    title: "turn out fine",
    artist: "The Astronomers, sammy rash",
    src: "", 
    cover: "/music/Track3/turn_out_fine.webp",
  },
  {
    id: "4",
    title: "Mister Mister",
    artist: "Mishaal Tamer",
    src: "", 
    cover: "/music/Track4/Mister_Mister.webp",
  },
  {
    id: "5",
    title: "JETSKI",
    artist: "Internet Money, Lil Tecca, Lil Mosey",
    src: "", 
    cover: "/music/Track5/JETSKI.webp",
  },
  {
    id: "6",
    title: "Reminder",
    artist: "The Weeknd",
    src: "", 
    cover: "/music/Track6/Reminder.webp",
  },
  {
    id: "7",
    title: "Sicko Drop",
    artist: "KVSH, Schillist",
    src: "", 
    cover: "/music/Track7/Sicko_Drop.webp",
  },
  {
    id: "8",
    title: "War?",
    artist: "System Of A Down",
    src: "", 
    cover: "/music/Track8/War.webp",
  },
  {
    id: "9",
    title: "Fight the Vegans",
    artist: "WILLIS",
    src: "", 
    cover: "/music/Track9/Fight_the_Vegans.webp",
  },
  {
    id: "10",
    title: "find your own",
    artist: "Humble the Great",
    src: "", 
    cover: "/music/Track10/find_your_own.webp",
  }
];

export function CustomAudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = playlist[currentTrackIndex];



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  // Auto-play when track changes if it was already playing
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  if (!track) return null;

  return (
    <div className="readme-card mt-8 !p-0 !rounded-none flex flex-col sm:flex-row border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors duration-700 relative overflow-hidden group">
      
      {/* Subtle background glow from the accent color */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* Left: Square Cover Art (Flush to edges) */}
      <div className="relative w-full sm:w-36 sm:h-36 aspect-square shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-[var(--color-border)] transition-colors duration-700">
        <img 
          src={track.cover} 
          alt={track.title} 
          className="w-full h-full object-cover" 
          crossOrigin="anonymous" 
        />
        {/* Playback overlay on cover art (optional delight) */}
        {isPlaying && (
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        )}
      </div>

      {/* Right: Info, Controls, Progress */}
      <div className="flex-1 min-w-0 w-full flex flex-col justify-center relative z-10 p-4 sm:p-5 sm:pl-6">
        
        <div className="flex items-start justify-between mb-4 sm:mb-2">
          <div className="truncate pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-[var(--color-accent)] tracking-wider">NOW PLAYING</span>
              <div className="flex items-center gap-0.5 h-2.5 opacity-70">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`w-0.5 bg-[var(--color-accent)] rounded-full transition-all duration-300 ${isPlaying ? 'animate-eq-bounce-' + i : 'h-0.5'}`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-[var(--color-foreground)] font-bold text-lg sm:text-xl truncate transition-colors duration-700 group-hover:text-[var(--color-accent)]">
              {track.title}
            </h3>
            <p className="text-[var(--color-muted-foreground)] text-sm truncate">
              {track.artist}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={handlePrev} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
              <SkipBack className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
            <button 
              onClick={togglePlay} 
              className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full hover:scale-105 hover:bg-[var(--color-accent)] transition-all duration-300 shadow-md"
            >
              {isPlaying ? <Pause className="w-6 h-6 sm:w-5 sm:h-5" /> : <Play className="w-6 h-6 sm:w-5 sm:h-5 ml-1" />}
            </button>
            <button onClick={handleNext} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
              <SkipForward className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mt-auto w-full">
          <span className="text-[10px] text-[var(--color-muted-foreground)] font-mono w-8 text-right shrink-0">
            {formatTime(progress)}
          </span>
          <input 
            type="range" 
            min={0} 
            max={duration || 100} 
            value={progress} 
            onChange={handleSeek}
            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer bg-[var(--color-muted)] accent-[var(--color-accent)] focus:outline-none transition-all duration-300 hover:h-2"
          />
          <span className="text-[10px] text-[var(--color-muted-foreground)] font-mono w-8 shrink-0">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={track.src || undefined} preload="metadata" />
    </div>
  );
}
