import { Check } from "lucide-react";

const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG");

const apartments = [
  {
    name: "2-Bedroom + BQ",
    units: "6 Residences",
    price: 700_000_000,
    features: [
      "Open-plan living & dining",
      "Two ensuite bedrooms",
      "Private boys' quarter",
      "Sculpted balcony",
      "Premium finishes throughout",
    ],
    accent: false,
  },
  {
    name: "3-Bedroom + BQ",
    units: "6 Residences",
    price: 800_000_000,
    features: [
      "Three ensuite bedrooms",
      "Expansive living areas",
      "Private boys' quarter",
      "Dual-aspect balconies",
      "Designer kitchen",
    ],
    accent: true,
  },
  {
    name: "4-Bedroom Penthouse",
    units: "1 Residence · Top Floor",
    price: 1_400_000_000,
    features: [
      "Four ensuite bedrooms",
      "Private boys' quarter",
      "Panoramic skyline terrace",
      "Owner's lounge & study",
      "Bespoke finishes",
    ],
    accent: false,
  },
];

const Apartments = () => (
  <section id="apartments" className="relative bg-secondary/40 py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="max-w-2xl">
        <p className="eyebrow mb-4">The Apartments</p>
        <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          Thirteen residences. Each one, a private chapter.
        </h2>
        <p className="mt-6 font-body text-base text-muted-foreground">
          Selectively crafted to feel like a private home, every apartment at David's Hill is finished to a uniform
          standard of excellence.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {apartments.map((a) => (
          <article
            key={a.name}
            className={`relative flex flex-col bg-card border ${
              a.accent ? "border-primary shadow-elevated" : "border-border"
            } p-8 lg:p-10 rounded-sm transition-transform hover:-translate-y-1 duration-500`}
          >
            {a.accent && (
              <div className="absolute -top-3 left-8 bg-red-gradient px-3 py-1 rounded-sm">
                <span className="font-body text-[10px] uppercase tracking-[0.24em] text-primary-foreground">
                  Most Sought After
                </span>
              </div>
            )}

            <p className="eyebrow">{a.units}</p>
            <h3 className="mt-3 font-display text-3xl text-foreground">{a.name}</h3>
            <div className="hairline mt-6 h-px w-12 bg-primary" />

            <div className="mt-6">
              <div className="font-display text-3xl text-foreground">{formatNaira(a.price)}</div>
              <div className="mt-1 font-body text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Asking Price
              </div>
            </div>

            <ul className="mt-8 space-y-3 font-body text-sm text-muted-foreground">
              {a.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#subscribe"
              className="mt-10 inline-flex items-center justify-center border border-border text-foreground px-6 py-3 rounded-sm font-body text-xs uppercase tracking-[0.28em] hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
            >
              Request Details
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Apartments;
