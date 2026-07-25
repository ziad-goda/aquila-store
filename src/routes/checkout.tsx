import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "إتمام الطلب — Aquila" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const shipping = total > 500 ? 0 : 30;
  const discountAmount = (total * discount) / 100;
  const finalTotal = total + shipping - discountAmount;

  const applyCoupon = async () => {
    if (!coupon) return;
    const { data } = await supabase.from("coupons").select("*").eq("code", coupon.toUpperCase()).eq("active", true).maybeSingle();
    if (!data) return toast.error("الكود غير صالح");
    setDiscount(data.discount_percent);
    toast.success(`تم تطبيق خصم ${data.discount_percent}% ✓`);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate({ to: "/auth", search: { redirect: "/checkout" } });
    if (items.length === 0) return toast.error("السلة فارغة");
    setSubmitting(true);
    try {
      const { data: order, error } = await supabase.from("orders").insert({
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
        notes: form.notes || null,
      }).select().single();
      if (error || !order) throw error;

      const orderItems = items.map((it) => ({
        order_id: order.id,
        product_id: it.productId,
        product_name: it.name,
        product_image: it.image,
        color: "",
        size: it.size,
        quantity: it.quantity,
        unit_price: it.price,
      }));
      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      console.log("ITEMS ERROR =", itemsError);
      if (itemsError) throw itemsError;

      clearCart();
      toast.success(`تم استلام طلبك ${order.order_number} ✓`);
      navigate({ to: "/account" });
    } catch (err) {
      console.log("ERROR:", err);
      
      toast.error("حدث خطأ، حاول مجدداً");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (<><Header /><div className="container-aquila py-32 text-center">...</div><Footer /></>);

  return (
    <>
      <Header />
      <main className="container-aquila py-12">
        <h1 className="text-4xl font-display mb-8">إتمام الطلب</h1>
        {!user && (
          <div className="mb-6 p-4 border border-gold/30 bg-gold/5 rounded-sm text-sm">
            يجب <Link to="/auth" search={{ redirect: "/checkout" }} className="text-gold underline">تسجيل الدخول</Link> لإتمام الطلب
          </div>
        )}
        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-display border-b border-border/40 pb-3">معلومات الشحن</h2>
            <Input label="الاسم الكامل" value={form.name} onChange={(v)=>setForm({...form, name:v})} required />
            <Input label="رقم الجوال" value={form.phone} onChange={(v)=>setForm({...form, phone:v})} required />
            <Input label="العنوان" value={form.address} onChange={(v)=>setForm({...form, address:v})} required />
            <Input label="المدينة" value={form.city} onChange={(v)=>setForm({...form, city:v})} required />
            <div>
              <label className="block text-xs tracking-widest uppercase text-gold mb-2">ملاحظات (اختياري)</label>
              <textarea value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} rows={3} className="w-full bg-input border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none rounded-sm" />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start p-6 border border-border/40 bg-card/50 rounded-sm space-y-4 h-fit">
            <h2 className="text-xl font-display border-b border-border/40 pb-3">ملخص الطلب</h2>
            <div className="space-y-2 max-h-60 overflow-auto">
              {items.map((it) => (
                <div key={`${it.productId}-${it.size}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{it.name} × {it.quantity}</span>
                  <span>{(it.price*it.quantity).toFixed(0)} ج.م</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border/40 pt-3 space-y-2">
              <div className="flex gap-2">
                <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="كود خصم" className="flex-1 bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none" />
                <button type="button" onClick={applyCoupon} className="px-4 py-2 border border-gold text-gold text-sm rounded-sm hover:bg-gold hover:text-gold-foreground transition-colors">تطبيق</button>
              </div>
              <div className="flex justify-between text-sm"><span>المجموع</span><span>{total.toFixed(2)} ج.م</span></div>
              {discount > 0 && <div className="flex justify-between text-sm text-gold"><span>الخصم ({discount}%)</span><span>-{discountAmount.toFixed(2)} ج.م</span></div>}
              <div className="flex justify-between text-sm"><span>الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span></div>
              <div className="flex justify-between text-lg font-semibold border-t border-border/40 pt-2"><span>الإجمالي</span><span className="text-gold">{finalTotal.toFixed(2)} ج.م</span></div>
            </div>
            <button type="submit" disabled={submitting || items.length===0} className="w-full bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50">
              {submitting ? "جاري التأكيد..." : "تأكيد الطلب"}
            </button>
          </aside>
        </form>
      </main>
      <Footer />
    </>
  );
}

function Input({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-gold mb-2">{label}</label>
      <input type={type} required={required} value={value} onChange={(e)=>onChange(e.target.value)} className="w-full bg-input border border-border px-4 py-2.5 text-sm focus:border-gold focus:outline-none rounded-sm" />
    </div>
  );
}
