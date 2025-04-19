import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import db from '@/db/prisma';

export async function POST(req: Request) {
  try {
    const { repoUrl } = await req.json();

    if (!repoUrl) {
      return NextResponse.json({ error: "Repository URL is required" }, { status: 400 });
    }

    const [owner, repo] = repoUrl.replace("https://github.com/", "").split("/");
    if (!owner || !repo) {
      return NextResponse.json({ error: "Invalid GitHub repository URL" }, { status: 400 });
    }

    const octokit = new Octokit();
    const { data } = await octokit.repos.get({ owner, repo });

    const repoEntry = await db.repository.upsert({
      where: { url: repoUrl },
      update: { name: data.name, description: data.description || "No description available." },
      create: {
        url: repoUrl,
        name: data.name,
        description: data.description || "No description available.",
      },
    });

    return NextResponse.json({ success: true, repository: repoEntry });
  } catch (error) {
    console.error("Error fetching repo:", error);
    return NextResponse.json({ error: "Failed to fetch repository" }, { status: 500 });
  }
}