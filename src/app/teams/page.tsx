import TeamBadge from "@/components/TeamBadge";
import { getLeagueData, type Team } from "@/lib/league-data";

export const dynamic = "force-dynamic";

function TeamLogo({ team }: { team: Team }) {
  if (team.logo) {
    return (
      <div className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
        <TeamBadge
          name={team.name}
          tag={team.tag}
          logo={team.logo}
          size="lg"
          align="right"
        />
      </div>
    );
  }

  return (
    <div className="rounded-[26px] bg-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] backdrop-blur">
      <TeamBadge name={team.name} tag={team.tag} size="lg" align="right" />
    </div>
  );
}

export default async function TeamsPage() {
  const { teams } = await getLeagueData();
  const totalPlayed = teams.reduce((sum, team) => sum + team.played, 0);

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
                  Clubs
                </h1>

                <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/70">
                  Explore all TPS Stars League clubs, records, logos, and
                  season details.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:min-w-[360px]">
                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">{teams.length}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Clubs
                  </p>
                </div>

                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">{totalPlayed}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Played
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
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6b1570]">
            Clubs
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
            2026 Season Clubs
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team, index) => (
            <article
              key={team.id}
              className="group overflow-hidden rounded-[34px] border border-[#eadfec] bg-white shadow-[0_18px_45px_rgba(55,0,60,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(55,0,60,0.10)]"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[#37003c] to-[#6b1570] px-6 py-7 text-white">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/15 blur-xl" />
                <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-white/65">
                      Club #{index + 1}
                    </p>

                    <h3 className="mt-4 text-4xl font-black leading-none tracking-[-0.05em]">
                      {team.name}
                    </h3>
                  </div>

                  <TeamLogo team={team} />
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[22px] bg-[#fbf8fc] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b1570]">
                      Points
                    </p>
                    <p className="mt-2 text-3xl font-black tracking-[-0.05em]">
                      {team.points}
                    </p>
                  </div>

                  <div className="rounded-[22px] bg-[#fbf8fc] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6b1570]">
                      Record
                    </p>
                    <p className="mt-2 text-2xl font-black tracking-[-0.04em]">
                      {team.won}W {team.drawn}D {team.lost}L
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-[18px] bg-[#f0e8f2] px-3 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6b1570]">
                      GF
                    </p>
                    <p className="mt-1 text-xl font-black">{team.gf}</p>
                  </div>
                  <div className="rounded-[18px] bg-[#f0e8f2] px-3 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6b1570]">
                      GA
                    </p>
                    <p className="mt-1 text-xl font-black">{team.ga}</p>
                  </div>
                  <div className="rounded-[18px] bg-[#f0e8f2] px-3 py-3">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6b1570]">
                      GD
                    </p>
                    <p className="mt-1 text-xl font-black">
                      {team.gd > 0 ? `+${team.gd}` : team.gd}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
