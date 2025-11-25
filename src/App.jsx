import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";

// ==========================================================
// 1. UTILITY DATA AND ANIMATION VARIANTS
// ==========================================================

// Global Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
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
  image: "./assets/user.png",
  skills: {
    development: [
      "C#",
      "ASP.NET",
      "React",
      "JavaScript",
      "Python",
      "Java",
      "Node.js",
      "PHP",
    ],
    systems: [
      "SQL Server",
      "MySQL",
      "Oracle",
      "SurveyCTO",
      "REST APIs",
      "Git",
      "System Admin",
    ],
  },
  education: [
    {
      degree: "MSc, Computer Science",
      institution: "Kotebe University of Education",
      year: "2025",
    },
    {
      degree: "MBA, Business Administration",
      institution: "Gage University College",
      year: "2022",
    },
    {
      degree: "BSc, Computer Science",
      institution: "Debre Birhan University",
      year: "2018",
    },
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/yabibal-zelalem-520989225/",
    github: "https://github.com/Yabibal1624",
    website: "http://www.scitech.com.et",
  },
};

// Projects Data
const projectsData = [
  {
    title: "Student Information Management System",
    description:
      "A comprehensive system for managing student records, enrollment, grades, and administrative tasks for educational institutions.",
    tech: ["ASP.NET", "C#", "SQL Server"],
    image: "https://placehold.co/600x400/1e293b/a5f3fc?text=SIS+Web+App",
  },
  {
    title: "Ecommerce Website Platform",
    description:
      "A full-featured online store with product listings, shopping cart, order management, and secure payment gateway integration.",
    tech: ["Laravel", "PHP", "MySQL", "TailwindCSS"],
    image:
      "https://placehold.co/600x400/1e293b/c084fc?text=E-commerce+Platform",
  },
  {
    title: "Educational Organization Mobile App",
    description:
      "Native mobile application for students and staff, providing access to schedules, announcements, assignments, and secure messaging.",
    tech: ["Android Java", "SQL Server", "Mobile Development"],
    image: "https://placehold.co/600x400/1e293b/fde047?text=Edu+Mobile+App",
  },
  {
    title: "Bulk SMS Application",
    description:
      "An Android application designed for efficient mass communication, allowing users to send bulk SMS messages to large contact groups.",
    tech: ["Android", "Java", "Mobile/API Integration"],
    image: "https://placehold.co/600x400/1e293b/fb7185?text=Bulk+SMS+Tool",
  },
  {
    title: "Learning Management System (LMS)",
    description:
      "A complete platform for course delivery, student tracking, assignments, and interactive learning modules.",
    tech: ["PHP", "MySQL", "HTML/CSS/JS"],
    image: "https://placehold.co/600x400/1e293b/67e8f9?text=LMS+System",
  },
  {
    title: "School Management System",
    description:
      "An administrative application covering payroll, staff management, inventory, and comprehensive reporting for school operations.",
    tech: ["C#", "ASP.NET", "SQL Server"],
    image: "https://placehold.co/600x400/1e293b/a7f3d0?text=School+Admin",
  },
  {
    title: "Bingo Game for Retail Shop",
    description:
      "A custom React application for in-shop promotions, featuring a real-time Bingo game integrated with a MySQL database.",
    tech: ["React", "JavaScript", "MySQL", "Node.js"],
    image: "https://placehold.co/600x400/1e293b/e879f9?text=Bingo+App",
  },
  {
    title: "Five-in-One Game Hub",
    description:
      "A collection of five different interactive games bundled into a single application, utilizing React for the frontend and MySQL for data/scores.",
    tech: ["React", "JavaScript", "MySQL", "Game Logic"],
    image: "https://placehold.co/600x400/1e293b/bef264?text=Game+Hub",
  },
  {
    title: "Exit Exam System with Moodle Customization",
    description:
      "Development and customization of a Moodle-based system tailored to manage and administer exit examinations with specialized features.",
    tech: ["Moodle Customization", "PHP", "MySQL", "LMS Admin"],
    image: "https://placehold.co/600x400/1e293b/fda4af?text=Moodle+Exam+System",
  },
];

