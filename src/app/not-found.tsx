import Link from "next/link";
import { primaryButtonClasses } from "@/lib/styles";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Siden finnes ikke
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Siden du leter etter finnes ikke.
      </p>
      <Link
        href="/"
        className={`mt-8 ${primaryButtonClasses}`}
      >
        Tilbake til forsiden
      </Link>
    </div>
  );
}
