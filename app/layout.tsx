import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Veloria Cocktails – Premium Mobile Bar München",
  description: "Premium Mobile Bar für Hochzeiten & Events in München & Umgebung.",
  openGraph: {
    title: "Veloria Cocktails – Premium Mobile Bar",
    description: "Premium Mobile Bar für Hochzeiten & Events in München & Umgebung.",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen antialiased text-white">
        {/* Global premium background */}
        <div className="fixed inset-0 -z-10 bg-black" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="fixed inset-0 -z-10 opacity-80 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.25),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.22),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(16,185,129,0.18),transparent_55%)]" />
        <div className="fixed inset-0 -z-10 backdrop-blur-[8px]" />

        {/* Header */}
        <SiteHeader />

        {/* Page */}
        {children}

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between text-sm text-white/70">
            <p>© {new Date().getFullYear()} Veloria Cocktails</p>
            <div className="flex gap-5">
              <Link href="/impressum" className="hover:text-white transition">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-white transition">
                Datenschutz
              </Link>
            </div>
          </div>
        </footer>

        {/* WhatsApp Floating Button (premium, no emoji) */}
        <a
          href="https://wa.me/4915141349865"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Kontakt"
         className="fixed bottom-6 right-6 z-50 hidden sm:flex"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500/25 blur-md animate-[pulse_2.2s_infinite]" />
          <span className="absolute -inset-2 rounded-full border border-emerald-400/30 animate-[pulse_2.2s_infinite]" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 active:scale-95">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M20.5 11.9a8.5 8.5 0 0 1-12.7 7.4L3.5 20.5l1.2-4.1A8.5 8.5 0 1 1 20.5 11.9Z"
                stroke="white"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M8.7 9.3c.2-.5.4-.6.8-.6h.6c.2 0 .4.1.5.3l.9 2c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.4 0 .6.5.9 1.6 2 2.6 2.5.2.1.4.1.6 0l.8-.5c.2-.1.4-.1.6 0l2 .9c.2.1.3.3.3.5v.6c0 .4-.1.6-.6.8-.8.4-2 .5-3.5-.1-2-.8-4.7-3.5-5.6-5.6-.6-1.5-.5-2.7-.1-3.5Z"
                fill="white"
                opacity="0.95"
              />
            </svg>
          </span>
        </a>
      </body>
    </html>
  );
}