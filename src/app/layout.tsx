import type { Metadata } from "next";
import localFont from "next/font/local";
import AdSense from "./components/AdSense";
import NavBar from "./components/NavBar";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/Quicksand.ttf",
  variable: "--font-quicksand",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kiin",
  description: "Kiin es un asistente para tu carga académica en la Universidad Autónoma de Yucatán. Mediante recursos visuales interactivos para agilizar tu selección de horarios.",
};

const links = [
  { label: "Inicio", route: "/" },
  { label: "FAQ", route: "/faq" },
  { label: "Motivación", route: "/motivation" },
  { label: "Equipo", route: "/contact" },
  { label: "Blog", route: "/blog" },
]


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <AdSense pId="2263575229671406" />
          <link rel="alternate" type="text/plain" href="/ads.txt" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavBar links={links} />
          <div>
            {children}
          </div>

        </body>
      </html>
    </>
  );
}
