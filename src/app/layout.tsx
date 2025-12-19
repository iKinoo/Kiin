// app/layout.tsx
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import AdSense from "./components/AdSense";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import NavBar from "./components/NavBar";
import { PerformanceOptimizer } from "./components/PerformanceOptimizer";
import SupabaseProvider from "./components/SupabaseProvider"; // 👈 Aquí usamos el cliente
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap', // Mejora performance de fuentes
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/Quicksand.ttf",
  variable: "--font-quicksand",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Kiin - Tu asistente en la carga académica",
    template: "%s | Kiin"
  },
  description: "Planea tu carga académica de forma inteligente, eficiente y rápida. Herramienta gratuita para estudiantes universitarios.",
  keywords: ["carga académica", "horarios", "universidad", "estudiantes", "planificación", "calendario académico"],
  authors: [{ name: "Equipo Kiin" }],
  creator: "Kiin",
  publisher: "Kiin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kiin.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kiin - Tu asistente en la carga académica",
    description: "Planea tu carga académica de forma inteligente, eficiente y rápida",
    url: 'https://kiin.vercel.app',
    siteName: 'Kiin',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kiin - Tu asistente en la carga académica",
    description: "Planea tu carga académica de forma inteligente",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Añadir tu código real de Google Search Console
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
};

const links = [
  { label: "Inicio", route: "/" },
  { label: "FAQ", route: "/faq" },
  { label: "Motivación", route: "/motivation" },
  { label: "Equipo", route: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <head>
        <AdSense pId="2263575229671406" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col antialiased  h-screen`}>
        <SupabaseProvider>
          <PerformanceOptimizer />
          <NavBar links={links} />
          {children}
          <FloatingWhatsAppButton />
          <Analytics />
        </SupabaseProvider>
      </body>
    </html>
  );
}

