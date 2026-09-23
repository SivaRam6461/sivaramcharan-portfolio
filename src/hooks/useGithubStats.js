/* ============================================================
   src/hooks/useGithubStats.js
   Fetches real, verifiable public data from the GitHub API for
   a given username, and derives a language distribution from the
   user's repositories.

   Returns: { data, loading, error }
     data.public_repos, data.followers, data.following, data.languages[]
   ============================================================ */

import { useEffect, useState } from 'react';

const API = 'https://api.github.com';

export default function useGithubStats(username) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      setState({ data: null, loading: true, error: '' });

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`${API}/users/${username}`),
          fetch(`${API}/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok) {
          throw new Error(`GitHub API unavailable (${userRes.status})`);
        }

        const user = await userRes.json();
        const repos = reposRes.ok ? await reposRes.json() : [];

        // Language distribution = share of repos written in each language.
        const counts = {};
        repos.forEach((repo) => {
          if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
        });

        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        const languages = Object.entries(counts)
          .map(([name, count]) => ({
            name,
            percentage: total ? Math.round((count / total) * 100) : 0,
          }))
          .sort((a, b) => b.percentage - a.percentage);

        if (!cancelled) {
          setState({ data: { ...user, languages }, loading: false, error: '' });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err.message || 'Could not load GitHub data.',
          });
        }
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}