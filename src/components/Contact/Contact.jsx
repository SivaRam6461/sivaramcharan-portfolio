/* ============================================================
   src/components/Contact/Contact.jsx
   Concept 1: Mission Control Terminal Contact Hub
   Engineering-grade secure transmission interface
   ============================================================ */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Copy, Check, Sparkles, MessageSquare, MapPin, 
  ArrowUpRight, Terminal, Shield, Clock, Wifi, 
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../../data/portfolioData';

const TOPIC_PRESETS = [
  'AI-Powered Product',
  'Automation System',
  'SaaS Platform',
  'Web or Mobile App',
  'Full-Stack Product Build',
  'Just Say Hello 👋',
];

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-orange-400 font-bold tabular-nums">{time} IST</span>
  );
}

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState(TOPIC_PRESETS[0]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState('');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const submittingRef = useRef(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || submittingRef.current) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !email || !message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setSendError('Please enter a valid email address.');
      return;
    }

    setSendError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fail fast if the form is misconfigured — never pretend to send.
    if (!serviceId || !templateId || !publicKey) {
      setSendError(`Contact form isn't configured yet. Please email me directly at ${personalInfo.email}.`);
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setProgress(0);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) { clearInterval(progressInterval); return 85; }
        return p + 12;
      });
    }, 180);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          message: `[Topic: ${selectedTopic}]\n\n${formData.message.trim()}`,
          to_name: personalInfo.name,
        },
        publicKey
      );
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#ff5722', '#ff8c00', '#ffffff', '#ffca28'],
        });
        setSubmitted(true);
        setLoading(false);
        submittingRef.current = false;
        setProgress(0);
        setFormData({ name: '', email: '', message: '' });
      }, 400);
    } catch (_) {
      clearInterval(progressInterval);
      setLoading(false);
      submittingRef.current = false;
      setProgress(0);
      setSendError(`Your message couldn't be sent. Please try again, or email me directly at ${personalInfo.email}.`);
    }
  };

  return (
    <section id="contact" className="pt-10 lg:pt-24 pb-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* SECTION HEADER */}
      <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>07 // Secure Transmission Channel</span>
        </div>

        <h2 className="font-head text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-white">BUILD TOGETHER</span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base font-body leading-relaxed">
          Have an idea for an AI-powered product, automation system, SaaS platform or digital experience? Let's build it.
        </p>
      </div>

      {/* MAIN GRID: LEFT SIDEBAR + RIGHT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── LEFT SIDEBAR (2 cols) ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-5"
        >
          {/* Status Panel */}
          <div className="p-6 rounded-3xl bg-[#12141c]/90 backdrop-blur-2xl border border-white/15 space-y-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />

            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CHANNEL OPEN</span>
              </div>
              <LiveClock />
            </div>

            <div className="space-y-2 pt-1 border-t border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Current Status
              </span>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-emerald-400 font-mono text-sm font-extrabold">
                  OPEN FOR PROJECTS & COLLABORATION
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 pt-1 border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>Based in India · IST Timezone</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ready to build & ship products</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Response Time: &lt; 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Email Copy Card */}
          <div className="p-6 rounded-3xl bg-[#12141c]/90 backdrop-blur-2xl border border-white/15 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Direct Email Inbox</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex items-center justify-between gap-3">
              <span className="truncate font-mono text-xs text-white font-semibold">
                {personalInfo.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  copiedEmail
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-slate-950'
                }`}
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copiedEmail ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Profile Cards */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-[#12141c]/90 border border-white/15 hover:border-orange-500/50 text-white hover:text-orange-400 transition-all space-y-3 group"
            >
              <GithubIcon className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
              <div className="font-head font-bold text-sm text-white flex items-center justify-between">
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[11px] font-mono text-slate-400 block">@SivaRam6461</span>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl bg-[#12141c]/90 border border-white/15 hover:border-orange-500/50 text-white hover:text-orange-400 transition-all space-y-3 group"
            >
              <LinkedinIcon className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
              <div className="font-head font-bold text-sm text-white flex items-center justify-between">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[11px] font-mono text-slate-400 block">Sivaram Charan</span>
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT FORM PANEL (3 cols) ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="p-8 md:p-10 rounded-3xl bg-[#12141c]/90 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-8 relative overflow-hidden h-full">
            {/* Top Accent Beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-amber-400 opacity-80" />

            {/* Terminal Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 text-center font-mono text-xs text-slate-400">
                ~ collaboration_channel.sh
              </div>
              <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>

            {/* Topic Presets */}
            <fieldset className="space-y-3">
              <legend className="font-mono text-[11px] text-orange-400 uppercase tracking-widest block font-bold">
                &gt; WHAT ARE WE BUILDING?
              </legend>
              <div className="flex flex-wrap gap-2">
                {TOPIC_PRESETS.map((topic) => {
                  const isActive = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-slate-950 font-extrabold shadow-md shadow-orange-500/25'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-300 hover:text-white'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Form / Success State */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
                    &gt; MESSAGE RECEIVED — LET'S BUILD!
                  </div>
                  <h3 className="font-head text-2xl font-extrabold text-white">
                    Excited to Collaborate! 🚀
                  </h3>
                  <p className="text-slate-300 text-sm font-body max-w-sm mx-auto">
                    Got your message about{' '}
                    <strong className="text-orange-400">{selectedTopic}</strong>.
                    I'll be in touch within 24 hours — let's ship something great!
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-mono text-xs font-extrabold transition-all"
                >
                  &gt; START ANOTHER PROJECT
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
                      &gt; YOUR_NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="name"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] text-white font-mono text-sm outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
                      &gt; YOUR_EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] text-white font-mono text-sm outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block font-semibold">
                    &gt; PROJECT_DETAILS *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows="5"
                    maxLength={5000}
                    placeholder={`Hey Sivaram! I have an idea for ${selectedTopic}. Let's build something great together...`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] text-white font-mono text-sm outline-none transition-all resize-none placeholder:text-slate-600"
                  />
                </div>

                {/* Inline error banner (EmailJS failed or not configured) */}
                {sendError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono leading-relaxed"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{sendError}</span>
                  </div>
                )}

                {/* Progress Bar (visible during sending) */}
                {loading && (
                  <div className="space-y-2">
                    <div className="font-mono text-xs text-orange-400 animate-pulse">
                      &gt; SENDING YOUR PROJECT REQUEST...
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full"
                      />
                    </div>
                    <div className="font-mono text-[11px] text-slate-400">
                      {progress}% complete
                    </div>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 hover:from-orange-500 hover:to-amber-300 text-slate-950 font-mono text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>LET'S BUILD TOGETHER →</span>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
