import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن Aquila — قصتنا" },
      { name: "description", content: "تعرّف على قصة Aquila، علامة الستريت وير الفاخرة التي تجمع بين الأناقة والقوة." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img src={heroImg} alt="" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="relative container-aquila h-full flex items-end pb-16">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gold">قصتنا</span>
              <h1 className="text-5xl md:text-7xl font-display mt-3 gradient-gold-text">عن Aquila</h1>
            </div>
          </div>
        </section>

        <section className="container-aquila py-20 max-w-3xl space-y-8 text-lg leading-loose text-muted-foreground">
          <p>
            <span className="gradient-gold-text font-semibold">Aquila</span> — كلمة لاتينية تعني "النسر". رمز للحرية، القوة، والرؤية الحادة. هذه هي الروح التي بُنيت عليها علامتنا.
          </p>
          <p>
            وُلدت Aquila من شغفٍ بصياغة الستريت وير بمنظور جديد. منظور لا يتنازل عن الجودة، ولا يهادن في التصميم. كل قطعة هي ثمرة شهور من التطوير، اختيار الخامات الفاخرة من إيطاليا والبرتغال، والعمل مع أمهر الحرفيين.
          </p>
          <p>
            نؤمن بأن الفخامة الحقيقية تكمن في التفاصيل: غرزة دقيقة، خامة تستحق اللمس، تصميم يصمد أمام الزمن. لذلك نُنتج بكميات محدودة، ونرفض التنازل عن معاييرنا مهما كانت التكلفة.
          </p>
          <p>
            Aquila ليست مجرد ملابس — إنها بيان. بيان لمن يصنعون مساراتهم الخاصة، ولمن يعرفون أن الأناقة الحقيقية هي ثقة هادئة.
          </p>
        </section>

        <section className="bg-card/30 border-y border-border/40 py-20">
          <div className="container-aquila grid md:grid-cols-3 gap-12 text-center">
            {[
              { n: "٢٠٢٣", t: "تأسست في" },
              { n: "+٥٠٠٠", t: "عميل سعيد" },
              { n: "+٥٠", t: "تصميم حصري" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-display gradient-gold-text mb-2">{s.n}</div>
                <div className="text-sm tracking-widest uppercase text-muted-foreground">{s.t}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
