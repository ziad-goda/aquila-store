import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { u as useAuth } from "./use-auth-BS3YO_BT.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as resolveImage } from "./image-C8nXBy0i.mjs";
import { e as ShieldCheck, L as LogOut, U as User, P as Package, H as Heart } from "../_libs/lucide-react.mjs";
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
function AccountPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("profile");
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth",
      search: {
        redirect: "/account"
      }
    });
  }, [loading, user, navigate]);
  const {
    data: isAdmin
  } = useQuery({
    queryKey: ["isAdmin", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      return !!data;
    }
  });
  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate({
      to: "/"
    });
  };
  if (loading || !user) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-aquila py-32 text-center", children: "..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-aquila py-12 min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display", children: "حسابي" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: user.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-2 px-4 py-2 border border-gold text-gold text-sm tracking-wider uppercase rounded-sm hover:bg-gold hover:text-gold-foreground transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
            " لوحة التحكم"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: signOut, className: "inline-flex items-center gap-2 px-4 py-2 border border-border text-sm tracking-wider uppercase rounded-sm hover:border-destructive hover:text-destructive transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            " خروج"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-1", children: [{
          v: "profile",
          l: "الملف الشخصي",
          i: User
        }, {
          v: "orders",
          l: "طلباتي",
          i: Package
        }, {
          v: "wishlist",
          l: "المفضلة",
          i: Heart
        }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.v), className: `w-full text-right px-4 py-3 flex items-center gap-3 rounded-sm transition-colors ${tab === t.v ? "bg-gold/10 text-gold" : "hover:bg-secondary"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(t.i, { className: "h-4 w-4" }),
          " ",
          t.l
        ] }, t.v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
          tab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTab, { userId: user.id }),
          tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersTab, { userId: user.id }),
          tab === "wishlist" && /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistTab, { userId: user.id })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function ProfileTab({
  userId
}) {
  const [profile, setProfile] = reactExports.useState({
    full_name: "",
    phone: "",
    address: "",
    city: ""
  });
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle().then(({
      data
    }) => {
      if (data) setProfile({
        full_name: data.full_name ?? "",
        phone: data.phone ?? "",
        address: data.address ?? "",
        city: data.city ?? ""
      });
    });
  }, [userId]);
  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const {
      error
    } = await supabase.from("profiles").upsert({
      id: userId,
      ...profile
    });
    setSaving(false);
    if (error) toast.error("حدث خطأ");
    else toast.success("تم الحفظ ✓");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-4 p-6 border border-border/40 bg-card/50 rounded-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display border-b border-border/40 pb-3", children: "الملف الشخصي" }),
    [{
      k: "full_name",
      l: "الاسم الكامل"
    }, {
      k: "phone",
      l: "الجوال"
    }, {
      k: "address",
      l: "العنوان"
    }, {
      k: "city",
      l: "المدينة"
    }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: f.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile[f.k], onChange: (e) => setProfile({
        ...profile,
        [f.k]: e.target.value
      }), className: "w-full bg-input border border-border px-4 py-2.5 text-sm rounded-sm focus:border-gold focus:outline-none" })
    ] }, f.k)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "bg-gold text-gold-foreground px-8 py-3 text-sm tracking-widest uppercase font-semibold rounded-sm disabled:opacity-50", children: saving ? "..." : "حفظ" })
  ] });
}
function OrdersTab({
  userId
}) {
  const {
    data: orders = []
  } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("orders").select("*, order_items(*)").eq("user_id", userId).order("created_at", {
        ascending: false
      });
      return data ?? [];
    }
  });
  const statusLabel = {
    pending: "قيد المراجعة",
    processing: "قيد التجهيز",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
    cancelled: "ملغي"
  };
  if (orders.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center text-muted-foreground border border-border/40 rounded-sm", children: "لا توجد طلبات" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border border-border/40 bg-card/50 rounded-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-gold", children: o.order_number }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleDateString("ar-SA") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-3 py-1 border border-gold/40 text-gold rounded-sm", children: statusLabel[o.status] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground mb-2", children: [
      o.order_items?.length ?? 0,
      " منتج"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-gold font-semibold", children: [
      Number(o.total).toFixed(2),
      " ج.م"
    ] })
  ] }, o.id)) });
}
function WishlistTab({
  userId
}) {
  const {
    data: items = [],
    refetch
  } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("wishlist").select("*, products(*)").eq("user_id", userId);
      return data ?? [];
    }
  });
  const remove = async (id) => {
    await supabase.from("wishlist").delete().eq("id", id);
    refetch();
    toast.success("تم الحذف");
  };
  if (items.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center text-muted-foreground border border-border/40 rounded-sm", children: "قائمة الأمنيات فارغة" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: items.map((it) => it.products && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-border/40 bg-card/50 rounded-sm flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(it.products.images[0]), alt: "", width: 100, height: 120, className: "w-20 h-24 object-cover rounded-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: {
          id: it.products.id
        }, className: "font-medium hover:text-gold", children: it.products.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gold mt-1", children: [
          it.products.price,
          " ج.م"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(it.id), className: "text-xs text-destructive self-start", children: "حذف" })
    ] })
  ] }, it.id)) });
}
export {
  AccountPage as component
};
