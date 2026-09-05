import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { primaryButtonClasses } from "@/lib/styles";
import BrandMark from "@/components/BrandMark";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Om oss",
};

const reasons = [
  {
    title: "Høy kvalitetsstandard",
    description:
      "Alle peptidene våre testes for renhet og merkes tydelig med innhold og styrke — 99 % renhet på hele sortimentet.",
  },
  {
    title: "Nøye utvalgt sortiment",
    description:
      "Vi dekker de mest etterspurte kategoriene innen forskningspeptider — fra heling og restitusjon til kognisjon, vektkontroll og hormonstøtte — fremfor å ha en uendelig lang katalog.",
  },
  {
    title: "Rask levering",
    description:
      "Bestillinger sendes samme dag, med levering innen 1–4 virkedager.",
  },
  {
    title: "Tilgjengelig support",
    description:
      "Har du spørsmål om et produkt eller en bestilling, er vi tilgjengelige for å hjelpe.",
  },
];

const process = [
  { step: "01", title: "Kilde", description: "Peptider hentes inn fra kvalitetssikrede produsenter." },
  { step: "02", title: "Test", description: "Hvert batch testes for renhet før det godkjennes." },
  { step: "03", title: "Merk", description: "Tydelig merking med innhold, styrke og renhetsgrad." },
  { step: "04", title: "Send", description: "Sendes samme dag, rett til hetteglass hos deg." },
];

export default async function OmOssPage() {
  const productCount = await prisma.product.count();

  const stats = [
    { value: "99%", label: "Renhet" },
    { value: "1–4", label: "Dager levering" },
    { value: String(productCount), label: "Produkter i sortimentet" },
    { value: "100%", label: "Kun forskningsbruk" },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="mx-auto w-full max-w-3xl px-6 pt-20 pb-4 text-center">
        <div className="animate-hero flex flex-col items-center">
          <BrandMark size={48} />
          <h1 className="mt-6 text-4xl font-extrabold tracking-wide text-black uppercase sm:text-5xl">
            Om oss
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600">
            Forskningspeptider levert med presisjon, ikke støy.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delayMs={i * 80}>
              <div className="group text-center">
                <div className="text-3xl font-extrabold text-violet-600 transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs tracking-wide text-zinc-500 uppercase">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <Reveal>
          <div className="flex flex-col gap-6 text-base leading-7 text-zinc-600">
            <p>
              NORLABS er en leverandør av forskningspeptider for
              laboratorier, forskere og akademiske institusjoner. Vi
              spesialiserer oss på å levere produkter syntetisert under
              streng kvalitetskontroll, med en dokumentert renhetsgrad på
              over 99 %.
            </p>
            <p>
              Navnet reflekterer hvor vi kommer fra og hvordan vi jobber:
              nøkternt, ryddig og uten unødvendig støy. Vi tror på enkelhet —
              tydelig merking, ærlig informasjon, og et sortiment som er
              nøye vurdert fremfor uendelig langt.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Why choose us — hover cards */}
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-black">
            Hvorfor velge NORLABS?
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delayMs={i * 80}>
              <div className="h-full rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/20">
                <h3 className="font-semibold text-black">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* How we work — process steps */}
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <Reveal>
          <h2 className="mb-8 text-xl font-semibold tracking-tight text-black">
            Slik jobber vi
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {process.map((item, i) => (
            <Reveal key={item.step} delayMs={i * 100}>
              <div className="group relative">
                <div className="text-xs font-bold text-amber-500">
                  {item.step}
                </div>
                <h3 className="mt-2 font-semibold text-black transition-colors group-hover:text-violet-600">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>
                {i < process.length - 1 && (
                  <div className="absolute top-1 right-[-14px] hidden h-px w-6 bg-black/10 sm:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 pb-8">
        <p className="text-xs tracking-wide text-zinc-500 uppercase">
          Produktene fra NORLABS selges utelukkende som
          forskningskjemikalier til laboratoriebruk og er ikke godkjent for
          humant konsum.
        </p>
      </div>

      {/* Closing CTA */}
      <div className="border-t border-black/[.08] bg-zinc-100/50 py-16">
        <Reveal className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Klar for å se sortimentet?
          </h2>
          <Link href="/products" className={`mt-6 ${primaryButtonClasses}`}>
            Se produktene våre
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
