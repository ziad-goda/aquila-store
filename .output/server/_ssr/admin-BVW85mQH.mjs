import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { u as useAuth } from "./use-auth-BS3YO_BT.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
import { u as useQuery, a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as TrendingUp, P as Package, g as ShoppingCart, h as Users, i as Plus, j as SquarePen, k as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./router-D_0TxxYN.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zod.mjs";
import "./logo-Kw5cEugR.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function AdminPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("stats");
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({
        to: "/auth",
        search: {
          redirect: "/admin"
        }
      });
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle().then(({
      data
    }) => {
      setIsAdmin(!!data);
      if (!data) toast.error("ليس لديك صلاحية");
    });
  }, [user, loading, navigate]);
  if (loading || isAdmin === null) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-aquila py-32 text-center", children: "..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
  if (!isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-aquila py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display mb-4", children: "غير مصرّح" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "هذه الصفحة للمسؤولين فقط." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "لتفعيل المسؤول: شغّل في قاعدة البيانات: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { dir: "ltr", className: "text-gold", children: [
          "INSERT INTO user_roles (user_id, role) VALUES ('",
          user?.id,
          "', 'admin');"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-aquila py-12 min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display mb-8", children: "لوحة التحكم" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-8 border-b border-border/40 overflow-auto", children: [{
        v: "stats",
        l: "الإحصائيات",
        i: TrendingUp
      }, {
        v: "products",
        l: "المنتجات",
        i: Package
      }, {
        v: "orders",
        l: "الطلبات",
        i: ShoppingCart
      }, {
        v: "coupons",
        l: "الكوبونات",
        i: Users
      }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.v), className: `px-5 py-3 text-sm tracking-wider uppercase flex items-center gap-2 whitespace-nowrap ${tab === t.v ? "text-gold border-b-2 border-gold" : "text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(t.i, { className: "h-4 w-4" }),
        " ",
        t.l
      ] }, t.v)) }),
      tab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatsTab, {}),
      tab === "products" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsTab, {}),
      tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersTab, {}),
      tab === "coupons" && /* @__PURE__ */ jsxRuntimeExports.jsx(CouponsTab, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function StatsTab() {
  const {
    data: stats
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [p, o, oSum] = await Promise.all([supabase.from("products").select("*", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("*", {
        count: "exact",
        head: true
      }), supabase.from("orders").select("total")]);
      const revenue = (oSum.data ?? []).reduce((s, r) => s + Number(r.total), 0);
      return {
        products: p.count ?? 0,
        orders: o.count ?? 0,
        revenue
      };
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
    l: "المنتجات",
    v: stats?.products ?? 0
  }, {
    l: "الطلبات",
    v: stats?.orders ?? 0
  }, {
    l: "الإيرادات",
    v: `${(stats?.revenue ?? 0).toFixed(0)} ج.م`
  }].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border border-border/40 bg-card/50 rounded-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-widest uppercase text-gold mb-2", children: s.l }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display", children: s.v })
  ] }, i)) });
}
function ProductsTab() {
  const qc = useQueryClient();
  const [editing, setEditing] = reactExports.useState(null);
  const {
    data: products = []
  } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("products").select("*").order("created_at", {
        ascending: false
      });
      return data ?? [];
    }
  });
  const del = async (id) => {
    if (!confirm("حذف المنتج؟")) return;
    await supabase.from("products").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["adminProducts"]
    });
    toast.success("تم الحذف");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({}), className: "inline-flex items-center gap-2 bg-gold text-gold-foreground px-5 py-2.5 text-sm tracking-wider uppercase font-semibold rounded-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " منتج جديد"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto border border-border/40 rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-card text-xs tracking-widest uppercase text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "الاسم" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "الفئة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "السعر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "المخزون" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center", children: p.category === "hoodies" ? "هوديز" : "بناطيل" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center text-gold", children: p.price }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center", children: p.stock }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(p), className: "text-gold hover:opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => del(p.id), className: "text-destructive hover:opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, p.id)) })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, { initial: editing, onClose: () => {
      setEditing(null);
      qc.invalidateQueries({
        queryKey: ["adminProducts"]
      });
    } })
  ] });
}
function ProductForm({
  initial,
  onClose
}) {
  const [f, setF] = reactExports.useState({
    name: initial.name ?? "",
    description: initial.description ?? "",
    price: initial.price ?? 0,
    compare_price: initial.compare_price ?? null,
    category: initial.category ?? "hoodies",
    images: initial.images?.join("\n") ?? "",
    colors: initial.colors?.join(", ") ?? "",
    stock: initial.stock ?? 0,
    is_featured: initial.is_featured ?? false,
    is_new: initial.is_new ?? false,
    is_bestseller: initial.is_bestseller ?? false
  });
  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      name: f.name,
      description: f.description,
      price: Number(f.price),
      compare_price: f.compare_price ? Number(f.compare_price) : null,
      category: f.category,
      images: f.images.split("\n").map((s) => s.trim()).filter(Boolean),
      colors: f.colors.split(",").map((s) => s.trim()).filter(Boolean),
      stock: Number(f.stock),
      is_featured: f.is_featured,
      is_new: f.is_new,
      is_bestseller: f.is_bestseller
    };
    const {
      error
    } = initial.id ? await supabase.from("products").update(payload).eq("id", initial.id) : await supabase.from("products").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("تم الحفظ");
      onClose();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-background/90 backdrop-blur flex items-center justify-center p-4 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "bg-card border border-border max-w-2xl w-full p-6 rounded-sm space-y-3 max-h-[90vh] overflow-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-display border-b border-border/40 pb-3", children: [
      initial.id ? "تعديل" : "إضافة",
      " منتج"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الاسم", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: f.name, onChange: (e) => setF({
      ...f,
      name: e.target.value
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الوصف", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: f.description, onChange: (e) => setF({
      ...f,
      description: e.target.value
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "السعر", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", required: true, value: f.price, onChange: (e) => setF({
        ...f,
        price: Number(e.target.value)
      }), className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "السعر قبل الخصم", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: f.compare_price ?? "", onChange: (e) => setF({
        ...f,
        compare_price: e.target.value ? Number(e.target.value) : null
      }), className: inputCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الفئة", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: f.category, onChange: (e) => setF({
        ...f,
        category: e.target.value
      }), className: inputCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hoodies", children: "هوديز" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pants", children: "بناطيل" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "المخزون", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", required: true, value: f.stock, onChange: (e) => setF({
        ...f,
        stock: Number(e.target.value)
      }), className: inputCls }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الصور (رابط في كل سطر)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: f.images, onChange: (e) => setF({
      ...f,
      images: e.target.value
    }), className: inputCls, dir: "ltr" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الألوان (مفصولة بفواصل)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: f.colors, onChange: (e) => setF({
      ...f,
      colors: e.target.value
    }), className: inputCls }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 text-sm", children: [{
      k: "is_featured",
      l: "مميز"
    }, {
      k: "is_new",
      l: "جديد"
    }, {
      k: "is_bestseller",
      l: "الأكثر مبيعاً"
    }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: f[c.k], onChange: (e) => setF({
        ...f,
        [c.k]: e.target.checked
      }) }),
      c.l
    ] }, c.k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-3 border-t border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "px-5 py-2 border border-border text-sm rounded-sm", children: "إلغاء" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-5 py-2 bg-gold text-gold-foreground text-sm rounded-sm font-semibold", children: "حفظ" })
    ] })
  ] }) });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-1.5", children: label }),
    children
  ] });
}
const inputCls = "w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none";
function OrdersTab() {
  const qc = useQueryClient();
  const {
    data: orders = []
  } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("orders").select("*").order("created_at", {
        ascending: false
      });
      return data ?? [];
    }
  });
  const update = async (id, status) => {
    await supabase.from("orders").update({
      status
    }).eq("id", id);
    qc.invalidateQueries({
      queryKey: ["adminOrders"]
    });
    toast.success("تم التحديث");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto border border-border/40 rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-card text-xs tracking-widest uppercase text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "الرقم" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "العميل" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "الإجمالي" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "الحالة" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-gold", children: o.order_number }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: o.shipping_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
        Number(o.total).toFixed(2),
        " ج.م"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: o.status, onChange: (e) => update(o.id, e.target.value), className: "bg-input border border-border px-2 py-1 text-xs rounded-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "قيد المراجعة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "processing", children: "قيد التجهيز" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "shipped", children: "تم الشحن" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "delivered", children: "تم التسليم" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "ملغي" })
      ] }) })
    ] }, o.id)) })
  ] }) });
}
function CouponsTab() {
  const qc = useQueryClient();
  const {
    data: coupons = []
  } = useQuery({
    queryKey: ["adminCoupons"],
    queryFn: async () => (await supabase.from("coupons").select("*").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const [code, setCode] = reactExports.useState("");
  const [pct, setPct] = reactExports.useState(10);
  const add = async (e) => {
    e.preventDefault();
    const {
      error
    } = await supabase.from("coupons").insert({
      code: code.toUpperCase(),
      discount_percent: pct,
      active: true
    });
    if (error) toast.error(error.message);
    else {
      toast.success("تم الإضافة");
      setCode("");
      qc.invalidateQueries({
        queryKey: ["adminCoupons"]
      });
    }
  };
  const toggle = async (id, active) => {
    await supabase.from("coupons").update({
      active: !active
    }).eq("id", id);
    qc.invalidateQueries({
      queryKey: ["adminCoupons"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "flex flex-wrap gap-2 p-4 border border-border/40 bg-card/50 rounded-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: code, onChange: (e) => setCode(e.target.value), placeholder: "الكود", className: inputCls + " flex-1 min-w-40", dir: "ltr" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", min: 1, max: 100, value: pct, onChange: (e) => setPct(Number(e.target.value)), placeholder: "%", className: inputCls + " w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "bg-gold text-gold-foreground px-5 py-2 text-sm tracking-wider uppercase font-semibold rounded-sm", children: "إضافة" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: coupons.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-border/40 bg-card/50 rounded-sm flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-gold text-lg", children: c.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "خصم ",
          c.discount_percent,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggle(c.id, c.active), className: `text-xs px-3 py-1 border rounded-sm ${c.active ? "border-gold text-gold" : "border-border text-muted-foreground"}`, children: c.active ? "نشط" : "معطّل" })
    ] }, c.id)) })
  ] });
}
export {
  AdminPage as component
};
