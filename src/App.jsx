import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import emailjs from '@emailjs/browser';

// ==========================================================
// 1. GLOBAL UTILITY DATA AND ANIMATION VARIANTS
// ==========================================================

// Global Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Profile Data (Derived from the user's CV)
const profileData = {
  name: "Yabibal Zelalem",
  title: "Software Developer & IT Consultant",
  bio: "Highly motivated Software Developer with an MSc in Computer Science and an MBA. Expert in building robust full-stack applications and managing comprehensive IT systems. Focused on delivering solutions that integrate technical precision with strategic business insight.",
  image: "https://placehold.co/200x200/4c1d95/fff?text=YZ",
  skills: {
    development: ["C#", "ASP.NET", "React", "JavaScript", "Python", "Java", "Node.js", "PHP"],
    systems: ["SQL Server", "MySQL", "Oracle", "SurveyCTO", "REST APIs", "Git"],
    tools: ["Linux", "DHIS2", "ERP Systems", "TailwindCSS"],
  },
  education: [
    { degree: "MSc in Computer Science", institution: "Kotebe University of Education", years: "2022 – 2025" },
    { degree: "MBA", institution: "Gage University College", years: "2020 – 2022" },
  ],
  social: {
    github: "https://github.com/Yabibal1624",
    linkedin: "https://www.linkedin.com/in/yabibal-zelalem-mengist-263a9b207/",
    website: "http://www.scitech.com.et"
  }
};

const projectsData = [
  { title: "DHIS2 Data Warehouse", description: "Designed and implemented a data warehouse and reporting system using DHIS2 for health metrics tracking.", tech: ["DHIS2", "MySQL", "Data Quality"] },
  { title: "E-Commerce Web Platform", description: "Developed a full-stack e-commerce site with product management, payment integration, and user authentication.", tech: ["ASP.NET", "C#", "SQL Server", "JavaScript"] },
  { title: "SurveyCTO Mobile Data Collection", description: "Created complex forms and automated data pipelines for large-scale field data collection projects.", tech: ["SurveyCTO", "Excel", "REST APIs"] },
  { title: "React Portfolio UI", description: "A visually striking portfolio leveraging React and Framer Motion for smooth, modern user interface animations.", tech: ["React", "TailwindCSS", "Framer Motion"] },
  { title: "ERP System Customization", description: "Customized and maintained core modules of an enterprise ERP system to align with organizational business processes.", tech: ["ERP Systems", "SQL Server", "C#"] },
  { title: "Multi-Client Web Portal", description: "Built a secure, scalable web portal for multiple clients, managing user roles and data isolation.", tech: ["Node.js", "React", "MongoDB"] },
];

// ==========================================================
// 2. ICONS (Inline SVGs)
// ==========================================================

