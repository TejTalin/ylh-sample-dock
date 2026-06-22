'use client';
import { motion } from 'framer-motion';
import PageShell from '../../components/PageShell';
import WordReveal from '../../components/WordReveal';
import { staggerContainer, staggerItem, VIEW } from '../../lib/motion';
import { SAMPLE_BLOGS } from '../../lib/content';

export default function BlogsPage() {
  return (
    <PageShell>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <WordReveal text="Legal Insights" as="h1" className="serif page-title" style={{ textAlign: 'center' }} />
        <p style={{ color: 'var(--grey-text)', maxWidth: '480px', margin: '0 auto' }}>Peer-written analysis across every major area of law.</p>
      </div>

      <motion.div className="cards-grid" variants={staggerContainer(0.1, 0.1)} initial="hidden" whileInView="visible" viewport={VIEW} style={{ maxWidth: '960px', margin: '0 auto' }}>
        {SAMPLE_BLOGS.map(blog => (
          <motion.article key={blog.title} variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 26px 50px rgba(0,0,0,0.18)' }} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--grey-text)' }}>{blog.category}</span>
            <h3 className="serif" style={{ fontSize: '1.1rem', lineHeight: 1.3 }}>{blog.title}</h3>
            <p style={{ color: 'var(--grey-text)', fontSize: '0.87rem', lineHeight: 1.7 }}>{blog.excerpt}</p>
            <span style={{ fontSize: '0.78rem', color: 'var(--grey-text)', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--glass-border)' }}>By {blog.author}</span>
          </motion.article>
        ))}
      </motion.div>
    </PageShell>
  );
}
