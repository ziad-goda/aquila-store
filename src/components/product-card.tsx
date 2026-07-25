import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { resolveImage } from "@/lib/image";

export function ProductCard({ product }: { product: Product }) {
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group block animate-fade-up"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border/40 rounded-sm">
        <img
          src={resolveImage(product.images[0])}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="text-[10px] tracking-widest uppercase bg-gold text-gold-foreground px-2.5 py-1 rounded-sm font-semibold">
              جديد
            </span>
          )}
          {discount > 0 && (
            <span className="text-[10px] tracking-widest uppercase bg-destructive text-destructive-foreground px-2.5 py-1 rounded-sm font-semibold">
              -{discount}%
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-base font-medium text-foreground group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg text-gold font-semibold">{product.price} ج.م</span>
          {product.compare_price && (
            <span className="text-sm text-muted-foreground line-through">
              {product.compare_price} ج.م
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
