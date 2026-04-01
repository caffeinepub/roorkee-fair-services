import { CheckCircle, Clock, MapPin, Navigation } from "lucide-react";

const statusSteps = [
  { label: "Booking Confirmed", done: true, time: "10:00 AM" },
  { label: "Technician Assigned", done: true, time: "10:05 AM" },
  { label: "Technician En Route", done: true, time: "10:15 AM" },
  { label: "Technician Arrived", done: false, time: "~10:27 AM" },
];

export function TrackSection() {
  return (
    <section className="py-8 px-4 max-w-2xl mx-auto" data-ocid="track.section">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-midnight mb-2">
          Track Technician
        </h2>
        <p className="text-gray-500">
          Real-time status of your service request
        </p>
        <div className="w-16 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </div>

      <div className="bg-midnight rounded-2xl overflow-hidden shadow-gold mb-6">
        <div className="relative h-64 bg-gradient-to-br from-midnight to-midnight-light flex items-center justify-center">
          {/* Simulated map grid */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            viewBox="0 0 400 300"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 60}
                x2="400"
                y2={i * 60}
                stroke="white"
                strokeWidth="1"
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={`v${i}`}
                x1={i * 60}
                y1="0"
                x2={i * 60}
                y2="300"
                stroke="white"
                strokeWidth="1"
              />
            ))}
          </svg>

          {/* Road lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 400 300"
            aria-hidden="true"
          >
            <path
              d="M0 150 Q100 100 200 150 T400 150"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray="20,10"
            />
            <path
              d="M200 0 Q180 100 200 150 T220 300"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray="20,10"
            />
          </svg>

          <div className="absolute top-8 right-16">
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle size={16} className="text-white" />
            </div>
            <p className="text-white text-xs mt-1 text-center">Your Location</p>
          </div>

          <div className="relative">
            <div className="ping-slow absolute -inset-4 bg-gold/30 rounded-full" />
            <div className="relative w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-gold border-4 border-white">
              <Navigation size={24} className="text-midnight" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gold" />
              <span className="text-white font-semibold text-sm">
                ETA: ~12 minutes
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
        <h3 className="font-display font-bold text-midnight text-lg mb-4">
          Service Status
        </h3>
        <div className="space-y-4">
          {statusSteps.map((step) => (
            <div key={step.label} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.done ? "bg-gold" : "bg-gray-200"
                }`}
              >
                {step.done ? (
                  <CheckCircle size={16} className="text-midnight" />
                ) : (
                  <MapPin size={16} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-semibold text-sm ${step.done ? "text-midnight" : "text-gray-400"}`}
                >
                  {step.label}
                </p>
              </div>
              <span className="text-xs text-gray-400">{step.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gold/10 rounded-xl border border-gold/30">
          <div className="flex items-center gap-2">
            <Navigation size={18} className="text-gold" />
            <p className="text-midnight font-semibold text-sm">
              Your technician is en route — arriving in approximately 12
              minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
