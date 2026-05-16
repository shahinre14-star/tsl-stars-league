import type { ReactNode } from "react";
import Link from "next/link";
import TeamBadge from "@/components/TeamBadge";
import {
  addFixtureAction,
  addNewsAction,
  addResultAction,
  addTeamAction,
  removeFixtureAction,
  removeNewsAction,
  removeResultAction,
  removeTeamAction,
  updateFixtureAction,
  updateNewsAction,
  updateResultAction,
  updateTeamAction,
} from "./actions";
import { getAdminSession } from "@/lib/admin-auth";
import { getLeagueData } from "@/lib/league-data";

export const dynamic = "force-dynamic";

type Tab = "overview" | "teams" | "fixtures" | "results" | "news";

function TextInput({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-[#6b1570]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete ?? "off"}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required={name === "email" || name === "password"}
        className="h-12 w-full rounded-2xl border border-[#eadfec] bg-white px-4 text-sm font-semibold text-[#37003c] outline-none transition focus:border-[#37003c] focus:ring-4 focus:ring-[#37003c]/10"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-[#6b1570]">
        {label}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={4}
        className="w-full rounded-2xl border border-[#eadfec] bg-white px-4 py-3 text-sm font-semibold text-[#37003c] outline-none transition focus:border-[#37003c] focus:ring-4 focus:ring-[#37003c]/10"
      />
    </label>
  );
}

function FileInput({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-[#6b1570]">
        {label}
      </span>
      <input
        name={name}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="block h-12 w-full cursor-pointer rounded-2xl border border-[#eadfec] bg-white px-4 py-3 text-sm font-semibold text-[#37003c] file:mr-4 file:rounded-full file:border-0 file:bg-[#37003c] file:px-4 file:py-1 file:text-xs file:font-bold file:text-white"
      />
    </label>
  );
}

function SaveButton({ label = "Save" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="inline-flex h-12 items-center justify-center rounded-full bg-[#37003c] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(55,0,60,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4b0052] active:scale-95"
    >
      {label}
    </button>
  );
}

function RemoveButton({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <button
      type="submit"
      formAction={action}
      className="inline-flex h-12 items-center justify-center rounded-full bg-[#d91f4c] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(217,31,76,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b9163c] active:scale-95"
    >
      Remove
    </button>
  );
}

function SectionHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6b1570]">
        {kicker}
      </p>
      <h2 className="mt-2 text-4xl font-black tracking-[-0.055em] text-[#37003c]">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl font-medium leading-7 text-[#75657d]">
        {description}
      </p>
    </div>
  );
}

function TabButton({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "rounded-full px-6 py-3 text-sm font-black transition-all duration-300 active:scale-95",
        active
          ? "bg-white text-[#37003c] ring-2 ring-[#37003c]/15 shadow-[0_14px_32px_rgba(55,0,60,0.10)]"
          : "bg-white text-[#37003c] shadow-[0_10px_28px_rgba(55,0,60,0.06)] hover:-translate-y-0.5 hover:bg-[#f0e8f2]",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function AnimatedPanel({ children }: { children: ReactNode }) {
  return (
    <div className="animate-[adminPanelIn_0.42s_cubic-bezier(0.22,1,0.36,1)_both]">
      {children}
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; saved?: string; tab?: string }>;
}) {
  const session = await getAdminSession();
  const data = session ? await getLeagueData() : null;
  const params = searchParams ? await searchParams : {};

  const validTabs: Tab[] = ["overview", "teams", "fixtures", "results", "news"];
  const activeTab: Tab = validTabs.includes(params.tab as Tab)
    ? (params.tab as Tab)
    : "overview";

  const teamsCount = data?.teams.length ?? 0;
  const fixturesCount =
    data?.fixtures.reduce((total, group) => total + group.matches.length, 0) ??
    0;
  const resultsCount =
    data?.results.reduce((total, group) => total + group.matches.length, 0) ??
    0;
  const newsCount = data ? 1 + (data.news.stories?.length ?? 0) : 0;

  return (
    <main className="min-h-screen bg-[#f7f4f8] pt-[126px] lg:pt-[92px] text-[#37003c]">
      <style>
        {`
          @keyframes adminPanelIn {
            from {
              opacity: 0;
              transform: translateY(18px) scale(0.985);
              filter: blur(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }
        `}
      </style>

      <section className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="relative overflow-hidden rounded-[38px] bg-[#37003c] px-7 py-10 text-white shadow-[0_28px_80px_rgba(55,0,60,0.18)] md:px-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ff2882]/30 blur-2xl" />
          <div className="absolute -bottom-32 left-20 h-96 w-96 rounded-full bg-[#00ff85]/20 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-white/75">
                League Staff Portal
              </p>

              <h1 className="mt-7 text-[58px] font-black leading-[0.9] tracking-[-0.07em] sm:text-[82px]">
                Admin
                <br />
                Dashboard
              </h1>

              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/70">
                Add, remove, and edit teams, fixtures, results, and news.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15 active:scale-95"
              >
                View site
              </Link>

              {session ? (
                <form action="/admin/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-full bg-white px-6 py-3 font-black text-[#37003c] transition hover:bg-[#f0e8f2] active:scale-95"
                  >
                    Sign out
                  </button>
                </form>
              ) : null}
            </div>
          </div>
        </div>

        {!session ? (
          <AnimatedPanel>
            <div className="mx-auto mt-8 max-w-[560px] overflow-hidden rounded-[36px] border border-[#eadfec] bg-white p-8 shadow-[0_30px_80px_rgba(55,0,60,0.12)]">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6b1570]">
                Admin Portal
              </p>

              <h2 className="mt-3 text-5xl font-black tracking-[-0.05em]">
                Sign in
              </h2>

              <p className="mt-3 font-medium leading-7 text-[#75657d]">
                Enter your staff details to edit league content.
              </p>

              {params.error === "invalid" ? (
                <div className="mt-6 rounded-2xl border border-[#d91f4c]/20 bg-[#d91f4c]/10 px-5 py-4 text-sm font-bold text-[#9f1436]">
                  Wrong email or password. Please try again.
                </div>
              ) : null}

              {params.error === "config" ? (
                <div className="mt-6 rounded-2xl border border-[#d91f4c]/20 bg-[#d91f4c]/10 px-5 py-4 text-sm font-bold text-[#9f1436]">
                  Admin login is not configured on this deployment. Add the
                  TSL admin environment variables and redeploy.
                </div>
              ) : null}

              <form action="/admin/login" method="post" className="mt-8 space-y-5">
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tslstaff@tsl.com"
                  autoComplete="username"
                />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />

                <button
                  type="submit"
                  className="h-14 w-full rounded-full bg-[#37003c] text-base font-semibold text-white shadow-[0_16px_35px_rgba(55,0,60,0.22)] transition hover:-translate-y-0.5 hover:bg-[#4b0052] active:scale-95"
                >
                  Sign in
                </button>
              </form>
            </div>
          </AnimatedPanel>
        ) : (
          <div className="mt-8 space-y-7">
            {params.saved ? (
              <div className="rounded-[24px] border border-[#00a65a]/20 bg-[#00ff85]/15 px-6 py-4 text-sm font-black text-[#006b39]">
                Saved {params.saved}. Public pages were refreshed.
              </div>
            ) : null}

            <div className="sticky top-[104px] z-40 rounded-[32px] border border-[#eadfec] bg-[#f7f4f8]/90 p-3 shadow-[0_18px_45px_rgba(55,0,60,0.08)] backdrop-blur">
              <div className="flex flex-wrap gap-3">
                <TabButton href="/admin?tab=overview" label="Overview" active={activeTab === "overview"} />
                <TabButton href="/admin?tab=teams" label="Edit Teams" active={activeTab === "teams"} />
                <TabButton href="/admin?tab=fixtures" label="Edit Fixtures" active={activeTab === "fixtures"} />
                <TabButton href="/admin?tab=results" label="Edit Results" active={activeTab === "results"} />
                <TabButton href="/admin?tab=news" label="Edit News" active={activeTab === "news"} />
              </div>
            </div>

            {activeTab === "overview" ? (
              <AnimatedPanel>
                <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Teams", teamsCount, "Add, remove, or edit clubs", "/admin?tab=teams"],
                    ["Fixtures", fixturesCount, "Add, remove, or edit matches", "/admin?tab=fixtures"],
                    ["Results", resultsCount, "Add, remove, or edit scores", "/admin?tab=results"],
                    ["News", newsCount, "Add, remove, or edit stories", "/admin?tab=news"],
                  ].map(([label, count, copy, href]) => (
                    <Link
                      key={String(label)}
                      href={String(href)}
                      className="rounded-[30px] border border-[#eadfec] bg-white p-6 shadow-[0_12px_35px_rgba(55,0,60,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(55,0,60,0.1)] active:scale-[0.98]"
                    >
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b1570]">
                        {label}
                      </p>
                      <p className="mt-4 text-5xl font-black tracking-[-0.06em]">
                        {count}
                      </p>
                      <p className="mt-2 font-medium text-[#75657d]">
                        {copy}
                      </p>
                    </Link>
                  ))}
                </section>
              </AnimatedPanel>
            ) : null}

            {activeTab === "teams" ? (
              <AnimatedPanel>
                <section className="rounded-[36px] border border-[#eadfec] bg-white p-6 shadow-[0_18px_45px_rgba(55,0,60,0.07)]">
                  <SectionHeader
                    kicker="Club Editor"
                    title="Teams"
                    description="Add, remove, or edit clubs."
                  />

                  <form
                    action={addTeamAction}
                    className="mb-6 rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.04em]">
                          Add new team
                        </h3>
                        <p className="font-medium text-[#75657d]">
                          Create a new club.
                        </p>
                      </div>
                      <SaveButton label="Add Team" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <TextInput label="Name" name="name" placeholder="New Club" />
                      <TextInput label="Tag" name="tag" placeholder="NC" />
                      <TextInput label="Logo URL" name="logo" placeholder="/uploads/logo.png" />
                      <FileInput label="Upload logo" name="logoFile" />
                    </div>
                  </form>

                  <div className="grid gap-5">
                    {data?.teams.map((team) => (
                      <form
                        key={team.id}
                        action={updateTeamAction}
                        className="rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5 transition hover:bg-white"
                      >
                        <input type="hidden" name="id" value={team.id} />

                        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <TeamBadge
                              name={team.name}
                              tag={team.tag}
                              logo={team.logo}
                            />

                            <div>
                              <h3 className="text-2xl font-black tracking-[-0.04em]">
                                {team.name}
                              </h3>
                              <p className="font-medium text-[#75657d]">
                                {team.won}W {team.drawn}D {team.lost}L ·{" "}
                                {team.points} pts
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <SaveButton />
                            <RemoveButton action={removeTeamAction} />
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                          <TextInput label="Name" name="name" defaultValue={team.name} />
                          <TextInput label="Tag" name="tag" defaultValue={team.tag} />
                          <TextInput label="Logo URL" name="logo" defaultValue={team.logo} />
                          <FileInput label="Upload new logo" name="logoFile" />
                          <TextInput label="Form" name="form" defaultValue={team.form.join(" ")} />
                          <TextInput label="Played" name="played" type="number" defaultValue={team.played} />
                          <TextInput label="Won" name="won" type="number" defaultValue={team.won} />
                          <TextInput label="Drawn" name="drawn" type="number" defaultValue={team.drawn} />
                          <TextInput label="Lost" name="lost" type="number" defaultValue={team.lost} />
                          <TextInput label="GF" name="gf" type="number" defaultValue={team.gf} />
                          <TextInput label="GA" name="ga" type="number" defaultValue={team.ga} />
                          <TextInput label="Points" name="points" type="number" defaultValue={team.points} />
                        </div>
                      </form>
                    ))}
                  </div>
                </section>
              </AnimatedPanel>
            ) : null}

            {activeTab === "fixtures" ? (
              <AnimatedPanel>
                <section className="rounded-[36px] border border-[#eadfec] bg-white p-6 shadow-[0_18px_45px_rgba(55,0,60,0.07)]">
                  <SectionHeader
                    kicker="Match Editor"
                    title="Fixtures"
                    description="Add, remove, or edit upcoming matches."
                  />

                  <form
                    action={addFixtureAction}
                    className="mb-6 rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.04em]">
                          Add new fixture
                        </h3>
                        <p className="font-medium text-[#75657d]">
                          Create a new upcoming match.
                        </p>
                      </div>
                      <SaveButton label="Add Fixture" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <TextInput label="Matchweek" name="matchweek" placeholder="Matchweek 1" />
                      <TextInput label="Date" name="date" placeholder="Saturday, 24 Jan 2026" />
                      <TextInput label="Time" name="time" placeholder="15:00" />
                      <TextInput label="Venue" name="venue" placeholder="TPS Arena" />
                      <TextInput label="Home" name="home" placeholder="TPS Stars" />
                      <TextInput label="Away" name="away" placeholder="Ronna FC" />
                    </div>
                  </form>

                  <div className="grid gap-5">
                    {data?.fixtures.flatMap((group) =>
                      group.matches.map((match) => (
                        <form
                          key={match.id}
                          action={updateFixtureAction}
                          className="rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5 transition hover:bg-white"
                        >
                          <input type="hidden" name="groupId" value={group.id} />
                          <input type="hidden" name="matchId" value={match.id} />

                          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <h3 className="text-2xl font-black tracking-[-0.04em]">
                                {match.home} vs {match.away}
                              </h3>
                              <p className="font-medium text-[#75657d]">
                                {group.matchweek} · {group.date} · {match.time}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <SaveButton />
                              <RemoveButton action={removeFixtureAction} />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <TextInput label="Matchweek" name="matchweek" defaultValue={group.matchweek} />
                            <TextInput label="Date" name="date" defaultValue={group.date} />
                            <TextInput label="Time" name="time" defaultValue={match.time} />
                            <TextInput label="Venue" name="venue" defaultValue={match.venue} />
                            <TextInput label="Home" name="home" defaultValue={match.home} />
                            <TextInput label="Away" name="away" defaultValue={match.away} />
                          </div>
                        </form>
                      ))
                    )}
                  </div>
                </section>
              </AnimatedPanel>
            ) : null}

            {activeTab === "results" ? (
              <AnimatedPanel>
                <section className="rounded-[36px] border border-[#eadfec] bg-white p-6 shadow-[0_18px_45px_rgba(55,0,60,0.07)]">
                  <SectionHeader
                    kicker="Score Editor"
                    title="Results"
                    description="Add, remove, or edit completed results."
                  />

                  <form
                    action={addResultAction}
                    className="mb-6 rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.04em]">
                          Add new result
                        </h3>
                        <p className="font-medium text-[#75657d]">
                          Add a completed match score.
                        </p>
                      </div>
                      <SaveButton label="Add Result" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <TextInput label="Matchweek" name="matchweek" placeholder="Matchweek 1" />
                      <TextInput label="Date" name="date" placeholder="Saturday, 10 Jan 2026" />
                      <TextInput label="Home" name="home" placeholder="TPS Stars" />
                      <TextInput label="Away" name="away" placeholder="Ronna FC" />
                      <TextInput label="Home score" name="homeScore" type="number" />
                      <TextInput label="Away score" name="awayScore" type="number" />
                      <TextInput label="Status" name="status" placeholder="Full-time" />
                      <TextInput label="Venue" name="venue" placeholder="TPS Arena" />
                      <TextInput label="Player of match" name="playerOfMatch" placeholder="Player name" />
                      <div className="md:col-span-2 xl:col-span-3">
                        <TextArea label="Scorers, one per line" name="scorers" defaultValue="" />
                      </div>
                    </div>
                  </form>

                  <div className="grid gap-5">
                    {data?.results.flatMap((group) =>
                      group.matches.map((match) => (
                        <form
                          key={match.id}
                          action={updateResultAction}
                          className="rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5 transition hover:bg-white"
                        >
                          <input type="hidden" name="groupId" value={group.id} />
                          <input type="hidden" name="matchId" value={match.id} />

                          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <h3 className="text-2xl font-black tracking-[-0.04em]">
                                {match.home} {match.homeScore}-{match.awayScore}{" "}
                                {match.away}
                              </h3>
                              <p className="font-medium text-[#75657d]">
                                {group.matchweek} · {match.status}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <SaveButton />
                              <RemoveButton action={removeResultAction} />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <TextInput label="Matchweek" name="matchweek" defaultValue={group.matchweek} />
                            <TextInput label="Date" name="date" defaultValue={group.date} />
                            <TextInput label="Home" name="home" defaultValue={match.home} />
                            <TextInput label="Away" name="away" defaultValue={match.away} />
                            <TextInput label="Home score" name="homeScore" type="number" defaultValue={match.homeScore} />
                            <TextInput label="Away score" name="awayScore" type="number" defaultValue={match.awayScore} />
                            <TextInput label="Status" name="status" defaultValue={match.status} />
                            <TextInput label="Venue" name="venue" defaultValue={match.venue} />
                            <TextInput label="Player of match" name="playerOfMatch" defaultValue={match.playerOfMatch} />
                            <div className="md:col-span-2 xl:col-span-3">
                              <TextArea label="Scorers, one per line" name="scorers" defaultValue={match.scorers.join("\n")} />
                            </div>
                          </div>
                        </form>
                      ))
                    )}
                  </div>
                </section>
              </AnimatedPanel>
            ) : null}

            {activeTab === "news" ? (
              <AnimatedPanel>
                <section className="rounded-[36px] border border-[#eadfec] bg-white p-6 shadow-[0_18px_45px_rgba(55,0,60,0.07)]">
                  <SectionHeader
                    kicker="Media Editor"
                    title="News"
                    description="Add, remove, or edit news stories."
                  />

                  <form
                    action={addNewsAction}
                    className="mb-6 rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.04em]">
                          Add news story
                        </h3>
                        <p className="font-medium text-[#75657d]">
                          Publish a new league update.
                        </p>
                      </div>
                      <SaveButton label="Add News" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <TextInput label="Title" name="title" placeholder="New story title" />
                      <TextInput label="Category" name="category" placeholder="League" />
                      <TextInput label="Date" name="date" placeholder="25 Jan 2026" />
                      <TextInput label="Read time" name="readTime" placeholder="2 min read" />
                      <div className="md:col-span-2 xl:col-span-3">
                        <TextArea label="Description" name="description" defaultValue="" />
                      </div>
                    </div>
                  </form>

                  <div className="grid gap-5">
                    {[data?.news.featured, ...(data?.news.stories ?? [])].map(
                      (item) =>
                        item ? (
                          <form
                            key={item.id}
                            action={updateNewsAction}
                            className="rounded-[28px] border border-[#eadfec] bg-[#fbf8fc] p-5 transition hover:bg-white"
                          >
                            <input type="hidden" name="id" value={item.id} />

                            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                              <div>
                                <h3 className="text-2xl font-black tracking-[-0.04em]">
                                  {item.title}
                                </h3>
                                <p className="font-medium text-[#75657d]">
                                  {item.category} · {item.date}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-3">
                                <SaveButton />
                                {item.id !== data?.news.featured?.id ? (
                                  <RemoveButton action={removeNewsAction} />
                                ) : null}
                              </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                              <TextInput label="Title" name="title" defaultValue={item.title} />
                              <TextInput label="Category" name="category" defaultValue={item.category} />
                              <TextInput label="Date" name="date" defaultValue={item.date} />
                              <TextInput label="Read time" name="readTime" defaultValue={item.readTime} />
                              <div className="md:col-span-2 xl:col-span-3">
                                <TextArea label="Description" name="description" defaultValue={item.description} />
                              </div>
                            </div>
                          </form>
                        ) : null
                    )}
                  </div>
                </section>
              </AnimatedPanel>
            ) : null}
          </div>
        )}
      </section>
    </main>
  );
}
