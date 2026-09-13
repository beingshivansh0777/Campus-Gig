import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Palette,
  PenTool,
  Video,
  Briefcase,
  FileEdit,
  Inbox,
  ListChecks,
  Handshake,
  PartyPopper,
} from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';


const rotatingWords = ['developers.', 'designers.', 'writers.', 'editors.', 'creators.'];

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

const stats = [
  {
    label: 'Peer-to-peer',
    caption: 'campus-only network',
    accent: 'from-[#7C3AED] to-[#A855F7]',
  },
  {
    label: 'Verified',
    caption: 'student profiles',
    accent: 'from-[#EC4899] to-[#F472B6]',
  },
  {
    label: 'Zero',
    caption: 'platform noise',
    accent: 'from-[#14B8A6] to-[#2DD4BF]',
  },
];

const howItWorks = [
  { icon: FileEdit, title: 'Post Project', desc: 'Describe what you need and set a budget.' },
  { icon: Inbox, title: 'Receive Proposals', desc: 'Students on your campus send you bids.' },
  { icon: ListChecks, title: 'Compare Talent', desc: 'Review profiles, skills, and past work.' },
  { icon: Handshake, title: 'Hire', desc: 'Pick your favorite and lock it in.' },
  { icon: PartyPopper, title: 'Get It Done', desc: 'Work gets delivered, right on campus.' },
];

function HomePage() {
  const token = useAuthStore((state) => state.token);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const [mobileCardIndex, setMobileCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileCardIndex((i) => (i + 1) % previewCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-12 lg:pb-16 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left — copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-body font-semibold tracking-wider text-white uppercase bg-linear-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1 rounded-full mb-5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            Built for students, by students
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#211A2E] leading-[1.1] sm:leading-[1.05] tracking-tight mb-5 wrap-break-word">
            <span className="block">Find campus</span>
            <span className="block relative h-[1.1em] sm:h-[1.05em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 bg-linear-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            Get work done.
          </h1>

          <p className="font-body text-base sm:text-lg text-[#5B5470] max-w-md mb-8 leading-relaxed">
            Post a project, receive proposals from skilled students, compare bids and hire with
            confidence — all within your campus.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={token ? '/jobs/create' : '/signup'}
              className="group flex items-center gap-2 text-white font-body font-semibold text-sm px-5 sm:px-6 py-3 rounded-lg bg-linear-to-r from-[#7C3AED] to-[#EC4899] hover:shadow-lg hover:shadow-[#EC4899]/25 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <Briefcase size={16} />
              Post a Project
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to={token ? '/jobs' : '/signup'}
              className="bg-white text-[#211A2E] font-body font-semibold text-sm px-5 sm:px-6 py-3 rounded-lg border border-[#EDE9F5] hover:border-[#7C3AED]/40 hover:text-[#7C3AED] transition-colors"
            >
              Browse Talent
            </Link>
          </div>
        </motion.div>

        {/* Right — stacked preview cards (desktop/tablet only) */}
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
                whileHover={{ scale: 1.03, x: 4 }}
                style={{ marginLeft: `${i % 2 === 0 ? 0 : 32}px` }}
              >
                <Link
                  to={token ? '/jobs' : '/signup'}
                  className="bg-white border border-[#EDE9F5] rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-lg hover:border-[#7C3AED]/30 transition-shadow"
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
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile-only preview carousel — one full card visible at a time */}
               {/* Mobile-only preview carousel — auto-rolls every few seconds */}
        <div className="lg:hidden">
          <div className="relative h-24 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileCardIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Link
                  to={token ? '/jobs' : '/signup'}
                  className="bg-white border border-[#EDE9F5] rounded-xl p-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform h-full"
                >
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${previewCards[mobileCardIndex].tint}`}
                  >
                    {(() => {
                      const Icon = previewCards[mobileCardIndex].icon;
                      return <Icon size={18} />;
                    })()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-body font-semibold text-sm text-[#211A2E] truncate">
                      {previewCards[mobileCardIndex].title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono text-[#5B5470]">
                        {previewCards[mobileCardIndex].budget}
                      </span>
                      <span className="text-xs font-body text-[#D9D2EC]">·</span>
                      <span
                        className={`text-xs font-body font-medium bg-linear-to-r ${previewCards[mobileCardIndex].accent} bg-clip-text text-transparent`}
                      >
                        {previewCards[mobileCardIndex].tag}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Dots — active one highlighted */}
          <div className="flex justify-center gap-1.5 mt-3">
            {previewCards.map((card, i) => (
              <span
                key={card.title}
                className={`h-1.5 rounded-full transition-all ${
                  i === mobileCardIndex ? 'w-4 bg-[#7C3AED]' : 'w-1.5 bg-[#EDE9F5]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-xs font-body font-semibold tracking-wider text-[#7C3AED] uppercase">
            How it works
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#211A2E] mt-2">
            Five steps. Zero hassle.
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-8">
          {/* Connecting line — desktop only */}
          <div className="hidden sm:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-linear-to-r from-[#7C3AED] via-[#EC4899] to-[#14B8A6] opacity-20" />

          {howItWorks.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-[#7C3AED]/20 flex items-center justify-center mb-3 shadow-sm">
                <step.icon size={18} className="text-[#7C3AED]" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-linear-to-br from-[#7C3AED] to-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <p className="font-body font-semibold text-sm text-[#211A2E]">{step.title}</p>
              <p className="text-xs font-body text-[#8B87A0] mt-1 leading-snug max-w-36">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats strip — always horizontal, sizes shrink on small screens */}
      <div className="border-t border-[#EDE9F5] bg-white">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 py-6 sm:py-10 grid grid-cols-3 divide-x divide-[#EDE9F5]">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              className="cursor-default text-center px-1"
            >
              <p
                className={`font-display text-base sm:text-2xl md:text-3xl font-bold bg-linear-to-r ${stat.accent} bg-clip-text text-transparent leading-tight`}
              >
                {stat.label}
              </p>
              <p className="text-[10px] sm:text-sm font-body text-[#8B87A0] mt-1 leading-tight">
                {stat.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
