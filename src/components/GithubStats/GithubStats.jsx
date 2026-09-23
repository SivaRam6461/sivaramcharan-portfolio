/* ============================================================
   src/components/GithubStats/GithubStats.jsx
   Live GitHub data pulled from the real GitHub API via the
   useGithubStats hook. All numbers are verifiable against the
   linked profile — no fabricated telemetry.
   ============================================================ */

import { motion } from 'framer-motion';
import { ExternalLink, Code2, Users, UserPlus, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../Icons';
import { personalInfo } from '../../data/portfolioData';
import useGithubStats from '../../hooks/useGithubStats';

const USERNAME = 'SivaRam6461';

const LANGUAGE_COLORS = {
  JavaScript: 'bg-amber-400',
  TypeScript: 'bg-blue-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  Python: 'bg-cyan-400',
  Java: 'bg-red-500',
  Shell: 'bg-green-500',
  'C++': 'bg-pink-500',
  PHP: 'bg-indigo-400',
};

const fallbackColor = (name) => LANGUAGE_COLORS[name] || 'bg-slate-500';

function MetricCard({ icon: Icon, iconColor, label, value }) {
  return (
    <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1">
      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
        <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        <span>{label}</span>
      </div>
      <div className="font-head text-2xl font-extrabold text-white">{value}</div>
    </div>
  );
}

export default function GithubStats() {
  const { data, loading, error } = useGithubStats(USERNAME);

  return (
    <section id="github-telemetry" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">

      {/* SECTION HEADER */}
      <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
          <GithubIcon className="w-3.5 h-3.5" />
          <span>06 // Open Source Telemetry</span>
        </div>

        <h2 className="font-head text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          GITHUB <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-white">CODEBASE TELEMETRY</span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base font-body leading-relaxed">
          Live public statistics fetched directly from the GitHub API for {personalInfo.github.replace('https://github.com/', '@')}.
        </p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="p-8 md:p-12 rounded-3xl bg-[#12141c]/90 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/15">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live GitHub Activity</span>
            </div>
            <h3 className="font-head text-3xl font-extrabold text-white">
              Public Repository <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-white">Telemetry</span>
            </h3>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-orange-500/20 border border-white/15 hover:border-orange-500/50 text-orange-400 font-mono text-xs font-bold transition-all self-start md:self-auto shadow-lg"
          >
            <span>GitHub Profile @{USERNAME}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
            <span className="font-mono text-xs text-slate-400">SYNCING LIVE DATA FROM GITHUB...</span>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center" role="alert">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="font-mono text-xs text-slate-300 max-w-md leading-relaxed">
              {error}
            </p>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500/20 hover:bg-orange-500 border border-orange-500/50 text-orange-400 hover:text-slate-950 font-mono text-xs font-bold transition-all"
            >
              <span>View Profile Directly</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* DATA STATE */}
        {!loading && !error && data && (
          <>
            {/* Real Metric Counters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard icon={Code2} iconColor="text-amber-400" label="Public Repos" value={data.public_repos} />
              <MetricCard icon={Users} iconColor="text-orange-400" label="Followers" value={data.followers} />
              <MetricCard icon={UserPlus} iconColor="text-emerald-400" label="Following" value={data.following} />
            </div>

            {/* Top Languages Distribution Card */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-slate-300 font-semibold">
                <span>Language Distribution</span>
                <span className="text-amber-400 font-bold">Derived from repos</span>
              </div>

              {data.languages.length > 0 ? (
                <>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                    {data.languages.map((lang, idx) => (
                      <div
                        key={idx}
                        className={`h-full ${fallbackColor(lang.name)}`}
                        style={{ width: `${lang.percentage}%` }}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    {data.languages.slice(0, 8).map((lang, idx) => (
                      <div key={idx} className="flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${fallbackColor(lang.name)}`} />
                          <span className="text-white font-semibold">{lang.name}</span>
                        </div>
                        <span className="text-slate-400">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 font-mono text-xs"
                >
                  No language data available yet.
                </motion.p>
              )}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
