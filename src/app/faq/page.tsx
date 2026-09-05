import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål",
};

const faqs = [
  {
    question: "Hva betyr \"kun til forskningsbruk\"?",
    answer:
      "Produktene våre selges utelukkende som forskningskjemikalier til laboratoriebruk og er ikke godkjent eller ment for humant konsum.",
  },
  {
    question: "Hva betyr 99 % renhet?",
    answer:
      "Hvert produkt testes for renhet, og vi oppgir dokumentert renhetsgrad på minst 99 % på hele sortimentet.",
  },
  {
    question: "Hvor lang er leveringstiden?",
    answer:
      "Bestillinger sendes samme dag, med forventet levering innen 1–4 virkedager.",
  },
  {
    question: "Hvilke betalingsmetoder tilbyr dere?",
    answer: "Vi tar imot betaling via kryptovaluta (Bitcoin, USDT), Revolut og Wise.",
  },
  {
    question: "Koster frakt noe?",
    answer:
      "Fri frakt ved bestillinger over 500 kr. Under det koster frakt 59 kr.",
  },
  {
    question: "Hvordan bør peptider oppbevares?",
    answer:
      "Uåpnede hetteglass bør oppbevares tørt, mørkt og kjølig. Etter rekonstituering bør peptider oppbevares nedkjølt og brukes innen kort tid for å bevare stabiliteten.",
  },
  {
    question: "Kan jeg returnere en bestilling?",
    answer:
      "Uåpnede og uskadde produkter kan returneres innen 14 dager etter mottak. Ta kontakt med oss før du sender noe i retur.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="mb-10 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Ofte stilte spørsmål
      </h1>
      <div className="flex flex-col gap-8">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-semibold text-black dark:text-zinc-50">
              {faq.question}
            </h3>
            <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
