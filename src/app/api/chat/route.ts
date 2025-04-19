import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/gemini";
import db from "@/db/prisma";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { question, projectId } = await req.json();

        if (!question || !projectId) {
            return NextResponse.json(
                { error: "Missing required parameters: question or projectId" },
                { status: 400 }
            );
        }

        const stream = createStreamableValue();
        const queryVector = await generateEmbedding(question);
        const vectorQuery = `[${queryVector.join(",")}]`;

        const result = await db.$queryRaw`
        SELECT "fileName", "sourceCode", "summary",
        1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
        FROM "SourceCodeEmbedding"
        WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
        AND "projectId" = ${projectId}
        ORDER BY similarity DESC
        LIMIT 10
        ` as { fileName: string; sourceCode: string; summary: string }[];

        if (!result || result.length === 0) {
            return NextResponse.json({
                output: "I'm sorry, I couldn't find relevant information in the repository.",
                fileReferences: [],
            });
        }

        let context = result
            .map((doc) => `**File:** ${doc.fileName}\n**Summary:** ${doc.summary}\n**Code Snippet:**\n\`\`\`\n${doc.sourceCode}\n\`\`\`\n`)
            .join("\n");

        const prompt = `
        You are an AI code assistant helping a developer understand a GitHub repository. 
        Use the provided context to answer questions about the codebase accurately.

        --- START CONTEXT ---
        ${context}
        --- END CONTEXT ---

        **Question:** ${question}
        **Instructions:** If the answer is in the context, provide a clear, concise response using markdown. 
        If the context does not contain enough information, say: "I'm sorry, I don't have enough information."
        Do not make up answers.
        `;

        (async () => {
            const { textStream } = await streamText({
                model: google("gemini-1.5-flash"),
                prompt,
            });

            for await (const delta of textStream) {
                stream.update(delta);
            }

            stream.done();
        })();

        return NextResponse.json({
            output: stream.value,
            fileReferences: result,
        });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}
