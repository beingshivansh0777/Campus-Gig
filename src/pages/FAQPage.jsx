import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_SECTIONS = [
  {
    section: 'General',
    items: [
      {
        q: 'What is Campus-GIG?',
        a: 'Campus-GIG is a freelancing marketplace that connects clients with freelancers. Clients can post projects and review proposals, while freelancers can discover opportunities, submit proposals, communicate with clients, and manage contracts.',
      },
      {
        q: 'Who can use Campus-GIG?',
        a: 'Campus-GIG is designed for individuals and businesses looking to offer or hire professional services through the platform, subject to our eligibility requirements and Terms of Service.',
      },
      {
        q: 'Is Campus-GIG free to use?',
        a: 'Creating an account and browsing the platform may be available without a fee. Certain transactions or services may be subject to applicable platform fees. Please review the applicable fee information before completing a transaction.',
      },
    ],
  },
  {
    section: 'For Clients',
    items: [
      {
        q: 'How do I post a project?',
        a: 'Create your account, open the project creation section, provide the project title, description, requirements, budget, and other relevant information, then publish the project.',
      },
      {
        q: 'How do I choose a freelancer?',
        a: "Review the proposals received for your project and consider each freelancer's profile, skills, experience, proposal, ratings, and other relevant information before making your decision.",
      },
      {
        q: 'Can I communicate with freelancers before starting a contract?',
        a: 'Campus-GIG provides communication tools that allow clients and freelancers to discuss project requirements and expectations.',
      },
    ],
  },
  {
    section: 'For Giggers',
    items: [
      {
        q: 'How do I apply for a project?',
        a: 'Browse available projects, select an opportunity that matches your skills, review its requirements, and submit a proposal with your message and proposed terms.',
      },
      {
        q: 'Can I save projects?',
        a: 'Yes. You can save interesting projects and access them later from your saved gigs section.',
      },
      {
        q: 'How do reviews and ratings work?',
        a: 'Users may be able to leave reviews and ratings after eligible contracts are completed. Reviews should reflect genuine experiences and must comply with our platform rules.',
      },
    ],
  },
  {
    section: 'Contracts & Payments',
    items: [
      {
        q: 'What happens after a proposal is selected?',
        a: 'Once a client decides to work with a freelancer, the parties can proceed with the contract process and agree on the relevant project terms.',
      },
      {
        q: 'How are payments handled?',
        a: "Payments are processed according to the payment methods and procedures supported by Campus-GIG. Applicable platform fees and payment terms will be presented where relevant.",
      },
      {
        q: 'What happens if there is a dispute?',
        a: "Users should first attempt to communicate clearly and resolve project-related issues. Where available, users may contact Campus-GIG Support or use the platform's reporting and dispute mechanisms.",
      },
    ],
  },
  {
    section: 'Safety',
    items: [
      {
        q: 'How do I report a user or project?',
        a: 'Use the available reporting functionality or contact Campus-GIG Support with relevant information about the issue.',
      },
      {
        q: 'What happens after I submit a report?',
        a: 'Reports are reviewed by the appropriate Campus-GIG team. Depending on the circumstances, actions may include requesting additional information, removing content, restricting activity, or taking other measures permitted under our policies.',
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left bg-surface hover:bg-background transition"
      >
        <span className="font-body font-medium text-sm text-ink">{q}</span>
        <ChevronDown
          size={16}
          className={`text-faint shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-border">
          <p className="font-body text-sm text-muted leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.section}>
            <h2 className="font-display text-lg font-bold text-ink mb-3">{section.section}</h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;