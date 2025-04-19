"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RepoInput({ onRepoFetched }: { onRepoFetched: (repo: any) => void }) {
    const [repoUrl, setRepoUrl] = useState("");

    const fetchRepo = async () => {
        if (!repoUrl) return;

        const response = await fetch("/api/repo", {
            method: "POST",
            body: JSON.stringify({ repoUrl }),
        });

        const data = await response.json();

        if (data.success) {
            onRepoFetched(data.repository);
        } else {
            toast.success("Failed to fetch repository");
        }
    };

    return (
        <div className="flex gap-2">
            <Input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="Enter GitHub Repo URL" />
            <Button onClick={fetchRepo}>Fetch</Button>
        </div>
    );
}
