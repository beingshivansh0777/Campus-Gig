import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Palette, PenTool, Video } from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';

const flowSteps = ['Post Project', 'Receive Proposals', 'Compare Talent', 'Hire', 'Get It Done'];

const previewCards = [
  {
    icon: Code2,
    title: 'React Developer Needed',
    budget: '₹8k – ₹15k',
    tag: 'Web Development',
    accent: 'from-[#7C3AED] to-[#A855F7]',
    tint: 'bg-[#F3EEFB] text-[#7C3AED]',
  },
  {
    icon: Palette,
    title: 'UI/UX for Mobile App',
    budget: '₹5k – ₹9k',
    tag: 'Design',
    accent: 'from-[#EC4899] to-[#F472B6]',
    tint: 'bg-[#FCE9F3] text-[#EC4899]',
  },
  {
    icon: PenTool,
    title: 'Content for Startup Blog',
    budget: '₹2k – ₹4k',
    tag: 'Writing',
    accent: 'from-[#F59E0B] to-[#FBBF24]',
    tint: 'bg-[#FEF3E0] text-[#B45309]',
  },
  {
    icon: Video,
    title: 'Edit YouTube Series',
    budget: '₹3k – ₹6k',
    tag: 'Video Editing',
    accent: 'from-[#14B8A6] to-[#2DD4BF]',
    tint: 'bg-[#E6FBF8] text-[#0F766E]',
  },
];

function HomePage() {
  const token = useAuthStore((state) => state.token);

  return (
    <div className="relative overflow-hidden">
      {/* Subtle dot-grid background — decorative only */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(circle, #E4D9F7 1px, transparent 1px)',
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
          <span className="inline-block text-xs font-body font-semibold tracking-wider text-white uppercase bg-linear-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1 rounded-full mb-5">
            Built for students, by students
          </span>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#211A2E] leading-[1.05] tracking-tight mb-5">
            Find the right
            <br />
            talent. Get work
            <br />
            <span className="bg-linear-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
              done.
            </span>
          </h1>

          <p className="font-body text-lg text-[#5B5470] max-w-md mb-8 leading-relaxed">
            Post a project, receive proposals from skilled students, compare bids and hire with
            confidence — all within your campus.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={token ? '/jobs/create' : '/signup'}
              className="group flex items-center gap-2 text-white font-body font-semibold text-sm px-6 py-3 rounded-lg bg-linear-to-r from-[#7C3AED] to-[#EC4899] hover:shadow-lg hover:shadow-[#EC4899]/20 hover:scale-[1.02] transition-all"
            >
              Post a Project
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to={token ? '/jobs' : '/signup'}
              className="bg-white text-[#211A2E] font-body font-semibold text-sm px-6 py-3 rounded-lg border border-[#EDE9F5] hover:border-[#7C3AED]/40 hover:text-[#7C3AED] transition-colors"
            >
              Find Work
            </Link>
          </div>

          {/* Flow strip */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-10 text-xs font-body text-[#8B87A0]">
            {flowSteps.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={i === 0 ? 'text-[#7C3AED] font-semibold' : ''}>{step}</span>
                {i < flowSteps.length - 1 && <ArrowRight size={12} className="text-[#D9D2EC]" />}
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
                className="bg-white border border-[#EDE9F5] rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ marginLeft: `${i % 2 === 0 ? 0 : 32}px` }}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${card.tint}`}
                >
                  <card.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-body font-semibold text-sm text-[#211A2E] truncate">
                    {card.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-[#5B5470]">{card.budget}</span>
                    <span className="text-xs font-body text-[#D9D2EC]">·</span>
                    <span
                      className={`text-xs font-body font-medium bg-linear-to-r ${card.accent} bg-clip-text text-transparent`}
                    >
                      {card.tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-[#EDE9F5] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-display text-3xl font-bold bg-linear-to-r from-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
              Peer-to-peer
            </p>
            <p className="text-sm font-body text-[#8B87A0] mt-1">campus-only network</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold bg-linear-to-r from-[#EC4899] to-[#F472B6] bg-clip-text text-transparent">
              Verified
            </p>
            <p className="text-sm font-body text-[#8B87A0] mt-1">student profiles</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold bg-linear-to-r from-[#14B8A6] to-[#2DD4BF] bg-clip-text text-transparent">
              Zero
            </p>
            <p className="text-sm font-body text-[#8B87A0] mt-1">platform noise</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
