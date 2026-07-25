import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-provider";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { resolveImage } from "@/lib/image";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "السلة — Aquila" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const shipping = total > 500 ? 0 : 30;

  return (
    <>
      <Header />
      <main className="container-aquila py-12 min-h-[60vh]">
        <h1 className="text-4xl font-display mb-8">سلة التسوق</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">سلتك فارغة</p>
            <Link to="/shop" className="inline-block bg-gold text-gold-foreground px-8 py-3 text-sm tracking-widest uppercase font-semibold">
              تسوق الآن
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <div key={`${it.productId}-${it.size}-${it.color}`} className="flex gap-4 p-4 border border-border/40 bg-card/50 rounded-sm">
                  <img src={resolveImage(it.image)} alt={it.name} width={120} height={150} className="w-24 h-32 object-cover rounded-sm" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{it.name}</h3>
                      <div className="text-xs text-muted-foreground mt-1">المقاس: {it.size} • اللون: {it.color}</div>
                      <div className="text-gold font-semibold mt-2">{it.price} ج.م</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-sm">
                        <button onClick={() => updateQuantity(it.productId, it.size, it.color, it.quantity-1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                        <span className="w-10 text-center text-sm">{it.quantity}</span>
                        <button onClick={() => updateQuantity(it.productId, it.size, it.color, it.quantity+1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => removeItem(it.productId, it.size, it.color)} className="text-destructive hover:opacity-80">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start p-6 border border-border/40 bg-card/50 rounded-sm space-y-4">
              <h2 className="text-xl font-display border-b border-border/40 pb-3">ملخص الطلب</h2>
              <div className="flex justify-between text-sm"><span>المجموع الفرعي</span><span>{total.toFixed(2)} ج.م</span></div>
              <div className="flex justify-between text-sm"><span>الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span></div>
              <div className="flex justify-between text-lg font-semibold border-t border-border/40 pt-3"><span>الإجمالي</span><span className="text-gold">{(total + shipping).toFixed(2)} ج.م</span></div>
              <Link to="/checkout" className="block w-full text-center bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold mt-4 shadow-gold hover:opacity-90 transition-opacity">
                إتمام الطلب
              </Link>
              <Link to="/shop" className="block text-center text-sm text-muted-foreground hover:text-gold mt-2">متابعة التسوق</Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
