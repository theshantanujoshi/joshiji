import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/SmoothScroller";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalDelight } from "@/components/GlobalDelight";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
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
        className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
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
