import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from 'react';

// --- Expertise Dashboard Component (Modified for better visual integration) ---
const DualExpertiseDashboard = ({ profile }) => {
    const { skills, education } = profile;

    // Separate skills into two thematic groups for the dual-tone dashboard
    const techSkills = skills.development.filter(s => s !== "Git" && s !== "REST APIs").slice(0, 5); // Take top 5 core development
    const systemSkills = skills.systems.slice(0, 5); // Take top 5 systems & data

    // Simplified Education presentation
    const latestEducation = education[0];
    const dualEducation = education[1];

    return (
        <motion.div 
            className="p-6 md:p-8 w-full font-['Inter'] text-white text-left bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-teal-600/50"
            style={{ transform: 'translateZ(30px)' }} // Lifted slightly for 3D effect
        >
            {/* Header */}
            <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400">
                Integrated Expertise Map
            </h3>

            {/* Dual Education Highlights */}
            <div className="flex flex-col space-y-4 mb-8">
                <div className="flex items-start space-x-4 p-3 bg-fuchsia-800/20 rounded-xl border border-fuchsia-600/50">
                    <span className="text-2xl pt-1 text-fuchsia-400">🧠</span>
                    <div>
                        <p className="text-sm font-medium uppercase text-fuchsia-300">Strategy & Management Focus</p>
                        <p className="font-semibold text-white">{dualEducation.title}</p>
                        <p className="text-xs italic text-gray-400">{dualEducation.institution}</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4 p-3 bg-teal-800/20 rounded-xl border border-teal-600/50">
                    <span className="text-2xl pt-1 text-teal-400">💻</span>
                    <div>
                        <p className="text-sm font-medium uppercase text-teal-300">Technical Mastery Focus</p>
                        <p className="font-semibold text-white">{latestEducation.title}</p>
                        <p className="text-xs italic text-gray-400">{latestEducation.institution}</p>
                    </div>
                </div>
            </div>


            {/* Dual Skill Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 1. Development Skills */}
                <div className="space-y-3 p-4 border-l-4 border-teal-500 bg-gray-800/50 rounded-lg">
                    <h4 className="text-md font-bold text-teal-400">
                        Modern Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {techSkills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 text-xs font-medium text-teal-100 bg-teal-600/70 rounded-full hover:bg-teal-500 transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 2. Systems & Data Skills */}
                <div className="space-y-3 p-4 border-l-4 border-fuchsia-500 bg-gray-800/50 rounded-lg">
                    <h4 className="text-md font-bold text-fuchsia-400">
                        Enterprise Systems & Data
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {systemSkills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 text-xs font-medium text-fuchsia-100 bg-fuchsia-600/70 rounded-full hover:bg-fuchsia-500 transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
        </motion.div>
    );
};
// --- End of Expertise Dashboard Component ---


// Profile Data (Modernized and Detailed)
const developerProfileData = {
    codename: "Yabibal Zelalem Mengist",
    role: "Senior Full Stack Software Developer & IT/Data Management Professional",
    summary: "I bridge the gap between complex IT infrastructure and strategic business needs. My expertise spans enterprise software development (C#, ASP.NET, React) and data management systems (DHIS2, SAP), underpinned by qualifications in both Computer Science and Business Administration.",
    education: [
        { title: "MSc in Computer Science", institution: "Kotebe University of Education", period: "2022 – 2025" },
        { title: "MBA (Master of Business Administration)", institution: "Gage University College", period: "2020 – 2022" },
        { title: "BSc in Computer Science", institution: "Debre Birhan University", period: "2014 – 2018" }
    ],
    skills: {
        development: ["C#", "Python", "Java", "ASP.NET", "React", "Node.js", "JavaScript/TypeScript", "SQL", "Git", "REST APIs"],
        systems: ["DHIS2", "SAP S/4HANA", "ERP Systems", "MS SQL Server", "MySQL", "SurveyCTO", "Data Quality Audits"],
    }
};


// Frame Motion Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", damping: 12, stiffness: 100 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Component
export const Hero = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize coordinates to -0.5 to 0.5
        const rotateScale = 0.5;
        const normalizedX = (mouseX / width - 0.5) * rotateScale;
        const normalizedY = (mouseY / height - 0.5) * rotateScale;

        x.set(normalizedX);
        y.set(normalizedY);
    };

    const handleMouseLeave = () => {
        // Subtle snap back animation
        x.set(0);
        y.set(0);
    };


  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-24 bg-gray-950 text-white font-['Inter'] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      
      // Setup Parallax/3D Tilt effect container
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {/* Large, soft radial gradients for mood */}
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl animate-blob-1"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob-2"></div>
      </div>
        {/* Animated Blobs for visual movement */}
        <style jsx="true">{`
          @keyframes blob1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes blob2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-40px, 30px) scale(0.95); }
            66% { transform: translate(50px, -10px) scale(1.1); }
          }
          .animate-blob-1 { animation: blob1 15s infinite; }
          .animate-blob-2 { animation: blob2 20s infinite reverse; }
        `}</style>
      
      {/* Main Content Container (with tilt) */}
      <motion.div
        className="hero-container z-10 max-w-7xl mx-auto px-4 md:px-8 lg:flex lg:items-center lg:justify-between space-y-16 lg:space-y-0"
        style={{
            perspective: 1000,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Left Content Column */}
        <motion.div
          className="lg:w-1/2 space-y-7 lg:pr-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="text-sm font-medium tracking-widest uppercase text-teal-300 bg-gray-800 px-4 py-1.5 rounded-full w-fit shadow-lg shadow-teal-500/20 hover:bg-gray-700 transition duration-300"
            variants={fadeInUp}
          >
            <span className="animate-pulse"> Enterprise Integration Specialist </span>
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold leading-tight text-white transition duration-300 cursor-default"
            variants={fadeInUp}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-500">Yabibal</span> <br className="hidden md:block" />
            <span className="text-gray-100">Zelalem Mengist</span>
          </motion.h1>
          
          <motion.h2 className="text-xl md:text-3xl font-light text-gray-300 border-l-4 border-fuchsia-500 pl-4 py-2" variants={fadeInUp}>
            {developerProfileData.role}
          </motion.h2>
          
          <motion.p className="text-gray-400 max-w-lg leading-relaxed text-base md:text-lg pt-2 italic" variants={fadeInUp}>
            {developerProfileData.summary}
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6" variants={staggerContainer}>
            <motion.a
              href="#projects"
              className="px-8 py-3 text-white font-bold rounded-full shadow-2xl bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 transition duration-300 transform hover:scale-[1.03] active:scale-95 border-2 border-teal-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 text-fuchsia-400 font-bold rounded-full border-2 border-fuchsia-600 bg-gray-800/70 hover:bg-fuchsia-900/50 transition duration-300 transform hover:scale-[1.03] active:scale-95 shadow-lg shadow-fuchsia-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request CV
            </motion.a>
          </motion.div>
          
        </motion.div>

        {/* Right Dual Expertise Dashboard Column (Stacked & Floating) */}
        <motion.div
          className="lg:w-1/2 relative flex justify-center lg:justify-end min-h-[450px]"
          variants={fadeInUp}
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* Main Dashboard Block - Centered and 3D lifted */}
          <div className="relative w-full max-w-lg">
            <DualExpertiseDashboard profile={developerProfileData} />
          </div>

          {/* Floating Card 1 - Technical Icon */}
          <motion.div
            className="absolute -top-10 left-1/4 md:-top-16 md:left-4 w-16 h-16 flex items-center justify-center bg-teal-500 rounded-full shadow-2xl shadow-teal-500/50 transform transition duration-500 ease-in-out cursor-pointer"
            animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: 'translateZ(50px)' }}
          >
            <span className="text-3xl">⚙️</span>
          </motion.div>

          {/* Floating Card 2 - Business/Data Icon */}
          <motion.div
            className="absolute -bottom-10 right-1/4 md:-bottom-16 md:right-4 w-16 h-16 flex items-center justify-center bg-fuchsia-500 rounded-full shadow-2xl shadow-fuchsia-500/50 transform transition duration-500 ease-in-out cursor-pointer"
            animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transform: 'translateZ(60px)' }}
          >
            <span className="text-3xl">📊</span>
          </motion.div>
          
        </motion.div>
      </motion.div>
      
      {/* Social Links Bar (moved to a more structured section below the main area) */}
       <motion.div 
            className="absolute bottom-0 w-full bg-gray-900/50 border-t border-gray-800 py-3 flex justify-center space-x-8 z-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
       >
            <motion.a 
                href="https://github.com" 
                target="_blank" 
                className="text-gray-400 hover:text-teal-400 transition duration-200 text-2xl"
                aria-label="GitHub"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.596-2.807 5.621-5.476 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.385 0-6.627-5.373-12-12-12z"/></svg>
            </motion.a>
            <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                className="text-gray-400 hover:text-teal-400 transition duration-200 text-2xl"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.529-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </motion.a>
            <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                className="text-gray-400 hover:text-teal-400 transition duration-200 text-2xl"
                aria-label="X / Twitter"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.797-1.574 2.162-2.722-.951.566-2.005.977-3.128 1.195-.897-.957-2.178-1.555-3.594-1.555-3.591 0-6.495 2.902-6.495 6.494 0 .509.058 1.002.164 1.474-5.405-.275-10.198-2.868-13.403-6.417-.563.974-.887 2.1-.887 3.313 0 2.251 1.14 4.249 2.871 5.421-.84-.027-1.623-.257-2.308-.635v.079c0 3.149 2.245 5.77 5.216 6.376-.547.149-1.127.234-1.716.234-.415 0-.825-.04-1.22-.116.825 2.573 3.203 4.45 6.035 4.492-2.222 1.748-5.008 2.37-8.07 2.37-.529 0-1.055-.031-1.572-.092 3.064 1.96 6.697 3.106 10.613 3.106 12.748 0 19.756-10.518 19.756-19.754 0-.3-.008-.598-.027-.893.849-.607 1.583-1.36 2.17-2.225z"/></svg>
            </motion.a>
            <motion.a 
                href="http://www.scitech.com.et" 
                target="_blank" 
                className="text-gray-400 hover:text-teal-400 transition duration-200 text-2xl"
                aria-label="Personal Website"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.071 21.905c-3.79-1.29-6.903-4.232-8.498-7.892l4.891-.978 3.607 8.87zm-1.036-11.905l-5.698-1.14c.269-.997.643-1.928 1.096-2.771l5.242 3.911zm11.968 1.14c-.269.997-.643 1.928-1.096 2.771l-5.242-3.911 5.698 1.14zm-.865-5.932l-5.056-2.247c.504-.576.953-1.18 1.341-1.78.016.599-.185 1.558-.871 2.946l4.586 1.081zm-9.332-1.22c-.389.6-.838 1.204-1.342 1.78l-5.056 2.246c.307-1.388.528-2.348-.112-2.946l6.51-1.08zm4.437 12.759l-3.328-8.193 4.271-1.01c.784-1.554 1.196-3.181 1.295-4.821 1.545 3.618 1.033 7.828-2.238 14.024zm-2.5-17.752c-.643 1.396-1.127 3.04-1.282 4.714l4.281 1.016 3.606-8.87c-2.484-.575-5.385-.054-6.605 3.14z"/></svg>
            </motion.a>
        </motion.div>
    </motion.section>
  );
};

export default Hero;