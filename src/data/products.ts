import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "BPC-157",
    shortDescription: "Støtter reparasjon av sener, leddbånd og muskler.",
    description:
      "BPC-157 er et syntetisk peptid avledet fra en beskyttende proteinsekvens som finnes i magesekken. I forskning er det studert for evnen til å fremme reparasjon av mykvev som sener, leddbånd og muskler. Peptidet virker blant annet gjennom å påvirke nitrogenoksid-signalering og fremme dannelse av nye blodårer (angiogenese) i skadet vev. Det er også undersøkt for gastrobeskyttende og betennelsesdempende effekter i dyremodeller.",
    imageUrl: "/products/bpc157-v2.jpeg",
    category: "Heling & Restitusjon",
    variants: [
      { size: "5mg", price: 449.0 },
      { size: "10mg", price: 799.0 },
    ],
    inStock: true,
    externalStock: false,
  },
  {
    id: "2",
    name: "TB-500",
    shortDescription: "Fremmer cellevekst og raskere vevsreparasjon.",
    description:
      "TB-500 er et syntetisk fragment av thymosin beta-4, et protein som finnes naturlig i nesten alle celler i kroppen. I forskning er det studert for evnen til å fremme cellemigrasjon og angiogenese, noe som kan bidra til raskere sårheling og vevsreparasjon. Peptidet virker ved å regulere aktin, et protein sentralt i cellebevegelse og -struktur. TB-500 undersøkes ofte i sammenheng med skader på sener, leddbånd og muskulatur.",
    imageUrl: "/products/TB500.jpeg",
    category: "Heling & Restitusjon",
    variants: [
      { size: "5mg", price: 449.0 },
      { size: "10mg", price: 799.0 },
    ],
    inStock: true,
    externalStock: false,
  },
  {
    id: "3",
    name: "Retatrutide",
    shortDescription: "Trippelagonist studert for vekttap og blodsukker.",
    description:
      "Retatrutide er et eksperimentelt peptid som virker på tre reseptorer samtidig: GLP-1, GIP og glukagon. I kliniske studier er det undersøkt for effekten på vekttap, blodsukkerregulering og fettmetabolisme. Den trippelagonistiske virkningsmekanismen skiller det fra tidligere GLP-1-legemidler og har i studier vist betydelig større vektreduksjon. Forskning på langtidseffekter og sikkerhet pågår fortsatt.",
    imageUrl: "/products/reta.jpeg",
    category: "Vektkontroll",
    variants: [
      { size: "5mg", price: 599.0 },
      { size: "10mg", price: 999.0 },
    ],
    inStock: true,
    externalStock: false,
  },
  {
    id: "4",
    name: "NAD+",
    shortDescription: "Koenzym for cellulær energi og aldringsforskning.",
    description:
      "NAD+ (nikotinamid-adenin-dinukleotid) er et koenzym som finnes i alle levende celler og er essensielt for energiproduksjon i mitokondriene. Nivåene synker naturlig med alderen, noe som er koblet til redusert cellulær reparasjonsevne. I forskning er NAD+ studert for sin rolle i å aktivere sirtuiner, proteiner knyttet til DNA-reparasjon, betennelsesregulering og mitokondriell funksjon. Det undersøkes særlig innen aldringsforskning, kognitiv helse og metabolisme.",
    imageUrl: "/products/nad-v3.jpeg",
    category: "Anti-aldring & Levetid",
    variants: [{ size: "500mg", price: 899.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "5",
    name: "GHK-Cu",
    shortDescription: "Kobberpeptid for hud, kollagen og sårheling.",
    description:
      "GHK-Cu er et kobberbindende peptid som finnes naturlig i kroppen, men som avtar med alderen. I forskning er det mye studert for evnen til å stimulere kollagen-, elastin- og glykosaminoglykanproduksjon i huden. Peptidet er også undersøkt for sårhelende egenskaper, økt angiogenese og antioksidante effekter som demper betennelse. GHK-Cu brukes ofte i forskning på hudforyngelse, hårvekst og vevsreparasjon.",
    imageUrl: "/products/GHK-CU.jpeg",
    category: "Anti-aldring & Levetid",
    variants: [
      { size: "50mg", price: 399.0 },
      { size: "100mg", price: 699.0 },
    ],
    inStock: true,
    externalStock: false,
  },
  {
    id: "6",
    name: "Semax",
    shortDescription: "Nootropisk peptid for fokus og hukommelse.",
    description:
      "Semax er et syntetisk peptid utviklet fra ACTH og opprinnelig brukt klinisk i Russland. I forskning er det studert for nootropiske og nevrobeskyttende egenskaper, blant annet gjennom å øke nivåene av BDNF (hjerneavledet nevrotrofisk faktor) i hippocampus. Peptidet påvirker også dopamin- og serotoninnivåer, noe som kan bidra til forbedret kognisjon og fokus. Semax er undersøkt i sammenheng med hukommelse, konsentrasjon og beskyttelse mot nevrologisk skade.",
    imageUrl: "/products/semax-v2.jpeg",
    category: "Kognisjon & Fokus",
    variants: [
      { size: "5mg", price: 449.0 },
      { size: "10mg", price: 799.0 },
    ],
    inStock: true,
    externalStock: false,
  },
  {
    id: "7",
    name: "Selank",
    shortDescription: "Angstdempende peptid som støtter ro og fokus.",
    description:
      "Selank er et syntetisk peptid utviklet i Russland som analog til tuftsin, et immunmodulerende peptid som finnes naturlig i kroppen. I forskning er det studert for angstdempende og stemningsregulerende egenskaper, uten avhengighetsrisikoen som er assosiert med benzodiazepiner. Peptidet virker blant annet gjennom å modulere GABA-, dopamin- og serotoninsystemene. Selank er også undersøkt for kognitive effekter som forbedret konsentrasjon og læringsevne.",
    imageUrl: "/products/selank-v2.jpeg",
    category: "Kognisjon & Fokus",
    variants: [
      { size: "5mg", price: 449.0 },
      { size: "10mg", price: 799.0 },
    ],
    inStock: true,
    externalStock: false,
  },
  {
    id: "8",
    name: "KLOW",
    shortDescription: "Blanding av fire peptider for helhetlig vevsreparasjon.",
    description:
      "KLOW er en blanding av fire peptider — GHK-Cu, BPC-157, TB-500 og KPV — satt sammen for å dekke flere reparasjonsmekanismer samtidig. Kombinasjonen er studert for effekter på kollagenproduksjon og hudfornyelse (GHK-Cu), reparasjon av mykvev (BPC-157 og TB-500), samt betennelsesdemping (KPV). Blandingen brukes ofte i forskning på helhetlig vevsreparasjon, som skader på sener, leddbånd og hud. Et typisk 80mg-hetteglass inneholder 50mg GHK-Cu, 10mg BPC-157, 10mg TB-500 og 10mg KPV.",
    imageUrl: "/products/klow-v2.png",
    category: "Heling & Restitusjon",
    variants: [{ size: "80mg", price: 899.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "9",
    name: "KPV",
    shortDescription: "Betennelsesdempende tripeptid for tarm og hud.",
    description:
      "KPV er et tripeptid avledet fra alfa-MSH (melanocyttstimulerende hormon) og er studert for sterke betennelsesdempende egenskaper. Peptidet virker ved å hemme NF-κB og MAP-kinase-signalveier, som er sentrale i kroppens betennelsesrespons. I forskning er KPV særlig undersøkt i sammenheng med tarmbetennelse og hudlidelser. Fordi det er et lite peptid har det god stabilitet og opptak sammenlignet med større molekyler.",
    imageUrl: "/products/KPV.jpeg",
    category: "Heling & Restitusjon",
    variants: [
      { size: "5mg", price: 349.0 },
      { size: "10mg", price: 599.0 },
    ],
    inStock: true,
    externalStock: false,
  },
  {
    id: "10",
    name: "HCG",
    shortDescription: "Hormon studert for testosteron og fertilitet.",
    description:
      "HCG (humant choriongonadotropin) er et hormon som ligner luteiniserende hormon (LH) og stimulerer Leydig-cellene i testiklene til å produsere testosteron. I forskning er det studert for å opprettholde naturlig testosteronproduksjon og fertilitet hos menn, spesielt i kombinasjon med testosteronbehandling. HCG undersøkes også for sin rolle i å forhindre testikkelatrofi og opprettholde spermatogenese. Det er godt dokumentert innen fertilitets- og hormonforskning.",
    imageUrl: "/products/hcg-v2.jpeg",
    category: "Hormonstøtte",
    variants: [{ size: "5000iu", price: 549.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "11",
    name: "Melanotan II",
    shortDescription: "Melanocortin-agonist studert for pigmentering og libido.",
    description:
      "Melanotan II er en syntetisk analog til alfa-MSH (melanocyttstimulerende hormon) som binder til melanocortin-reseptorer i kroppen. I forskning er det studert for evnen til å stimulere melaninproduksjon i huden, noe som gir økt pigmentering. Peptidet er også undersøkt for effekter på libido gjennom aktivering av MC4-reseptorer i sentralnervesystemet, samt for potensiell appetittregulerende effekt.",
    imageUrl: "/products/mela.jpeg",
    category: "Hud & Pigmentering",
    variants: [{ size: "10mg", price: 349.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "12",
    name: "Ipamorelin",
    shortDescription: "Selektiv GH-frisetter studert for muskelvekst og restitusjon.",
    description:
      "Ipamorelin er et syntetisk pentapeptid som virker som en selektiv agonist på ghrelin-reseptoren (GHS-R). I forskning er det studert for evnen til å stimulere frigjøring av veksthormon fra hypofysen, uten å påvirke kortisol- eller prolaktinnivåer nevneverdig. Peptidet er undersøkt for potensielle effekter på muskelvekst, fettforbrenning og restitusjon, og regnes som en av de mest selektive GH-frisetterne som er studert.",
    imageUrl: "/products/ipa-v2.jpeg",
    category: "Vekst & Muskler",
    variants: [{ size: "5mg", price: 449.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "13",
    name: "CJC-1295 med DAC",
    shortDescription: "Langtidsvirkende GHRH-analog med forlenget halveringstid.",
    description:
      "CJC-1295 med DAC (Drug Affinity Complex) er en modifisert analog til veksthormonfrigjørende hormon (GHRH) som binder seg til albumin i blodet for å forlenge halveringstiden betraktelig. I forskning er det studert for evnen til å gi en jevn, forlenget økning i veksthormon- og IGF-1-nivåer over flere dager fra én enkelt dose. Peptidet undersøkes ofte i sammenheng med kroppssammensetning og cellulær regenerering.",
    imageUrl: "/products/cjc-w-dac-v2.jpeg",
    category: "Vekst & Muskler",
    variants: [{ size: "5mg", price: 599.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "14",
    name: "CJC-1295 uten DAC",
    shortDescription: "Korttidsvirkende GHRH-analog, ofte kombinert med Ipamorelin.",
    description:
      "CJC-1295 uten DAC (også kjent som Mod GRF 1-29) er en kortere virkende analog til veksthormonfrigjørende hormon, uten albuminbindende egenskaper. I forskning er det studert for evnen til å gi en rask, pulsativ frigjøring av veksthormon som etterligner kroppens naturlige sekresjonsmønster. Peptidet undersøkes ofte i kombinasjon med GH-frisettere som Ipamorelin for å studere synergieffekter.",
    imageUrl: "/products/cjc-no-dac-v2.jpeg",
    category: "Vekst & Muskler",
    variants: [{ size: "5mg", price: 549.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "15",
    name: "Tesamorelin",
    shortDescription: "GHRH-analog studert for fettmetabolisme og kroppssammensetning.",
    description:
      "Tesamorelin er en syntetisk analog til veksthormonfrigjørende hormon (GHRH) som stimulerer hypofysen til å produsere og frigjøre veksthormon. I forskning er det særlig studert for effekten på visceralt fett og kroppssammensetning. Peptidet er også undersøkt for potensielle effekter på IGF-1-nivåer og kognitiv funksjon, og er et av de mer klinisk dokumenterte peptidene i GHRH-klassen.",
    imageUrl: "/products/tesa-v2.jpeg",
    category: "Vekst & Muskler",
    variants: [{ size: "10mg", price: 899.0 }],
    inStock: true,
    externalStock: false,
  },
  {
    id: "16",
    name: "MOTS-c",
    shortDescription: "Mitokondrielt peptid studert for metabolisme og utholdenhet.",
    description:
      "MOTS-c er et mitokondrielt avledet peptid som virker som en regulator av cellulær metabolisme. I forskning er det studert for evnen til å aktivere AMPK-signalveien, som spiller en sentral rolle i energiregulering og insulinsensitivitet. Peptidet er undersøkt for potensielle effekter på fettforbrenning, utholdenhet og beskyttelse mot metabolsk stress, og regnes som et av de mest lovende peptidene innen mitokondrieforskning.",
    imageUrl: "/products/motc-c-v2.jpeg",
    category: "Anti-aldring & Levetid",
    variants: [{ size: "10mg", price: 699.0 }],
    inStock: true,
    externalStock: false,
  },
  // TODO: Add more products here
];
