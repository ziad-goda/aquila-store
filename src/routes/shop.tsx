import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";
import { z } from "zod";

const searchSchema = z.object({
  category: z.enum(["hoodies", "pants"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "المتجر — Aquila" },
      { name: "description", content: "تسوّق مجموعة Aquila الكاملة من الهوديز والبناطيل الفاخرة." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { category: catParam } = Route.useSearch();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | "hoodies" | "pants">(catParam ?? "all");
  const [size, setSize] = useState<string>("all");
  const [color, setColor] = useState<string>("all");
  const [sort, setSort] = useState<"new" | "price-asc" | "price-desc" | "bestseller">("new");
  const [maxPrice, setMaxPrice] = useState(1500);

  const { data: products = [] } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*");
      return (data ?? []) as Product[];
    },
  });

  const filtered = useMemo(() => {
    let arr = [...products];
    if (category !== "all") arr = arr.filter((p) => p.category === category);
    if (search) arr = arr.filter((p) => p.name.includes(search));
    if (size !== "all") arr = arr.filter((p) => p.sizes.includes(size));
    if (color !== "all") arr = arr.filter((p) => p.colors.includes(color));
    arr = arr.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    else if (sort === "bestseller") arr.sort((a, b) => Number(b.is_bestseller) - Number(a.is_bestseller));
    else arr.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    return arr;
  }, [products, category, search, size, color, sort, maxPrice]);

  const allColors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.colors))), [products]);

  return (
    <>
      <Header />
      <main className="container-aquila py-12">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">المتجر</span>
          <h1 className="text-5xl font-display mt-2">مجموعتنا</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث..."
                className="w-full bg-input border border-border pr-10 pl-3 py-2.5 text-sm focus:border-gold focus:outline-none rounded-sm"
              />
            </div>

            <FilterGroup title="الفئة">
              {[{v:"all",l:"الكل"},{v:"hoodies",l:"هوديز"},{v:"pants",l:"بناطيل"}].map((o)=>(
                <button key={o.v} onClick={() => setCategory(o.v as never)}
                  className={`block w-full text-right py-1.5 text-sm transition-colors ${category===o.v?"text-gold":"text-muted-foreground hover:text-foreground"}`}>
                  {o.l}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="المقاس">
              <div className="flex flex-wrap gap-2">
                {["all","S","M","L","XL","XXL"].map((s)=>(
                  <button key={s} onClick={() => setSize(s)}
                    className={`min-w-10 h-9 px-3 text-xs border rounded-sm transition-colors ${size===s?"bg-gold text-gold-foreground border-gold":"border-border hover:border-gold"}`}>
                    {s==="all"?"الكل":s}
                  </button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="اللون">
              <select value={color} onChange={(e)=>setColor(e.target.value)} className="w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none">
                <option value="all">جميع الألوان</option>
                {allColors.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup title={`السعر: حتى ${maxPrice} ج.م`}>
              <input type="range" min={100} max={1500} step={50} value={maxPrice} onChange={(e)=>setMaxPrice(+e.target.value)} className="w-full accent-[var(--gold)]" />
            </FilterGroup>

            <FilterGroup title="ترتيب">
              <select value={sort} onChange={(e)=>setSort(e.target.value as never)} className="w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:border-gold focus:outline-none">
                <option value="new">الأحدث</option>
                <option value="bestseller">الأكثر مبيعاً</option>
                <option value="price-asc">السعر: من الأقل</option>
                <option value="price-desc">السعر: من الأعلى</option>
              </select>
            </FilterGroup>
          </aside>

          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-4">{filtered.length} منتج</div>
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">لا توجد منتجات مطابقة</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs tracking-widest uppercase text-gold mb-3">{title}</h3>
      {children}
    </div>
  );
}
