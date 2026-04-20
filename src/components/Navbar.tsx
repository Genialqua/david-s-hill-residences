import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#residence", label: "The Residence" },
  { href: "#apartments", label: "Apartments" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#gallery", label: "Gallery" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#subscribe"
            className="font-body text-xs uppercase tracking-[0.22em] bg-red-gradient text-primary-foreground px-5 py-2.5 rounded-sm shadow-soft hover:opacity-90 transition-opacity"
          >
            Get Brochure
          </a>
        </nav>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-body py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground border-b border-border last:border-b-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#subscribe"
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 text-center font-body text-xs uppercase tracking-[0.22em] bg-red-gradient text-primary-foreground px-5 py-3 rounded-sm"
            >
              Get Brochure
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
