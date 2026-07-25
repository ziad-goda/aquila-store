import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { P as ProductCard } from "./product-card-Chu-68uQ.mjs";
import { a as Route$1 } from "./router-D_0TxxYN.mjs";
import "../_libs/sonner.mjs";
import { b as Search } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./image-C8nXBy0i.mjs";
import "../_libs/zod.mjs";
function ShopPage() {
  const {
    category: catParam
  } = Route$1.useSearch();
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(catParam ?? "all");
  const [size, setSize] = reactExports.useState("all");
  const [color, setColor] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("new");
  const [maxPrice, setMaxPrice] = reactExports.useState(1500);
  const {
    data: products = []
  } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("products").select("*");
      return data ?? [];
    }
  });
  const filtered = reactExports.useMemo(() => {
    let arr = [...products];
    if (category !== "all") arr = arr.filter((p) => p.category === category);
    if (search) arr = arr.filter((p) => p.name.includes(search));
    if (size !== "all") arr = arr.filter((p) => p.sizes.includes(size));
    if (color !== "all") arr = arr.filter((p) => p.colors.includes(color));
    arr = arr.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    else if (sort === "bestseller") arr.sort((a, b) => Number(b.is_bestseller) - Number(a.is_bestseller));
    else arr.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return arr;
  }, [products, category, search, size, color, sort, maxPrice]);
  const allColors = reactExports.useMemo(() => Array.from(new Set(products.flatMap((p) => p.colors))), [products]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-aquila py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-gold", children: "المتجر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-display mt-2", children: "مجموعتنا" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:w-64 space-y-6 lg:sticky lg:top-24 lg:self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "بحث...", className: "w-full bg-input border border-border pr-10 pl-3 py-2.5 text-sm focus:border-gold focus:outline-none rounded-sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { title: "الفئة", children: [{
            v: "all",
            l: "الكل"
          }, {
            v: "hoodies",
            l: "هوديز"
          }, {
            v: "pants",
            l: "بناطيل"
          }].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCategory(o.v), className: `block w-full text-right py-1.5 text-sm transition-colors ${category === o.v ? "text-gold" : "text-muted-foreground hover:text-foreground"}`, children: o.l }, o.v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { title: "المقاس", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["all", "S", "M", "L", "XL", "XXL"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSize(s), className: `min-w-10 h-9 px-3 text-xs border rounded-sm transition-colors ${size === s ? "bg-gold text-gold-foreground border-gold" : "border-border hover:border-gold"}`, children: s === "all" ? "الكل" : s }, s)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { title: "اللون", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: color, onChange: (e) => setColor(e.target.value), className: "w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "جميع الألوان" }),
            allColors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { title: `السعر: حتى ${maxPrice} ج.م`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 100, max: 1500, step: 50, value: maxPrice, onChange: (e) => setMaxPrice(+e.target.value), className: "w-full accent-[var(--gold)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { title: "ترتيب", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "الأحدث" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bestseller", children: "الأكثر مبيعاً" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-asc", children: "السعر: من الأقل" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-desc", children: "السعر: من الأعلى" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground mb-4", children: [
            filtered.length,
            " منتج"
          ] }),
          filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-muted-foreground", children: "لا توجد منتجات مطابقة" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function FilterGroup({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs tracking-widest uppercase text-gold mb-3", children: title }),
    children
  ] });
}
export {
  ShopPage as component
};
