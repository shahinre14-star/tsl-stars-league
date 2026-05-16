import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Clubs", href: "/teams" },
  { label: "Table", href: "/standings" },
  { label: "Fixtures", href: "/fixtures" },
  { label: "Results", href: "/results" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f4f8] pt-[126px] text-[#37003c] lg:pt-[92px]">
      <section className="border-b border-[#eadfec] bg-white">
        <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-20">
          <div className="relative z-10 max-w-4xl">
            <div className="mb-7 inline-flex items-center rounded-full border border-[#e5d5e8] bg-[#fbf8fc] px-5 py-3 text-sm font-black uppercase tracking-[0.22em] text-[#6b1570]">
              Season 2026 · Live Now
            </div>

            <h1 className="max-w-4xl text-[64px] font-black leading-[0.9] tracking-[-0.055em] text-[#37003c] sm:text-[92px] lg:text-[112px]">
              TPS Stars
              <br />
              League
            </h1>

            <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-[#75657d]">
              The premier competitive league for TPS Ultimate Soccer. Follow
              clubs, fixtures, standings, results, and the latest league news.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ color: "#ffffff" }}
                  className="relative inline-flex items-center justify-center rounded-full bg-[#37003c] px-7 py-4 text-base font-black !text-white shadow-[0_14px_35px_rgba(55,0,60,0.18)] transition hover:bg-[#5a0a5f]"
                >
                  <span className="relative z-10 text-white">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center lg:max-w-none">
            <div className="absolute inset-8 rounded-full bg-[#ffdf1b]/20 blur-3xl" />
            <Image
              src="/images/league-logo.png"
              alt="TPS Stars League logo"
              width={420}
              height={420}
              className="relative h-auto w-full rounded-full shadow-[0_28px_70px_rgba(55,0,60,0.24)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-[#37003c]">
        <div className="mx-auto max-w-[1440px] px-6 py-16">
          <h2 className="text-5xl font-black tracking-[-0.04em] text-white">
            Explore the league
          </h2>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[28px] bg-white p-7 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-black tracking-[-0.03em] text-[#37003c]">
                    {item.label}
                  </p>
                  <span className="text-3xl text-[#37003c] transition group-hover:translate-x-1">
                    ›
                  </span>
                </div>

                <p className="mt-4 text-base font-medium leading-7 text-[#75657d]">
                  View latest {item.label.toLowerCase()} information.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
