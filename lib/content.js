// Shared YLH content — identical across all 3 UI samples.
// Only this file's data should be reused; layout/animation code must differ per sample.

export const OFFER_CARDS = [
  { icon: 'fa-newspaper', title: 'Curated Legal Insights', text: "Peer-written articles covering Corporate Law, Tax, TMT, Litigation, ADR, IPR, and more — written by students, for students." },
  { icon: 'fa-gavel',     title: 'Competitions & Events',  text: 'National moot courts, trivia challenges, workshops, and flagship events designed to sharpen your legal skills.' },
  { icon: 'fa-users',     title: 'Expert Community',        text: 'Connect with peers, researchers, and practitioners across India. A serious network built for the next generation of lawyers.' },
];

export const LAW_AREAS = ['Corporate Law', 'Tax', 'TMT', 'Litigation', 'M&A', 'ADR', 'IPR', 'Constitutional', 'Criminal Law', 'International Law'];

export const NAV_LINKS = [
  { href: '/',        label: 'Home'    },
  { href: '/blogs',   label: 'Blogs'   },
  { href: '/events',  label: 'Events'  },
  { href: '/about',   label: 'About'   },
  { href: '/team',    label: 'Team'    },
  { href: '/join',    label: 'Join Us' },
  { href: '/contact', label: 'Contact' },
];

export const ABOUT_TEXT = `Young Legal House is a pioneering initiative dedicated to empowering law students across India by fostering a dynamic ecosystem of learning, collaboration, and professional development. Serving as a unified platform for aspiring legal professionals, we bridge the gap between academic pursuits and career advancement through access to internships, training programmes, competitions, events, mentorship, and diverse professional opportunities. Driven by a vision to cultivate an informed, connected, and progressive legal community, Young Legal House strives to nurture the next generation of legal minds by encouraging excellence, innovation, and meaningful engagement within the legal fraternity. Established in mid-2024, the initiative gained full operational momentum in December 2025 and has since continued to expand its presence and impact across the Indian legal landscape.`;

export const FOUNDER_MESSAGES = [
  {
    role: "The Founder's Vision",
    quote: "We created Young Legal House because the journey from a law student to a top-tier practitioner shouldn't be a solo endeavor. This platform is designed to bridge the gap between theory and execution.",
    author: '- Achyuta R',
  },
  {
    role: "The Architect's Blueprint",
    quote: 'Technology should elevate the legal profession, not complicate it. I built this ecosystem to be seamless, futuristic, and focused entirely on connecting our community without friction.',
    author: '- Tej Talin',
  },
];

export const TEAM_MEMBERS = [
  { name: 'Achyuta Narayanan', role: 'Founder of the Community',    image: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Amishee Gupta',     role: 'Co Founder of the Community', image: 'https://i.pravatar.cc/300?img=47' },
  { name: 'Tej Talin',         role: 'Head of Technology',          image: 'https://i.pravatar.cc/300?img=68' },
];

export const EVENT_INFO = {
  name: 'Lex Noctis',
  tagline: 'Where the Night Court Convenes',
  description: 'A cinematic criminal law trivia competition hosted live on YouTube. Compete individually, answer rapid-fire legal questions, and win from a prize pool. Open to all law students across India.',
  date: '15 June 2026',
  fee: 'Rs. 150/- per participant',
  deadline: '13 June 2026',
  prizeWinner: 'Rs. 3,000/- + Certificate',
  prizeRunner: 'Rs. 2,000/- + Certificate',
};

export const SAMPLE_BLOGS = [
  { title: 'Understanding the Bharatiya Nyaya Sanhita: What Changes for Students', category: 'Criminal Law', author: 'YLH Editorial', excerpt: 'A breakdown of how the BNS reframes core offences previously codified under the IPC, and what law students should track going forward.' },
  { title: 'Arbitration Clauses in Indian Commercial Contracts: A Practical Guide', category: 'ADR', author: 'YLH Editorial', excerpt: 'Drafting enforceable arbitration clauses requires more than boilerplate language — here is what actually holds up in Indian courts.' },
  { title: 'The Companies Act and Startup Governance: Common Pitfalls', category: 'Corporate', author: 'YLH Editorial', excerpt: 'Early-stage Indian startups frequently misstep on board composition and related-party disclosures. Here is what the Act actually requires.' },
];

export const CONTACT_INFO = {
  email: 'connect.ylh@gmail.com',
  location: 'Chennai, Tamil Nadu, India',
};
