import { MapPin } from "lucide-react";

const Location = () => (
  <section id="location" className="relative bg-secondary/40 py-24 lg:py-32">
    <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
      <div>
        <p className="eyebrow mb-4">Location</p>
        <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          The most sought-after address on the island.
        </h2>
        <div className="hairline mt-8 h-px w-16 bg-primary" />
        <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-muted-foreground">
          <p>
            <span className="text-foreground font-medium">152B, Ade Odedina Street, Victoria Island, Lagos.</span>
            {" "}A quiet, residential pocket of Lagos's most prestigious district — moments from the Lagoon,
            premier dining, international embassies, and the city's financial core.
          </p>
          <p>
            Victoria Island remains the benchmark for cosmopolitan living in West Africa: a market defined by
            scarcity, quality, and enduring demand.
          </p>
        </div>

        <div className="mt-10 flex items-start gap-4 border border-border bg-card p-6 rounded-sm">
          <MapPin size={20} className="text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-display text-lg text-foreground">152B Ade Odedina Street</p>
            <p className="font-body text-sm text-muted-foreground">Victoria Island, Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      <div className="relative aspect-square overflow-hidden rounded-sm border border-border shadow-soft">
        <iframe
          title="David's Hill location map"
          src="https://www.google.com/maps?q=Ade+Odedina+Street,+Victoria+Island,+Lagos&output=embed"
          className="h-full w-full grayscale contrast-110"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

export default Location;
