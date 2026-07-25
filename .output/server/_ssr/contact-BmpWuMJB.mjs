import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as Mail, n as Phone, o as MapPin, p as MessageCircle } from "../_libs/lucide-react.mjs";
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
import "./router-D_0TxxYN.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
import "./logo-Kw5cEugR.mjs";
function ContactPage() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const submit = (e) => {
    e.preventDefault();
    toast.success("تم استلام رسالتك ✓");
    setForm({
      name: "",
      email: "",
      message: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-aquila py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.3em] uppercase text-gold", children: "تواصل معنا" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-display mt-2", children: "كيف يمكننا مساعدتك؟" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [{
          i: Mail,
          t: "البريد",
          v: "hello@aquila.com"
        }, {
          i: Phone,
          t: "الهاتف",
          v: "+966 50 000 0000"
        }, {
          i: MapPin,
          t: "العنوان",
          v: "الرياض، المملكة العربية السعودية"
        }, {
          i: MessageCircle,
          t: "واتساب",
          v: "متاح ٢٤/٧"
        }].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-5 border border-border/40 bg-card/50 rounded-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.i, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-widest uppercase text-gold", children: c.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: c.v })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "p-8 border border-border/40 bg-card/50 rounded-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display border-b border-border/40 pb-3", children: "أرسل رسالة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: "الاسم" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }), className: "w-full bg-input border border-border px-4 py-3 text-sm rounded-sm focus:border-gold focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: "البريد" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), className: "w-full bg-input border border-border px-4 py-3 text-sm rounded-sm focus:border-gold focus:outline-none", dir: "ltr" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: "الرسالة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 5, value: form.message, onChange: (e) => setForm({
              ...form,
              message: e.target.value
            }), className: "w-full bg-input border border-border px-4 py-3 text-sm rounded-sm focus:border-gold focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-opacity", children: "إرسال" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ContactPage as component
};
