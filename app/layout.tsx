import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./common/components/header";
import Footer from "./common/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The M-Blog",
  description: "The M-Blog is a blog about the latest news and trends in the world.",
  verification: {
    google: "HEXRY_HuGFxiCIM-sv1NhSlqnG305-59JH39BLugIpE",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="mt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
