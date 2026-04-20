import { Shield, Car, Wifi, Zap, Sun, Sparkles, Leaf, Bell } from "lucide-react";

const amenities = [
  { icon: Bell, title: "Concierge", desc: "Discreet, attentive service from arrival to departure." },
  { icon: Shield, title: "24/7 Security", desc: "Layered access control with on-site personnel." },
  { icon: Car, title: "Secure Parking", desc: "Covered residential parking on the ground level." },
  { icon: Wifi, title: "High-Speed Internet", desc: "Fibre infrastructure delivered to every residence." },
  { icon: Zap, title: "Backup Power", desc: "Uninterrupted power across all apartments and common areas." },
  { icon: Sun, title: "Solar Integration", desc: "Sustainable energy supplementing day-to-day living." },
  { icon: Leaf, title: "Sustainable Build", desc: "Energy-saving systems, water conservation, low-VOC materials." },
  { icon: Sparkles, title: "Premium Finishes", desc: "Curated stone, joinery and lighting throughout." },
];

const Amenities = () => (
  <section id="amenities" className="relative bg-background py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">Amenities</p>
        <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          Considered comforts. Quietly delivered.
        </h2>
      </div>

      <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {amenities.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-background p-8 transition-colors hover:bg-card"
          >
            <Icon size={22} className="text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
            <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Amenities;
