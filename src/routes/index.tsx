import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { ArrowLeft, Truck, Shield, RefreshCw, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import heroImg from "@/assets/hero.jpg";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aquila — أزياء الستريت وير الفاخرة" },
      { name: "description", content: "اكتشف مجموعة Aquila الحصرية من الهوديز والبناطيل الفاخرة. تصاميم عصرية بلمسة ذهبية." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <FeaturedSection title="الأكثر مبيعاً" filter="bestseller" />
        <BrandStory />
        <FeaturedSection title="وصل حديثاً" filter="new" />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
      <img src={heroImg} alt="Aquila Collection" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/60 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <div className="relative container-aquila h-full flex items-center">
        <div className="max-w-2xl animate-fade-up">
          <span className="text-sm tracking-[0.3em] uppercase text-gold mb-6 block">مجموعة الشتاء ٢٠٢٦</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold leading-[1.05] mb-6">
            فخامة <span className="gradient-gold-text">الستريت وير</span>
            <br />تبدأ هنا
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
            Aquila — حيث تلتقي الأناقة بالقوة. هوديز وبناطيل فاخرة مصممة لمن يصنعون قواعدهم الخاصة.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="group inline-flex items-center gap-3 bg-gold text-gold-foreground px-8 py-4 text-sm tracking-widest uppercase font-semibold shadow-gold transition-all hover:gap-5">
              تسوق الآن <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-3 border border-border px-8 py-4 text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors">
              قصة Aquila
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Truck, title: "شحن مجاني", desc: "للطلبات فوق ٥٠٠ ج.م" },
    { icon: Shield, title: "ضمان الجودة", desc: "خامات فاخرة معتمدة" },
    { icon: RefreshCw, title: "إرجاع سهل", desc: "خلال ١٤ يوم" },
    { icon: Star, title: "تصاميم حصرية", desc: "إصدارات محدودة" },
  ];
  return (
    <section className="border-y border-border/40 bg-card/40">
      <div className="container-aquila grid grid-cols-2 md:grid-cols-4 gap-6 py-12">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">{it.title}</div>
              <div className="text-xs text-muted-foreground">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedSection({ title, filter }: { title: string; filter: "bestseller" | "new" | "featured" }) {
  const { data: products = [] } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      let q = supabase.from("products").select("*").limit(4);
      if (filter === "bestseller") q = q.eq("is_bestseller", true);
      else if (filter === "new") q = q.eq("is_new", true);
      else q = q.eq("is_featured", true);
      const { data } = await q;
      return (data ?? []) as Product[];
    },
  });

  return (
    <section className="py-20">
      <div className="container-aquila">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-gold">المجموعة</span>
            <h2 className="text-4xl md:text-5xl font-display mt-2">{title}</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors">
            عرض الكل <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-24 bg-card/30 border-y border-border/40">
      <div className="container-aquila grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-gold">قصتنا</span>
          <h2 className="text-4xl md:text-5xl font-display mt-3 mb-6">
            النسر الذي يحلق <span className="gradient-gold-text">فوق المألوف</span>
          </h2>
          <p className="text-muted-foreground leading-loose mb-4">
            وُلدت Aquila من إيمان عميق بأن الأزياء ليست مجرد ملابس، بل لغة. لغة القوة، الثقة، والتفرّد. كل قطعة من Aquila تحكي قصة الحرفية المتقنة والرؤية الجريئة.
          </p>
          <p className="text-muted-foreground leading-loose mb-8">
            نختار خاماتنا من أفضل المصادر العالمية، ونصمم كل تفصيلة لتكون شهادة على ذوقك الراقي.
          </p>
          <Link to="/about" className="inline-flex items-center gap-3 text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors">
            اكتشف المزيد <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="aspect-[4/5] relative">
          <img src={heroImg} alt="Aquila Story" loading="lazy" width={800} height={1000} className="absolute inset-0 h-full w-full object-cover rounded-sm" />
          <div className="absolute inset-0 border border-gold/20 rounded-sm translate-x-6 translate-y-6 -z-10" />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "أحمد ع.", text: "جودة لا تُصدّق! الهودي يبدو ويُحس وكأنه قطعة فنية. سأطلب المزيد بالتأكيد.", rating: 5 },
    { name: "خالد م.", text: "أفضل خامة جربتها على الإطلاق. التصميم بسيط لكن يلفت الانتباه فوراً.", rating: 5 },
    { name: "محمد س.", text: "البنطلون مريح جداً وقصته مثالية. خدمة العملاء ممتازة أيضاً.", rating: 5 },
  ];
  return (
    <section className="py-24">
      <div className="container-aquila">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">آراء عملائنا</span>
          <h2 className="text-4xl md:text-5xl font-display mt-2">ما يقولونه عن Aquila</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 border border-border/40 bg-card/50 rounded-sm">
              <div className="flex gap-1 mb-4 text-gold">
                {Array.from({ length: r.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground/90 leading-loose mb-6">"{r.text}"</p>
              <div className="text-sm text-gold tracking-wider">— {r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="py-24 bg-card/40 border-t border-border/40">
      <div className="container-aquila max-w-2xl text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-gold">نشرتنا البريدية</span>
        <h2 className="text-4xl md:text-5xl font-display mt-3 mb-4">كن أول من يعرف</h2>
        <p className="text-muted-foreground mb-8">اشترك لتصلك أحدث المجموعات والعروض الحصرية قبل الجميع.</p>
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("تم الاشتراك بنجاح ✓"); setEmail(""); }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="بريدك الإلكتروني"
            className="flex-1 bg-background border border-border px-5 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
          />
          <button type="submit" className="bg-gold text-gold-foreground px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity rounded-sm">
            اشترك
          </button>
        </form>
      </div>
    </section>
  );
}
