"use client";

import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

export function SpotifyWidget({ trackUrl = "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT" }: { trackUrl?: string }) {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOEmbed() {
      try {
        const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(trackUrl)}`);
        const data = await res.json();
        setEmbedHtml(data.html);
        setThumbnailUrl(data.thumbnail_url);
      } catch (err) {
        console.error("Failed to fetch Spotify oEmbed", err);
      }
    }
    fetchOEmbed();
  }, [trackUrl]);

  useEffect(() => {
    if (thumbnailUrl) {
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = thumbnailUrl;
      img.onload = () => {
        try {
          const color = fac.getColor(img);
          document.documentElement.style.setProperty("--color-accent", color.hex);
          window.dispatchEvent(new CustomEvent("theme-change", { detail: color.hex }));
        } catch (e) {
          console.error("Failed to extract color", e);
        }
      };
    }
  }, [thumbnailUrl]);

  if (!embedHtml) return null;

  return (
    <div 
      className="spotify-widget-container w-full mt-4 overflow-hidden rounded-xl transition-all" 
      dangerouslySetInnerHTML={{ __html: embedHtml }}
    />
  );
}
