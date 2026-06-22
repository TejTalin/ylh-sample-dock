'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../../components/PageShell';
import WordReveal from '../../components/WordReveal';
import Magnetic from '../../components/Magnetic';
import { useFakeSubmit } from '../../lib/useFakeSubmit';

export default function JoinPage() {
  const { status, errorMessage, submit, reset } = useFakeSubmit();
  const [form, setForm] = useState({ name: '', email: '', position: '' });
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); submit(); };

  return (
    <PageShell>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <WordReveal text="Join Young Legal House" as="h1" className="serif page-title" style={{ textAlign: 'center' }} />
        <p style={{ color: 'var(--grey-text)', maxWidth: '480px', margin: '0 auto' }}>Become part of India&apos;s most ambitious legal student community.</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '520px', margin: '0 auto', padding: '36px 32px' }}>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
              <motion.i className="fas fa-check-circle" style={{ fontSize: '2.2rem', marginBottom: '14px', display: 'block' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 16, delay: 0.1 }} />
              <p style={{ color: 'var(--grey-text)', marginBottom: '16px' }}>Application submitted. We&apos;ll review it and respond within 48 hours.</p>
              <Magnetic strength={0.3}><button className="pill pill-ghost" onClick={() => { reset(); setForm({ name: '', email: '', position: '' }); }}>Submit another application</button></Magnetic>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div><label>Full Name</label><input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} disabled={status === 'loading'} required /></div>
              <div><label>Email</label><input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} disabled={status === 'loading'} required /></div>
              <div>
                <label>Position</label>
                <select name="position" value={form.position} onChange={handleChange} disabled={status === 'loading'} required defaultValue="">
                  <option value="" disabled>Select a position...</option>
                  <option>Legal Research Intern</option>
                  <option>Graphic Designer</option>
                  <option>Editor / Proofreader</option>
                </select>
              </div>
              {status === 'error' && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="form-error-banner">{errorMessage}</motion.div>}
              <Magnetic strength={0.2}>
                <button type="submit" className="pill pill-solid" style={{ marginTop: '6px', width: '100%' }} disabled={status === 'loading'} aria-busy={status === 'loading'}>
                  {status === 'loading' && <span className="btn-spinner" />}
                  {status === 'loading' ? 'Submitting…' : 'Submit Application'}
                </button>
              </Magnetic>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
