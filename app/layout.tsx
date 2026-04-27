import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Production Person App",
    template: "%s | Production Person App",
  },
  description:
    "Week 3 production person management app with full CRUD, Prisma integration, and built-in project documentation pages.",
};

const navItems = [
  { href: "/", label: "People" },
  { href: "/about", label: "About" },
  { href: "/github", label: "GitHub" },
  { href: "/database", label: "Database" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-zinc-900">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(244,162,97,0.28)] blur-3xl" />
          <div className="absolute top-16 right-0 h-72 w-72 rounded-full bg-[rgba(31,111,120,0.2)] blur-3xl" />
        </div>

        <div className="flex min-h-full flex-col">
          <header className="sticky top-0 z-50 border-b border-black/10 bg-[rgba(255,253,250,0.78)] backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--brand-strong)]">
                  Week 3 Deliverable
                </p>
                <p className="text-lg font-semibold">Production Person App</p>
              </div>

              <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
            <p className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-zinc-700">
              Built with Next.js App Router, Prisma, and TypeScript.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
