import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Clock3 } from "lucide-react";

function GetSupportPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-body text-muted hover:text-ink transition-colors duration-200 mb-10"
      >
        <ArrowLeft size={17} />
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-body font-semibold text-primary uppercase tracking-wide mb-2">
          General Support
        </p>

        <h1 className="font-display text-3xl font-bold text-ink mb-3">
          Get Support
        </h1>

        <p className="font-body text-sm text-muted leading-relaxed">
          We're building a smarter way to help you get answers and resolve
          common platform-related questions.
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <Bot size={28} className="text-primary" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body font-semibold mb-4">
          <Clock3 size={14} />
          Coming Soon
        </div>

        <h2 className="font-display text-2xl font-bold text-ink mb-3">
          AI Support Bot is Coming Soon
        </h2>

        <p className="font-body text-sm text-muted leading-relaxed max-w-xl mx-auto mb-6">
          Our AI-powered support assistant is currently under development.
          Soon, you'll be able to ask questions, get quick answers, and find
          guidance about Campus-GIG without waiting for manual support.
        </p>

        <p className="font-body text-xs text-muted leading-relaxed max-w-lg mx-auto">
          In the meantime, you can check our FAQ or report a technical issue
          if something on the platform isn't working as expected.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          type="button"
          onClick={() => navigate("/faq")}
          className="flex-1 px-5 py-3 rounded-lg border border-border text-ink font-body text-sm font-semibold hover:bg-background transition"
        >
          Visit FAQ
        </button>

        <button
          type="button"
          onClick={() => navigate("/contact/technical-issue")}
          className="flex-1 px-5 py-3 rounded-lg bg-primary text-white font-body text-sm font-semibold hover:opacity-90 transition"
        >
          Report Technical Issue
        </button>
      </div>
    </div>
  );
}

export default GetSupportPage;
