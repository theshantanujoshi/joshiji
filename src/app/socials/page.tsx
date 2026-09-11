"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, FileText, PenTool } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import { Magnetic } from "@/components/Magnetic";

export default function Socials() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const socials = [
    { name: "Resume", href: "https://drive.google.com/file/d/1QVm3ZHktfZwsgoRtkja6K3GVK2eKlz7_/view?usp=sharing", icon: FileText, handle: "PDF Document" },
    { name: "Book a Meeting", href: "https://calendly.com/theshantanujoshi", icon: Calendar, handle: "Schedule time" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/theshantanujoshi/", icon: FaLinkedin, handle: "Professional network" },
    { name: "GitHub", href: "https://github.com/theshantanujoshi", icon: FaGithub, handle: "@theshantanujoshi" },
    { name: "Email", href: "mailto:shanjoshi39@gmail.com", icon: Mail, handle: "shanjoshi39@gmail.com" },
    { name: "Phone", href: "tel:+919936328758", icon: Phone, handle: "+91 9936328758" },
    { name: "Twitter / X", href: "https://twitter.com/okayjoshiji", icon: FaTwitter, handle: "Thoughts & updates" },
    { name: "Substack", href: "https://okayjoshiji.substack.com", icon: PenTool, handle: "Writings" },
    { name: "Instagram", href: "https://instagram.com/ashanthumain", icon: FaInstagram, handle: "Visuals" },
    { name: "Discord", href: "#", icon: FaDiscord, handle: "Community", copyText: "ashanthumain" },
  ];

  return (
    <div className="readme-container max-w-4xl mx-auto">
      <h1>Socials & Contact</h1>
      <p className="mb-8">Find me on the internet or reach out directly.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socials.map((social) => {
          const Icon = social.icon;
          const isCopied = social.copyText && copiedText === social.copyText;
          return (
            <a
              key={social.name}
              href={social.href}
              onClick={social.copyText ? (e) => handleCopy(e, social.copyText!) : undefined}
              className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] group no-underline transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-md cursor-pointer"
              target={social.copyText ? undefined : "_blank"}
              rel={social.copyText ? undefined : "noopener noreferrer"}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <Magnetic>
                  <div className="p-2 sm:p-3 bg-[var(--color-muted)] rounded-lg group-hover:bg-[var(--color-accent)]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>
                </Magnetic>
                <h3 className="font-bold font-['Space_Grotesk'] text-[var(--color-foreground)] m-0 border-0 pb-0 text-sm sm:text-base">{social.name}</h3>
              </div>
              <span className={`text-[var(--color-muted-foreground)] transition-all duration-300 ${isCopied ? "text-green-500 scale-110" : "group-hover:text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1"}`}>
                {social.copyText ? (isCopied ? "✓" : "📋") : "↗"}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
