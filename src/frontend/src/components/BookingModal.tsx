import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface BookingModalProps {
  serviceName: string;
  onClose: () => void;
}

export function BookingModal({ serviceName, onClose }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("area", area);
      formData.append("service", serviceName);
      formData.append("_subject", "New Booking - Roorkee Fair Services");
      formData.append("_captcha", "false");

      const res = await fetch(
        "https://formsubmit.co/ajax/roorkeefairservices@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );
      if (res.ok) {
        setSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setError(
        "Something went wrong. Please try calling us directly at +91 7248116630.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="booking-title"
      data-ocid="booking.dialog"
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: overlay dismiss only */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />
      <AnimatePresence>
        <motion.div
          className="relative bg-white rounded-2xl shadow-gold-lg w-full max-w-md overflow-hidden"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-midnight px-6 py-4 flex items-center justify-between">
            <div>
              <h2
                id="booking-title"
                className="font-display text-gold font-bold text-xl"
              >
                Book Service
              </h2>
              <p className="text-white/70 text-sm mt-0.5">{serviceName}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 hover:text-gold transition-colors p-1"
              aria-label="Close"
              data-ocid="booking.close_button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {success ? (
              <div
                className="flex flex-col items-center gap-4 py-6"
                data-ocid="booking.success_state"
              >
                <CheckCircle size={56} className="text-green-500" />
                <p className="text-center text-midnight font-semibold text-lg">
                  Booking submitted!
                </p>
                <p className="text-center text-gray-600 text-sm">
                  Our expert will contact you shortly at {phone}.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-gold px-6 py-2 rounded-lg text-sm font-semibold"
                  data-ocid="booking.confirm_button"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-name"
                    className="text-midnight font-semibold"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="booking-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="border-gray-200 focus:border-gold focus:ring-gold"
                    data-ocid="booking.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-phone"
                    className="text-midnight font-semibold"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="border-gray-200 focus:border-gold focus:ring-gold"
                    data-ocid="booking.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-area"
                    className="text-midnight font-semibold"
                  >
                    Area in Roorkee
                  </Label>
                  <Input
                    id="booking-area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Civil Lines, IIT Area, Manglaur"
                    required
                    className="border-gray-200 focus:border-gold focus:ring-gold"
                    data-ocid="booking.input"
                  />
                </div>

                {error && (
                  <p
                    className="text-red-500 text-sm"
                    data-ocid="booking.error_state"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-70"
                  data-ocid="booking.submit_button"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading ? "Submitting..." : "Confirm Booking"}
                </button>

                <p className="text-xs text-center text-gray-400">
                  You'll receive a call from our expert soon after booking.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
