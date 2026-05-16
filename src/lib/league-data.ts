import { readFile, writeFile } from "node:fs/promises";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import path from "node:path";

export type Team = {
  id: string;
  name: string;
  tag: string;
  logo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: string[];
};

export type FixtureMatch = {
  id: string;
  time: string;
  home: string;
  away: string;
  homeTeamId?: string;
  awayTeamId?: string;
  venue: string;
};

export type FixtureGroup = {
  id: string;
  matchweek: string;
  date: string;
  matches: FixtureMatch[];
};

export type ResultMatch = {
  id: string;
  home: string;
  away: string;
  homeTeamId?: string;
  awayTeamId?: string;
  homeScore: number;
  awayScore: number;
  venue: string;
  status: string;
  playerOfMatch: string;
  scorers: string[];
};

export type ResultGroup = {
  id: string;
  matchweek: string;
  date: string;
  matches: ResultMatch[];
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
};

export type LeagueData = {
  teams: Team[];
  fixtures: FixtureGroup[];
  results: ResultGroup[];
  news: {
    featured: NewsItem;
    stories: NewsItem[];
  };
};

const dataPath = path.join(process.cwd(), "data", "league.json");

export async function getLeagueData(): Promise<LeagueData> {
  noStore();

  const raw = await readFile(dataPath, "utf8");

  return normalizeLeagueLinks(JSON.parse(raw) as LeagueData);
}

export async function saveLeagueData(data: LeagueData) {
  await writeFile(
    dataPath,
    `${JSON.stringify(normalizeLeagueLinks(data), null, 2)}\n`,
    "utf8",
  );
  revalidatePath("/", "layout");
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findTeamByReference(data: LeagueData, reference: string) {
  const normalized = reference.trim().toLowerCase();
  const slug = slugify(reference);

  return (
    data.teams.find(
      (team) =>
        team.id === reference ||
        team.id === slug ||
        team.name.trim().toLowerCase() === normalized ||
        team.tag.trim().toLowerCase() === normalized,
    ) ?? null
  );
}

export function getTeamName(
  data: LeagueData,
  teamId: string | undefined,
  fallback: string,
) {
  const team =
    data.teams.find((item) => item.id === teamId) ??
    findTeamByReference(data, fallback);

  return team?.name ?? fallback;
}

export function getTeamTag(
  data: LeagueData,
  teamId: string | undefined,
  fallback: string,
) {
  const team =
    data.teams.find((item) => item.id === teamId) ??
    findTeamByReference(data, fallback);

  return team?.tag || initials(team?.name ?? fallback);
}

export function getTeamLogo(
  data: LeagueData,
  teamId: string | undefined,
  fallback: string,
) {
  const team =
    data.teams.find((item) => item.id === teamId) ??
    findTeamByReference(data, fallback);

  return team?.logo ?? "";
}

export function normalizeLeagueLinks(data: LeagueData) {
  for (const group of data.fixtures) {
    for (const match of group.matches) {
      const homeTeam =
        data.teams.find((team) => team.id === match.homeTeamId) ??
        findTeamByReference(data, match.home);
      const awayTeam =
        data.teams.find((team) => team.id === match.awayTeamId) ??
        findTeamByReference(data, match.away);

      if (homeTeam) {
        match.homeTeamId = homeTeam.id;
        match.home = homeTeam.name;
      }

      if (awayTeam) {
        match.awayTeamId = awayTeam.id;
        match.away = awayTeam.name;
      }
    }
  }

  for (const group of data.results) {
    for (const match of group.matches) {
      const homeTeam =
        data.teams.find((team) => team.id === match.homeTeamId) ??
        findTeamByReference(data, match.home);
      const awayTeam =
        data.teams.find((team) => team.id === match.awayTeamId) ??
        findTeamByReference(data, match.away);

      if (homeTeam) {
        match.homeTeamId = homeTeam.id;
        match.home = homeTeam.name;
      }

      if (awayTeam) {
        match.awayTeamId = awayTeam.id;
        match.away = awayTeam.name;
      }
    }
  }

  return data;
}

export function toInt(value: FormDataEntryValue | null) {
  const number = Number.parseInt(String(value ?? "0"), 10);

  return Number.isFinite(number) ? number : 0;
}

export function toText(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export function toForm(value: FormDataEntryValue | null) {
  return toText(value)
    .toUpperCase()
    .split(/[\s,]+/)
    .filter((result) => ["W", "D", "L"].includes(result))
    .slice(0, 5);
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
