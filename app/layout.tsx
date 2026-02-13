import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Veloria Cocktails | Premium Mobile Bar",
  description:
    "Premium Mobile Cocktailbar für Hochzeiten, Geburtstage & Corporate Events in München & Umgebung.",
  verification: {
    google: "PASTE_YOUR_GOOGLE_TOKEN_HERE",
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

        {/* ✅ Single Header (hamburger inside SiteHeader) */}
        <SiteHeader />

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

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/491234567890"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Kontakt"
          className="fixed bottom-16 right-6 z-50"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500/25 blur-md animate-[pulse_2.2s_infinite]" />
          <span className="absolute -inset-2 rounded-full border border-emerald-400/30 animate-[pulse_2.2s_infinite]" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 active:scale-95">
            💬
          </span>
        </a>
      </body>
    </html>
  );
}