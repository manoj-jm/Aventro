'use client';

import { useState } from 'react';
import { askQuestion } from '@/lib/actions/ask.actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

export default function ChatPage({ params }: { params: { repoId: string } }) {
    const [question, setQuestion] = useState('');
    const [streamResponse, setStreamResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const { repoId } = params;

    async function handleSubmit() {
        setLoading(true);
        setStreamResponse('');

        const textStream = await askQuestion(question, repoId);

        for await (const chunk of textStream) {
            setStreamResponse((prev) => prev + chunk);
        }

        setLoading(false);
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Ask a Question About This Repo</h1>

            <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question about the repo..."
                rows={4}
            />

            <Button onClick={handleSubmit} disabled={loading || !question.trim()}>
                {loading ? 'Thinking...' : 'Ask AI'}
            </Button>

            <ScrollArea className="h-96 p-4 border rounded-md mt-4 bg-muted">
                {streamResponse ? (
                    <div className="prose prose-invert">
                        <ReactMarkdown>{streamResponse}</ReactMarkdown>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">AI response will appear here...</p>
                )}
            </ScrollArea>
        </div>
    );
}