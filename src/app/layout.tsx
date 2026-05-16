import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TSL TPS Stars League",
  description:
    "The premier competitive league for TPS Ultimate Soccer on Roblox.",
  icons: {
    icon: "/images/league-logo.png",
    apple: "/images/league-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#f7f4f8]`}
    >
      <body className="min-h-full bg-[#f7f4f8] text-[#37003c]">
        <Navbar />

        {children}

        <footer className="border-t border-white/10 bg-[#37003c] px-6 py-12 text-white">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src="/images/league-logo.png"
                  alt="TPS Stars League logo"
                  width={76}
                  height={76}
                  className="h-[64px] w-[64px] rounded-full object-cover shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:h-[76px] sm:w-[76px]"
                />

                <p className="text-[38px] font-black uppercase leading-none tracking-[-0.05em] sm:text-[54px]">
                  TSL
                </p>
              </div>

              <p className="mt-3 text-sm font-black uppercase tracking-[0.24em] text-white/60">
                TPS Stars League
              </p>

              <p className="mt-5 max-w-xl text-sm font-medium leading-6 text-white/65 sm:text-base">
                The premier competitive league for TPS Ultimate Soccer on
                Roblox. Fixtures, results, standings, clubs, and league news in
                one place.
              </p>

              <a
                href="https://discord.gg/8RGhCAffBt"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#ff2882] px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(255,40,130,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e51f73] hover:shadow-[0_18px_40px_rgba(255,40,130,0.36)] active:scale-95"
              >
                Contact us via Discord
              </a>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm font-semibold text-white/75">
                © 2026 TPS Stars League. All rights reserved.
              </p>

              <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Built for the TSL community
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
