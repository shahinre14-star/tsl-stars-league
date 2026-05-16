import TeamBadge from "@/components/TeamBadge";
import { getLeagueData } from "@/lib/league-data";

function formClass(result: string) {
  if (result === "W") return "bg-[#00ff85] text-[#003b1f]";
  if (result === "D") return "bg-[#f6d55c] text-[#3f3000]";
  return "bg-[#ff2882] text-white";
}

function positionAccent(pos: number) {
  if (pos <= 4) return "bg-[#00ff85]";
  if (pos >= 10) return "bg-[#ff2882]";
  return "bg-[#963cff]";
}

export const dynamic = "force-dynamic";

export default async function StandingsPage() {
  const { teams } = await getLeagueData();

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
                  League
                  <br />
                  Table
                </h1>
                <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/70">
                  Current standings for all TPS Stars League clubs.
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
                  <p className="text-3xl font-black">
                    {teams.reduce((sum, team) => sum + team.played, 0)}
                  </p>
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
            Standings
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
            2026 League Table
          </h2>
        </div>

        <div className="overflow-hidden rounded-[34px] border border-[#eadfec] bg-white shadow-[0_18px_45px_rgba(55,0,60,0.07)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse">
              <thead>
                <tr className="border-b border-[#eadfec] text-left text-xs font-black uppercase tracking-[0.18em] text-[#75657d]">
                  <th className="w-[76px] px-5 py-5">Pos</th>
                  <th className="px-5 py-5">Club</th>
                  <th className="px-4 py-5 text-center">P</th>
                  <th className="px-4 py-5 text-center">W</th>
                  <th className="px-4 py-5 text-center">D</th>
                  <th className="px-4 py-5 text-center">L</th>
                  <th className="px-4 py-5 text-center">GF</th>
                  <th className="px-4 py-5 text-center">GA</th>
                  <th className="px-4 py-5 text-center">GD</th>
                  <th className="px-4 py-5 text-center">Form</th>
                  <th className="px-6 py-5 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {teams
                  .slice()
                  .sort((a, b) => b.points - a.points || b.gd - a.gd)
                  .map((team, index) => (
                    <tr
                      key={team.id}
                      className="group border-b border-[#f0e8f2] transition hover:bg-[#fbf8fc]"
                    >
                      <td className="relative px-5 py-5">
                        <span
                          className={`absolute left-0 top-0 h-full w-1.5 ${positionAccent(
                            index + 1,
                          )}`}
                        />
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e8f2] text-sm font-black text-[#37003c]">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-4">
                          <TeamBadge
                            name={team.name}
                            tag={team.tag}
                            logo={team.logo}
                          />
                          <div>
                            <p className="text-lg font-black tracking-[-0.03em]">
                              {team.name}
                            </p>
                            <p className="text-sm font-medium text-[#75657d]">
                              TPS Stars League
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center font-bold">{team.played}</td>
                      <td className="px-4 py-5 text-center font-bold">{team.won}</td>
                      <td className="px-4 py-5 text-center font-bold">{team.drawn}</td>
                      <td className="px-4 py-5 text-center font-bold">{team.lost}</td>
                      <td className="px-4 py-5 text-center font-bold">{team.gf}</td>
                      <td className="px-4 py-5 text-center font-bold">{team.ga}</td>
                      <td className="px-4 py-5 text-center font-black">
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex justify-center gap-1.5">
                          {team.form.map((result, formIndex) => (
                            <span
                              key={`${team.id}-${formIndex}`}
                              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${formClass(
                                result,
                              )}`}
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-3xl font-black tracking-[-0.06em]">
                          {team.points}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