const IconWrapper = ({ children, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {children}
  </svg>
);

const Github = ({ className }) => (
  <IconWrapper className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.25-.13 1.95v4"></path>
    <path d="M9 18c-3.1-1-4-5-4-5"></path>
  </IconWrapper>
);

const Linkedin = ({ className }) => (
  <IconWrapper className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </IconWrapper>
);

const Globe = ({ className }) => (
  <IconWrapper className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </IconWrapper>
);

const Mail = ({ className }) => (
  <IconWrapper className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.07 0L2 7"></path>
  </IconWrapper>
);

const Target = ({ className }) => (
  <IconWrapper className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </IconWrapper>
);

const Lightbulb = ({ className }) => (
  <IconWrapper className={className}>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
    <path d="M12 12V3"></path>
    <path d="M12 3a7 7 0 0 0-7 7c0 2.2 2 4 4 4h6c2 0 4-1.8 4-4a7 7 0 0 0-7-7z"></path>
  </IconWrapper>
);

// ==========================================================
// 3. HELPER COMPONENTS
// ==========================================================

const GlassCard = ({ children, className }) => (
  <motion.div
    className={`p-6 md:p-8 rounded-3xl backdrop-blur-sm shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 ${className}`}
    style={{
      background: 'rgba(255, 255, 255, 0.05)',
    }}
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

// ==========================================================
// 4. CUSTOM STYLES (CSS for custom classes and animations)
// ==========================================================

const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Space+Mono:wght@700&display=swap');

    /* Global Setup */
    :root {
      --primary-bg: #0d1117;
      --secondary-bg: #111827; /* gray-900 */
      --accent-color: #2dd4bf; /* teal-400 */
      --text-color: #e2e8f0; /* slate-200 */
    }

    body {
      background-color: var(--primary-bg);
      color: var(--text-color);
      font-family: 'Montserrat', sans-serif;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      position: relative;
    }

    /* Animated Background Grid */
    .animated-grid {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      background: linear-gradient(90deg, transparent 1px, rgba(45, 212, 191, 0.05) 1px),
                  linear-gradient(0deg, transparent 1px, rgba(45, 212, 191, 0.05) 1px);
      background-size: 50px 50px;
      animation: grid-move 60s linear infinite;
      opacity: 0.1;
    }

    @keyframes grid-move {
      from { background-position: 0 0; }
      to { background-position: 50px 50px; }
    }

    /* Main Layout and Navbar */
    .app {
      padding-top: 5rem; 
      position: relative;
      z-index: 10;
    }

    .section {
      padding: 6rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(17, 24, 39, 0.9); /* dark transparent */
      backdrop-filter: blur(10px);
      z-index: 1000;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    }

    .logo {
      font-family: 'Space Mono', monospace;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent-color);
      cursor: pointer;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-links a:hover {
      color: var(--accent-color);
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      .navbar {
        justify-content: center;
      }
      .logo {
        margin: 0 auto;
      }
    }

    /* Glitch Text Effect */
    .glitch-text {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      position: relative;
      color: var(--text-color); /* Base color for legibility */
      line-height: 1.1;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .glitch-text::before,
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      mix-blend-mode: hard-light; /* For cooler color blending */
    }

    .glitch-text::before {
      color: #00FFFF; /* Cyan */
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
      text-shadow: 1px 0 0 rgba(0, 255, 255, 0.6);
    }

    .glitch-text::after {
      color: #FF00FF; /* Magenta */
      animation: glitch-anim-2 2s infinite linear alternate-reverse;
      text-shadow: -1px 0 0 rgba(255, 0, 255, 0.6);
    }

    /* Project Card */
    .project-card:hover {
        border-color: rgba(45, 212, 191, 0.8);
        box-shadow: 0 8px 30px rgba(45, 212, 191, 0.2);
    }
  `}</style>
);


// ==========================================================
// 5. COMPONENTS
// ==========================================================

const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        YabibalZ
      </motion.div>

      <motion.ul
        className="nav-links"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.li variants={fadeInUp}><a href="#hero">Home</a></motion.li>
        <motion.li variants={fadeInUp}><a href="#acumen">Acumen</a></motion.li>
        <motion.li variants={fadeInUp}><a href="#projects">Projects</a></motion.li>
        <motion.li variants={fadeInUp}><a href="#contact">Contact</a></motion.li>
      </motion.ul>
    </motion.nav>
  );
};

// --- Expertise Dashboard Component (Moved here for clean Hero) ---
const DualExpertiseDashboard = ({ profile }) => {
    const { skills, education } = profile;

    const allSkills = [...skills.development, ...skills.systems, ...skills.tools];
    const uniqueSkills = [...new Set(allSkills)].slice(0, 10); 

    const latestEducation = education[0];
    const dualEducation = education[1];

    return (
        <motion.div 
            className="p-6 md:p-8 w-full font-['Inter'] text-white text-left bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-xl border border-teal-600/50"
            style={{ transform: 'translateZ(30px)' }} 
            variants={fadeInUp}
        >
            <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400 border-b border-white/10 pb-2">
                Technical Mastery & Education
            </h3>

            <div className="flex flex-col gap-6">
                {/* Skills Row */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-teal-400">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {uniqueSkills.map(skill => (
                            <motion.span 
                                key={skill} 
                                className="px-3 py-1 text-xs font-medium bg-teal-800/50 text-teal-200 rounded-full border border-teal-600/30"
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(45, 212, 191, 0.7)' }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Education Row */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-fuchsia-400">Academic Foundation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                        <GlassCard className="p-4 border-fuchsia-500/30 hover:shadow-lg">
                            <p className="font-bold text-white text-base">{latestEducation.degree}</p>
                            <p className="text-xs">{latestEducation.institution}</p>
                            <p className="text-xs text-fuchsia-300 mt-1">{latestEducation.years}</p>
                        </GlassCard>
                        <GlassCard className="p-4 border-fuchsia-500/30 hover:shadow-lg">
                            <p className="font-bold text-white text-base">{dualEducation.degree}</p>
                            <p className="text-xs">{dualEducation.institution}</p>
                            <p className="text-xs text-fuchsia-300 mt-1">{dualEducation.years}</p>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Hero Component ---
const Hero = ({ profile }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Parallax / Floating Card Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  const config = { stiffness: 150, damping: 10 };
  const springRotateX = useSpring(rotateX, config);
  const springRotateY = useSpring(rotateY, config);

  const handleMouseMove = useCallback((e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX - rect.width / 2);
      y.set(mouseY - rect.height / 2);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
      x.set(0);
      y.set(0);
  }, [x, y]);

  // Opacity fade on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

  return (
    <motion.section 
      id="hero" 
      className="section min-h-screen pt-20 flex flex-col items-center justify-center overflow-hidden relative"
      style={{ opacity }}
    >
      <div className="w-full max-w-6xl p-4 md:p-8 flex flex-col lg:flex-row gap-10 items-center">
        
        {/* Left Side: Text and Glitch Effect */}
        <motion.div 
            className="flex-1 text-center lg:text-left mb-10 lg:mb-0"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
        >
          <motion.p 
            className="text-teal-400 text-lg font-mono mb-2"
            variants={fadeInUp}
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1 
            className="glitch-text text-5xl sm:text-7xl lg:text-8xl mb-4"
            data-text={profile.name}
            variants={fadeInUp}
          >
            {profile.name}
          </motion.h1>
          
          <motion.h2 
            className="text-gray-400 text-2xl sm:text-3xl lg:text-4xl font-light mb-6"
            variants={fadeInUp}
          >
            {profile.title}
          </motion.h2>

          <motion.p 
            className="text-gray-400 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0"
            variants={fadeInUp}
          >
            {profile.bio}
          </motion.p>

          <motion.div 
            className="flex gap-4 justify-center lg:justify-start"
            variants={fadeInUp}
          >
            <motion.a 
              href="#projects" 
              className="px-6 py-3 bg-teal-500 text-gray-900 font-bold rounded-xl hover:bg-teal-400 transition duration-200 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a 
              href={profile.social.linkedin}
              target="_blank" 
              className="px-6 py-3 border border-teal-500 text-teal-400 font-bold rounded-xl hover:bg-teal-500/10 transition duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Side: Floating Card */}
        <motion.div 
            className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto"
            ref={ref}
            variants={fadeInUp}
        >
          <motion.div
              className="relative w-full max-w-sm h-64 sm:h-80"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                  perspective: 1000,
                  transformStyle: 'preserve-3d',
              }}
          >
              <motion.div
                  className="p-8 bg-gray-900/90 rounded-3xl shadow-2xl border border-teal-500/50 absolute inset-0 flex flex-col justify-center items-center"
                  style={{
                      rotateX: springRotateX,
                      rotateY: springRotateY,
                      transform: 'translateZ(20px)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                  {/* Profile Image */}
                  <motion.img
                      src={profile.image}
                      alt={profile.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-500 shadow-xl"
                      style={{ transform: 'translateZ(40px)' }}
                  />
                  <h3 className="text-2xl font-bold text-white text-center">{profile.name}</h3>
                  <p className="text-teal-400 text-center mb-6">{profile.title}</p>

                  <div className="flex justify-center gap-6 mt-4">
                      <motion.a href={profile.social.github} target="_blank" className="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="GitHub" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}> <Github className="w-6 h-6" /> </motion.a>
                      <motion.a href={profile.social.linkedin} target="_blank" className="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="LinkedIn" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}> <Linkedin className="w-6 h-6" /> </motion.a>
                      <motion.a href={profile.social.website} target="_blank" className="text-gray-400 hover:text-teal-400 transition duration-200" aria-label="Personal Website" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}> <Globe className="w-6 h-6" /> </motion.a>
                  </div>
              </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Dashboard Section */}
      <div className="w-full max-w-6xl p-4 md:p-8 mt-10">
        <DualExpertiseDashboard profile={profile} />
      </div>

    </motion.section>
  );
};

// --- Business Acumen Component ---
const BusinessAcumen = () => {
  return (
    <motion.section
      id="acumen"
      className="section bg-slate-900/50 rounded-3xl shadow-2xl border border-slate-700/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-teal-400"
          variants={fadeInUp}
        >
          Tech meets Strategy
        </motion.h2>
        <motion.p className="text-gray-400 max-w-3xl mx-auto" variants={fadeInUp}>
          My unique combination of an MSc in Computer Science and an MBA allows me to bridge the gap between technical implementation and business value.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <GlassCard className="border-fuchsia-500/30 text-center">
          <Lightbulb className="w-10 h-10 text-fuchsia-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Strategic IT Consulting</h3>
          <p className="text-gray-400 text-sm">
            I approach development projects with a focus on long-term business goals, ROI, and organizational efficiency, ensuring technology investments yield maximum strategic benefit.
          </p>
        </GlassCard>
        
        <GlassCard className="border-teal-500/30 text-center">
          <Target className="w-10 h-10 text-teal-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Full-Stack Execution</h3>
          <p className="text-gray-400 text-sm">
            Deep technical expertise in full-stack development (C#, React, SQL) guarantees robust, scalable, and high-performance solutions from concept to deployment.
          </p>
        </GlassCard>

        <GlassCard className="border-fuchsia-500/30 text-center">
          <Globe className="w-10 h-10 text-fuchsia-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Project Leadership</h3>
          <p className="text-gray-400 text-sm">
            Skilled in managing technical teams, optimizing development processes, and coordinating large-scale initiatives like ERP customization and data collection systems.
          </p>
        </GlassCard>
      </div>
    </motion.section>
  );
}

// --- Projects Component ---
const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="section projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-bold text-center mb-12 text-teal-400"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Technical Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projectsData.map((project, index) => (
          <motion.div key={index} 
            className="project-card flex flex-col justify-between p-6 rounded-xl bg-gray-900/50 border border-white/10 transition-all duration-300 shadow-lg cursor-pointer"
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="flex-grow">
              <div
                className="h-40 bg-cover bg-center rounded-lg mb-4 border border-teal-500/20"
                style={{
                  backgroundImage: `url('https://placehold.co/600x400/0d1117/2dd4bf?text=${project.title.replace(/\s/g, '+')}')`,
                }}
              />
              <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 text-xs font-medium bg-teal-500/20 text-teal-300 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};


// --- Contact Component ---
const Contact = () => {
  // Use dummy keys if environment variables are not available
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: false, message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({ submitting: true, success: false, error: false, message: "" });
    const isPlaceholder = SERVICE_ID.includes("YOUR") || TEMPLATE_ID.includes("YOUR") || PUBLIC_KEY.includes("YOUR");

    try {
      if (isPlaceholder) {
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        setFormStatus({
          submitting: false, success: true, error: false,
          message: "Message sent successfully! (Simulated - Add real EmailJS keys)",
        });
      } else {
        emailjs.init(PUBLIC_KEY);
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
        setFormStatus({ submitting: false, success: true, error: false, message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus({
        submitting: false, success: false, error: true,
        message: "Something went wrong. Please check console or your keys.",
      });
    }
  };

  return (
    <motion.section
      id="contact"
      className="section flex justify-center items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="w-full max-w-2xl border-fuchsia-500/30">
        <motion.div
          className="contact-content text-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 text-fuchsia-400"
            variants={fadeInUp}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-gray-400 mb-8 max-w-lg mx-auto"
            variants={fadeInUp}
          >
            Let's discuss a project or opportunity that requires both technical depth and business foresight.
          </motion.p>
          
          <motion.form 
            className="flex flex-col gap-4" 
            onSubmit={handleSubmit}
            variants={fadeInUp}
          >
            <motion.input
              type="text" name="name" placeholder="Your Name..." required
              className="p-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 transition"
              whileFocus={{ scale: 1.005 }} onChange={handleInputChange} value={formData.name}
            />
            <motion.input
              type="email" name="email" placeholder="Your Email..." required
              className="p-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 transition"
              whileFocus={{ scale: 1.005 }} onChange={handleInputChange} value={formData.email}
            />
            <motion.textarea
              name="message" placeholder="Your Message..." required rows="5"
              className="p-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 transition resize-y"
              whileFocus={{ scale: 1.005 }} onChange={handleInputChange} value={formData.message}
            />

            <motion.button
              className="px-6 py-3 bg-fuchsia-500 text-gray-900 font-bold rounded-xl hover:bg-fuchsia-400 transition duration-200 shadow-xl self-start mt-4"
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={formStatus.submitting}
            >
              {formStatus.submitting ? "Sending..." : "Send Secure Message"}
            </motion.button>

            {formStatus.message && (
              <motion.div
                className={`p-3 rounded-lg font-semibold text-sm mt-3 ${
                  formStatus.success ? "bg-green-700/50 text-green-200" : "bg-red-700/50 text-red-200"
                }`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {formStatus.message}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </GlassCard>
    </motion.section>
  );
};

// --- Main App Component ---
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const EMAILJS_PUBLIC_KEY = ""; // Placeholder

  useEffect(() => {
    // 1. Inject Tailwind CSS script if not present
    if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
        const script = document.createElement('script');
        script.src = "https://cdn.tailwindcss.com";
        script.async = true;
        document.head.appendChild(script);
    }
    
    // 2. Initialize EmailJS (for structure, but with a dummy key)
    if (typeof emailjs.init === 'function') {
        emailjs.init(EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY_HERE");
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      <CustomStyles />
      <div className="animated-grid"></div> {/* Animated Background */}
      <div className={`app ${isLoaded ? "loaded" : "opacity-0 transition-opacity duration-500"}`}>
        <Navbar />

        <Hero profile={profileData} />
        <BusinessAcumen /> {/* New Section */}
        <Projects />
        <Contact />

        <motion.footer
          className="text-center py-8 bg-gray-950 border-t border-gray-800 text-gray-500 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-slate-600">
            <span>React</span>
            <span>•</span>
            <span>TailwindCSS</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>
        </motion.footer>
      </div>
    </>
  );
}