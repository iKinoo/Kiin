import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
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
]


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en">
      
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
