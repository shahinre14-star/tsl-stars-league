import Image from "next/image";
import { getLeagueData } from "@/lib/league-data";

export const dynamic = "force-dynamic";

function record(team: { won: number; drawn: number; lost: number }) {
  return `${team.won}W ${team.drawn}D ${team.lost}L`;
}

function gd(team: { gf: number; ga: number }) {
  const difference = team.gf - team.ga;
  return difference > 0 ? `+${difference}` : difference;
}

export default async function TeamsPage() {
  const data = await getLeagueData();
  const clubs = data.teams;

  const totalPlayed = clubs.reduce((total, club) => total + club.played, 0);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f4f8] pt-[116px] text-[#37003c] lg:pt-[92px]">
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-10">
          <div className="relative overflow-hidden rounded-[26px] bg-[#37003c] px-5 py-7 text-white shadow-[0_20px_60px_rgba(55,0,60,0.16)] sm:rounded-[38px] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ff2882]/25 blur-2xl" />
            <div className="absolute -bottom-28 left-8 h-80 w-80 rounded-full bg-[#00ff85]/15 blur-2xl" />

            <div className="relative z-10">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/75 sm:px-5 sm:py-3 sm:text-sm">
                Season 2026
              </p>

              <h1 className="mt-5 text-[48px] font-black leading-[0.88] tracking-[-0.07em] sm:text-[76px] lg:text-[88px]">
                Clubs
              </h1>

              <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-white/70 sm:text-lg sm:leading-8">
                Explore TPS Stars League clubs, records, points, form, and
                season details.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-[16px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {clubs.length}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Clubs
                  </p>
                </div>

                <div className="rounded-[16px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {totalPlayed}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Played
                  </p>
                </div>

                <div className="rounded-[16px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">2026</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Season
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-8">
        <div className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#6b1570] sm:text-sm">
              Clubs
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] sm:mt-2 sm:text-4xl">
              2026 Season Clubs
            </h2>
          </div>

          <p className="hidden rounded-full bg-white px-4 py-2 text-sm font-black text-[#6b1570] shadow-[0_10px_28px_rgba(55,0,60,0.05)] sm:block">
            {clubs.length} clubs
          </p>
        </div>

        {/* Mobile compact list */}
        <div className="grid gap-3 sm:hidden">
          {clubs.map((club, index) => (
            <article
              key={club.id}
              className="rounded-[22px] border border-[#eadfec] bg-white p-3 shadow-[0_10px_28px_rgba(55,0,60,0.05)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#37003c] p-1 text-xs font-black text-white">
                    {club.logo ? (
                      <Image
                        src={club.logo}
                        alt={club.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      club.tag
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6b1570]">
                      Club #{index + 1}
                    </p>

                    <h3 className="truncate text-lg font-black leading-tight tracking-[-0.03em]">
                      {club.name}
                    </h3>

                    <p className="mt-0.5 text-xs font-bold text-[#75657d]">
                      {record(club)} · GD {gd(club)}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-3xl font-black leading-none tracking-[-0.06em]">
                    {club.points}
                  </p>
                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#75657d]">
                    PTS
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                <div className="rounded-2xl bg-[#fbf8fc] px-2 py-2 text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#6b1570]">
                    P
                  </p>
                  <p className="text-base font-black">{club.played}</p>
                </div>

                <div className="rounded-2xl bg-[#fbf8fc] px-2 py-2 text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#6b1570]">
                    GF
                  </p>
                  <p className="text-base font-black">{club.gf}</p>
                </div>

                <div className="rounded-2xl bg-[#fbf8fc] px-2 py-2 text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#6b1570]">
                    GA
                  </p>
                  <p className="text-base font-black">{club.ga}</p>
                </div>

                <div className="rounded-2xl bg-[#fbf8fc] px-2 py-2 text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#6b1570]">
                    GD
                  </p>
                  <p className="text-base font-black">{gd(club)}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-1.5">
                {club.form.slice(0, 5).map((item, formIndex) => (
                  <span
                    key={`${club.id}-${formIndex}`}
                    className={[
                      "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black text-white",
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
            </article>
          ))}
        </div>

        {/* Tablet and desktop cards */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club, index) => (
            <article
              key={club.id}
              className="overflow-hidden rounded-[34px] border border-[#eadfec] bg-white shadow-[0_14px_38px_rgba(55,0,60,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(55,0,60,0.1)]"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[#37003c] to-[#8a087e] px-6 py-7 text-white">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
                      Club #{index + 1}
                    </p>

                    <h3 className="mt-4 max-w-[250px] text-4xl font-black leading-[0.95] tracking-[-0.055em]">
                      {club.name}
                    </h3>
                  </div>

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[26px] bg-white/10 p-2 text-sm font-black text-white ring-1 ring-white/15">
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

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[22px] bg-[#fbf8fc] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b1570]">
                      Points
                    </p>

                    <p className="mt-2 text-4xl font-black tracking-[-0.05em]">
                      {club.points}
                    </p>
                  </div>

                  <div className="rounded-[22px] bg-[#fbf8fc] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b1570]">
                      Record
                    </p>

                    <p className="mt-2 text-2xl font-black leading-tight tracking-[-0.05em]">
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
                    <p className="mt-1 text-2xl font-black">{gd(club)}</p>
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