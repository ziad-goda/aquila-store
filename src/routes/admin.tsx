import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, TrendingUp } from "lucide-react";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "لوحة التحكم — Aquila" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"stats"|"products"|"orders"|"coupons">("stats");

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate({ to: "/auth", search: { redirect: "/admin" } }); return; }
   supabase
  .from("user_roles")
  .select("*")
  .eq("user_id", user.id)
  .then(({ data, error }) => {
    console.log("USER ID:", user.id);
    console.log("ROLES DATA:", data);
    console.log("ROLES ERROR:", error);

    const adminRole = data?.find((r) => r.role === "admin");

    setIsAdmin(!!adminRole);

    if (!adminRole) {
      toast.error("ليس لديك صلاحية");
    }
  });
  }, [user, loading, navigate]);

  if (loading || isAdmin === null) return (<><Header /><div className="container-aquila py-32 text-center">...</div><Footer /></>);
  if (!isAdmin) return (
    <>
      <Header />
      <div className="container-aquila py-20 text-center">
        <h1 className="text-3xl font-display mb-4">غير مصرّح</h1>
        <p className="text-muted-foreground mb-2">هذه الصفحة للمسؤولين فقط.</p>
        <p className="text-xs text-muted-foreground">لتفعيل المسؤول: شغّل في قاعدة البيانات: <br/><code dir="ltr" className="text-gold">INSERT INTO user_roles (user_id, role) VALUES ('{user?.id}', 'admin');</code></p>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <main className="container-aquila py-12 min-h-[60vh]">
        <h1 className="text-4xl font-display mb-8">لوحة التحكم</h1>
        <div className="flex gap-2 mb-8 border-b border-border/40 overflow-auto">
          {[
            {v:"stats", l:"الإحصائيات", i:TrendingUp},
            {v:"products", l:"المنتجات", i:Package},
            {v:"orders", l:"الطلبات", i:ShoppingCart},
            {v:"coupons", l:"الكوبونات", i:Users},
          ].map((t)=>(
            <button key={t.v} onClick={()=>setTab(t.v as never)} className={`px-5 py-3 text-sm tracking-wider uppercase flex items-center gap-2 whitespace-nowrap ${tab===t.v?"text-gold border-b-2 border-gold":"text-muted-foreground hover:text-foreground"}`}>
              <t.i className="h-4 w-4" /> {t.l}
            </button>
          ))}
        </div>
        {tab==="stats" && <StatsTab />}
        {tab==="products" && <ProductsTab />}
        {tab==="orders" && <OrdersTab />}
        {tab==="coupons" && <CouponsTab />}
      </main>
      <Footer />
    </>
  );
}

