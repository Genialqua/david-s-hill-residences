import g1 from "@/assets/davidshill-exterior-1.jpeg";
import g2 from "@/assets/davidshill-exterior-2.jpeg";

const Gallery = () => (
  <section id="gallery" className="relative bg-background py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4">Gallery</p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            A study in light & line.
          </h2>
        </div>
        <p className="max-w-md font-body text-sm text-muted-foreground">
          Architectural renderings — final finishes and details may be refined during construction.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7 md:row-span-2">
          <img src={g2} alt="David's Hill — full elevation, dusk" className="h-full w-full object-cover rounded-sm shadow-soft" loading="lazy" />
        </div>
        <div className="md:col-span-5">
          <img src={g1} alt="David's Hill — façade detail" className="aspect-[4/3] w-full object-cover rounded-sm shadow-soft" loading="lazy" />
        </div>
        <div className="md:col-span-5">
          <div className="flex h-full min-h-[200px] flex-col justify-between bg-card border border-border p-8 rounded-sm">
            <p className="eyebrow">By the Numbers</p>
            <div>
              <div className="font-display text-5xl text-foreground">8</div>
              <div className="mt-1 font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Storey luxury build</div>
            </div>
            <div>
              <div className="font-display text-5xl text-primary">13</div>
              <div className="mt-1 font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Total residences</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
