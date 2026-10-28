import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const filterCategories = [
  'All',
  'Frontend Core',
  'State & Libraries',
  'Backend & Databases',
  'AI & Automation',
  'Tools & Workflow'
];

const skillItems = [
  { name: 'React.js', category: 'Frontend Core', context: 'ZealSavvy & Portfolio' },
  { name: 'JavaScript (ES6+)', category: 'Frontend Core', context: 'Core Stack' },
  { name: 'TypeScript', category: 'Frontend Core', context: 'Type-Safe Modules' },
  { name: 'HTML5 & CSS3', category: 'Frontend Core', context: 'Semantic Web' },
  { name: 'JSX & Modular CSS', category: 'Frontend Core', context: 'Scoped Styling' },
  { name: 'Redux & Context API', category: 'State & Libraries', context: 'Global State Management' },
  { name: 'React Hooks (Custom)', category: 'State & Libraries', context: 'Reusable UI Logic' },
  { name: 'ECharts & Data Viz', category: 'State & Libraries', context: 'ZealSavvy Dashboards' },
  { name: 'Material UI', category: 'State & Libraries', context: 'Design Systems' },
  { name: 'Tailwind CSS', category: 'State & Libraries', context: 'Responsive Layouts' },
  { name: 'Python', category: 'Backend & Databases', context: 'Dev AI Bot & Scripting' },
  { name: 'Frappe Framework', category: 'Backend & Databases', context: 'ZealSavvy Backend' },
  { name: 'REST APIs', category: 'Backend & Databases', context: '50+ Integrated Endpoints' },
  { name: 'MySQL', category: 'Backend & Databases', context: 'Relational Schema' },
  { name: 'Claude API', category: 'AI & Automation', context: 'Dev AI Bot Prompting' },
  { name: 'Telegram Bot API', category: 'AI & Automation', context: 'Dev AI Bot Engine' },
  { name: 'Async Scripting', category: 'AI & Automation', context: 'Python Automation' },
  { name: 'Git & GitHub', category: 'Tools & Workflow', context: 'Version Control' },
  { name: 'Postman', category: 'Tools & Workflow', context: 'API Testing' },
  { name: 'Railway.app', category: 'Tools & Workflow', context: 'Cloud Hosting' },
  { name: 'VS Code & Oxlint', category: 'Tools & Workflow', context: 'Linting & IDE' }
];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredSkills = activeFilter === 'All'
    ? skillItems
    : skillItems.filter(s => s.category === activeFilter);

  return (
    <section id="skills" className={styles.skills}>
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Stack & Competencies
        </motion.h2>
        <p className="section-subtitle">
          Comprehensive toolset honed over 2+ years building enterprise web platforms and automation services.
        </p>

        <div className={styles.filterBar}>
          {filterCategories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilter : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          className={styles.skillsGrid}
          layout
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={styles.skillCard}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.categoryName}>{skill.category}</span>
              </div>
              <h3 className={styles.skillName}>{skill.name}</h3>
              <span className={styles.contextTag}>{skill.context}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

