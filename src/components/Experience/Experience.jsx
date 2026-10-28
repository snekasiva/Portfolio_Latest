import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const experiences = [
  {
    role: 'Frontend Developer',
    company: 'Zeal CRE Services',
    location: 'Chennai, India',
    period: '2023 — Present',
    type: 'Full-time',
    highlights: ['40% Load Speed Boost', '31 Custom Models', '50+ REST APIs'],
    description: [
      'Independently architected and delivered ZealSavvy — an enterprise commercial real estate platform for lease records, tenant billing, and date tracking.',
      'Designed 31 custom data models and integrated 50+ REST APIs handling multi-role RBAC access control and automated email notifications.',
      'Developed interactive ECharts dashboards for real-time lease financial analytics, revenue forecasting, and occupancy metrics.',
      'Optimized React component rendering cycles and modularized UI patterns to improve dashboard load times by over 40%.',
    ],
    skills: ['React.js', 'Python', 'Frappe Framework', 'REST API', 'ECharts', 'MySQL', 'JavaScript (ES6+)'],
  },
  {
    role: 'AI & Full-Stack Automation Engineer',
    company: 'Independent Engineering Projects',
    location: 'Chennai, India',
    period: '2024 — Present',
    type: 'Projects',
    highlights: ['99.9% Uptime', 'Claude AI Integration', 'Continuous Delivery'],
    description: [
      'Created Dev AI Study Buddy — an asynchronous Telegram bot leveraging Claude 3.5 API to score interview technical responses and generate custom study paths.',
      'Automated daily LeetCode challenge scheduling, user solution feedback, and reminder notifications via asynchronous Python scripts.',
      'Deployed production services with 99.9% uptime on Railway.app with continuous integration workflow.',
    ],
    skills: ['Python', 'Claude API', 'Telegram API', 'httpx', 'Railway.app', 'Git'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Professional Experience
        </motion.h2>
        <p className="section-subtitle">
          Proven 2+ years record of delivering high-impact frontend products, robust API integrations, and AI automation tools.
        </p>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role + exp.company}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.timelineNode}>
                <div className={styles.nodeInner} />
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <h4 className={styles.company}>
                      {exp.company} <span className={styles.dot}>•</span>{' '}
                      <span className={styles.location}>{exp.location}</span>
                    </h4>
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.period}>{exp.period}</span>
                    <span className={styles.badge}>{exp.type}</span>
                  </div>
                </div>

                <div className={styles.highlightsBar}>
                  {exp.highlights.map((hl, i) => (
                    <span key={i} className={styles.hlBadge}>
                      ⚡ {hl}
                    </span>
                  ))}
                </div>

                <ul className={styles.descriptionList}>
                  {exp.description.map((item, i) => (
                    <li key={i} className={styles.descriptionItem}>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className={styles.skills}>
                  {exp.skills.map((skill) => (
                    <span key={skill} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

