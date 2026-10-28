import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

const projects = [
  {
    id: 'zealsavvy',
    title: 'ZealSavvy — Commercial Real Estate SaaS',
    category: 'Enterprise SaaS Platform',
    summary:
      'Independently architected end-to-end commercial lease abstraction and management web application handling multi-role access, tenant billing, and date tracking.',
    problem:
      'Commercial real estate firms relied on manual spreadsheets leading to missed lease renewal deadlines, inaccurate financial reporting, and slow document processing. They needed a single, automated, highly reliable SaaS dashboard.',
    architecture: [
      {
        title: 'Frontend Architecture',
        desc: 'Designed modular React UI component trees integrated with ECharts for interactive financial revenue forecasting, lease occupancy metrics, and critical date alerts.',
      },
      {
        title: 'Data Modeling & APIs',
        desc: 'Built 31 custom data models and connected 50+ RESTful APIs with multi-role access control (Admin, Portfolio Manager, Analyst).',
      },
      {
        title: 'Performance Tuning',
        desc: 'Reduced main bundle asset sizes and optimized React re-render cycles, achieving a 40%+ increase in initial dashboard load speed.',
      },
      {
        title: 'Workflows & Notifications',
        desc: 'Engineered automated background cron jobs for date tracking and instant email alerts for expiring lease terms.',
      },
    ],
    highlights: [
      { val: '31', lbl: 'Custom Data Models' },
      { val: '50+', lbl: 'REST APIs Integrated' },
      { val: '40%', lbl: 'Load Time Reduction' },
      { val: '24/7', lbl: 'Automated Alerting' },
    ],
    tags: ['React.js', 'Python', 'Frappe Framework', 'ECharts', 'MySQL', 'REST API', 'JavaScript (ES6+)'],
    live: null,
    github: null,
    isProprietary: true,
  },
  {
    id: 'dev-ai-bot',
    title: 'Dev AI — Interactive Telegram Study Assistant',
    category: 'AI Assistant & Automation',
    summary:
      'An asynchronous Telegram chatbot with 10+ active commands that leverages Claude AI to score technical interview answers, deliver daily LeetCode challenges, and track learning progress.',
    problem:
      'Software engineers preparing for interviews lack instant, personalized feedback on coding solutions and standard concepts when studying alone. Dev AI provides an instant, AI-driven feedback loop right inside Telegram.',
    architecture: [
      {
        title: 'Claude API Integration',
        desc: 'Prompt-engineered Claude API to analyze technical response accuracy, score candidate answers out of 10, and provide targeted study recommendations.',
      },
      {
        title: 'Asynchronous Pipeline',
        desc: 'Built high-concurrency Python engine using `httpx` and `python-telegram-bot` for instant response times and low memory consumption.',
      },
      {
        title: 'Daily Scheduling & Automation',
        desc: 'Implemented continuous background schedulers sending daily LeetCode challenge prompts, user streak tracking, and study reminders.',
      },
      {
        title: 'Deployment & Uptime',
        desc: 'Deployed 24/7 on Railway.app container environment with continuous delivery and zero-downtime restarts.',
      },
    ],
    highlights: [
      { val: '10+', lbl: 'Bot Commands' },
      { val: '99.9%', lbl: 'Service Uptime' },
      { val: 'Instant', lbl: 'Claude AI Evaluation' },
      { val: 'Daily', lbl: 'Automated Challenges' },
    ],
    tags: ['Python', 'Claude API', 'Telegram Bot API', 'httpx', 'Railway.app', 'Git'],
    live: null,
    github: 'https://github.com/snekasiva',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className={styles.projects}>
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects & Case Studies
        </motion.h2>
        <p className="section-subtitle">
          Real-world production applications highlighting full-stack engineering, performance optimization, and AI integration.
        </p>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.35, ease: 'easeOut' },
              }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.categoryTag}>{project.category}</span>
                <span className={styles.impactBadge}>Production Grade</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.summary}</p>

                <div className={styles.metricsSummary}>
                  {project.highlights.slice(0, 3).map((h, idx) => (
                    <div key={idx} className={styles.miniMetric}>
                      <span className={styles.miniVal}>{h.val}</span>
                      <span className={styles.miniLbl}>{h.lbl}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <motion.button
                    className={styles.caseStudyBtn}
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Read Case Study
                  </motion.button>

                  <div className={styles.externalLinks}>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        title="Live Demo"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        title="GitHub Repository"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

