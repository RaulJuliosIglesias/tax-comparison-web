import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Economía Comparada: España vs Andorra vs Estonia",
  description: "Visualización interactiva y análisis comparativo de la realidad fiscal, deuda pública y demografía de tres modelos europeos distintos. Datos oficiales y proyecciones a 2050.",
  keywords: "España, Andorra, Estonia, IRPF, Deuda Pública, Demografía 2050, Impuestos, Pensiones, Comparativa Fiscal, Datos Macro",
  authors: [{ name: "Raúl Iglesias Julios" }],
  openGraph: {
    title: "Economía Comparada: ES vs AD vs EE",
    description: "Descubre dónde van tus impuestos y cómo evolucionará tu jubilación en 2050.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
