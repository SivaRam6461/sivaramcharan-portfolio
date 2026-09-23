/* ============================================================
    src/components/Skills/Skills.jsx
    Option 3: Dynamic 3D Orbital Tech Cloud
    Warm White · Black Editorial · Orange Accents
    All functionality preserved — dark theme removed.
    ============================================================ */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Search, Layers, Grid, Orbit, Code2, Database, Terminal,
  Cpu, CheckCircle2, ArrowRight, ExternalLink, RefreshCw
} from 'lucide-react';
import './Skills.css';

const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Data & Cloud' },
  { id: 'ai', label: 'AI & Automation' },
];

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Data & Cloud',
  ai: 'AI & Automation',
};

// Flatten skills array with additional metadata
// Evidence-backed only — no fabricated stacks (no Flutter/PostgreSQL/LangChain etc.)
const ALL_SKILLS = [
  { id: 'react', name: 'React.js', category: 'frontend', level: 95, icon: '⚛️', badge: 'Core Mastery', desc: 'Component architecture, Hooks, Context API, Redux Toolkit, and performance optimization.', projects: ['Food Delivery Portal', 'Travel Planner'] },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 85, icon: '▲', badge: 'Advanced', desc: 'App Router, Server Components, SSR/SSG rendering, and SEO-ready product pages.', projects: ['HyperFit Fitness', 'Portfolio Engine'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 84, icon: '📘', badge: 'Advanced', desc: 'Strict static typing, interfaces, generics, and safer product codebases.', projects: ['Next.js product work'] },
  { id: 'javascript', name: 'JavaScript ES6+', category: 'frontend', level: 94, icon: '⚡', badge: 'Core Mastery', desc: 'Promises, Async/Await, DOM APIs, ES Modules, and product UI logic.', projects: ['All Projects'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 92, icon: '🎨', badge: 'Core Mastery', desc: 'Utility-first styling, design tokens, responsive layouts, and animations.', projects: ['All Projects'] },
  { id: 'framer', name: 'Framer Motion', category: 'frontend', level: 88, icon: '✨', badge: 'Advanced', desc: 'Production motion design: transitions, scroll-linked UI, and polished interaction states.', projects: ['Portfolio', 'HyperFit Fitness'] },
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 90, icon: '🟢', badge: 'Core Mastery', desc: 'Async runtime, middleware, streams, and backend service architecture.', projects: ['Food Delivery Portal', 'Travel Planner'] },
  { id: 'express', name: 'Express.js', category: 'backend', level: 92, icon: '🚂', badge: 'Core Mastery', desc: 'RESTful routing, validation, error handling, and API service design.', projects: ['Food Delivery Portal', 'Travel Planner'] },
  { id: 'restapi', name: 'REST APIs', category: 'backend', level: 94, icon: '🔌', badge: 'Core Mastery', desc: 'API design patterns, status codes, JSON contracts, and integration-ready endpoints.', projects: ['All Full-Stack Apps'] },
  { id: 'auth', name: 'Authentication & RBAC', category: 'backend', level: 88, icon: '🔑', badge: 'Advanced', desc: 'Session/token authentication, protected routes, and role-based access for product apps.', projects: ['Food Delivery Portal', 'Cognifyz Internship'] },
  { id: 'git', name: 'Git & GitHub', category: 'backend', level: 90, icon: '🐙', badge: 'Core Mastery', desc: 'Version control, branching, PR workflows, and collaborative shipping.', projects: ['All Repositories'] },
  { id: 'mongodb', name: 'MongoDB', category: 'data', level: 88, icon: '🍃', badge: 'Core Mastery', desc: 'Document schema design, indexing, aggregations, and Mongoose data layers.', projects: ['Food Delivery Portal', 'Travel Planner'] },
  { id: 'aillm', name: 'AI / LLM Integration', category: 'ai', level: 80, icon: '🧠', badge: 'Specialization', desc: 'Integrating AI capabilities into practical product experiences and application workflows.', projects: ['Current Focus — product AI features'] },
  { id: 'automation', name: 'Workflow Automation', category: 'ai', level: 78, icon: '⚙️', badge: 'Proficient', desc: 'Connecting APIs, services and application logic to automate repetitive workflows and business processes.', projects: ['Current Focus — API-connected flows'] },
  { id: 'python', name: 'Python', category: 'ai', level: 82, icon: '🐍', badge: 'Proficient', desc: 'Scripting, data handling, and AI-assisted engineering workflows for research and iteration.', projects: ['AI coursework & tooling'] },
];

