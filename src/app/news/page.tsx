import { getLeagueData } from "@/lib/league-data";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const { news } = await getLeagueData();
  const stories = news.stories;
  const categories = [
    "All",
    ...Array.from(
      new Set([news.featured.category, ...stories.map((item) => item.category)]),
    ),
  ];

  return (
    <main className="min-h-screen bg-[#f7f4f8] pt-[126px] lg:pt-[92px] text-[#37003c]">
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-10">
          <div className="relative overflow-hidden rounded-[38px] bg-[#37003c] px-7 py-12 text-white shadow-[0_28px_80px_rgba(55,0,60,0.18)] md:px-10 md:py-14">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ff2882]/30 blur-2xl" />
            <div className="absolute -bottom-32 left-20 h-96 w-96 rounded-full bg-[#00ff85]/20 blur-2xl" />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-white/80">
                  Season 2026
                </p>
                <h1 className="mt-7 text-[64px] font-black leading-[0.88] tracking-[-0.07em] sm:text-[88px]">
                  News
                </h1>
                <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/70">
                  Latest announcements, match previews, club updates, and
                  website changes.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:min-w-[360px]">
                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">{stories.length + 1}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Stories
                  </p>
                </div>
                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">{categories.length - 1}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Topics
                  </p>
                </div>
                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">2026</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Season
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6b1570]">
              League News
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
              Latest stories
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className={[
                  "rounded-full border px-5 py-3 text-sm font-bold shadow-[0_10px_28px_rgba(55,0,60,0.05)]",
                  category === "All"
                    ? "border-[#37003c] bg-[#37003c] text-white"
                    : "border-[#eadfec] bg-white text-[#37003c]",
                ].join(" ")}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <article className="overflow-hidden rounded-[38px] border border-[#eadfec] bg-white shadow-[0_18px_45px_rgba(55,0,60,0.07)]">
          <div className="grid lg:grid-cols-[1fr_420px]">
            <div className="p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#37003c] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                  Featured
                </span>
                <span className="rounded-full bg-[#f0e8f2] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#6b1570]">
                  {news.featured.category}
                </span>
              </div>
              <h3 className="mt-7 max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.06em] text-[#37003c] md:text-6xl">
                {news.featured.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#75657d]">
                {news.featured.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-bold text-[#75657d]">
                <span>{news.featured.date}</span>
                <span>•</span>
                <span>{news.featured.readTime}</span>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden bg-[#37003c]">
              <div className="absolute -right-14 -top-14 h-56 w-56 rounded-full bg-[#ff2882]/45 blur-2xl" />
              <div className="absolute -bottom-16 left-8 h-64 w-64 rounded-full bg-[#00ff85]/35 blur-2xl" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="rounded-[34px] bg-white/10 p-8 text-center text-white backdrop-blur">
                  <p className="text-sm font-black uppercase tracking-[0.35em] text-white/60">
                    TSL
                  </p>
                  <p className="mt-4 text-5xl font-black leading-none tracking-[-0.06em]">
                    Season
                    <br />
                    News
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((item) => (
            <article
              key={item.id}
              className="rounded-[32px] border border-[#eadfec] bg-white p-6 shadow-[0_14px_38px_rgba(55,0,60,0.05)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#f0e8f2] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#6b1570]">
                  {item.category}
                </span>
                <span className="text-sm font-bold text-[#75657d]">
                  {item.readTime}
                </span>
              </div>
              <h3 className="mt-7 text-3xl font-black leading-[0.98] tracking-[-0.05em] text-[#37003c]">
                {item.title}
              </h3>
              <p className="mt-4 min-h-[84px] font-medium leading-7 text-[#75657d]">
                {item.description}
              </p>
              <div className="mt-7 border-t border-[#eadfec] pt-5">
                <span className="text-sm font-bold text-[#75657d]">
                  {item.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
