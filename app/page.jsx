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
      <motion.section
        style={{ textAlign: 'center', maxWidth: '780px', margin: '24px auto 48px' }}
        variants={staggerContainer(0.1, 0.05)} initial="hidden" whileInView="visible" viewport={VIEW}
      >
        <motion.p variants={fadeUp} className="eyebrow">India&apos;s Legal Student Community</motion.p>
        <WordReveal text="Young Legal House" as="h1" className="serif" style={{ textAlign: 'center', fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '18px' }} />
        <motion.p variants={fadeUp} style={{ color: 'var(--grey-text)', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.85, maxWidth: '640px', margin: '0 auto 28px' }}>
          A community bridging the gap between legal theory and execution. We connect aspiring legal professionals with knowledge, competitions, events, and a network that takes law seriously.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Magnetic strength={0.4}><Link href="/join" className="pill pill-solid">Join the Community</Link></Magnetic>
          <Magnetic strength={0.4}><Link href="/blogs" className="pill pill-ghost">Read Legal Insights</Link></Magnetic>
        </motion.div>
      </motion.section>

      <motion.div initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} style={{ maxWidth: '780px', margin: '0 auto 48px' }}>
        <Ticker text="🔴 FLAGSHIP EVENT — LEX NOCTIS · CRIMINAL LAW TRIVIA · 15 JUNE 2026 · REGISTRATIONS NOW OPEN · CLICK TO REGISTER" />
      </motion.div>

      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} style={{ maxWidth: '920px', margin: '0 auto 48px' }}>
        <WordReveal text="What We Offer" as="h2" className="serif section-title" style={{ textAlign: 'center' }} />
        <p className="section-sub" style={{ textAlign: 'center' }}>Everything a law student needs in one place</p>
        <motion.div className="cards-grid" variants={staggerContainer(0.1, 0.05)} initial="hidden" whileInView="visible" viewport={VIEW}>
          {OFFER_CARDS.map(item => (
            <motion.div key={item.title} variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 26px 50px rgba(0,0,0,0.18)' }} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <i className={`fas ${item.icon}`} style={{ fontSize: '1.3rem' }} />
              <h3 className="serif" style={{ fontSize: '1.2rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--grey-text)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} style={{ maxWidth: '780px', margin: '0 auto 48px', textAlign: 'center' }}>
        <WordReveal text="Legal Insights" as="h2" className="serif section-title" style={{ textAlign: 'center' }} />
        <p className="section-sub">Legal insights across every major domain</p>
        <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', justifyContent: 'center' }} variants={staggerContainer(0.04, 0.1)} initial="hidden" whileInView="visible" viewport={VIEW}>
          {LAW_AREAS.map(area => (
            <motion.div key={area} variants={staggerItem}>
              <Magnetic strength={0.5}><Link href="/blogs" className="tag-pill">{area}</Link></Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '44px 30px' }}>
          <WordReveal text="Be Part of the Movement" as="h2" className="serif section-title" style={{ textAlign: 'center' }} />
          <p className="section-sub" style={{ maxWidth: '500px', margin: '0 auto 24px' }}>Join law students across India building their careers through YLH.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Magnetic strength={0.4}><Link href="/join" className="pill pill-solid">Join the Community</Link></Magnetic>
            <Magnetic strength={0.4}><Link href="/contact" className="pill pill-ghost">Get in Touch</Link></Magnetic>
          </div>
        </div>
      </motion.section>

      <style>{`
        .eyebrow { font-size: 0.76rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-text); margin-bottom: 16px; }
        .tag-pill { display: inline-block; padding: 7px 15px; border: 1px solid var(--glass-border); border-radius: 999px; font-size: 0.82rem; font-weight: 600; color: var(--grey-text); background: var(--glass-bg); text-decoration: none; }
      `}</style>
    </PageShell>
  );
}
