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

function goalDifference(team: { gd?: number; gf: number; ga: number }) {
  const gd = typeof team.gd === "number" ? team.gd : team.gf - team.ga;
  return gd > 0 ? `+${gd}` : gd;
}

export const dynamic = "force-dynamic";

export default async function StandingsPage() {
  const { teams } = await getLeagueData();

  const sortedTeams = teams
    .slice()
    .sort(
      (a, b) =>
        b.points - a.points ||
        (typeof b.gd === "number" ? b.gd : b.gf - b.ga) -
          (typeof a.gd === "number" ? a.gd : a.gf - a.ga) ||
        b.gf - a.gf
    );

  const totalPlayed = teams.reduce((sum, team) => sum + team.played, 0);

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
                League
                <br />
                Table
              </h1>

              <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-white/70 sm:text-lg sm:leading-8">
                Current standings for all TPS Stars League clubs.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-[16px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {teams.length}
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
        <div className="mb-4 sm:mb-6">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#6b1570] sm:text-sm">
            Standings
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] sm:mt-2 sm:text-4xl">
            2026 League Table
          </h2>
        </div>

        {/* Mobile compact table */}
        <div className="overflow-hidden rounded-[24px] border border-[#eadfec] bg-white shadow-[0_14px_38px_rgba(55,0,60,0.06)] sm:hidden">
          <div className="grid grid-cols-[42px_1fr_44px_44px_50px] border-b border-[#eadfec] bg-[#fbf8fc] px-3 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#75657d]">
            <div>Pos</div>
            <div>Club</div>
            <div className="text-center">P</div>
            <div className="text-center">GD</div>
            <div className="text-right">Pts</div>
          </div>

          <div className="divide-y divide-[#f0e8f2]">
            {sortedTeams.map((team, index) => (
              <div
                key={team.id}
                className="relative grid grid-cols-[42px_1fr_44px_44px_50px] items-center px-3 py-3"
              >
                <span
                  className={`absolute left-0 top-0 h-full w-1 ${positionAccent(
                    index + 1
                  )}`}
                />

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e8f2] text-xs font-black">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <TeamBadge
                      name={team.name}
                      tag={team.tag}
                      logo={team.logo}
                      size="sm"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black tracking-[-0.03em]">
                        {team.name}
                      </p>
                      <p className="text-[11px] font-bold text-[#75657d]">
                        {team.won}W {team.drawn}D {team.lost}L
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex gap-1">
                    {team.form.slice(0, 5).map((result, formIndex) => (
                      <span
                        key={`${team.id}-${formIndex}`}
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black ${formClass(
                          result
                        )}`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center text-sm font-black">
                  {team.played}
                </div>

                <div className="text-center text-sm font-black">
                  {goalDifference(team)}
                </div>

                <div className="text-right text-2xl font-black tracking-[-0.06em]">
                  {team.points}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet / desktop full table */}
        <div className="hidden overflow-hidden rounded-[34px] border border-[#eadfec] bg-white shadow-[0_18px_45px_rgba(55,0,60,0.07)] sm:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
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
                {sortedTeams.map((team, index) => (
                  <tr
                    key={team.id}
                    className="group border-b border-[#f0e8f2] transition hover:bg-[#fbf8fc]"
                  >
                    <td className="relative px-5 py-5">
                      <span
                        className={`absolute left-0 top-0 h-full w-1.5 ${positionAccent(
                          index + 1
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

                    <td className="px-4 py-5 text-center font-bold">
                      {team.played}
                    </td>
                    <td className="px-4 py-5 text-center font-bold">
                      {team.won}
                    </td>
                    <td className="px-4 py-5 text-center font-bold">
                      {team.drawn}
                    </td>
                    <td className="px-4 py-5 text-center font-bold">
                      {team.lost}
                    </td>
                    <td className="px-4 py-5 text-center font-bold">
                      {team.gf}
                    </td>
                    <td className="px-4 py-5 text-center font-bold">
                      {team.ga}
                    </td>
                    <td className="px-4 py-5 text-center font-black">
                      {goalDifference(team)}
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex justify-center gap-1.5">
                        {team.form.map((result, formIndex) => (
                          <span
                            key={`${team.id}-${formIndex}`}
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${formClass(
                              result
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