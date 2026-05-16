import TeamBadge from "@/components/TeamBadge";
import {
  getLeagueData,
  getTeamLogo,
  getTeamName,
  getTeamTag,
} from "@/lib/league-data";

export const dynamic = "force-dynamic";

export default async function FixturesPage() {
  const data = await getLeagueData();
  const { fixtures, teams } = data;
  const totalMatches = fixtures.reduce(
    (sum, group) => sum + group.matches.length,
    0,
  );

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
                  Fixtures
                </h1>
                <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/70">
                  Upcoming matches, dates, times, and venues.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:min-w-[360px]">
                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">{fixtures.length}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Weeks
                  </p>
                </div>
                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">{totalMatches}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Matches
                  </p>
                </div>
                <div className="rounded-[22px] bg-white/10 p-4 text-center backdrop-blur">
                  <p className="text-3xl font-black">{teams.length}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                    Clubs
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
            Schedule
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">
            Upcoming fixtures
          </h2>
        </div>

        <div className="space-y-6">
          {fixtures.map((group) => (
            <div
              key={group.id}
              className="overflow-hidden rounded-[34px] border border-[#eadfec] bg-white shadow-[0_18px_45px_rgba(55,0,60,0.07)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eadfec] bg-[#fbf8fc] px-6 py-5">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6b1570]">
                    {group.matchweek}
                  </p>
                  <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">
                    {group.date}
                  </h3>
                </div>
                <span className="rounded-full bg-[#f0e8f2] px-4 py-2 text-sm font-bold text-[#37003c]">
                  {group.matches.length} matches
                </span>
              </div>

              <div className="divide-y divide-[#f0e8f2]">
                {group.matches.map((match) => {
                  const home = getTeamName(data, match.homeTeamId, match.home);
                  const away = getTeamName(data, match.awayTeamId, match.away);
                  const homeTag = getTeamTag(data, match.homeTeamId, match.home);
                  const awayTag = getTeamTag(data, match.awayTeamId, match.away);
                  const homeLogo = getTeamLogo(data, match.homeTeamId, match.home);
                  const awayLogo = getTeamLogo(data, match.awayTeamId, match.away);

                  return (
                    <div
                      key={match.id}
                      className="grid gap-4 px-6 py-5 transition hover:bg-[#fbf8fc] lg:grid-cols-[110px_1fr_170px]"
                    >
                      <div className="flex items-center">
                        <span className="rounded-full bg-[#37003c] px-4 py-2 text-sm font-black text-white">
                          {match.time}
                        </span>
                      </div>
                      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
                        <div className="flex items-center gap-3 sm:justify-end">
                          <p className="text-lg font-black tracking-[-0.03em]">
                            {home}
                          </p>
                          <TeamBadge
                            name={home}
                            tag={homeTag}
                            logo={homeLogo}
                            size="sm"
                          />
                        </div>
                        <div className="flex h-10 w-14 items-center justify-center rounded-full bg-[#f0e8f2] text-sm font-black text-[#37003c]">
                          v
                        </div>
                        <div className="flex items-center gap-3">
                          <TeamBadge
                            name={away}
                            tag={awayTag}
                            logo={awayLogo}
                            size="sm"
                          />
                          <p className="text-lg font-black tracking-[-0.03em]">
                            {away}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center lg:justify-end">
                        <span className="rounded-full border border-[#eadfec] bg-white px-4 py-2 text-sm font-bold text-[#75657d]">
                          {match.venue}
                        </span>
                      </div>
                    </div>
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
