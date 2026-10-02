import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { GlobalBackground } from "@/components/motion/GlobalBackground";
import { Preloader } from "@/components/ui/Preloader";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUMERI · Built for the Deep",
  description:
    "SUMERI automatic precision horology. Engineered for 200-meter hydrostatic pressure, finished with architectural restraint and enduring presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} ${bodoniModa.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#c8cff0] text-[#0b0b14] relative selection:bg-[#2a4bd7]/20 selection:text-[#0b0b14]">
        <Preloader />
        <GlobalBackground />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
