/* ============================================================
   data/portfolioData.js  —  All content in one place.
   Edit this file to update your portfolio without touching components.
   ============================================================ */

// ── Personal / contact info
export const personalInfo = {
  name: 'Sivaram Charan',
  initials: 'SRC',
  role: 'Full Stack Developer',
  tagline: 'I build fast, modern, and scalable web experiences with the MERN stack — from pixel-perfect UIs to robust backend APIs.',
  email: 'sivaramcharan55@gmail.com',
  github: 'https://github.com/SivaRam6461',   // ← UPDATE THIS
  linkedin: 'https://www.linkedin.com/in/siva-ram-charan-934590317/', // ← UPDATE THIS
  location: 'India',
  available: true,
  resumeUrl: '/Sivaram_FullStackDeveloper_resume.pdf',               // put resume.pdf in /public folder
};

// ── About me stats shown in the about section
export const stats = [
  { value: '9+', label: 'Projects Built' },
  { value: '2',  label: 'Internships' },
  { value: '10+', label: 'Technologies' },
  { value: '∞',  label: 'Cups of Coffee' },
];

// ── About me tags (chips shown below bio)
export const aboutTags = [
  '📍 India',
  '🎓 B.Tech AI',
  '💼 Open to Work',
  '⚡ MERN Stack',
  '🚀 Full Stack',
];

// ── Skill categories
export const skills = [
  {
    id: 1,
    icon: '🎨',
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js','Next.js', 'Tailwind CSS','Framer Motion', 'GSAP animations','Swiper.js for sliders' ],
  },
  {
    id: 2,
    icon: '⚙️',
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
  },
  {
    id: 3,
    icon: '🗄️',
    category: 'Database',
    items: ['MongoDB', 'Mongoose', 'Firebase'],
  },
  {
    id: 4,
    icon: '🛠️',
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'VS Code', 'Postman','Cloudinary','Google Maps API','Vercel'],
  },
];

// ── Projects  (add more objects here to add projects)
export const projects = [
  {
    id: 1,
    title: 'Food Ordering Web App',
    description:
      'Full-stack MERN application for ordering food online. Features JWT authentication, menu browsing, cart management, order tracking, and an admin dashboard.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    category: 'Full Stack',
    liveUrl: null,
    githubUrl: 'https://github.com/SivaRam6461/Online-Food-Ordering-Web-Application',
    featured: true,
    gradient: 'linear-gradient(135deg, #0e7490, #1d4ed8)',
    //emoji: '🍔',
    //image: 'public/images/BD logo.jpg ',
    images: [
      '/images/p2.12.webp',
    '/images/p2.13.webp',
    '/images/p2.1.webp',
    '/images/p2.2.webp',
    '/images/p2.3.webp',
    '/images/p2.4.webp',
    '/images/p2.5.webp',
    '/images/p2.6.webp',
    '/images/p2.7.webp',
    '/images/p2.8.webp',
    '/images/p2.9.webp',

  ]
  },
  {
    id: 2,
    title: 'Ekam Infra — Construction Site',
    description:
      'Professional business website for a construction company. Responsive design, project showcase, service listings, and contact integration. Live on ekaminfra.in',
    tech: ['HTML', 'CSS', 'JavaScript'],
    category: 'Frontend',
    liveUrl: 'http://ekaminfra.in/',
    githubUrl: 'https://github.com/SivaRam6461/Construction_Web',
    featured: true,
     gradient: 'linear-gradient(135deg, #7c3aed, #db2777)',
    //emoji: '🏗️',
    //image: 'public/images/project1.jpg ',  
    images: [
    '/images/p1.webp',
    '/images/p2.webp',
    '/images/p3.webp',
    '/images/p4.webp',
    '/images/p5.webp',
    '/images/p6.webp',

  ]
  },
  // {
  //   id: 3,
  //   title: 'Crop Recommendation System',
  //   description:
  //     'A robust RESTful API with Express.js and MongoDB. Includes authentication middleware, full CRUD operations, request validation, and structured error handling.',
  //   tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
  //   category: 'Backend',
  //   liveUrl: null,
  //   githubUrl: null,
  //   featured: false,
  //   gradient: 'linear-gradient(135deg, #065f46, #0e7490)',
  //  // emoji: '🔌',
  //   //image: 'public/images/BD logo.jpg ',
  //   images: [
  //   '/images/BD logo.webp',
  //   '/images/project1.webp',
  //   '/images/BD logo.webp'
  // ]
  // },
  {
    id: 4,
    title: 'Travel Planner Web App',
    description:
      'A full-stack travel planning web app built with the MERN stack that lets users discover destinations, save favorites, leave reviews, and create personalized trip itineraries.',
    tech: ['React.js', 'Vite', 'Redux Toolkit',' Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB','Mongoose', 'JWT','Cloudinary','Google Maps'],
    category: 'Full Stack',
    liveUrl: null,
    githubUrl: 'https://github.com/SivaRam6461/Travel-Planner',
    featured: true,
    gradient: 'linear-gradient(135deg, #0e7490, #1d4ed8)',
    //emoji: '🍔',
    //image: 'public/images/BD logo.jpg ',
    images: [
      '/images/p4.1.jpg',
    '/images/p4.2.jpg',
    '/images/p4.3.jpg',
    '/images/p4.4.jpg',
    '/images/p4.5.jpg',
    '/images/p4.6.jpg',
    '/images/p4.7.jpg',
    '/images/p4.8.jpg',
    '/images/p4.9.jpg',
    '/images/p4.10.jpg',
    '/images/p4.11.jpg',
    '/images/p4.12.jpg',
    '/images/p4.13.jpg',
    '/images/p4.14.jpg',
    '/images/p4.15.jpg',
    '/images/p4.16.jpg',
    '/images/p4.17.jpg',
    '/images/p4.18.jpg',
    '/images/p4.19.jpg',
    '/images/p4.20.jpg',


  ]
  },
  {
    id: 5,
    title: 'GYM Web App',
    description:
      'A modern, animation-rich fitness website built with React and Next.js. Features smooth GSAP and Framer Motion animations, Swiper.js sliders, class and trainer showcases, and a fully responsive Tailwind CSS layout.',
    tech: ['React.js', 'Vite', ' Tailwind CSS','Framer Motion',  'Next.js', 'GSAP animations','Swiper.js for sliders' ,'JavaScript (ES6)',],
    category: 'Frontend',
    liveUrl: null,
    githubUrl: 'https://github.com/SivaRam6461/Gym-Fitness-website',
    featured: true,
    gradient: 'linear-gradient(135deg, #0e7490, #1d4ed8)',
    //emoji: '🍔',
    //image: 'public/images/BD logo.jpg ',
    images: [
      '/images/p5.0.png',
      '/images/p5.1.png',
      '/images/p5.2.png',
      '/images/p5.3.png',
      '/images/p5.4.png',
      '/images/p5.5.png',
      '/images/p5.6.png',
      '/images/p5.7.png',
      '/images/p5.8.png',
      '/images/p5.9.png',
      '/images/p5.10.png',
      '/images/p5.12.png',
      '/images/p5.13.png',
      '/images/p5.14.png',
      '/images/p5.15.png',
      '/images/p5.16.png',
      '/images/p5.17.png',
      '/images/p5.18.png',
      '/images/p5.19.png',

      '/images/p5.21.png',
      '/images/p5.22.png',
      '/images/p5.23.png',
      '/images/p5.25.png',
      '/images/p5.26.png',
      '/images/p5.27.png',
      '/images/p5.28.png',
      '/images/p5.29.png',
      '/images/p5.30.png',

    


  ]
  },
  {
    id: 6,
    title: 'Hotel Landing Page',
    description:
      'A modern hotel landing page built with HTML, CSS, and JavaScript, featuring a responsive design and built for a real client!.',
    tech: ['HTML', 'CSS',  'JavaScript'],
    category: 'Frontend',
    liveUrl: null,
    githubUrl: 'https://github.com/SivaRam6461/Hotel-Landing-Page',
    featured: true,
    gradient: 'linear-gradient(135deg, #0e7490, #1d4ed8)',
    //emoji: '🍔',
    //image: 'public/images/BD logo.jpg ',
    images: [
      '/images/p6.1.png',
      '/images/p6.2.png',
      '/images/p6.3.png',
      '/images/p6.4.png',
      '/images/p6.5.png',
      '/images/p6.6.png',

    


  ]
  },
   {
    id: 7,
    title: 'Photography Landing Page',
    description:
      'A modern photography landing page built with HTML, CSS, and JavaScript, featuring a responsive design and built for a real client!.',
    tech: ['HTML', 'CSS',  'JavaScript'],
    category: 'Frontend',
    liveUrl: null,
    githubUrl: 'https://github.com/SivaRam6461/Photography-website',
    featured: true,
    gradient: 'linear-gradient(135deg, #0e7490, #1d4ed8)',
    //emoji: '🍔',
    //image: 'public/images/BD logo.jpg ',
    images: [
      '/images/p7.1.png',
      '/images/p7.2.png',
      '/images/p7.3.png',
      '/images/p7.4.png',
     


  ]
  },
 
];

