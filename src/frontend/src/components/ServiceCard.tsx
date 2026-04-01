import { BadgeCheck } from "lucide-react";

interface ServiceCardProps {
  name: string;
  description: string;
  image: string;
  index: number;
  onBook: (serviceName: string) => void;
}

export function ServiceCard({
  name,
  description,
  image,
  index,
  onBook,
}: ServiceCardProps) {
  return (
    <div
      className="service-card bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 flex flex-col"
      data-ocid={`services.item.${index}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 bg-gold text-midnight-dark text-xs font-bold px-2.5 py-1 rounded-full shadow">
            <BadgeCheck size={12} />
            Verified Local Pro
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-midnight text-lg leading-tight mb-1">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 flex-1">{description}</p>
        <p className="text-gold font-semibold text-xs mb-3">
          Expert Consultation — Book Now
        </p>
        <button
          type="button"
          onClick={() => onBook(name)}
          className="btn-gold w-full py-2.5 rounded-xl text-sm font-semibold hover:shadow-gold transition-shadow"
          data-ocid={`services.item.${index}.button`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
