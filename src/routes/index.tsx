import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Phone, MessageCircle, Star, ShieldCheck, Clock, MapPin, Wrench, Truck, BadgeCheck,
  Paintbrush, Snowflake, WashingMachine, Droplets, Zap, ShoppingBag, Hammer,
  ChevronLeft, ChevronRight, CheckCircle2, ClipboardList, Search, ThumbsUp, ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import hero from "@/assets/hero-craftsman.jpg";
import painting from "@/assets/painting.jpg";
import hvac from "@/assets/hvac.jpg";
import appliance from "@/assets/appliance.jpg";
import plumbing from "@/assets/plumbing.jpg";
import electrical from "@/assets/electrical.jpg";
import products from "@/assets/products.jpg";
import renovation from "@/assets/renovation.jpg";

const NAME = "İşletme";
const PHONE = "123456789";
const TEL = "tel:123456789";
const WA = "https://wa.me/123456789";
const ADDRESS = "Örnek Mah. Örnek Sk. No: 1, Şehir";
const waLink = (t: string) => `${WA}?text=${encodeURIComponent(t)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "İşletme | Tamir, Tadilat ve Teknik Servis" },
      { name: "description", content: "Boya badana, klima, kombi, beyaz eşya, tesisat, elektrik ve tadilat işleriniz için aynı gün usta. Garantili işçilik, şeffaf fiyat." },
      { property: "og:title", content: "İşletme – Tamir, Tadilat ve Teknik Servis" },
      { property: "og:description", content: "Evinizdeki her iş için tek adres: boya, tesisat, elektrik, klima, beyaz eşya ve ürün satışı." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Paintbrush, title: "Boya & Badana", img: painting, items: ["İç & dış cephe boya", "Alçı ve sıva", "Dekoratif boya"] },
  { icon: Snowflake, title: "Klima & Kombi", img: hvac, items: ["Montaj & bakım", "Gaz dolumu", "Arıza onarımı"] },
  { icon: WashingMachine, title: "Beyaz Eşya Servisi", img: appliance, items: ["Çamaşır & bulaşık makinesi", "Buzdolabı", "Fırın & ocak"] },
  { icon: Droplets, title: "Su Tesisatı", img: plumbing, items: ["Kaçak tespiti", "Batarya & lavabo", "Tıkanıklık açma"] },
  { icon: Zap, title: "Elektrik İşleri", img: electrical, items: ["Pano & sigorta", "Aydınlatma", "Priz & kablo yenileme"] },
  { icon: ShoppingBag, title: "Ürün & Yedek Parça", img: products, items: ["Beyaz eşya satışı", "Orijinal yedek parça", "Montajlı teslim"] },
];
const brands = ["Marka 1", "Marka 2", "Marka 3", "Marka 4", "Marka 5", "Marka 6", "Marka 7", "Marka 8"];
const steps = [
  { icon: ClipboardList, t: "Talebinizi İletin", d: "Telefon, WhatsApp veya form ile işinizi anlatın." },
  { icon: Search, t: "Ücretsiz Keşif", d: "Ustamız gelir, işi yerinde inceler ve fiyatı netleştirir." },
  { icon: Hammer, t: "Profesyonel Uygulama", d: "Onayınızla iş, temiz ve zamanında tamamlanır." },
  { icon: ThumbsUp, t: "Garantili Teslim", d: "Yapılan iş yazılı garanti ile teslim edilir." },
];
const stats = [
  { n: 1200, s: "+", t: "Tamamlanan İş" },
  { n: 15, s: "", t: "Yıllık Tecrübe" },
  { n: 4.9, s: "", t: "Müşteri Puanı" },
  { n: 7, s: "/24", t: "Ulaşılabilirlik" },
];
const reviews = [
  { name: "Müşteri A.", area: "Örnek Mah.", text: "Salonu ve mutfağı boyattık; zamanında geldiler, ortalığı tertemiz bıraktılar. Sonuç beklediğimizden de iyi." },
  { name: "Müşteri B.", area: "Örnek Mah.", text: "Kombimiz kışın durdu, aynı gün gelip çözdüler. Fiyat önceden söylendi, sürpriz çıkmadı." },
  { name: "Müşteri C.", area: "Örnek Mah.", text: "Banyo tesisatını yeniletip yeni çamaşır makinesini de onlardan aldık. Montajla birlikte teslim ettiler." },
];

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${className} fill-amber text-amber`} />)}</span>;
}
function CallBtn({ label = "Hemen Ara", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={TEL} className={`inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-6 py-4 text-lg font-bold text-amber-foreground shadow-cta transition hover:-translate-y-0.5 hover:brightness-105 ${className}`}>
      <Phone className="h-5 w-5" /> {label}
    </a>
  );
}
function WaBtn({ label = "WhatsApp'tan Fiyat Al", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={waLink("Merhaba, bir iş için fiyat bilgisi almak istiyorum.")} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-lg font-bold text-whatsapp-foreground transition hover:-translate-y-0.5 hover:brightness-110 ${className}`}>
      <MessageCircle className="h-5 w-5" /> {label}
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-24 font-sans text-foreground md:pb-0">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Showcase />
      <Brands />
      <Why />
      <ServiceForm />
      <Reviews />
      <Footer />
      <StickyBar />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-40 bg-navy text-navy-foreground transition-shadow duration-300 ${scrolled ? "shadow-xl" : ""}`}>
      <div className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        <a href="#" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber text-amber-foreground"><Wrench className="h-5 w-5" /></span>
          <span className="truncate font-display text-lg tracking-wide">{NAME.toLocaleUpperCase("tr")}</span>
        </a>
        <nav className="hidden gap-6 text-sm font-semibold text-navy-foreground/80 md:flex">
          <a href="#hizmetler" className="hover:text-amber">Hizmetler</a>
          <a href="#surec" className="hover:text-amber">Nasıl Çalışırız</a>
          <a href="#servis" className="hover:text-amber">Teklif Al</a>
          <a href="#yorumlar" className="hover:text-amber">Yorumlar</a>
        </nav>
        <a href={TEL} className="pulse-ring inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber px-3 py-2 text-sm font-bold text-amber-foreground">
          <Phone className="h-4 w-4" /><span className="hidden sm:inline">Bize Ulaşın:</span> {PHONE}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <img src={hero} alt="" aria-hidden className="ken-burns absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <span className="hero-in inline-flex items-center gap-2 rounded-full bg-amber/15 px-3 py-1 text-sm font-semibold text-amber">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber" /> Bugün için randevular açık
          </span>
          <h1 className="hero-in mt-4 text-3xl leading-tight sm:text-4xl md:text-6xl" style={{ animationDelay: "120ms" }}>
            Evinizdeki Her İş İçin <span className="text-amber">Tek Usta</span>, Tek Adres
          </h1>
          <p className="hero-in mt-5 max-w-xl text-lg text-navy-foreground/80" style={{ animationDelay: "240ms" }}>
            Boya badanadan tesisata, klimadan beyaz eşyaya kadar tüm tamir, tadilat ve teknik servis ihtiyaçlarınızda garantili işçilik.
          </p>
          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
            <CallBtn label={`Hemen Ara: ${PHONE}`} />
            <WaBtn />
          </div>
          <div className="hero-in mt-8 flex items-center gap-3 text-sm text-navy-foreground/75" style={{ animationDelay: "480ms" }}>
            <Stars /> <span><b className="text-navy-foreground">4.9/5</b> müşteri memnuniyeti</span>
          </div>
        </div>
        <div className="hero-in relative" style={{ animationDelay: "300ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-navy-foreground/10 shadow-2xl">
            <img src={hero} alt="Profesyonel usta" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-card p-4 text-card-foreground shadow-xl md:-left-8">
            <ShieldCheck className="h-9 w-9 text-amber" />
            <div><div className="font-bold">1 Yıl Garanti</div><div className="text-sm text-muted-foreground">Tüm işçiliklerde</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [v, setV] = useState(0);
  const [el, setEl] = useState<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [el, to]);
  const shown = Number.isInteger(to) ? Math.round(v).toLocaleString("tr-TR") : v.toFixed(1);
  return <span ref={setEl}>{shown}{suffix}</span>;
}

function Stats() {
  return (
    <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4">
      <Reveal from="zoom">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-lg md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.t} className="bg-card p-5 text-center">
              <div className="font-display text-3xl text-navy md:text-4xl"><Counter to={s.n} suffix={s.s} /></div>
              <div className="mt-1 text-sm text-muted-foreground">{s.t}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function SectionTitle({ k, t, light = false }: { k: string; t: string; light?: boolean }) {
  return (
    <Reveal className="mb-10 text-center">
      <div className="text-sm font-bold uppercase tracking-widest text-amber">{k}</div>
      <h2 className={`mt-2 text-2xl md:text-4xl ${light ? "" : "text-navy"}`}>{t}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber" />
    </Reveal>
  );
}

function Services() {
  return (
    <section id="hizmetler" className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle k="Hizmetlerimiz" t="Tamirden Tadilata Her İşte Uzmanız" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: I, title, img, items }, idx) => (
          <Reveal key={title} delay={(idx % 3) * 120}>
            <article className="group h-full overflow-hidden rounded-2xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img src={img} alt={title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-amber text-amber-foreground shadow-lg"><I className="h-5 w-5" /></span>
              </div>
              <div className="p-6">
                <h3 className="text-lg text-navy">{title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {items.map((i) => <li key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 shrink-0 text-whatsapp" />{i}</li>)}
                </ul>
                <a href={waLink(`Merhaba, ${title} hizmeti için fiyat almak istiyorum.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 font-bold text-navy transition-all hover:gap-2 hover:text-amber">
                  Fiyat Sor <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="surec" className="bg-navy py-20 text-navy-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle k="Nasıl Çalışırız" t="4 Adımda Sorunsuz Hizmet" light />
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map(({ icon: I, t, d }, idx) => (
            <Reveal key={t} delay={idx * 150}>
              <div className="relative h-full rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-6">
                <span className="absolute right-5 top-4 font-display text-4xl text-navy-foreground/10">0{idx + 1}</span>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber text-amber-foreground"><I className="h-6 w-6" /></span>
                <h3 className="mt-5 text-lg">{t}</h3>
                <p className="mt-2 text-navy-foreground/70">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2">
      <Reveal from="left">
        <div className="relative">
          <img src={renovation} alt="Tadilat uygulaması" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-amber p-5 text-amber-foreground shadow-cta md:-right-8">
            <div className="font-display text-3xl">15+</div><div className="text-sm font-semibold">Yıllık tecrübe</div>
          </div>
        </div>
      </Reveal>
      <Reveal from="right">
        <div className="text-sm font-bold uppercase tracking-widest text-amber">Tadilat & Yenileme</div>
        <h2 className="mt-2 text-2xl text-navy md:text-4xl">Küçük tamirden komple yenilemeye</h2>
        <p className="mt-4 text-lg text-muted-foreground">Mutfak, banyo ve salon yenilemelerinde keşiften teslimata tüm süreci tek ekip olarak yönetiyoruz. Malzeme seçimi, uygulama ve temizlik bizden.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Ücretsiz yerinde keşif", "Yazılı fiyat teklifi", "Zamanında teslim", "Temiz çalışma"].map((x) => (
            <li key={x} className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-5 w-5 text-whatsapp" />{x}</li>
          ))}
        </ul>
        <CallBtn className="mt-8" label="Keşif Randevusu Al" />
      </Reveal>
    </section>
  );
}

function Brands() {
  const row = [...brands, ...brands];
  return (
    <section className="overflow-hidden border-y bg-card py-10">
      <Reveal><div className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-muted-foreground">Tüm markalara servis ve ürün desteği</div></Reveal>
      <div className="flex w-max marquee gap-4">
        {row.map((b, i) => <span key={i} className="rounded-full border-2 border-navy/10 bg-background px-6 py-2 font-display text-navy">{b}</span>)}
      </div>
    </section>
  );
}

function Why() {
  const v = [
    { icon: Truck, t: "Aynı Gün Adreste", d: "Hızlı mobil ekip ile çağrınıza aynı gün dönüş." },
    { icon: ShieldCheck, t: "Yazılı Garanti", d: "Değişen parçalar ve işçilik garanti kapsamında." },
    { icon: BadgeCheck, t: "Şeffaf Fiyat", d: "Sürpriz ek ücret yok; onayınız olmadan işe başlanmaz." },
    { icon: Clock, t: "7/24 Destek", d: "Acil arızalarda gece gündüz ulaşabilirsiniz." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionTitle k={`Neden ${NAME}?`} t="Güvenle Kapınızı Açın" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {v.map(({ icon: I, t, d }, idx) => (
          <Reveal key={t} delay={idx * 120} from="zoom">
            <div className="h-full rounded-2xl border-t-4 border-amber bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <I className="h-10 w-10 text-amber" />
              <h3 className="mt-4 text-xl text-navy">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const jobs = ["Boya & Badana", "Klima / Kombi", "Beyaz Eşya", "Su Tesisatı", "Elektrik", "Tadilat & Yenileme", "Ürün / Yedek Parça", "Diğer"];

function ServiceForm() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Hizmet Talebi\nAd Soyad: ${f.get("name")}\nTelefon: ${f.get("phone")}\nHizmet: ${f.get("job")}\nNot: ${f.get("note") || "-"}`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  }
  const input = "w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base outline-none transition focus:border-amber";
  return (
    <section id="servis" className="bg-navy py-20 text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <Reveal from="left">
          <div className="text-sm font-bold uppercase tracking-widest text-amber">Ücretsiz Teklif</div>
          <h2 className="mt-2 text-3xl md:text-4xl">Formu doldurun, ustamız sizi hemen arasın.</h2>
          <p className="mt-4 text-navy-foreground/75">Talebiniz doğrudan WhatsApp üzerinden ekibimize iletilir. Acil durumda beklemeyin:</p>
          <CallBtn className="mt-6" label={`Ara: ${PHONE}`} />
        </Reveal>
        <Reveal from="right">
          <form onSubmit={submit} className="space-y-4 rounded-2xl bg-card p-6 text-card-foreground shadow-2xl">
            <input name="name" required maxLength={80} placeholder="Ad Soyad" className={input} />
            <input name="phone" required type="tel" maxLength={20} pattern="[0-9 +()-]{7,20}" placeholder="Telefon Numarası" className={input} />
            <select name="job" required defaultValue="" className={input}>
              <option value="" disabled>Hizmet Türü Seçin</option>
              {jobs.map((d) => <option key={d}>{d}</option>)}
            </select>
            <textarea name="note" rows={3} maxLength={500} placeholder="Kısaca işinizi anlatın" className={input} />
            <button type="submit" className="w-full rounded-xl bg-amber py-4 text-lg font-bold text-amber-foreground shadow-cta transition hover:brightness-105">Teklif İste</button>
            {sent && <p className="text-center text-sm font-semibold text-whatsapp">WhatsApp açıldı — mesajı göndermeyi unutmayın.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 6000); return () => clearInterval(t); }, []);
  const r = reviews[i] ?? reviews[0]!;
  return (
    <section id="yorumlar" className="mx-auto max-w-3xl px-4 py-20">
      <SectionTitle k="Müşteri Yorumları" t="Müşterilerimiz Ne Diyor?" />
      <Reveal from="zoom">
        <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <Stars className="h-5 w-5" />
            <span className="text-sm font-semibold text-muted-foreground">Müşteri Yorumu</span>
          </div>
          <p key={i} className="hero-in mt-4 min-h-28 text-lg">“{r.text}”</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-bold text-navy-foreground">{r.name[0]}</span>
            <div><div className="font-bold">{r.name}</div><div className="text-sm text-muted-foreground">{r.area}</div></div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">{reviews.map((_, k) => <button key={k} aria-label={`Yorum ${k + 1}`} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-amber" : "w-2.5 bg-border"}`} />)}</div>
            <div className="flex gap-2">
              <button aria-label="Önceki" onClick={() => setI((i - 1 + reviews.length) % reviews.length)} className="rounded-full border p-2 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
              <button aria-label="Sonraki" onClick={() => setI((i + 1) % reviews.length)} className="rounded-full border p-2 hover:bg-muted"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-3">
        <Reveal>
          <div className="font-display text-xl">{NAME.toLocaleUpperCase("tr")}</div>
          <p className="mt-3 text-navy-foreground/70">Tamir, tadilat, teknik servis ve ürün satışında güvenilir çözüm ortağınız.</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-3">
            <p className="flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-amber" />{ADDRESS}</p>
            <a href={TEL} className="flex gap-2 hover:text-amber"><Phone className="h-5 w-5 text-amber" />{PHONE}</a>
            <p className="flex gap-2"><Clock className="h-5 w-5 text-amber" />7/24 Açık</p>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="space-y-2 text-navy-foreground/80">
            <div className="font-bold text-navy-foreground">Hizmetler</div>
            {services.map((s) => <a key={s.title} href="#hizmetler" className="block hover:text-amber">{s.title}</a>)}
          </div>
        </Reveal>
      </div>
      <div className="border-t border-navy-foreground/10 py-5 text-center text-sm text-navy-foreground/60">© {new Date().getFullYear()} {NAME}. Tüm hakları saklıdır.</div>
    </footer>
  );
}

function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t bg-card p-2 shadow-2xl md:hidden">
      <a href={TEL} className="flex items-center justify-center gap-1.5 rounded-xl bg-amber py-3.5 text-sm font-bold text-amber-foreground"><Phone className="h-4 w-4" />Hemen Ara</a>
      <a href={waLink("Merhaba, bir iş için bilgi almak istiyorum.")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-whatsapp py-3.5 text-sm font-bold text-whatsapp-foreground"><MessageCircle className="h-4 w-4" />WhatsApp</a>
    </div>
  );
}