// ── All filter tabs derived from projects (don't need to edit this)
export const projectFilters = ['All', ...new Set(projects.map((p) => p.category))];

// ── Experience / timeline entries
export const experience = [
  {
    id: 1,
    role: 'Full Stack Developer Intern',
    company: 'Cognifyz Technologies',
    period: '2025',
    type: 'internship',   // "internship" | "education"
    description:
      'Developed and maintained MERN stack web applications. Collaborated with the team to build RESTful APIs, implemented JWT authentication, and improved UI/UX across multiple projects.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST APIs'],
  },
  {
    id: 2,
    role: 'Web Development Intern',
    company: 'Internshala',
    period: '2024',
    type: 'internship',
    description:
      'Completed structured training and project work in web development. Built responsive frontends with HTML, CSS, and JavaScript while learning full-stack fundamentals.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  },
  {
    id: 3,
    role: 'B.Tech in Artificial Intelligence',
    company: 'Teerthanker Mahaveer University',
    period: '2022 – 2026',
    type: 'education',
    description:
      'I completed my B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence, Machine Learning, and Deep Learning (AI/ML/DL). During my academic journey, I built a strong foundation in data structures, algorithms, object-oriented programming, database management, and software engineering. Alongside this, I gained hands-on experience in full-stack web development through internships and personal projects using React.js, Node.js, Express.js, MongoDB, JavaScript, HTML, and CSS.',
    skills: ['AI/ML/DL', 'Python', 'Data Structures', 'Algorithms'],
  },
];

// ── Testimonials — ONLY add real quotes from real people here.
// Never invent names, companies, or quotes — fabricated testimonials
// are a serious credibility risk on a professional portfolio.
// The section (and its nav link) automatically hides itself while
// this array is empty, and appears once you add real entries.
//
// Shape of each entry:
// {
//   id: 1,
//   name: 'Full Name',
//   role: 'Their Job Title',
//   company: 'Their Company',       // optional — omit if not applicable
//   quote: 'What they actually said, verbatim or lightly trimmed.',
//   rating: 5,                      // 1–5, only include if they gave one
//   avatar: '/images/reviewer1.jpg', // optional — omit to show initials instead
// }
export const testimonials = [];
