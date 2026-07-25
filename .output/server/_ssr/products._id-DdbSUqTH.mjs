import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { P as ProductCard } from "./product-card-Chu-68uQ.mjs";
import { b as Route, u as useCart } from "./router-D_0TxxYN.mjs";
import { u as useAuth } from "./use-auth-BS3YO_BT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as resolveImage } from "./image-C8nXBy0i.mjs";
import { l as Minus, i as Plus, c as ShoppingBag, H as Heart, T as Truck, S as Shield, q as RotateCcw } from "../_libs/lucide-react.mjs";
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
import "./logo-Kw5cEugR.mjs";
import "../_libs/zod.mjs";
function ProductPage() {
  const {
    id
  } = Route.useParams();
  const {
    addItem
  } = useCart();
  const {
    user
  } = useAuth();
  const {
    data: product,
    isLoading
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("products").select("*").eq("id", id).single();
      return data;
    }
  });
  const {
    data: related = []
  } = useQuery({
    queryKey: ["related", product?.category],
    enabled: !!product,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("products").select("*").eq("category", product.category).neq("id", id).limit(4);
      return data ?? [];
    }
  });
  const [imgIdx, setImgIdx] = reactExports.useState(0);
  const [size, setSize] = reactExports.useState("");
  const [color, setColor] = reactExports.useState("");
  const [qty, setQty] = reactExports.useState(1);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-aquila py-32 text-center text-muted-foreground", children: "جاري التحميل..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
  if (!product) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-aquila py-32 text-center", children: "المنتج غير موجود" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
  const handleAdd = () => {
    if (!size) return toast.error("اختر المقاس");
    if (!color) return toast.error("اختر اللون");
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color,
      quantity: qty
    });
    toast.success("تمت الإضافة للسلة ✓");
  };
  const handleWishlist = async () => {
    if (!user) return toast.error("يجب تسجيل الدخول أولاً");
    const {
      error
    } = await supabase.from("wishlist").insert({
      user_id: user.id,
      product_id: product.id
    });
    if (error) {
      if (error.code === "23505") toast.info("المنتج موجود بالفعل في المفضلة");
      else toast.error("حدث خطأ");
    } else toast.success("تمت الإضافة للمفضلة ✓");
  };
  const handleWhatsApp = () => {
    const msg = `مرحباً، أريد طلب: ${product.name} - المقاس: ${size || "-"} - اللون: ${color || "-"} - الكمية: ${qty}`;
    window.open(`https://wa.me/966500000000?text=${encodeURIComponent(msg)}`, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-aquila py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mb-6 tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-gold", children: "الرئيسية" }),
        " / ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-gold", children: "المتجر" }),
        " / ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: product.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-card border border-border/40 rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(product.images[imgIdx]), alt: product.name, width: 800, height: 1024, className: "h-full w-full object-cover" }) }),
          product.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: product.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setImgIdx(i), className: `aspect-square overflow-hidden rounded-sm border-2 transition-colors ${imgIdx === i ? "border-gold" : "border-border/40"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(img), alt: "", loading: "lazy", width: 200, height: 200, className: "h-full w-full object-cover" }) }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-gold", children: product.category === "hoodies" ? "هوديز" : "بناطيل" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-display mt-2 mb-4", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl text-gold font-semibold", children: [
                product.price,
                " ج.م"
              ] }),
              product.compare_price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-muted-foreground line-through", children: [
                product.compare_price,
                " ج.م"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-loose", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4 border-y border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-widest uppercase text-gold mb-3", children: "اللون" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.colors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setColor(c), className: `px-4 py-2 text-sm border rounded-sm transition-colors ${color === c ? "bg-gold text-gold-foreground border-gold" : "border-border hover:border-gold"}`, children: c }, c)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-widest uppercase text-gold mb-3", children: "المقاس" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSize(s), className: `min-w-12 h-11 px-3 text-sm border rounded-sm transition-colors ${size === s ? "bg-gold text-gold-foreground border-gold" : "border-border hover:border-gold"}`, children: s }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-widest uppercase text-gold mb-3", children: "الكمية" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center border border-border rounded-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "h-11 w-11 flex items-center justify-center hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 text-center font-medium", children: qty }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(qty + 1), className: "h-11 w-11 flex items-center justify-center hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleAdd, className: "flex-1 bg-gold text-gold-foreground py-4 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-all flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
              " أضف للسلة"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleWishlist, className: "h-14 w-14 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleWhatsApp, className: "w-full border border-gold/40 text-gold py-3 text-sm tracking-widest uppercase hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm", children: "اطلب عبر واتساب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 pt-6", children: [{
            i: Truck,
            t: "شحن مجاني"
          }, {
            i: Shield,
            t: "ضمان الجودة"
          }, {
            i: RotateCcw,
            t: "إرجاع ١٤ يوم"
          }].map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(it.i, { className: "h-5 w-5 mx-auto mb-2 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: it.t })
          ] }, idx)) })
        ] })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display mb-8", children: "منتجات مشابهة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ProductPage as component
};
