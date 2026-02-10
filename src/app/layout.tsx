import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import StoryblokProvider from "@/components/StoryblokProvider";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SupabaseProvider } from "@/components/SupabaseProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Subtexto Anime",
  description:
    "Más allá de los subtítulos: explora, interpreta y conversa sobre el verdadero significado del anime.",
  metadataBase: new URL("https://subtextoanime.com"),
  openGraph: {
    title: "Subtexto Anime",
    description:
      "Más allá de los subtítulos: un espacio para reflexionar y debatir sobre el contexto, los mensajes y las interpretaciones del anime.",
    url: "https://subtextoanime.com",
    siteName: "Subtexto Anime",
    images: [
      {
        url: "/open-graph.jpg",
        width: 1200,
        height: 630,
        alt: "Subtexto Anime",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <StoryblokProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${roboto.variable} antialiased font-roboto`}
        >
          <SupabaseProvider>
            <Navbar />
            <GoogleTagManager gtmId="GTM-W8Z9B23Z" />
            {children}
            <Toaster />
            <Footer />
            <Analytics />
            <SpeedInsights />
          </SupabaseProvider>
        </body>
      </StoryblokProvider>
    </html>
  );
}
