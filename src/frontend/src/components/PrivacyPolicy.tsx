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
        {/* Intro */}
        <section className="bg-white rounded-2xl shadow-sm border border-gold/20 p-6">
          <h2 className="text-midnight font-display font-bold text-lg mb-3">
            Privacy Policy for Roorkee Fair Services
          </h2>
          <p className="text-midnight/70 leading-relaxed">
            We respect your privacy. This policy explains how we handle your
            personal information when you use our services.
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-white rounded-2xl shadow-sm border border-gold/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h2 className="text-midnight font-display font-bold text-lg">
              Data Collection
            </h2>
          </div>
          <p className="text-midnight/70 leading-relaxed">
            We only collect your <strong>Name</strong>,{" "}
            <strong>Phone Number</strong>, and <strong>Area</strong> for service
            booking purposes.
          </p>
        </section>

        {/* Data Usage */}
        <section className="bg-white rounded-2xl shadow-sm border border-gold/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h2 className="text-midnight font-display font-bold text-lg">
              Data Usage
            </h2>
          </div>
          <p className="text-midnight/70 leading-relaxed">
            This information is used strictly to connect you with our service
            experts (Solar, Flooring, Vehicle, Taxi).
          </p>
        </section>

        {/* Data Security */}
        <section className="bg-white rounded-2xl shadow-sm border border-gold/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h2 className="text-midnight font-display font-bold text-lg">
              Data Security
            </h2>
          </div>
          <p className="text-midnight/70 leading-relaxed">
            We do not sell or share your personal data with third-party
            marketing companies.
          </p>
        </section>

        {/* User Rights */}
        <section className="bg-white rounded-2xl shadow-sm border border-gold/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h2 className="text-midnight font-display font-bold text-lg">
              User Rights
            </h2>
          </div>
          <p className="text-midnight/70 leading-relaxed">
            You can request to delete your data at any time by contacting us at{" "}
            <a
              href="mailto:roorkeefairservices@gmail.com"
              className="text-gold font-medium hover:underline"
            >
              roorkeefairservices@gmail.com
            </a>
            .
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
