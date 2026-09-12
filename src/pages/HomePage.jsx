import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, PenTool, Video } from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';

const flowSteps = ['Post Project', 'Receive Proposals', 'Compare Talent', 'Hire', 'Get It Done'];

const previewCards = [
  { icon: Code2, title: 'React Developer Needed', budget: '₹8k – ₹15k', tag: 'Web Development' },
  { icon: Palette, title: 'UI/UX for Mobile App', budget: '₹5k – ₹9k', tag: 'Design' },
  { icon: PenTool, title: 'Content for Startup Blog', budget: '₹2k – ₹4k', tag: 'Writing' },
  { icon: Video, title: 'Edit YouTube Series', budget: '₹3k – ₹6k', tag: 'Video Editing' },
];

function HomePage() {
  const token = useAuthStore((state) => state.token);

  return (
    <div className="relative overflow-hidden">
      {/* Subtle dot-grid background — decorative only */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4D4D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black, transparent 80%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-body font-semibold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full mb-5">
            Built for students, by students
          </span>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-ink leading-[1.05] tracking-tight mb-5">
            Find the right
            <br />
            talent. Get work
            <br />
            <span className="text-primary">done.</span>
          </h1>

          <p className="font-body text-lg text-muted max-w-md mb-8 leading-relaxed">
            Post a project, receive proposals from skilled students, compare bids and hire with
            confidence — all within your campus.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={token ? '/jobs/create' : '/signup'}
              className="group flex items-center gap-2 bg-primary text-white font-body font-semibold text-sm px-6 py-3 rounded-lg hover:bg-primary-hover transition"
            >
              Post a Project
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to={token ? '/jobs' : '/signup'}
              className="bg-surface text-ink font-body font-semibold text-sm px-6 py-3 rounded-lg border border-border hover:border-ink/30 transition"
            >
              Find Work
            </Link>
          </div>

          {/* Flow strip */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-10 text-xs font-body text-muted">
            {flowSteps.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={i === 0 ? 'text-ink font-medium' : ''}>{step}</span>
                {i < flowSteps.length - 1 && <ArrowRight size={12} className="text-border" />}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — stacked preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="space-y-3">
            {previewCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                style={{ marginLeft: `${i % 2 === 0 ? 0 : 32}px` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <card.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-sm text-ink truncate">{card.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-muted">{card.budget}</span>
                    <span className="text-xs font-body text-muted">·</span>
                    <span className="text-xs font-body text-muted">{card.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-ink">Peer-to-peer</p>
            <p className="text-sm font-body text-muted mt-1">campus-only network</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-ink">Verified</p>
            <p className="text-sm font-body text-muted mt-1">student profiles</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-ink">Zero</p>
            <p className="text-sm font-body text-muted mt-1">platform noise</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;