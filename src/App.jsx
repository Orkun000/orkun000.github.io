import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';
import ParticleBackground from './ParticleBackground';
import './index.css';

const projects = [
  {
    id: 1,
    title: 'sql-optimizer',
    description: 'A browser-based SQL linter and optimization engine powered by Rust and Wasm that parses queries into ASTs, runs schema-aware rules, and visualizes execution plans.',
    repoLink: 'https://github.com/Orkun000/sql-optimizer',
    liveLink: 'https://orkun000.github.io/sql-optimizer/'
  },
  {
    id: 2,
    title: 'nlpEcommerce',
    description: 'A hybrid search system for e-commerce databases leveraging vector embeddings and filters to process natural language queries.',
    repoLink: 'https://github.com/Orkun000/nlpEcommerce'
  },
  {
    id: 3,
    title: 'e-commerce-database',
    description: 'A normalized e-commerce database schema and comprehensive ER diagram with robust SQL DDL scripts for complex workflow modeling.',
    repoLink: 'https://github.com/Orkun000/e-commerce-database'
  }
];

// Custom hook to track mouse position for the glow effect
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const mousePosition = useMousePosition();

  // Calculate mouse position relative to the card for the glow effect
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  }, [mousePosition]);

  return (
    <motion.div
      className="project-card"
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-links">
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <FiGithub size={16} /> Repository
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
              <FiExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.15), transparent 40%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <ParticleBackground />
      <div ref={glowRef} className="global-glow" />
      <div className="container">
        <motion.header
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="greeting">Hello, I'm</span>
          <h1 className="name">Orkun Uyanık</h1>
          <h2 className="title">software engineer</h2>
        </motion.header>

        <motion.section
          className="about-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="about-text">
            I am a software developer passionate about building scalable back-end systems and intuitive web applications.
            I enjoy solving complex problems, working with databases, and optimizing performance. I'm always eager to learn
            new technologies and improve my engineering skills.
          </p>
        </motion.section>

        <motion.section
          className="projects-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="social-links">
            <a href="mailto:orkunuyanik0@gmail.com" className="social-link mail-link">
              orkunuyanik0@gmail.com
            </a>
            <div className="footer-icons">
              <a href="https://www.linkedin.com/in/orkun-uyanik/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiLinkedin size={20} /> LinkedIn
              </a>
              <a href="https://github.com/Orkun000" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiGithub size={20} /> GitHub
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
}

export default App;
