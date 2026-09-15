"use client";

import { useState, useEffect } from "react";
import CRTWarp from "./CRTWarp";

export function DynamicCRTWarpComponent() {
  const [themeColor, setThemeColor] = useState("#EF4444");

  useEffect(() => {
    const handleThemeChange = (e: any) => {
      if (e.detail?.color) {
        setThemeColor(e.detail.color);
      }
    };
    window.addEventListener("themeChange", handleThemeChange);
    
    const interval = setInterval(() => {
      const globalColor = (window as any).__themeColor;
      if (globalColor) {
        setThemeColor((prev) => {
          if (prev !== globalColor) return globalColor;
          return prev;
        });
      }
    }, 500);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <CRTWarp
      color={themeColor}
      backgroundColor="#05010a"
      speed={0.5}
      curvature={0.25}
      scanlineStrength={0.25}
      scanlineFrequency={200}
      waveAmplitude={0.3}
      waveFrequency={2.5}
      bloom={1.5}
      bloomRadius={1}
      noise={0.1}
      vignette={0}
      brightness={1.5} // Increased brightness slightly to make colors pop
      pixelation={1}
      rgbShift={0.015}
      mouseReact={false}
      dpr={1}
      fps={30}
    />
  );
}
