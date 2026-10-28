import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="section-container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.text}>
            Designed & Built by{' '}
            <span className={styles.name}>Sneka S</span>
          </p>
          <p className={styles.year}>&copy; {year}</p>
        </motion.div>
      </div>
    </footer>
  );
}
