import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card mt-24">
      <div className="container-aquila py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-display text-2xl tracking-widest gradient-gold-text">AQUILA</h3>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            علامة الستريت وير الفاخرة. تصاميم حصرية تجمع بين الأناقة والقوة.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-gold mb-4">المتجر</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/shop" search={{ category: "hoodies" }} className="hover:text-foreground">الهوديز</Link></li>
            <li><Link to="/shop" search={{ category: "pants" }} className="hover:text-foreground">البناطيل</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">جميع المنتجات</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-gold mb-4">الشركة</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">عن Aquila</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">تواصل معنا</Link></li>
            <li><Link to="/account" className="hover:text-foreground">حسابي</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm tracking-widest uppercase text-gold mb-4">المساعدة</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>الشحن والإرجاع</li>
            <li>دليل المقاسات</li>
            <li>الأسئلة الشائعة</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container-aquila py-6 text-center text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} AQUILA. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
