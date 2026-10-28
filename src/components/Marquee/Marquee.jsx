import styles from './Marquee.module.css';

const marqueeItems = [
  'REACT.JS DEVELOPER',
  'PYTHON ARCHITECT',
  'CLAUDE AI INTEGRATIONS',
  'ENTERPRISE PLATFORMS',
  'FRAPPE FRAMEWORK',
  'REST API DESIGN',
  'TAILWIND & MODERN SCSS',
  'AUTOMATION BOTS',
];

export default function Marquee() {
  return (
    <div className={styles.marq}>
      <div className={styles.marqIn}>
        {/* Render 3 copies for smooth endless looping */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className={styles.marqItem}>
            <span className={styles.marqText}>{item}</span>
            <span className={styles.marqDot}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
