import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Phone, MessageCircle, Star, ShieldCheck, Clock, MapPin, Wrench, Truck, BadgeCheck,
  Flame, Snowflake, WashingMachine, Refrigerator, Tv, ChevronLeft, ChevronRight, CheckCircle2,
} from "lucide-react";
import storefront from "@/assets/storefront.jpg";
import shopEntrance from "@/assets/dukkan-girisi.png.asset.json";
import dishwasher from "@/assets/dishwasher-repair.jpg";
import acService from "@/assets/ac-service.jpg";
import acOutdoor from "@/assets/ac-outdoor.jpg";
import fridgeOpen from "@/assets/fridge-open.jpg";
import floorAc from "@/assets/floor-ac.jpg";

// Keep the hosted photo URL absolute so external Cloudflare Pages deployments
// do not look for Lovable's asset endpoint on their own domain.
const SHOP_ENTRANCE_URL = new URL(shopEntrance.url, "https://arasteknik.lovable.app").href;

const PHONE = "0532 369 39 23";
const TEL = "tel:+905323693923";
const WA = "https://wa.me/905323693923";
const waLink = (t: string) => `${WA}?text=${encodeURIComponent(t)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aras Teknik | Elazığ Kombi, Klima ve Beyaz Eşya Servisi 7/24" },
      { name: "description", content: "Elazığ'da kombi, klima, beyaz eşya ve TV arızalarına aynı gün kapıda servis. 1 yıl garanti, orijinal parça, 7/24 acil ekip. 0532 369 39 23" },
      { property: "og:title", content: "Aras Teknik – Elazığ 7/24 Teknik Servis" },
      { property: "og:description", content: "Kombi, klima, beyaz eşya ve TV tamiri. Aynı gün servis, 1 yıl garanti. Google puanı 4.8." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SHOP_ENTRANCE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SHOP_ENTRANCE_URL },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Flame, title: "Kombi Bakım ve Onarım", img: acOutdoor, items: ["Petek temizleme", "Kart tamiri", "Gaz kaçak kontrolü"] },
  { icon: Snowflake, title: "Klima Servisi", img: acService, items: ["Montaj & söküm", "Gaz dolumu", "Periyodik bakım"] },
  { icon: WashingMachine, title: "Çamaşır & Bulaşık Makinesi", img: dishwasher, items: ["Kazan değişimi", "Su tahliye arızaları", "Pompa değişimi"] },
  { icon: Refrigerator, title: "Buzdolabı & Derin Dondurucu", img: fridgeOpen, items: ["Motor değişimi", "Gaz basımı", "No-frost soğutma arızaları"] },
  { icon: Tv, title: "Televizyon & Panel Onarımı", img: floorAc, items: ["Panel & ekran arızaları", "Anakart tamiri", "Görüntü / ses sorunları"] },
];
const brands = ["Arçelik", "Beko", "Bosch", "Vestel", "Siemens", "Demirdöküm", "Baymak", "Vaillant", "ECA", "Daikin", "Profilo"];
const reviews = [
  { name: "Mehmet K.", area: "Ataşehir", text: "Kombimiz gece arızalandı, aradıktan 40 dakika sonra kapıdaydılar. Kart arızasını hemen buldu, fiyat da çok makuldü. Teşekkürler Aras Teknik." },
  { name: "Ayşe D.", area: "Olgunlar", text: "Çamaşır makinemin pompasını aynı gün değiştirdiler. Usta çok temiz çalıştı, ortalığı tertemiz bıraktı. Gönül rahatlığıyla tavsiye ederim." },
  { name: "Hasan Y.", area: "Sürsürü", text: "Klima montajı ve gaz dolumu yaptırdım. Önceden fiyat söylendi, sürpriz ücret çıkmadı. Elazığ'da güvenilir servis arayan herkese öneririm." },
  { name: "Zeynep A.", area: "Cumhuriyet Mah.", text: "Buzdolabı soğutmuyordu, no-frost arızasıydı. Hızlı geldiler, orijinal parça taktılar ve 1 yıl garanti verdiler. Çok memnun kaldık." },
];

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${className} fill-amber text-amber`} />)}</span>;
}

