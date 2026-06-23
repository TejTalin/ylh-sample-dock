'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell';
import WordReveal from '../components/WordReveal';
import Ticker from '../components/Ticker';
import Magnetic from '../components/Magnetic';
import { fadeUp, staggerContainer, staggerItem, VIEW } from '../lib/motion';
import { OFFER_CARDS, LAW_AREAS } from '../lib/content';

export default function HomePage() {
  return (
    <PageShell>
      {/* DASHBOARD HERO — bordered panel module, not centered */}
      <motion.section
        className="dash-hero-panel glass-card"
        variants={staggerContainer(0.1, 0.05)} initial="hidden" animate="visible"
      >
        <div className="dash-hero-grid">
          <div className="dash-hero-main">
            <motion.p variants={fadeUp} className="eyebrow">India&apos;s Legal Student Community</motion.p>
            <WordReveal text="Young Legal House" as="h1" className="display dash-title" />
            <motion.p variants={fadeUp} className="dash-lede">
              A community bridging the gap between legal theory and execution. We connect aspiring legal professionals with knowledge, competitions, events, and a network that takes law seriously.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Magnetic strength={0.4}><Link href="/join" className="pill pill-solid">Join the Community</Link></Magnetic>
              <Magnetic strength={0.4}><Link href="/blogs" className="pill pill-ghost">Read Legal Insights</Link></Magnetic>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="dash-hero-stat-stack">
            <div className="dash-stat-box">
              <span className="dash-stat-num">10+</span>
              <span className="dash-stat-label">Practice Areas</span>
            </div>
            <div className="dash-stat-box">
              <span className="dash-stat-num">2026</span>
              <span className="dash-stat-label">Lex Noctis Live</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} style={{ margin: '20px 0 28px' }}>
        <Ticker text="🔴 FLAGSHIP EVENT — LEX NOCTIS · CRIMINAL LAW TRIVIA · 15 JUNE 2026 · REGISTRATIONS NOW OPEN · CLICK TO REGISTER" />
      </motion.div>

      {/* DASHBOARD PANEL GRID — asymmetric module sizes, bordered cards */}
      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} className="dash-panel-grid">
        {OFFER_CARDS.map((item, i) => (
          <motion.div
            key={item.title}
            variants={staggerItem}
            initial="hidden" whileInView="visible" viewport={VIEW}
            whileHover={{ y: -4 }}
            className={`glass-card dash-panel ${i === 0 ? 'dash-panel-wide' : ''}`}
          >
            <div className="dash-panel-head">
              <i className={`fas ${item.icon}`} />
              <span className="dash-panel-tag">Module 0{i + 1}</span>
            </div>
            <h3 className="display">{item.title}</h3>
            <p>{item.text}</p>
          </motion.div>
        ))}

        <motion.div variants={staggerItem} initial="hidden" whileInView="visible" viewport={VIEW} className="glass-card dash-panel dash-panel-tags">
          <div className="dash-panel-head">
            <i className="fas fa-tags" />
            <span className="dash-panel-tag">Coverage</span>
          </div>
          <h3 className="display">Legal Insights</h3>
          <div className="dash-tag-grid">
            {LAW_AREAS.map(area => (
              <Magnetic key={area} strength={0.3}><Link href="/blogs" className="dash-tag-chip">{area}</Link></Magnetic>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* CTA — full-width panel bar */}
      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} className="glass-card dash-cta-bar">
        <div>
          <h2 className="display dash-cta-title">Be Part of the Movement</h2>
          <p className="dash-cta-text">Join law students across India building their careers through YLH.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Magnetic strength={0.4}><Link href="/join" className="pill pill-solid">Join the Community</Link></Magnetic>
          <Magnetic strength={0.4}><Link href="/contact" className="pill pill-ghost">Get in Touch</Link></Magnetic>
        </div>
      </motion.section>

      <style>{`
        .eyebrow { font-size: 0.76rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-text); margin-bottom: 16px; }

        .dash-hero-panel { margin-bottom: 22px; padding: 40px; }
        .dash-hero-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 36px; align-items: center; }
        .dash-title { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 700; line-height: 1.05; margin-bottom: 16px; }
        .dash-lede { color: var(--grey-text); font-size: 1rem; line-height: 1.8; margin-bottom: 24px; max-width: 520px; }
        .dash-hero-stat-stack { display: flex; flex-direction: column; gap: 14px; }
        .dash-stat-box { border: 1px solid var(--glass-border); border-radius: 14px; padding: 18px 20px; background: var(--glass-bg); display: flex; flex-direction: column; gap: 4px; }
        .dash-stat-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.8rem; font-weight: 800; }
        .dash-stat-label { font-size: 0.78rem; color: var(--grey-text); text-transform: uppercase; letter-spacing: 0.05em; }

        .dash-panel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .dash-panel { display: flex; flex-direction: column; gap: 10px; padding: 26px; }
        .dash-panel-wide { grid-column: span 2; }
        .dash-panel-tags { grid-column: span 3; }
        .dash-panel-head { display: flex; align-items: center; justify-content: space-between; }
        .dash-panel-head i { font-size: 1.2rem; color: var(--text-color); }
        .dash-panel-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--grey-text); border: 1px solid var(--glass-border); padding: 3px 9px; border-radius: 999px; }
        .dash-panel h3 { font-size: 1.25rem; }
        .dash-panel p { color: var(--grey-text); font-size: 0.9rem; line-height: 1.7; margin: 0; }
        .dash-tag-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }
        .dash-tag-chip { display: inline-block; padding: 6px 14px; border: 1px solid var(--glass-border); border-radius: 999px; font-size: 0.8rem; font-weight: 600; color: var(--grey-text); background: var(--glass-bg); text-decoration: none; }

        .dash-cta-bar { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; padding: 32px 36px; }
        .dash-cta-title { font-size: 1.6rem; margin-bottom: 6px; }
        .dash-cta-text { color: var(--grey-text); font-size: 0.9rem; margin: 0; }

        @media (max-width: 860px) {
          .dash-hero-grid { grid-template-columns: 1fr; }
          .dash-panel-grid { grid-template-columns: 1fr; }
          .dash-panel-wide, .dash-panel-tags { grid-column: span 1; }
        }
      `}</style>
    </PageShell>
  );
}
