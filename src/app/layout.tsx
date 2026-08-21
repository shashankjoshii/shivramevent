import type { Metadata } from "next";
import { Cinzel, Lato } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollUtilities } from "@/components/layout/ScrollUtilities";
import { TopBar } from "@/components/layout/TopBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  /**
   * Without metadataBase, Next emits no canonical and no absolute OG URLs —
   * the site previously shipped neither on any page.
   */
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Event Management Company in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Shiv Ram Event — Professional event management company in Ahmedabad. Wedding planning, corporate events, birthday parties, decoration & more.",
  keywords: [
    "event management Ahmedabad",
    "wedding planner",
    "corporate events",
    "birthday party decoration",
    "Shiv Ram Event",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | Event Management Company in ${site.city}`,
    description: site.description,
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Event Management Company in ${site.city}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lato.variable}`}>
      <body className="font-body">
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <ScrollUtilities />
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
