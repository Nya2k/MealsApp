import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./navbar";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Meal App",
  description: "TUGAS PTI CUY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}