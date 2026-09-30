import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { useCreateTechnicalIssue } from "../features/technicalSupport/hooks/useTechnicalSupport";

function TechnicalIssuePage() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const {
    mutate: submitIssue,
    isPending,
  } = useCreateTechnicalIssue();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("SUBMIT BUTTON CLICKED");

    const trimmedSubject = subject.trim();
    const trimmedDescription = description.trim();

    // Frontend validation
    if (trimmedSubject.length < 10 || trimmedSubject.length > 100) {
      toast.error("Subject must be between 10 and 100 characters.");
      return;
    }

    if (
      trimmedDescription.length < 10 ||
      trimmedDescription.length > 500
    ) {
      toast.error("Description must be between 10 and 500 characters.");
      return;
    }

    const payload = {
      subject: trimmedSubject,
      description: trimmedDescription,
    };

    console.log("TECHNICAL ISSUE PAYLOAD:", payload);

    submitIssue(payload, {
      onSuccess: () => {
        console.log("TECHNICAL ISSUE SUBMITTED SUCCESSFULLY");

        toast.success("Technical issue submitted successfully.");

        setSubject("");
        setDescription("");

        navigate("/contact");
      },

      onError: (error) => {
        console.error("TECHNICAL ISSUE ERROR:", error);

        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to submit technical issue. Please try again.";

        toast.error(message);
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
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
          Technical Support
        </p>

        <h1 className="font-display text-3xl font-bold text-ink mb-2">
          Report a Technical Issue
        </h1>

        <p className="font-body text-sm text-muted leading-relaxed">
          Tell us what went wrong and provide enough details for our support
          team to investigate the issue.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border rounded-xl p-6 space-y-6"
      >
        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block font-body text-sm font-semibold text-ink mb-2"
          >
            Subject
          </label>

          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Briefly describe the issue"
            maxLength={100}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-ink placeholder:text-faint font-body text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition disabled:opacity-60"
          />

          <div className="flex justify-between mt-2">
            <p className="text-xs font-body text-muted">
              Minimum 10 characters
            </p>

            <p className="text-xs font-body text-faint">
              {subject.length}/100
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-body text-sm font-semibold text-ink mb-2"
          >
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain what happened, what you were trying to do, and any relevant details..."
            maxLength={500}
            rows={7}
            disabled={isPending}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-ink placeholder:text-faint font-body text-sm outline-none resize-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition disabled:opacity-60"
          />

          <div className="flex justify-between mt-2">
            <p className="text-xs font-body text-muted">
              Minimum 10 characters
            </p>

            <p className="text-xs font-body text-faint">
              {description.length}/500
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg bg-primary text-white font-body text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={17} />
                Submit Issue
              </>
            )}
          </button>
        </div>
      </form>

      {/* Information */}
      <div className="mt-6 p-4 rounded-xl border border-border bg-background">
        <p className="font-body text-xs text-muted leading-relaxed">
          After submitting your issue, you'll receive a confirmation email.
          Our support team will review the report and may contact you if
          additional information is required.
        </p>
      </div>
    </div>
  );
}

export default TechnicalIssuePage;
