import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalDelight } from "@/components/GlobalDelight";
import { SmoothScroller } from "@/components/SmoothScroller";
import { DynamicCRTWarpComponent } from "@/components/DynamicCRTWarp";
import { IntroVideo } from "@/components/IntroVideo";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const bricolage = Bricolage_Grotesque({
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
  alternates: {
    canonical: "/",
  },
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

import TargetCursor from "@/components/TargetCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <TargetCursor cursorColor="var(--color-accent)" cursorColorOnTarget="var(--color-foreground)" />
        <IntroVideo />
        <GlobalDelight />
        
        {/* Fixed Background Animation - Outside the Scroller! */}
        <div className="fixed inset-0 w-full h-full z-[0] opacity-60 mix-blend-screen pointer-events-none">
          <DynamicCRTWarpComponent />
        </div>

        <SmoothScroller>
          <div className="min-h-screen flex flex-col relative z-10">
            {/* Top Navigation */}
            <Navigation />
            
            {/* Main Content Area */}
            <main className="flex-1 w-full relative pt-32 md:pt-40 pb-12">
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
