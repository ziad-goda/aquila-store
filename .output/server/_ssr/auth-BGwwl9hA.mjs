import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as logo } from "./logo-Kw5cEugR.mjs";
import { R as Route$5 } from "./router-D_0TxxYN.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function AuthPage() {
  const {
    redirect
  } = Route$5.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      if (session) navigate({
        to: redirect ?? "/account"
      });
    });
  }, [redirect, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
            data: {
              full_name: name
            }
          }
        });
        if (error) throw error;
        toast.success("تم إنشاء حسابك ✓");
        navigate({
          to: redirect ?? "/account"
        });
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("مرحباً بعودتك ✓");
        navigate({
          to: redirect ?? "/account"
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toast.error(msg.includes("Invalid") ? "بيانات غير صحيحة" : msg.includes("already") ? "البريد مسجّل بالفعل" : msg);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen flex items-center justify-center px-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex flex-col items-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Aquila", width: 64, height: 64, className: "h-16 w-16 object-contain" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl tracking-widest gradient-gold-text mt-2", children: "AQUILA" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 border border-border/40 bg-card/60 rounded-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-border/40 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("login"), className: `flex-1 pb-3 text-sm tracking-widest uppercase ${mode === "login" ? "text-gold border-b-2 border-gold" : "text-muted-foreground"}`, children: "دخول" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("signup"), className: `flex-1 pb-3 text-sm tracking-widest uppercase ${mode === "signup" ? "text-gold border-b-2 border-gold" : "text-muted-foreground"}`, children: "تسجيل" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: "الاسم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: name, onChange: (e) => setName(e.target.value), className: "w-full bg-input border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: "البريد الإلكتروني" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full bg-input border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm", dir: "ltr" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: "كلمة المرور" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full bg-input border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50", children: loading ? "جاري..." : mode === "login" ? "دخول" : "إنشاء حساب" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block text-center text-sm text-muted-foreground hover:text-gold mt-6", children: "← العودة للمتجر" })
  ] }) });
}
export {
  AuthPage as component
};
