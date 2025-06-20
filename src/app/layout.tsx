// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import AdSense from "./components/AdSense";
import SupabaseProvider from "./components/SupabaseProvider"; // 👈 Aquí usamos el cliente

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
  description: "Tu asistente en la carga académica",
};

const links = [
  { label: "Inicio", route: "/" },
  { label: "FAQ", route: "/faq" },
  { label: "Motivación", route: "/motivation" },
  { label: "Equipo", route: "/contact" },
  { label: "Blog", route: "/blog" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        <AdSense pId="2263575229671406" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col antialiased  h-screen`}>
        <SupabaseProvider>
          <NavBar links={links} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}

