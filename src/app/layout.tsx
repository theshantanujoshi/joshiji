import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalDelight } from "@/components/GlobalDelight";
import { SmoothScroller } from "@/components/SmoothScroller";
import CRTWarp from "@/components/CRTWarp";
import { IntroVideo } from "@/components/IntroVideo";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shantanu.lol"),
  title: {
    default: "Shantanu Joshi",
    template: "%s | Shantanu Joshi",
  },
  description: "Builder focused on original tech and agentic AI.",
  keywords: ["Shantanu Joshi", "AI", "Data Science", "Software Engineer", "IIT Jodhpur", "Generative AI"],
  authors: [{ name: "Shantanu Joshi" }],
  openGraph: {
    title: "Shantanu Joshi",
    description: "Builder focused on original tech and agentic AI.",
    url: "https://www.shantanu.lol",
    siteName: "Shantanu Joshi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shantanu Joshi",
    description: "Builder focused on original tech and agentic AI.",
    creator: "@okayjoshiji",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <IntroVideo />
        <GlobalDelight />
        
        {/* Fixed Background Animation - Outside the Scroller! */}
        <div className="fixed inset-0 w-full h-full z-[0] opacity-60 mix-blend-screen pointer-events-none">
          <CRTWarp
            color="#EF4444" 
            backgroundColor="#09090B"
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
            brightness={1.25}
            pixelation={1}
            rgbShift={0.015}
            mouseReact={false}
            dpr={1}
            fps={30}
            className=""
            style={{}}
          />
        </div>

        <SmoothScroller>
          <div className="min-h-screen flex flex-col relative z-10">
            {/* Top Navigation */}
            <Navigation />
            
            {/* Main Content Area */}
            <main className="flex-1 w-full relative pt-12 md:pt-16 pb-12">
              {children}
            </main>
            
            <Footer />
          </div>
        </SmoothScroller>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