function StatsTab() {
  const { data: stats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [p, o, oSum] = await Promise.all([
        supabase.from("products").select("*", { count:"exact", head:true }),
        supabase.from("orders").select("*", { count:"exact", head:true }),
        supabase.from("orders").select("total"),
      ]);
      const revenue = (oSum.data ?? []).reduce((s, r: { total: number }) => s + Number(r.total), 0);
      return { products: p.count ?? 0, orders: o.count ?? 0, revenue };
    },
  });
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {l:"المنتجات", v:stats?.products ?? 0},
        {l:"الطلبات", v:stats?.orders ?? 0},
        {l:"الإيرادات", v:`${(stats?.revenue ?? 0).toFixed(0)} ج.م`},
      ].map((s,i)=>(
        <div key={i} className="p-6 border border-border/40 bg-card/50 rounded-sm">
          <div className="text-xs tracking-widest uppercase text-gold mb-2">{s.l}</div>
          <div className="text-3xl font-display">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

function ProductsTab() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const { data: products = [] } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      return (data ?? []) as Product[];
    },
  });
  const del = async (id: string) => {
    if (!confirm("حذف المنتج؟")) return;
    await supabase.from("products").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["adminProducts"] });
    toast.success("تم الحذف");
  };
  return (
    <div className="space-y-4">
      <button onClick={()=>setEditing({})} className="inline-flex items-center gap-2 bg-gold text-gold-foreground px-5 py-2.5 text-sm tracking-wider uppercase font-semibold rounded-sm">
        <Plus className="h-4 w-4" /> منتج جديد
      </button>
      <div className="overflow-auto border border-border/40 rounded-sm">
        <table className="w-full text-sm">
          <thead className="bg-card text-xs tracking-widest uppercase text-gold">
            <tr><th className="p-3 text-right">الاسم</th><th className="p-3">الفئة</th><th className="p-3">السعر</th><th className="p-3">المخزون</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {products.map((p)=>(
              <tr key={p.id} className="border-t border-border/40">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-center">{p.category==="hoodies"?"هوديز":"بناطيل"}</td>
                <td className="p-3 text-center text-gold">{p.price}</td>
                <td className="p-3 text-center">{p.stock}</td>
                <td className="p-3 flex gap-2 justify-end">
                  <button onClick={()=>setEditing(p)} className="text-gold hover:opacity-80"><Edit className="h-4 w-4" /></button>
                  <button onClick={()=>del(p.id)} className="text-destructive hover:opacity-80"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing && <ProductForm initial={editing} onClose={()=>{setEditing(null); qc.invalidateQueries({queryKey:["adminProducts"]});}} />}
    </div>
  );
}

function ProductForm({ initial, onClose }: { initial: Partial<Product>; onClose: () => void }) {
  const [f, setF] = useState({
    name: initial.name ?? "",
    description: initial.description ?? "",
    price: initial.price ?? 0,
    compare_price: initial.compare_price ?? null,
    category: (initial.category ?? "hoodies") as "hoodies"|"pants",
    images: initial.images?.join("\n") ?? "",
    colors: initial.colors?.join(", ") ?? "",
    stock: initial.stock ?? 0,
    is_featured: initial.is_featured ?? false,
    is_new: initial.is_new ?? false,
    is_bestseller: initial.is_bestseller ?? false,
  });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: f.name, description: f.description, price: Number(f.price),
      compare_price: f.compare_price ? Number(f.compare_price) : null,
      category: f.category,
      images: f.images.split("\n").map(s=>s.trim()).filter(Boolean),
      colors: f.colors.split(",").map(s=>s.trim()).filter(Boolean),
      stock: Number(f.stock),
      is_featured: f.is_featured, is_new: f.is_new, is_bestseller: f.is_bestseller,
    };
    const { error } = initial.id
      ? await supabase.from("products").update(payload).eq("id", initial.id)
      : await supabase.from("products").insert(payload);
    if (error) toast.error(error.message); else { toast.success("تم الحفظ"); onClose(); }
  };
  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur flex items-center justify-center p-4 overflow-auto">
      <form onSubmit={submit} className="bg-card border border-border max-w-2xl w-full p-6 rounded-sm space-y-3 max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-display border-b border-border/40 pb-3">{initial.id ? "تعديل" : "إضافة"} منتج</h3>
        <Field label="الاسم"><input required value={f.name} onChange={(e)=>setF({...f, name:e.target.value})} className={inputCls} /></Field>
        <Field label="الوصف"><textarea rows={3} value={f.description} onChange={(e)=>setF({...f, description:e.target.value})} className={inputCls} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="السعر"><input type="number" required value={f.price} onChange={(e)=>setF({...f, price:Number(e.target.value)})} className={inputCls} /></Field>
          <Field label="السعر قبل الخصم"><input type="number" value={f.compare_price ?? ""} onChange={(e)=>setF({...f, compare_price: e.target.value ? Number(e.target.value) : null})} className={inputCls} /></Field>
          <Field label="الفئة">
            <select value={f.category} onChange={(e)=>setF({...f, category: e.target.value as never})} className={inputCls}>
              <option value="hoodies">هوديز</option><option value="pants">بناطيل</option>
            </select>
          </Field>
          <Field label="المخزون"><input type="number" required value={f.stock} onChange={(e)=>setF({...f, stock:Number(e.target.value)})} className={inputCls} /></Field>
        </div>
        <Field label="الصور (رابط في كل سطر)"><textarea rows={2} value={f.images} onChange={(e)=>setF({...f, images:e.target.value})} className={inputCls} dir="ltr" /></Field>
        <Field label="الألوان (مفصولة بفواصل)"><input value={f.colors} onChange={(e)=>setF({...f, colors:e.target.value})} className={inputCls} /></Field>
        <div className="flex flex-wrap gap-4 text-sm">
          {[
            {k:"is_featured", l:"مميز"},
            {k:"is_new", l:"جديد"},
            {k:"is_bestseller", l:"الأكثر مبيعاً"},
          ].map((c)=>(
            <label key={c.k} className="flex items-center gap-2">
              <input type="checkbox" checked={f[c.k as keyof typeof f] as boolean} onChange={(e)=>setF({...f, [c.k]: e.target.checked})} />
              {c.l}
            </label>
          ))}
        </div>
        <div className="flex gap-2 justify-end pt-3 border-t border-border/40">
          <button type="button" onClick={onClose} className="px-5 py-2 border border-border text-sm rounded-sm">إلغاء</button>
          <button type="submit" className="px-5 py-2 bg-gold text-gold-foreground text-sm rounded-sm font-semibold">حفظ</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div><label className="block text-xs tracking-widest uppercase text-gold mb-1.5">{label}</label>{children}</div>);
}
const inputCls = "w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none";

