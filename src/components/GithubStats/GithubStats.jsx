/* ============================================================
   components/GithubStats/GithubStats.jsx
   Live GitHub stats pulled directly from the public REST API
   (no auth needed, no third-party embed dependency) — repos,
   followers, total stars, and top languages, plus a real
   contribution heatmap image.
   ============================================================ */

import { useEffect, useState } from 'react';
import { Reveal, RevealGroup, RevealItem } from '../Reveal/Reveal';
import { personalInfo } from '../../data/portfolioData';
import './GithubStats.css';

const USERNAME = personalInfo.github.replace(/\/$/, '').split('/').pop();

export default function GithubStats() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');

        const user = await userRes.json();
        const repos = await reposRes.json();

        const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        const langCounts = {};
        repos.forEach((r) => {
          if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        });
        const topLanguages = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang]) => lang);

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos,
            followers: user.followers,
            totalStars,
            topLanguages,
          });
          setStatus('ready');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="github">
      <div className="section">

        {/* Section header */}
        <Reveal style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 8px' }}>
          <span className="section-label">Live from GitHub</span>
          <h2 className="section-title">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
        </Reveal>

        {status === 'error' && (
          <Reveal as="p" className="github-error">
            Couldn't load live GitHub stats right now — view the profile directly at{' '}
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="gradient-text">
              github.com/{USERNAME}
            </a>.
          </Reveal>
        )}

        {status !== 'error' && (
          <RevealGroup className="github-grid">
            <RevealItem className="github-stat-card">
              <span className="github-stat-num gradient-text">
                {status === 'ready' ? stats.publicRepos : '—'}
              </span>
              <span className="github-stat-label">Public Repos</span>
            </RevealItem>
            <RevealItem className="github-stat-card">
              <span className="github-stat-num gradient-text">
                {status === 'ready' ? stats.totalStars : '—'}
              </span>
              <span className="github-stat-label">Total Stars</span>
            </RevealItem>
            <RevealItem className="github-stat-card">
              <span className="github-stat-num gradient-text">
                {status === 'ready' ? stats.followers : '—'}
              </span>
              <span className="github-stat-label">Followers</span>
            </RevealItem>
          </RevealGroup>
        )}

        {status === 'ready' && stats.topLanguages.length > 0 && (
          <Reveal className="github-langs">
            <span>Top languages:</span>
            {stats.topLanguages.map((lang) => (
              <span className="tag" key={lang}>{lang}</span>
            ))}
          </Reveal>
        )}

        {/* Contribution heatmap — served by ghchart.rshah.org, a static SVG chart generator */}
        <Reveal className="github-chart-wrap">
          <img
            src={`https://ghchart.rshah.org/00f5ff/${USERNAME}`}
            alt={`${personalInfo.name}'s GitHub contribution graph`}
            loading="lazy"
            className="github-chart"
          />
        </Reveal>

        <Reveal style={{ textAlign: 'center', marginTop: 24 }}>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn-ghost">
            View Full Profile →
          </a>
        </Reveal>

      </div>
    </section>
  );
}
