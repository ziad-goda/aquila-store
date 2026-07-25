import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, Package, Heart, User as UserIcon, ShieldCheck } from "lucide-react";
import { resolveImage } from "@/lib/image";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "حسابي — Aquila" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"profile" | "orders" | "wishlist">("profile");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { redirect: "/account" } });
  }, [loading, user, navigate]);

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user!.id).eq("role", "admin").maybeSingle();
      return !!data;
    },
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate({ to: "/" });
  };

  if (loading || !user) return (<><Header /><div className="container-aquila py-32 text-center">...</div><Footer /></>);

  return (
    <>
      <Header />
      <main className="container-aquila py-12 min-h-[60vh]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-display">حسابي</h1>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Link to="/admin" className="inline-flex items-center gap-2 px-4 py-2 border border-gold text-gold text-sm tracking-wider uppercase rounded-sm hover:bg-gold hover:text-gold-foreground transition-colors">
                <ShieldCheck className="h-4 w-4" /> لوحة التحكم
              </Link>
            )}
            <button onClick={signOut} className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm tracking-wider uppercase rounded-sm hover:border-destructive hover:text-destructive transition-colors">
              <LogOut className="h-4 w-4" /> خروج
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <aside className="space-y-1">
            {[
              {v:"profile", l:"الملف الشخصي", i:UserIcon},
              {v:"orders", l:"طلباتي", i:Package},
              {v:"wishlist", l:"المفضلة", i:Heart},
            ].map((t) => (
              <button key={t.v} onClick={()=>setTab(t.v as never)} className={`w-full text-right px-4 py-3 flex items-center gap-3 rounded-sm transition-colors ${tab===t.v?"bg-gold/10 text-gold":"hover:bg-secondary"}`}>
                <t.i className="h-4 w-4" /> {t.l}
              </button>
            ))}
          </aside>
          <div className="md:col-span-3">
            {tab === "profile" && <ProfileTab userId={user.id} />}
            {tab === "orders" && <OrdersTab userId={user.id} />}
            {tab === "wishlist" && <WishlistTab userId={user.id} />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ProfileTab({ userId }: { userId: string }) {
  const [profile, setProfile] = useState({ full_name: "", phone: "", address: "", city: "" });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle().then(({ data }) => {
      if (data) setProfile({ full_name: data.full_name ?? "", phone: data.phone ?? "", address: data.address ?? "", city: data.city ?? "" });
    });
  }, [userId]);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({ id: userId, ...profile });
    setSaving(false);
    if (error) toast.error("حدث خطأ"); else toast.success("تم الحفظ ✓");
  };
  return (
    <form onSubmit={save} className="space-y-4 p-6 border border-border/40 bg-card/50 rounded-sm">
      <h2 className="text-xl font-display border-b border-border/40 pb-3">الملف الشخصي</h2>
      {[{k:"full_name",l:"الاسم الكامل"},{k:"phone",l:"الجوال"},{k:"address",l:"العنوان"},{k:"city",l:"المدينة"}].map((f)=>(
        <div key={f.k}>
          <label className="block text-xs tracking-widest uppercase text-gold mb-2">{f.l}</label>
          <input value={profile[f.k as keyof typeof profile]} onChange={(e)=>setProfile({...profile, [f.k]: e.target.value})} className="w-full bg-input border border-border px-4 py-2.5 text-sm rounded-sm focus:border-gold focus:outline-none" />
        </div>
      ))}
      <button type="submit" disabled={saving} className="bg-gold text-gold-foreground px-8 py-3 text-sm tracking-widest uppercase font-semibold rounded-sm disabled:opacity-50">
        {saving ? "..." : "حفظ"}
      </button>
    </form>
  );
}

function OrdersTab({ userId }: { userId: string }) {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      const { data } = await supabase.from("orders").select("*, order_items(*)").eq("user_id", userId).order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  const statusLabel: Record<string, string> = {pending:"قيد المراجعة",processing:"قيد التجهيز",shipped:"تم الشحن",delivered:"تم التسليم",cancelled:"ملغي"};
  if (orders.length === 0) return <div className="p-10 text-center text-muted-foreground border border-border/40 rounded-sm">لا توجد طلبات</div>;
  return (
    <div className="space-y-4">
      {orders.map((o: { id: string; order_number: string; status: string; total: number; created_at: string; order_items?: { id: string; product_name: string; quantity: number }[] }) => (
        <div key={o.id} className="p-5 border border-border/40 bg-card/50 rounded-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-semibold text-gold">{o.order_number}</div>
              <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString("ar-SA")}</div>
            </div>
            <span className="text-xs px-3 py-1 border border-gold/40 text-gold rounded-sm">{statusLabel[o.status]}</span>
          </div>
          <div className="text-sm text-muted-foreground mb-2">{o.order_items?.length ?? 0} منتج</div>
          <div className="text-lg text-gold font-semibold">{Number(o.total).toFixed(2)} ج.م</div>
        </div>
      ))}
    </div>
  );
}

function WishlistTab({ userId }: { userId: string }) {
  const { data: items = [], refetch } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: async () => {
      const { data } = await supabase.from("wishlist").select("*, products(*)").eq("user_id", userId);
      return data ?? [];
    },
  });
  const remove = async (id: string) => {
    await supabase.from("wishlist").delete().eq("id", id);
    refetch(); toast.success("تم الحذف");
  };
  if (items.length === 0) return <div className="p-10 text-center text-muted-foreground border border-border/40 rounded-sm">قائمة الأمنيات فارغة</div>;
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((it: { id: string; products: { id: string; name: string; price: number; images: string[] } | null }) => it.products && (
        <div key={it.id} className="p-4 border border-border/40 bg-card/50 rounded-sm flex gap-4">
          <img src={resolveImage(it.products.images[0])} alt="" width={100} height={120} className="w-20 h-24 object-cover rounded-sm" />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <Link to="/products/$id" params={{ id: it.products.id }} className="font-medium hover:text-gold">{it.products.name}</Link>
              <div className="text-gold mt-1">{it.products.price} ج.م</div>
            </div>
            <button onClick={() => remove(it.id)} className="text-xs text-destructive self-start">حذف</button>
          </div>
        </div>
      ))}
    </div>
  );
}
