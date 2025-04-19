// 'use client';

// import { useState } from 'react';
// import { askQuestion } from '@/lib/actions/ask.actions';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import ReactMarkdown from 'react-markdown';
// import { readStreamableValue } from 'ai/rsc';

// export default function ChatPage({ params }: { params: { repoId: string } }) {
//     const [question, setQuestion] = useState('');
//     const [streamResponse, setStreamResponse] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [answers, setAnswers] = useState('');

//     const { repoId } = params;

//     async function handleSubmit() {
//         setLoading(true);
//         setStreamResponse('');

//         const { output } = await askQuestion(question, repoId);

//         for await (const delta of readStreamableValue(output)) {
//             if (delta) {
//                 setAnswers(ans => ans + delta)
//             }
//         }

//         setLoading(false);
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-6 space-y-4">
//             <h1 className="text-2xl font-bold">Ask a Question About This Repo</h1>

//             <Textarea
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 placeholder="Type your question about the repo..."
//                 rows={4}
//             />

//             <Button onClick={handleSubmit} disabled={loading || !question.trim()}>
//                 {loading ? 'Thinking...' : 'Ask AI'}
//             </Button>

//             <ScrollArea className="h-96 p-4 border rounded-md mt-4 bg-muted">
//                 {streamResponse ? (
//                     <div className="prose prose-invert">
//                         <ReactMarkdown>{answers}</ReactMarkdown>
//                     </div>
//                 ) : (
//                     <p className="text-sm text-muted-foreground">AI response will appear here...</p>
//                 )}
//             </ScrollArea>
//         </div>
//     );
// }



'use client';

import { useState } from 'react';
import { askQuestion } from '@/lib/actions/ask.actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { readStreamableValue } from 'ai/rsc';

export default function ChatPage({ params }: { params: { repoId: string } }) {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState(''); // Combined state for the response
    const [loading, setLoading] = useState(false);

    const { repoId } = params;

    async function handleSubmit() {
        setLoading(true);
        setResponse(''); // Reset response

        try {
            const { output } = await askQuestion(question, repoId);

            if (!output) {
                console.error('No output received from askQuestion');
                return;
            }

            for await (const delta of readStreamableValue(output)) {
                if (delta) {
                    setResponse((prev) => prev + delta); // Update response
                }
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        } finally {
            setLoading(false);
        }
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
                {response ? (
                    <div className="prose prose-invert">
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">AI response will appear here...</p>
                )}
            </ScrollArea>
        </div>
    );
}