
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";



import Providers from "./providers"


import AuthProvider from "./AuthProvider";
import ClientLayout from "./ClientLayout";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shortrix",
  description: "Instant Url Shortener",
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
        <Providers>
        <ClientLayout>
        <div className="relative w-full items-center flex justify-center">
         
        <Navbar />
        
        </div>
         
        {children}
        </ClientLayout>
        
        
        </Providers>
      </body>
      
    </html>
  );
}
