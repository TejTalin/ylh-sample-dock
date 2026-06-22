'use client';
import { motion } from 'framer-motion';
import { VIEW } from '../lib/motion';

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3 };
const wordItem = {
  hidden: { opacity: 0, y: 18, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function WordReveal({ text, as = 'h1', className = '', style = {}, stagger = 0.05 }) {
  const words = text.split(' ');
  const container = { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } } };
  const Tag = TAGS[as] ?? TAGS.h1;
  return (
    <Tag
      className={className}
      style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0.25em', justifyContent: style.textAlign === 'center' ? 'center' : undefined }}
      variants={container} initial="hidden" whileInView="visible" viewport={VIEW} aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={wordItem} style={{ display: 'inline-block' }}>{w}</motion.span>
      ))}
    </Tag>
  );
}
