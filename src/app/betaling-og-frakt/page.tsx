import type { Metadata } from "next";
import Link from "next/link";
import { primaryButtonClasses } from "@/lib/styles";
import BrandMark from "@/components/BrandMark";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Betaling og frakt",
};

function CoinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.2c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.6c0 2.2-5 1-5 3.2 0 .9 1 1.7 2.5 1.7s2.5-.7 2.5-1.7" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 9.5h18" />
      <path d="M6.5 14.5h4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M2 7h11v10H2z" />
      <path d="M13 10h4l4 3.2V17h-8z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M3 8l9-4.5L21 8v8l-9 4.5L3 16z" />
      <path d="M3 8l9 4.5M12 12.5L21 8M12 12.5V21" />
    </svg>
  );
}

function PouchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M6 8V6a6 6 0 0112 0v2" />
      <rect x="4" y="8" width="16" height="13" rx="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const paymentMethods = [
  {
    icon: <CoinIcon />,
    title: "Kryptovaluta (Cryptomus)",
    description:
      "Betal direkte med Bitcoin, USDT eller annen kryptovaluta via Cryptomus. Automatisk bekreftet med en gang betalingen er mottatt.",
  },
  {
    icon: <CardIcon />,
    title: "Wise",
    description:
      "Trygg internasjonal overføring via Wise. Vi sender betalingsdetaljer på e-post etter bestilling.",
  },
];

const cryptomusSteps = [
  {
    title: "Velg kryptovaluta i kassen",
    description: "Fullfør bestillingen og velg «Betal med krypto».",
  },
  {
    title: "Du sendes til Cryptomus",
    description: "En sikker betalingsside åpnes med beløpet i NOK.",
  },
  {
    title: "Betal med valgfri lommebok",
    description: "Skann QR-koden eller kopier adressen fra din krypto-app.",
  },
  {
    title: "Automatisk bekreftelse",
    description: "Betalingen bekreftes automatisk, ingen ventetid.",
  },
];

const wiseSteps = [
  {
    title: "Velg Wise i kassen",
    description: "Fullfør bestillingen med «Fullfør bestilling».",
  },
  {
    title: "Vi sender deg betalingsdetaljer",
    description: "Du mottar Wise-informasjon på e-posten du oppga.",
  },
  {
    title: "Overfør beløpet",
    description: "Send betalingen via Wise-appen eller wise.com.",
  },
  {
    title: "Vi sender varen",
    description: "Så snart betalingen er bekreftet, sendes bestillingen.",
  },
];

const shippingFacts = [
  { icon: <TruckIcon />, value: "Samme dag", label: "Bestillinger sendes" },
  { icon: <ClockIcon />, value: "1–4 dager", label: "Forventet levering" },
  { icon: <BoxIcon />, value: "500 kr", label: "Grense for fri frakt" },
  { icon: <CoinIcon />, value: "59 kr", label: "Frakt under grensen" },
];

const discretion = [
  {
    icon: <PouchIcon />,
    title: "Umerket emballasje",
    description:
      "Alt sendes i en enkel, hvit pose uten logo eller informasjon om innholdet på utsiden.",
  },
  {
    icon: <ShieldIcon />,
    title: "Beskyttet under frakt",
    description:
      "Innholdet pakkes med bobleplast og papp, slik at hetteglass ikke knuses eller lager lyd under transport.",
  },
];

export default function BetalingOgFraktPage() {
  return (
    <div>
      {/* Hero */}
      <div className="mx-auto w-full max-w-3xl px-6 pt-20 pb-4 text-center">
        <div className="animate-hero flex flex-col items-center">
          <BrandMark size={48} />
          <h1 className="mt-6 text-4xl font-extrabold tracking-wide text-black uppercase sm:text-5xl">
            Betaling og frakt
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600">
            Trygg betaling. Rask levering.
          </p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-black">
            Betalingsmetoder
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {paymentMethods.map((method, i) => (
            <Reveal key={method.title} delayMs={i * 80}>
              <div className="group h-full rounded-lg border border-black/[.08] p-5 transition-colors hover:border-violet-300">
                <div className="text-black transition-colors group-hover:text-violet-600">
                  {method.icon}
                </div>
                <h3 className="mt-3 font-semibold text-black">
                  {method.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                  {method.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Payment guides */}
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-black">
            Slik betaler du
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2 text-black">
              <CoinIcon />
              <h3 className="font-semibold">Cryptomus (kryptovaluta)</h3>
            </div>
            <ol className="flex flex-col gap-4">
              {cryptomusSteps.map((step, i) => (
                <Reveal key={step.title} delayMs={i * 80}>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-black">
                        {step.title}
                      </p>
                      <p className="text-sm text-zinc-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <div className="mb-4 flex items-center gap-2 text-black">
              <CardIcon />
              <h3 className="font-semibold">Wise</h3>
            </div>
            <ol className="flex flex-col gap-4">
              {wiseSteps.map((step, i) => (
                <Reveal key={step.title} delayMs={i * 80}>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-black">
                        {step.title}
                      </p>
                      <p className="text-sm text-zinc-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-black">
            Frakt og levering
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {shippingFacts.map((fact, i) => (
            <Reveal key={fact.label} delayMs={i * 80}>
              <div className="group h-full rounded-lg border border-black/[.08] p-5 transition-colors hover:border-amber-300">
                <div className="text-black transition-colors group-hover:text-amber-500">
                  {fact.icon}
                </div>
                <div className="mt-3 text-lg font-extrabold text-black">
                  {fact.value}
                </div>
                <p className="mt-1 text-xs tracking-wide text-zinc-500 uppercase">
                  {fact.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Discreet packaging */}
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold tracking-tight text-black">
            Diskré emballasje
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {discretion.map((item, i) => (
            <Reveal key={item.title} delayMs={i * 80}>
              <div className="h-full rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/20">
                <div className="text-black">{item.icon}</div>
                <h3 className="mt-3 font-semibold text-black">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="mt-8 border-t border-black/[.08] bg-zinc-100/50 py-16">
        <Reveal className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Klar til å bestille?
          </h2>
          <Link href="/products" className={`mt-6 ${primaryButtonClasses}`}>
            Se produktene våre
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
