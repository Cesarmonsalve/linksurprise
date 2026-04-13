import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="es" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>{children}</body>
    </html>
  );
}
