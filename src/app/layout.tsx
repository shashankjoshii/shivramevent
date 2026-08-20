import type { Metadata } from "next";
import { Cinzel, Lato } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollUtilities } from "@/components/layout/ScrollUtilities";
import { TopBar } from "@/components/layout/TopBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
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
  openGraph: {
    title: `${site.name} | Event Management Company in ${site.city}`,
    description: site.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lato.variable}`}>
      <body className="font-body">
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
