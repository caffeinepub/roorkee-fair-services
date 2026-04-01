import {
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Section = "services" | "track" | "reviews" | "contact" | "about" | "chat";

interface SidebarProps {
  open: boolean;
  activeSection: Section;
  onNavigate: (section: Section) => void;
  onClose: () => void;
}

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "services", label: "Services", icon: <Wrench size={20} /> },
  { id: "track", label: "Track Technician", icon: <MapPin size={20} /> },
  { id: "reviews", label: "Reviews", icon: <Star size={20} /> },
  { id: "contact", label: "Contact Us", icon: <Phone size={20} /> },
  { id: "about", label: "About Us", icon: <Info size={20} /> },
  { id: "chat", label: "AI Chat", icon: <MessageCircle size={20} /> },
];

export function Sidebar({
  open,
  activeSection,
  onNavigate,
  onClose,
}: SidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed left-0 top-0 h-full w-72 bg-midnight z-50 flex flex-col shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/generated/logo-transparent.dim_200x200.png"
                  alt="Logo"
                  className="h-10 w-10 rounded-full object-cover border-2 border-gold"
                />
                <span className="font-display text-gold font-bold text-base">
                  Roorkee Fair Services
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-white/60 hover:text-gold transition-colors"
                aria-label="Close sidebar"
                data-ocid="nav.close_button"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  data-ocid={`nav.${item.id}.link`}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-gold/10 text-gold border-r-4 border-gold"
                      : "text-white/80 hover:bg-white/5 hover:text-gold"
                  }`}
                >
                  <span
                    className={
                      activeSection === item.id ? "text-gold" : "text-white/50"
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="font-body font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-white/10">
              <p className="text-white/40 text-xs text-center">
                &copy; {new Date().getFullYear()} Roorkee Fair Services
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
