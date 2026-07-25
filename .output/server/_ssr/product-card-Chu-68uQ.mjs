import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as resolveImage } from "./image-C8nXBy0i.mjs";
function ProductCard({ product }) {
  const discount = product.compare_price ? Math.round((product.compare_price - product.price) / product.compare_price * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/products/$id",
      params: { id: product.id },
      className: "group block animate-fade-up",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-card border border-border/40 rounded-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: resolveImage(product.images[0]),
              alt: product.name,
              loading: "lazy",
              width: 800,
              height: 1024,
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex flex-col gap-1.5", children: [
            product.is_new && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-widest uppercase bg-gold text-gold-foreground px-2.5 py-1 rounded-sm font-semibold", children: "جديد" }),
            discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] tracking-widest uppercase bg-destructive text-destructive-foreground px-2.5 py-1 rounded-sm font-semibold", children: [
              "-",
              discount,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-medium text-foreground group-hover:text-gold transition-colors", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-gold font-semibold", children: [
              product.price,
              " ج.م"
            ] }),
            product.compare_price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground line-through", children: [
              product.compare_price,
              " ج.م"
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
