import heroImage from "@/assets/davidshill-exterior-1.jpeg";

const Hero = () => (
  <section id="top" className="relative min-h-screen w-full overflow-hidden">
    <img
      src={heroImage}
      alt="David's Hill luxury residence at dusk, Victoria Island Lagos"
      className="absolute inset-0 h-full w-full object-cover"
      fetchPriority="high"
    />
    <div className="absolute inset-0 bg-hero-gradient" />
    <div className="absolute inset-0 bg-background/30" />

    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
      <div className="max-w-3xl animate-fade-up">
        <p className="eyebrow mb-6">152B Ade Odedina · Victoria Island, Lagos</p>
        <h1 className="font-display text-5xl leading-[1.02] text-foreground text-balance md:text-7xl lg:text-[5.5rem]">
          A new altitude of <em className="text-primary not-italic">luxury living</em> on Victoria Island.
        </h1>
        <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-muted-foreground md:text-lg">
          David's Hill is an 8-storey architectural statement — twelve apartments and a singular penthouse,
          each thoughtfully crafted for those who appreciate quiet excellence.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#subscribe"
            className="inline-flex items-center gap-3 bg-red-gradient text-primary-foreground px-7 py-3.5 rounded-sm font-body text-xs uppercase tracking-[0.28em] shadow-elevated transition-transform hover:-translate-y-0.5"
          >
            Reserve Your Residence
          </a>
          <a
            href="#apartments"
            className="inline-flex items-center gap-3 border border-border text-foreground px-7 py-3.5 rounded-sm font-body text-xs uppercase tracking-[0.28em] hover:bg-secondary transition-colors"
          >
            View Apartments
          </a>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4 max-w-3xl">
        {[
          ["8", "Storeys"],
          ["13", "Residences"],
          ["4", "Bed Penthouse"],
          ["VI", "Lagos"],
        ].map(([k, v]) => (
          <div key={v}>
            <div className="font-display text-3xl text-foreground">{k}</div>
            <div className="mt-1 font-body text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{v}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
