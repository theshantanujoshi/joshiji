import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalDelight } from "@/components/GlobalDelight";
import { SmoothScroller } from "@/components/SmoothScroller";

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
  title: "Shantanu Joshi",
  description: "Builder focused on original tech and agentic AI.",
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
        <GlobalDelight />
        <SmoothScroller>
          <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <Navigation />
            
            {/* Main Content Area */}
            <main className="flex-1 w-full relative pt-12 md:pt-16 pb-12">
              {children}
            </main>
            
            <Footer />
          </div>
        </SmoothScroller>
      </body>
    </html>
  );
}
