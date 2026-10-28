import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CodeShowcase.module.css';

const codeSnippets = [
  {
    id: 'custom-hook',
    title: 'Custom API Caching Hook',
    category: 'React Architecture & Performance',
    description: 'Custom React hook for handling asynchronous REST API data fetching with memory caching, loading states, and automatic retry strategy.',
    code: `// useFetchWithCache.js - Production-grade React Hook
import { useState, useEffect, useRef } from 'react';

export function useFetchWithCache(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    let isMounted = true;
    if (cacheRef.current.has(url)) {
      setData(cacheRef.current.get(url));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(\`HTTP error! Status: \${res.status}\`);
        const json = await res.json();
        cacheRef.current.set(url, json);
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [url]);

  return { data, loading, error };
}`,
    highlights: [
      'In-memory Map cache preventing redundant network requests',
      'Mount guard cleanup to prevent React state update memory leaks',
      'Unified loading, error, and payload state abstraction'
    ]
  },
  {
    id: 'echarts-analytics',
    title: 'Financial Analytics Dashboard Engine',
    category: 'ECharts Integration',
    description: 'Dynamic ECharts configuration wrapper handling real-time financial lease analytics and revenue forecasting metrics in ZealSavvy.',
    code: `// FinancialChartEngine.jsx - Analytics Visualization
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export function FinancialChartEngine({ data, theme = 'dark' }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = echarts.init(chartRef.current, theme);

    const option = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: data.months, boundaryGap: false },
      yAxis: { type: 'value', axisLabel: { formatter: '$\${value}k' } },
      series: [
        {
          name: 'Forecasted Revenue',
          type: 'line',
          smooth: true,
          data: data.revenue,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(99, 102, 241, 0.5)' },
              { offset: 1, color: 'rgba(99, 102, 241, 0.0)' }
            ])
          }
        }
      ]
    };

    chartInstance.setOption(option);
    const handleResize = () => chartInstance.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, theme]);

  return <div ref={chartRef} style={{ width: '100%', height: '320px' }} />;
}`,
    highlights: [
      'Declarative ECharts instantiation & automatic window resize listeners',
      'Smooth vector gradients & multi-series data visualization',
      'Clean lifecycle cleanup disposing instances on unmount'
    ]
  },
  {
    id: 'claude-ai-bot',
    title: 'Claude AI Response Evaluator Pipeline',
    category: 'Python & AI Integration',
    description: 'Asynchronous Python pipeline for Dev AI Telegram Bot that sends candidate interview answers to Claude 3.5 Sonnet API for automated scoring.',
    code: `# evaluator.py - Async Claude API Prompt Evaluator
import httpx
import os

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

async def evaluate_interview_response(question: str, answer: str) -> dict:
    prompt = f"""
    You are a Senior Tech Interviewer. Evaluate this response:
    Question: {question}
    Candidate Answer: {answer}

    Provide JSON response:
    {{"score": 1-10, "strengths": [], "improvements": [], "feedback": ""}}
    """

    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    }
    
    payload = {
        "model": "claude-3-5-sonnet-20241022",
        "max_tokens": 1000,
        "messages": [{"role": "user", "content": prompt}]
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        res = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers=headers,
            json=payload
        )
        res.raise_for_status()
        return res.json()`,
    highlights: [
      'Strict JSON structural prompt engineering for predictable scoring',
      'Non-blocking async HTTP client using `httpx` for high concurrency',
      'Robust error handling and status assertion'
    ]
  }
];

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState('custom-hook');
  const activeSnippet = codeSnippets.find((s) => s.id === activeTab) || codeSnippets[0];

  return (
    <section id="architecture" className={styles.showcaseSection}>
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frontend Architecture & Code Cleanliness
        </motion.h2>
        <p className="section-subtitle">
          Demonstrating modular React state management, ECharts integrations, and production API design patterns.
        </p>

        <div className={styles.container}>
          <div className={styles.tabList}>
            {codeSnippets.map((snippet) => (
              <button
                key={snippet.id}
                className={`${styles.tabBtn} ${activeTab === snippet.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(snippet.id)}
              >
                <span className={styles.tabCategory}>{snippet.category}</span>
                <span className={styles.tabTitle}>{snippet.title}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={activeSnippet.id}
            className={styles.codeBox}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.codeHeader}>
              <div className={styles.windowControls}>
                <span className={styles.controlRed} />
                <span className={styles.controlYellow} />
                <span className={styles.controlGreen} />
              </div>
              <span className={styles.fileName}>{activeSnippet.title}</span>
            </div>

            <p className={styles.description}>{activeSnippet.description}</p>

            <pre className={styles.preCode}>
              <code>{activeSnippet.code}</code>
            </pre>

            <div className={styles.highlights}>
              <h4 className={styles.highlightsTitle}>Key Engineering Takeaways:</h4>
              <ul className={styles.highlightsList}>
                {activeSnippet.highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <span className={styles.checkIcon}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
