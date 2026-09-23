/* ============================================================
   src/components/About/About.jsx
   Hero-aligned Editorial About Section
   Warm white · Black editorial type · Orange accents · Thin lines
   ============================================================ */

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Code2, Heart, Target, Rocket, GraduationCap, Award,
  CheckCircle2, ArrowRight, Camera, Music, Dumbbell, Brain,
  Plane, Cpu, ArrowUpRight
} from 'lucide-react';
import { stats } from '../../data/portfolioData';
import { scrollToId } from '../../utils/scroll';
import './About.css';

const CHAPTERS = [
  { id: 'intro', label: 'INTRO' },
  { id: 'story', label: 'STORY' },
  { id: 'timeline', label: 'JOURNEY' },
  { id: 'principles', label: 'FOCUS' },
  { id: 'philosophy', label: 'WORKFLOW' },
  { id: 'focus', label: 'NOW' },
  { id: 'beyond', label: 'BEYOND' },
  { id: 'cta', label: "LET'S BUILD" },
];

const TIMELINE = [
  {
    year: '2022',
    title: 'Started Academic Journey in Artificial Intelligence',
    desc: 'Enrolled in B.Tech CS with specialization in AI & Machine Learning at Teerthanker Mahaveer University.',
    icon: GraduationCap,
  },
  {
    year: '2023',
    title: 'Built Full-Stack Product Foundations',
    desc: 'Constructed custom REST APIs with Express & MongoDB, paired with React single-page product interfaces.',
    icon: Code2,
  },
  {
    year: '2024',
    title: 'Web Development Internship at Internshala',
    desc: 'Completed structured software engineering training and delivered production web projects with responsive UI standards.',
    icon: Award,
  },
  {
    year: '2025',
    title: 'Full Stack Engineer Internship at Cognifyz',
    desc: 'Architected Express REST API endpoints, implemented authentication and role-based controllers, and refactored client web apps.',
    icon: Rocket,
  },
  {
    year: 'NOW',
    title: 'AI, Automation & SaaS Product Engineering',
    desc: 'Currently building AI-powered features, automation workflows, and full-stack web products from idea to production.',
    icon: Target,
  },
];

const STORY_CARDS = [
  {
    title: 'How I Started',
    desc: 'Began with a fascination for web interactivity. Learned HTML/CSS fundamentals and quickly advanced to JavaScript, React, and Node.js backend development.',
    icon: Code2,
    num: '01',
  },
  {
    title: 'Why I Love Development',
    desc: 'The power to turn blank files into complete digital products — web, mobile-ready experiences, and intelligent workflows that solve real problems.',
    icon: Heart,
    num: '02',
  },
  {
    title: 'What Motivates Me',
    desc: 'Shipping production products: resilient APIs, smart automation, and interfaces that feel fast, clear, and deliberate.',
    icon: Target,
    num: '03',
  },
  {
    title: 'Products I Enjoy Building',
    desc: 'AI-powered products, automation systems, SaaS platforms, full-stack web apps, and mobile-ready digital experiences.',
    icon: Rocket,
    num: '04',
  },
];

const FOCUS_ITEMS = [
  { title: 'Full-Stack Product Engineering', desc: 'End-to-end product builds across frontend, backend APIs, data, and deployment.', icon: Code2 },
  { title: 'APIs & Data Layer', desc: 'REST design, schema modeling, and scalable service boundaries that power product features.', icon: CheckCircle2 },
  { title: 'AI & Automation', desc: 'Integrating AI capabilities and connected workflows into practical product experiences.', icon: Cpu },
  { title: 'Performant UI & Motion', desc: 'Crafting responsive 60 FPS user interfaces using Tailwind CSS and Framer Motion.', icon: Target },
];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Idea & Intent', desc: 'Defining core business goals and target user workflows.' },
  { step: '02', title: 'Research & Specs', desc: 'Analyzing architecture requirements and API endpoints.' },
  { step: '03', title: 'System Design', desc: 'Mapping database schemas and component hierarchy.' },
  { step: '04', title: 'Product Build', desc: 'Developing frontend interfaces, backend services, and data flows as one product.' },
  { step: '05', title: 'Optimization', desc: 'Refactoring queries, lazy loading media, and CSS polish.' },
  { step: '06', title: 'Deployment', desc: 'Deploying to Vercel/Cloud platforms with CI/CD.' },
];