function CallBtn({ label = `Hemen Ara`, className = "" }: { label?: string; className?: string }) {
  return (
    <a href={TEL} className={`inline-flex items-center justify-center gap-2 rounded-xl bg-amber px-6 py-4 text-lg font-bold text-amber-foreground shadow-cta transition hover:brightness-105 ${className}`}>
      <Phone className="h-5 w-5" /> {label}
    </a>
  );
}
function WaBtn({ label = "WhatsApp'tan Fiyat Al", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={waLink("Merhaba, cihazım için servis ve fiyat bilgisi almak istiyorum.")} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-lg font-bold text-whatsapp-foreground transition hover:brightness-110 ${className}`}>
      <MessageCircle className="h-5 w-5" /> {label}
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground md:pb-0">
      <Header />
      <Hero />
      <TrustStrip />
      <Services />
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
  return (
    <header className="sticky top-0 z-40 border-b border-navy-foreground/10 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 md:flex md:justify-between">
        <a href="#" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber text-amber-foreground"><Wrench className="h-5 w-5" /></span>
          <span className="truncate font-display text-lg tracking-wide">ARAS TEKNİK</span>
        </a>
        <nav className="hidden gap-6 text-sm font-semibold text-navy-foreground/80 md:flex">
          <a href="#hizmetler" className="hover:text-amber">Hizmetler</a>
          <a href="#markalar" className="hover:text-amber">Markalar</a>
          <a href="#servis" className="hover:text-amber">Servis Çağır</a>
          <a href="#yorumlar" className="hover:text-amber">Yorumlar</a>
        </nav>
        <a href={TEL} className="pulse-ring inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber px-3 py-2 text-sm font-bold text-amber-foreground">
          <Phone className="h-4 w-4" /><span className="hidden sm:inline">7/24 Acil Servis:</span> {PHONE}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <img src={storefront} alt="Aras Teknik Elazığ servis dükkanı" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/85 to-navy" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.3fr_1fr] md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-3 py-1 text-sm font-semibold text-amber">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber" /> Şu an nöbetçi ekip sahada
          </span>
          <h1 className="mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl">
            Elazığ'da Kombi, Klima ve Beyaz Eşya Arızalarına <span className="text-amber">Aynı Gün</span> Kesin Çözüm
          </h1>
          <p className="mt-4 max-w-xl text-lg text-navy-foreground/80">
            100'den fazla memnun müşteri, 1 yıl resmi servis garantisi ve 7/24 nöbetçi acil teknik ekip.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CallBtn label={`Hemen Ara: ${PHONE}`} />
            <WaBtn />
          </div>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border-4 border-navy-foreground/10 md:mx-0 md:aspect-auto md:max-w-none">
          <img src={SHOP_ENTRANCE_URL} alt="Aras Teknik dükkan girişi" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Star, t: "4.8 / 5 Google", s: "103+ gerçek yorum" },
    { icon: ShieldCheck, t: "1 Yıl Garanti", s: "Parça & işçilik" },
    { icon: Clock, t: "7/24 Açık", s: "Acil teknik servis" },
    { icon: BadgeCheck, t: "Orijinal Parça", s: "Aynı gün kapıda" },
  ];
  return (
    <div className="relative z-10 mx-auto -mt-6 max-w-6xl px-4">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border shadow-lg md:grid-cols-4">
        {items.map(({ icon: I, t, s }) => (
          <div key={t} className="flex items-center gap-3 bg-card p-4">
            <I className="h-7 w-7 shrink-0 text-amber" />
            <div className="min-w-0"><div className="font-bold leading-tight">{t}</div><div className="text-sm text-muted-foreground">{s}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ k, t }: { k: string; t: string }) {
  return (
    <div className="mb-8 text-center">
      <div className="text-sm font-bold uppercase tracking-widest text-amber">{k}</div>
      <h2 className="mt-2 text-2xl text-navy md:text-4xl">{t}</h2>
    </div>
  );
}

function Services() {
  return (
    <section id="hizmetler" className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle k="Hizmetlerimiz" t="Evinizdeki Her Arızaya Uzman Çözüm" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: I, title, img, items }) => (
          <article key={title} className="overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-44"><img src={img} alt={title} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-lg bg-amber text-amber-foreground"><I className="h-5 w-5" /></span>
            </div>
            <div className="p-5">
              <h3 className="text-lg text-navy">{title}</h3>
              <ul className="mt-3 space-y-1.5">
                {items.map((i) => <li key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 shrink-0 text-whatsapp" />{i}</li>)}
              </ul>
              <a href={waLink(`Merhaba, ${title} için servis istiyorum.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 font-bold text-navy hover:text-amber">
                Fiyat Sor →
              </a>
            </div>
          </article>
        ))}
        <div className="flex flex-col justify-center rounded-2xl bg-navy p-6 text-navy-foreground">
          <h3 className="text-xl">Arızanızı listede göremediniz mi?</h3>
          <p className="mt-2 text-navy-foreground/75">Hemen arayın, ustamız telefonda ön tespit yapsın.</p>
          <CallBtn className="mt-5" />
        </div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section id="markalar" className="border-y bg-card py-12">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle k="Desteklenen Markalar" t="Tüm Markalara Servis" />
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((b) => <span key={b} className="rounded-full border-2 border-navy/10 bg-background px-5 py-2 font-display text-navy">{b}</span>)}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const v = [
    { icon: Truck, t: "1 Saat İçinde Adreste", d: "Elazığ merkez ve tüm ilçelerine hızlı mobil servis aracı." },
    { icon: ShieldCheck, t: "1 Yıl Yazılı Garanti", d: "Değişen tüm parçalar ve yapılan işçilik 1 yıl garantilidir." },
    { icon: BadgeCheck, t: "Şeffaf Fiyatlandırma", d: "Sürpriz ek maliyet yok, arıza tespiti sonrası onayınızla tamir." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionTitle k="Neden Aras Teknik?" t="Güvenle Kapınızı Açın" />
      <div className="grid gap-5 md:grid-cols-3">
        {v.map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-2xl border-t-4 border-amber bg-card p-6 shadow-sm">
            <I className="h-10 w-10 text-amber" />
            <h3 className="mt-4 text-xl text-navy">{t}</h3>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const devices = ["Kombi", "Klima", "Çamaşır Makinesi", "Bulaşık Makinesi", "Buzdolabı / Derin Dondurucu", "Televizyon", "Diğer"];

function ServiceForm() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Servis Talebi\nAd Soyad: ${f.get("name")}\nTelefon: ${f.get("phone")}\nCihaz: ${f.get("device")}\nArıza: ${f.get("note") || "-"}`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  }
  const input = "w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-base outline-none focus:border-amber";
  return (
    <section id="servis" className="bg-navy py-16 text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        <div>
          <div className="text-sm font-bold uppercase tracking-widest text-amber">Hızlı Servis Çağır</div>
          <h2 className="mt-2 text-3xl md:text-4xl">Formu doldurun, ustamız sizi hemen arasın.</h2>
          <p className="mt-4 text-navy-foreground/75">Talebiniz doğrudan WhatsApp üzerinden ekibimize iletilir. Acil durumda beklemeyin:</p>
          <CallBtn className="mt-6" label={`Ara: ${PHONE}`} />
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-2xl bg-card p-6 text-card-foreground shadow-2xl">
          <input name="name" required maxLength={80} placeholder="Ad Soyad" className={input} />
          <input name="phone" required type="tel" maxLength={20} pattern="[0-9 +()-]{10,20}" placeholder="Telefon Numarası" className={input} />
          <select name="device" required defaultValue="" className={input}>
            <option value="" disabled>Cihaz Türü Seçin</option>
            {devices.map((d) => <option key={d}>{d}</option>)}
          </select>
          <textarea name="note" rows={3} maxLength={500} placeholder="Arıza Notu (örn. kombi su akıtıyor)" className={input} />
          <button type="submit" className="w-full rounded-xl bg-amber py-4 text-lg font-bold text-amber-foreground shadow-cta hover:brightness-105">Servis Çağır</button>
          {sent && <p className="text-center text-sm font-semibold text-whatsapp">WhatsApp açıldı — mesajı göndermeyi unutmayın.</p>}
        </form>
      </div>
    </section>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 6000); return () => clearInterval(t); }, []);
  const r = reviews[i] ?? reviews[0]!;
  return (
    <section id="yorumlar" className="mx-auto max-w-3xl px-4 py-16">
      <SectionTitle k="Müşteri Yorumları" t="Google'da 4.8 Puan, 103+ Yorum" />
      <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <Stars className="h-5 w-5" />
          <span className="text-sm font-semibold text-muted-foreground">Google Yorumu</span>
        </div>
        <p className="mt-4 min-h-28 text-lg">“{r.text}”</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-bold text-navy-foreground">{r.name[0]}</span>
          <div><div className="font-bold">{r.name}</div><div className="text-sm text-muted-foreground">{r.area}, Elazığ</div></div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">{reviews.map((_, k) => <button key={k} aria-label={`Yorum ${k + 1}`} onClick={() => setI(k)} className={`h-2.5 rounded-full transition-all ${k === i ? "w-8 bg-amber" : "w-2.5 bg-border"}`} />)}</div>
          <div className="flex gap-2">
            <button aria-label="Önceki" onClick={() => setI((i - 1 + reviews.length) % reviews.length)} className="rounded-full border p-2 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></button>
            <button aria-label="Sonraki" onClick={() => setI((i + 1) % reviews.length)} className="rounded-full border p-2 hover:bg-muted"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div className="space-y-4">
          <div className="font-display text-xl">ARAS TEKNİK</div>
          <p className="text-navy-foreground/70">Beyaz Eşya, Kombi, Klima ve TV Servisi</p>
          <p className="flex gap-2"><MapPin className="h-5 w-5 shrink-0 text-amber" />Üniversite Mah. Hanköyü Sk. No: 41/A, 23270 Merkez / Elazığ</p>
          <a href={TEL} className="flex gap-2 hover:text-amber"><Phone className="h-5 w-5 text-amber" />{PHONE}</a>
          <p className="flex gap-2"><Clock className="h-5 w-5 text-amber" />7/24 Açık</p>
        </div>
        <iframe title="Aras Teknik konum" className="h-64 w-full rounded-2xl border-0" loading="lazy"
          src="https://www.google.com/maps?q=%C3%9Cniversite+Mahallesi+Hank%C3%B6y%C3%BC+Sokak+41+A+23270+Elaz%C4%B1%C4%9F+Merkez&output=embed" />
      </div>
      <div className="border-t border-navy-foreground/10 py-5 text-center text-sm text-navy-foreground/60">© {new Date().getFullYear()} Aras Teknik – Elazığ. Tüm hakları saklıdır.</div>
    </footer>
  );
}

function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t bg-card p-2 shadow-2xl md:hidden">
      <a href={TEL} className="flex items-center justify-center gap-1.5 rounded-xl bg-amber py-3.5 text-sm font-bold text-amber-foreground"><Phone className="h-4 w-4" />Hemen Ara: {PHONE}</a>
      <a href={waLink("Merhaba, arıza bildirmek istiyorum.")} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-xl bg-whatsapp py-3.5 text-sm font-bold text-whatsapp-foreground"><MessageCircle className="h-4 w-4" />WhatsApp Arıza Bildir</a>
    </div>
  );
}
