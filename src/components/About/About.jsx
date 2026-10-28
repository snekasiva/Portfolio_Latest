import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '30+', label: 'Features Shipped' },
  { value: '2', label: 'Companies' },
  { value: '20+', label: 'Problems Solved' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className={styles.about}>
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div ref={ref} className={styles.content}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.imageContainer}>
              <div className={styles.placeholder}>
                <span className={styles.initials}>SS</span>
              </div>
            </div>
            <div className={styles.glowBorder} />
          </motion.div>

          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I'm a passionate Frontend Developer based in Chennai, India, with 2+ years of
              experience building production-grade web applications. I specialize in React.js
              and Python, with a strong focus on creating clean, performant, and user-friendly
              interfaces.
            </motion.p>
            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Currently at <span className={styles.highlight}>Zeal CRE Services</span>, I've
              independently architected <span className={styles.highlight}>ZealSavvy</span> — an
              enterprise commercial real estate platform handling lease records, tenant management,
              and critical date tracking for real companies.
            </motion.p>
            <motion.p
              className={styles.bio}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I'm deeply curious about AI and Machine Learning, actively building tools with Claude
              API and exploring LangChain. When I'm not coding, I'm solving DSA problems on
              LeetCode and preparing for my next big career move.
            </motion.p>
          </motion.div>
        </div>

        <div className={styles.stats}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.statItem}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
