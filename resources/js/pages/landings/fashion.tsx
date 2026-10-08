// Landing page KAINARA, label fashion tenun Indonesia.
// Halaman ini TIDAK memakai AuthenticatedLayout, header/nav + footer inline, self-contained.
// Tidak menerima props.
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { StickyMobileCta } from '@/components/sticky-mobile-cta';
import {
    ArrowRight,
    AtSign,
    Award,
    Check,
    Handshake,
    Leaf,
    Menu,
    Plus,
    Quote,
    Search,
    ShieldCheck,
    ShoppingBag,
    Star,
    Truck,
    X,
    type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Format rupiah gaya Indonesia: 389000 -> "Rp389.000"
const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;

// ---------- Data ----------

interface Kategori {
    nama: string;
    jumlah: number;
    deskripsi: string;
    foto: string; // foto lokal di public/images/landing-fashion/
}

const KATEGORI: Kategori[] = [
    { nama: 'Kemeja', jumlah: 48, deskripsi: 'Tenun ATBM untuk harian', foto: '/images/landing-fashion/kategori-kemeja.jpg' },
    { nama: 'Kebaya Modern', jumlah: 36, deskripsi: 'Siluet klasik, potongan kini', foto: '/images/landing-fashion/kategori-kebaya.jpg' },
    { nama: 'Outer', jumlah: 24, deskripsi: 'Jaket & kimono tenun', foto: '/images/landing-fashion/kategori-outer.jpg' },
    { nama: 'Aksesoris', jumlah: 52, deskripsi: 'Syal, tas & ikat kepala', foto: '/images/landing-fashion/kategori-aksesoris.jpg' },
];

interface Produk {
    nama: string;
    harga: number;
    hargaCoret?: number;
    rating: number;
    ulasan: number;
    badge?: string;
    foto: string; // foto lokal di public/images/landing-fashion/
}

const PRODUK: Produk[] = [
    {
        nama: 'Kemeja Tenun Troso Cokelat Tanah',
        harga: 389000,
        hargaCoret: 459000,
        rating: 4.9,
        ulasan: 212,
        badge: 'Terlaris',
        foto: '/images/landing-fashion/kategori-kemeja.jpg',
    },
    {
        nama: 'Kebaya Modern Kutubaru Sage',
        harga: 549000,
        rating: 4.8,
        ulasan: 167,
        badge: 'Baru',
        foto: '/images/landing-fashion/kategori-kebaya.jpg',
    },
    {
        nama: 'Kimono Tenun Ulos Hitam',
        harga: 479000,
        hargaCoret: 599000,
        rating: 4.9,
        ulasan: 98,
        foto: '/images/landing-fashion/kategori-outer.jpg',
    },
    {
        nama: 'Syal Tenun Songket Lombok',
        harga: 189000,
        rating: 4.7,
        ulasan: 341,
        badge: 'Restock',
        foto: '/images/landing-fashion/kategori-aksesoris.jpg',
    },
];

interface Nilai {
    icon: LucideIcon;
    judul: string;
    deskripsi: string;
}

const NILAI: Nilai[] = [
    { icon: Leaf, judul: 'Pewarna Alam', deskripsi: 'Indigo, soga, dan mahoni dari kebun pewarna mitra kami di Jawa Tengah.' },
    { icon: Handshake, judul: '1.200+ Pengrajin', deskripsi: 'Bekerja langsung dengan penenun di Troso, Lombok, dan Sumba, tanpa perantara.' },
    { icon: Award, judul: 'Kualitas Butik', deskripsi: 'Setiap helai diperiksa jahitan dan kerapatan tenunnya sebelum dikirim.' },
    { icon: Truck, judul: 'Kirim Se-Indonesia', deskripsi: 'Gratis ongkir untuk pembelian di atas Rp500.000, tiba 2–5 hari kerja.' },
];

// Alur "dari penenun ke pintumu", pola section bergantian, bukan kartu 3 kolom.
const ALUR = [
    {
        tahap: '01',
        judul: 'Dipilih dari 1.200 penenun',
        deskripsi: 'Kami membeli langsung dari pengrajin Troso, Lombok, dan Sumba dengan harga yang mereka tentukan sendiri, bukan harga tengkulak.',
    },
    {
        tahap: '02',
        judul: 'Dijahit presisi di atelier Jakarta',
        deskripsi: 'Setiap potongan melalui 14 titik pemeriksaan jahitan sebelum dinyatakan lolos. Yang gagal, tidak dijual.',
    },
    {
        tahap: '03',
        judul: 'Tiba di pintumu 2–5 hari',
        deskripsi: 'Dikemas tanpa plastik sekali pakai, gratis ongkir di atas Rp500.000, dan bisa ditukar ukuran dalam 14 hari.',
    },
];

// ---------- Komponen kecil ----------

// Bintang rating sederhana
function Bintang({ nilai }: { nilai: number }) {
    return (
        <span className="flex items-center gap-0.5" aria-label={`Rating ${nilai} dari 5`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={cn('h-3.5 w-3.5', i <= Math.round(nilai) ? 'fill-amber-400 text-amber-400' : 'text-stone-300')}
                />
            ))}
        </span>
    );
}