const NOW_CARDS = [
  {
    label: '01 / AI-Powered Products',
    value: 'Building practical AI capabilities into real-world digital products and workflows.',
  },
  {
    label: '02 / Automation Systems',
    value: 'Creating connected workflows that combine APIs, tools and business processes to reduce repetitive work.',
  },
  {
    label: '03 / SaaS Products',
    value: 'Designing and engineering scalable SaaS products from product architecture to production.',
  },
  {
    label: '04 / Full-Stack Product Engineering',
    value: 'Turning ideas into complete web and mobile experiences across frontend, backend, data and deployment.',
  },
  {
    label: '05 / AI Development Workflows',
    value: 'Exploring modern AI-assisted engineering workflows for research, development, testing and iteration.',
  },
  {
    label: '06 / Current Direction',
    value: 'AI × Automation × SaaS — building products that work smarter.',
  },
];

const BEYOND_INTERESTS = [
  { title: 'Photography', icon: Camera, desc: 'Capturing urban architecture' },
  { title: 'Music & Sound', icon: Music, desc: 'Listening to ambient lo-fi' },
  { title: 'Fitness & Gym', icon: Dumbbell, desc: 'Regular workout training' },
  { title: 'Chess Strategy', icon: Brain, desc: 'Tactical board puzzles' },
  { title: 'Travel & Explore', icon: Plane, desc: 'Discovering new cities' },
  { title: 'AI Research', icon: Cpu, desc: 'Exploring practical AI product patterns' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  const containerRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState('intro');
  const [coffeeCount, setCoffeeCount] = useState(248);
  const [isDesktop, setIsDesktop] = useState(false);
  const [visibleTimeline, setVisibleTimeline] = useState(new Set());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    // rAF-throttle: measuring every chapter/timeline rect on each raw
    // scroll event + setState re-renders the section mid-scroll (jank).
    let rafId = null;
    const handleScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const focalPoint = window.innerHeight * 0.35;
        let closest = 'intro';
        let minDist = Infinity;

        CHAPTERS.forEach((c) => {
          const el = document.getElementById(`about-${c.id}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top - focalPoint);
            if (rect.top <= window.innerHeight * 0.8 && dist < minDist) {
              minDist = dist;
              closest = c.id;
            }
          }
        });

        setActiveChapter((prev) => (prev === closest ? prev : closest));

        const newVisible = new Set();
        TIMELINE.forEach((_, i) => {
          const el = document.getElementById(`timeline-${i}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
              newVisible.add(i);
            }
          }
        });
        setVisibleTimeline((prev) => {
          if (prev.size === newVisible.size) {
            let same = true;
            newVisible.forEach((i) => {
              if (!prev.has(i)) same = false;
            });
            if (same) return prev;
          }
          return newVisible;
        });
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('scroll', handleScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToChapter = (id) => scrollToId(`about-${id}`);

  return (
    <section id="about" ref={containerRef} className="about-section">
      {/* Background decorations */}
      <div className="about-bg-grid" aria-hidden="true" />
      <div className="about-bg-dots" aria-hidden="true" />
      <div className="about-orange-thread" aria-hidden="true" />

      {/* Huge background word */}
      <div className="about-bg-word" aria-hidden="true">ABOUT</div>

      {/* Orange dots decoration */}
      <div className="about-orange-dots" style={{ top: '120px', right: '80px' }} aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => <span key={i} />)}
      </div>

      <div className="about-grid">
        {/* ═══ OPENING ═══ */}
        <motion.div
          className="about-opening"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={fadeUp} custom={0} className="about-eyebrow">
            <span>01 / ABOUT ME</span>
            <div className="about-eyebrow-line" />
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} className="about-opening-heading">
            BEHIND<br />THE <span className="accent">BUILD.</span>
          </motion.h2>

          <motion.div variants={fadeUp} custom={2} className="about-handwriting">
            Not just code. <span>Products with purpose.</span>
            <span className="arrow">↘</span>
          </motion.div>

          <motion.p variants={fadeUp} custom={3} className="about-bio">
            I am a Full Stack AI Developer and product engineer focused on AI-powered products, automation systems, and SaaS platforms. From pixel-perfect frontends to resilient backend APIs and connected workflows, I turn complex ideas into clean, production-ready web and mobile experiences.
          </motion.p>
        </motion.div>

        {/* ═══ LEFT NAV (Desktop) ═══ */}
        <div className="about-nav" role="navigation" aria-label="About Chapters Navigation">
          <div className="about-nav-header">ABOUT / INDEX</div>

          <div className="about-nav-list">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                className={`about-nav-item ${activeChapter === ch.id ? 'active' : ''}`}
              >
                <span className="about-nav-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="about-nav-label">{ch.label}</span>
                <div className="about-nav-indicator" />
              </button>
            ))}
          </div>

          <div className="about-nav-progress">
            <div className="about-nav-progress-label">
              <span>STORY PROGRESS</span>
              <span className="about-nav-progress-current">
                {String(CHAPTERS.findIndex(c => c.id === activeChapter) + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
              </span>
            </div>
            <div className="about-nav-progress-bar">
              <motion.div className="about-nav-progress-fill" style={{ scaleX }} />
            </div>
          </div>

          <div className="about-nav-footer">
            <span className="dot" />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>

        {/* ═══ MOBILE NAV ═══ */}
        <div className="about-mobile-nav block lg:hidden">
          <div className="about-mobile-nav-inner">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch.id)}
                className={`about-mobile-nav-btn ${activeChapter === ch.id ? 'active' : ''}`}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ CHAPTERS ═══ */}
        <div className="about-chapters">

          {/* ── Chapter 01: Intro ── */}
          <motion.div
            id="about-intro"
            className={`about-chapter ${activeChapter === 'intro' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="about-tag">
              <span className="about-tag-dot" />
              <span>01 / INTRODUCTION</span>
            </motion.div>

            <motion.h3 variants={fadeUp} custom={1} className="about-chapter-heading">
              Building products where <span className="accent">design meets engineering.</span>
            </motion.h3>

            <motion.div variants={fadeUp} custom={2} className="about-stats-strip">
              {stats.map((st, i) => {
                const val = st.value;
                const hasPlus = val.includes('+');
                const num = val.replace('+', '');
                return (
                  <div key={i} className="about-stat-item">
                    <div className="about-stat-value">
                      {num}{hasPlus && <span className="plus">+</span>}
                    </div>
                    <div className="about-stat-label">{st.label.toUpperCase()}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Chapter 02: Story ── */}
          <motion.div
            id="about-story"
            className={`about-chapter ${activeChapter === 'story' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="about-tag">
              <span className="about-tag-dot" />
              <span>02 / MY STORY</span>
            </motion.div>

            <motion.h3 variants={fadeUp} custom={1} className="about-chapter-heading">
              The Journey Behind <span className="accent">The Code</span>
            </motion.h3>

            <motion.div variants={fadeUp} custom={2} className="about-story-grid">
              {STORY_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="about-story-block">
                    <div className="about-story-block-number">{card.num}</div>
                    <div className="about-story-block-icon">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="about-story-block-title">{card.title}</div>
                    <div className="about-story-block-desc">{card.desc}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Chapter 03: Timeline ── */}
          <motion.div
            id="about-timeline"
            className={`about-chapter ${activeChapter === 'timeline' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="about-tag">
              <span className="about-tag-dot" />
              <span>03 / JOURNEY TIMELINE</span>
            </motion.div>

            <motion.h3 variants={fadeUp} custom={1} className="about-chapter-heading">
              FROM <span className="accent">2022 → NOW.</span>
            </motion.h3>

            <motion.div variants={fadeUp} custom={2} className="about-timeline">
              <div className="about-timeline-line" />
              <div
                className="about-timeline-line-fill"
                style={{
                  height: visibleTimeline.size > 0
                    ? `${(Math.max(...visibleTimeline) + 1) / TIMELINE.length * 100}%`
                    : '0%',
                }}
              />

              {TIMELINE.map((item, i) => {
                const Icon = item.icon;
                const inView = visibleTimeline.has(i);
                return (
                  <div
                    key={i}
                    id={`timeline-${i}`}
                    className={`about-timeline-item ${inView ? 'in-view' : ''}`}
                  >
                    <div className="about-timeline-dot" />
                    <div className="about-timeline-year">{item.year}</div>
                    <div className="about-timeline-title">{item.title}</div>
                    <div className="about-timeline-desc">{item.desc}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Chapter 04: Focus ── */}
          <motion.div
            id="about-principles"
            className={`about-chapter ${activeChapter === 'principles' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="about-tag">
              <span className="about-tag-dot" />
              <span>04 / ENGINEERING FOCUS</span>
            </motion.div>

            <motion.h3 variants={fadeUp} custom={1} className="about-chapter-heading">
              WHAT I <span className="accent">BUILD WITH.</span>
            </motion.h3>

            <motion.div variants={fadeUp} custom={2} className="about-focus-rows">
              {FOCUS_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="about-focus-row">
                    <div className="about-focus-number">{String(i + 1).padStart(2, '0')}</div>
                    <div className="about-focus-content">
                      <div className="about-focus-title">{item.title}</div>
                      <div className="about-focus-desc">{item.desc}</div>
                    </div>
                    <div className="about-focus-icon">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Chapter 05: Workflow ── */}
          <motion.div
            id="about-philosophy"
            className={`about-chapter ${activeChapter === 'philosophy' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="about-tag">
              <span className="about-tag-dot" />
              <span>05 / WORKFLOW PHILOSOPHY</span>
            </motion.div>

            <motion.h3 variants={fadeUp} custom={1} className="about-chapter-heading">
              HOW I TURN<br /><span className="accent">IDEAS INTO PRODUCTS.</span>
            </motion.h3>

            <motion.div variants={fadeUp} custom={2} className="about-handwriting" style={{ marginBottom: '24px' }}>
              from thought → shipped
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="about-workflow">
              {WORKFLOW_STEPS.map((wf, i) => (
                <div key={i} className="about-workflow-step">
                  <div className="about-workflow-number">{wf.step}</div>
                  <div className="about-workflow-title">{wf.title}</div>
                  <div className="about-workflow-desc">{wf.desc}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Chapter 06: Now ── */}
          <motion.div
            id="about-focus"
            className={`about-chapter ${activeChapter === 'focus' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="about-tag">
              <span className="about-tag-dot" />
              <span>06 / NOW / 2026</span>
            </motion.div>

            <motion.h3 variants={fadeUp} custom={1} className="about-chapter-heading">
              CURRENT <span className="accent">FOCUS.</span>
            </motion.h3>

            <motion.div variants={fadeUp} custom={2} className="about-now-grid">
              {NOW_CARDS.map((card, i) => (
                <div key={i} className="about-now-card">
                  <div className="about-now-card-label">{card.label}</div>
                  <div className="about-now-card-value">{card.value}</div>
                </div>
              ))}

              {/* Coffee card */}
              <div className="about-now-card">
                <div className="about-now-card-label">☕ Coffee Count</div>
                <div className="about-coffee-count">{coffeeCount}</div>
                <button className="about-coffee-btn" onClick={() => setCoffeeCount(c => c + 1)}>
                  +1 Brew
                </button>
              </div>

              {/* Current Direction card - black */}
              <div className="about-now-card about-now-card--status">
                <div className="about-now-card-label">
                  <span className="about-now-status-dot" />
                  CURRENT DIRECTION
                </div>
                <div className="about-now-card-value">
                  AI<br />
                  × AUTOMATION<br />
                  × SAAS<br />
                  <span style={{ opacity: 0.85, fontWeight: 500 }}>
                    Building products that don't just work — they work smarter.
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Chapter 07: Beyond ── */}
          <motion.div
            id="about-beyond"
            className={`about-chapter ${activeChapter === 'beyond' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="about-tag">
              <span className="about-tag-dot" />
              <span>07 / BEYOND CODING</span>
            </motion.div>

            <motion.h3 variants={fadeUp} custom={1} className="about-chapter-heading">
              CODE ISN'T<br />THE <span className="accent">WHOLE STORY.</span>
            </motion.h3>

            <motion.div variants={fadeUp} custom={2} className="about-beyond">
              {BEYOND_INTERESTS.map((int, i) => {
                const Icon = int.icon;
                return (
                  <div key={i} className="about-beyond-item">
                    <Icon className="about-beyond-icon w-5 h-5" />
                    <span>{int.title}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Chapter 08: CTA ── */}
          <motion.div
            id="about-cta"
            className={`about-chapter ${activeChapter === 'cta' ? 'active' : 'dimmed'}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="about-cta">
              <div className="about-cta-bg-word" aria-hidden="true">BUILD</div>

              <motion.div variants={fadeUp} className="about-cta-eyebrow">
                08 / NEXT CHAPTER
              </motion.div>

              <motion.h3 variants={fadeUp} custom={1} className="about-cta-heading">
                HAVE AN IDEA?<br />
                LET'S MAKE<br />
                IT REAL.
              </motion.h3>

              <motion.div variants={fadeUp} custom={2} className="about-cta-handwriting">
                Your idea could be next. ↗
              </motion.div>

              <motion.div variants={fadeUp} custom={3} className="about-cta-buttons">
                <button
                  onClick={() => scrollToId('contact')}
                  className="about-cta-btn-primary"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToId('contact')}
                  className="about-cta-btn-secondary"
                >
                  <span>LET'S TALK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
