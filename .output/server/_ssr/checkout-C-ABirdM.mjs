import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header, F as Footer } from "./footer-CnmVwV6a.mjs";
import { u as useCart } from "./router-D_0TxxYN.mjs";
import { u as useAuth } from "./use-auth-BS3YO_BT.mjs";
import { s as supabase } from "./client-CskvuBrI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function CheckoutPage() {
  const {
    items,
    total,
    clearCart
  } = useCart();
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: ""
  });
  const [coupon, setCoupon] = reactExports.useState("");
  const [discount, setDiscount] = reactExports.useState(0);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const shipping = total > 500 ? 0 : 30;
  const discountAmount = total * discount / 100;
  const finalTotal = total + shipping - discountAmount;
  const applyCoupon = async () => {
    if (!coupon) return;
    const {
      data
    } = await supabase.from("coupons").select("*").eq("code", coupon.toUpperCase()).eq("active", true).maybeSingle();
    if (!data) return toast.error("الكود غير صالح");
    setDiscount(data.discount_percent);
    toast.success(`تم تطبيق خصم ${data.discount_percent}% ✓`);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!user) return navigate({
      to: "/auth",
      search: {
        redirect: "/checkout"
      }
    });
    if (items.length === 0) return toast.error("السلة فارغة");
    setSubmitting(true);
    try {
      const {
        data: order,
        error
      } = await supabase.from("orders").insert({
        user_id: user.id,
        subtotal: total,
        discount: discountAmount,
        shipping,
        total: finalTotal,
        coupon_code: discount > 0 ? coupon.toUpperCase() : null,
        shipping_name: form.name,
        shipping_phone: form.phone,
        shipping_address: form.address,
        shipping_city: form.city,
        notes: form.notes || null
      }).select().single();
      if (error || !order) throw error;
      const orderItems = items.map((it) => ({
        order_id: order.id,
        product_id: it.productId,
        product_name: it.name,
        product_image: it.image,
        size: it.size,
        color: it.color,
        quantity: it.quantity,
        unit_price: it.price
      }));
      const {
        error: itemsError
      } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;
      clearCart();
      toast.success(`تم استلام طلبك ${order.order_number} ✓`);
      navigate({
        to: "/account"
      });
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ، حاول مجدداً");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-aquila py-32 text-center", children: "..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container-aquila py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display mb-8", children: "إتمام الطلب" }),
      !user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 border border-gold/30 bg-gold/5 rounded-sm text-sm", children: [
        "يجب ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", search: {
          redirect: "/checkout"
        }, className: "text-gold underline", children: "تسجيل الدخول" }),
        " لإتمام الطلب"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid lg:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display border-b border-border/40 pb-3", children: "معلومات الشحن" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "الاسم الكامل", value: form.name, onChange: (v) => setForm({
            ...form,
            name: v
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "رقم الجوال", value: form.phone, onChange: (v) => setForm({
            ...form,
            phone: v
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "العنوان", value: form.address, onChange: (v) => setForm({
            ...form,
            address: v
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "المدينة", value: form.city, onChange: (v) => setForm({
            ...form,
            city: v
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: "ملاحظات (اختياري)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.notes, onChange: (e) => setForm({
              ...form,
              notes: e.target.value
            }), rows: 3, className: "w-full bg-input border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none rounded-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 lg:self-start p-6 border border-border/40 bg-card/50 rounded-sm space-y-4 h-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display border-b border-border/40 pb-3", children: "ملخص الطلب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-60 overflow-auto", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              it.name,
              " × ",
              it.quantity
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              (it.price * it.quantity).toFixed(0),
              " ج.م"
            ] })
          ] }, `${it.productId}-${it.size}-${it.color}`)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: coupon, onChange: (e) => setCoupon(e.target.value), placeholder: "كود خصم", className: "flex-1 bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: applyCoupon, className: "px-4 py-2 border border-gold text-gold text-sm rounded-sm hover:bg-gold hover:text-gold-foreground transition-colors", children: "تطبيق" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المجموع" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                total.toFixed(2),
                " ج.م"
              ] })
            ] }),
            discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "الخصم (",
                discount,
                "%)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "-",
                discountAmount.toFixed(2),
                " ج.م"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الشحن" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: shipping === 0 ? "مجاني" : `${shipping} ج.م` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-semibold border-t border-border/40 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الإجمالي" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold", children: [
                finalTotal.toFixed(2),
                " ج.م"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting || items.length === 0, className: "w-full bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50", children: submitting ? "جاري التأكيد..." : "تأكيد الطلب" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Input({
  label,
  value,
  onChange,
  required,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs tracking-widest uppercase text-gold mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, required, value, onChange: (e) => onChange(e.target.value), className: "w-full bg-input border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none rounded-sm" })
  ] });
}
export {
  CheckoutPage as component
};
