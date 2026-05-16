import TeamBadge from "@/components/TeamBadge";
import {
  getLeagueData,
  getTeamLogo,
  getTeamName,
  getTeamTag,
} from "@/lib/league-data";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const data = await getLeagueData();
  const { results } = data;

  const allMatches = results.flatMap((group) => group.matches);
  const totalGoals = allMatches.reduce(
    (sum, match) => sum + match.homeScore + match.awayScore,
    0
  );

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
                Results
              </h1>

              <p className="mt-4 max-w-2xl text-[15px] font-medium leading-7 text-white/70 sm:text-lg sm:leading-8">
                Scores, match details, and scorers from completed games.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-[16px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {results.length}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Weeks
                  </p>
                </div>

                <div className="rounded-[16px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {allMatches.length}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Matches
                  </p>
                </div>

                <div className="rounded-[16px] bg-white/10 p-3 text-center backdrop-blur sm:rounded-[22px] sm:p-4">
                  <p className="text-2xl font-black sm:text-3xl">
                    {totalGoals}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                    Goals
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
            Results
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-[-0.05em] sm:mt-2 sm:text-4xl">
            Latest scores
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {results.map((group) => (
            <div
              key={group.id}
              className="overflow-hidden rounded-[24px] border border-[#eadfec] bg-white shadow-[0_14px_38px_rgba(55,0,60,0.06)] sm:rounded-[34px] sm:shadow-[0_18px_45px_rgba(55,0,60,0.07)]"
            >
              <div className="border-b border-[#eadfec] bg-[#fbf8fc] px-4 py-4 sm:px-6 sm:py-5">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6b1570] sm:text-sm sm:tracking-[0.22em]">
                  {group.matchweek}
                </p>

                <h3 className="mt-1 truncate text-lg font-black tracking-[-0.04em] sm:text-2xl">
                  {group.date}
                </h3>
              </div>

              <div className="divide-y divide-[#f0e8f2]">
                {group.matches.map((match) => {
                  const home = getTeamName(data, match.homeTeamId, match.home);
                  const away = getTeamName(data, match.awayTeamId, match.away);
                  const homeTag = getTeamTag(
                    data,
                    match.homeTeamId,
                    match.home
                  );
                  const awayTag = getTeamTag(
                    data,
                    match.awayTeamId,
                    match.away
                  );
                  const homeLogo = getTeamLogo(
                    data,
                    match.homeTeamId,
                    match.home
                  );
                  const awayLogo = getTeamLogo(
                    data,
                    match.awayTeamId,
                    match.away
                  );

                  return (
                    <article
                      key={match.id}
                      className="px-4 py-4 transition hover:bg-[#fbf8fc] sm:px-6 sm:py-5"
                    >
                      {/* Mobile result card */}
                      <div className="sm:hidden">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="rounded-full bg-[#37003c] px-3 py-1.5 text-xs font-black text-white">
                            {match.status}
                          </span>

                          <span className="max-w-[155px] truncate rounded-full border border-[#eadfec] bg-white px-3 py-1.5 text-xs font-bold text-[#75657d]">
                            {match.venue}
                          </span>
                        </div>

                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                          <div className="min-w-0 text-center">
                            <div className="mx-auto mb-2 flex justify-center">
                              <TeamBadge
                                name={home}
                                tag={homeTag}
                                logo={homeLogo}
                                size="sm"
                              />
                            </div>
                            <p className="truncate text-sm font-black tracking-[-0.03em]">
                              {home}
                            </p>
                          </div>

                          <div className="flex items-center justify-center gap-1.5">
                            <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#37003c] px-3 text-lg font-black text-white">
                              {match.homeScore}
                            </span>

                            <span className="text-sm font-black text-[#75657d]">
                              -
                            </span>

                            <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#37003c] px-3 text-lg font-black text-white">
                              {match.awayScore}
                            </span>
                          </div>

                          <div className="min-w-0 text-center">
                            <div className="mx-auto mb-2 flex justify-center">
                              <TeamBadge
                                name={away}
                                tag={awayTag}
                                logo={awayLogo}
                                size="sm"
                              />
                            </div>
                            <p className="truncate text-sm font-black tracking-[-0.03em]">
                              {away}
                            </p>
                          </div>
                        </div>

                        {match.playerOfMatch ? (
                          <div className="mt-4 rounded-2xl bg-[#fbf8fc] px-3 py-2 text-xs font-bold text-[#75657d]">
                            Player of match:{" "}
                            <span className="text-[#37003c]">
                              {match.playerOfMatch}
                            </span>
                          </div>
                        ) : null}

                        {match.scorers.length ? (
                          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                            {match.scorers.map((scorer) => (
                              <span
                                key={`${match.id}-${scorer}`}
                                className="shrink-0 rounded-full bg-[#f0e8f2] px-3 py-2 text-xs font-bold text-[#5a315f]"
                              >
                                {scorer}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {/* Tablet / desktop result row */}
                      <div className="hidden sm:block">
                        <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
                          <div className="flex min-w-0 items-center gap-3 sm:justify-end">
                            <p className="truncate text-lg font-black tracking-[-0.03em]">
                              {home}
                            </p>
                            <TeamBadge
                              name={home}
                              tag={homeTag}
                              logo={homeLogo}
                              size="sm"
                            />
                          </div>

                          <div className="flex items-center justify-center gap-2">
                            <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-[#37003c] px-4 text-xl font-black text-white">
                              {match.homeScore}
                            </span>

                            <span className="text-lg font-black text-[#75657d]">
                              -
                            </span>

                            <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-[#37003c] px-4 text-xl font-black text-white">
                              {match.awayScore}
                            </span>
                          </div>

                          <div className="flex min-w-0 items-center gap-3">
                            <TeamBadge
                              name={away}
                              tag={awayTag}
                              logo={awayLogo}
                              size="sm"
                            />
                            <p className="truncate text-lg font-black tracking-[-0.03em]">
                              {away}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-[#75657d]">
                          <span>{match.status}</span>
                          <span>{match.venue}</span>
                          <span>Player of match: {match.playerOfMatch}</span>
                        </div>

                        {match.scorers.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {match.scorers.map((scorer) => (
                              <span
                                key={`${match.id}-${scorer}`}
                                className="rounded-full bg-[#f0e8f2] px-4 py-2 text-sm font-bold text-[#5a315f]"
                              >
                                {scorer}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
