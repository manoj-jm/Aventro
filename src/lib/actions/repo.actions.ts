'use server';

import { getRepoContext } from '@/lib/github-loader';
import db from '@/db/prisma/index';

export async function createRepoAction(repoUrl: string, name: string) {
    try {
        const chunks = await getRepoContext(repoUrl);

        const repo = await db.repository.create({
            data: {
                name,
                url: repoUrl,
                contexts: {
                    create: chunks.map((chunk) => ({
                        content: chunk.pageContent,
                        filePath: chunk.metadata.source || 'unknown',
                    })),
                },
            },
        });

        return { success: true, repoId: repo.id };
    } catch (error) {
        console.error('Error in createRepoAction:', error);
        throw new Error('Failed to load repo context');
    }
}