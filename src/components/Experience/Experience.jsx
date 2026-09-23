/* ============================================================
   src/components/Experience/Experience.jsx
   Option 3: Horizontal Card Stack Fan Reveal
   Awwwards & Studio Freight Grade Kinetic Scroll Fan-Out Showcase
   ============================================================ */

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, Briefcase, GraduationCap, Calendar, MapPin, 
  CheckCircle2, ArrowRight, Award, Code2, Building2
} from 'lucide-react';

const CAREER_EXPERIENCES = [
  {
    id: 1,
    role: 'Full Stack Engineer Intern',
    company: 'Cognifyz Technologies',
    period: 'Jan 2025 – Feb 2025',
    type: 'SOFTWARE INTERNSHIP',
    location: 'Remote',
    gradient: 'from-orange-500 via-amber-400 to-white',
    description: 'Collaborated on production full-stack web applications. Architected Express.js REST API endpoints connected to MongoDB databases, implemented secure authentication flows, and refactored client React components.',
    achievements: [
      'Architected 12+ RESTful API endpoints handling JSON payloads & MongoDB queries.',
      'Implemented stateless JWT authentication controllers with hashed bcrypt passwords.',
      'Refactored frontend React state management for seamless asynchronous API calls.',
      'Participated in daily agile code reviews and Git version control workflows.',
    ],
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth', 'Git'],
  },
  {
    id: 2,
    role: 'Web Development Intern',
    company: 'Internshala Software',
    period: 'May 2024 – Jul 2024',
    type: 'SOFTWARE INTERNSHIP',
    location: 'Remote',
    gradient: 'from-purple-500 via-pink-400 to-white',
    description: 'Completed structured full-stack software development training and project builds focusing on responsive UI patterns, DOM manipulation, and modern JavaScript standards.',
    achievements: [
      'Constructed pixel-perfect, mobile-responsive web pages adhering to W3C standards.',
      'Optimized media assets and CSS delivery, boosting performance lighthouse score by 25%.',
      'Developed interactive DOM manipulation scripts and form validation modules.',
      'Received Certificate of Excellence for outstanding web development execution.',
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'DOM Manipulation', 'Responsive Web Design', 'Bootstrap'],
  },
  {
    id: 3,
    role: 'B.Tech Computer Science & AI',
    company: 'Teerthanker Mahaveer University',
    period: 'Aug 2022 – Present (2026)',
    type: 'ACADEMIC DEGREE',
    location: 'Moradabad, India',
    gradient: 'from-emerald-400 via-cyan-400 to-white',
    description: 'Pursuing Bachelor of Technology in Computer Science with specialization in Artificial Intelligence & Machine Learning. Strong academic focus on Data Structures, Algorithms, DBMS, OOP, and Web Development.',
    achievements: [
      'Maintained strong academic standing across Artificial Intelligence & CS coursework.',
      'Led student development team for college technical web applications.',
      'Specialized in Python AI algorithms, Data Structures, and full-stack product engineering.',
    ],
    skills: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Data Structures', 'DBMS', 'OOP'],
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  // Final fan spread in px — measured from the stage so cards
  // always land fully visible (never clipped by overflow-hidden).
  const [spread, setSpread] = useState(320);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // 'start end' → progress begins as soon as the section ENTERS
    // the viewport (not when its top reaches the viewport top),
    // so the fan is already animating while you scroll in.
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const calc = () => {
      const w = stageRef.current?.offsetWidth || window.innerWidth;
      const cardW = 410;
      const edge = 24;
      const max = Math.floor(w / 2 - cardW / 2 - edge);
      setSpread(Math.max(180, Math.min(max, 480)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [isDesktop]);

  // Desktop Scroll-Linked Fan Transforms
  // Fan runs over 0 → 0.6 of the full travel (entry + pin) with a
  // smoothstep ease: gentle start while entering, steady middle,
  // soft landing right after the sticky pins — then HOLDS to 1.
  const FAN_END = 0.6;
  const CLUSTER = 0.35 * 410; // ≈ previous "35%" start offset in px
  const fanT = useTransform(scrollYProgress, (v) => {
    const t = Math.min(Math.max(v / FAN_END, 0), 1);
    return t * t * (3 - 2 * t);
  });

  const x1 = useTransform(fanT, [0, 1], [CLUSTER, -spread]);
  const rotate1 = useTransform(fanT, [0, 0.75], [-7, 0]);

  const x2 = useTransform(fanT, [0, 1], [0, 0]);
  const rotate2 = useTransform(fanT, [0, 0.75], [0, 0]);

  const x3 = useTransform(fanT, [0, 1], [-CLUSTER, spread]);
  const rotate3 = useTransform(fanT, [0, 0.75], [7, 0]);

  const cardTransforms = [
    { x: x1, rotate: rotate1 },
    { x: x2, rotate: rotate2 },
    { x: x3, rotate: rotate3 },
  ];

  return (
    <section id="experience" ref={containerRef} className="relative lg:min-h-[260vh] pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Sticky Viewport Wrapper — fills the viewport and pins the
          stage to its bottom edge so Contact slides in flush against
          the cards the moment the pin releases (no dead zone). */}
      <div className="sticky top-24 min-h-[calc(100dvh_-_6rem)] flex flex-col justify-end space-y-12 overflow-hidden pt-6">
        
        {/* SECTION HEADER */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 // Horizontal Fan Reveal Experience</span>
          </div>

          <h2 className="font-head text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            CAREER & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-white">CREDENTIALS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-body leading-relaxed">
            Scroll down to watch my engineering career milestones fan out horizontally across the viewport.
          </p>
        </div>

        {/* DESKTOP VIEW: Kinetic Scroll-Linked Fan Reveal (≥1024px) */}
        {isDesktop ? (
          <div ref={stageRef} className="relative h-[520px] flex items-center justify-center">
            {CAREER_EXPERIENCES.map((exp, idx) => {
              const transform = cardTransforms[idx];
              return (
                <motion.div
                  key={exp.id}
                  style={{
                    x: transform.x,
                    rotate: transform.rotate,
                  }}
                  whileHover={{ scale: 1.04, zIndex: 50 }}
                  className="absolute w-[410px] p-8 rounded-3xl bg-[#12141c]/95 backdrop-blur-2xl border border-white/15 hover:border-orange-500/60 shadow-2xl shadow-black/90 space-y-6 overflow-hidden group transition-colors duration-300 flex flex-col justify-between"
                >
                  {/* Top Accent Beam */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/15 pb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center text-orange-400">
                        {exp.type.includes('DEGREE') ? (
                          <GraduationCap className="w-5 h-5" />
                        ) : (
                          <Briefcase className="w-5 h-5" />
                        )}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono text-[11px] font-bold">
                        {exp.period}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                        {exp.type}
                      </span>
                      <h3 className="font-head text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-orange-400" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs font-body leading-relaxed line-clamp-3">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono text-orange-400 uppercase font-bold block">
                        Contributions
                      </span>
                      {exp.achievements.slice(0, 3).map((ach, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-slate-300 text-[11px] font-mono">
                          <CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-white/10">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white font-mono text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* MOBILE VIEW: Horizontal Scrollable Track (<1024px) */
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4 px-2">
            {CAREER_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="min-w-[300px] max-w-[340px] p-6 rounded-3xl bg-[#12141c]/95 backdrop-blur-2xl border border-white/15 shadow-xl space-y-4 shrink-0"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center text-orange-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 font-mono text-[11px] font-bold">
                    {exp.period}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-head text-lg font-extrabold text-white">
                    {exp.role}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">
                    {exp.company}
                  </div>
                </div>

                <p className="text-slate-300 text-xs font-body leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {exp.achievements.slice(0, 2).map((ach, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-300 text-[11px] font-mono">
                      <CheckCircle2 className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
