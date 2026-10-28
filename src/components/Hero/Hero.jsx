import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import styles from './Hero.module.css';

function FluidOrb() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    const darkColors = [
      { r: 99, g: 102, b: 241 },   // indigo
      { r: 139, g: 92, b: 246 },   // purple
      { r: 236, g: 72, b: 153 },   // pink
      { r: 6, g: 182, b: 212 },    // cyan
      { r: 168, g: 85, b: 247 },   // violet
    ];

    const lightColors = [
      { r: 129, g: 140, b: 248 },  // soft indigo
      { r: 192, g: 132, b: 252 },  // soft purple
      { r: 244, g: 114, b: 182 },  // soft pink
      { r: 56, g: 189, b: 248 },   // soft cyan
      { r: 167, g: 139, b: 250 },  // soft violet
    ];

    class Orb {
      constructor(x, y, baseRadius, colorIndex) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.baseRadius = baseRadius;
        this.colorIndex = colorIndex;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.002 + Math.random() * 0.005;
        this.orbitRadius = 100 + Math.random() * 180;
        this.phaseX = Math.random() * Math.PI * 2;
        this.phaseY = Math.random() * Math.PI * 2;
      }

      update(mouseX, mouseY) {
        this.angle += this.speed;

        const floatX = Math.cos(this.angle + this.phaseX) * this.orbitRadius;
        const floatY = Math.sin(this.angle * 0.7 + this.phaseY) * this.orbitRadius * 0.6;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 450;

        let pushX = 0;
        let pushY = 0;
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 100;
          pushX = (dx / dist) * force;
          pushY = (dy / dist) * force;
        }

        this.x += (this.baseX + floatX + pushX - this.x) * 0.035;
        this.y += (this.baseY + floatY + pushY - this.y) * 0.035;
      }

      draw(ctx, time, isLight) {
        const colors = isLight ? lightColors : darkColors;
        const color = colors[this.colorIndex % colors.length];
        const pulse = Math.sin(time * 0.015 + this.colorIndex * 1.5) * 0.25 + 0.75;
        const radius = this.baseRadius * pulse;

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);

        if (isLight) {
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.25)`);
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.08)`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.55)`);
          gradient.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    let time = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const orbs = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const dist = 120 + Math.random() * 150;
      orbs.push(new Orb(
        centerX + Math.cos(angle) * dist,
        centerY + Math.sin(angle) * dist,
        140 + Math.random() * 120,
        i
      ));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

      ctx.globalCompositeOperation = isLight ? 'source-over' : 'screen';

      orbs.forEach(orb => {
        orb.update(smoothMouseRef.current.x, smoothMouseRef.current.y);
        orb.draw(ctx, time, isLight);
      });

      ctx.globalCompositeOperation = 'source-over';

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.fluidCanvas} />;
}

const nameLetters = 'Sneka S'.split('');

const heroStats = [
  { value: '2+ Yrs', label: 'Frontend Exp' },
  { value: '50+', label: 'REST APIs' },
  { value: '40%', label: 'Perf Optimized' },
  { value: '31', label: 'Custom Models' }
];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouse = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.1);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.1);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className={styles.hero}>
      <FluidOrb />

      <motion.div
        className={styles.cursorGlow}
        style={{ x, y }}
      />

      <div className={styles.content}>
        <motion.div
          className={styles.statusBadge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.statusDot} />
          Available for Frontend Developer Opportunities
        </motion.div>

        <motion.p
          className={styles.greeting}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          Hello, world! I'm
        </motion.p>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              className={letter === ' ' ? styles.space : ''}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.35 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className={styles.typewriter}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <span className={styles.typePrefix}>Specializing in </span>
          <TypeAnimation
            sequence={[
              'React.js & Scalable Web Apps',
              2200,
              'Enterprise SaaS Frontends',
              2200,
              'Python & AI Integrations',
              2200,
              'High-Performance UI/UX Architectures',
              2200,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className={styles.typewriterText}
          />
        </motion.div>

        <motion.div
          className={styles.heroStatsBar}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          {heroStats.map((stat, idx) => (
            <div key={idx} className={styles.heroStatItem}>
              <span className={styles.heroStatVal}>{stat.value}</span>
              <span className={styles.heroStatLbl}>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
        >
          <Link to="projects" smooth duration={500} offset={-70}>
            <motion.button
              className={styles.primaryBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Case Studies
            </motion.button>
          </Link>
          <a href="/resume.pdf" download className={styles.resumeLink}>
            <motion.button
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </motion.button>
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        <div className={styles.mouse}>
          <div className={styles.mouseWheel} />
        </div>
      </motion.div>
    </section>
  );
}

