'use client';
import { motion } from 'framer-motion';
import PageShell from '../../components/PageShell';
import WordReveal from '../../components/WordReveal';
import Magnetic from '../../components/Magnetic';
import { fadeUp, VIEW } from '../../lib/motion';
import { EVENT_INFO } from '../../lib/content';

export default function EventsPage() {
  return (
    <PageShell>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <WordReveal text="Events & Competitions" as="h1" className="serif page-title" style={{ textAlign: 'center' }} />
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={VIEW} variants={fadeUp} className="glass-card" style={{ maxWidth: '720px', margin: '0 auto', padding: '44px 34px', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', padding: '4px 14px', border: '1px solid var(--glass-border)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-text)', marginBottom: '18px' }}>🔴 Live Event</span>
        <h2 className="serif" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '6px' }}>{EVENT_INFO.name}</h2>
        <p style={{ fontStyle: 'italic', color: 'var(--grey-text)', marginBottom: '20px' }}>{EVENT_INFO.tagline}</p>
        <p style={{ color: 'var(--grey-text)', lineHeight: 1.8, maxWidth: '540px', margin: '0 auto 28px', fontSize: '0.92rem' }}>{EVENT_INFO.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '28px', textAlign: 'left' }}>
          {[
            ['Date', EVENT_INFO.date], ['Fee', EVENT_INFO.fee], ['Deadline', EVENT_INFO.deadline],
            ['Winner', EVENT_INFO.prizeWinner], ['Runner-up', EVENT_INFO.prizeRunner],
          ].map(([k, v]) => (
            <motion.div key={k} whileHover={{ y: -3 }} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '12px 14px' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--grey-text)', marginBottom: '4px' }}>{k}</div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{v}</div>
            </motion.div>
          ))}
        </div>

        <Magnetic strength={0.4}><a href="#" className="pill pill-solid">Register for Trivia</a></Magnetic>
      </motion.div>
    </PageShell>
  );
}