function OrdersTab() {
  const qc = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      return data ?? [];
    },
  });

  const update = async (
    id: string,
    status:
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled"
  ) => {
    await supabase.from("orders").update({ status }).eq("id", id);

    qc.invalidateQueries({
      queryKey: ["adminOrders"],
    });

    toast.success("تم التحديث");
  };

  return (
    <div className="overflow-auto border border-border/40 rounded-sm">
      <table className="w-full text-sm">

        <thead className="bg-card text-xs tracking-widest uppercase text-gold">
          <tr>
            <th className="p-3 text-right">الرقم</th>
            <th className="p-3">العميل</th>
            <th className="p-3">رقم الهاتف</th>
            <th className="p-3">الإجمالي</th>
            <th className="p-3">الحالة</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((o: {
            id: string;
            order_number: string;
            shipping_name: string;
            shipping_phone: string;
            total: number;
            status: string;
          }) => (

            <tr key={o.id} className="border-t border-border/40">

              <td className="p-3 text-gold">
                {o.order_number}
              </td>

              <td className="p-3">
                {o.shipping_name}
              </td>

             <td className="p-3">
  <div className="flex items-center gap-3">

    <a
      href={`tel:${o.shipping_phone}`}
      className="text-gold hover:underline"
    >
      {o.shipping_phone}
    </a>

    <a
      href={`https://wa.me/2${o.shipping_phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-500 hover:underline"
    >
      واتساب
    </a>

  </div>
</td>

              <td className="p-3">
                {Number(o.total).toFixed(2)} ج.م
              </td>

              <td className="p-3">
                <select
                  value={o.status}
                  onChange={(e) =>
                    update(
                      o.id,
                      e.target.value as
                        | "pending"
                        | "processing"
                        | "shipped"
                        | "delivered"
                        | "cancelled"
                    )
                  }
                  className="bg-input border border-border px-2 py-1 text-xs rounded-sm"
                >
                  <option value="pending">قيد المراجعة</option>
                  <option value="processing">قيد التجهيز</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">تم التسليم</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}

function CouponsTab() {
  const qc = useQueryClient();
  const { data: coupons = [] } = useQuery({
    queryKey: ["adminCoupons"],
    queryFn: async () => (await supabase.from("coupons").select("*").order("created_at",{ascending:false})).data ?? [],
  });
  const [code, setCode] = useState(""); const [pct, setPct] = useState(10);
  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("coupons").insert({ code: code.toUpperCase(), discount_percent: pct, active: true });
    if (error) toast.error(error.message); else { toast.success("تم الإضافة"); setCode(""); qc.invalidateQueries({queryKey:["adminCoupons"]}); }
  };
  const toggle = async (id: string, active: boolean) => {
    await supabase.from("coupons").update({ active: !active }).eq("id", id);
    qc.invalidateQueries({queryKey:["adminCoupons"]});
  };
  return (
    <div className="space-y-4">
      <form onSubmit={add} className="flex flex-wrap gap-2 p-4 border border-border/40 bg-card/50 rounded-sm">
        <input required value={code} onChange={(e)=>setCode(e.target.value)} placeholder="الكود" className={inputCls + " flex-1 min-w-40"} dir="ltr" />
        <input required type="number" min={1} max={100} value={pct} onChange={(e)=>setPct(Number(e.target.value))} placeholder="%" className={inputCls + " w-24"} />
        <button className="bg-gold text-gold-foreground px-5 py-2 text-sm tracking-wider uppercase font-semibold rounded-sm">إضافة</button>
      </form>
      <div className="grid sm:grid-cols-2 gap-3">
        {coupons.map((c: { id: string; code: string; discount_percent: number; active: boolean }) => (
          <div key={c.id} className="p-4 border border-border/40 bg-card/50 rounded-sm flex items-center justify-between">
            <div>
              <div className="font-mono text-gold text-lg">{c.code}</div>
              <div className="text-xs text-muted-foreground">خصم {c.discount_percent}%</div>
            </div>
            <button onClick={()=>toggle(c.id, c.active)} className={`text-xs px-3 py-1 border rounded-sm ${c.active?"border-gold text-gold":"border-border text-muted-foreground"}`}>
              {c.active?"نشط":"معطّل"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
