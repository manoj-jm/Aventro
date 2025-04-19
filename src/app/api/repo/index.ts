import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding } from "@/lib/gemini";
import db from "@/db/prisma";
export const indexGithubRepo = async (projectId: string, githubUrl: string, githubAccessToken?: string) => {
    const loader = new GithubRepoLoader(githubUrl, {
        accessToken: githubAccessToken || "",
        branch: "main",
        recursive: true,
        ignoreFiles: ["node_modules", "dist", "build", "coverage", ".git", ".github", ".env"],
    });

    const docs = await loader.load();

    const allEmbeddings = await generateEmbeddings(docs);

    await Promise.allSettled(
        allEmbeddings.map(async (embedding, index) => {
            if (!embedding) return;

            const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
                data: {
                    summary: embedding.summary,
                    sourceCode: embedding.sourceCode,
                    fileName: embedding.fileName,
                    projectId,
                },
            });

            await prisma.$executeRaw`
            UPDATE "SourceCodeEmbedding"
            SET "embedding" = ${embedding.embedding}::vector
            WHERE "id" = ${sourceCodeEmbedding.id}
            `;
        })
    );
};

const generateEmbeddings = async (docs: Document[]) => {
    return await Promise.all(
        docs.map(async (doc) => {
            const summary = await summariseCode(doc);
            const embedding = await generateEmbedding(summary);

            return {
                summary,
                embedding,
                sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
                fileName: doc.metadata.source,
            };
        })
    );
};
