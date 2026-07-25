import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { useState } from "react";
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { resolveImage } from "@/lib/image";

export const Route = createFileRoute("/products/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { addItem } = useCart();
  const { user } = useAuth();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      return data as Product | null;
    },
  });

  const { data: related = [] } = useQuery({
    queryKey: ["related", product?.category],
    enabled: !!product,
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").eq("category", product!.category).neq("id", id).limit(4);
      return (data ?? []) as Product[];
    },
  });

  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string>("");
 
  const [qty, setQty] = useState(1);

  if (isLoading) return (<><Header /><div className="container-aquila py-32 text-center text-muted-foreground">جاري التحميل...</div><Footer /></>);
  if (!product) return (<><Header /><div className="container-aquila py-32 text-center">المنتج غير موجود</div><Footer /></>);

  const handleAdd = () => {
    if (!size) return toast.error("اختر المقاس");
    
    addItem({
      productId: product.id, name: product.name, price: product.price,
      image: product.images[0], size, quantity: qty,
    });
    toast.success("تمت الإضافة للسلة ✓");
  };

  const handleWishlist = async () => {
    if (!user) return toast.error("يجب تسجيل الدخول أولاً");
    const { error } = await supabase.from("wishlist").insert({ user_id: user.id, product_id: product.id });
    if (error) {
      if (error.code === "23505") toast.info("المنتج موجود بالفعل في المفضلة");
      else toast.error("حدث خطأ");
    } else toast.success("تمت الإضافة للمفضلة ✓");
  };

  const handleWhatsApp = () => {
   const msg = `مرحباً، أريد طلب: ${product.name} - المقاس: ${size || "-"} - الكمية: ${qty}`;
    window.open(`https://wa.me/201550995233?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      <Header />
      <main className="container-aquila py-12">
        <div className="text-xs text-muted-foreground mb-6 tracking-wider">
          <Link to="/" className="hover:text-gold">الرئيسية</Link> / <Link to="/shop" className="hover:text-gold">المتجر</Link> / <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden bg-card border border-border/40 rounded-sm">
              <img src={resolveImage(product.images[imgIdx])} alt={product.name} width={800} height={1024} className="h-full w-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`aspect-square overflow-hidden rounded-sm border-2 transition-colors ${imgIdx===i?"border-gold":"border-border/40"}`}>
                    <img src={resolveImage(img)} alt="" loading="lazy" width={200} height={200} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gold">{product.category === "hoodies" ? "هوديز" : "بناطيل"}</span>
              <h1 className="text-4xl md:text-5xl font-display mt-2 mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl text-gold font-semibold">{product.price} ج.م</span>
                {product.compare_price && <span className="text-lg text-muted-foreground line-through">{product.compare_price} ج.م</span>}
              </div>
            </div>

            <p className="text-muted-foreground leading-loose">{product.description}</p>

            <div className="space-y-4 py-4 border-y border-border/40">
              <div>
               
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-gold mb-3">المقاس</div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(product.sizes) &&
                    product.sizes.map((s) => (
                    <button key={s} onClick={() => setSize(s)} className={`min-w-12 h-11 px-3 text-sm border rounded-sm transition-colors ${size===s?"bg-gold text-gold-foreground border-gold":"border-border hover:border-gold"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-gold mb-3">الكمية</div>
                <div className="inline-flex items-center border border-border rounded-sm">
                  <button onClick={() => setQty(Math.max(1, qty-1))} className="h-11 w-11 flex items-center justify-center hover:bg-secondary"><Minus className="h-4 w-4" /></button>
                  <span className="w-12 text-center font-medium">{qty}</span>
                  <button onClick={() => setQty(qty+1)} className="h-11 w-11 flex items-center justify-center hover:bg-secondary"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAdd} className="flex-1 bg-gold text-gold-foreground py-4 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="h-4 w-4" /> أضف للسلة
              </button>
              <button onClick={handleWishlist} className="h-14 w-14 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors rounded-sm">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <button onClick={handleWhatsApp} className="w-full border border-gold/40 text-gold py-3 text-sm tracking-widest uppercase hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
              اطلب عبر واتساب
            </button>

            <div className="grid grid-cols-3 gap-4 pt-6">
              {[{i:Truck,t:"شحن مجاني"},{i:Shield,t:"ضمان الجودة"},{i:RotateCcw,t:"إرجاع ١٤ يوم"}].map((it,idx)=>(
                <div key={idx} className="text-center">
                  <it.i className="h-5 w-5 mx-auto mb-2 text-gold" />
                  <div className="text-xs text-muted-foreground">{it.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-display mb-8">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
