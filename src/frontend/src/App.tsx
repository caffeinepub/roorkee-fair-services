import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AIChatWidget } from "./components/AIChatWidget";
import { AboutSection } from "./components/AboutSection";
import { BookingModal } from "./components/BookingModal";
import { ContactSection } from "./components/ContactSection";
import { FloatingButtons } from "./components/FloatingButtons";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ReviewsSection } from "./components/ReviewsSection";
import { ServicesSection } from "./components/ServicesSection";
import { Sidebar } from "./components/Sidebar";
import { TrackSection } from "./components/TrackSection";

const queryClient = new QueryClient();

type Section = "services" | "track" | "reviews" | "contact" | "about" | "chat";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("services");
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const handleNavigate = (section: Section) => {
    if (section === "chat") {
      setChatOpen(true);
      setActiveSection("services");
    } else {
      setActiveSection(section);
      setChatOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white font-body">
      <Header
        onMenuToggle={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
      />

      <Sidebar
        open={sidebarOpen}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pb-24">
        <AnimatePresence mode="wait">
          {activeSection === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <ServicesSection onBook={(name) => setBookingService(name)} />
            </motion.div>
          )}
          {activeSection === "track" && (
            <motion.div
              key="track"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <TrackSection />
            </motion.div>
          )}
          {activeSection === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <ReviewsSection />
            </motion.div>
          )}
          {activeSection === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <ContactSection />
            </motion.div>
          )}
          {activeSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <AboutSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Booking Modal */}
      {bookingService && (
        <BookingModal
          serviceName={bookingService}
          onClose={() => setBookingService(null)}
        />
      )}

      {/* Floating Buttons */}
      <FloatingButtons />

      {/* AI Chat Widget - pass open state from sidebar nav */}
      <AIChatWidgetControlled
        externalOpen={chatOpen}
        onExternalClose={() => setChatOpen(false)}
      />

      <Toaster />
    </div>
  );
}

function AIChatWidgetControlled({
  externalOpen,
  onExternalClose,
}: {
  externalOpen: boolean;
  onExternalClose: () => void;
}) {
  // AIChatWidget manages its own open state; we just open it externally
  return (
    <AIChatWidget
      initialOpen={externalOpen}
      onExternalClose={onExternalClose}
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
