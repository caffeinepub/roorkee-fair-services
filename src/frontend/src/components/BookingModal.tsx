import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, X } from "lucide-react";
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

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello, I want to book ${serviceName}. My Name: ${name}, Phone: ${phone}, Area: ${area}.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917248116630?text=${encoded}`, "_blank");
    onClose();
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
            <form onSubmit={handleConfirm} className="space-y-4">
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
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

              <button
                type="submit"
                className="btn-gold w-full py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2"
                data-ocid="booking.submit_button"
              >
                <MessageCircle size={20} />
                Confirm Booking via WhatsApp
              </button>
              <p className="text-xs text-center text-gray-400">
                Your booking details will be sent directly via WhatsApp.
              </p>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
