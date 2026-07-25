import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import logo from "@/assets/logo.png";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "تسجيل الدخول — Aquila" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: (redirect as never) ?? "/account" });
    });
  }, [redirect, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/account`, data: { full_name: name } },
        });
        if (error) throw error;
        toast.success("تم إنشاء حسابك ✓");
        navigate({ to: (redirect as never) ?? "/account" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("مرحباً بعودتك ✓");
        navigate({ to: (redirect as never) ?? "/account" });
      }
    }} catch (err: unknown) {
  console.error("Supabase Error:", err);

  if (err instanceof Error) {
    console.error("Message:", err.message);
  }

  toast.error(err instanceof Error ? err.message : "حدث خطأ");
} finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-md">
        <Link to="/" className="flex flex-col items-center mb-10">
          <img src={logo} alt="Aquila" width={64} height={64} className="h-16 w-16 object-contain" />
          <span className="font-display text-3xl tracking-widest gradient-gold-text mt-2">AQUILA</span>
        </Link>
        <div className="p-8 border border-border/40 bg-card/60 rounded-sm">
          <div className="flex border-b border-border/40 mb-6">
            <button onClick={()=>setMode("login")} className={`flex-1 pb-3 text-sm tracking-widest uppercase ${mode==="login"?"text-gold border-b-2 border-gold":"text-muted-foreground"}`}>دخول</button>
            <button onClick={()=>setMode("signup")} className={`flex-1 pb-3 text-sm tracking-widest uppercase ${mode==="signup"?"text-gold border-b-2 border-gold":"text-muted-foreground"}`}>تسجيل</button>
          </div>
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs tracking-widest uppercase text-gold mb-2">الاسم</label>
                <input required value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-input border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm" />
              </div>
            )}
            <div>
              <label className="block text-xs tracking-widest uppercase text-gold mb-2">البريد الإلكتروني</label>
              <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-input border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm" dir="ltr" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-gold mb-2">كلمة المرور</label>
              <input type="password" required minLength={6} value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-input border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold text-gold-foreground py-3.5 text-sm tracking-widest uppercase font-semibold shadow-gold hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? "جاري..." : mode === "login" ? "دخول" : "إنشاء حساب"}
            </button>
          </form>
        </div>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-gold mt-6">← العودة للمتجر</Link>
      </div>
    </main>
  );
}
