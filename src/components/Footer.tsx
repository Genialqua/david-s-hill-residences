import Logo from "./Logo";
import { Instagram, Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://instagram.com/davidshill", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/davidshill", Icon: Facebook },
  { label: "LinkedIn", href: "https://linkedin.com/company/davidshill", Icon: Linkedin },
  { label: "Twitter / X", href: "https://twitter.com/davidshill", Icon: Twitter },
  { label: "WhatsApp", href: "https://wa.me/2348000000000", Icon: MessageCircle },
];

const Footer = () => (
  <footer className="border-t border-border bg-background py-14">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
      <div className="lg:col-span-2">
        <Logo />
        <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-muted-foreground">
          An 8-storey luxury residence on Victoria Island, Lagos. Developed and delivered by 360 Distinct Real Estate.
        </p>

        <div className="mt-7">
          <p className="eyebrow mb-3">Follow</p>
          <ul className="flex flex-wrap items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`David's Hill on ${label}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary hover:bg-primary/5"
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <p className="eyebrow mb-4">Address</p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          152B, Ade Odedina Street<br />
          Victoria Island<br />
          Lagos, Nigeria
        </p>
      </div>

      <div>
        <p className="eyebrow mb-4">Enquiries</p>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          Reserve a private viewing or request the project brochure via the form above.
        </p>
      </div>
    </div>

    <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-border px-6 pt-6 sm:flex-row sm:items-center lg:px-10">
      <p className="font-body text-xs text-muted-foreground">
        © {new Date().getFullYear()} 360 Distinct Real Estate Ltd. All rights reserved.
      </p>
      <p className="font-body text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        David's Hill · Victoria Island
      </p>
    </div>
  </footer>
);

export default Footer;
