import type { Metadata } from "next";
import { Roboto, IM_Fell_French_Canon } from "next/font/google";
import "./globals.css";
import setUiVariables from "@/utils/setUiVariables";
import Header from "@/layouts/header/Header";
import Footer from "@/layouts/footer/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"]
});

const imFellFrenchCanon = IM_Fell_French_Canon({
  variable: "--font-im-fell-french-canon",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {

};

const variables = setUiVariables() as React.CSSProperties

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" style={variables} className={`${roboto.variable} ${imFellFrenchCanon.variable}`}>
      <body>
        <Header/>
        <main>
          <div className="container">{children}</div>
        </main>
        <Footer/>
      </body>
    </html>
  );
}
