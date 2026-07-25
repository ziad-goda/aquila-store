import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { P as ProductCard } from "./product-card-Chu-68uQ.mjs";
import { h as heroImg } from "./hero-D0OkvIfl.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, T as Truck, S as Shield, R as RefreshCw, a as Star } from "../_libs/lucide-react.mjs";
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
import "./router-D_0TxxYN.mjs";
import "../_libs/zod.mjs";
import "./logo-Kw5cEugR.mjs";
import "./image-C8nXBy0i.mjs";
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedSection, { title: "الأكثر مبيعاً", filter: "bestseller" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandStory, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedSection, { title: "وصل حديثاً", filter: "new" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reviews, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Newsletter, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[92vh] min-h-[600px] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Aquila Collection", width: 1920, height: 1280, className: "absolute inset-0 h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-background/95 via-background/60 to-background/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container-aquila h-full flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm tracking-[0.3em] uppercase text-gold mb-6 block", children: "مجموعة الشتاء ٢٠٢٦" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.05] mb-6", children: [
        "فخامة ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-gold-text", children: "الستريت وير" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "تبدأ هنا"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed", children: "Aquila — حيث تلتقي الأناقة بالقوة. هوديز وبناطيل فاخرة مصممة لمن يصنعون قواعدهم الخاصة." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "group inline-flex items-center gap-3 bg-gold text-gold-foreground px-8 py-4 text-sm tracking-widest uppercase font-semibold shadow-gold transition-all hover:gap-5", children: [
          "تسوق الآن ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 transition-transform group-hover:-translate-x-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "inline-flex items-center gap-3 border border-border px-8 py-4 text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors", children: "قصة Aquila" })
      ] })
    ] }) })
  ] });
}
function Features() {
  const items = [{
    icon: Truck,
    title: "شحن مجاني",
    desc: "للطلبات فوق ٥٠٠ ج.م"
  }, {
    icon: Shield,
    title: "ضمان الجودة",
    desc: "خامات فاخرة معتمدة"
  }, {
    icon: RefreshCw,
    title: "إرجاع سهل",
    desc: "خلال ١٤ يوم"
  }, {
    icon: Star,
    title: "تصاميم حصرية",
    desc: "إصدارات محدودة"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border/40 bg-card/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-aquila grid grid-cols-2 md:grid-cols-4 gap-6 py-12", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full border border-gold/30 flex items-center justify-center text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: it.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: it.desc })
    ] })
  ] }, it.title)) }) });
}
function FeaturedSection({
  title,
  filter
}) {
  const {
    data: products = []
  } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      let q = supabase.from("products").select("*").limit(4);
      if (filter === "bestseller") q = q.eq("is_bestseller", true);
      else if (filter === "new") q = q.eq("is_new", true);
      else q = q.eq("is_featured", true);
      const {
        data
      } = await q;
      return data ?? [];
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-gold", children: "المجموعة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-display mt-2", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "hidden sm:flex items-center gap-2 text-sm tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors", children: [
        "عرض الكل ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
  ] }) });
}
function BrandStory() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-card/30 border-y border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila grid md:grid-cols-2 gap-16 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-gold", children: "قصتنا" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-display mt-3 mb-6", children: [
        "النسر الذي يحلق ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-gold-text", children: "فوق المألوف" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-loose mb-4", children: "وُلدت Aquila من إيمان عميق بأن الأزياء ليست مجرد ملابس، بل لغة. لغة القوة، الثقة، والتفرّد. كل قطعة من Aquila تحكي قصة الحرفية المتقنة والرؤية الجريئة." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-loose mb-8", children: "نختار خاماتنا من أفضل المصادر العالمية، ونصمم كل تفصيلة لتكون شهادة على ذوقك الراقي." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", className: "inline-flex items-center gap-3 text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors", children: [
        "اكتشف المزيد ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Aquila Story", loading: "lazy", width: 800, height: 1e3, className: "absolute inset-0 h-full w-full object-cover rounded-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border border-gold/20 rounded-sm translate-x-6 translate-y-6 -z-10" })
    ] })
  ] }) });
}
function Reviews() {
  const reviews = [{
    name: "أحمد ع.",
    text: "جودة لا تُصدّق! الهودي يبدو ويُحس وكأنه قطعة فنية. سأطلب المزيد بالتأكيد.",
    rating: 5
  }, {
    name: "خالد م.",
    text: "أفضل خامة جربتها على الإطلاق. التصميم بسيط لكن يلفت الانتباه فوراً.",
    rating: 5
  }, {
    name: "محمد س.",
    text: "البنطلون مريح جداً وقصته مثالية. خدمة العملاء ممتازة أيضاً.",
    rating: 5
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-gold", children: "آراء عملائنا" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-display mt-2", children: "ما يقولونه عن Aquila" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: reviews.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 border border-border/40 bg-card/50 rounded-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4 text-gold", children: Array.from({
        length: r.rating
      }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" }, idx)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/90 leading-loose mb-6", children: [
        '"',
        r.text,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gold tracking-wider", children: [
        "— ",
        r.name
      ] })
    ] }, i)) })
  ] }) });
}
function Newsletter() {
  const [email, setEmail] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-card/40 border-t border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila max-w-2xl text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-gold", children: "نشرتنا البريدية" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-display mt-3 mb-4", children: "كن أول من يعرف" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "اشترك لتصلك أحدث المجموعات والعروض الحصرية قبل الجميع." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      toast.success("تم الاشتراك بنجاح ✓");
      setEmail("");
    }, className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "بريدك الإلكتروني", className: "flex-1 bg-background border border-border px-5 py-3 text-sm focus:border-gold focus:outline-none rounded-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-gold text-gold-foreground px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity rounded-sm", children: "اشترك" })
    ] })
  ] }) });
}
export {
  HomePage as component
};
