import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://norlabs.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NORLABS",
    template: "%s | NORLABS",
  },
  description: "Forskningspeptider, hentet inn og testet for renhet.",
  openGraph: {
    title: "NORLABS",
    description: "Forskningspeptider, hentet inn og testet for renhet.",
    images: ["/banner3.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NORLABS",
    description: "Forskningspeptider, hentet inn og testet for renhet.",
    images: ["/banner3.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
