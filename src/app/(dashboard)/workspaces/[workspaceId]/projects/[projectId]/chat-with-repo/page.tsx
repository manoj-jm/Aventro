"use client";

import { useState } from "react";
import RepoInput from "@/components/RepoInput";
import ChatDialog from "@/components/ChatDialog";

export default function Home() {
    const [repo, setRepo] = useState<any | null>(null);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Chat with your GitHub Repo</h1>
            <RepoInput onRepoFetched={setRepo} />
            {repo && <ChatDialog repo={repo} />}
        </main>
    );
}
