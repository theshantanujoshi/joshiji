"use client";

import { useEffect, useRef } from "react";
import letters from "@/utils/letters";
interface SignatureAnimationProps {
  children: string;
  duration?: number;
  delay?: number;
}

function SignatureAnimation({
  children,
  duration = 1,
  delay = 0,
}: SignatureAnimationProps) {
  const signRef = useRef<HTMLDivElement>(null);
  const text = children.split("");

  useEffect(() => {
    let isMounted = true;
    let observer: IntersectionObserver | null = null;
    let cancelCurrentAnimation = false;

    const resetPaths = () => {
      if (!signRef.current) return;
      const letterDivs = Array.from(signRef.current.children) as HTMLDivElement[];
      for (let i = 0; i < letterDivs.length; i++) {
        const paths = letterDivs[i].querySelectorAll("path");
        for (const path of Array.from(paths)) {
          path.style.transition = "none";
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;
        }
      }
    };

    const playAnimation = async () => {
      if (!signRef.current) return;
      const letterDivs = Array.from(signRef.current.children) as HTMLDivElement[];

      for (let i = 0; i < letterDivs.length; i++) {
        if (cancelCurrentAnimation || !isMounted) break;
        const paths = letterDivs[i].querySelectorAll("path");

        for (const path of Array.from(paths)) {
          if (cancelCurrentAnimation || !isMounted) break;
          path.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
          
          // Force reflow
          void path.getBoundingClientRect();
          
          path.style.strokeDashoffset = "0";

          await new Promise((resolve) => setTimeout(resolve, duration * 1000));
        }

        if (delay > 0 && !cancelCurrentAnimation && isMounted) {
          await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        }
      }
    };

    resetPaths();

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelCurrentAnimation = false;
          resetPaths();
          // Small delay before starting to ensure reflow is applied
          setTimeout(() => {
            if (isMounted && !cancelCurrentAnimation) {
              playAnimation();
            }
          }, 50);
          
          // Stop observing once it has been triggered so it only plays once
          if (signRef.current && observer) {
            observer.unobserve(signRef.current);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (signRef.current) {
      observer.observe(signRef.current);
    }

    return () => {
      isMounted = false;
      cancelCurrentAnimation = true;
      if (observer) {
        observer.disconnect();
      }
    };
  }, [children, duration, delay]);

  return (
    <div className="signature-main" ref={signRef}>
      {text.map((char, index) =>
        char === " " ? (
          <div key={index} style={{ minWidth: "12px" }}></div>
        ) : letters[char] ? (
          <div
            key={index}
            className={`letter ${char.toLowerCase()} ${
              char === char.toUpperCase() ? "up" : "lo"
            }`}
            dangerouslySetInnerHTML={{ __html: letters[char] }}
          />
        ) : null
      )}
    </div>
  );
}

export default SignatureAnimation;
