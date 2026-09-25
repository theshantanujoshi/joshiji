import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find me on the internet or reach out directly.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Shantanu Joshi",
    description: "Find me on the internet or reach out directly.",
    url: "https://www.shantanu.lol/contact",
    siteName: "Shantanu Joshi",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
