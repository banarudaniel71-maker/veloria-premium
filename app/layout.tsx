import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Veloria Cocktails | Premium Mobile Bar",
  description:
    "Premium Mobile Cocktailbar für Hochzeiten, Geburtstage & Corporate Events in München & Umgebung.",
  verification: {
    google: "google-site-verification" content="BrFjvvO6LJX7sNqKVXZ6qxvI6z0wZUil64vFHytCdow",
  },
};

const nav = [
  { href: "/pakete", label: "Pakete & Preise" },
  { href: "/menu", label: "Cocktail Menü" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen antialiased text-white">
        {/* Background */}
        <div className="fixed inset-0 -z-10 bg-black" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="fixed inset-0 -z-10 opacity-80 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.25),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.22),transparent_45%),radial-gradient(circle_at_30%_90%,rgba(16,185,129,0.18),transparent_55%)]" />
        <div className="fixed inset-0 -z-10 backdrop-blur-[8px]" />

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 grid place-items-center font-black">
                VC
              </div>
              <div>
                <p className="font-semibold">Veloria Cocktails</p>
                <p className="text-xs text-white/70">München & Umgebung</p>
              </div>
            </Link>

            <nav className="hidden md:flex gap-6 text-sm text-white/80">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/kontakt"
              className="rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-3 text-sm font-semibold shadow-lg hover:opacity-95 transition"
            >
              Angebot anfragen
            </Link>
          </div>
        </header>

        {/* Content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row gap-6 justify-between text-sm text-white/70">
            <p>© {new Date().getFullYear()} Veloria Cocktails</p>
            <div className="flex gap-5">
              <Link href="/impressum" className="hover:text-white">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-white">
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
          className="fixed bottom-6 right-6 z-50"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md animate-pulse" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition">
            💬
          </span>
        </a>
      </body>
    </html>
  );
}