// Foto editorial untuk hero
function PanelEditorial() {
    return (
        <div className="relative h-full overflow-hidden rounded-3xl shadow-2xl">
            <img
                src="/images/landing-fashion/hero.jpg"
                alt="Model mengenakan busana tenun Kainara, Koleksi 2026"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            {/* Label koleksi */}
            <div className="absolute left-6 top-6">
                <Badge className="bg-amber-500 text-stone-950 hover:bg-amber-400">Koleksi 2026</Badge>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="text-amber-50">
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Tenun Troso · Jepara</p>
                    <p className="mt-1 font-display text-2xl italic">"Wastra Nusantara"</p>
                </div>
            </div>
        </div>
    );
}

// ---------- Halaman ----------

export default function Fashion() {
    const [keranjang, setKeranjang] = useState(2);
    const [menuBuka, setMenuBuka] = useState(false);
    const [email, setEmail] = useState('');
    const [berlangganan, setBerlangganan] = useState(false);

    const tambahKeranjang = () => setKeranjang((c) => c + 1);

    const kirimNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim().length > 3 && email.includes('@')) setBerlangganan(true);
    };

    const scrollKe = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className="min-h-screen bg-[#faf7f2] font-sans text-stone-900 antialiased">
            {/* Bilah pengumuman */}
            <div className="bg-stone-950 px-4 py-2 text-center text-xs font-medium tracking-wide text-amber-200">
                Gratis ongkir se-Indonesia untuk pembelian di atas Rp500.000 &nbsp;·&nbsp; Koleksi terbaru 2026 telah tiba
            </div>

            {/* Navbar lengket */}
            <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#faf7f2]/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                    <a href="#atas" className="font-display text-2xl font-bold tracking-[0.25em] text-stone-950">
                        KAINARA
                    </a>
                    <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
                        <a href="#koleksi" className="text-stone-600 transition hover:text-stone-950">Koleksi</a>
                        <a href="#lookbook" className="text-stone-600 transition hover:text-stone-950">Lookbook</a>
                        <a href="#cerita" className="text-stone-600 transition hover:text-stone-950">Cerita Kami</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" aria-label="Cari" onClick={() => scrollKe('koleksi')}>
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="relative" aria-label="Tas belanja" onClick={() => scrollKe('koleksi')}>
                            <ShoppingBag className="h-5 w-5" />
                            {keranjang > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1 text-[11px] font-bold text-white">
                                    {keranjang}
                                </span>
                            )}
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={() => setMenuBuka((v) => !v)}>
                            {menuBuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
                {menuBuka && (
                    <nav className="border-t border-stone-200 bg-[#faf7f2] px-4 py-3 md:hidden">
                        {[
                            { href: '#koleksi', label: 'Koleksi' },
                            { href: '#lookbook', label: 'Lookbook' },
                            { href: '#cerita', label: 'Cerita Kami' },
                        ].map((item) => (
                            <a key={item.href} href={item.href} onClick={() => setMenuBuka(false)} className="block py-2 text-sm font-medium text-stone-700">
                                {item.label}
                            </a>
                        ))}
                    </nav>
                )}
            </header>

            {/* Hero editorial, 1 proposisi konkret, 1 CTA primer, 1 sekunder tenang */}
            <section id="atas" className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
                <div>
                    <h1 className="font-display text-4xl font-bold leading-tight text-stone-950 sm:text-5xl lg:text-6xl">
                        Tenun asli, harga jujur,
                        <br />
                        <span className="italic text-amber-700">mulai Rp189.000, tiba 2–5 hari.</span>
                    </h1>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg">
                        Busana siap pakai dari tenun ATBM asli Jepara, Lombok, dan Sumba. Dibeli langsung dari
                        pengrajinnya, dijahit presisi di atelier Jakarta.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button size="lg" className="bg-stone-950 text-white hover:bg-stone-800" onClick={() => scrollKe('koleksi')}>
                            Belanja Koleksi <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <a href="#lookbook" className="text-sm font-semibold text-stone-700 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-stone-950">
                            Lihat lookbook dulu
                        </a>
                    </div>
                    <div className="mt-8 flex items-center gap-6 text-sm text-stone-600">
                        <span className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-amber-700" /> Tenun asli bersertifikat
                        </span>
                        <span className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 dari 8.400+ ulasan
                        </span>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-[4/5] max-h-[560px] w-full">
                        <PanelEditorial />
                    </div>
                    {/* Lencana melayang */}
                    <div className="absolute -left-3 top-10 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:-left-6">
                        <p className="text-xs text-stone-500">Ditenun tangan</p>
                        <p className="text-sm font-bold text-stone-900">ATBM 100% katun</p>
                    </div>
                    <div className="absolute -right-3 bottom-16 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:-right-6">
                        <p className="text-xs text-stone-500">Pewarna</p>
                        <p className="text-sm font-bold text-stone-900">100% bahan alam</p>
                    </div>
                </div>
            </section>

            {/* Koleksi terbaru */}
            <section id="koleksi" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Terbaru</p>
                        <h2 className="mt-2 font-display text-3xl font-bold text-stone-950">Koleksi Terbaru</h2>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                    {PRODUK.map((p) => (
                        <Card key={p.nama} className="group overflow-hidden border-stone-200/80">
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <img
                                    src={p.foto}
                                    alt={p.nama}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                {p.badge && (
                                    <Badge className="absolute left-3 top-3 bg-stone-950/85 text-amber-200">{p.badge}</Badge>
                                )}
                                {/* Quick add saat hover */}
                                <button
                                    onClick={tambahKeranjang}
                                    className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-xl bg-white/95 py-2.5 text-sm font-semibold text-stone-950 opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                >
                                    <Plus className="h-4 w-4" /> Tambah ke Tas
                                </button>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-stone-900">{p.nama}</h3>
                                <div className="mt-2 flex items-center gap-2">
                                    <Bintang nilai={p.rating} />
                                    <span className="text-xs text-stone-500">({p.ulasan})</span>
                                </div>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-base font-bold text-stone-950">{rupiah(p.harga)}</span>
                                    {p.hargaCoret && (
                                        <span className="text-xs text-stone-400 line-through">{rupiah(p.hargaCoret)}</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Belanja per kategori, tile foto */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Kategori</p>
                        <h2 className="mt-2 font-display text-3xl font-bold text-stone-950">Belanja per Kategori</h2>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {KATEGORI.map((k) => (
                        <button
                            key={k.nama}
                            onClick={() => scrollKe('koleksi')}
                            className="group relative overflow-hidden rounded-2xl p-5 text-left text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <img
                                src={k.foto}
                                alt={k.nama}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                            <div className="relative">
                                <p className="text-xs uppercase tracking-widest text-white/70">{k.jumlah} produk</p>
                                <h3 className="mt-1 font-display text-xl font-bold">{k.nama}</h3>
                                <p className="mt-1 text-xs text-white/75">{k.deskripsi}</p>
                                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition group-hover:gap-2">
                                    Jelajahi <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Lookbook editorial gelap */}
            <section id="lookbook" className="scroll-mt-16 bg-stone-950 py-16 text-stone-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Lookbook</p>
                    <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Musim Hujan 2026</h2>
                    <p className="mt-3 max-w-2xl text-stone-400">
                        Difoto di lereng Dieng, kabut pagi, kain hangat, dan siluet yang bergerak mengikuti angin.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {[
                            { judul: 'Mantel Hujan Tenun', sub: 'Look 01, Dieng', foto: '/images/landing-fashion/lookbook-1.jpg', tinggi: 'aspect-[3/4]' },
                            { judul: 'Kebaya Kutubaru', sub: 'Look 02, Senja', foto: '/images/landing-fashion/lookbook-2.jpg', tinggi: 'aspect-[3/4] lg:mt-10' },
                            { judul: 'Kimono Ulos', sub: 'Look 03, Kabut', foto: '/images/landing-fashion/lookbook-3.jpg', tinggi: 'aspect-[3/4]' },
                            { judul: 'Syal Songket', sub: 'Look 04, Embun', foto: '/images/landing-fashion/lookbook-4.jpg', tinggi: 'aspect-[3/4] lg:mt-10' },
                        ].map((l) => (
                            <figure key={l.judul} className={cn('group relative overflow-hidden rounded-2xl', l.tinggi)}>
                                <img
                                    src={l.foto}
                                    alt={l.judul}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                                    <p className="text-[11px] uppercase tracking-widest text-amber-300">{l.sub}</p>
                                    <figcaption className="font-display text-lg font-semibold text-white">{l.judul}</figcaption>
                                </div>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cerita: dari penenun ke pintumu, pola urutan alur bergantian */}
            <section id="cerita" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-16 sm:px-6">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Cerita Kami</p>
                    <h2 className="mt-2 font-display text-3xl font-bold text-stone-950 sm:text-4xl">
                        Dari penenun ke pintumu, tanpa perantara
                    </h2>
                    <p className="mt-3 text-stone-600">
                        Kebanyakan brand membeli lewat tengkulak. Kami tidak. Ini yang membuat harga kami masuk akal
                        dan pengrajin kami dibayar pantas.
                    </p>
                </div>
                <div className="mt-10 space-y-8">
                    {ALUR.map((a, i) => (
                        <div
                            key={a.tahap}
                            className={cn(
                                'grid items-center gap-6 lg:grid-cols-12',
                            )}
                        >
                            <div className={cn('lg:col-span-2', i % 2 === 1 && 'lg:order-2 lg:text-right')}>
                                <span className="font-display text-6xl font-bold text-amber-600/25">{a.tahap}</span>
                            </div>
                            <div className={cn('lg:col-span-10', i % 2 === 1 && 'lg:order-1')}>
                                <h3 className="font-display text-2xl font-bold text-stone-950">{a.judul}</h3>
                                <p className="mt-2 max-w-2xl leading-relaxed text-stone-600">{a.deskripsi}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Strip nilai brand */}
            <section className="border-y border-stone-200/70 bg-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
                    {NILAI.map((n) => (
                        <div key={n.judul} className="flex gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                                <n.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="font-semibold text-stone-950">{n.judul}</h3>
                                <p className="mt-1 text-sm leading-relaxed text-stone-600">{n.deskripsi}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Kutipan teratribusi + newsletter (titik konversi) */}
            <section id="daftar" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-16 sm:px-6">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <figure className="rounded-3xl bg-stone-950 p-8 text-stone-100 sm:p-10">
                        <Quote className="h-8 w-8 text-amber-400" />
                        <blockquote className="mt-4 font-display text-xl italic leading-relaxed sm:text-2xl">
                            "Kemejanya jatuh dengan pas di badan, motifnya tidak pasaran. Sudah tiga kali cuci,
                            warnanya tetap pekat."
                        </blockquote>
                        <figcaption className="mt-4 text-sm text-stone-400">
                            <span className="font-semibold text-stone-200">Nadia Prameswari</span>, Arsitek, Jakarta Selatan ·
                            membeli Kemeja Tenun Troso, Mei 2026
                        </figcaption>
                    </figure>
                    <div>
                        <h2 className="font-display text-3xl font-bold text-stone-950">Dapatkan kabar koleksi lebih dulu</h2>
                        <p className="mt-3 text-stone-600">
                            Daftarkan email untuk akses presale, cerita di balik setiap motif, dan voucher Rp50.000
                            untuk pembelian pertama.
                        </p>
                        {berlangganan ? (
                            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                                    <Check className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="font-semibold text-emerald-900">Berhasil terdaftar!</p>
                                    <p className="text-sm text-emerald-700">Voucher Rp50.000 sudah dikirim ke {email}.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={kirimNewsletter} className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="h-12 flex-1 bg-white"
                                />
                                <Button type="submit" size="lg" className="bg-stone-950 hover:bg-stone-800">
                                    Daftar <AtSign className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        )}
                        <p className="mt-3 text-xs text-stone-400">Kami mengirim maksimal 2 email per bulan. Berhenti kapan saja.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-300">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
                    <div>
                        <p className="font-display text-2xl font-bold tracking-[0.25em] text-white">KAINARA</p>
                        <p className="mt-3 text-sm leading-relaxed text-stone-400">
                            Label fashion tenun Indonesia. Ditenun tangan, dijahit presisi, dipakai bangga.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Belanja</h4>
                        <ul className="mt-4 space-y-2 text-sm text-stone-400">
                            {['Kemeja', 'Kebaya Modern', 'Outer', 'Aksesoris'].map((l) => (
                                <li key={l}><a href="#koleksi" className="hover:text-amber-300">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Bantuan</h4>
                        <ul className="mt-4 space-y-2 text-sm text-stone-400">
                            {['Lacak Pesanan', 'Panduan Ukuran', 'Pengembalian 14 Hari', 'Hubungi Kami'].map((l) => (
                                <li key={l}><span>{l}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Atelier</h4>
                        <p className="mt-4 text-sm leading-relaxed">
                            Jl. Kemang Raya No. 27<br />
                            Jakarta Selatan 12730<br />
                            halo@kainara.id · (021) 718-2290
                        </p>
                    </div>
                </div>
                <div className="border-t border-stone-800">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-stone-500 sm:flex-row sm:px-6">
                        <span>© 2026 Kainara. Seluruh hak cipta dilindungi.</span>
                        <span>Syarat & Ketentuan · Kebijakan Privasi</span>
                    </div>
                </div>
            </footer>

            {/* CTA lengket khusus mobile */}
            <StickyMobileCta
                variant="cart"
                title="Tas Belanja"
                subtitle={keranjang > 0 ? `${keranjang} item di tas kamu` : 'Tas kamu masih kosong'}
                actionLabel="Lihat Koleksi"
                onAction={() => scrollKe('koleksi')}
            />
        </div>
    );
}
