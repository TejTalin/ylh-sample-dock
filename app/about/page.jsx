'use client';
import { motion } from 'framer-motion';
import PageShell from '../../components/PageShell';
import WordReveal from '../../components/WordReveal';
import { fadeUp, staggerContainer, staggerItem, VIEW } from '../../lib/motion';
import { ABOUT_TEXT, FOUNDER_MESSAGES } from '../../lib/content';

export default function AboutPage() {
  return (
    <PageShell>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <WordReveal text="About The Initiative" as="h1" className="serif page-title" style={{ textAlign: 'center' }} />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        style={{ color: 'var(--grey-text)', lineHeight: 1.85, maxWidth: '760px', margin: '0 auto 48px', fontSize: '0.96rem' }}
      >
        {ABOUT_TEXT}
      </motion.p>
      <motion.div className="cards-grid" variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="visible" viewport={VIEW} style={{ maxWidth: '880px', margin: '0 auto' }}>
        {FOUNDER_MESSAGES.map(({ role, quote, author }) => (
          <motion.div key={role} variants={staggerItem} whileHover={{ y: -5 }} className="glass-card">
            <h3 className="serif" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>{role}</h3>
            <p style={{ color: 'var(--grey-text)', fontStyle: 'italic', lineHeight: 1.75, marginBottom: '14px', fontSize: '0.92rem' }}>&ldquo;{quote}&rdquo;</p>
            <span style={{ fontWeight: 700, fontSize: '0.86rem' }}>{author}</span>
          </motion.div>
        ))}
      </motion.div>
    </PageShell>
  );
}
