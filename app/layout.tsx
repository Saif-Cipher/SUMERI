import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { GlobalBackground } from "@/components/motion/GlobalBackground";
import { Preloader } from "@/components/ui/Preloader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
      suppressHydrationWarning
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} ${bodoniModa.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('sumeri-theme');
                if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#c8cff0] dark:bg-[#181819] text-[#0b0b14] dark:text-[#f5f5fd] relative selection:bg-[#2a4bd7]/20 selection:text-[#0b0b14] dark:selection:bg-[#3b82f6]/30 dark:selection:text-white transition-colors duration-500">
        <ThemeProvider>
          <Preloader />
          <GlobalBackground />
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
