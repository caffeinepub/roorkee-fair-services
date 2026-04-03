import { Shield } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Header Banner */}
      <div className="bg-midnight py-12 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="bg-gold/20 p-3 rounded-full">
            <Shield className="text-gold" size={28} />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-gold">
              Privacy Policy
            </h1>
            <p className="text-white/60 text-sm mt-1">Roorkee Fair Services</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Data Collection */}
        <section className="bg-white rounded-2xl shadow-sm border border-gold/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h2 className="text-midnight font-display font-bold text-lg">
              Data Collection
            </h2>
          </div>
          <p className="text-midnight/70 leading-relaxed">
            We collect <strong>Name</strong>, <strong>Phone Number</strong>, and{" "}
            <strong>Manual Location (typed by user)</strong> only for service
            booking purposes.
          </p>
        </section>

        {/* Third-Party Sharing */}
        <section className="bg-white rounded-2xl shadow-sm border border-gold/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h2 className="text-midnight font-display font-bold text-lg">
              No Third-Party Sharing
            </h2>
          </div>
          <p className="text-midnight/70 leading-relaxed">
            <strong>We do not share your data with any third parties.</strong>{" "}
            Your information is used solely to connect you with our service
            experts.
          </p>
        </section>

        {/* Back link */}
        <div className="text-center pb-6">
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            className="text-midnight/50 hover:text-gold transition-colors text-sm underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
