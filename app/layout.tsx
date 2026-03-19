import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PoolPro",
  description: "Sveriges ledande leverantör av pooler, spabad och bastur.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={geist.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}