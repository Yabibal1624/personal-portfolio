import { motion } from "framer-motion";

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

const projectsData = [
  {
    title: "Student Information Management System",
    description: "A comprehensive system for managing student records, enrollment, grades, and administrative tasks for educational institutions.",
    tech: ["ASP.NET", "C#", "SQL Server"],
    image: "https://placehold.co/600x400/1e293b/a5f3fc?text=SIS+Web+App"
  },
  {
    title: "Ecommerce Website Platform",
    description: "A full-featured online store with product listings, shopping cart, order management, and secure payment gateway integration.",
    tech: ["Laravel", "PHP", "MySQL", "TailwindCSS"],
    image: "https://placehold.co/600x400/1e293b/c084fc?text=E-commerce+Platform"
  },
  {
    title: "Educational Organization Mobile App",
    description: "Native mobile application for students and staff, providing access to schedules, announcements, assignments, and secure messaging.",
    tech: ["Android Java", "SQL Server", "Mobile Development"],
    image: "https://placehold.co/600x400/1e293b/fde047?text=Edu+Mobile+App"
  },
  {
    title: "Bulk SMS Application",
    description: "An Android application designed for efficient mass communication, allowing users to send bulk SMS messages to large contact groups.",
    tech: ["Android", "Java", "Mobile/API Integration"],
    image: "https://placehold.co/600x400/1e293b/fb7185?text=Bulk+SMS+Tool"
  },
  {
    title: "Learning Management System (LMS)",
    description: "A complete platform for course delivery, student tracking, assignments, and interactive learning modules.",
    tech: ["PHP", "MySQL", "HTML/CSS/JS"],
    image: "https://placehold.co/600x400/1e293b/67e8f9?text=LMS+System"
  },
  {
    title: "School Management System",
    description: "An administrative application covering payroll, staff management, inventory, and comprehensive reporting for school operations.",
    tech: ["C#", "ASP.NET", "SQL Server"],
    image: "https://placehold.co/600x400/1e293b/a7f3d0?text=School+Admin"
  },
  {
    title: "Bingo Game for Retail Shop",
    description: "A custom React application for in-shop promotions, featuring a real-time Bingo game integrated with a MySQL database.",
    tech: ["React", "JavaScript", "MySQL", "Node.js"],
    image: "https://placehold.co/600x400/1e293b/e879f9?text=Bingo+App"
  },
  {
    title: "Five-in-One Game Hub",
    description: "A collection of five different interactive games bundled into a single application, utilizing React for the frontend and MySQL for data/scores.",
    tech: ["React", "JavaScript", "MySQL", "Game Logic"],
    image: "https://placehold.co/600x400/1e293b/bef264?text=Game+Hub"
  },
  {
    title: "Exit Exam System with Moodle Customization",
    description: "Development and customization of a Moodle-based system tailored to manage and administer exit examinations with specialized features.",
    tech: ["Moodle Customization", "PHP", "MySQL", "LMS Admin"],
    image: "https://placehold.co/600x400/1e293b/fda4af?text=Moodle+Exam+System"
  },
];

const ProjectCard = ({ project }) => (
  <motion.div
    className="project-card"
    variants={fadeInUp}
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
  >
    <motion.div
      className="project-image"
      style={{
        backgroundImage: `url('${project.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    />
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="project-tech">
      {project.tech.map((tech, index) => (
        <span key={index}>{tech}</span>
      ))}
    </div>
  </motion.div>
);

export const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Key Projects
      </motion.h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.div>
    </motion.section>
  );
};