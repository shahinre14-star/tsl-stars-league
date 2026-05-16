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

        <footer className="border-t border-white/10 bg-[#37003c] px-4 py-9 text-white sm:px-6 sm:py-12">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src="/images/league-logo.png"
                  alt="TPS Stars League logo"
                  width={76}
                  height={76}
                  className="h-12 w-12 object-contain sm:h-[76px] sm:w-[76px]"
                />

                <div>
                  <p className="text-[32px] font-black uppercase leading-none tracking-[-0.05em] sm:text-[54px]">
                    TSL
                  </p>

                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/60 sm:text-sm sm:tracking-[0.24em]">
                    TPS Stars League
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-xl text-sm font-medium leading-6 text-white/65 sm:text-base">
                The premier competitive league for TPS Ultimate Soccer on
                Roblox. Fixtures, results, standings, clubs, and league news in
                one place.
              </p>

              <a
                href="https://discord.gg/8RGhCAffBt"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#ff2882] px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(255,40,130,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e51f73] hover:shadow-[0_18px_40px_rgba(255,40,130,0.36)] active:scale-95 sm:w-auto"
              >
                Contact us via Discord
              </a>
            </div>

            <div className="border-t border-white/10 pt-6 text-left md:border-t-0 md:pt-0 md:text-right">
              <p className="text-sm font-semibold leading-6 text-white/75">
                © 2026 TPS Stars League.
                <br className="sm:hidden" /> All rights reserved.
              </p>

              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 sm:text-xs sm:tracking-[0.2em]">
                Built for the TSL community
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}