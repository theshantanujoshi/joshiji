import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find me on the internet or reach out directly.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
