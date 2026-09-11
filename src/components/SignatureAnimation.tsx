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
    async function animateLetters() {
      if (!signRef.current) return;

      const letterDivs = Array.from(
        signRef.current.children
      ) as HTMLDivElement[];

      for (let i = 0; i < letterDivs.length; i++) {
        const paths = letterDivs[i].querySelectorAll("path");

        for (const path of Array.from(paths)) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;

          path.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
          
          // Force reflow
          void path.getBoundingClientRect();
          
          path.style.strokeDashoffset = "0";

          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, duration * 1000);
          });
        }

        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        }
      }
    }

    animateLetters();
  }, [text, duration, delay]);

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
