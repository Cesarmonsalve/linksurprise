import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LinkSurprise — Sorpresas Digitales Únicas",
  description:
    "Crea páginas interactivas llenas de emoción: cartas de amor, sorpresas de cumpleaños, mensajes secretos. Comparte por WhatsApp o descarga el HTML.",
  keywords:
    "sorpresa digital, carta de amor, cumpleaños, regalo digital, WhatsApp, link sorpresa",
  openGraph: {
    title: "LinkSurprise — Sorpresas Digitales Únicas",
    description:
      "Crea y comparte experiencias digitales emocionales: cartas de amor, cumpleaños y más.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
