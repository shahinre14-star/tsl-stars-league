import Link from "next/link";

const quickLinks = [
  { label: "Clubs", href: "/teams" },
  { label: "Table", href: "/standings" },
  { label: "Fixtures", href: "/fixtures" },
  { label: "Results", href: "/results" },
];

type HeroProps = {
  eyebrow?: string;
  title?: string;
};

export default function Hero({ eyebrow, title }: HeroProps = {}) {
  if (eyebrow || title) {
    return (
      <section className="relative overflow-hidden border-b border-[#eadfec] bg-white pt-[126px] text-[#37003c] lg:pt-[92px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(55,0,60,0.08),transparent_42%)]" />

        <div className="relative mx-auto flex min-h-[330px] max-w-[1440px] flex-col justify-center px-6 py-16">
          <p className="mb-5 text-[14px] font-black uppercase tracking-[0.24em] text-[#6b1570]">
            {eyebrow}
          </p>

          <h1 className="text-[72px] font-black uppercase leading-[0.9] tracking-[-0.055em] text-[#37003c] sm:text-[96px]">
            {title}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-[#eadfec] bg-white pt-[126px] text-[#37003c] lg:pt-[92px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(55,0,60,0.07),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(55,0,60,0.025)_1px,transparent_1px),linear-gradient(rgba(55,0,60,0.025)_1px,transparent_1px)] bg-[size:76px_76px]" />

      <div className="relative mx-auto grid min-h-[600px] max-w-[1440px] items-center gap-10 px-6 py-14 lg:grid-cols-[1fr_380px] lg:py-16">
        <div className="relative z-10 animate-hero-text">
          <div className="mb-7 inline-flex items-center rounded-full border border-[#e5d5e8] bg-[#fbf8fc] px-6 py-3 text-sm font-black uppercase tracking-[0.24em] text-[#6b1570] shadow-sm">
            Season 2026 · Live Now
          </div>

          <h1 className="max-w-4xl text-[64px] font-black leading-[0.9] tracking-[-0.065em] text-[#37003c] sm:text-[92px] lg:text-[116px]">
            TPS Stars
            <br />
            League
          </h1>

          <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-[#75657d]">
            The premier competitive league for TPS Ultimate Soccer. Follow
            clubs, fixtures, standings, results, and the latest league news.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {quickLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center justify-center rounded-full bg-[#37003c] px-8 py-4 text-base font-black text-white shadow-[0_14px_35px_rgba(55,0,60,0.18)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#5a0a5f] hover:shadow-[0_20px_45px_rgba(55,0,60,0.25)] active:scale-95"
                style={{
                  animation: `heroTextIn 0.75s cubic-bezier(0.22,1,0.36,1) ${
                    0.12 + index * 0.08
                  }s both`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
          <div
            className="rounded-[38px] border border-[#eadfec] bg-[#fbf8fc] p-8 shadow-[0_24px_70px_rgba(55,0,60,0.10)]"
            style={{
              animation:
                "heroLogoIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both",
            }}
          >
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#6b1570]">
              TPS
            </p>

            <p className="mt-5 text-[58px] font-black leading-[0.85] tracking-[-0.07em] text-[#37003c]">
              Stars
              <br />
              League
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-[22px] bg-white p-4 shadow-[0_10px_26px_rgba(55,0,60,0.05)]">
                <p className="text-3xl font-black">12</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[#75657d]">
                  Clubs
                </p>
              </div>

              <div className="rounded-[22px] bg-white p-4 shadow-[0_10px_26px_rgba(55,0,60,0.05)]">
                <p className="text-3xl font-black">2026</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[#75657d]">
                  Season
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] bg-[#37003c] p-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
                Live competition
              </p>

              <p className="mt-2 text-lg font-bold leading-7 text-white/85">
                Follow the table, fixtures, results, clubs, and latest league
                news.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}