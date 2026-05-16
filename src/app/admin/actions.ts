"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { getLeagueData, saveLeagueData } from "@/lib/league-data";

async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin");
  }

  return session;
}

function makeId(text: string) {
  const clean = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${clean || "item"}-${Date.now()}`;
}

function safeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
}

function refresh(tab: string, saved: string) {
  revalidatePath("/");
  revalidatePath("/teams");
  revalidatePath("/standings");
  revalidatePath("/fixtures");
  revalidatePath("/results");
  revalidatePath("/news");
  revalidatePath("/admin");

  redirect(`/admin?tab=${tab}&saved=${saved}`);
}

async function handleLogoUpload(formData: FormData, teamId: string) {
  const uploadedLogo = formData.get("logoFile");
  const fallbackLogo = String(formData.get("logo") || "");

  if (!(uploadedLogo instanceof File) || uploadedLogo.size === 0) {
    return fallbackLogo;
  }

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(uploadedLogo.type)) {
    return fallbackLogo;
  }

  const uploadDir = path.join(process.cwd(), "public/uploads/logos");
  await fs.mkdir(uploadDir, { recursive: true });

  const bytes = await uploadedLogo.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${teamId}-${Date.now()}-${safeFileName(uploadedLogo.name)}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, buffer);

  return `/uploads/logos/${fileName}`;
}

/* TEAMS */

export async function addTeamAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const name = String(formData.get("name") || "New Team");
  const tag = String(formData.get("tag") || "NT").toUpperCase();
  const id = makeId(name);
  const logo = await handleLogoUpload(formData, id);

  data.teams.push({
    id,
    name,
    tag,
    logo,
    form: ["W", "D", "L", "W", "D"],
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    points: 0,
  });

  await saveLeagueData(data);
  refresh("teams", "team-added");
}

export async function updateTeamAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const id = String(formData.get("id"));
  const currentTeam = data.teams.find((team) => team.id === id);
  const uploadedOrTypedLogo = await handleLogoUpload(formData, id);

  data.teams = data.teams.map((team) => {
    if (team.id !== id) return team;

    const gf = Number(formData.get("gf") || 0);
    const ga = Number(formData.get("ga") || 0);

    return {
      ...team,
      name: String(formData.get("name") || team.name),
      tag: String(formData.get("tag") || team.tag).toUpperCase(),
      logo: uploadedOrTypedLogo || currentTeam?.logo || "",
      form: String(formData.get("form") || "")
        .split(" ")
        .map((item) => item.trim().toUpperCase())
        .filter(Boolean),
      played: Number(formData.get("played") || 0),
      won: Number(formData.get("won") || 0),
      drawn: Number(formData.get("drawn") || 0),
      lost: Number(formData.get("lost") || 0),
      gf,
      ga,
      gd: gf - ga,
      points: Number(formData.get("points") || 0),
    };
  });

  await saveLeagueData(data);
  refresh("teams", "team-updated");
}

export async function removeTeamAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();
  const id = String(formData.get("id"));

  data.teams = data.teams.filter((team) => team.id !== id);

  await saveLeagueData(data);
  refresh("teams", "team-removed");
}

/* FIXTURES */

export async function addFixtureAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const matchweek = String(formData.get("matchweek") || "Matchweek 1");
  const date = String(formData.get("date") || "TBA");

  let group = data.fixtures.find(
    (item) => item.matchweek === matchweek && item.date === date
  );

  if (!group) {
    group = {
      id: makeId(matchweek),
      matchweek,
      date,
      matches: [],
    };

    data.fixtures.push(group);
  }

  group.matches.push({
    id: makeId("fixture"),
    time: String(formData.get("time") || "15:00"),
    home: String(formData.get("home") || "Home Team"),
    away: String(formData.get("away") || "Away Team"),
    venue: String(formData.get("venue") || "TBA"),
  });

  await saveLeagueData(data);
  refresh("fixtures", "fixture-added");
}

export async function updateFixtureAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const groupId = String(formData.get("groupId"));
  const matchId = String(formData.get("matchId"));

  data.fixtures = data.fixtures.map((group) => {
    if (group.id !== groupId) return group;

    return {
      ...group,
      matchweek: String(formData.get("matchweek") || group.matchweek),
      date: String(formData.get("date") || group.date),
      matches: group.matches.map((match) => {
        if (match.id !== matchId) return match;

        return {
          ...match,
          time: String(formData.get("time") || match.time),
          venue: String(formData.get("venue") || match.venue),
          home: String(formData.get("home") || match.home),
          away: String(formData.get("away") || match.away),
        };
      }),
    };
  });

  await saveLeagueData(data);
  refresh("fixtures", "fixture-updated");
}

export async function removeFixtureAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const groupId = String(formData.get("groupId"));
  const matchId = String(formData.get("matchId"));

  data.fixtures = data.fixtures
    .map((group) => {
      if (group.id !== groupId) return group;

      return {
        ...group,
        matches: group.matches.filter((match) => match.id !== matchId),
      };
    })
    .filter((group) => group.matches.length > 0);

  await saveLeagueData(data);
  refresh("fixtures", "fixture-removed");
}

/* RESULTS */

export async function addResultAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const matchweek = String(formData.get("matchweek") || "Matchweek 1");
  const date = String(formData.get("date") || "TBA");

  let group = data.results.find(
    (item) => item.matchweek === matchweek && item.date === date
  );

  if (!group) {
    group = {
      id: makeId(matchweek),
      matchweek,
      date,
      matches: [],
    };

    data.results.push(group);
  }

  group.matches.push({
    id: makeId("result"),
    home: String(formData.get("home") || "Home Team"),
    away: String(formData.get("away") || "Away Team"),
    homeScore: Number(formData.get("homeScore") || 0),
    awayScore: Number(formData.get("awayScore") || 0),
    venue: String(formData.get("venue") || "TBA"),
    status: String(formData.get("status") || "Full-time"),
    playerOfMatch: String(formData.get("playerOfMatch") || "TBA"),
    scorers: String(formData.get("scorers") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  });

  await saveLeagueData(data);
  refresh("results", "result-added");
}

export async function updateResultAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const groupId = String(formData.get("groupId"));
  const matchId = String(formData.get("matchId"));

  data.results = data.results.map((group) => {
    if (group.id !== groupId) return group;

    return {
      ...group,
      matchweek: String(formData.get("matchweek") || group.matchweek),
      date: String(formData.get("date") || group.date),
      matches: group.matches.map((match) => {
        if (match.id !== matchId) return match;

        return {
          ...match,
          home: String(formData.get("home") || match.home),
          away: String(formData.get("away") || match.away),
          homeScore: Number(formData.get("homeScore") || 0),
          awayScore: Number(formData.get("awayScore") || 0),
          status: String(formData.get("status") || match.status),
          venue: String(formData.get("venue") || match.venue),
          playerOfMatch: String(
            formData.get("playerOfMatch") || match.playerOfMatch
          ),
          scorers: String(formData.get("scorers") || "")
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
        };
      }),
    };
  });

  await saveLeagueData(data);
  refresh("results", "result-updated");
}

export async function removeResultAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const groupId = String(formData.get("groupId"));
  const matchId = String(formData.get("matchId"));

  data.results = data.results
    .map((group) => {
      if (group.id !== groupId) return group;

      return {
        ...group,
        matches: group.matches.filter((match) => match.id !== matchId),
      };
    })
    .filter((group) => group.matches.length > 0);

  await saveLeagueData(data);
  refresh("results", "result-removed");
}

/* NEWS */

export async function addNewsAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  data.news.stories.push({
    id: makeId("news"),
    title: String(formData.get("title") || "New story"),
    category: String(formData.get("category") || "League"),
    date: String(formData.get("date") || "TBA"),
    readTime: String(formData.get("readTime") || "2 min read"),
    description: String(formData.get("description") || ""),
  });

  await saveLeagueData(data);
  refresh("news", "news-added");
}

export async function updateNewsAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const id = String(formData.get("id"));

  const updateItem = (item: typeof data.news.featured) => {
    if (item.id !== id) return item;

    return {
      ...item,
      title: String(formData.get("title") || item.title),
      category: String(formData.get("category") || item.category),
      date: String(formData.get("date") || item.date),
      readTime: String(formData.get("readTime") || item.readTime),
      description: String(formData.get("description") || item.description),
    };
  };

  data.news.featured = updateItem(data.news.featured);
  data.news.stories = data.news.stories.map(updateItem);

  await saveLeagueData(data);
  refresh("news", "news-updated");
}

export async function removeNewsAction(formData: FormData) {
  await requireAdmin();

  const data = await getLeagueData();

  const id = String(formData.get("id"));

  data.news.stories = data.news.stories.filter((item) => item.id !== id);

  await saveLeagueData(data);
  refresh("news", "news-removed");
}
