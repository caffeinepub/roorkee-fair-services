import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Info,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "./hooks/useQueries";

// ─── Data ──────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "electrician-motor",
    name: "Electrician & Motor Repair",
    tagline: "Wiring, motor winding & repairs",
    image: "/assets/generated/service-electrician-motor.dim_600x400.jpg",
  },
  {
    id: "plumber",
    name: "Plumber",
    tagline: "Leaks, pipes & fittings",
    image: "/assets/generated/service-plumber.dim_600x400.jpg",
  },
  {
    id: "carpenter",
    name: "Carpenter",
    tagline: "Furniture, doors & woodwork",
    image: "/assets/generated/service-carpenter.dim_600x400.jpg",
  },
  {
    id: "cctv",
    name: "CCTV Installation",
    tagline: "Security cameras & surveillance",
    image: "/assets/generated/service-cctv.dim_600x400.jpg",
  },
  {
    id: "labour",
    name: "Daily Wage Labour & Mazdoor",
    tagline: "Construction & loading work",
    image: "/assets/generated/service-labour.dim_600x400.jpg",
  },
  {
    id: "cleaner",
    name: "Home Cleaners",
    tagline: "Deep clean & housekeeping",
    image: "/assets/generated/service-cleaner.dim_600x400.jpg",
  },
  {
    id: "civil",
    name: "Civil Engineer",
    tagline: "Construction & structural work",
    image: "/assets/generated/service-civil.dim_600x400.jpg",
  },
  {
    id: "carwash",
    name: "Car Washer",
    tagline: "Wash, polish & detailing",
    image: "/assets/generated/service-carwash.dim_600x400.jpg",
  },
  {
    id: "painter",
    name: "Painter",
    tagline: "Wall painting & finishing",
    image: "/assets/generated/service-painter.dim_600x400.jpg",
  },
  {
    id: "pop",
    name: "POP / Ceiling Work",
    tagline: "False ceiling & plaster design",
    image: "/assets/generated/service-pop.dim_600x400.jpg",
  },
  {
    id: "gardener",
    name: "Gardener",
    tagline: "Garden care & landscaping",
    image: "/assets/generated/service-gardener.dim_600x400.jpg",
  },
  {
    id: "ac",
    name: "AC Service",
    tagline: "Service, repair & installation",
    image: "/assets/generated/service-ac-repair.dim_600x400.jpg",
  },
  {
    id: "fridge",
    name: "Refrigerator Repair",
    tagline: "Cooling & compressor repairs",
    image: "/assets/generated/service-fridge.dim_600x400.jpg",
  },
  {
    id: "mobile-repair",
    name: "Mobile & Smartphone Repair",
    tagline: "Expert screen, battery, and software fix",
    image: "/assets/generated/service-mobile-repair.dim_600x400.jpg",
  },
  {
    id: "laptop-repair",
    name: "Laptop & Computer Repair",
    tagline: "Hardware and Windows/Software solutions",
    image: "/assets/generated/service-laptop-repair.dim_600x400.jpg",
  },
];

