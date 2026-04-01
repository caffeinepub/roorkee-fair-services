import { Menu, X } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

export function Header({ onMenuToggle, sidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-midnight shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/logo-transparent.dim_200x200.png"
            alt="Roorkee Fair Services Logo"
            className="h-12 w-12 rounded-full object-cover border-2 border-gold"
          />
          <div>
            <h1 className="font-display text-lg font-bold text-gold leading-tight">
              Roorkee Fair Services
            </h1>
            <p className="text-xs text-white/70">
              Serving Roorkee &amp; Manglaur
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-gold hover:bg-midnight-light transition-colors"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          data-ocid="nav.toggle"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
