import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function ContactSection() {
  return (
    <section
      className="py-8 px-4 max-w-2xl mx-auto"
      data-ocid="contact.section"
    >
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-midnight mb-2">
          Contact Us
        </h2>
        <p className="text-gray-500">We're here to help, 7 days a week</p>
        <div className="w-16 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </div>

      <div className="space-y-4">
        <a
          href="tel:+917248116630"
          className="flex items-center gap-4 bg-midnight rounded-2xl p-5 text-white hover:bg-midnight-light transition-colors group"
          data-ocid="contact.link"
        >
          <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
            <Phone size={22} className="text-gold" />
          </div>
          <div>
            <p className="text-white/60 text-xs mb-0.5">Call Us</p>
            <p className="font-bold text-lg">+91 7248116630</p>
          </div>
        </a>

        <a
          href="https://wa.me/917248116630"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-green-600 rounded-2xl p-5 text-white hover:bg-green-700 transition-colors group"
          data-ocid="contact.link"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <SiWhatsapp size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white/70 text-xs mb-0.5">WhatsApp</p>
            <p className="font-bold text-lg">+91 7248116630</p>
          </div>
        </a>

        <a
          href="mailto:Roorkeefairservices@gmail.com"
          className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover:shadow-gold transition-shadow group"
          data-ocid="contact.link"
        >
          <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail size={22} className="text-gold" />
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Email</p>
            <p className="font-bold text-midnight">
              Roorkeefairservices@gmail.com
            </p>
          </div>
        </a>

        <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-card">
          <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin size={22} className="text-gold" />
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Location</p>
            <p className="font-bold text-midnight">Roorkee, Uttarakhand</p>
            <p className="text-gray-500 text-sm">Serving Roorkee & Manglaur</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gold/10 rounded-2xl p-5 border border-gold/20">
          <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={22} className="text-gold" />
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Working Hours</p>
            <p className="font-bold text-midnight">Available 7 days a week</p>
            <p className="text-gold font-semibold text-sm">8:00 AM — 8:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
