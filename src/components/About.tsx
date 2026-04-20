import exterior from "@/assets/davidshill-exterior-2.jpeg";

const About = () => (
  <section id="residence" className="relative bg-background py-24 lg:py-32">
    <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
      <div>
        <p className="eyebrow mb-4">The Residence</p>
        <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          Crafted with quiet conviction. Designed for a discerning few.
        </h2>
        <div className="hairline mt-8 h-px w-16 bg-primary" />
        <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-muted-foreground">
          <p>
            Set on a privileged corner of Ade Odedina Street, David's Hill rises eight storeys above Victoria Island —
            a study in restrained modernism, warm timbers, and sculpted balconies that catch the Lagos light.
          </p>
          <p>
            Inside, twelve generously proportioned apartments and a single penthouse offer the rarest commodity
            in the city: stillness. Floor-to-ceiling glass frames the skyline; finishes are specified with the
            patience of a private residence.
          </p>
          <p className="text-foreground">
            <strong className="font-display text-xl text-primary">387%</strong> projected ROI.
            <span className="ml-2">A lifestyle, and an investment.</span>
          </p>
        </div>
      </div>

      <div className="relative">
        <img
          src={exterior}
          alt="David's Hill exterior architectural detail with timber and ribbon balconies"
          className="aspect-[3/4] w-full object-cover rounded-sm shadow-elevated"
          loading="lazy"
        />
        <div className="absolute -bottom-6 -left-6 hidden bg-card border border-border px-6 py-5 shadow-soft sm:block">
          <p className="eyebrow mb-1">Developer</p>
          <p className="font-display text-lg text-foreground">360 Distinct Real Estate</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
