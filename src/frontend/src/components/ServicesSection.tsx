import { ServiceCard } from "./ServiceCard";

const SERVICES = [
  {
    name: "Electrician & Motor Repair",
    description: "Wiring, motor repair, panel fixing & more",
    image: "/assets/generated/service-electrician.dim_400x300.jpg",
  },
  {
    name: "Plumber",
    description: "Pipe fitting, leak repair, bathroom fittings",
    image: "/assets/generated/service-plumber.dim_400x300.jpg",
  },
  {
    name: "Carpenter",
    description: "Furniture making, repair & wood work",
    image: "/assets/generated/service-carpenter.dim_400x300.jpg",
  },
  {
    name: "CCTV Installation",
    description: "Home & office security camera setup",
    image: "/assets/generated/service-cctv.dim_400x300.jpg",
  },
  {
    name: "Daily Wage Labour & Mazdoor",
    description: "Reliable daily wage workers for any task",
    image: "/assets/generated/service-labour.dim_400x300.jpg",
  },
  {
    name: "Home Cleaners",
    description: "Deep cleaning, sanitization & housekeeping",
    image: "/assets/generated/service-cleaners.dim_400x300.jpg",
  },
  {
    name: "Civil Engineer",
    description: "Construction supervision & structural work",
    image: "/assets/generated/service-civil-engineer.dim_400x300.jpg",
  },
  {
    name: "Car Washer",
    description: "Thorough car wash at your doorstep",
    image: "/assets/generated/service-car-washer.dim_400x300.jpg",
  },
  {
    name: "Painter",
    description: "Interior & exterior painting services",
    image: "/assets/generated/service-painter.dim_400x300.jpg",
  },
  {
    name: "POP/Ceiling Work",
    description: "Decorative plaster & false ceiling design",
    image: "/assets/generated/service-pop-ceiling.dim_400x300.jpg",
  },
  {
    name: "Gardener",
    description: "Garden maintenance, trimming & landscaping",
    image: "/assets/generated/service-gardener.dim_400x300.jpg",
  },
  {
    name: "AC Service",
    description: "AC cleaning, gas refill & repair",
    image: "/assets/generated/service-ac.dim_400x300.jpg",
  },
  {
    name: "Refrigerator Repair",
    description: "All fridge brands, cooling & compressor repair",
    image: "/assets/generated/service-refrigerator.dim_400x300.jpg",
  },
  {
    name: "Mobile & Smartphone Repair",
    description: "Expert screen, battery & software fix",
    image: "/assets/generated/service-mobile-repair.dim_400x300.jpg",
  },
  {
    name: "Laptop & Computer Repair",
    description: "Hardware & Windows/Software solutions",
    image: "/assets/generated/service-laptop-repair.dim_400x300.jpg",
  },
  {
    name: "Solar Installation & Services",
    description: "Solar panel setup, maintenance & repair",
    image: "/assets/generated/service-solar.dim_400x300.jpg",
  },
  {
    name: "Flooring Specialists",
    description: "Tiles & stone work, expert flooring solutions",
    image: "/assets/generated/service-flooring.dim_400x300.jpg",
  },
  {
    name: "Vehicle Services",
    description: "Car & bus repair, full vehicle maintenance",
    image: "/assets/generated/service-vehicle.dim_400x300.jpg",
  },
  {
    name: "Taxi & Travelers",
    description: "Tour & bus booking, local & outstation travel",
    image: "/assets/generated/service-taxi.dim_400x300.jpg",
  },
  {
    name: "Generator Services (Jantar)",
    description: "Heavy-duty diesel generators for homes, shops & industry",
    image: "/assets/generated/generator-services.dim_800x600.jpg",
  },
  {
    name: "Generator Repair",
    description: "Expert generator repair & maintenance for all brands",
    image: "/assets/generated/service-generator-repair.dim_400x300.jpg",
  },
  {
    name: "Generator for Rent",
    description: "Generator rental for weddings, events & shops",
    image: "/assets/generated/service-generator-rent.dim_400x300.jpg",
  },
];

interface ServicesSectionProps {
  onBook: (serviceName: string) => void;
}

export function ServicesSection({ onBook }: ServicesSectionProps) {
  return (
    <section id="services" className="py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-midnight mb-2">
          Our Services
        </h2>
        <p className="text-gray-500 text-base">
          Verified professionals for every home & digital need in Roorkee and
          Manglaur
        </p>
        <div className="w-16 h-1 bg-gold mx-auto mt-3 rounded-full" />
      </div>
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        data-ocid="services.list"
      >
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={service.name}
            name={service.name}
            description={service.description}
            image={service.image}
            index={index + 1}
            onBook={onBook}
          />
        ))}
      </div>
    </section>
  );
}
