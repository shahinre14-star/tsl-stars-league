import Image from "next/image";
import { getLeagueData } from "@/lib/league-data";

export const dynamic = "force-dynamic";

function record(team: {
  won: number;
  drawn: number;
  lost: number;
}) {
  return `${team.won}W ${team.drawn}D ${team.lost}L`;
}

export default async function TeamsPage() {
  const data = await getLeagueData();
  const clubs = data.teams;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f4f8] pt-[116px] text-[#37003c] lg:pt-[92px]">
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-10">
          <div className="relative overflow-hidden rounded-[28px] bg-[#37003c] px-5 py-8 text-white shadow-[0_20px_60px_rgba(55,0,60,0.16)] sm:rounded-[38px] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff2882]/25 blur-2xl" />
            <div className="absolute -bottom-28 left-8 h-80 w-80 rounded-full bg-[#00ff85]/15 blur-2xl" />

            <div className="relative z-10">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-white/75 sm:px-5 sm:py-3 sm:text-sm">
                Season 2026
              </p>

              <h1 className="mt-6 text-[52px] font-black leading-[0.88] tracking-[-0.07em] sm:text-[76px] lg:text-[88px]">
                Clubs
              </h1>

              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-white/70 sm:text-lg sm:leading-8">
                Explore all TPS Stars League clubs, records, points, logos, and
                season details.
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <div className="rounded-[18px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {clubs.length}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Clubs
                  </p>
                </div>

                <div className="rounded-[18px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {clubs.reduce((total, club) => total + club.played, 0)}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Played
                  </p>
                </div>

                <div className="rounded-[18px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">2026</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Season
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6b1570] sm:text-sm">
            Clubs
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
            2026 Season Clubs
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club, index) => (
            <article
              key={club.id}
              className="overflow-hidden rounded-[28px] border border-[#eadfec] bg-white shadow-[0_14px_38px_rgba(55,0,60,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(55,0,60,0.1)] sm:rounded-[34px]"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[#37003c] to-[#8a087e] px-5 py-6 text-white sm:px-6 sm:py-7">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-white/60 sm:text-sm">
                      Club #{index + 1}
                    </p>

                    <h3 className="mt-4 max-w-[230px] text-[34px] font-black leading-[0.95] tracking-[-0.055em] sm:text-4xl">
                      {club.name}
                    </h3>
                  </div>

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-2 text-sm font-black text-white ring-1 ring-white/15 sm:h-20 sm:w-20 sm:rounded-[26px]">
                    {club.logo ? (
                      <Image
                        src={club.logo}
                        alt={club.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      club.tag
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[20px] bg-[#fbf8fc] p-4 sm:rounded-[22px]">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#6b1570] sm:text-xs">
                      Points
                    </p>

                    <p className="mt-2 text-4xl font-black tracking-[-0.05em]">
                      {club.points}
                    </p>
                  </div>

                  <div className="rounded-[20px] bg-[#fbf8fc] p-4 sm:rounded-[22px]">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#6b1570] sm:text-xs">
                      Record
                    </p>

                    <p className="mt-2 text-2xl font-black tracking-[-0.05em] leading-tight">
                      {record(club)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-[18px] bg-[#f0e8f2] p-3 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6b1570]">
                      GF
                    </p>
                    <p className="mt-1 text-2xl font-black">{club.gf}</p>
                  </div>

                  <div className="rounded-[18px] bg-[#f0e8f2] p-3 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6b1570]">
                      GA
                    </p>
                    <p className="mt-1 text-2xl font-black">{club.ga}</p>
                  </div>

                  <div className="rounded-[18px] bg-[#f0e8f2] p-3 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6b1570]">
                      GD
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      {club.gf - club.ga}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {club.form.map((item, formIndex) => (
                    <span
                      key={`${club.id}-${formIndex}`}
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white",
                        item === "W"
                          ? "bg-[#00a65a]"
                          : item === "D"
                          ? "bg-[#75657d]"
                          : "bg-[#d91f4c]",
                      ].join(" ")}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}