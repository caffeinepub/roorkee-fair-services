import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 left-4 z-30 flex flex-col gap-3">
      {/* Call Now */}
      <a
        href="tel:+917248116630"
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
        aria-label="Call Now"
        data-ocid="contact.primary_button"
      >
        <Phone size={18} />
        <span className="hidden sm:inline">Call Now</span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/917248116630"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-green-600 transition-colors text-sm font-semibold"
        aria-label="WhatsApp"
        data-ocid="contact.secondary_button"
      >
        <SiWhatsapp size={18} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
