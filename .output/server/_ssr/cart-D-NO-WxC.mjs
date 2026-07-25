import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { u as useCart } from "./router-D_0TxxYN.mjs";
import { r as resolveImage } from "./image-C8nXBy0i.mjs";
import "../_libs/sonner.mjs";
import { c as ShoppingBag, l as Minus, i as Plus, k as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./logo-Kw5cEugR.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    total
  } = useCart();
  const shipping = total > 500 ? 0 : 30;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-aquila py-12 min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display mb-8", children: "سلة التسوق" }),
      items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-16 w-16 mx-auto text-muted-foreground mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "سلتك فارغة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "inline-block bg-gold text-gold-foreground px-8 py-3 text-sm tracking-widest uppercase font-semibold", children: "تسوق الآن" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4 border border-border/40 bg-card/50 rounded-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(it.image), alt: it.name, width: 120, height: 150, className: "w-24 h-32 object-cover rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: it.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                "المقاس: ",
                it.size,
                " • اللون: ",
                it.color
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gold font-semibold mt-2", children: [
                it.price,
                " ج.م"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center border border-border rounded-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateQuantity(it.productId, it.size, it.color, it.quantity - 1), className: "h-8 w-8 flex items-center justify-center hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm", children: it.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateQuantity(it.productId, it.size, it.color, it.quantity + 1), className: "h-8 w-8 flex items-center justify-center hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(it.productId, it.size, it.color), className: "text-destructive hover:opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] }, `${it.productId}-${it.size}-${it.color}`)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 lg:self-start p-6 border border-border/40 bg-card/50 rounded-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display border-b border-border/40 pb-3", children: "ملخص الطلب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المجموع الفرعي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              total.toFixed(2),
              " ج.م"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الشحن" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: shipping === 0 ? "مجاني" : `${shipping} ج.م` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-semibold border-t border-border/40 pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الإجمالي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold", children: [
              (total + shipping).toFixed(2),
              " ج.م"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "block w-full text-center bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold mt-4 shadow-gold hover:opacity-90 transition-opacity", children: "إتمام الطلب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "block text-center text-sm text-muted-foreground hover:text-gold mt-2", children: "متابعة التسوق" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CartPage as component
};
