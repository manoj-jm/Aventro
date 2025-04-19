"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatDialog({ repo }: { repo: any }) {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");

    const askQuestion = async () => {
        setResponse("Thinking...");
        const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ repoUrl: repo.url, question }),
        });

        const data = await res.json();
        setResponse(data.answer);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Ask AI</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ask AI about {repo.name}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-64 p-2 border rounded-md">{response || "Ask a question..."}</ScrollArea>
                <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your question..." />
                <Button onClick={askQuestion}>Ask</Button>
            </DialogContent>
        </Dialog>
    );
}