const REVIEWS = [
  {
    name: "Rajesh Kumar",
    location: "Civil Lines, Roorkee",
    rating: 5,
    text: "Excellent electrician service! Came on time and fixed the wiring issue quickly. Very professional and affordable.",
    avatar: "RK",
  },
  {
    name: "Priya Sharma",
    location: "Model Town, Roorkee",
    rating: 5,
    text: "The plumber was fantastic. Resolved our leakage problem in under an hour. Will definitely book again!",
    avatar: "PS",
  },
  {
    name: "Anil Verma",
    location: "IIT Campus, Roorkee",
    rating: 4,
    text: "Great carpentry work for my new bookshelf. Clean work, quality material. Highly recommended.",
    avatar: "AV",
  },
  {
    name: "Sunita Devi",
    location: "Jwalapur, Roorkee",
    rating: 5,
    text: "AC was not cooling for weeks. The technician diagnosed and fixed it in 45 minutes. Amazing service!",
    avatar: "SD",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

// ─── Sub-components ────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.map((k, i) => (
        <Star
          key={k}
          className={`w-4 h-4 ${
            i < count
              ? "fill-[oklch(0.78_0.14_85)] text-[oklch(0.78_0.14_85)]"
              : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-gold text-midnight-deep text-[10px] font-bold px-2 py-0.5 rounded-full">
      ✓ Verified Local Pro
    </span>
  );
}

// ─── Booking Modal ─────────────────────────────────────────────────────────

interface BookingModalProps {
  service: (typeof SERVICES)[0] | null;
  onClose: () => void;
}

function BookingModal({ service, onClose }: BookingModalProps) {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.area) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!actor || !service) return;
    setLoading(true);
    try {
      await actor.bookService(form.name, form.phone, form.area, service.name);

      // TODO: Replace with your actual EmailJS keys from emailjs.com
      // Fire-and-forget email notification to admin
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_rfs",
          template_id: "template_booking_notify",
          user_id: "YOUR_EMAILJS_PUBLIC_KEY",
          template_params: {
            to_email: "Roorkeefairservices@gmail.com",
            customer_name: form.name,
            phone: form.phone,
            service: service.name,
            location: form.area,
          },
        }),
      }).catch(() => {
        // Silent fail — booking already confirmed
      });

      toast.success("Booking confirmed! We'll call you shortly.");
      onClose();
      setForm({ name: "", phone: "", area: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="booking.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-midnight-deep">
            Book {service?.name}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="book-name">Full Name</Label>
            <Input
              id="book-name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              data-ocid="booking.name.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="book-phone">Phone Number</Label>
            <Input
              id="book-phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              data-ocid="booking.phone.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="book-area">Area / Location</Label>
            <Input
              id="book-area"
              placeholder="e.g. Civil Lines, Model Town..."
              value={form.area}
              onChange={(e) => setForm((p) => ({ ...p, area: e.target.value }))}
              data-ocid="booking.area.input"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gold text-midnight-deep hover:bg-gold-dark font-semibold"
            disabled={loading}
            data-ocid="booking.submit_button"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Track Technician Screen ────────────────────────────────────────────────

function TrackTechnicianSection() {
  return (
    <section
      id="track"
      className="py-16 md:py-20"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.94 0.025 255) 0%, oklch(0.97 0.015 255) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gold text-midnight-deep mb-3">
            <Navigation className="w-3.5 h-3.5" /> Live Tracking
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-midnight-deep mb-3">
            Track My Technician
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            See your assigned technician's real-time location as they travel to
            your home.
          </p>
        </motion.div>

        {/* Status Banner */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Technician is on the way • ETA: ~12 min
          </span>
        </div>

        {/* Simulated Map */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-card border border-border"
          style={{ height: "360px" }}
          data-ocid="track.canvas_target"
        >
          {/* Map background */}
          <div
            className="absolute inset-0"
            style={{
              background: "oklch(0.22 0.04 220)",
              backgroundImage: `
                linear-gradient(oklch(0.28 0.04 220) 1px, transparent 1px),
                linear-gradient(90deg, oklch(0.28 0.04 220) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Road lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(oklch(0.30 0.05 220) 2px, transparent 2px),
                linear-gradient(90deg, oklch(0.30 0.05 220) 2px, transparent 2px)
              `,
              backgroundSize: "120px 120px",
              opacity: 0.6,
            }}
          />

          {/* Route dotted line */}
          <svg
            role="img"
            aria-label="Route path to your location"
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 360"
            preserveAspectRatio="none"
          >
            <path
              d="M 60 54 Q 120 100, 160 150 Q 200 200, 200 288"
              stroke="oklch(0.78 0.14 85)"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.7"
            />
          </svg>

          {/* Technician marker (animated) */}
          <div
            className="absolute"
            style={{
              animation: "technician-move 8s ease-in-out infinite alternate",
              top: "15%",
              left: "15%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-gold"
                style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
              />
              <div className="relative w-10 h-10 rounded-full bg-gold border-2 border-white shadow-gold flex items-center justify-center">
                <span className="text-midnight-deep text-xs font-bold">RK</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-white text-[10px] font-semibold bg-midnight-deep/80 px-2 py-0.5 rounded">
                  Technician
                </span>
              </div>
            </div>
          </div>

          {/* User location marker (fixed) */}
          <div
            className="absolute"
            style={{
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-white text-[10px] font-semibold bg-midnight-deep/80 px-2 py-0.5 rounded">
                  Your Location
                </span>
              </div>
            </div>
          </div>

          {/* Map label */}
          <div className="absolute top-3 right-3">
            <span className="text-white/50 text-[10px] font-medium bg-black/30 px-2 py-1 rounded">
              Roorkee, Uttarakhand
            </span>
          </div>
        </div>

        {/* Technician Info Card */}
        <div className="mt-5 bg-white rounded-2xl p-5 shadow-card border border-border flex flex-col sm:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-midnight-deep flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            RK
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-midnight-deep text-lg">
              Rajesh Kumar
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <StarRating count={5} />
              <span className="text-sm text-muted-foreground">
                4.8 · Electrician & Motor Repair
              </span>
            </div>
          </div>
          <a
            href="tel:+917248116630"
            className="flex items-center gap-2 bg-gold text-midnight-deep font-semibold px-5 py-2.5 rounded-full hover:bg-gold-dark transition-colors shadow-gold"
            data-ocid="track.call.button"
          >
            <Phone className="w-4 h-4" />
            Call Technician
          </a>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          ⚠️ Live tracking is simulated for demo. Real GPS integration available
          on upgrade.
        </p>
      </div>
    </section>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingService, setBookingService] = useState<
    (typeof SERVICES)[0] | null
  >(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const submitContact = useSubmitContact();

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Track Technician", href: "#track" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact Us", href: "#contact" },
    { label: "About Us", href: "#about" },
  ];

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    try {
      await submitContact.mutateAsync({
        name: contactForm.name,
        email: contactForm.phone,
        message: `Service: ${contactForm.service}\n\n${contactForm.message}`,
      });
      toast.success("Request sent! We'll call you shortly.");
      setContactForm({ name: "", phone: "", service: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster />

      {/* ── Booking Modal ── */}
      <BookingModal
        service={bookingService}
        onClose={() => setBookingService(null)}
      />

      {/* ── HEADER ── */}
      <header
        id="home"
        className="sticky top-0 z-40 border-b border-border"
        style={{
          background: "oklch(0.18 0.06 255 / 0.97)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5">
              <img
                src="/assets/generated/roorkee-app-icon-transparent.dim_512x512.png"
                alt="Roorkee Fair Services Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="font-display font-bold text-base text-white leading-tight block">
                  Roorkee Fair
                </span>
                <span className="text-[11px] text-gold -mt-0.5 block">
                  Services
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-gold transition-colors"
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:+917248116630"
                className="hidden md:flex items-center gap-2 bg-gold text-midnight-deep font-semibold text-sm px-4 py-2 rounded-full hover:bg-gold-dark transition-colors"
                data-ocid="header.call.primary_button"
              >
                <Phone className="w-3.5 h-3.5" /> Call Now
              </a>

              {/* Mobile Sidebar Trigger */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
                    data-ocid="header.menu.toggle"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-72 p-0"
                  style={{ background: "oklch(0.16 0.06 255)" }}
                >
                  <SheetHeader className="px-5 pt-5 pb-4 border-b border-white/10">
                    <SheetTitle asChild>
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/generated/roorkee-app-icon-transparent.dim_512x512.png"
                          alt="Roorkee Fair Services Logo"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-display font-bold text-base text-white leading-tight">
                            Roorkee Fair
                          </p>
                          <p className="text-[11px] text-gold -mt-0.5">
                            Services
                          </p>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="px-4 py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-gold hover:bg-white/5 transition-colors"
                        data-ocid={`sidebar.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                      >
                        {link.label === "Services" && (
                          <Star className="w-4 h-4 text-gold" />
                        )}
                        {link.label === "Track Technician" && (
                          <Navigation className="w-4 h-4 text-gold" />
                        )}
                        {link.label === "Reviews" && (
                          <Users className="w-4 h-4 text-gold" />
                        )}
                        {link.label === "Contact Us" && (
                          <Phone className="w-4 h-4 text-gold" />
                        )}
                        {link.label === "About Us" && (
                          <Info className="w-4 h-4 text-gold" />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <div className="px-4 mt-4">
                    <a
                      href="tel:+917248116630"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-center gap-2 bg-gold text-midnight-deep font-semibold py-3 rounded-full w-full hover:bg-gold-dark transition-colors"
                      data-ocid="sidebar.call.primary_button"
                    >
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                    <a
                      href="https://wa.me/917248116630"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-center gap-2 mt-3 font-semibold py-3 rounded-full w-full text-white border border-white/20 hover:border-green-400 hover:text-green-400 transition-colors text-sm"
                      data-ocid="sidebar.whatsapp.primary_button"
                    >
                      <svg
                        role="img"
                        aria-label="WhatsApp"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Us
                    </a>
                  </div>

                  {/* Sidebar footer */}
                  <div className="absolute bottom-5 left-0 right-0 px-5">
                    <p className="text-white/30 text-xs text-center">
                      Roorkee & Manglaur · Open 8AM–9PM
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.05 255) 0%, oklch(0.22 0.07 258) 60%, oklch(0.28 0.09 260) 100%)",
          minHeight: "560px",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "oklch(0.78 0.14 85)" }}
        />
        <div
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full opacity-5"
          style={{ background: "oklch(0.78 0.14 85)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border border-gold/40 text-gold mb-5">
              🏆 Roorkee's Most Trusted Service Provider
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Professional Services{" "}
              <span className="text-gold">at Your Doorstep</span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 mb-8 max-w-xl">
              Verified local experts for 15+ home & digital services across
              Roorkee and Manglaur. Fast, affordable, trusted.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-white text-midnight-deep hover:bg-white/90 font-semibold rounded-full px-7"
                data-ocid="hero.explore.primary_button"
              >
                <a href="#services">
                  Explore Services <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gold text-midnight-deep hover:bg-gold-dark font-semibold rounded-full px-7"
                data-ocid="hero.track.secondary_button"
              >
                <a href="#track">
                  <Navigation className="w-4 h-4 mr-2" />
                  Track My Technician
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: Users, label: "500+ Happy Customers" },
                { icon: CheckCircle2, label: "Same-Day Service" },
                { icon: Star, label: "Verified Professionals" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-gold" />
                  <span className="text-white/85 text-sm font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-16 md:py-20 bg-midnight-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gold text-midnight-deep mb-3">
              15 Services Available
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-midnight-deep mb-3">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              All services include expert consultation. Book now and our
              professional will contact you within minutes.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
            data-ocid="services.list"
          >
            {SERVICES.map((svc, idx) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                data-ocid={`services.item.${idx + 1}`}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                style={{ minHeight: "280px" }}
              >
                {/* Photo */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const parent = el.parentElement;
                      if (parent) {
                        parent.style.background =
                          "linear-gradient(135deg, oklch(0.18 0.06 255), oklch(0.28 0.09 260))";
                      }
                    }}
                  />
                </div>
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                {/* Verified badge */}
                <div className="absolute top-3 left-3 z-10">
                  <VerifiedBadge />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-4">
                  <p className="text-gold text-[11px] font-semibold mb-1">
                    Expert Consultation · Book Now
                  </p>
                  <h3 className="text-base font-bold text-white leading-tight mb-0.5">
                    {svc.name}
                  </h3>
                  <p className="text-white/70 text-xs mb-3">{svc.tagline}</p>
                  <button
                    type="button"
                    onClick={() => setBookingService(svc)}
                    className="w-full bg-gold text-midnight-deep text-sm font-semibold py-2 rounded-xl hover:bg-gold-dark transition-colors"
                    data-ocid={`services.${svc.id}.primary_button`}
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK TECHNICIAN ── */}
      <TrackTechnicianSection />

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-16 md:py-20 bg-midnight-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gold text-midnight-deep mb-3">
              Customer Reviews
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-midnight-deep mb-3">
              What Roorkee Says
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Thousands of happy homes in Roorkee. Here's what they say about
              us.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            data-ocid="reviews.list"
          >
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                data-ocid={`reviews.item.${idx + 1}`}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <StarRating count={review.rating} />
                <p className="text-sm text-foreground/80 mt-3 mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-midnight-deep flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section
        id="about"
        className="py-16 md:py-24"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.05 255) 0%, oklch(0.20 0.07 258) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gold text-midnight-deep mb-5">
              <Info className="w-3 h-3" /> About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Who We Are
            </h2>
            <div
              className="rounded-2xl p-8 md:p-12 border border-gold/20 relative overflow-hidden"
              style={{ background: "oklch(0.18 0.06 255 / 0.7)" }}
            >
              {/* Gold decorative accent */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full"
                style={{ background: "oklch(0.78 0.14 85)" }}
              />
              <img
                src="/assets/generated/roorkee-app-icon-transparent.dim_512x512.png"
                alt="Roorkee Fair Services"
                className="w-16 h-16 rounded-full mx-auto mb-6 object-cover border-2 border-gold/40"
              />
              <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium">
                Roorkee Fair Services is a premier local platform providing
                verified experts for all home and digital needs. We ensure
                quality, trust, and timely service across{" "}
                <span className="text-gold font-semibold">Roorkee</span> and{" "}
                <span className="text-gold font-semibold">Manglaur</span>.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                {[
                  { value: "500+", label: "Happy Customers" },
                  { value: "15+", label: "Services" },
                  { value: "100%", label: "Verified Pros" },
                  { value: "Same Day", label: "Response" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-gold font-display text-2xl font-bold">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gold text-midnight-deep mb-3">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-midnight-deep mb-3">
              Contact Us
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Fill in the form and our team will call you back within minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={handleContactSubmit}
              className="space-y-5"
              data-ocid="contact.form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, name: e.target.value }))
                    }
                    data-ocid="contact.name.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input
                    id="contact-phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    data-ocid="contact.phone.input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Service Required</Label>
                <Select
                  value={contactForm.service}
                  onValueChange={(v) =>
                    setContactForm((p) => ({ ...p, service: v }))
                  }
                >
                  <SelectTrigger data-ocid="contact.service.select">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((svc) => (
                      <SelectItem key={svc.id} value={svc.name}>
                        {svc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message (Optional)</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Describe the issue..."
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="contact.message.textarea"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-midnight-deep hover:bg-midnight-mid text-white"
                disabled={submitContact.isPending}
                data-ocid="contact.submit_button"
              >
                {submitContact.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Request
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>

              {submitContact.isSuccess && (
                <div
                  className="flex items-center gap-2 text-green-700 text-sm"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Request sent! We'll call you shortly.
                </div>
              )}
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div
                className="rounded-2xl p-7 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.18 0.06 255), oklch(0.26 0.08 258))",
                }}
                data-ocid="contact.info.card"
              >
                <h3 className="font-display text-xl font-bold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <a
                    href="tel:+917248116630"
                    className="flex items-start gap-4 group"
                    data-ocid="contact.phone.link"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-0.5">
                        Phone / WhatsApp
                      </p>
                      <p className="text-white font-bold text-lg group-hover:text-gold transition-colors">
                        +91 7248116630
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:Roorkeefairservices@gmail.com"
                    className="flex items-start gap-4 group"
                    data-ocid="contact.email.link"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-0.5">Email</p>
                      <p className="text-white font-medium text-sm group-hover:text-gold transition-colors break-all">
                        Roorkeefairservices@gmail.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-0.5">Location</p>
                      <p className="text-white font-medium text-sm">
                        Roorkee & Manglaur, Uttarakhand
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-0.5">
                        Business Hours
                      </p>
                      <p className="text-white font-medium text-sm">
                        Mon–Sun, 8:00 AM – 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6 border border-gold/30"
                style={{ background: "oklch(0.98 0.02 85)" }}
              >
                <p className="font-semibold text-midnight-deep mb-2">
                  ⚡ Quick Response Guaranteed
                </p>
                <p className="text-sm text-muted-foreground">
                  Our team typically responds within 15 minutes during business
                  hours. For urgent services, call or WhatsApp directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="text-white py-12"
        style={{ background: "oklch(0.12 0.04 255)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/assets/generated/roorkee-app-icon-transparent.dim_512x512.png"
                  alt="Roorkee Fair Services Logo"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="font-display font-bold text-lg">
                  Roorkee Fair Services
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Roorkee's trusted partner for all home repair and maintenance
                needs. Verified, reliable, affordable.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gold">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: "Services", href: "#services" },
                  { label: "Track Technician", href: "#track" },
                  { label: "Reviews", href: "#reviews" },
                  { label: "Contact Us", href: "#contact" },
                  { label: "About Us", href: "#about" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-gold text-sm transition-colors"
                      data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gold">Contact Us</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+917248116630"
                    className="text-white/70 hover:text-gold text-sm transition-colors flex items-center gap-2"
                    data-ocid="footer.phone.link"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    +91 7248116630
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Roorkeefairservices@gmail.com"
                    className="text-white/70 hover:text-gold text-sm transition-colors flex items-center gap-2"
                    data-ocid="footer.email.link"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    Roorkeefairservices@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/917248116630"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-gold text-sm transition-colors flex items-center gap-2"
                    data-ocid="footer.whatsapp.link"
                  >
                    <span className="text-green-400">💬</span>
                    WhatsApp Us
                  </a>
                </li>
                <li className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
                  Roorkee & Manglaur, Uttarakhand
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-sm">
            <span>
              © {new Date().getFullYear()} Roorkee Fair Services. All rights
              reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP (bottom-left) ── */}
      <motion.a
        href="https://wa.me/917248116630"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 text-white rounded-full px-4 py-3 shadow-lg"
        style={{ background: "#25D366" }}
        data-ocid="whatsapp.open_modal_button"
      >
        <svg
          role="img"
          aria-label="WhatsApp"
          viewBox="0 0 24 24"
          className="w-5 h-5 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="text-sm font-semibold">WhatsApp</span>
      </motion.a>

      {/* ── FLOATING CALL NOW (bottom-right) ── */}
      <motion.a
        href="tel:+917248116630"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gold text-midnight-deep rounded-full px-4 py-3 shadow-gold"
        data-ocid="callnow.primary_button"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-semibold">Call Now</span>
      </motion.a>
    </div>
  );
}