// Related skill pairs for orbital arcs
const RELATED_PAIRS = [
  ['react', 'nodejs'],
  ['react', 'nextjs'],
  ['react', 'typescript'],
  ['react', 'framer'],
  ['nextjs', 'typescript'],
  ['javascript', 'react'],
  ['javascript', 'tailwind'],
  ['tailwind', 'framer'],
  ['nodejs', 'express'],
  ['nodejs', 'mongodb'],
  ['express', 'mongodb'],
  ['express', 'restapi'],
  ['express', 'auth'],
  ['restapi', 'auth'],
  ['restapi', 'git'],
  ['python', 'aillm'],
  ['aillm', 'automation'],
  ['automation', 'restapi'],
  ['mongodb', 'git'],
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('3d');
  const [selectedSkill, setSelectedSkill] = useState(ALL_SKILLS[0]);
  const canvasRef = useRef(null);
  const selectedSkillRef = useRef(ALL_SKILLS[0]);
  selectedSkillRef.current = selectedSkill;

  const filteredSkills = useMemo(
    () =>
      ALL_SKILLS.filter((skill) => {
        const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
        const matchesSearch =
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [activeCategory, searchQuery]
  );

  // 3D Orbital Canvas Engine
  useEffect(() => {
    if (viewMode !== '3d') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    let canvasVisible = true;

    // While the page is scrolling on touch devices, freeze the canvas
    // paint — a full 2D scene every frame steals the main thread from
    // scroll and is the top cause of Skills-section jank on phones.
    let scrollActive = false;
    let scrollIdleTimer = null;
    const onScrollPaint = () => {
      if (!coarsePointer) return;
      scrollActive = true;
      clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => { scrollActive = false; }, 120);
    };
    window.addEventListener('scroll', onScrollPaint, { passive: true });

    // Buffer must match CSS size 1:1 (else the orbit renders as an oval),
    // multiplied by devicePixelRatio so lines stay razor-sharp on retina.
    let width, height;
    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || canvas.parentElement.clientWidth;
      height = canvas.clientHeight || canvas.parentElement.clientHeight || 480;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    syncSize();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      syncSize();
    };
    window.addEventListener('resize', handleResize);

    // Rotation model: auto spin + drag (with inertia) + mouse parallax
    let autoYaw = 0, autoPitch = 0;
    let dragYaw = 0, dragPitch = 0, velYaw = 0, velPitch = 0;
    let parYaw = 0, parPitch = 0, parTargetY = 0, parTargetX = 0;
    let isDragging = false;
    let hoverId = null;
    let previousMousePosition = { x: 0, y: 0 };
    const timeStart = performance.now();

    const nodes = filteredSkills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / filteredSkills.length);
      const theta = Math.sqrt(filteredSkills.length * Math.PI) * phi;
      const radius = Math.min(width, height) * 0.36;

      return {
        ...skill,
        bx: radius * Math.cos(theta) * Math.sin(phi),
        by: radius * Math.sin(theta) * Math.sin(phi),
        bz: radius * Math.cos(phi),
        x2d: 0,
        y2d: 0,
        scale: 1,
        alpha: 1,
        z2: 0,
      };
    });

    // Per-edge pulse speed / phase (one entry per RELATED_PAIRS row)
    const edgeMeta = RELATED_PAIRS.map((_, i) => ({
      speed: 0.1 + (i % 5) * 0.03,
      phase: (i * 0.37) % 1,
    }));

    // Ambient drifting dust behind the sphere
    const dust = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.4 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      a: 0.05 + Math.random() * 0.08,
      orange: Math.random() < 0.3,
    }));

    const neighborsOf = (id) => {
      const set = new Set();
      RELATED_PAIRS.forEach(([a, b]) => {
        if (a === id) set.add(b);
        if (b === id) set.add(a);
      });
      return set;
    };

    const hitTest = (x, y) => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = x - n.x2d;
        const dy = y - n.y2d;
        if (Math.sqrt(dx * dx + dy * dy) < 30 * n.scale) return n;
      }
      return null;
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      velYaw = deltaX * 0.005;
      velPitch = -deltaY * 0.005;
      dragYaw += velYaw;
      dragPitch += velPitch;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      if (isDragging) canvas.style.cursor = hoverId ? 'pointer' : 'grab';
      isDragging = false;
    };

    // Hover hit-test + parallax target (canvas-local)
    const handleCanvasHover = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = (x / rect.width) * 2 - 1;
      const ny = (y / rect.height) * 2 - 1;
      parTargetY = nx * 0.1;
      parTargetX = ny * 0.06;
      const hit = hitTest(x, y);
      hoverId = hit ? hit.id : null;
      if (!isDragging) canvas.style.cursor = hit ? 'pointer' : 'grab';
    };

    const handleCanvasLeave = () => {
      parTargetY = 0;
      parTargetX = 0;
      hoverId = null;
      if (!isDragging) canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleCanvasHover);
    canvas.addEventListener('mouseleave', handleCanvasLeave);

    // Only track move/end while a drag started on the canvas — a
    // permanent window touchmove listener adds main-thread work on
    // every phone scroll gesture.
    let touchDragging = false;
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchDragging = true;
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
      }
    };
    const handleTouchMove = (e) => {
      if (!touchDragging || !isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      velYaw = deltaX * 0.005;
      velPitch = -deltaY * 0.005;
      dragYaw += velYaw;
      dragPitch += velPitch;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => {
      touchDragging = false;
      isDragging = false;
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!canvasVisible) return;
      // Phone + mid-scroll: skip the expensive scene entirely this frame.
      if (scrollActive) return;

      const time = (performance.now() - timeStart) / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      const centerX = width / 2;
      const centerY = height / 2;

      // Inertia after release + idle spin + eased parallax
      if (!isDragging) {
        dragYaw += velYaw;
        dragPitch += velPitch;
        velYaw *= 0.94;
        velPitch *= 0.94;
        if (Math.abs(velYaw) < 0.00005) velYaw = 0;
        if (Math.abs(velPitch) < 0.00005) velPitch = 0;
        if (!prefersReducedMotion) {
          autoYaw += 0.003;
          autoPitch += 0.002;
        }
      }
      parYaw += (parTargetY - parYaw) * 0.05;
      parPitch += (parTargetX - parPitch) * 0.05;

      const yaw = autoYaw + dragYaw + parYaw;
      const pitch = autoPitch + dragPitch + parPitch;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      // Project from immutable base coords (no drift from baking)
      nodes.forEach((node) => {
        const x1 = node.bx * cosY - node.bz * sinY;
        const z1 = node.bz * cosY + node.bx * sinY;
        const y2 = node.by * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.by * sinX;
        const fov = 350;
        const scale = fov / (fov + z2);
        node.x2d = centerX + x1 * scale;
        node.y2d = centerY + y2 * scale;
        node.scale = scale;
        // Front chips (negative z) must be sharp; only the far side fades back
        node.alpha = Math.min(1, Math.max(0.3, 0.65 - z2 / 400));
        node.z2 = z2;
      });

      nodes.sort((a, b) => a.z2 - b.z2);

      // Backdrop glow (skip on phones — createRadialGradient each frame
      // is costly while the section is on screen during scroll)
      if (!coarsePointer) {
        const glowR = Math.min(width, height) * 0.5;
        const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowR);
        glow.addColorStop(0, 'rgba(255, 79, 18, 0.07)');
        glow.addColorStop(0.55, 'rgba(255, 79, 18, 0.025)');
        glow.addColorStop(1, 'rgba(255, 79, 18, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Drifting dust (fewer particles on phones)
      const dustCount = coarsePointer ? 18 : dust.length;
      for (let di = 0; di < dustCount; di++) {
        const d = dust[di];
        if (!prefersReducedMotion) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0) d.x += width;
          if (d.x > width) d.x -= width;
          if (d.y < 0) d.y += height;
          if (d.y > height) d.y -= height;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.orange
          ? `rgba(255, 79, 18, ${d.a})`
          : `rgba(11, 11, 11, ${d.a})`;
        ctx.fill();
      }

      const selectedId = selectedSkillRef.current ? selectedSkillRef.current.id : null;
      const neighbors = selectedId ? neighborsOf(selectedId) : null;

      // Guide circle — same radius as the chip sphere so it's a true orbit path
      ctx.beginPath();
      ctx.strokeStyle = '#FF4F12';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.16;
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.36, 0, Math.PI * 2);
      ctx.stroke();

      // ① Relationship arcs (highlighted for selection) + ② energy pulses
      RELATED_PAIRS.forEach(([aid, bid], i) => {
        const an = nodes.find((n) => n.id === aid);
        const bn = nodes.find((n) => n.id === bid);
        if (!an || !bn) return;
        if (an.z2 < -50 || bn.z2 < -50) return;

        const touches = !!(selectedId && (aid === selectedId || bid === selectedId));
        const edgeAlpha = selectedId ? (touches ? 0.5 : 0.04) : 0.08;
        const edgeWidth = selectedId ? (touches ? 1.3 : 0.6) : 0.8;

        const x0 = an.x2d;
        const y0 = an.y2d;
        const x1 = bn.x2d;
        const y1 = bn.y2d;
        const cX = (x0 + x1) / 2;
        const cY = (y0 + y1) / 2 - 20;

        ctx.beginPath();
        ctx.globalAlpha = edgeAlpha;
        ctx.strokeStyle = '#FF4F12';
        ctx.lineWidth = edgeWidth;
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cX, cY, x1, y1);
        ctx.stroke();

        // Pulses only on active edges (focus stays on the selection)
        if (!prefersReducedMotion && (!selectedId || touches)) {
          const { speed, phase } = edgeMeta[i];
          for (let p = 0; p < 2; p++) {
            const t = (time * speed + phase + p * 0.5) % 1;
            const mt = 1 - t;
            const px = mt * mt * x0 + 2 * mt * t * cX + t * t * x1;
            const py = mt * mt * y0 + 2 * mt * t * cY + t * t * y1;
            ctx.globalAlpha = touches ? 0.25 : 0.12;
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#FF4F12';
            ctx.fill();
            ctx.globalAlpha = touches ? 0.95 : 0.7;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // ①④ Nodes: selection focus, neighbor rings, hover state, pulse ring
      nodes.forEach((node) => {
        ctx.save();
        const isSelected = selectedId === node.id;
        const isNeighbor = neighbors ? neighbors.has(node.id) : false;
        const isHover = hoverId === node.id;

        let alpha = isSelected ? 1 : node.alpha;
        if (selectedId && !isSelected && !isNeighbor) alpha *= 0.35;
        ctx.globalAlpha = alpha;

        // Keep depth feel but clamp chip size so front chips don't balloon/collide
        const fontScale = Math.min(Math.max(node.scale, 0.85), 1.35);
        const nodeRadius = Math.max(12, 18 * fontScale) + (isHover ? 2 : 0);

        if (isSelected) {
          const pulse = prefersReducedMotion ? 0.5 : Math.sin(time * 4) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(node.x2d, node.y2d, nodeRadius + 8 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 79, 18, ${0.15 + pulse * 0.25})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x2d, node.y2d, nodeRadius + (isSelected ? 6 : 2), 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(255, 79, 18, 0.15)' : 'rgba(0, 0, 0, 0.02)';
        ctx.fill();

        const padding = 10 * fontScale;
        const fontSize = Math.max(10, Math.floor(12 * fontScale));
        ctx.font = `bold ${fontSize}px Syne, sans-serif`;
        const textWidth = ctx.measureText(node.name).width;
        const boxWidth = textWidth + padding * 2;
        const boxHeight = fontSize * 1.8;
        const boxX = node.x2d - boxWidth / 2;
        const boxY = node.y2d - boxHeight / 2;

        if (isHover && !isSelected) {
          ctx.shadowColor = 'rgba(255, 79, 18, 0.35)';
          ctx.shadowBlur = 12;
        }

        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12 * fontScale);
        ctx.fillStyle = isSelected ? '#FF4F12' : '#FFFFFF';
        if (isSelected) {
          ctx.strokeStyle = '#0B0B0B';
          ctx.lineWidth = 2;
        } else if (isNeighbor || isHover) {
          ctx.strokeStyle = '#FF4F12';
          ctx.lineWidth = isHover ? 1.8 : 1.4;
        } else {
          ctx.strokeStyle = 'rgba(11, 11, 11, 0.1)';
          ctx.lineWidth = 1;
        }
        ctx.fill();
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#0B0B0B';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x2d, node.y2d);
        ctx.restore();
      });

      ctx.globalAlpha = 1;
    };

    render();

    // Pause the rAF loop when the orbit is off-screen (saves CPU/GPU).
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        canvasVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
      if (hit) setSelectedSkill(hit);
    };
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      intersectionObserver.disconnect();
      window.removeEventListener('scroll', onScrollPaint);
      clearTimeout(scrollIdleTimer);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleCanvasHover);
      canvas.removeEventListener('mouseleave', handleCanvasLeave);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewMode, filteredSkills]);

  return (
    <section id="skills" className="skills-section">
      {/* Background decorations */}
      <div className="skills-bg-grid" aria-hidden="true" />
      <div className="skills-bg-dots" aria-hidden="true" />
      <div className="skills-bg-word" aria-hidden="true">STACK</div>

      <div className="skills-container">

        {/* ═══ SECTION HEADER ═══ */}
        <div className="skills-header">
          <div className="skills-eyebrow">
            <span className="skills-eyebrow-dot" />
            <span>03 // Technical Expertise</span>
            <span className="skills-eyebrow-line" />
          </div>

          <h2 className="skills-heading">
            THE TOOLS<br />BEHIND THE <span className="accent">BUILD.</span>
          </h2>

          <p className="skills-desc">
            The practical technology stack I use to build scalable web products, robust APIs, and AI-powered experiences.
          </p>

          <div className="skills-handwriting">
            the stack behind <span>what I ship.</span>
            <span className="arrow">↘</span>
          </div>
        </div>

        {/* ═══ UTILITIES BAR ═══ */}
        <div className="skills-toolbar">
          <div className="skills-toolbar-row">
            {/* Search */}
            <div className="skills-search-wrapper">
              <Search className="skills-search-icon" />
              <input
                type="text"
                className="skills-search"
                placeholder="Search technology..."
                aria-label="Search technologies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Tabs */}
            <div className="skills-categories">
              {SKILL_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={isActive}
                    className={`skills-cat-btn ${isActive ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* View Toggle */}
            <div className="skills-view-toggle">
              <button
                onClick={() => setViewMode('3d')}
                aria-pressed={viewMode === '3d'}
                className={`skills-view-btn ${viewMode === '3d' ? 'active' : ''}`}
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>Orbit</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                className={`skills-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* ═══ MAIN CONTENT AREA ═══ */}
        {viewMode === '3d' ? (
          <div className="skills-main">

            {/* 3D Canvas (7 Cols) */}
            <div className="skills-canvas-wrapper" role="img" aria-label="Interactive 3D skill cloud. Switch to grid view or use the search box to browse every skill as text.">
              <canvas ref={canvasRef} className="skills-canvas" />
              <div className="skills-canvas-meta">
                <span className="meta-dot" />
                <span>Drag to explore</span>
                <span style={{ color: '#ccc' }}>|</span>
                <span>{filteredSkills.length} technologies</span>
                <span style={{ color: '#ccc' }}>|</span>
                <span>Click to inspect</span>
              </div>
            </div>

            {/* Selected Skill Inspection Panel (5 Cols) */}
            <div className="skills-inspector">
              <div className="skills-inspector-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="skills-inspector-icon">
                    <span>{selectedSkill.icon}</span>
                  </div>
                  <div className="skills-inspector-info">
                    <h3 className="skills-inspector-name">{selectedSkill.name}</h3>
                    <span className="skills-inspector-category">
                      {CATEGORY_LABELS[selectedSkill.category] || selectedSkill.category}
                    </span>
                  </div>
                </div>
                <span className="skills-inspector-badge">
                  {selectedSkill.badge}
                </span>
              </div>

              <div className="space-y-3">
                <span className="skills-proficiency-label">Proficiency Level</span>
                <div className="skills-progress-ring-wrapper">
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <svg className="skills-progress-ring-svg" viewBox="0 0 80 80">
                      <circle className="skills-progress-ring-bg" cx="40" cy="40" r="36" />
                      <motion.circle
                        className="skills-progress-ring-fill"
                        cx="40" cy="40" r="36"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - selectedSkill.level / 100) }}
                        transition={{ duration: 0.8 }}
                      />
                    </svg>
                  </div>
                  <div className="skills-progress-ring-info">
                    <span className="skills-progress-ring-pct">{selectedSkill.level}%</span>
                    <span className="skills-progress-ring-label">Competency Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="skills-desc-label">Overview & Practical Usage</span>
                <p className="skills-desc-text">
                  {selectedSkill.desc}
                </p>
              </div>

              <div className="space-y-2 pt-2" style={{ borderTop: '1px solid rgba(11,11,11,0.08)' }}>
                <span className="skills-projects-label">Linked Projects</span>
                <div className="skills-project-list">
                  {selectedSkill.projects.map((proj, idx) => (
                    <span key={idx} className="skills-project-item">
                      <CheckCircle2 className="w-3 h-3" style={{ color: '#FF4F12', flexShrink: 0 }} />
                      <span>{proj}</span>
                      <ArrowRight className="w-3 h-3 proj-arrow" />
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Grid View */
          <div className="skills-grid">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <motion.div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  whileHover={{ y: -3 }}
                  className={`skills-grid-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="skills-grid-card-head">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="skills-grid-card-icon">
                        <span>{skill.icon}</span>
                      </div>
                      <div className="skills-grid-card-info">
                        <h4 className="skills-grid-card-name">{skill.name}</h4>
                        <span className="skills-grid-card-cat">{CATEGORY_LABELS[skill.category] || skill.category}</span>
                      </div>
                    </div>
                    <span className="skills-grid-card-level">{skill.level}%</span>
                  </div>
                  <p className="skills-grid-card-desc">{skill.desc}</p>
                  <div className="skills-grid-card-footer">
                    <span className="skills-grid-card-badge">{skill.badge}</span>
                    <span className="skills-grid-card-inspect">
                      Inspect <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
