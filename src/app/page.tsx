import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

const heroButtonClasses =
  "rounded-full bg-[#2f6690] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#3a7aa8]";

const FEATURED_PRODUCT_IDS = ["3", "11", "9"]; // Retatrutide, Melanotan II, KPV

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3" />
      <path d="M8 15h8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path d="M2 7h11v10H2z" />
      <path d="M13 10h4l4 3.2V17h-8z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </svg>
  );
}

const trustPoints = [
  { icon: <FlaskIcon />, title: "Labtestet", description: "Verifisert renhet" },
  { icon: <ShieldIcon />, title: "Forskningskvalitet", description: "Pålitelig innkjøp" },
  { icon: <TruckIcon />, title: "Rask levering", description: "Fra Norge" },
];

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { id: { in: FEATURED_PRODUCT_IDS } },
    include: { variants: true },
  });
  const featured = FEATURED_PRODUCT_IDS.map((id) =>
    featuredProducts.find((product) => product.id === id),
  ).filter((product) => product !== undefined);

  return (
    <div>
      <div className="relative h-[520px] w-full overflow-hidden bg-zinc-950 sm:h-[560px] lg:h-[620px]">
        <Image
          src="/hero-vials.png"
          alt="NORLABS forskningspeptid-hetteglass"
          fill
          priority
          className="object-cover object-center"
        />

        <span className="absolute top-8 right-8 hidden max-w-[9rem] text-right text-[11px] leading-relaxed font-semibold tracking-widest text-slate-400 uppercase sm:block">
          Forbindelser for en lysere fremtid
        </span>

        <div className="relative flex h-full flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
          <p className="text-xs font-bold tracking-[0.25em] text-[#8ec2e0] uppercase">
            Vitenskap · Renhet · Ytelse
          </p>
          <h1 className="font-montserrat mt-4 max-w-xl text-4xl leading-[1.05] tracking-wide text-white uppercase sm:text-5xl">
            <span className="font-normal">NOR</span>
            <span className="font-bold">LABS</span>
            <br />
            <span className="font-bold normal-case">
              Fremmer menneskelig <em className="text-[#8ec2e0]">ytelse</em>.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base text-slate-300 sm:text-lg">
            Forskningspeptider, hentet inn og testet for renhet.
            <br />
            For en sunnere morgendag.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/products" className={heroButtonClasses}>
              Utforsk produkter →
            </Link>
            <Link
              href="/om-oss"
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
              Om NorLabs →
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex items-center gap-3 text-slate-300">
                <span className="text-[#8ec2e0]">{point.icon}</span>
                <div>
                  <p className="text-xs font-bold tracking-wide text-white uppercase">
                    {point.title}
                  </p>
                  <p className="text-xs text-slate-400">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#2f6690] uppercase">
              <span className="h-px w-6 bg-[#2f6690]" />
              Utvalgte produkter
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
              Bestselgere
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#2f6690] transition-colors hover:text-[#234d6c]"
          >
            Se alle produkter →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
