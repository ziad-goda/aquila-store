import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart-provider";
import logo from "@/assets/logo.png";

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "الرئيسية" },
    { to: "/shop", label: "المتجر", search: {} },
    { to: "/about", label: "عن Aquila" },
    { to: "/contact", label: "تواصل" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container-aquila flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Aquila" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="font-display text-2xl font-semibold tracking-widest gradient-gold-text">AQUILA</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-wider uppercase text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/shop" className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/account" className="h-10 w-10 hidden sm:flex items-center justify-center rounded-full transition-colors hover:bg-secondary">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative h-10 w-10 flex items-center justify-center rounded-full transition-colors hover:bg-secondary">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-gold text-[10px] font-bold text-gold-foreground flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden h-10 w-10 flex items-center justify-center">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container-aquila py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base tracking-wider uppercase py-2 text-foreground/80 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/account" onClick={() => setOpen(false)} className="text-base tracking-wider uppercase py-2 hover:text-gold">
              حسابي
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
