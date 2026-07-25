import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "تواصل معنا — Aquila" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم استلام رسالتك ✓");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <>
      <Header />
      <main className="container-aquila py-16">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">تواصل معنا</span>
          <h1 className="text-5xl font-display mt-2">كيف يمكننا مساعدتك؟</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            {[
              { i: Mail, t: "البريد", v: "hello@aquila.com" },
              { i: Phone, t: "الهاتف", v: "+966 50 000 0000" },
              { i: MapPin, t: "العنوان", v: "الرياض، المملكة العربية السعودية" },
              { i: MessageCircle, t: "واتساب", v: "متاح ٢٤/٧" },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 p-5 border border-border/40 bg-card/50 rounded-sm">
                <div className="h-12 w-12 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <c.i className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase text-gold">{c.t}</div>
                  <div className="mt-1">{c.v}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="p-8 border border-border/40 bg-card/50 rounded-sm space-y-4">
            <h2 className="text-2xl font-display border-b border-border/40 pb-3">أرسل رسالة</h2>
            <div>
              <label className="block text-xs tracking-widest uppercase text-gold mb-2">الاسم</label>
              <input required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="w-full bg-input border border-border px-4 py-3 text-sm rounded-sm focus:border-gold focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-gold mb-2">البريد</label>
              <input type="email" required value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} className="w-full bg-input border border-border px-4 py-3 text-sm rounded-sm focus:border-gold focus:outline-none" dir="ltr" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-gold mb-2">الرسالة</label>
              <textarea required rows={5} value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} className="w-full bg-input border border-border px-4 py-3 text-sm rounded-sm focus:border-gold focus:outline-none" />
            </div>
            <button type="submit" className="w-full bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-opacity">
              إرسال
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
