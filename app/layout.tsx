import { 
  Plus_Jakarta_Sans, 
  Fraunces, 
  Outfit, 
  Lora, 
  Spectral, 
  Inter, 
  Playfair_Display,
  Noto_Serif,
  Manrope
} from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import PreloadModels from "@/components/PreloadModels";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fraunces",
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-spectral",
});

export const metadata: Metadata = {
  title: "Célune // Curated Formulations",
  description: "High-end clinical skincare for the modern aesthete. Discover the intersection of clinical efficacy and luxurious sensory texture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${notoSerif.variable} ${manrope.variable} ${inter.variable} ${fraunces.variable} ${plusJakartaSans.variable} ${outfit.variable} ${lora.variable} ${spectral.variable} h-full antialiased bg-surface`}
    >
      <body className="min-h-full flex flex-col font-inter">
        <PreloadModels />
        {children}
      </body>
    </html>
  );
}
