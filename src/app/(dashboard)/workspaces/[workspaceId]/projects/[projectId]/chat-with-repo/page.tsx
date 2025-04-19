'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createRepoAction } from "@/lib/actions/repo.actions";

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createRepoAction(url, name);

      if (result.success) {
        router.push(`/workspaces/[workspaceId]/projects/[projectId]/repo/${result.repoId}`);
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Chat with GitHub Repo</h1>

      {error && <p className="text-red-500">{error}</p>}

      <Input
        placeholder="Enter GitHub repo URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Input
        placeholder="Repository Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button type="submit" disabled={loading || !url || !name}>
        {loading ? 'Loading...' : 'Load Repo'}
      </Button>
    </form>
  );
}