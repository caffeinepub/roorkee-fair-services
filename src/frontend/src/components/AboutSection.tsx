import { MapPin, ShieldCheck, Star, Users } from "lucide-react";

const stats = [
  {
    icon: <Star size={22} />,
    label: "15+ Services",
    sub: "Home & digital categories",
  },
  {
    icon: <ShieldCheck size={22} />,
    label: "Verified Pros",
    sub: "Background-checked experts",
  },
  {
    icon: <Users size={22} />,
    label: "500+ Customers",
    sub: "Trusted in Roorkee",
  },
  { icon: <MapPin size={22} />, label: "2 Cities", sub: "Roorkee & Manglaur" },
];

const points = [
  "Founded locally in Roorkee with deep community roots",
  "All professionals are verified and background-checked",
  "Transparent consultation-based pricing — no hidden charges",
  "Fast response times — experts dispatched within hours",
  "Serving both Roorkee and Manglaur with equal dedication",
];

export function AboutSection() {
  return (
    <section className="py-8 px-4 max-w-3xl mx-auto" data-ocid="about.section">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-midnight mb-2">
          About Us
        </h2>
        <div className="w-16 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </div>

      <div className="bg-midnight rounded-2xl p-8 mb-6 text-center shadow-gold">
        <img
          src="/assets/generated/logo-transparent.dim_200x200.png"
          alt="Roorkee Fair Services"
          className="w-20 h-20 rounded-full mx-auto mb-5 border-4 border-gold object-cover"
        />
        <h3 className="font-display text-gold font-bold text-2xl mb-4">
          Roorkee Fair Services
        </h3>
        <p className="text-white/80 text-base leading-relaxed">
          Roorkee Fair Services is a premier local platform providing verified
          experts for all home and digital needs. We ensure quality, trust, and
          timely service across Roorkee and Manglaur.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 text-center shadow-card border border-gray-100"
            data-ocid={`about.item.${i + 1}`}
          >
            <div className="w-10 h-10 bg-gold/15 rounded-xl flex items-center justify-center mx-auto mb-3 text-gold">
              {stat.icon}
            </div>
            <p className="font-bold text-midnight font-display">{stat.label}</p>
            <p className="text-gray-400 text-xs mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
        <h4 className="font-display font-bold text-midnight text-lg mb-4">
          Why Choose Us?
        </h4>
        <ul className="space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="w-5 h-5 bg-gold rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                <span className="w-2 h-2 bg-midnight-dark rounded-full" />
              </span>
              <span className="text-gray-600 text-sm">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
