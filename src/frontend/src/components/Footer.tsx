import { Mail, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );
  return (
    <footer className="bg-midnight text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/logo-transparent.dim_200x200.png"
              alt="Roorkee Fair Services"
              className="h-12 w-12 rounded-full object-cover border-2 border-gold"
            />
            <div>
              <p className="font-display font-bold text-gold">
                Roorkee Fair Services
              </p>
              <p className="text-white/50 text-xs">Roorkee, Uttarakhand</p>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1 text-sm">
            <a
              href="tel:+917248116630"
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <Phone size={14} />
              +91 7248116630
            </a>
            <a
              href="mailto:Roorkeefairservices@gmail.com"
              className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors"
            >
              <Mail size={14} />
              Roorkeefairservices@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {year} Roorkee Fair Services. All rights reserved.</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
