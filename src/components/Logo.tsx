import logo from "@/assets/davidshill-logo.jpeg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => (
  <a href="#top" className={`inline-flex items-center gap-3 ${className}`} aria-label="David's Hill home">
    <img
      src={logo}
      alt="David's Hill"
      className="h-10 w-10 object-cover rounded-full border border-border"
      loading="eager"
    />
    <span className="font-display text-lg tracking-wide text-foreground">
      David<span className="text-primary">'s</span>Hill
    </span>
  </a>
);

export default Logo;
