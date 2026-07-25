import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCart } from "./router-D_0TxxYN.mjs";
import { l as logo } from "./logo-Kw5cEugR.mjs";
import { b as Search, U as User, c as ShoppingBag, X, M as Menu, I as Instagram, d as Twitter, F as Facebook } from "../_libs/lucide-react.mjs";
function Header() {
  const { count } = useCart();
  const [open, setOpen] = reactExports.useState(false);
  const links = [
    { to: "/", label: "الرئيسية" },
    { to: "/shop", label: "المتجر", search: {} },
    { to: "/about", label: "عن Aquila" },
    { to: "/contact", label: "تواصل" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila flex h-20 items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Aquila", width: 40, height: 40, className: "h-10 w-10 object-contain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-semibold tracking-widest gradient-gold-text", children: "AQUILA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-10", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          className: "text-sm tracking-wider uppercase text-foreground/80 transition-colors hover:text-gold",
          activeProps: { className: "text-gold" },
          activeOptions: { exact: l.to === "/" },
          children: l.label
        },
        l.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", className: "h-10 w-10 hidden sm:flex items-center justify-center rounded-full transition-colors hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", className: "relative h-10 w-10 flex items-center justify-center rounded-full transition-colors hover:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }),
          count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -left-1 h-5 w-5 rounded-full bg-gold text-[10px] font-bold text-gold-foreground flex items-center justify-center", children: count })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(!open), className: "md:hidden h-10 w-10 flex items-center justify-center", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" }) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden border-t border-border/40 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "container-aquila py-6 flex flex-col gap-4", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          onClick: () => setOpen(false),
          className: "text-base tracking-wider uppercase py-2 text-foreground/80 hover:text-gold",
          children: l.label
        },
        l.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", onClick: () => setOpen(false), className: "text-base tracking-wider uppercase py-2 hover:text-gold", children: "حسابي" })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border/40 bg-card mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila py-16 grid grid-cols-2 md:grid-cols-4 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl tracking-widest gradient-gold-text", children: "AQUILA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed", children: "علامة الستريت وير الفاخرة. تصاميم حصرية تجمع بين الأناقة والقوة." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 mt-6", children: [Instagram, Twitter, Facebook].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm tracking-widest uppercase text-gold mb-4", children: "المتجر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", search: { category: "hoodies" }, className: "hover:text-foreground", children: "الهوديز" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", search: { category: "pants" }, className: "hover:text-foreground", children: "البناطيل" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-foreground", children: "جميع المنتجات" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm tracking-widest uppercase text-gold mb-4", children: "الشركة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-foreground", children: "عن Aquila" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-foreground", children: "تواصل معنا" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", className: "hover:text-foreground", children: "حسابي" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm tracking-widest uppercase text-gold mb-4", children: "المساعدة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "الشحن والإرجاع" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "دليل المقاسات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "الأسئلة الشائعة" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila py-6 text-center text-xs text-muted-foreground tracking-wider", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " AQUILA. جميع الحقوق محفوظة."
    ] }) })
  ] });
}
export {
  Footer as F,
  Header as H
};
