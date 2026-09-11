import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalDelight } from "@/components/GlobalDelight";
import { SmoothScroller } from "@/components/SmoothScroller";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
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
        className={`${montserrat.variable} antialiased font-sans`}
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
