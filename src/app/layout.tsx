import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clínica Azambuja | Estética Avançada em Rondonópolis",
  description: "Clínica de estética avançada especializada em harmonização facial, corporal e íntima em Rondonópolis-MT. Tratamentos estéticos premium com as Dras. Eliziane e Mayra Azambuja.",
  keywords: "clínica estética, harmonização facial, estética íntima, Rondonópolis, Dra. Eliziane Azambuja, Dra. Mayra Azambuja, botox, bioestimuladores, ninfoplastia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