// ==========================================================
// 2. NAV BAR COMPONENT
// ==========================================================

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md shadow-2xl py-4 px-6 md:px-16"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-fuchsia-400 mr-2 flex items-center justify-center text-white font-bold">
            YZ
          </div>
          <motion.a
            href="#home"
            className="logo text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400 cursor-pointer"
          >
            Yabibal Zelalem.
          </motion.a>
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul
          className="hidden md:flex space-x-8 text-lg"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {["Home", "Projects", "Contact"].map((item, index) => (
            <motion.li key={index} variants={fadeInUp}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-teal-400 transition duration-300 font-medium relative group"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden absolute top-full left-0 w-full bg-gray-900 shadow-xl overflow-hidden"
        initial={false}
        animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col p-4 space-y-2">
          {["Home", "Projects", "Contact"].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsOpen(false)}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-300 hover:text-teal-400 transition duration-200 font-medium text-lg border-b border-gray-800 last:border-b-0"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

// ==========================================================
// 3. HERO COMPONENT
// ==========================================================

// Sub-component for expertise visualization
const DualExpertiseDashboard = ({ profile }) => {
  const { skills, education } = profile;

  // Separate skills into two thematic groups
  const techSkills = skills.development
    .filter((s) => s !== "Git" && s !== "REST APIs")
    .slice(0, 5);
  const systemSkills = skills.systems.slice(0, 5);

  // Simplified Education presentation
  const latestEducation = education[0];
  const dualEducation = education[1];

  return (
    <motion.div
      className="p-6 md:p-8 w-full text-white text-left bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-teal-600/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {/* Header */}
      <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-400">
        Integrated Expertise Map
      </h3>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Column 1: Core Development */}
        <div className="flex-1 space-y-4">
          <h4 className="text-lg font-semibold text-teal-300 border-b border-teal-700/50 pb-2">
            Core Development Focus
          </h4>
          <div className="flex flex-wrap gap-2">
            {techSkills.map((skill, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-teal-800/50 text-teal-200 text-sm font-medium rounded-full shadow-md"
                whileHover={{ scale: 1.1, backgroundColor: "#0D9488" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <h4 className="text-lg font-semibold pt-4 text-fuchsia-300 border-b border-fuchsia-700/50 pb-2">
            Advanced Education
          </h4>
          <p className="text-gray-300 text-base">
            <span className="font-bold">{latestEducation.degree}</span>,{" "}
            {latestEducation.institution} ({latestEducation.year})
          </p>
          <p className="text-gray-400 text-sm italic">
            The intersection of technical depth and strategic business knowledge
            (MBA, {dualEducation.year}).
          </p>
        </div>

        {/* Divider for aesthetic separation */}
        <div className="w-px bg-gradient-to-b from-teal-500/0 via-fuchsia-500/50 to-teal-500/0 hidden lg:block"></div>

        {/* Column 2: Systems & Data Integration */}
        <div className="flex-1 space-y-4">
          <h4 className="text-lg font-semibold text-fuchsia-300 border-b border-fuchsia-700/50 pb-2">
            Systems & Data Integration
          </h4>
          <div className="flex flex-wrap gap-2">
            {systemSkills.map((skill, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-fuchsia-800/50 text-fuchsia-200 text-sm font-medium rounded-full shadow-md"
                whileHover={{ scale: 1.1, backgroundColor: "#A21CAF" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
          <h4 className="text-lg font-semibold pt-4 text-teal-300 border-b border-teal-700/50 pb-2">
            Key Competencies
          </h4>
          <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
            <li className="text-sm">Full-Stack Architecture</li>
            <li className="text-sm">IT Governance & Audits</li>
            <li className="text-sm">Process Optimization</li>
            <li className="text-sm">System Administration</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// Main Hero Component
const Hero = ({ profile }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Creates the subtle 3D hover effect
  const rotateX = useSpring(useTransform(y, [-150, 150], [30, -30]), {
    stiffness: 400,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-30, 30]), {
    stiffness: 400,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position relative to the center of the container
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    x.set(0);
    y.set(0);
  };

  // Social Icon components (Inline SVG)
  const LinkedInIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.565-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
  const GithubIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.742.083-.727.083-.727 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.242 2.874.118 3.176.766.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.796.574 4.774-1.589 8.201-6.088 8.201-11.385 0-6.627-5.373-12-12-12z" />
    </svg>
  );
  const WebsiteIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.449 16.591c-.81.658-1.895.967-3.048.967-2.622 0-4.04-2.193-4.148-4.706h6.817c-.015.42-.09.773-.209 1.11-.112.336-.28.67-.506.985-.221.32-.497.63-.837.904-.326.262-.68.498-1.07.69zm-1.127 1.821c-1.392 1.393-3.238 2.25-5.322 2.25-3.321 0-5.83-2.001-5.918-4.57h11.236c-.033.456-.12.875-.25 1.258-.13.383-.31.758-.553 1.109-.234.336-.51.646-.838.924-.316.268-.646.495-.995.698zm-11.722-11.666c-.057.481-.086.994-.086 1.545 0 2.29 1.298 3.791 3.518 4.095v-6.629c-1.206.26-2.072.766-2.632 1.246zm11.722-1.785c.13.383.217.8.25 1.258h-11.236c.088-2.569 2.597-4.57 5.918-4.57 2.084 0 3.93.857 5.322 2.25zm.086-2.247c-2.368-1.571-4.996-2.476-8.224-2.476-2.015 0-3.839.467-5.373 1.282 1.018-.707 2.378-1.282 3.864-1.282 2.764 0 5.439 1.409 5.861 2.476z" />
    </svg>
  );

  return (
    <section
      id="home"
      className="min-h-screen pt-24 md:pt-32 flex items-center justify-center bg-gray-950 text-white overflow-hidden relative"
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-teal-900 to-gray-950"></div>

      <div
        className="container mx-auto px-6 max-w-7xl relative z-10"
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column: Text & Socials */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <motion.p
              className="text-xl font-medium text-teal-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {profile.name}
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-4xl font-light text-fuchsia-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {profile.title}
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {profile.bio}
            </motion.p>

            <motion.div
              className="flex justify-center lg:justify-start space-x-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Social Icons */}
              <motion.a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition duration-200 text-2xl"
                aria-label="LinkedIn Profile"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedInIcon />
              </motion.a>
              <motion.a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fuchsia-400 transition duration-200 text-2xl"
                aria-label="GitHub Profile"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <GithubIcon />
              </motion.a>
              <motion.a
                href={profile.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition duration-200 text-2xl"
                aria-label="Personal Website"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <WebsiteIcon />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Expertise Dashboard */}
          <motion.div
            className="w-full lg:w-1/2 p-4 pt-12 lg:pt-0"
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <DualExpertiseDashboard profile={profile} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================
// 4. PROJECTS COMPONENT
// ==========================================================

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-teal-500/30 transition duration-300 border border-gray-700 hover:border-teal-500"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
  >
    <div
      className="h-48 bg-cover bg-center"
      style={{
        backgroundImage: `url('${project.image}')`,
      }}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 text-teal-400">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 min-h-[60px]">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 pt-2">
        {project.tech.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-3 py-1 text-xs font-semibold rounded-full bg-fuchsia-900/50 text-fuchsia-300 border border-fuchsia-700/50"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-16 bg-gray-950 text-white"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        My Key Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

// ==========================================================
// 5. CONTACT COMPONENT
// ==========================================================

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: "Message sent successfully! I will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission Error:", error);
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: "Failed to send message. Please try again later.",
      });
    }
  };

  const EmailIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.902l-2.618 1.621a2.25 2.25 0 00-.742.827l-.774 1.355a1.275 1.275 0 01-1.29 2.05h-.342a1.275 1.275 0 01-1.29-2.05l-.774-1.355a2.25 2.25 0 00-.742-.827l-2.62-1.621A2.25 2.25 0 014.5 6.993V6.75"
      />
    </svg>
  );
  const PhoneIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.181.448l-.895 1.257a1.125 1.125 0 01-1.782.111l-3.975-3.975a1.125 1.125 0 01.111-1.782l1.257-.895c.393-.279.558-.741.448-1.18l-1.106-4.423a1.275 1.275 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
  const LocationIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-6 12-7.5 12S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-16 bg-gray-900 text-white"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-fuchsia-200"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </motion.h2>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Info */}
        <motion.div
          className="w-full lg:w-1/3 space-y-8 p-6 bg-gray-800 rounded-xl shadow-lg border border-fuchsia-700/50"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Email */}
          <div className="flex items-center space-x-4">
            <EmailIcon className="w-6 h-6 text-fuchsia-400" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium text-teal-300 break-words">
                yabibal25@gmail.com
              </p>
            </div>
          </div>
          {/* Phone */}
          <div className="flex items-center space-x-4">
            <PhoneIcon className="w-6 h-6 text-fuchsia-400" />
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="font-medium text-teal-300">+251 911 949 215</p>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center space-x-4">
            <LocationIcon className="w-6 h-6 text-fuchsia-400" />
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="font-medium text-teal-300">Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="w-full lg:w-2/3"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name..."
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition duration-200"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email..."
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition duration-200"
              value={formData.email}
              onChange={handleInputChange}
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="6"
              required
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition duration-200 resize-none"
              value={formData.message}
              onChange={handleInputChange}
            />

            <motion.button
              className="w-full p-4 font-bold text-lg rounded-lg shadow-lg transition duration-300 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={formStatus.submitting}
            >
              {formStatus.submitting ? "Sending..." : "Send Message"}
            </motion.button>

            {formStatus.message && (
              <motion.div
                className={`p-4 rounded-lg font-semibold text-center mt-4 ${
                  formStatus.success
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500"
                    : "bg-red-500/20 text-red-300 border border-red-500"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formStatus.message}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================================
// 6. MAIN APP COMPONENT
// ==========================================================

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-950 ${isLoaded ? "loaded" : ""}`}>
      <Navbar />
      <Hero profile={profileData} />
      <Projects />
      <Contact />
      <motion.footer
        className="text-center py-8 bg-gray-950 border-t border-gray-800 text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Yabibal Zelalem. All rights reserved.
        </p>
        <p className="text-xs pt-1 text-gray-600">
          Built with React, Tailwind CSS, & Framer Motion.
        </p>
      </motion.footer>
    </div>
  );
}

export default App;