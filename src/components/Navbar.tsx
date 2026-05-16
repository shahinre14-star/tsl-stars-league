"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/standings", label: "Table" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/results", label: "Results" },
  { href: "/teams", label: "Clubs" },
  { href: "/news", label: "News" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#eadfec] bg-white text-[#37003c] shadow-[0_4px_22px_rgba(55,0,60,0.06)]">
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-3 px-4 lg:h-[92px] lg:gap-5 lg:px-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-[20px] px-2 py-2 transition-all duration-300 ease-out hover:bg-[#f0e8f2] active:scale-[0.97] lg:rounded-[24px] lg:px-4 lg:py-3"
        >
          <Image
            src="/images/league-logo.png"
            alt="TPS Stars League logo"
            width={58}
            height={58}
            className="h-12 w-12 object-contain lg:h-[58px] lg:w-[58px]"
            priority
          />

          <div>
            <div className="text-[16px] font-black tracking-tight text-[#37003c] sm:text-[17px] lg:text-[21px]">
              TPS Stars League
            </div>

            <div className="mt-0.5 hidden text-[12px] font-medium text-[#75657d] lg:block">
              Premier football competition
            </div>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-full px-6 py-3 text-[17px] font-bold",
                  "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:-translate-y-0.5 hover:bg-[#f0e8f2]",
                  "hover:shadow-[0_10px_22px_rgba(55,0,60,0.08)]",
                  "active:translate-y-0 active:scale-95",
                  active
                    ? "bg-[#f0e8f2] text-[#37003c]"
                    : "bg-transparent text-[#5a315f]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 pr-2">
          <button
            type="button"
            className={[
              "hidden h-12 w-12 items-center justify-center rounded-full",
              "bg-[#f0e8f2] text-[#37003c]",
              "transition-all duration-300 ease-out",
              "hover:-translate-y-0.5 hover:bg-[#e7d8eb]",
              "hover:shadow-[0_10px_24px_rgba(55,0,60,0.10)]",
              "active:translate-y-0 active:scale-95",
              "lg:flex",
            ].join(" ")}
            aria-label="Search"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[21px] w-[21px]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10.8 18.1a7.3 7.3 0 1 1 0-14.6 7.3 7.3 0 0 1 0 14.6Z"
                stroke="currentColor"
                strokeWidth="2.2"
              />

              <path
                d="M16.2 16.2 21 21"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            href="/admin"
            className={[
              "group relative inline-flex h-10 min-w-[88px] shrink-0 lg:h-12 lg:min-w-[126px]",
              "items-center justify-center overflow-hidden rounded-full",
              "bg-[#37003c] px-4 lg:px-7",
              "text-[13px] font-black text-white lg:text-[15px]",
              "shadow-[0_14px_32px_rgba(55,0,60,0.24)]",
              "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:-translate-y-0.5 hover:bg-[#4b0052]",
              "hover:shadow-[0_18px_42px_rgba(55,0,60,0.32)]",
              "active:translate-y-0 active:scale-95",
            ].join(" ")}
          >
            <span className="relative z-10 whitespace-nowrap text-white">
              Sign in
            </span>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </nav>

      <div className="border-t border-[#eadfec] bg-white lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-4 py-2 [-webkit-overflow-scrolling:touch]">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "shrink-0 rounded-full px-4 py-2.5 text-[14px] font-black",
                  "transition-all duration-300 ease-out",
                  "active:scale-95",
                  active
                    ? "bg-[#f0e8f2] text-[#37003c]"
                    : "text-[#5a315f] hover:bg-[#f0e8f2]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}