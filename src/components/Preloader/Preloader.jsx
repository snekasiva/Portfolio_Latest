import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className={styles.preloader}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.scanGrid} />

          <motion.div
            className={styles.scanLine}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />

          <div className={styles.logoStage}>
            <motion.h1
              className={styles.brandTitle}
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SNEKA S
            </motion.h1>

            <motion.div
              className={styles.laserLine}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            />
          </div>

          <div className={styles.metaRow}>
            <motion.span
              className={styles.copyText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Frontend & AI Engineer
            </motion.span>

            <motion.span
              className={styles.indexText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              EST. 2026
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
